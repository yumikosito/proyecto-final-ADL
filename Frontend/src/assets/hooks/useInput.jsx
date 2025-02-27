import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const changevalue = (value) => {
    setValue(value);
    return ''
  };
  

  return {
    value,
    onChange: handleChange
  };
};

export default useInput;
