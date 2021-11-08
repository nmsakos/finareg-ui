import { gql } from "@apollo/client";

export const LOAD_PASSES = gql`
    query getPasses($onlyOpen: Boolean) {
        therapyPasses(onlyOpen: $onlyOpen) {
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
        }
    }
`
export const LOAD_PASSES_OF_CLIENT = gql`
    query getPassesOfClient ($clientId: ID!, $onlyOpen: Boolean) {
        passesOfClient(clientId: $clientId, onlyOpen: $onlyOpen) {
            id
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
        }
    }
`

export const LOAD_EVENTS_OF_PASS = gql`
    query getEventsOfPass($passId: ID!){
        eventsOfPass(passId: $passId) {
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
                id
                therapyType {
                    id
                }
                family {
                    id
                    name
                }
                eventCount
                eventDuration {
                    id
                    minutes
                    description
                }
                firstEvent {
                    id
                }
                eventsTaken
            }
        }
    }
`