import gql from "graphql-tag";

export const LOAD_ROOMS = gql`
    query {
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
    query getTimeTablesByClient($client: ID!) {
        timeTablesByClient(client: $client) {
            ${timeTableBody}
        }
    }
`