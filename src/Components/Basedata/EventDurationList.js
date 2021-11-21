import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ModalForm } from "../ModalForm"
import { EventDurationForm } from "./EventDurationForm"

export const EventDurationList = ({ list, headerText,
    shouldShowModal, setShouldShowModal,
    onModalSave, onModalCancel,
    newEntityId, setInUpdate, getInUpdate,
    onChange }) => {

    const newEntity = () => {
        return {
            id: newEntityId(),
            minutes: 0,
            description: ""
        }
    }

    return (
        <div className="familycard" >
            <ModalForm shouldShow={shouldShowModal} onModalSave={onModalSave} onModalCancel={onModalCancel} >
                <EventDurationForm entity={getInUpdate()} onChange={onChange} />
            </ModalForm>
            <div className="familycard__content">
                <h1>{headerText}</h1>
                <table><tbody>
                    <tr>
                        <th hidden>Id</th>
                        <th>Megnevezés</th>
                        <th>Perc</th>
                    </tr>
                    {list.map((e, i) => <tr key={i}>
                        <td hidden>{e.id}</td>
                        <td>{e.description}</td>
                        <td>{e.minutes}</td>
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