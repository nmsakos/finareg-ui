import React, { useEffect, useState } from "react"
import { client } from "../../Config/ApolloProviderWithClient";
import { LOAD_EVENTS_OF_PASS } from "../../GraphQL/Queries/therapyQueries";

export const PassEventDataSource = ({pass, children}) => {
    const [state, setState] = useState([]);
    const {id} = pass;

    useEffect(() => {
        (async () => {
            const response = await client.query({
                query: LOAD_EVENTS_OF_PASS,
                variables: { passId: id }
            });
            setState(response.data.eventsOfPass);
        })();
    }, [id]);

    return (
		<>
		{React.Children.map(children, child => {
			if (React.isValidElement(child)) {
				return React.cloneElement(child, { pass: pass, events: state });
			}

			return child;
		})}
		</>
	);
}