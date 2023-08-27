
const { banco, contas, saques, depositos, transferencias } = require('./../bancodedados');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;
    // verificando se foi informado numero de conta e valor
    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório' });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor do depósito é obrigatório' });
    }
    // verificando se o valor depositado não é menor ou igual a zero
    if (valor <= 0) {
        return res.status(404).json({ mensagem: 'Não é permitido depositar valores zerados ou negativos!' });
    }

    //verificando se existe uma conta
    let contaEncontrada = contas.find((conta) => {
        return conta.numero_conta === Number(numeroConta);
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'A conta não existe!' });
    }

    // somando o valor do depósito
    contaEncontrada.saldo = contaEncontrada.saldo + valor;
    return res.status(203).send();

};

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    // verificando se foi informado numero de conta, valor e senha
    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório' });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor do depósito é obrigatório' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória' });
    }

    //verificando se existe uma conta
    let contaEncontrada = contas.find((conta) => {
        return conta.numero_conta === Number(numeroConta);
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'A conta não existe!' });
    }

    // verificando se a senha é valida e igual a cadastrada na conta
    if (contaEncontrada.senha != senha) {
        return res.status(404).json({ mensagem: 'Senha inválida!' });
    }

    // verificando se há saldo disponivel
    if (contaEncontrada.saldo >= valor) {

        contaEncontrada.saldo = contaEncontrada.saldo - valor;
    } else {
        return res.status(404).json({ mensagem: 'Não existe fundos para realizar ess operação' });
    }
};

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    // verificando se foi informado todos os requisitos para transferencia
    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório' });
    }
    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: 'O numero da conta para transferência é obrigatório' });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor do depósito é obrigatório' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória' });
    }
    //verificando se existe uma conta origem
    let contaEncontradaOrigem = contas.find((conta) => {
        return conta.numero_conta === Number(numero_conta_origem);
    });

    if (!contaEncontradaOrigem) {
        return res.status(404).json({ mensagem: 'A conta  de origem não existe!' });
    }

    //verificando se existe uma conta destino
    let contaEncontradaDestino = contas.find((conta) => {
        return conta.numero_conta === Number(numero_conta_destino);
    });

    if (!contaEncontradaDestino) {
        return res.status(404).json({ mensagem: 'A conta  de destino não existe!' });
    }

    // verificando se a senha é valida e igual a conta origem
    if (contaEncontradaOrigem.senha != senha) {
        return res.status(404).json({ mensagem: 'Senha inválida!' });
    }

    // verificando se há saldo disponivel na conta origem
    if (contaEncontradaOrigem.saldo >= valor) {

        contaEncontradaOrigem.saldo = contaEncontradaOrigem.saldo - valor;
        contaEncontradaDestino.saldo = contaEncontradaDestino.saldo + valor;
    } else {
        return res.status(404).json({ mensagem: 'Não existe fundos para realizar ess operação' });
    }


};

module.exports = {
    depositar,
    sacar,
    transferir

}