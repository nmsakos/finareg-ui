import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import hu from "date-fns/locale/hu"
import format from "date-fns/format"

export const HomePage = () => {
    const [selected, setSelected] = useState(new Date())
    const onChange = (changed) => {
        setSelected(changed)
    }

    return selected ? (
        <div className="contentwrapper">
            <h1>Home</h1>
            <DatePicker selected={selected} onChange={onChange} locale={hu} dateFormat="yyyy. MMMM dd, EEEE HH:mm:ss" showTimeInput />
            <p>{selected ? format(selected, "yyyy-MM-dd'T'HH:mm:ddXXX") : ""}</p>
        </div>
    ) : null;
}