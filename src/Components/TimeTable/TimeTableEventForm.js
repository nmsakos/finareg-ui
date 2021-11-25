import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatTime, getHourAndMin, minusOneIfNull } from "../../utils"
import { ClientSelector } from "../Family/ClientSelector"
import { TherapyTypeSelector } from "../Therapy/TherapyTypeSelector"
import { DaySelector } from "./DaySelector"
import { RoomSelector } from "./RoomSelector"
import { TherapistSelector } from "./TherapistSelector"
import { withEditableTimeTable } from "./withEditableTimeTable"

export const TimeTableEventForm = withEditableTimeTable(({ event, doChange, onClientChange, onClientDelete }) => {
    const {dayOfWeek, fromTime, toTime, therapyType, room, therapist} = event
    console.log(event);

    const formatedFromTime = formatTime(getHourAndMin(fromTime))
    const formatedToTime = formatTime(getHourAndMin(toTime))
    const ttId = minusOneIfNull(therapyType)
    const rId = minusOneIfNull(room)
    const tId = minusOneIfNull(therapist)

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
        return event.clients.map((value, index) => createClientRow(value, index))
    }

    const addClient = () => {
        const newClient = { id: "-1", name: "", isNew: true }
        doChange({ clients: [...event.clients, newClient] })
    }

    return event ? (
        <>
            <h1>Órarend bejegyzés</h1>
            <table><tbody>
                <tr>
                    <th>Nap:</th>
                    <td>
                        <DaySelector className="form-item-input" value={dayOfWeek}
                            onChange={(day) => doChange({ dayOfWeek: day.id })} />
                    </td>
                </tr>
                <tr>
                    <th>Időpont:</th>
                    <td>
                        <input className="form-item-input" name="fromTime"
                            value={formatedFromTime}
                            onChange={(e) => doChange({ fromTime: e.target.value })} />
                    </td>
                    <td>
                        <input className="form-item-input" name="toTime"
                            value={formatedToTime}
                            onChange={(e) => doChange({ toTime: e.target.value })} />
                    </td>
                </tr>
                <tr>
                    <th>Terápia típus:</th>
                    <td colSpan="2">
                        <TherapyTypeSelector className="form-item-input"
                            onChange={(therapyType) => doChange({ therapyType: therapyType })}
                            addAllOption={true} value={ttId} />
                    </td>
                </tr>
                <tr>
                    <th>Szoba:</th>
                    <td colSpan="2">
                        <RoomSelector className="form-item-input"
                            onChange={(room) => doChange({ room: room })}
                            addAllOption={true} value={rId} />
                    </td>
                </tr>
                <tr>
                    <th>Terapeuta:</th>
                    <td colSpan="2">
                        <TherapistSelector className="form-item-input"
                            onChange={(therapist) => doChange({ therapist: therapist })}
                            addAllOption={true} value={tId} />
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
    ) : null
})