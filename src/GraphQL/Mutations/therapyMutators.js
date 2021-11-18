import gql from "graphql-tag";
import { therapyEventBody } from "../Queries/therapyQueries";

export const UPDATE_THERAPY_EVENT = gql`
    mutation updateEvent($id: ID!, $clientId: ID!, $date: DateTime, $weekId: ID, $dayOfWeek: Int, $passId: ID!, $invoice: ID, $therapistId: ID, $roomId: ID, $stateId: ID!) {
        updateEvent(id: $id, clientId: $clientId, date: $date, 
            weekId: $weekId, dayOfWeek: $dayOfWeek, passId: $passId, 
            invoice: $invoice, therapistId: $therapistId, roomId: $roomId, stateId: $stateId) {
                ${therapyEventBody}
            }
    }
`

export const CREATE_THERAPY_EVENT = gql`
    mutation createEvent($clientId: ID!, $date: DateTime, $weekId: ID, $dayOfWeek: Int, $passId: ID!, $invoice: ID, $therapistId: ID, $roomId: ID, $stateId: ID!) {
        createEvent(clientId: $clientId, date: $date, 
            weekId: $weekId, dayOfWeek: $dayOfWeek, passId: $passId, 
            invoice: $invoice, therapistId: $therapistId, roomId: $roomId, stateId: $stateId) {
                ${therapyEventBody}
            }
    }
`