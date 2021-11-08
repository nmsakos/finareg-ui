import { REMOVE_CLIENT, SAVE_CLIENT } from "../../GraphQL/Mutations/familyMutators";
import { LOAD_CLIENT } from "../../GraphQL/Queries/familyQueries";
import { FormActionButtonBar } from "../FormActionButtonBar";
import { withEditableResource } from "./withEditableResource";

export const ClientForm = withEditableResource(
    ({ client, onChangeClient, onSaveClient, onResetClient, onRemoveClient, isChanged }) => {
        const { name } = client || {};

        return client ? (
            <>
                <table className="form-item">
                    <tbody>
                        <tr>
                            <th className="form-item-label"><label>Név:</label></th>
                            <td><input value={name} onChange={e => onChangeClient({ name: e.target.value })} className="form-item-input" /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                {isChanged() ? <FormActionButtonBar onSaveClick={onSaveClient} onResetClick={onResetClient} onRemoveClick={onRemoveClient} /> : <></>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        ) : <></>
    }, "client", LOAD_CLIENT, SAVE_CLIENT, REMOVE_CLIENT)