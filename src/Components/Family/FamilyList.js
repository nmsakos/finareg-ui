import { useFamilies } from "../../Hooks/useFamilies";
import '../../App.scss';
import { FamilyCard } from "./FamilyCard";

export const FamilyList = () => {
    const familyList = useFamilies();

    return (
        <div className="family-card-container">
            {familyList.map((value, index) => (
                <FamilyCard family={value} key={index} />
            ))}
            <FamilyCard family={{id:0}} key="-1" />
        </div>
    );
}