import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useFamily } from "../../Hooks/useFamily";
import { ClientsPanel } from "./ClientsPanel";
import { FamilyBaseInfo } from "./FamilyBaseInfo";
import { ParentsPanel } from "./ParentsPanel";
import "../../App.scss"

export const FamilyInfo = ({ familyId }) => {
    const family = useFamily(familyId) || {};
    const { clients, parents } = family || [];

    const location = useLocation();

    return family && clients && parents ? (
        <div className="contentwrapper">
            <FamilyBaseInfo family={family} />
            <ParentsPanel parents={parents} />
            <ClientsPanel clients={clients} />
            <div className="flex-table row" >
                <Link to={"/families"} className="svg-button" >
                    <FontAwesomeIcon icon="arrow-left" size="2x" />
                </Link>
                <Link to={location.pathname + "/edit"} className="svg-button" >
                    <FontAwesomeIcon icon="edit" size="2x" />
                </Link>
            </div>
        </div>
    ) : <p>Loading...</p>;
}