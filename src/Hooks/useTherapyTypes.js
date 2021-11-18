import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_THERAPY_TYPES } from "../GraphQL/Queries/timeTableQueries";

export const useTherapyTypes = () => {
    const [therapyTypes, setTherapyTypes] = useState();
    const { error, data } = useQuery(LOAD_THERAPY_TYPES);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            setTherapyTypes(data.therapyTypes);
        }
    }, [error, data]);

    return therapyTypes;
}