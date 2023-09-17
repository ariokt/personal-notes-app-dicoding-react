import { useState } from "react";

function useToggle(defaultVal) {
    const [value, setValue] = useState(defaultVal);
    const handleInput = (inputValue) => setValue(inputValue);

    return [value, handleInput]
}

export default useToggle;