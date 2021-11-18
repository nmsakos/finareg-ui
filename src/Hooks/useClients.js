import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_CLIENTS, LOAD_CLIENTS_OF_FAMILY } from "../GraphQL/Queries/familyQueries";

export const useClients = (family) => {
    const [clients, setClients] = useState();
    var query = LOAD_CLIENTS
    var variables = {}
    var resultField = "clients"
    if (family) {
        query = LOAD_CLIENTS_OF_FAMILY
        variables = {familyId: family.id}
        resultField = "clientsOfFamily"
    }
    const { error, data } = useQuery(query, 
        {variables: variables});

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            setClients(data[resultField]);
        }
    }, [error, data, resultField]);

    return clients;
}