import { useEffect, useState } from "react";
import { client } from "../Config/ApolloProviderWithClient";
import { LOAD_PASSES } from "../GraphQL/Queries/therapyQueries";

export const usePasses = (onlyOpen) => {
    const [passes, setPasses] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await client.query({
                query: LOAD_PASSES,
                variables: {onlyOpen: onlyOpen}
            });
            setPasses(response.data.therapyPasses);
        })();
    }, [onlyOpen]);
    return passes;

}