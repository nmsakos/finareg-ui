import { useTherapist } from "../../Hooks/useTherapist";
import { Selector } from "../Selector";

export const TherapistSelector = ({...props}) => {
    const therapists = useTherapist()

    return therapists ? (
        <Selector {...props} values={therapists} descriptionField="name" />
    ) : <p>Ajjaj (terapeuta)</p>;
}