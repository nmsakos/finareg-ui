export const DescriptionForm = ({entity, onChange}) => {
    const {description} = entity || {}
    return (
        <>
            <h1>Megnevezés</h1>   
            <input value={description} onChange={(e) => onChange({description: e.target.value})} />
        </>
    )
}