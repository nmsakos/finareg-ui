import { SAVE_EVENT_DURATION } from "../../GraphQL/Mutations/baseDataMutators"
import { LOAD_EVENT_DURATIONS } from "../../GraphQL/Queries/therapyQueries"
import { EventDurationList } from "./EventDurationList"
import { withBaseDataList } from "./withBaseDataList"

export const EventDurationsCard = withBaseDataList(EventDurationList, LOAD_EVENT_DURATIONS, SAVE_EVENT_DURATION, "therapyEventDurations", "Alkalom időtartamok")