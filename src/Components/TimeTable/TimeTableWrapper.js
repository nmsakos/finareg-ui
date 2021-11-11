import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { client } from "../../Config/ApolloProviderWithClient";
import { CREATE_TIME_TABLE } from "../../GraphQL/Mutations/timeTableMutators";
import { LOAD_TIMETABLE } from "../../GraphQL/Queries/timeTableQueries";
import { getHourAndMin, parseTime } from "../../utils";
import { ModalForm } from "../ModalForm";
import { RoomSelector } from "./RoomSelector";
import { TherapistSelector } from "./TherapistSelector";
import { TimeTableEvent } from "./TimeTableEvent";
import { TimeTableEventForm } from "./TimeTableEventForm";
import { TimeTableHours } from "./TimeTableHours";

const minHour = 8
const maxHour = 19
const rowHeight = 30

export const TimeTableWrapper = () => {
    const [forceUpdate, setForceUpdate] = useState(0)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [selectedTherapist, setSelectedTherapist] = useState(null)
    const [timeTableSlots, setTimeTableSlots] = useState(null)
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [updated, setUpdated] = useState(null)


    useEffect(() => {
        ((selectedRoom && selectedRoom.id > -1) || (selectedTherapist && selectedTherapist.id > -1)) &&
            (async () => {
                const response = await client.query({
                    query: LOAD_TIMETABLE,
                    variables: {
                        roomId: selectedRoom ? selectedRoom.id : "-1",
                        therapist: selectedTherapist ? selectedTherapist.id : "-1"
                    },
                    fetchPolicy: "no-cache"
                });
                const filteredResult = response.data.timeTablesFiltered.filter(t =>
                    (!selectedRoom || selectedRoom.id < 0 || t.room.id === selectedRoom.id) &&
                    (!selectedTherapist || selectedTherapist.id < 0 || t.therapist.id === selectedTherapist.id)
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

    const newEvent = () => {
        return {
            id: 0,
            dayOfWeek: 1,
            fromTime: "00:00",
            toTime: "00:00",
            clients: []
        }
    }

    const isEventValid = (event) => {
        const fromHourAndMin = getHourAndMin(event.fromTime);
        const toHourAndMin = getHourAndMin(event.toTime);
        if (fromHourAndMin.hour < minHour) {
            return `Időpont kezdete nem lehet ${minHour} óra előtti`
        }
        if ((fromHourAndMin.hour > toHourAndMin.hour) ||
            (fromHourAndMin.hour === toHourAndMin.hour && fromHourAndMin.min >= toHourAndMin.min)) {
            return `Időpont vége nem lehet a kezdete előtti`
        }
        if (toHourAndMin.hour > maxHour) {
            return `Időpont vége nem lehet ${maxHour} óra utáni`
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

        return;
    }

    const onModalSave = () => {
        const event = modalContent.current;
        const validatorResult = isEventValid(event);
        if (!validatorResult) {
            setUpdated(event)
            setShouldShowModal(false)
        } else {
            alert(validatorResult)
        }
    }

    useEffect(() => {
        if (updated) {
            (async () => {
                const clients = updated.clients.map(c => c.id)
                var variables = {
                    dayOfWeek: updated.dayOfWeek,
                    fromTime: parseTime(updated.fromTime),
                    toTime: parseTime(updated.toTime),
                    therapyType: updated.therapyType.id,
                    room: updated.room.id,
                    therapist: updated.therapist.id,
                    clients: clients
                };
                await client.mutate({ mutation: CREATE_TIME_TABLE, variables: variables, updateQueries: ["getTimeTablesFiltered"] })
                setForceUpdate()
            })()
        }
    }, [updated])

    const modalContent = React.createRef()

    return (
        <>
            <div className="toolbar">
                <RoomSelector className="toolbar-dropdown" onChange={setSelectedRoom} addAllOption={true} />
                <TherapistSelector className="toolbar-dropdown" onChange={setSelectedTherapist} addAllOption={true} />
                <ModalForm shouldShow={shouldShowModal} onModalSave={onModalSave} onModalCancel={() => setShouldShowModal(false)} entity={newEvent()} ref={modalContent}>
                    <TimeTableEventForm />
                </ModalForm>
                <FontAwesomeIcon icon="plus" size="2x" className="toolbar-button" onClick={() => {
                    setShouldShowModal(true)
                }} />
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