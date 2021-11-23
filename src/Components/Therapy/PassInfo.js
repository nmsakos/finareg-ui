import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { client } from "../../Config/ApolloProviderWithClient";
import { LOAD_EVENTS_OF_PASS, LOAD_PASS } from "../../GraphQL/Queries/therapyQueries";
import { dateToString } from "../../utils";
import { PassBaseInfo } from "./PassBaseInfo";
import { PassClientInfo } from "./PassClientInfo";
import { PassEventsInfo } from "./PassEventsInfo";
import { PassEventSummary } from "./PassEventSummary";

export const PassInfo = ({ passId }) => {
    const location = useLocation();

    const [events, setEvents] = useState([]);
    const [pass, setPass] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await client.query({
                query: LOAD_EVENTS_OF_PASS,
                variables: {
                    passId: passId,
                    noCancelled: false
                }
            });
            setEvents(response.data.eventsOfPass
                .map(e => {
                    const add = { dateStr: dateToString(e.date) }
                    return {
                        ...e,
                        ...add
                    }
                })
            );
        })();
        (async () => {
            const response = await client.query({
                query: LOAD_PASS,
                variables: {
                    passId: passId
                }
            });
            setPass(response.data.therapyPass)
        })();
    }, [passId]);

    return events && pass ? (
        <div className="contentwrapper">
            <h1>Bérlet adatok:</h1>
            <div className="flex-table column" >
                <div className="flex-table row" >
                    <PassBaseInfo pass={pass} />
                    <PassClientInfo pass={pass} />
                    <PassEventSummary events={events} />
                </div>
                <h1>Alkalmak:</h1>
                <PassEventsInfo events={events} />
                <div className="flex-table row" >
                    <Link to={"/passes"} className="svg-button" >
                        <FontAwesomeIcon icon="arrow-left" size="2x" />
                    </Link>
                    <Link to={location.pathname + "/edit"} className="svg-button" >
                        <FontAwesomeIcon icon="edit" size="2x" />
                    </Link>
                </div>
            </div >
        </div>

    ) : null;
}