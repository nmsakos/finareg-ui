import { ClientSelector } from "../Family/ClientSelector"
import { FamilySelector } from "../Family/FamilySelector"
import { EventDurationSelector } from "./EventDurationSelector"
import { TherapyTypeSelector } from "./TherapyTypeSelector"

export const PassBaseForm = ({pass, onChange}) => {
    const { family: { id: fid },
        client: { id: cid },
        therapyType: { id: ttId },
        eventCount,
        eventDuration: { id: edId } } = pass

    return (
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
    )
}