import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ClientSelector } from "../Family/ClientSelector";
import { FamilySelector } from "../Family/FamilySelector";
import { FormActionButtonBar } from "../FormActionButtonBar";
import { RoomSelector } from "../TimeTable/RoomSelector";
import { TherapistSelector } from "../TimeTable/TherapistSelector";
import { EventDurationSelector } from "./EventDurationSelector";
import { EventStateSelector } from "./EventStateSelector";
import { TherapyTypeSelector } from "./TherapyTypeSelector";
import { withEditablePass } from "./withEditablePass";
import DatePicker from "react-datepicker"
import parseISO from "date-fns/parseISO"
import format from "date-fns/format"
import hu from "date-fns/locale/hu"
import "react-datepicker/dist/react-datepicker.css";

const isNull = (field) => {
    if (field) {
        return field.id ? field.id : "-1"
    } else {
        return "-1"
    }
}

export const PassForm = withEditablePass(({ pass, events, onChange, onSavePass, onResetPass, isChanged, onEventChange, hasCompleted }) => {
    const { family: { id: fid },
        client: { id: cid },
        therapyType: { id: ttId },
        eventCount,
        eventDuration: { id: edId } } = pass

    return pass ? (
        <div className="contentwrapper">
            <h1>Bérlet adatok:</h1>
            <table><tbody>
                <tr>
                    <th>Család:</th>
                    <td><FamilySelector className="form-item-input"
                        onChange={(family) => onChange({ family: family })}
                        addAllOption={true} value={fid} /></td>
                </tr>
                <tr>
                    <th>Kliens:</th>
                    <td><ClientSelector className="form-item-input"
                        onChange={(client) => onChange({ client: client })}
                        addAllOption={true} value={cid} /></td>
                </tr>
                <tr>
                    <th>Terápia típus:</th>
                    <td><TherapyTypeSelector className="form-item-input"
                        onChange={(therapyType) => onChange({ therapyType: therapyType })}
                        addAllOption={true} value={ttId} /></td>
                </tr>
                <tr>
                    <th>Alkalmak száma:</th>
                    <td><input value={eventCount} className="form-item-input"
                        onChange={(e) => onChange({ eventCount: e.target.value })} /></td>
                </tr>
                <tr>
                    <th>Időtartam:</th>
                    <td><EventDurationSelector className="form-item-input"
                        onChange={(eventDuration) => onChange({ eventDuration: eventDuration })}
                        addAllOption={true} value={edId} /></td>
                </tr>
            </tbody></table>
            <h1>Alkalmak:</h1>
            <table><tbody>
                <tr>
                    <th>Dátum</th>
                    <th>Állapot</th>
                    {hasCompleted() ? (
                        <>
                            <th>Terapeuta</th>
                            <th>Szoba</th>
                        </>) : null}
                </tr>
                {events && events.map(e => {
                    const { id, date, state: { id: sid }, therapist, room } = e

                    const thId = isNull(therapist)
                    var rId = isNull(room)
                    const parsed = parseISO(date, "yyyy-MM-dd'T'HH:mm:ddXXX", new Date(), { locale: hu })

                    return <tr key={id}>
                        <td><DatePicker selected={parsed} onChange={(selDate) => onEventChange(e, { date: format(selDate, "yyyy-MM-dd'T'HH:mm:ddXXX") })} dateFormat="yyyy. MMMM dd, EEEE" locale={hu} /></td>
                        <td><EventStateSelector key={`ess_${id}`} className="form-item-input"
                            onChange={(state) => onEventChange(e, { state: state })}
                            addAllOption={false} value={sid} /></td>
                        {sid === "2" ? (<>
                            <td>
                                <TherapistSelector className="form-item-input"
                                    onChange={(therapist) => onEventChange(e, { therapist: therapist })}
                                    addAllOption={true} value={thId} />

                            </td>
                            <td>
                                <RoomSelector className="form-item-input"
                                    onChange={(room) => onEventChange(e, { room: room })}
                                    addAllOption={true} value={rId} />

                            </td>
                        </>) : null}
                    </tr>
                })}
                <tr><td colSpan="2">
                    {isChanged() ? <FormActionButtonBar onSaveClick={onSavePass} onResetClick={onResetPass} useButtons /> : <></>}
                </td></tr>
            </tbody></table>
            <Link to={`/passes/${pass.id}`} className="svg-button">
                <FontAwesomeIcon icon="arrow-left" size="2x" />
            </Link>
        </div >
    ) : null;
})