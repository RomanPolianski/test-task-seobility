import { ChangeEvent, FC, FocusEvent, FormEvent, useState } from 'react';
import NumberFormat from 'react-number-format';
import '../App.css';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
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
  };
};

const Form: FC = (): JSX.Element => {
  const nameSurname = useInput('');
  const email = useInput('');
  const phone = useInput('');
  const birthday = useInput('');
  const message = useInput('');
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
          placeholder="Имя и фамилия"
          type="text"
          className="formInput"
          value={nameSurname.value}
          onChange={(e) => nameSurname.onChange(e)}
          onBlur={(e) => nameSurname.onBlur(e)}
        ></input>
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
        <label htmlFor="message" className="label">
          Сообщение
        </label>
        <textarea
          name="message"
          placeholder="Введите сообщение"
          className="formInput"
          value={message.value}
          onChange={(e) => message.onChange(e)}
          onBlur={(e) => message.onBlur(e)}
        ></textarea>
        <button className="submitButton" type="submit" onClick={handleSubmit}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Form;
