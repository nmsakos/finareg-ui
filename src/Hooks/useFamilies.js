import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_FAMILIES } from "../GraphQL/Queries/familyQueries";

export const useFamilies = () => {
    const [families, setFamilies] = useState([]);
    const { error, data } = useQuery(LOAD_FAMILIES);

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