import { useState } from "react";
import { usePasses } from "../../Hooks/usePasses";
import { PassCard } from "./PassCard";

export const PassList = ({ clientId, familyId }) => {
    const [onlyOpen, setOnlyOpen] = useState(false)
    const passList = usePasses(onlyOpen);

    const onOnlyOpenClick = () => {
        setOnlyOpen(!onlyOpen);
    }
    console.log(passList)
    return passList && (
        <div>
            <div className="toolbar">
                <button className={`toolbar-button${onlyOpen ? " toggled" : ""}`} onClick={onOnlyOpenClick}>Csak nyitott</button>
            </div>
            <div className="family-card-container">
                {passList.map((value, index) => (
                    <PassCard pass={value} key={index} />
                ))}
                <PassCard pass={{ id: 0 }} key="-1" />
            </div>
        </div>
    );

}