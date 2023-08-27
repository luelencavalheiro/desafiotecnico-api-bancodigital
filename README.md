![](./capa_readme_luelencavalheiro.gif)

# Desafio Módulo II Back-end | API para um Banco Digital

## Funcionalidades 

Esse sistema bancário oferece tem as seguintes funcionalidades:

✅ Abertura de contas bancárias com informações pessoais e cadastramento de senha de acesso.

✅ Depósitos em difentes contas bancárias.

✅ Saques de contas bancárias, com validação de saldo e senha.

✅ Transferências entre contas bancárias, com verificação de saldo e senha.

✅ Consulta de saldo e extrato de contas bancárias.

## Endpoints dessa API 💻

- GET /contas: Lista todas as contas bancárias (requer autenticação).
- POST /contas: Abre uma nova conta bancária.
- PUT /contas/:numeroConta/usuario: Atualiza informações do usuário da conta.
- DELETE /contas/:numeroConta: Deleta uma conta bancária.
- POST /transacoes/depositar: Realiza um depósito em uma conta.
- POST /transacoes/sacar: Realiza um saque de uma conta.
- POST /transacoes/transferir: Realiza uma transferência entre contas.
- GET /contas/saldo: Consulta o saldo de uma conta.
- GET /contas/extrato: Consulta o extrato de uma conta.


## 💪 Skills Dominadas ou ~~tudo que fiz para entregar esse desafio~~ 😅 👩‍💻

- comandos GIT para criar e clonar repositórios
- interpretação e solução de problemas usando Javascript
- uso de operadores de comparação
- uso de condicionais
- uso de truthiness
- criação de servidor
- instalação de frameworks e dependências
- manipulação dos objetos da requisição
- desestruturação de objeto
- manipulação de métodos de arrays
- organização de uma API REST
- autenticação de dados 
- uso de códigos de respostas HTTP




## Instalação e Uso ⚒

Clonar Repositório

```bash
  git clone github.com/luelencavalheiro/desafio-backend-api-bancodigital
```

Instalar Dependencias
```bash
npm install
```

Iniciar o servidor
```bash
npm run dev
```

O servidor está em
```bash
http://localhost:3000
```

###### tags: `back-end` `módulo 2` `nodeJS` `API REST` `desafio`
