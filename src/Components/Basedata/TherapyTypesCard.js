import { SAVE_THERAPY_TYPE } from "../../GraphQL/Mutations/baseDataMutators"
import { LOAD_THERAPY_TYPES } from "../../GraphQL/Queries/timeTableQueries"
import { IdAndDescriptionList } from "./IdAndDescriptionList"
import { withBaseDataList } from "./withBaseDataList"

export const TherapyTypesCard = withBaseDataList(IdAndDescriptionList, LOAD_THERAPY_TYPES, SAVE_THERAPY_TYPE, "therapyTypes", "Terápia típusok")