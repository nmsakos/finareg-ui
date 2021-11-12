import { configs } from "../../configs";
import { getHourAndMin } from "../../utils";

class TimeTableEventValidator {

    static isEventValid = (event) => {
        const fromHourAndMin = getHourAndMin(event.fromTime);
        const toHourAndMin = getHourAndMin(event.toTime);
        if (fromHourAndMin.hour < configs.minHour) {
            return `Időpont kezdete nem lehet ${configs.minHour} óra előtti`
        }
        if ((fromHourAndMin.hour > toHourAndMin.hour) ||
            (fromHourAndMin.hour === toHourAndMin.hour && fromHourAndMin.min >= toHourAndMin.min)) {
            return `Időpont vége nem lehet a kezdete előtti`
        }
        if (toHourAndMin.hour > configs.maxHour) {
            return `Időpont vége nem lehet ${configs.maxHour} óra utáni`
        }
        if (!event.therapyType || !event.therapyType.id) {
            return `Adj meg terápia típust!`
        }
        if (!event.therapist || !event.therapist.id) {
            return `Adj meg terapeutát!`
        }
        if (!event.room || !event.room.id) {
            return `Adj meg szobát!`
        }

        const clients = event.clients

        const foundIndex = clients.findIndex(client => parseInt(client.id) < 0)
        if (foundIndex > -1) {
            return `Válassz klienst a ${foundIndex + 1}. sorban!`
        }

        const duplicate =
            clients
                .map((c1, index) => {
                    return { id: c1.id, index: index, count: clients.filter(c2 => c1.id === c2.id).length }
                })
                .find(c3 => c3.count > 1)

        if (duplicate) {
            return `A klienst a ${duplicate.index + 1}. sorban megadtad még egyszer!`
        }


        console.log(event.clients);

        return;
    }
}

export default TimeTableEventValidator