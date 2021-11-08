export const FamilyBaseInfo = ({ family }) => {

    return (
        <>
            <h1>Család:</h1>
            <table>
                <tbody>
                    {/*<tr>
                        <th>ID:</th>
                        <td>{family.id}</td>
                    </tr>*/}
                    <tr>
                        <th>Név:</th>
                        <td>{family.name}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}