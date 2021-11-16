import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_EVENT_DURATIONS } from "../GraphQL/Queries/therapyQueries";

export const useEventDurations = () => {
    const [eventDurations, setEventDurations] = useState();
    const { error, data } = useQuery(LOAD_EVENT_DURATIONS);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            setEventDurations(data.therapyEventDurations);
        }
    }, [error, data]);

    return eventDurations;
}