import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { useState } from "react/cjs/react.development";
import { formatTime, getClientNames, getHourAndMin, getMinsFromDayStart, parseTime, tooltipText } from "../../utils";
import { TimeTableEventForm } from "./TimeTableEventForm";
import { ModalForm } from "../ModalForm";
import React, { useEffect } from "react";
import { client } from "../../Config/ApolloProviderWithClient";
import { DELETE_TIME_TABLE, UPDATE_TIME_TABLE } from "../../GraphQL/Mutations/timeTableMutators";
import { configs } from "../../configs";
import TimeTableEventValidator from "./TimeTableEventValidator";

export const TimeTableEvent = ({ event, doForceUpdate, hidden, overlaps, overlapIndex }) => {
    ReactTooltip.rebuild();
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [updated, setUpdated] = useState(null)
    const [deleted, setDeleted] = useState(null)
    const [current, setCurrent] = useState(event)

    const fromHourAndMin = getHourAndMin(event.fromTime)
    const toHourAndMin = getHourAndMin(event.toTime)
    const minutesFromDayStart = getMinsFromDayStart(fromHourAndMin);
    const durationMinutes = getMinsFromDayStart(toHourAndMin) - getMinsFromDayStart(fromHourAndMin);
    const width = 100 / overlaps
    const left = 100 - (width * overlapIndex)
    const styles = hidden ?
        { display: hidden } :
        {
            marginTop: (minutesFromDayStart * configs.rowHeight * 2) / 60 + "px",
            height: (durationMinutes * configs.rowHeight * 2) / 60 + "px",
            width: width + "%",
            left: left + "%"
        }
    var free = event.clients && event.clients.length > 0 ? false : true

    useEffect(() => {
        if (updated) {
            (async () => {
                const clients = updated.clients.map(c => c.id)
                var variables = {
                    timeSlot: updated.id,
                    dayOfWeek: updated.dayOfWeek,
                    fromTime: parseTime(updated.fromTime),
                    toTime: parseTime(updated.toTime),
                    therapyType: updated.therapyType.id,
                    room: updated.room.id,
                    therapist: updated.therapist.id,
                    clients: clients
                };
                const data = await client.mutate({ mutation: UPDATE_TIME_TABLE, variables: variables })
                setUpdated(data.updatedTimeTableSlot)
                setCurrent(data.updatedTimeTableSlot)
                doForceUpdate()

            })()
        }
    }, [updated, doForceUpdate])

    useEffect(() => {
        if (event) {
            setCurrent(event)
        }
    }, [event])

    useEffect(() => {
        if (deleted) {
            (async () => {
                await client.mutate({ mutation: DELETE_TIME_TABLE, variables: { id: deleted.id } })
                setDeleted(null)
                doForceUpdate()
            })()
        }
    }, [deleted, doForceUpdate])

    const key = event.id;
    var tooltip = null;

    const onModalSave = () => {
        const event = modalContent.current
        const validatorResult = TimeTableEventValidator.isEventValid(event);
        if (!validatorResult) {
            setUpdated(event)
            setShouldShowModal(false)
        } else {
            alert(validatorResult)
        }
    }

    const modalContent = React.createRef()

    const showModal = (e) => {
        e.stopPropagation()
        tooltip.tooltipRef = null
        ReactTooltip.hide();
        setShouldShowModal(true)
    }

    const doDelete = (event) => {
        setDeleted(event)
        setShouldShowModal(false)
    }

    return current ? (
        <>
            <ReactTooltip place="top" type="dark" effect="solid" html={true} id={`timeTable_${key}`} className="timetable-tooltip"
                ref={el => tooltip = el} />
            <div className={`timetable-event${free ? " free" : ""}`} style={styles} key={key} data-for={`timeTable_${key}`} data-html={true}
                data-tip={tooltipText(current)} >
                <div className="timetable-event-captions">
                    <p className="timetable-event-caption">{current && getClientNames(current.clients, 2)}</p>
                    <p className="timetable-event-caption">{current && `${formatTime(getHourAndMin(current.fromTime))} - ${formatTime(getHourAndMin(current.toTime))}`}</p>
                </div>
                <div className="timetable-event-buttons">
                    <ModalForm shouldShow={shouldShowModal} onModalSave={onModalSave}
                        onModalCancel={() => setShouldShowModal(false)}
                        onDeleteClick={() => doDelete(current)}
                        entity={current} ref={modalContent}>
                        <TimeTableEventForm />
                    </ModalForm>
                    <FontAwesomeIcon icon="edit" size="2x" className="timetable-event-button" onClick={showModal} />
                </div>
            </div>
        </>
    ) : null;
}