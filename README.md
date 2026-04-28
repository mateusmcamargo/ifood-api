# ifood-api (EuComida)
 
Biblioteca de acesso a banco de dados desenvolvida para a disciplina **Programação Web Back-End**. O projeto implementa um conjunto de classes que representam entidades de um serviço de entregas e expõe métodos de inserção, busca e deleção dos dados via Mongoose.
 
## Pré-requisitos
 
- Node.js 18 ou superior
- MongoDB rodando localmente na porta 27017

## Instalação e execução

> 1. Clone o projeto

```bash
git clone <https://github.com/mateusmcamargo/ifood-api>
cd ifood-api
npm install
```
 
> 2. Crie o arquivo `.env` na raiz do projeto com a string de conexão:
 
```env
MONGODB_URI=mongodb://localhost:27017/ai-food
```
 
> 3. Execute o arquivo principal
 
```bash
node index.js
```

O script demonstra o fluxo completo: criação de usuário, loja e produto, realização de um pedido, atualização de status (aprovação, envio e entrega) e deleção do registro ao final.

Utilize o [MongoDB Compass](https://www.mongodb.com/products/tools/compass) para visualizar o banco de dados de forma mais fácil

## Estrutura do projeto
 
```
src/
  config/   configurações de caminhos internos
  db/       conexão com o banco e operações CRUD base
  log/      sistema de log de erros em arquivo
  models/   definição dos schemas e modelos Mongoose
index.js    script de demonstração do fluxo completo
```
 
## Entidades
 
 ![Alt Text]('db-diagram.png)

- User: Usuário que realiza pedidos;
- Store: Loja cadastrada na plataforma;
- Product: Produto pertencente a uma loja;
- Order: Pedido feito por um usuário em uma loja.
 
## Bibliotecas utilizadas
 
- [Mongoose](https://mongoosejs.com/) — ODM para MongoDB que facilita a definição de schemas, validação de campos obrigatórios, relacionamentos entre coleções e geração automática de datas de criação e alteração (`createdAt`, `updatedAt`).
- [dotenv](https://github.com/motdotla/dotenv) — carrega variáveis de ambiente a partir do arquivo `.env`, evitando que dados sensíveis como a string de conexão fiquem expostos no código.

## Tratamento de erros
 
Todas as operações são executadas dentro de blocos `try/catch`. As exceções capturadas são gravadas em `src/log/errors.log` com timestamp e contexto da operação, além de serem exibidas no console.