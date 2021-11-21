import { SAVE_ROOM } from "../../GraphQL/Mutations/baseDataMutators"
import { LOAD_ROOMS } from "../../GraphQL/Queries/timeTableQueries"
import { IdAndDescriptionList } from "./IdAndDescriptionList"
import { withBaseDataList } from "./withBaseDataList"

export const RoomsCard = withBaseDataList(IdAndDescriptionList, LOAD_ROOMS, SAVE_ROOM, "rooms", "Szobák")