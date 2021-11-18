import { useTherapyTypes } from "../../Hooks/useTherapyTypes";
import { Selector } from "../Selector";

export const TherapyTypeSelector = ({...props}) => {
    const therapyTypes = useTherapyTypes()

    return therapyTypes ? (
        <Selector {...props} values={therapyTypes} descriptionField="description" />
    ) : null;
}