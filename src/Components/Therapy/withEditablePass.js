import { useEffect, useState } from "react";
import { client } from "../../Config/ApolloProviderWithClient";
import { CREATE_THERAPY_EVENT, SAVE_PASS, UPDATE_THERAPY_EVENT } from "../../GraphQL/Mutations/therapyMutators";
import { LOAD_EVENTS_OF_PASS, LOAD_PASS } from "../../GraphQL/Queries/therapyQueries";
import { isEqual } from "../../utils";
import format from "date-fns/format"
import { useHistory } from "react-router";

export const withEditablePass = (Component) => {
    return props => {
        const passId = props.passId
        const [update, setUpdate] = useState(0)
        const [events, setEvents] = useState();
        const [newEvents, setNewEvents] = useState();

        const [pass, setPass] = useState(null)
        const [newPass, setNewPass] = useState(null)

        const history = useHistory()

        const onChange = (changed) => {
            setNewPass({ ...newPass, ...changed })
            if (Object.keys(changed)[0] === "client") {
                console.log(changed);
                const changedEvents = newEvents.map((e) => {
                    return { ...e, ...changed }
                })
                setNewEvents(changedEvents)
            }

        }

        const doEventChange = (original, change) => {
            if (Object.keys(change)[0] === "state") {
                if (change.state.id === "2") {
                    if (!original.client) {
                        if (newPass.client) {
                            change.client = newPass.client
                        } else {
                            const firstWithClient = newEvents.find(e => e.client)
                            if (firstWithClient) {
                                change.client = firstWithClient.client
                            }
                        }
                    }
                    if (!original.therapist) {
                        const firstWithTherapist = newEvents.find(e => e.therapist)
                        if (firstWithTherapist) {
                            change.therapist = firstWithTherapist.therapist
                        }
                    }
                    if (!original.room) {
                        const firstWithRoom = newEvents.find(e => e.room)
                        if (firstWithRoom) {
                            change.room = firstWithRoom.room
                        }
                    }
                }
            }
            return { ...original, ...change }
        }

        const onEventChange = (index, changed) => {
            const changedEvents = newEvents.map((e, i) => {
                if (i !== index) {
                    return e
                } else {
                    return doEventChange(e, changed)
                }
            })
            setNewEvents(changedEvents)
        }

        const isBaseChanged = () => !isEqual(pass, newPass)
        const isEventsChanged = () => !isEqual(events, newEvents)

        const isChanged = () => {
            return isBaseChanged() || isEventsChanged()
        }

        const hasCompleted = () => {
            return newEvents && newEvents.find(e => e.state.id === "2")
        }

        const createVariables = (isNew, event) => {
            const variables = {
                clientId: event.client?.id,
                date: event.date,
                weekId: event.week?.id,
                dayOfWeek: event.dayOfWeek,
                passId: event.therapyPass?.id,
                therapistId: event.therapist?.id,
                roomId: event.room?.id,
                stateId: event.state.id
            }

            return !isNew ? { id: event.id, ...variables } : variables
        }

        const clearFieldsIfNotComplete = (event) => {
            if (event.state.id !== "2") {
                event.client = null
                event.therapist = null
                event.room = null
            }
        }

        const saveEvent = async (isNew, event) => {
            clearFieldsIfNotComplete(event)
            const variables = createVariables(isNew, event)
            await client.mutate({
                mutation: isNew ? CREATE_THERAPY_EVENT : UPDATE_THERAPY_EVENT,
                variables: variables,
                updateQueries: ["getEventsOfPass"]
            });
        }

        const saveEvents = () => {

            newEvents.forEach(ne => {
                const found = events.find(e => e.id === ne.id)
                if (found) {
                    if (!isEqual(ne, found)) {
                        saveEvent(false, ne)
                    }
                } else {
                    saveEvent(true, ne)
                }
            })
            setUpdate(update + 1)
        }
        
        const afterSave = (newId) => {
            history.push(`/passes/${newId}/edit`);
        }

        const savePass = async () => {
            const variables = {
                id: newPass.id,
                clientId: newPass.client?.id,
                familyId: newPass.family?.id,
                therapyTypeId: newPass.therapyType?.id,
                eventCount: newPass.eventCount,
                eventDurationId: newPass.eventDuration?.id,
                firstEventId: newPass.firstEvent?.id,
                eventsTaken: newEvents.filter(e => e.state.id === "2").length,
                invoice: newPass.invoice?.id
            }
            const mutated = await client.mutate({
                mutation: SAVE_PASS,
                variables: variables,
                updateQueries: ["getEventsOfPass"]
            });
            if (passId < 1) {
                console.log(mutated);
                const newId = mutated.data.savePass.id
                afterSave(newId)
            }
            setUpdate(update + 1)
        }

        const onSavePass = () => {
            if (isChanged()) {
                savePass()
            }
            if (passId > 0 && isEventsChanged()) {
                saveEvents()
            }
        }

        const onResetPass = () => {
            setNewPass(pass)
            setNewEvents(events)
        }

        const onEventAdd = () => {
            const newArray = [...newEvents, {
                id: 0,
                client: newPass.client,
                date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ddXXX"),
                state: { id: 1 },
                therapyPass: newPass
            }]
            setNewEvents(newArray)
            console.log(newArray);
        }

        const onEventRemove = (index) => {
            setNewEvents(newEvents.filter((e, i) => i !== index))
        }

        useEffect(() => {
            if (passId && passId > 0) {
                (async () => {
                    const response = await client.query({
                        query: LOAD_EVENTS_OF_PASS,
                        variables: {
                            passId: passId,
                            noCancelled: false
                        },
                        fetchPolicy: "no-cache"
                    });
                    const data = response.data.eventsOfPass
                    setEvents(data)
                    setNewEvents(data)
                })();
                (async () => {
                    const response = await client.query({
                        query: LOAD_PASS,
                        variables: {
                            passId: passId
                        },
                        fetchPolicy: "no-cache"
                    });
                    setPass(response.data.therapyPass)
                    setNewPass({ ...response.data.therapyPass })
                })();
            } else {
                const theNewPass = { id: 0, family: null, client: null, therapyType: null, eventCount: 4, eventDuration: null }
                setNewPass(theNewPass)
                setPass({ ...theNewPass })
                setEvents([])
                setNewEvents([])
            }
        }, [passId, update]);


        return newPass ? <Component {...props}
            pass={newPass}
            events={newEvents}
            onChange={onChange}
            onEventChange={onEventChange}
            onSavePass={onSavePass}
            onResetPass={onResetPass}
            isChanged={isChanged}
            hasCompleted={hasCompleted}
            onEventAdd={onEventAdd}
            onEventRemove={onEventRemove}
        /> : null
    }
}