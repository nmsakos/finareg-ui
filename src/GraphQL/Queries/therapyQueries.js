import { gql } from "@apollo/client";

const therapyPassBody = `
            id
            client {
                id
                name
                familyId
            }
            family {
                id
                name
            }
            therapyType {
                id
                description
            }
            eventDuration {
                id
                minutes
                description
            }
            eventsTaken
            eventCount
`

export const LOAD_PASSES = gql`
    query getPasses($onlyOpen: Boolean) {
        therapyPasses(onlyOpen: $onlyOpen) {
            ${therapyPassBody}
        }
    }
`
export const LOAD_PASS = gql`
    query getPass($passId: ID!) {
        therapyPass(passId: $passId) {
            ${therapyPassBody}
        }
    }
`
export const LOAD_PASSES_OF_CLIENT = gql`
    query getPassesOfClient ($clientId: ID!, $onlyOpen: Boolean) {
        passesOfClient(clientId: $clientId, onlyOpen: $onlyOpen) {
            ${therapyPassBody}
        }
    }
`

export const LOAD_EVENTS_OF_PASS = gql`
    query getEventsOfPass($passId: ID!, $noCancelled: Boolean!){
        eventsOfPass(passId: $passId, noCancelled: $noCancelled) {
            id
            client {
                id
                name
                familyId
            }
            date
            week {
                id
                year
                number
            }
            dayOfWeek
            cancelled
            therapyPass {
                ${therapyPassBody}
            }
            state {
                id
                description
            }
        }
    }
`

export const LOAD_EVENT_DURATIONS = gql`
    query getTherapyEventDurations {
        therapyEventDurations {
            id
            minutes
            description
        }
    }
`

export const LOAD_EVENT_STATES = gql`
    query getTherapyEventStates {
        therapyEventStates {
            id
            description
        }
    }
`