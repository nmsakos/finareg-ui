import { FormActionButtonBar } from "../FormActionButtonBar";
import { withEditableFamily } from "./withEditableFamily";

export const FamilyForm = withEditableFamily(({ family, onChangeFamily, onSaveFamily, onResetFamily, isChanged }) => {
    const { /*id,*/ name } = family || {};
    
    return family && (
        <>
            <table className="form-item">
                <tbody>
                    {/*<tr>
                    <th>ID:</th>
                    <td><p>{id}</p></td>
                </tr>*/}
                    <tr>
                        <th className="form-item-label"><label>Név:</label></th>
                        <td><input value={name} onChange={e => onChangeFamily({ name: e.target.value })} className="form-item-input" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            {isChanged() ? <FormActionButtonBar onSaveClick={onSaveFamily} onResetClick={onResetFamily} /> : <></>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
)