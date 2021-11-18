import DatePicker from "react-datepicker"
import format from "date-fns/format"
import hu from "date-fns/locale/hu"
import parseISO from "date-fns/parseISO"
import { ClientSelector } from "../Family/ClientSelector";
import { EventStateSelector } from "./EventStateSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomSelector } from "../TimeTable/RoomSelector";
import { TherapistSelector } from "../TimeTable/TherapistSelector";
import { minusOneIfNull } from "../../utils";

export const PassEventsForm = ({ pass, events, onEventChange, onEventAdd, onEventRemove, hasCompleted }) => {
    return (
        <table><tbody>
            <tr>
                <th>Dátum</th>
                <th>Állapot</th>
                {hasCompleted() ? (
                    <>
                        <th>Kliens</th>
                        <th>Terapeuta</th>
                        <th>Szoba</th>
                    </>) : null}
            </tr>
            {events && events.map((e, i) => {
                const { id, date, state: { id: sid }, therapist, room, client } = e

                const thId = minusOneIfNull(therapist)
                const rId = minusOneIfNull(room)
                const cId = minusOneIfNull(client)

                const parsed = parseISO(date, "yyyy-MM-dd'T'HH:mm:ddXXX", new Date(), { locale: hu })

                return <tr key={id}>
                    <td><DatePicker selected={parsed} onChange={(selDate) => onEventChange(i, { date: format(selDate, "yyyy-MM-dd'T'HH:mm:ddXXX") })} dateFormat="yyyy. MMMM dd, EEEE" locale={hu} /></td>
                    <td><EventStateSelector key={`ess_${id}`} className="form-item-input"
                        onChange={(state) => onEventChange(i, { state: state })}
                        addAllOption={false} value={sid} /></td>
                    <td>
                        <ClientSelector className="form-item-input" family={pass?.family}
                            onChange={(client) => onEventChange(i, { client: client })}
                            addAllOption={true} value={cId} hidden={sid !== "2"} />

                    </td>
                    <td>
                        <TherapistSelector className="form-item-input"
                            onChange={(therapist) => onEventChange(i, { therapist: therapist })}
                            addAllOption={true} value={thId} hidden={sid !== "2"} />

                    </td>
                    <td>
                        <RoomSelector className="form-item-input"
                            onChange={(room) => onEventChange(i, { room: room })}
                            addAllOption={true} value={rId} hidden={sid !== "2"} />

                    </td>
                    <td hidden={e.id !== 0}>
                        <FontAwesomeIcon icon={["far", "minus-square"]} onClick={() => onEventRemove(i)} />
                    </td>
                </tr>
            })}
            <tr><td>
                <button className="button-new-resource" onClick={onEventAdd}><FontAwesomeIcon icon="plus" />Új időpont</button>
            </td></tr>
            <tr><td colSpan="2">
            </td></tr>
        </tbody></table>
    )
}