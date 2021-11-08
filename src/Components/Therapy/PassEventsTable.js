import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { PassEventTableCell } from "./PassEventTableCell";

const getElementIndex = (i,j) => (i*4)+(j)

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
                cell = <FontAwesomeIcon icon="check" size="2x" />
                const dateStr = new Date(event.date).toLocaleDateString(
                    'hu-HU',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'utc'
                    }
                  )
                tooltipText = dateStr;
            } else {
                cell = <FontAwesomeIcon icon={["far", "circle"]} size="2x" />
                tooltipText = ""
            }
            cells.push(<PassEventTableCell cellData={cell} tooltipText={tooltipText} key={`${i}-${j}`}/>);
        }
        const row = (<tr className="pass-event-table-row" key={i}>{cells}</tr>);
        rows.push(row);
    }

    return (
        <>
        <ReactTooltip place="top" type="dark" effect="solid" id="passEventsTable" />
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
        </>
    );
}