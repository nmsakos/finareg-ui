import { ClientInfo } from "./ClientInfo";

export const ClientsPanel = ({ clients }) => {
    return (
        <>
            <h2>Kliensek:</h2>
            <table>
                <tbody>
                    <tr>
                        {clients.map((value, index) => (
                            <td className="multi-entity-table-container" key={index}> <ClientInfo client={value} index={index} /> </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    );
}