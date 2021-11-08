export const PassEventTableCell = ({cellData, tooltipText}) => {
    return (
        <>
        <td className="pass-event-table-col" data-tip={tooltipText} data-for="passEventsTable">{cellData}</td>
        </>
    );
}