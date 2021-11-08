import gql from "graphql-tag"

export const SAVE_FAMILY = gql`
    mutation updateFamily($familyId: ID!, $name: String!) {
        updateFamily(id: $familyId, name: $name) {
            id 
            name
        }
    }
`

export const SAVE_PARENT = gql`
    mutation updateParent($id: ID!, $name: String!, $phone: String, $email: String, $familyId: ID!) {
        updateParent(id: $id, name: $name, phone: $phone, email: $email, familyId: $familyId) {
            id 
            name
            phone
            email
            familyId
        }
    }
`

export const SAVE_CLIENT = gql`
    mutation updateClient($id: ID!, $name: String!, $phone: String, $email: String, $familyId: ID!) {
        updateClient(id: $id, name: $name, phone: $phone, email: $email, familyId: $familyId) {
            id 
            name
            phone
            email
            familyId
        }
    }
`

export const REMOVE_PARENT = gql`
    mutation removeParent($id: ID!) {
        removeParent(id: $id)
    }
`

export const REMOVE_CLIENT = gql`
    mutation removeClient($id: ID!) {
        removeClient(id: $id)
    }
`
