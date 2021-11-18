import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_FAMILIES, LOAD_FAMILIES_SHORT } from "../GraphQL/Queries/familyQueries";

export const useFamilies = (short) => {
    const [families, setFamilies] = useState([]);
    const query = short ? LOAD_FAMILIES_SHORT : LOAD_FAMILIES
    const { error, data } = useQuery(query);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            setFamilies(data.families);
        }
    }, [error, data]);

    return families;

}