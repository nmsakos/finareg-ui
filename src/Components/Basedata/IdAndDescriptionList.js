import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ModalForm } from "../ModalForm"
import { DescriptionForm } from "./DescriptionForm"

export const IdAndDescriptionList = ({ list, headerText,
    shouldShowModal, setShouldShowModal,
    onModalSave, onModalCancel,
    newEntityId, setInUpdate, getInUpdate,
    onChange }) => {

    const newEntity = () => {
        return {
            id: newEntityId(),
            description: ""
        } 
    }

    return (
        <div className="familycard" >
            <ModalForm shouldShow={shouldShowModal} onModalSave={onModalSave} onModalCancel={onModalCancel} >
                <DescriptionForm entity={getInUpdate()} onChange={onChange} />
            </ModalForm>
            <div className="familycard__content">
                <h1>{headerText}</h1>
                <table><tbody>
                    <tr>
                        <th hidden >Id</th>
                        <th>Megnevezés</th>
                    </tr>
                    {list.map((e, i) => <tr key={i}>
                        <td hidden>{e.id}</td>
                        <td>{e.description}</td>
                        <td><FontAwesomeIcon icon="edit" onClick={() => {
                            setInUpdate(e)
                            setShouldShowModal(true)
                        }} /></td>
                    </tr>)}
                </tbody></table>
            </div>
            <div className="familycard__buttonbar">
                <FontAwesomeIcon icon={["far", "plus-square"]} size="2x"
                    onClick={() => {
                        setInUpdate(newEntity())
                        setShouldShowModal(true)
                    }} />
            </div>
        </div>
    )
}