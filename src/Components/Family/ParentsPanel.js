import { ParentInfo } from "./ParentInfo";

export const ParentsPanel = ({ parents }) => {

    return (
        <>
            <h2>Szülők:</h2>
            <table>
                <tbody>
                    <tr>
                        {parents.map((value, key) => (
                            <td key={key}> <ParentInfo parent={value} no={key} /> </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    );
}