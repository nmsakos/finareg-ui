import { useEffect, useState } from "react";
import { client } from "../../Config/ApolloProviderWithClient";
import { CREATE_THERAPY_EVENT, UPDATE_THERAPY_EVENT } from "../../GraphQL/Mutations/therapyMutators";
import { LOAD_EVENTS_OF_PASS, LOAD_PASS } from "../../GraphQL/Queries/therapyQueries";
import { dateToString, isEqual } from "../../utils";

export const withEditablePass = (Component) => {
    return props => {
        const passId = props.passId
        const [update, setUpdate] = useState(0)
        const [events, setEvents] = useState();
        const [newEvents, setNewEvents] = useState();

        const [pass, setPass] = useState(null)
        const [newPass, setNewPass] = useState(null)

        const onChange = (changed) => {
            setNewPass({ ...newPass, ...changed })
        }

        const onEventChange = (event, changed) => {
            console.log(changed);
            const changedEvents = newEvents.map(e => {
                if (e.id !== event.id) {
                    return e
                } else {
                    return { ...e, ...changed }
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

        const clearTherapistAndRoomIfNotCmplete = (event) => {
            if (event.state.id !== "2") {
                event.therapist = null
                event.room = null
            }
        }

        const saveEvent = async (isNew, event) => {
            clearTherapistAndRoomIfNotCmplete(event)
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

        const onSavePass = () => {
            if (isEventsChanged()) {
                saveEvents()
            }
        }

        const onResetPass = () => {
            setNewPass(pass)
            setNewEvents(events)
        }

        useEffect(() => {
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
                    .map(e => {
                        const add = { dateStr: dateToString(e) }
                        return {
                            ...e,
                            ...add
                        }
                    });
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
        /> : null
    }
}