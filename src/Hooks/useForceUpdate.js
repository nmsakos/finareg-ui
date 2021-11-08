import { useState } from "react/cjs/react.development";

export const useForceUpdate = () => {
    const [, setValue] = useState(0);
    return (triggerFunction) => {
        if (triggerFunction) {
            triggerFunction();
        }
        setValue(value => value + 1);
    }
}