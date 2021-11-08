import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { client } from "../../Config/ApolloProviderWithClient";
import { LOAD_TIMETABLE } from "../../GraphQL/Queries/timeTableQueries";
import { RoomSelector } from "./RoomSelector";
import { TherapistSelector } from "./TherapistSelector";
import { TimeTableEvent } from "./TimeTableEvent";
import { TimeTableHours } from "./TimeTableHours";

const minHour = 8
const maxHour = 19
const rowHeight = 30

export const TimeTableWrapper = () => {
    const [forceUpdate, setForceUpdate] = useState(0)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [selectedTherapist, setSelectedTherapist] = useState(null)
    const [timeTableSlots, setTimeTableSlots] = useState(null)

    useEffect(() => {
        (selectedRoom || selectedTherapist) && (async () => {
            const response = await client.query({
                query: LOAD_TIMETABLE,
                variables: {
                    roomId: selectedRoom ? selectedRoom.id : "-1",
                    therapist: selectedTherapist ? selectedTherapist.id : "-1"
                },
                partialRefetch: true
            });
            const filteredResult = response.data.timeTablesFiltered.filter(t =>
                (!selectedRoom || t.room.id === selectedRoom.id) &&
                (!selectedTherapist || t.therapist.id === selectedTherapist.id)
            )
            setTimeTableSlots(filteredResult);

        })();
    }, [selectedRoom, selectedTherapist, forceUpdate])

    const doForceUpdate = () => {
        setForceUpdate(forceUpdate + 1)
    }

    const getEventsOfDay = (day) => {
        if (timeTableSlots) {
            const dayTable = timeTableSlots
                .filter(slot => slot.dayOfWeek === day)
                .map(e => {
                    return <TimeTableEvent key={`tte-${e.id}`} event={e} rowHeight={rowHeight} minHour={minHour} doForceUpdate={doForceUpdate} />
                })
            return dayTable;
        }
        return [];
    }

    return (
        <>
            <div className="toolbar">
                <RoomSelector className="toolbar-dropdown" onChange={setSelectedRoom} addAllOption={true} />
                <TherapistSelector className="toolbar-dropdown" onChange={setSelectedTherapist} addAllOption={true} />
                <FontAwesomeIcon icon="plus" className="toolbar-button" size="3x" />
            </div>
            <div className="timetable-header">
                <div className="timetable-hours"><div className="timetable-hours-hour">Idő</div></div>
                <div className="timetable-days">
                    <div className="timetable-header-day" >Hétfő</div>
                    <div className="timetable-header-day" >Kedd</div>
                    <div className="timetable-header-day" >Szerda</div>
                    <div className="timetable-header-day" >Csütörtök</div>
                    <div className="timetable-header-day" >Péntek</div>
                </div>
            </div>
            <div className="timetable">
                <div className="timetable-hours">
                    <TimeTableHours minHour={minHour} maxHour={maxHour} />
                </div>
                <div className="timetable-days">
                    <div key="ttd-1" className="timetable-day monday" >{getEventsOfDay(1)}</div>
                    <div key="ttd-2" className="timetable-day tuesday" >{getEventsOfDay(2)}</div>
                    <div key="ttd-3" className="timetable-day wednesday" >{getEventsOfDay(3)}</div>
                    <div key="ttd-4" className="timetable-day thursday" >{getEventsOfDay(4)}</div>
                    <div key="ttd-5" className="timetable-day friday" >{getEventsOfDay(5)}</div>
                </div>
            </div>
        </>
    );
}