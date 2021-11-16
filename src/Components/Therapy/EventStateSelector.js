import { useEventStates } from "../../Hooks/useEventStates";
import { Selector } from "../Selector";

export const EventStateSelector = ({ onChange, className, addAllOption, defaultValue, value }) => {
    const eventStates = useEventStates()

    return eventStates ? (
        <Selector defaultValue={defaultValue} value={value} values={eventStates} addAllOption={addAllOption} onChange={onChange} className={className} descriptionField="description" />
    ) : null;
}