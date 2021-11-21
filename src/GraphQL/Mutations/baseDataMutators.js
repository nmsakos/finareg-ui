import gql from "graphql-tag"

const initCap = (name) => name[0].toUpperCase()+name.slice(1)

const baseDataSaver = (name) => `mutation save${initCap(name)}($id: ID!, $description: String!) {
    save${initCap(name)}(id: $id, description: $description) {
        id
        description
    }
}`

export const SAVE_ROOM = gql`
    ${baseDataSaver("room")}
`

export const SAVE_EVENT_STATE = gql`
    ${baseDataSaver("therapyEventState")}
`

export const SAVE_THERAPY_TYPE = gql`
    ${baseDataSaver("therapyType")}
`

export const SAVE_EVENT_DURATION = gql`
    mutation saveTherapyEventDuration($id: ID!, $minutes: Int!, $description: String!) {
        saveTherapyEventDuration(id: $id, minutes: $minutes, description: $description) {
            id
            minutes
            description
        }
    }
`