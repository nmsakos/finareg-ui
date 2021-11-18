import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { FormActionButtonBar } from "../FormActionButtonBar";
import { withEditablePass } from "./withEditablePass";
import "react-datepicker/dist/react-datepicker.css";
import { PassEventSummary } from "./PassEventSummary";
import { PassBaseForm } from "./PassBaseForm";
import { PassEventsForm } from "./PassEventsForm";

export const PassForm = withEditablePass(({ pass, events,
    onChange, onEventChange,
    onSavePass, onResetPass,
    onEventAdd, onEventRemove,
    isChanged, hasCompleted }) => {


    return pass ? (
        <div className="contentwrapper">
            <h1>Bérlet adatok:</h1>
            <div className="flex-table row">
                <div>
                    <PassBaseForm pass={pass} onChange={onChange} />
                    <h1>Alkalmak:</h1>
                    <PassEventsForm pass={pass} events={events} onEventChange={onEventChange} onEventAdd={onEventAdd} onEventRemove={onEventRemove} hasCompleted={hasCompleted} />
                    {isChanged() ? <FormActionButtonBar onSaveClick={onSavePass} onResetClick={onResetPass} useButtons /> : <></>}
                </div>
                <PassEventSummary events={events} />
            </div>
            <Link to={`/passes/${pass.id}`} className="svg-button">
                <FontAwesomeIcon icon="arrow-left" size="2x" />
            </Link>
        </div >
    ) : null;
})