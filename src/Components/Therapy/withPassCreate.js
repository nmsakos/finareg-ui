import { useState } from "react"

export const withPassCreate = (Component) => {
    return props => {

        const [variables, setVariables] = useState(null)

        const onChange = (changes) => {
            setVariables({ ...variables, ...changes })
        }

        return <Component {...props}
            entity={variables}
            onChange={onChange}
        />
    }
}