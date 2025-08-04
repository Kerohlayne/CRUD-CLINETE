const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let clientes = [];
let idContador = 1;

// Lista de Clientes
app.get('/api/clientes', (req, res) => {
    res.json(clientes);
});

// Criar Cliente
app.post('/api/clientes', (req, res) => {
    console.log("OK");
    const cliente = { id: idContador++, ...req.body };
    clientes.push(cliente);
    res.status(201).json(cliente);
});

// Editar Cliente
app.put('/api/clientes/:id', (req, res) => {
    console.log("OK");
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);
    if (index !== -1) {
        clientes[index] = { id, ...req.body };
        res.json(clientes[index]);
    } else {
        res.status(404).send('Cliente não encontrado');
    }
});

// Excluir Cliente
app.delete('/api/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    clientes = clientes.filter(c => c.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Rodando na porta http://localhost:${PORT}`);
});
