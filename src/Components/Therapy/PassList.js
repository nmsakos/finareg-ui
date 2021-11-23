import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { client } from "../../Config/ApolloProviderWithClient";
import { CREATE_PASS } from "../../GraphQL/Mutations/therapyMutators";
import { LOAD_PASSES } from "../../GraphQL/Queries/therapyQueries";
//import { usePasses } from "../../Hooks/usePasses";
import { ModalForm } from "../ModalForm";
import { PassCard } from "./PassCard";
import { PassCreateForm } from "./PassCreateForm";
import PassCreatorValidator from "./PassCreatorValidator.js"

export const PassList = ({ clientId, familyId }) => {
    const [onlyOpen, setOnlyOpen] = useState(false)
    const [passes, setPasses] = useState(null)
    //const passList = usePasses(onlyOpen);
    const [shouldShowModal, setShouldShowModal] = useState(null)
    const [command, setCommand] = useState(null)
    const [variables, setVariables] = useState({ eventCount: 4, firstEventDate: new Date() })

    const {data, error, refetch} = useQuery(LOAD_PASSES, {query: LOAD_PASSES, variables: {onlyOpen: onlyOpen}, fetchPolicy: "no-cache", })
    useEffect(() => {
        if (error) {
            console.log(error);
        } 
        if (data) {
            setPasses(data.therapyPasses)
        }
    }, [error, data])

    const onOnlyOpenClick = () => {
        setOnlyOpen(!onlyOpen);
    }

    const onModalSave = () => {
        const validatorMessage = PassCreatorValidator.isPassDataValid(variables)
        if (validatorMessage) {
            alert(validatorMessage)
        } else {
            setCommand({
                therapyType: variables.therapyType.id,
                eventCount: variables.eventCount,
                eventDuration: variables.eventDuration.id,
                familyId: variables.family.id,
                clientId: variables.client?.id,
                firstTimeTable: variables.firstTimeTable.id,
                firstEventDate: variables.firstEventDate
            })
            setShouldShowModal(false)
        }
    }

    const onChange = (changes) => {
        setVariables({ ...variables, ...changes })
    }

    useEffect(() => (async () => {
        if (command) {
            await client.mutate({ mutation: CREATE_PASS, variables: command, updateQueries: [LOAD_PASSES] })
            refetch();
            setCommand()
        }
    })(), [command, refetch])

    return passes && (
        <div>
            <div className="toolbar">
                <button className={`toolbar-button${onlyOpen ? " toggled" : ""}`} onClick={onOnlyOpenClick}>Csak nyitott</button>
                <ModalForm shouldShow={shouldShowModal} onModalSave={onModalSave} onModalCancel={() => setShouldShowModal(false)} >
                    <PassCreateForm entity={variables} onChange={onChange} />
                </ModalForm>
                <FontAwesomeIcon icon="plus" size="2x" className="toolbar-button" onClick={() => {
                    setShouldShowModal(true)
                }} />
            </div>
            <div className="family-card-container">
                {passes.map((value, index) => (
                    <PassCard pass={value} key={index} />
                ))}
                <PassCard pass={{ id: 0 }} key="-1" />
            </div>
        </div>
    );

}