import { useTherapyTypes } from "../../Hooks/useTherapyTypes";
import { Selector } from "../Selector";

export const TherapyTypeSelector = ({ onChange, className, addAllOption, defaultValue }) => {
    const therapyTypes = useTherapyTypes()

    return therapyTypes ? (
        <Selector defaultValue={defaultValue} values={therapyTypes} addAllOption={addAllOption} onChange={onChange} className={className} descriptionField="description" />
    ) : null;
}