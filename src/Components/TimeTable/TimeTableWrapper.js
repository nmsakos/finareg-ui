import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { client } from "../../Config/ApolloProviderWithClient";
import { configs } from "../../configs";
import { CREATE_TIME_TABLE } from "../../GraphQL/Mutations/timeTableMutators";
import { LOAD_TIMETABLE } from "../../GraphQL/Queries/timeTableQueries";
import { getHourAndMin, parseTime, periodsOverlaping } from "../../utils";
import { ModalForm } from "../ModalForm";
import { RoomSelector } from "./RoomSelector";
import { TherapistSelector } from "./TherapistSelector";
import { TimeTableEvent } from "./TimeTableEvent";
import { TimeTableEventForm } from "./TimeTableEventForm";
import TimeTableEventValidator from "./TimeTableEventValidator";
import { TimeTableHours } from "./TimeTableHours";


export const TimeTableWrapper = () => {
    const [forceUpdate, setForceUpdate] = useState(0)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [selectedTherapist, setSelectedTherapist] = useState(null)
    const [timeTableSlots, setTimeTableSlots] = useState(null)
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [updated, setUpdated] = useState(null)


    useEffect(() => {
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

            return dayTable.map(e => {
                const overlaping = dayTable.filter(e1 =>
                    periodsOverlaping(
                        [getHourAndMin(e.fromTime), getHourAndMin(e.toTime)],
                        [getHourAndMin(e1.fromTime), getHourAndMin(e1.toTime)]) ||
                    periodsOverlaping(
                        [getHourAndMin(e1.fromTime), getHourAndMin(e1.toTime)],
                        [getHourAndMin(e.fromTime), getHourAndMin(e.toTime)]))

                const overlapIndex = overlaping.findIndex(e1 => e1.id === e.id)
                return <TimeTableEvent key={`tte-${e.id}`} event={e} doForceUpdate={doForceUpdate} overlaps={overlaping.length} overlapIndex={overlapIndex + 1} />
            });
        }
        return [];
    }

    const newEvent = () => {
        return {
            id: 0,
            dayOfWeek: 1,
            fromTime: `${configs.minHour}:00`,
            toTime: `${configs.maxHour}:00`,
            clients: []
        }
    }



    const onModalSave = () => {
        const event = modalContent.current;
        const validatorResult = TimeTableEventValidator.isEventValid(event);
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
                <RoomSelector className="toolbar-dropdown" onChange={setSelectedRoom} addAllOption={true} defaultValue={selectedRoom} />
                <TherapistSelector className="toolbar-dropdown" onChange={setSelectedTherapist} addAllOption={true} defaultValue={selectedTherapist} />
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
                    <TimeTableHours />
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