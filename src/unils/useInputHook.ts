import { ChangeEvent, useState } from "react";
import { useValidation } from "../validators/validator";

export const useInput = (initialValue: string, validations?: any) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const onBlur = (
    e:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    setDirty(true);
  };

  const onSubmitForm = () => {
    setValue('');
    setDirty(false);
  };

  return {
    value,
    onChange,
    onBlur,
    onSubmitForm,
    isDirty,
    setDirty,
    ...valid,
  };
};

