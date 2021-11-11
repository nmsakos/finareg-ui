import { useTherapist } from "../../Hooks/useTherapist";
import { Selector } from "../Selector";

export const TherapistSelector = ({onChange, className, addAllOption, defaultValue}) => {
    const therapists = useTherapist()

    return therapists ? (
        <Selector defaultValue={defaultValue} values={therapists} addAllOption={addAllOption} onChange={onChange} className={className} descriptionField="name" />
    ) : null;
}