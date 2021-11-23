import { useTimeTable } from "../../Hooks/useTimeTable";
import { days, formatTime, getHourAndMin } from "../../utils";
import { Selector } from "../Selector";

export const TimeTableSelector = ({ ...props }) => {
    const clients = props["clients"]
    const clientIds = clients && clients.map(c => c.id)
    const therapyType = props["therapytype"]
    const timeTables = useTimeTable(clientIds, therapyType)

    const descriptionFun = (value) => {
        return `${days[value.dayOfWeek-1].description} ${formatTime(getHourAndMin(value.fromTime))} - ${formatTime(getHourAndMin(value.toTime))}`
    }

    return timeTables ? (<>
        <Selector {...props} values={timeTables} descriptionFun={descriptionFun} /> </>
    ) : <p>Ajjaj (órarend)</p>;
}