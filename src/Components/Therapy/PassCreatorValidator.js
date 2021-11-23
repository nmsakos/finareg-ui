import { days } from "../../utils";

class PassCreatorValidator {

    static isPassDataValid = (passData) => {
        if (!passData.therapyType || passData.therapyType.id < 1) {
            return "Adj meg terápia típust!"
        }
        if (!passData.eventCount || passData.eventCount < 1) {
            return "Add meg az alkalmak számát!"
        }
        if (!passData.eventDuration || passData.eventDuration.id < 1) {
            return "Adj meg időtartamot!"
        }
        if (!passData.family || passData.family.id < 1) {
            return "Adj meg családot!"
        }
        if (!passData.firstTimeTable || passData.firstTimeTable.id < 1) {
            return "Válaszd ki az első órát az órarendből!"
        }
        var dow = passData.firstEventDate.getDay()
        if (dow === 0) {
            dow = 7
        }
        if (passData.firstTimeTable.dayOfWeek !== dow) {
            return `Az órarend és a dátum nem ugyanazon a napon van! (${days[passData.firstTimeTable.dayOfWeek-1].description} - ${days[dow-1].description})`
        }
        return;
    }
}

export default PassCreatorValidator