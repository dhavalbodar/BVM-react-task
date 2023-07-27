import React, { useState } from 'react'

const useBoolean = (initialValue:boolean = false) => {
    const [value, setValue] = useState<boolean>(initialValue);

    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);
    const toggle = () => {
        setValue((prevValue) => !prevValue);
    }
  
    return {
      value,
      setTrue,      
      setFalse,
      toggle,
    };
}

export default useBoolean