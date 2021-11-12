import { gql } from "@apollo/client";

export const LOAD_FAMILIES = gql`
    query {
        families {
            id
            name
            clients {
                id
                name
            }
            parents {
                id
                name
            }
        }
    }    
`

export const LOAD_FAMILY = gql`
    query getFamily($familyId: ID!) {
        family(id: $familyId) {
            id
            name
            clients {
                id
                name
                familyId
            }
            parents {
                id
                name
                phone
                email
                familyId
            }
        }
    }
`

export const LOAD_PARENT = gql`
    query getParent($id: ID!) {
        parent(id: $id) {
            id
            name
            phone
            email
            familyId
        }
    }
`

export const LOAD_CLIENT = gql`
    query getClient($id: ID!) {
        client(id: $id) {
            id
            name
            phone
            email
            familyId
        }
    }
`

export const LOAD_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            phone
            email
            familyId
        }
    }
`

export const LOAD_PARENTS_OF_FAMILY = gql`
    query getParentsOfFamily($familyId: ID!) {
        parentsOfFamily(famlyId: $familyId) {
            id
            name
            phone
            email
            familyId
        }
    }
`
export const LOAD_CLIENTS_OF_FAMILY = gql`
    query getClientsOfFamily($familyId: ID!) {
        clientsOfFamily(familyId: $familyId) {
            id
            name
            familyId
        }
    }
`