import gql from "graphql-tag";
import { timeTableBody } from "../Queries/timeTableQueries";

export const CREATE_TIME_TABLE = gql`
    mutation createTimeTableSlot(
        $dayOfWeek: Int, $fromTime: Time, $toTime: Time,
        $therapyType: ID!, $room: ID!, $therapist: ID!,
        $clients: [ID!]) {
        createTimeTableSlot(dayOfWeek: $dayOfWeek, fromTime: $fromTime, toTime: $toTime,
            therapyType: $therapyType, room: $room, therapist: $therapist,
            clients: $clients) {
                ${timeTableBody}
            }
    }
`

export const UPDATE_TIME_TABLE = gql`
    mutation updateTimeTableSlot($timeSlot: ID!,
        $dayOfWeek: Int, $fromTime: Time, $toTime: Time,
        $therapyType: ID!, $room: ID!, $therapist: ID!,
        $clients: [ID!]) {
        updateTimeTableSlot(timeSlot: $timeSlot, dayOfWeek: $dayOfWeek, fromTime: $fromTime, toTime: $toTime,
            therapyType: $therapyType, room: $room, therapist: $therapist,
            clients: $clients) {
                ${timeTableBody}
            }
    }
`

export const DELETE_TIME_TABLE = gql`
    mutation deleteTimeSlot($id: ID!) {
        deleteTimeTableSlot(timeSlot: $id) 
    }
`
