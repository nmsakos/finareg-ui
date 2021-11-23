import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
//import { client } from "../Config/ApolloProviderWithClient";
import { LOAD_PASSES } from "../GraphQL/Queries/therapyQueries";

export const usePasses = (onlyOpen) => {
    const [passes, setPasses] = useState(null);
    const {data, error} = useQuery(LOAD_PASSES, {query: LOAD_PASSES, variables: {onlyOpen: onlyOpen}, fetchPolicy: "no-cache", })

    /*useEffect(() => {
        (async () => {
            const response = await client.query({
                query: LOAD_PASSES,
                variables: {onlyOpen: onlyOpen}
            });
            setPasses(response.data.therapyPasses);
        })();
    }, [onlyOpen]);*/

    useEffect(() => {
        if (error) {
            console.log(error);
        } 
        if (data) {
            console.log(data);
            setPasses(data.therapyPasses)
        }
    }, [error, data])

    return passes;

}