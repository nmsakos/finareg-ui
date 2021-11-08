import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { PassEventDataSource } from "./PassEventDataSource";
import { PassEventsTable } from "./PassEventsTable";

export const PassCard = ({ pass }) => {
    const { id, family, client, therapyType, eventDuration, eventCount } = pass;

    const familySection = () => (
        <>
            <h2>Család</h2>
            <p className="familycard__sectioncontent">
                {family ? family.name : ""}
            </p>
        </>
    );

    const clientSection = () => (
        <>
            <h2>Kliens</h2>
            <p className="familycard__sectioncontent">
                {client ? client.name : ""}
            </p>
        </>
    );

    const newCard = () => (
        <div className={`familycard${id > 0 ? "" : " new"}`}>
            <div className="familycard__content">
                <h1>Új bérlet</h1>
            </div>
            <div className="familycard__buttonbar">
                <Link to={`/passes/${id}/edit`}>
                    <FontAwesomeIcon icon="edit" size="2x" />
                </Link>
            </div>
        </div>
    )

    if (id < 1) {
        return newCard();
    }

    return (
        <div className={`familycard${id > 0 ? "" : " new"}`}>
            <div className="familycard__content">
                <h1>{`${therapyType.description} bérlet`}</h1>
                <p className="familycard__sectioncontent">
                    {`${eventCount} x ${eventDuration.description}`}
                </p>
                {client ? clientSection() : ""}
                {family ? familySection() : ""}
                <PassEventDataSource pass={pass}>
                    <PassEventsTable />
                </PassEventDataSource>
            </div>
            <div className="familycard__buttonbar">
                <Link to={`/passes/${id}`} className="svg-button">
                    <FontAwesomeIcon icon={["far", "eye"]} size="2x" />
                </Link>
                <Link to={`/passes/${id}/edit`}>
                    <FontAwesomeIcon icon="edit" size="2x" />
                </Link>
            </div>
        </div>
    );
}