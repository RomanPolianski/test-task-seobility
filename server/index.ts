import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['https://romanpolianski.github.io', 'http://localhost:3000'],
  })
);

app.post('/submitForm', (req, res) => {
  console.log(req.body);
  const { nameSurname, email, phone, birthday, message } = req.body;

  if (
    nameSurname !== '' &&
    email !== '' &&
    phone !== '' &&
    birthday !== '' &&
    message !== ''
  ) {
    return res.status(200).json({ message: 'Успешно' });
  } else {
    return res.status(400).json({ message: 'Произошла ошибка' });
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
