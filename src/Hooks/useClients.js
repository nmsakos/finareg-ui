import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_CLIENTS } from "../GraphQL/Queries/familyQueries";

export const useClients = () => {
    const [clients, setClients] = useState();
    const { error, data } = useQuery(LOAD_CLIENTS);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            setClients(data.clients);
        }
    }, [error, data]);

    return clients;
}