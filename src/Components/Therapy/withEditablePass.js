import { useEffect, useState } from "react";
import { client } from "../../Config/ApolloProviderWithClient";
import { LOAD_EVENTS_OF_PASS, LOAD_PASS } from "../../GraphQL/Queries/therapyQueries";
import { dateToString, isEqual } from "../../utils";

export const withEditablePass = (Component) => {
    return props => {
        const passId = props.passId
        const [events, setEvents] = useState();
        const [newEvents, setNewEvents] = useState();

        const [pass, setPass] = useState(null)
        const [newPass, setNewPass] = useState(null)

        const onChange = (changed) => {
            setNewPass({ ...newPass, ...changed })
        }

        const onEventChange = (event, changed) => {
            const changedEvents = newEvents.map(e => {if (e.id !== event.id) {
                return e
            } else {
                return {...e, ...changed}
            } })
            setNewEvents(changedEvents)
        }

        const isChanged = () => {
            return !isEqual(pass, newPass) || !isEqual(events, newEvents)
        }

        const onSavePass = () => {
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
                    }
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
                    }
                });
                setPass(response.data.therapyPass)
                setNewPass({ ...response.data.therapyPass })
            })();
        }, [passId]);


        return newPass ? <Component {...props}
            pass={newPass}
            events={newEvents}
            onChange={onChange}
            onEventChange={onEventChange}
            onSavePass={onSavePass}
            onResetPass={onResetPass}
            isChanged={isChanged}
        /> : null
    }
}