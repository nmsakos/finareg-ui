export const PassEventTableCell = ({cellData, tooltipText}) => {
    return (
        <div className="pass-event-table-col" data-tip={tooltipText} data-for="passEventsTable">{cellData}</div>
    );
}