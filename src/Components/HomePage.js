import ReactDatePicker from "react-datepicker"
import { getFirstDayOfWeekInMonth } from "../utils"

export const HomePage = () => {

    const today = new Date()
    const monday = getFirstDayOfWeekInMonth(2)

    return <div className="contentwrapper">
        <ReactDatePicker selected={today} />
        <ReactDatePicker selected={monday} />
    </div>
}