import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_THERAPISTS } from "../GraphQL/Queries/timeTableQueries";

export const useTherapist = (addAllOption) => {
    const [therapists, setTherapists] = useState([]);
    const { error, data } = useQuery(LOAD_THERAPISTS);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            let dataTherapists = data.therapists.map(value => { return { id: value.id, name: value.name, phone: value.phone, email: value.email } });
            if (addAllOption) {
                dataTherapists = [{ id: "-1", name: "Összes", phone: "", email: "" }, ...dataTherapists]
            }
            setTherapists(dataTherapists);
        }
    }, [error, data, addAllOption]);

    return therapists;

}