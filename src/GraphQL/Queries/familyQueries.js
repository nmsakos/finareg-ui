import { gql } from "@apollo/client";

export const clientBody = `
            id
            name
            phone
            email
            familyId
`

export const parentBody = `
            id
            name
            phone
            email
            familyId
`            

export const familyBody = `
            id
            name
            clients {
                ${clientBody}
            }
            parents {
                ${parentBody}
            }
`
export const familyBodyShort = `
            id
            name
`

export const LOAD_FAMILIES = gql`
    query {
        families {
            ${familyBody}
        }
    }    
`

export const LOAD_FAMILIES_SHORT = gql`
    query {
        families {
            ${familyBodyShort}
        }
    }    
`

export const LOAD_FAMILY = gql`
    query getFamily($familyId: ID!) {
        family(id: $familyId) {
            ${familyBody}
        }
    }
`

export const LOAD_PARENT = gql`
    query getParent($id: ID!) {
        parent(id: $id) {
            ${parentBody}
        }
    }
`

export const LOAD_CLIENT = gql`
    query getClient($id: ID!) {
        client(id: $id) {
            ${clientBody}
        }
    }
`

export const LOAD_CLIENTS = gql`
    query getClients {
        clients {
            ${clientBody}
        }
    }
`

export const LOAD_PARENTS_OF_FAMILY = gql`
    query getParentsOfFamily($familyId: ID!) {
        parentsOfFamily(famlyId: $familyId) {
            ${parentBody}
        }
    }
`
export const LOAD_CLIENTS_OF_FAMILY = gql`
    query getClientsOfFamily($familyId: ID!) {
        clientsOfFamily(familyId: $familyId) {
            ${clientBody}
        }
    }
`