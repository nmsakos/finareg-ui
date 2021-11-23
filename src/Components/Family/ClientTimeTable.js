import { useTimeTable } from "../../Hooks/useTimeTable"
import { getFormatedTimeTableEntry } from "../TimeTable/FormatedTimeTableEntry"

export const ClientTimeTable = ({ client, index, therapyType, ownTable }) => {
    const timeTables = useTimeTable([client.id])

    const getCellsOfFormattedTime = (tt) => {
        const [day, formated] = getFormatedTimeTableEntry(tt)

        return (
            <>
                <td>{day}</td>
                <td>{formated}</td>
            </>
        )
    }

    const getContent = () => {
        return timeTables && timeTables.filter(tt => !therapyType || tt.therapyType.id === therapyType.id)
            .map((tt, ttindex) => (
                <tr key={ttindex}>
                    <th>{index === 0 && ttindex === 0 ? "Időpont:" : ""}</th>
                    {getCellsOfFormattedTime(tt)}
                </tr>
            ))
    }

    return (ownTable ?
        <table style={{height: "fit-content"}}><tbody>
            {getContent()}
        </tbody></table>
        :
        <>
            {getContent()}
        </>

    )
}