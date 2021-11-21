import { SAVE_EVENT_STATE } from "../../GraphQL/Mutations/baseDataMutators"
import { LOAD_EVENT_STATES } from "../../GraphQL/Queries/therapyQueries"
import { IdAndDescriptionList } from "./IdAndDescriptionList"
import { withBaseDataList } from "./withBaseDataList"

export const TherapyEventStatesCard = withBaseDataList(IdAndDescriptionList, LOAD_EVENT_STATES, SAVE_EVENT_STATE, "therapyEventStates", "Alkalom állapotok")