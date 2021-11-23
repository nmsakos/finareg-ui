export const Selector = ({ values, addAllOption, onChange, descriptionField, descriptionFun, ...props }) => {

    const handleChange = (e) => {
        onChange(values.find(value => value.id === e.target.value))
    }

    return (
        <div>
            <select {...props}
                onChange={handleChange}>
                {addAllOption && <option value={"-1"} key={"-1"} >Válassz!</option>}
                {values.map((value, index) =>
                    <option value={value.id} key={index}>{descriptionFun ? descriptionFun(value) : value[descriptionField]}</option>
                )}
            </select>
        </div>
    );
}