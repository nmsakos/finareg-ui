import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export const HomePage = () => {
    const [selected, setSelected] = useState(new Date())
    const onChange = (changed) => {
        setSelected(changed)
    }

    return selected ? (
        <div className="contentwrapper">
            <h1>Home</h1>
            <DatePicker selected={selected} onChange={onChange} locale="hu" dateFormat="yyyy. MMM. dd" />
            {/*<p>{selected ? selected : ""}</p>*/}
        </div>
    ) : null;
}