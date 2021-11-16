import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { FormActionButtonBar } from "../FormActionButtonBar";
import { EventDurationSelector } from "./EventDurationSelector";
import { EventStateSelector } from "./EventStateSelector";
import { TherapyTypeSelector } from "./TherapyTypeSelector";
import { withEditablePass } from "./withEditablePass";

export const PassForm = withEditablePass(({ pass, events, onChange, onSavePass, onResetPass, isChanged, onEventChange }) => {
    const { therapyType: { id: ttId }, eventCount, eventDuration: { id: edId } } = pass

    return pass ? (
        <div className="contentwrapper">
            <h1>Bérlet adatok:</h1>
            <table><tbody>
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
                </tr>
                {events && events.map(e => {
                    const { id, dateStr, state: { id: sid } } = e
                    return <tr key={id}>
                        <td>{dateStr}</td>
                        <td><EventStateSelector key={`ess_${id}`} className="form-item-input"
                            onChange={(state) => onEventChange(e, { state: state })}
                            addAllOption={true} value={sid} /></td>
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