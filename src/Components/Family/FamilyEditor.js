import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFamily } from "../../Hooks/useFamily";
import { ClientForm } from "./ClientForm";
import { FamilyForm } from "./FamilyForm";
import { ParentForm } from "./ParentForm";

export const FamilyEditor = ({ familyId }) => {
    const history = useHistory();

    const afterSave = (newId) => {
        console.log(newId);
        history.push(`/families/${newId}/edit`);
    }

    const family = useFamily(familyId);
    const [parents, setParents] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        if (family) {
            setParents(family.parents);
            setClients(family.clients);
        }
    }, [family])

    const newParent = () => setParents([...parents, { familyId: family.id }]);
    const newClient = () => setClients([...clients, { familyId: family.id }]);
    console.log(family);

    return family && (
        <div className="contentwrapper">
            <h1>Család: </h1>
            <FamilyForm family={family} afterSave={afterSave}/>

            <h1>Szülők:</h1>
            {family.id > 0
                ? <button className="button-new-resource" onClick={newParent}><FontAwesomeIcon icon="plus" />Új szülő</button>
                : <></>}
            {parents && parents.map((value, index) => (<ParentForm parent={value} key={index} />))}

            <h1>Kliensek: </h1>
            {family.id > 0
                ? <button className="button-new-resource" onClick={newClient}><FontAwesomeIcon icon="plus" onClick={newClient} />Új Kliens</button>
                : <></>}
            {clients && clients.map((value, index) => (<ClientForm client={value} key={index} />))}
            <br />

            <Link to={`/families/${family.id}`} className="svg-button">
                <FontAwesomeIcon icon="arrow-left" size="2x" />
            </Link>
        </div>
    )
};