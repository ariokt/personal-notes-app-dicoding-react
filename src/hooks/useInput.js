import { useState } from "react";

function useInput() {
    const [value, setValue] = useState('');
    const handleInput = (e) => setValue(e.target.value);

    return [value, handleInput]
}

export default useInput;