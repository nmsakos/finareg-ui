import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { dateToString } from "../../utils";
import { PassEventTableCell } from "./PassEventTableCell";

const getElementIndex = (i, j) => (i * 4) + (j)

export const PassEventsTable = ({ events, pass }) => {
    if (pass.id < 1) {
        return (<></>);
    }

    var rows = [];
    const rowCount = Math.floor(pass.eventCount / 4)
    for (var i = 0; i < rowCount; i++) {
        const cells = []
        for (var j = 0; j < 4; j++) {
            var cell
            var tooltipText
            const event = events.at(getElementIndex(i, j))
            if (event) {
                let icon
                if (event.state.id === "2") {
                    icon = "check"
                } else {
                    icon = ["far", "circle"]
                }
                cell = <FontAwesomeIcon icon={icon} size="2x" />
                tooltipText = dateToString(event.date);
                console.log(icon);
            }
            cells.push(<PassEventTableCell cellData={cell} tooltipText={tooltipText} key={`${i}-${j}`} />);
        }
        const row = (<tr className="pass-event-table-row" key={i}>{cells}</tr>);
        rows.push(row);
    }

    return (
        <>
            {ReactTooltip.rebuild()}
            <ReactTooltip place="top" type="dark" effect="solid" id="passEventsTable" />
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </>
    );
}