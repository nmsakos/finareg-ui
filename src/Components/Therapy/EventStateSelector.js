import { useEventStates } from "../../Hooks/useEventStates";
import { Selector } from "../Selector";

export const EventStateSelector = ({...props}) => {
    const eventStates = useEventStates()

    return eventStates ? (
        <Selector {...props} values={eventStates} descriptionField="description" />
    ) : null;
}