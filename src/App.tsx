import Form from './components/Form';
import './App.scss';
import { FC } from 'react';

const App: FC = (): JSX.Element => {
  return (
    <div className="form">
      <Form />
    </div>
  );
};

export default App;
