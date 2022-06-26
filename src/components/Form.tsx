import {
  ChangeEvent,
  FC,
  FocusEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import NumberFormat from 'react-number-format';
import '../App.css';
import { useValidation } from '../validators/validator';
import TextareaAutosize from 'react-textarea-autosize';

const useInput = (initialValue: string, validations?: any) => {
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

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const Form: FC = (): JSX.Element => {
  const nameSurname = useInput('', { isNameSurname: false });
  const email = useInput('', { minLength: 3, isEmpty: true, isEmail: false });
  const phone = useInput('', { isEmpty: true, isPhone: false });
  const birthday = useInput('', { isEmpty: true });
  const message = useInput('', {
    minLength: 10,
    isEmpty: true,
    maxLength: 300,
  });
  const values = {
    nameSurname: nameSurname.value,
    email: email.value,
    phone: phone.value,
    birthday: birthday.value,
    message: message.value,
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div>
      <form>
        <label htmlFor="nameSurname" className="label">
          Имя и фамилия
        </label>
        <input
          name="nameSurname"
          type="text"
          className="formInput nameSurnameInput"
          value={nameSurname.value}
          onChange={(e) => nameSurname.onChange(e)}
          onBlur={(e) => nameSurname.onBlur(e)}
        ></input>
        {nameSurname.isDirty && nameSurname.nameSurnameError && (
          <div className="errMsg">Неверно введены имя и фамилия</div>
        )}
        <label htmlFor="email" className="label">
          Электронная почта
        </label>
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="formInput"
          value={email.value}
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
        ></input>
        {email.isDirty && email.isEmpty && (
          <div className="errMsg">Поле не может быть пустым</div>
        )}
        {email.isDirty && email.minLengthError && (
          <div className="errMsg">Минимальная длина поля 3</div>
        )}
        {email.isDirty && email.emailError && (
          <div className="errMsg">Неверный email</div>
        )}
        <label htmlFor="phone" className="label">
          Телефон
        </label>
        <NumberFormat
          format="+7 (###) ##-##-###"
          allowEmptyFormatting
          mask="_"
          name="phone"
          placeholder="Телефон"
          type="tel"
          className="formInput"
          value={phone.value}
          onChange={(
            e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
          ) => phone.onChange(e)}
          onBlur={(
            e:
              | FocusEvent<HTMLInputElement, Element>
              | FocusEvent<HTMLTextAreaElement, Element>
          ) => phone.onBlur(e)}
        />
        {phone.isDirty && phone.phoneError && (
          <div className="errMsg">Заполните поле</div>
        )}
        <label htmlFor="birthday" className="label">
          Дата рождения
        </label>
        <input
          name="birthday"
          type="date"
          className="formInput"
          value={birthday.value}
          onChange={(e) => birthday.onChange(e)}
          onBlur={(e) => birthday.onBlur(e)}
        ></input>
        {birthday.isDirty && birthday.isEmpty && (
          <div className="errMsg">Обязательное поле</div>
        )}
        <label htmlFor="message" className="label">
          Сообщение
        </label>
        <TextareaAutosize
          name="message"
          placeholder="Введите сообщение"
          className="formInput"
          value={message.value}
          onChange={(e) => message.onChange(e)}
          onBlur={(e) => message.onBlur(e)}
        ></TextareaAutosize>
        {message.isDirty && message.minLengthError && (
          <div className="errMsg">Минимальная длина 10</div>
        )}
        {message.isDirty && message.isEmpty && (
          <div className="errMsg">Обязательное поле</div>
        )}
        {message.isDirty && message.maxLengthError && (
          <div className="errMsg"> Максимальная длина 300 символов</div>
        )}
        <button
          className="submitButton"
          disabled={
            !email.inputValid ||
            !message.inputValid ||
            !birthday.inputValid ||
            !phone.inputValid
          }
          type="submit"
          onClick={handleSubmit}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Form;
