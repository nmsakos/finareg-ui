import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { FormActionButtonBar } from "../FormActionButtonBar";
import { withEditablePass } from "./withEditablePass";
import { PassEventSummary } from "./PassEventSummary";
import { PassBaseForm } from "./PassBaseForm";
import { PassEventsForm } from "./PassEventsForm";
import { PassClientInfo } from "./PassClientInfo";

export const PassForm = withEditablePass(({ pass, events,
    onChange, onEventChange,
    onSavePass, onResetPass,
    onEventAdd, onEventRemove,
    isChanged, hasCompleted }) => {


    return pass ? (
        <div className="contentwrapper">
            <h1>Bérlet adatok:</h1>
            <div className="flex-table column" >
                <div className="flex-table row">
                    <PassBaseForm pass={pass} onChange={onChange} />
                    <PassClientInfo pass={pass} />
                    <PassEventSummary events={events} />
                </div>
                <h1>Alkalmak:</h1>
                <PassEventsForm pass={pass} events={events} onEventChange={onEventChange} onEventAdd={onEventAdd} onEventRemove={onEventRemove} hasCompleted={hasCompleted} />
                {isChanged() ? <FormActionButtonBar onSaveClick={onSavePass} onResetClick={onResetPass} useButtons /> : <></>}
            </div>
            <Link to={`/passes/${pass.id}`} className="svg-button">
                <FontAwesomeIcon icon="arrow-left" size="2x" />
            </Link>
        </div >
    ) : null;
})