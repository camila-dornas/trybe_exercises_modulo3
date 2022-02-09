const express = require('express');

const app = express(); // 1. criar uma nova aplicação Express.

app.get('/hello', handleHelloWorldRequest); // 2. Dizer ao Express que ao receber uma requisição com o método GET no caminho ---/hello---, a função (2º parâmetro) deve ser chamada.
app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
}); // 3. Pedir ao Express que crie um servidor HTTP e escute as requisições na porta 3001;

function handleHelloWorldRequest(req, res) {
  res.status(200).send('Hello World!'); // 4. Ao tratar uma reuqisição com método GET e caminho ---/hello---, enviar o status HTTP 200(significado positivo) e enviar a mensgem descrita: "Hello word!"
}
