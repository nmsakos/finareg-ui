import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_THERAPISTS } from "../GraphQL/Queries/timeTableQueries";

export const useTherapist = () => {
    const [therapists, setTherapists] = useState();
    const { error, data } = useQuery(LOAD_THERAPISTS);
    
    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            let dataTherapists = data.therapists.map(value => { return { id: value.id, name: value.name, phone: value.phone, email: value.email } });
            setTherapists(dataTherapists);
        }
    }, [error, data]);

    return therapists;

}