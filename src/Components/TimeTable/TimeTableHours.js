export const TimeTableHours = ({minHour, maxHour}) => {
    const cells = []
    for (var i = minHour; i <= maxHour; i++) {
        cells.push(<p className="timetable-hours-hour" key={`${i}.0`} >{`${i}:00`}</p>);
        cells.push(<p className="timetable-hours-hour" key={`${i}.5`} >{`${i}:30`}</p>);
    }
    return cells
}