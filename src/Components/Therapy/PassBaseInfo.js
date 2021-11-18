export const PassBaseInfo = ({pass}) => {
    return (
        <table><tbody>
            <tr>
                <th>Család</th>
                <td>{pass.family.name}</td>
            </tr>
            <tr>
                <th>Kliens</th>
                <td>{pass.client && pass.client.name}</td>
            </tr>
            <tr>
                <th>Terápia típus:</th>
                <td>{pass.therapyType.description}</td>
            </tr>
            <tr>
                <th>Alkalmak száma:</th>
                <td>{pass.eventCount}</td>
            </tr>
            <tr>
                <th>Időtartam:</th>
                <td>{pass.eventDuration.description}</td>
            </tr>
        </tbody></table>
    )
}