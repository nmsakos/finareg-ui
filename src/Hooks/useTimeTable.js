import { useEffect, useState } from "react";
import { client } from "../Config/ApolloProviderWithClient";
import { LOAD_TIMETABLE_BY_CLIENT } from "../GraphQL/Queries/timeTableQueries";

export const useTimeTable = (clientId) => {
    const [timeTables, setTimeTables] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await client.query({
                query: LOAD_TIMETABLE_BY_CLIENT,
                variables: { client: clientId }
            });
            setTimeTables(response.data.timeTablesByClient);
        })();
    }, [clientId]);

    return timeTables;

}