export const PassEventsInfo = ({events}) => {
    const hasCompleted = () => {
        return events && events.find(e => e.state.id === "2")
    }

    return (
        <table><tbody>
            <tr>
                <th>Dátum</th>
                <th>Állapot</th>
                {hasCompleted() ? (
                    <>
                        <th>Kliens</th>
                        <th>Terapeuta</th>
                        <th>Szoba</th>
                    </>) : null}
            </tr>
            {events.map(e =>
                <tr key={e.id} >
                    <td>{e.dateStr}</td>
                    <td>{e.state.description}</td>
                    <td hidden={e.state.id !== "2"}>{e.client?.name}</td>
                    <td hidden={e.state.id !== "2"}>{e.therapist?.name}</td>
                    <td hidden={e.state.id !== "2"}>{e.room?.description}</td>
                </tr>)}

        </tbody></table>
    )
}