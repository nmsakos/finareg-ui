export const Selector = ({ values, addAllOption, onChange, descriptionField, ...props }) => {

    const handleChange = (e) => {
        onChange(values.find(value => value.id === e.target.value))
    }

    return (
        <div>
            <select {...props}
                onChange={handleChange}>
                {addAllOption && <option value={"-1"} key={"-1"} >Válassz!</option>}
                {values.map((value, index) =>
                    <option value={value.id} key={index}>{value[descriptionField]}</option>
                )}
            </select>
        </div>
    );
}