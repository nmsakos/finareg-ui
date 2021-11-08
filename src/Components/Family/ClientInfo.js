import { useTimeTable } from "../../Hooks/useTimeTable";
import { getFormatedTimeTableEntry } from "../TimeTable/FormatedTimeTableEntry";

export const ClientInfo = ({ client, index }) => {

    const timeTables = useTimeTable(client.id)

    const getCellsOfFormattedTime = (tt) => {
        const [day, formated] = getFormatedTimeTableEntry(tt)

        return (
            <>
            <td>{day}</td>
            <td>{formated}</td>
            </>
        )
    }

    return (
        <table>
            <tbody>
                {/*<tr>
                        {no === 0 ? <th>Id:</th> : ""}
                        <td>{client.id}</td>
                    </tr>*/}
                <tr>
                    <th>{index === 0 ? "Név:" : ""}</th>
                    <td colSpan="2">{client.name}</td>
                </tr>
                {timeTables && timeTables.map((tt, ttindex) => (
                    <tr key={ttindex}>
                        <th>{index === 0 && ttindex === 0 ? "Időpont:" : ""}</th>
                        {getCellsOfFormattedTime(tt)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}