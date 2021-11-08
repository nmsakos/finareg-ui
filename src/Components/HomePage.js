import { useState } from "react";
import { RoomSelector } from "./TimeTable/RoomSelector";

export const HomePage = () => {
    const [selected, setSelected] = useState(null)
    const onChange = (changed) => {
        setSelected(changed)
    }

    return (
        <div className="contentwrapper">
            <h1>Home</h1>
            <RoomSelector onChange={onChange} />
            <p>{selected ? selected.description : ""}</p>
        </div>
    );
}