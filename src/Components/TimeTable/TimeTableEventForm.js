import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { days, formatTime, getHourAndMin } from "../../utils"
import { ClientSelector } from "../Family/ClientSelector"
import { TherapyTypeSelector } from "../Therapy/TherapyTypeSelector"
import { RoomSelector } from "./RoomSelector"
import { TherapistSelector } from "./TherapistSelector"

export const TimeTableEventForm = ({ entity: event, innerRef }) => {
    const [oldEvent, setOldEvent] = useState(event)
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
        doChange({ clients: newEvent.clients.filter((c,i) => i !== index) })
    }

    const addClient = () => {
        const newClient = { id: "-1", name: "", isNew: true }
        doChange({ clients: [...newEvent.clients, newClient] })
    }

    const onClientChange = (client, index) => {
        const newClients = newEvent.clients
        newClients[index] = client
    }

    const formatIfNotChanged = (fieldName) => {
        if (newEvent[fieldName] === oldEvent[fieldName]) {
            return formatTime(getHourAndMin(event[fieldName]))
        }
        else {
            return newEvent[fieldName]
        }
    }

    const createOldClientRow = (value, index) => {
        return (
            <>
                <div className="form-label-input">{value.name}</div>
                <FontAwesomeIcon icon={["far", "minus-square"]} onClick={() => onClientDelete(index)} />
            </>
        )
    }

    const createNewClientRow = (value, index) => {
        return (
            <>
                <ClientSelector key={index} className="form-label-input" onChange={(client) => onClientChange(client, index)} addAllOption={true} defaultValue={value}  />
                <FontAwesomeIcon icon={["far", "minus-square"]} onClick={() => onClientDelete(index)} />
            </>
        )
    }

    const createClientRow = (value, index) => {
        return (
            <div key={index} className="flex-table row" >
                {!value.isNew ? createOldClientRow(value, index) : createNewClientRow(value, index)}
            </div>
        )
    }

    const listClients = () => {
        return newEvent.clients.map((value, index) => createClientRow(value, index))
    }

    return (
        <>
            <h1>Órarend bejegyzés</h1>
            <table><tbody>
                <tr>
                    <th>Nap:</th>
                    <td>
                        <select className="form-item-input" name="dayOfWeek" id="dayOfWeek" defaultValue={newEvent.dayOfWeek}
                            onChange={(e) => doChange({ dayOfWeek: e.target.value })} >
                            {days.map((value, index) => {
                                return (<option key={index} value={index + 1} >{value}</option>)
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Időpont:</th>
                    <td>
                        <input className="form-item-input" name="fromTime"
                            defaultValue={formatIfNotChanged("fromTime")}
                            onChange={(e) => doChange({ fromTime: e.target.value })} />
                    </td>
                    <td>
                        <input className="form-item-input" name="toTime"
                            defaultValue={formatIfNotChanged("toTime")}
                            onChange={(e) => doChange({ toTime: e.target.value })} />
                    </td>
                </tr>
                <tr>
                    <th>Terápia típus:</th>
                    <td colSpan="2">
                        <TherapyTypeSelector className="form-item-input"
                            onChange={(therapyType) => doChange({ therapyType: therapyType })}
                            addAllOption={true} defaultValue={newEvent.therapyType} />
                    </td>
                </tr>
                <tr>
                    <th>Szoba:</th>
                    <td colSpan="2">
                        <RoomSelector className="form-item-input"
                            onChange={(room) => doChange({ room: room })}
                            addAllOption={true} defaultValue={newEvent.room} />
                    </td>
                </tr>
                <tr>
                    <th>Terapeuta:</th>
                    <td colSpan="2">
                        <TherapistSelector className="form-item-input"
                            onChange={(therapist) => doChange({ therapist: therapist })}
                            addAllOption={true} defaultValue={newEvent.therapist} />
                    </td>
                </tr>
                <tr>
                    <th>Kliensek:</th>
                    <td colSpan="2">
                        <div className="flex-table column" >
                            {listClients()}
                            <FontAwesomeIcon icon={["far", "plus-square"]} onClick={addClient} />
                        </div>
                    </td>
                </tr>
            </tbody></table>
        </>
    )
}