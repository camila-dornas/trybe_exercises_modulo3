// index.js
const express = require('express');
const { Address, Employee } = require('./models');

const app = express();

app.get('/employees', async (_req, res) => {
  try {
    const employees = await Employee.findAll({
      include: { model: Address, as: 'addresses' },
    });

    return res.status(200).json(employees);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  };
});

app.get('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ where: { id } }); // Lazy Loading

    // const employee = await Employee.findOne({
    //     where: { id },
    //     // includes: [{ model: Address, as: 'addresses'}] --> adiciona o endereço completo
    //     include: [{
    //       model: Address, as: 'addresses', attributes: { exclude: ['number'] },
    //     }], // adiciona o endereço, mas sem o nº
    //   }); --> Eager Loading para carregar todas as informações, mesmo sem necessidade

    if (!employee)
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    
    if (req.query.includeAddresses === 'true') {
      const addresses = await Address.findAll({ where: { employeeId: id } });
      return res.status(200).json({ employee, addresses });
    } // Lazy Loading para carregar o endereço do funcionário apenas quando requisitado

    return res.status(200).json(employee);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  };
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));

module.exports = app;