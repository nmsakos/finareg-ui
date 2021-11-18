import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { client } from "../../Config/ApolloProviderWithClient";
import { LOAD_EVENTS_OF_PASS, LOAD_PASS } from "../../GraphQL/Queries/therapyQueries";
import { dateToString } from "../../utils";

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
                    const add = { dateStr: dateToString(e) }
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

    const hasCompleted = () => {
        return events && events.find(e => e.state.id === "2")
    }

    return events && pass ? (
        <div className="contentwrapper">
            <div className="flex-table row" >
                <div>
                    <h1>Bérlet adatok:</h1>
                    <table><tbody>
                        <tr>
                            <th>Család</th>
                            <td>{pass.family.name}</td>
                        </tr>
                        <tr>
                            <th>Kliens</th>
                            <td>{pass.client && pass.client.name}</td>
                        </tr>
                        <tr>
                            <th>Terápia típus:</th>
                            <td>{pass.therapyType.description}</td>
                        </tr>
                        <tr>
                            <th>Alkalmak száma:</th>
                            <td>{pass.eventCount}</td>
                        </tr>
                        <tr>
                            <th>Időtartam:</th>
                            <td>{pass.eventDuration.description}</td>
                        </tr>
                    </tbody></table>
                    <h1>Alkalmak:</h1>
                    <table><tbody>
                        <tr>
                            <th>Dátum</th>
                            <th>Állapot</th>
                            {hasCompleted() ? (
                                <>
                                    <th>Terapeuta</th>
                                    <th>Szoba</th>
                                </>) : null}
                        </tr>
                        {events.map(e =>
                            <tr key={e.id}>
                                <td>{e.dateStr}</td>
                                <td>{e.state.description}</td>
                                {e.state.id === "2" ? <>
                                    <td>{e.therapist?.name}</td>
                                    <td>{e.room?.description}</td>
                                </> : null}
                            </tr>)}

                    </tbody></table>
                    <Link to={location.pathname + "/edit"} className="svg-button" >
                        <FontAwesomeIcon icon="edit" size="2x" />
                    </Link>
                </div>
                <div>
                    <table><tbody>
                        <tr>
                            <th>Előjegyzett alkalmak száma:</th>
                            <td>{events.length}</td>
                        </tr>
                        <tr>
                            <th>Tervezett:</th>
                            <td>{events.filter(e => e.state.id === "1").length}</td>
                        </tr>
                        <tr>
                            <th>Megtartott:</th>
                            <td>{events.filter(e => e.state.id === "2").length}</td>
                        </tr>
                        <tr>
                            <th>Elmaradt:</th>
                            <td>{events.filter(e => e.state.id === "3").length}</td>
                        </tr>
                    </tbody></table>
                </div>
            </div >
        </div>

    ) : null;
}