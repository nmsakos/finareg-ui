import { useEffect, useState } from "react";
import { client } from "../Config/ApolloProviderWithClient";
import { LOAD_TIMETABLE_BY_CLIENT, LOAD_TIMETABLE_BY_CLIENT_AND_THERAPY_TYPE } from "../GraphQL/Queries/timeTableQueries";

export const useTimeTable = (clientIds, therapyType) => {
    const [timeTables, setTimeTables] = useState();

    useEffect(() => {
        (async () => {
            var query = LOAD_TIMETABLE_BY_CLIENT
            var variables = {
                clients: clientIds || []
            }
            var field = "timeTablesByClients"
        
            if (therapyType) {
                query = LOAD_TIMETABLE_BY_CLIENT_AND_THERAPY_TYPE 
                variables.therapyType= therapyType?.id
                field = "timeTablesByClientsAndTherapyType"
            }

            const response = await client.query({
                query: query,
                variables: variables
            });
            const data = response.data[field]
            setTimeTables(data);
        })();
    }, [clientIds, therapyType]);

    return timeTables;

}