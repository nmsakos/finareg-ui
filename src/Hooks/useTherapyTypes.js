import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_THERAPY_TYPES } from "../GraphQL/Queries/timeTableQueries";

export const useTherapyTypes = (addAllOption) => {
    const [therapyTypes, setTherapyTypes] = useState([]);
    const { error, data } = useQuery(LOAD_THERAPY_TYPES);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            let dataTherapyTypes = data.therapyTypes.map(value => { return { id: value.id, description: value.description } });
            if (addAllOption) {
                dataTherapyTypes = [{ id: "-1", description: "Összes" }, ...dataTherapyTypes]
            }
            setTherapyTypes(dataTherapyTypes);
        }
    }, [error, data, addAllOption]);

    return therapyTypes;
}