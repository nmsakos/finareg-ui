import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { client as apolloClient} from "../../Config/ApolloProviderWithClient";
import { CREATE_PASS } from "../../GraphQL/Mutations/therapyMutators";
import { LOAD_PASSES } from "../../GraphQL/Queries/therapyQueries";
//import { usePasses } from "../../Hooks/usePasses";
import { ModalForm } from "../ModalForm";
import { PassCard } from "./PassCard";
import { PassCreateForm } from "./PassCreateForm";
import PassCreatorValidator from "./PassCreatorValidator.js"
import { TherapyTypeSelector } from "./TherapyTypeSelector";
import { FamilySelector } from "../Family/FamilySelector.js"
import { ClientSelector } from "../Family/ClientSelector.js"

export const PassList = ({ clientId, familyId }) => {
    const [onlyOpen, setOnlyOpen] = useState(false)
    const [passes, setPasses] = useState(null)
    const [allPasses, setAllPasses] = useState(null)
    //const passList = usePasses(onlyOpen);
    const [shouldShowModal, setShouldShowModal] = useState(null)
    const [command, setCommand] = useState(null)
    const [variables, setVariables] = useState({ eventCount: 4, firstEventDate: new Date() })

    const [therapyType, setTherapyType] = useState(null)
    const [family, setFamily] = useState(null)
    const [client, setClient] = useState(null)


    const { data, error, refetch } = useQuery(LOAD_PASSES, { query: LOAD_PASSES, variables: { onlyOpen: onlyOpen }, fetchPolicy: "no-cache", })
    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            setPasses(data.therapyPasses)
            setAllPasses(data.therapyPasses)
        }
    }, [error, data])


    useEffect(() => {
        if (allPasses) {
            const filterByTherapyType = (pass) => !therapyType || pass.therapyType.id === therapyType.id
            const filterByFamily = (pass) => !family || pass.family?.id === family.id
            const filterByClient = (pass) => !client || pass.client?.id === client.id
            setPasses(
                allPasses
                    .filter(filterByTherapyType)
                    .filter(filterByFamily)
                    .filter(filterByClient)
            )
        }
    }, [allPasses, therapyType, family, client])

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
            await apolloClient.mutate({ mutation: CREATE_PASS, variables: command, updateQueries: [LOAD_PASSES] })
            refetch();
            setCommand()
        }
    })(), [command, refetch])

    return passes && (
        <div>
            <div className="toolbar">
                <button className={`toolbar-button${onlyOpen ? " toggled" : ""}`} onClick={onOnlyOpenClick}>Csak nyitott</button>
                <TherapyTypeSelector className="toolbar-dropdown" onChange={setTherapyType} addAllOption={true} value={therapyType?.id} />
                <FamilySelector className="toolbar-dropdown" onChange={setFamily} addAllOption={true} value={family?.id} />
                <ClientSelector className="toolbar-dropdown" onChange={setClient} addAllOption={true} value={client?.id} />
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