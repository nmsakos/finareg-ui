const getDay = (dayOfWeek) => {
    switch (dayOfWeek) {
        case 1:
            return "Hétfő"
        case 2:
            return "Kedd"
        case 3:
            return "Szerda"
        case 4:
            return "Csütörtök"
        case 5:
            return "Péntek"
        default:
            return "Hétvége?"
    }
}

const getHourAndMin = (time) => {
    const splitAndSlice = time.split(":").slice(0, 2)
    return {
        hour: parseInt(splitAndSlice[0]),
        min: parseInt(splitAndSlice[1])
    };
}

export const getFormatedTimeTableEntry = timetable => {
    const day = getDay(timetable.dayOfWeek)
    const fromHourAndMin = getHourAndMin(timetable.fromTime)
    const toHourAndMin = getHourAndMin(timetable.toTime)
    return [day, `${fromHourAndMin.hour}:${fromHourAndMin.min.toString().padStart(2, '0')} - ${toHourAndMin.hour}:${toHourAndMin.min.toString().padStart(2, '0')}`]
}