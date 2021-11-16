import { useEventDurations } from "../../Hooks/useEventDurations";
import { Selector } from "../Selector";

export const EventDurationSelector = ({ onChange, className, addAllOption, defaultValue, value }) => {
    const eventDurations = useEventDurations()

    return eventDurations ? (
        <Selector defaultValue={defaultValue} value={value} values={eventDurations} addAllOption={addAllOption} onChange={onChange} className={className} descriptionField="description" />
    ) : null;
}