import { useState, useEffect } from 'react';

export const useValidation = (value: string, validations: []) => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [minLengthError, setMinLengthError] = useState<boolean>(false);
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [nameSurnameError, setNameSurnameError] = useState<boolean>(false);
  const [inputValid, setInputValid] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case 'maxLength':
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isEmail':
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case 'isPhone':
          const reg = /^[^_]+$/;
          reg.test(String(value).toLowerCase())
            ? setPhoneError(false)
            : setPhoneError(true);
          break;
        case 'isNameSurname':
          const regex = /^([a-zA-Z]{3,30}\s)[a-zA-Z]{3,30}$/;
          regex.test(String(value).toLowerCase())
            ? setNameSurnameError(false)
            : setNameSurnameError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      isEmpty ||
      minLengthError ||
      maxLengthError ||
      emailError ||
      nameSurnameError ||
      phoneError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    phoneError,
    nameSurnameError,
  ]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    phoneError,
    nameSurnameError,
    inputValid,
  };
};
