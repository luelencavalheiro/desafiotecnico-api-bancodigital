const express = require('express');

const { listarContasBancarias,
    criarConta,
    atualizarDados,
    deletarConta,
    exibirSaldo,
    extrato } = require('./controladores/contas');

const { depositar,
    sacar,
    transferir } = require('./controladores/transacoes');

const rotas = express();

rotas.get('/contas', listarContasBancarias);


rotas.post('/contas', criarConta);

// criar intermediarios para verificar senha antes de mostrar essas rotas

rotas.put('/contas/:numeroConta/usuario', atualizarDados)

rotas.delete('/contas/:numeroConta', deletarConta);

rotas.post('/transacoes/depositar', depositar);

rotas.post('/transacoes/sacar', sacar);

rotas.post('/transacoes/transferir', transferir);

rotas.get('/contas/saldo', exibirSaldo);

rotas.get('/contas/extrato', extrato);

module.exports = rotas; 