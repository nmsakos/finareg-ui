import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { dateToString } from "../../utils";
import { PassEventTableCell } from "./PassEventTableCell";

export const PassEventsTable = ({ events, pass }) => {
    if (pass.id < 1) {
        return (<></>);
    }

    return events && events.length > 0 ? (
        <>
            {ReactTooltip.rebuild()}
            <ReactTooltip place="top" type="dark" effect="solid" id="passEventsTable" />
            <div className="flex-table row wrap" style={{ justifyContent: "center" }}>
                {console.log(events)}
                {events.filter(e => e.state.id !== "3").map((e, i) => {
                    let icon
                    if (e.state.id === "2") {
                        icon = "check"
                    } else {
                        icon = ["far", "circle"]
                    }
                    const cell = <FontAwesomeIcon icon={icon} size="2x" />
                    const tooltipText = dateToString(e.date);
                    return <PassEventTableCell cellData={cell} tooltipText={tooltipText} key={i} />
                })}
            </div>
        </>
    ) : null
}