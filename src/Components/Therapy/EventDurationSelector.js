import { useEventDurations } from "../../Hooks/useEventDurations";
import { Selector } from "../Selector";

export const EventDurationSelector = ({...props}) => {
    const eventDurations = useEventDurations()

    return eventDurations ? (
        <Selector {...props} values={eventDurations} descriptionField="description" />
    ) : null;
}