import { configs } from "../../configs";

export const TimeTableHours = () => {
    const cells = []
    for (var i = configs.minHour; i <= configs.maxHour; i++) {
        cells.push(<p className="timetable-hours-hour" key={`${i}.0`} >{`${i}:00`}</p>);
        cells.push(<p className="timetable-hours-hour" key={`${i}.5`} >{`${i}:30`}</p>);
    }
    return cells
}