import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_EVENT_STATES } from "../GraphQL/Queries/therapyQueries";

export const useEventStates = () => {
    const [eventStates, setEventStates] = useState();
    const { error, data } = useQuery(LOAD_EVENT_STATES);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            setEventStates(data.therapyEventStates);
        }
    }, [error, data]);

    return eventStates;
}