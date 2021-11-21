export const EventDurationForm = ({entity, onChange}) => {
    const {description, minutes} = entity || {}
    return (
        <>
            <h1>Megnevezés</h1>   
            <input value={description} onChange={(e) => onChange({description: e.target.value})} />
            <h1>Perc</h1>   
            <input value={minutes} type="number" onChange={(e) => onChange({minutes: e.target.value})} />
        </>
    )
}