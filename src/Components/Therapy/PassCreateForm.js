import DatePicker from "react-datepicker"
import hu from "date-fns/locale/hu"
import { useClients } from "../../Hooks/useClients"
import { minusOneIfNull } from "../../utils"
import { ClientSelector } from "../Family/ClientSelector"
import { FamilySelector } from "../Family/FamilySelector"
import { TimeTableSelector } from "../TimeTable/TimeTableSelector"
import { EventDurationSelector } from "./EventDurationSelector"
import { TherapyTypeSelector } from "./TherapyTypeSelector"

export const PassCreateForm = ({ entity, onChange }) => {
    const { therapyType, eventCount, eventDuration, family, client, firstTimeTable, firstEventDate } = entity
    const ttId = minusOneIfNull(therapyType)
    const edId = minusOneIfNull(eventDuration)
    const fId = minusOneIfNull(family)
    const cId = minusOneIfNull(client)
    const ttableId = minusOneIfNull(firstTimeTable)

    const clients = useClients(family)
    
    return (
        <>
            <h1>Új bérlet létrehozása</h1>
            <table><tbody>
                <tr>
                    <th>Terápiatípus:</th>
                    <td>
                        <TherapyTypeSelector className="form-item-input"
                            onChange={(therapyType) => onChange({ therapyType: therapyType })}
                            addAllOption={true} value={ttId} />
                    </td>
                </tr>
                <tr>
                    <th>Alkalmak száma:</th>
                    <td><input type="number" value={eventCount} className="form-item-input"
                        onChange={(e) => onChange({ eventCount: e.target.value })} /></td>
                </tr>
                <tr>
                    <th>Időtartam:</th>
                    <td><EventDurationSelector className="form-item-input"
                        onChange={(eventDuration) => onChange({ eventDuration: eventDuration })}
                        addAllOption={true} value={edId} /></td>
                </tr>
                <tr>
                    <th>Család:</th>
                    <td><FamilySelector className="form-item-input"
                        onChange={(family) => onChange({ family: family })}
                        addAllOption={true} value={fId} /></td>
                </tr>
                <tr>
                    <th>Kliens:</th>
                    <td><ClientSelector className="form-item-input" family={family}
                        onChange={(client) => onChange({ client: client })}
                        addAllOption={true} value={cId} /></td>
                </tr>
                <tr>
                    <th>Első óra:</th>
                    <td>{clients ? <TimeTableSelector className="form-item-input" family={family}
                        onChange={(firstTimeTable) => onChange({ firstTimeTable: firstTimeTable })}
                        addAllOption={true} value={ttableId} clients={clients.filter(c => !client || c.id === client.id)} 
                        therapytype={therapyType}/> : null}</td>
                </tr>
                <tr>
                    <th>Első óra napja:</th>
                    <td><DatePicker selected={firstEventDate} onChange={(firstEventDate) => onChange({ firstEventDate: firstEventDate })}
                        dateFormat="yyyy. MMMM dd, EEEE" locale={hu} /></td>
                </tr>
            </tbody></table>
        </>
    )
}