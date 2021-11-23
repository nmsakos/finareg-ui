import { useState } from "react"
import { minusOneIfNull } from "../../utils"
import { ClientSelector } from "../Family/ClientSelector"
import { FamilySelector } from "../Family/FamilySelector"
import { EventDurationSelector } from "./EventDurationSelector"
import { TherapyTypeSelector } from "./TherapyTypeSelector"

export const PassBaseForm = ({ pass, onChange }) => {
    const [eventCountErrorMsg, setEventCountErrorMsg] = useState("")
    const { id: passId, family, client, therapyType, eventCount, eventDuration } = pass
    console.log(passId);
    const fId = minusOneIfNull(family)
    const cId = minusOneIfNull(client)
    const ttId = minusOneIfNull(therapyType)
    const edId = minusOneIfNull(eventDuration)

    const onEventCountChange = (e) => {
        onChange({ eventCount: e.target.value })
        setEventCountErrorMsg(e.target.value < 1 ? "Nem lehet kisebb egynél!" : "")
    }


    return (
        <table><tbody>
            <tr>
                <th>Család:</th>
                <td><FamilySelector className="form-item-input"
                    onChange={(family) => onChange({ family: family })}
                    addAllOption={true} value={fId} /></td>
            </tr>
            <tr>
                <th>Kliens:</th>
                <td><ClientSelector className="form-item-input" family={pass.family}
                    onChange={(client) => onChange({ client: client })}
                    addAllOption={true} value={cId} /></td>
            </tr>
            <tr>
                <th>Terápia típus:</th>
                <td><TherapyTypeSelector className="form-item-input"
                    onChange={(therapyType) => onChange({ therapyType: therapyType })}
                    addAllOption={passId < 1} value={ttId} /></td>
            </tr>
            <tr>
                <th>Alkalmak száma:</th>
                <td><input type="number" value={eventCount} className="form-item-input"
                    onChange={onEventCountChange} /></td>
                <td>{eventCountErrorMsg}</td>
            </tr>
            <tr>
                <th>Időtartam:</th>
                <td><EventDurationSelector className="form-item-input"
                    onChange={(eventDuration) => onChange({ eventDuration: eventDuration })}
                    addAllOption={passId < 1} value={edId} /></td>
            </tr>
        </tbody></table>
    )
}