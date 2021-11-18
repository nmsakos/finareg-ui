import { gql } from "@apollo/client";
import { clientBody, familyBodyShort } from "./familyQueries";

export const therapyPassBody = `
            id
            client {
                ${clientBody}
            }
            family {
                ${familyBodyShort}
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
            firstEvent {
                id
            }
            eventsTaken
            eventCount
`

export const therapyEventBody = `
            id
            client {
                ${clientBody}
            }
            date
            week {
                id
                year
                number
            }
            dayOfWeek
            therapist {
                id
                name
                phone
                email
            }
            room {
                id
                description
            }
            therapyPass {
                ${therapyPassBody}
            }
            state {
                id
                description
            }
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
            ${therapyEventBody}
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