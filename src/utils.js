import { configs } from "./configs";
import setDate from "date-fns/setDate"

const isFieldEqual = (o1Val, o2Val) => {

    if (o1Val === o2Val) {
        return true;
    }

    const o1IsNull = o1Val === null;
    const o2IsNull = o2Val === null;

    if (o1IsNull !== o2IsNull) {
        return false;
    }

    if (o1IsNull) {
        return true;
    }

    if (Array.isArray(o1Val)) {
        return isArrayEqual(o1Val, o2Val)
    }

    return isEqual(o1Val, o2Val);
}

const isArrayEqual = (arr1, arr2) => {
    if (!Array.isArray(arr2)) {
        return false;
    }

    if (arr1.length !== arr2.length) {
        return false;
    }

    return arr1.filter(val1 => !arr2.find(val2 => isEqual(val1, val2))).length === 0;
}

export const isEqual = (o1, o2) => {
    if (o1 === o2) {
        return true;
    }

    const o1IsNull = o1 ? false : true;
    const o2IsNull = o2 ? false : true;

    if (o1IsNull !== o2IsNull) {
        return false;
    }

    if (typeof o1 !== typeof o2) {
        return false;
    }

    if (o1IsNull) {
        return true;
    }

    if (Array.isArray(o1)) {
        return isArrayEqual(o1, o2)
    }

    if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false;
    }

    if (Object.keys(o1).length === 0 || typeof o1 !== "object") {
        return o1 === o2;
    }

    if (Object.keys(o1).filter(key => !isFieldEqual(o1[key], o2[key])).length > 0) {
        return false;
    };

    return true;
}

export const formatTime = (hourAndMin, withSeconds, withLeadingZeroInHours) => {
    var hourPart = `${hourAndMin.hour}`
    if (withLeadingZeroInHours) {
        hourPart = `${hourAndMin.hour.toString().padStart(2, '0')}`
    }
    return `${hourPart}:${hourAndMin.min.toString().padStart(2, '0')}${withSeconds ? ":00" : ""}`
}

export const parseTime = (time) => {
    return formatTime(getHourAndMin(time), true, true) + "+01:00"
}

export const getMinsFromDayStart = (hoursAndMins) => {
    return (hoursAndMins.hour - configs.minHour) * 60 + hoursAndMins.min;
}

export const compareHourAndMins = (hourAndMin1, hourAndMin2) => {
    if (hourAndMin1.hour < hourAndMin2.hour) {
        return -1
    }
    if (hourAndMin1.hour > hourAndMin2.hour) {
        return 1
    }

    if (hourAndMin1.min < hourAndMin2.min) {
        return -1
    }
    if (hourAndMin1.min > hourAndMin2.min) {
        return 1
    }

    return 0
}

export const periodsOverlaping = (period1, period2) => {
    return (compareHourAndMins(period1[0], period2[0]) >= 0 && compareHourAndMins(period1[0], period2[1]) < 0) ||
        (compareHourAndMins(period1[1], period2[0]) > 0 && compareHourAndMins(period1[1], period2[1]) <= 0)
}

export const getHourAndMin = (time) => {
    const splitAndSlice = time.split(":").slice(0, 2)
    return {
        hour: parseInt(splitAndSlice[0]),
        min: parseInt(splitAndSlice[1])
    };
}

export const getFirstDayOfWeekInMonth = (dayOfWeek) => {
    return setDate(new Date(), dayOfWeek, {weekStartsOn: 1})
}

export const days = [
    {id: "1", description: "Hétfő"},
    {id: "2", description: "Kedd"},
    {id: "3", description: "Szerda"},
    {id: "4", description: "Csütörtök"},
    {id: "5", description: "Péntek"}
]

export const getClientNames = (clients, limit) => {
    if (clients) {
        if (limit && clients.length > limit) {
            return `Csoport (${clients.length})`
        } else if (clients.length > 0) {
            return clients.map(client => client.name).join(", ")
        }
    }

    return "Szabad"
}

export const tooltipText = e => e && `
        <p>${e.therapist ? e.therapist.name : ""}</p>
        <p>${e.family ? e.family.name : ""}</p>
        <p>${e.clients ? getClientNames(e.clients) : "Szabad"}</p>
        <p>${e.room ? e.room.description : ""}</p>
        <p>${e.therapyType ? e.therapyType.description : ""}</p>
`;

export const dateToString = (date) => new Date(date).toLocaleDateString(
    'hu-HU',
    {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
)

export const minusOneIfNull = (field) => {
    if (field) {
        return field.id ? field.id : "-1"
    } else {
        return "-1"
    }
}

