import { useEffect, useState } from "react";
import { client } from "../Config/ApolloProviderWithClient";
import { LOAD_FAMILY } from "../GraphQL/Queries/familyQueries";

export const useFamily = ( familyId ) => {
    const [family, setFamily] = useState(null);

    useEffect(() => {
        if (familyId && familyId > 0) {
            (async () => {
                const response = await client.query({
                    query: LOAD_FAMILY,
                    variables: { familyId: familyId }
                });
                setFamily(response.data.family);
            })();
        }
        else {
            const newFamily = {
                id: 0,
                name: "Új család",
                parents: [],
                clients: []
            };
            setFamily(newFamily);
    }
    }, [familyId]);

    return family;
}