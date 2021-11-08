import { useTherapist } from "../../Hooks/useTherapist";
import { Selector } from "../Selector";

export const TherapistSelector = ({onChange, className, addAllOption, defaultValue}) => {
    const therapists = useTherapist(addAllOption)

    return therapists && (
        <Selector defaultValue={defaultValue || therapists[0]} values={therapists} onChange={onChange} className={className} descriptionField="name" />
    );
}