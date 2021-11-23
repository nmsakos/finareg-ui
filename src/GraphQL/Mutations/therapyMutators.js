import gql from "graphql-tag";
import { therapyEventBody, therapyPassBody } from "../Queries/therapyQueries";

export const UPDATE_THERAPY_EVENT = gql`
    mutation updateEvent($id: ID!, $clientId: ID, $date: DateTime, $weekId: ID, $dayOfWeek: Int, $passId: ID!, $invoice: ID, $therapistId: ID, $roomId: ID, $stateId: ID!) {
        updateEvent(id: $id, clientId: $clientId, date: $date, 
            weekId: $weekId, dayOfWeek: $dayOfWeek, passId: $passId, 
            invoice: $invoice, therapistId: $therapistId, roomId: $roomId, stateId: $stateId) {
                ${therapyEventBody}
            }
    }
`

export const CREATE_THERAPY_EVENT = gql`
    mutation createEvent($clientId: ID, $date: DateTime, $weekId: ID, $dayOfWeek: Int, $passId: ID!, $invoice: ID, $therapistId: ID, $roomId: ID, $stateId: ID!) {
        createEvent(clientId: $clientId, date: $date, 
            weekId: $weekId, dayOfWeek: $dayOfWeek, passId: $passId, 
            invoice: $invoice, therapistId: $therapistId, roomId: $roomId, stateId: $stateId) {
                ${therapyEventBody}
            }
    }
`

export const SAVE_PASS = gql`
    mutation savePass($id: ID!, $clientId: ID, $familyId: ID, $therapyTypeId: ID, $eventCount: Int, 
        $eventDurationId: ID, $firstEventId: ID, $eventsTaken: Int, $invoice: ID) {
            savePass(id: $id, clientId: $clientId, familyId: $familyId, therapyTypeId: $therapyTypeId, eventCount: $eventCount, 
                eventDurationId: $eventDurationId, firstEventId: $firstEventId, eventsTaken: $eventsTaken, invoice: $invoice) {
                ${therapyPassBody}
            }
        }
`

export const CREATE_PASS = gql`
    mutation createPass($therapyType: ID!, $eventCount: Int, $eventDuration: ID!, 
        $clientId: ID, $familyId: ID!, $firstEventDate: DateTime, $firstTimeTable: ID!) {
        createPass(therapyType: $therapyType, eventCount: $eventCount, eventDuration: 
            $eventDuration, clientId: $clientId, familyId: $familyId, 
            firstEventDate: $firstEventDate, firstTimeTable: $firstTimeTable) {
            ${therapyPassBody}
        }
    }
`