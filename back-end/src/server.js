const express = require('express');
const cors = require('cors');

const tatuagemRoutes = require('./routes/tatuagem.routes');
const tatuadorRoutes = require('./routes/tatuador.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tatuagens', tatuagemRoutes);
app.use('/tatuadores', tatuadorRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
