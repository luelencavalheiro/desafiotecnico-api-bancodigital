
let { banco, contas, saques, depositos, transferencias, identificadorDaConta } = require('./../bancodedados');

const listarContasBancarias = (req, res) => {
    const { senha_banco } = req.query;
    if (senha_banco === banco.senha) {
        return res.json(contas);
    }
    return res.status(403).json('Senha inválida!');

};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    // verificar se os campos não foram preenchidos
    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' });
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatório' });
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória' });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório' });
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória' });
    }

    // verificando se a cpf é único
    const contaCPFEncontrada = contas.find((conta) => {
        return conta.cpf === cpf;
    });

    // verificando se email é único
    const contaEmailEncontrada = contas.find((conta) => {
        return conta.email === email;
    });

    if (!contaCPFEncontrada && !contaEmailEncontrada) {

        identificadorDaConta++

        const novaConta = {
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            telefone: telefone,
            email: email,
            senha: senha,
            saldo: 0,
            numero_conta: identificadorDaConta

        }
        contas.push(novaConta);

        return res.status(201).json(novaConta);

    }
    else {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    }

};

const atualizarDados = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    // verificar se os campos não foram preenchidos
    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' });
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatório' });
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatória' });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório' });
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória' });
    }

    // verificando se a cpf é único
    const contaCPFEncontrada = contas.find((conta) => {
        return conta.cpf === cpf && conta.numero_conta !== numeroConta;
    });
    if (contaCPFEncontrada) {
        return res.status(400).json({ mensagem: 'Já existe um cpf cadastrado igual ao informado!' });
    }

    // verificando se email é único
    const contaEmailEncontrada = contas.find((conta) => {
        return conta.email === email && conta.numero_conta !== numeroConta;
    });
    if (contaEmailEncontrada) {
        return res.status(400).json({ mensagem: 'Já existe um email cadastrado igual ao informado!' });
    }
    //verificando se existe uma conta
    let contaEncontrada = contas.find((conta) => {
        return conta.numero_conta === Number(numeroConta);
    });

    if (!contaEncontrada) {
        return res.status(400).json({ mensagem: 'O número de conta não existe.' });
    }

    // atualizando conta
    contaEncontrada.nome = nome;
    contaEncontrada.cpf = cpf;
    contaEncontrada.data_nascimento = data_nascimento;
    contaEncontrada.telefone = telefone;
    contaEncontrada.email = email;
    contaEncontrada.senha = senha;

    return res.status(203).send();

};

const deletarConta = (req, res) => {
    const { numeroConta } = req.params;

    //verificando se existe uma conta
    let contaEncontrada = contas.find((conta) => {
        return conta.numero_conta === Number(numeroConta);
    });


    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'A conta não existe!' });
    }

    // verificando se o saldo é zero
    if (contas.saldo > 0) {

        return res.status(404).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    // exclução da conta
    contas = contas.filter((conta) => {
        return conta.numero_conta != Number(numeroConta);
    });
    return res.status(204).send();
}



const exibirSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    //verificando se a conta existe
    const contaEncontrada = contas.find((conta) => {
        return conta.numero_conta === Number(numero_conta);
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }

    // verificando se a senha é valida e igual a cadastrada na conta

    if (contaEncontrada.senha != senha) {
        return res.status(404).json({ mensagem: 'Senha inválida!' });
    }

    return res.status(200).json(contaEncontrada.saldo);
};


const extrato = (req, res) => {

    const { numero_conta, senha } = req.query;

    //verificando se a conta existe
    const contaEncontrada = contas.find((conta) => {
        return conta.numero_conta === Number(numero_conta);
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }

    // verificando se a senha é valida e igual a cadastrada na conta
    if (contaEncontrada.senha != senha) {
        return res.status(404).json({ mensagem: 'Senha inválida!' });
    }

    const extrato = [...saques, ...depositos, ...transferencias];
    res.send(extrato);
};

module.exports = {
    listarContasBancarias,
    criarConta,
    atualizarDados,
    deletarConta,
    exibirSaldo,
    extrato

}