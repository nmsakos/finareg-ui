import { useEffect, useState } from "react"

export const withEditableTimeTable = (Component) => {
    return props => {
        const event = props["event"]
        const innerRef = props["innerRef"]
        const [, setOldEvent] = useState(event)
        const [newEvent, setNewEvent] = useState(event)

        useEffect(() => {
            if (event) {
                const e = {
                    id: event.id,
                    dayOfWeek: event.dayOfWeek,
                    fromTime: event.fromTime,
                    toTime: event.toTime,
                    therapyType: event.therapyType,
                    room: event.room,
                    therapist: event.therapist,
                    clients: event.clients.map(c => {
                        return { ...c, isNew: false }
                    })
                }
                setNewEvent(e)
                setOldEvent(event)
                if (innerRef && !innerRef.current) {
                    innerRef.current = e
                }
            }
        }, [event, innerRef])

        const doChange = (changes) => {
            Object.keys(changes).forEach(key => {
                if (innerRef) {
                    if (innerRef.current[key]) {
                        if (innerRef.current[key] === changes[key]) {
                            return
                        }
                        innerRef.current[key] = changes[key]
                    } else {
                        Object.defineProperty(innerRef.current, key, { value: changes[key], writable: true })
                    }
                }
            })
            setNewEvent({ ...innerRef.current })
        }

        const onClientDelete = (index) => {
            doChange({ clients: newEvent.clients.filter((c, i) => i !== index) })
        }

        const onClientChange = (client, index) => {
            const newClients = newEvent.clients
            newClients[index] = client
        }

        return newEvent ? <Component {...props}
            event={newEvent}
            doChange={doChange}
            onClientChange={onClientChange}
            onClientDelete={onClientDelete}
        /> : null
    }
}