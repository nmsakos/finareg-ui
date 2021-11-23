import { useClients } from "../../Hooks/useClients"
import { ClientTimeTable } from "../Family/ClientTimeTable"

export const PassClientInfo = ({ pass }) => {
    const { family, client, therapyType } = pass || {}
    const clients = useClients(family)

    return family && clients ? (
        <div className="flex-table row" >
            {clients
                .filter(c => !client || c.id === client.id)
                .map((c, i) =>
                    <table key={i} style={{height: "fit-content"}}><tbody>
                        <tr>
                            <th>{i === 0 ? "Név:" : ""}</th>
                            <td colSpan="1">{c.name}</td>
                        </tr>
                        <tr><td colSpan="2">
                            <ClientTimeTable client={c} index={i} therapyType={therapyType} ownTable />
                        </td></tr>
                    </tbody></table>)}
        </div>
    ) : null
}