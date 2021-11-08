import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../../App.scss";

export const FamilyCard = ({ family }) => {
    const { id, name, parents, clients } = family || {};
    const parentNames = parents && parents.map(parent => parent.name).join(", ");
    const clientNames = clients && clients.map(client => client.name).join(", ");

    const parentsSection = parents && parents.length > 0 && (
        <>
            <h2>Szülők</h2>
            <p className="familycard__sectioncontent">
                {parentNames}
            </p>
        </>
    );
    const clientsSection = clients && clients.length > 0 && (
        <>
            <h2>Kliensek</h2>
            <p className="familycard__sectioncontent">
                {clientNames}
            </p>
        </>
    );

    return (
        <div className={`familycard${id > 0 ? "" : " new"}`}>
            <div className="familycard__content">
                <h1>{`${name || "Új"} család`}</h1>
                {parentsSection}
                {clientsSection}
            </div>
            <div className="familycard__buttonbar">
                {id > 0 ? (
                    <Link to={`/families/${id}`} className="svg-button">
                        <FontAwesomeIcon icon={["far", "eye"]} size="2x" />
                    </Link>) : (<></>)}
                <Link to={`/families/${id}/edit`}>
                    <FontAwesomeIcon icon="edit" size="2x" />
                </Link>
            </div>
        </div>
    );
}