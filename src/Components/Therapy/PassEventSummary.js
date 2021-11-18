export const PassEventSummary = ({events}) => {
    return (
        <div>
            <table><tbody>
                <tr>
                    <th>Előjegyzett alkalmak száma:</th>
                    <td>{events && (events.length - events.filter(e => e.state.id === "3").length)}</td>
                </tr>
                <tr>
                    <th>Tervezett:</th>
                    <td>{events && events.filter(e => e.state.id === "1").length}</td>
                </tr>
                <tr>
                    <th>Megtartott:</th>
                    <td>{events && events.filter(e => e.state.id === "2").length}</td>
                </tr>
                <tr><td colSpan="2"> <hr /> </td></tr>
                <tr>
                    <th>Elmaradt:</th>
                    <td>{events && events.filter(e => e.state.id === "3").length}</td>
                </tr>
            </tbody></table>
        </div>
    )
}