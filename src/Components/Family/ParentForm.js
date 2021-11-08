import { REMOVE_PARENT, SAVE_PARENT } from "../../GraphQL/Mutations/familyMutators";
import { LOAD_PARENT } from "../../GraphQL/Queries/familyQueries";
import { FormActionButtonBar } from "../FormActionButtonBar";
import { withEditableResource } from "./withEditableResource";

export const ParentForm = withEditableResource(({ parent, onChangeParent, onSaveParent, onResetParent, onRemoveParent, isChanged }) => {
    const { /*id,*/ name, phone, email } = parent || {};

    return parent ? (
        <>
            <table className="form-item">
                <tbody>
                    {/*<tr>
                    <th>ID:</th>
                    <td><p>{id}</p></td>
                </tr>*/}
                    <tr>
                        <th className="form-item-label"><label>Név:</label></th>
                        <td><input value={name} onChange={e => onChangeParent({ name: e.target.value })} className="form-item-input" /></td>
                    </tr>
                    <tr>
                        <th className="form-item-label"><label>Telefon:</label></th>
                        <td><input value={phone} onChange={e => onChangeParent({ phone: e.target.value })} className="form-item-input" /></td>
                    </tr>
                    <tr>
                        <th className="form-item-label"><label>Email:</label></th>
                        <td><input value={email} onChange={e => onChangeParent({ email: e.target.value })} className="form-item-input" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            {isChanged() ? <FormActionButtonBar onSaveClick={onSaveParent} onResetClick={onResetParent} onRemoveClick={onRemoveParent} /> : <></>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    ) : <></>
}, "parent", LOAD_PARENT, SAVE_PARENT, REMOVE_PARENT)