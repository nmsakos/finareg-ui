import gql from "graphql-tag";

export const LOAD_ROOMS = gql`
    query getRooms {
        rooms {
            id
            description
        }
    }
`

export const LOAD_THERAPISTS = gql`
    query {
        therapists {
            id
            name
            phone
            email
        }
    }  
`

export const LOAD_THERAPY_TYPES = gql`
    query {
        therapyTypes {
            id
            description
        }
      } 
`

export const timeTableBody = `
            id
            dayOfWeek
            fromTime
            toTime
            therapyType {
                id
                description
            }
            room {
                id
                description
            }
            clients {
                id
                name
            }
            therapist {
                id
                name
                phone
                email
            }
`

export const LOAD_TIMETABLE = gql`
    query getTimeTablesFiltered($roomId: ID!, $therapist: ID!) {
        timeTablesFiltered(room: $roomId, therapist: $therapist) {
            ${timeTableBody}
        }
    }
`

export const LOAD_TIMETABLE_BY_CLIENT = gql`
    query getTimeTablesByClients($clients: [ID!]) {
        timeTablesByClients(clients: $clients) {
            ${timeTableBody}
        }
    }
`

export const LOAD_TIMETABLE_BY_CLIENT_AND_THERAPY_TYPE = gql`
    query getTimeTablesByClientsAndTherapyType($clients: [ID!], $therapyType: ID!) {
        timeTablesByClientsAndTherapyType(clients: $clients, therapyType: $therapyType) {
            ${timeTableBody}
        }
    }
`