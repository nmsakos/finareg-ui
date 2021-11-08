export const ParentInfo = ({ parent, no }) => {

    return (
        <>
            <table>
                <tbody>
                    {/*<tr>
                        {no === 0 ? <th>Id:</th> : ""}
                        <td>{parent.id}</td>
                    </tr>*/}
                    <tr>
                        <th>{no === 0 ? "Név:" : ""}</th>
                        <td>{parent.name}</td>
                    </tr>
                    <tr>
                        <th>{no === 0 ? "Telefon:" : ""}</th>
                        <td>{parent.phone}</td>
                    </tr>
                    <tr>
                        <th>{no === 0 ? "Email:" : ""}</th>
                        <td>{parent.email}</td>
                    </tr>
                </tbody>
            </table>
        </>

    );
}