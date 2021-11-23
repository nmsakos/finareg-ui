import { ClientTimeTable } from "./ClientTimeTable";

export const ClientInfo = ({ client, index }) => {

    return (
        <table>
            <tbody>
                <tr>
                    <th>{index === 0 ? "Név:" : ""}</th>
                    <td colSpan="2">{client.name}</td>
                </tr>
                <ClientTimeTable client={client} index={index} />
            </tbody>
        </table>
    );
}