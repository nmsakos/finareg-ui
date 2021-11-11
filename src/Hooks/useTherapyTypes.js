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
            let dataTherapyTypes = data.therapyTypes.map(value => { return { id: value.id, description: value.description } });

            setTherapyTypes(dataTherapyTypes);
        }
    }, [error, data]);

    return therapyTypes;
}