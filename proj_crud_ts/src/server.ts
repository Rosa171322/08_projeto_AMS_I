import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use('/api', routes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  // Rota básica para a raiz
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  //Alterar o app.get para retornar uma home pagina.
app.use(bodyParser.json());

//app.use('/api', routes);
app.use('/',routes ); 


});