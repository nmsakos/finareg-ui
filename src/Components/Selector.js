import { useEffect } from "react"
import { useState } from "react/cjs/react.development"

export const Selector = ({ defaultValue, values, onChange, className, descriptionField }) => {
    const [state, setState] = useState(defaultValue ? defaultValue.id : null)

    useEffect(() => {
        if (defaultValue) {
            setState(defaultValue.id)
        }
    }, [defaultValue])

    const handleChange = (e) => {
        onChange(values.find(value => value.id === e.target.value))
        setState(e.target.value)
    }

    return state && (
        <div>
            <select className={className}
                value={state}
                onChange={handleChange}>
                {values.map((value, index) =>
                    <option value={value.id} key={index}>{value[descriptionField]}</option>
                )}
            </select>
        </div>
    );
}