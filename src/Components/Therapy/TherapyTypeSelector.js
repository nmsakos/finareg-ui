import { useTherapyTypes } from "../../Hooks/useTherapyTypes";
import { Selector } from "../Selector";

export const TherapyTypeSelector = ({onChange, className, addAllOption, defaultValue}) => {
    const therapyTypes = useTherapyTypes(addAllOption)

    return therapyTypes && (
        <Selector defaultValue={defaultValue || therapyTypes[0]} values={therapyTypes} onChange={onChange} className={className} descriptionField="description" />
    );
}