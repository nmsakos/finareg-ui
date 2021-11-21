import { EventDurationsCard } from "./EventDurationsCard"
import { RoomsCard } from "./RoomsCard"
import { TherapyEventStatesCard } from "./TherapyEventStatesCard"
import { TherapyTypesCard } from "./TherapyTypesCard"

export const BaseDataList = () => {
    return (
        <div className="family-card-container">
            <RoomsCard />
            <TherapyTypesCard />
            <TherapyEventStatesCard />
            <EventDurationsCard />
        </div>
    )
}