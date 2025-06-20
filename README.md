# Full Cycle - Desafio Nginx + Node.js + MySQL

Este projeto demonstra a utilização do Nginx como proxy reverso para uma aplicação Node.js, que interage com um banco de dados MySQL. Tudo é orquestrado via Docker Compose, facilitando o setup e o desenvolvimento.

## Visão Geral

- **Nginx**: Proxy reverso, recebe as requisições na porta 8080 e encaminha para o Node.js.
- **Node.js**: Insere um nome na tabela `people` do MySQL e retorna um HTML com todos os nomes cadastrados.
- **MySQL**: Armazena os nomes cadastrados.

## Fluxo da Aplicação

1. O usuário acessa `http://localhost:8080`.
2. O Nginx encaminha a requisição para o Node.js.
3. O Node.js insere um novo nome na tabela `people` e retorna um HTML:
    ```html
    <h1>Full Cycle Rocks!</h1>
    <ul>
      <li>Full Cycle User 123</li>
      <li>Full Cycle User 456</li>
      <!-- ... -->
    </ul>
    ```
4. O MySQL persiste os dados.

## Estrutura do Projeto

```
.
├── docker-compose.yml
├── nginx
│   └── default.conf
└── node
    ├── Dockerfile
    ├── index.js
    ├── package.json
    └── package-lock.json
```

## Como Executar

1. Clone este repositório:
    ```bash
    git clone https://github.com/gabrielst-d3v/desafio-nginx-com-nodejs-fullcycle.git
    cd desafio-nginx-com-nodejs-fullcycle
    ```

2. Suba os containers:
    ```bash
    docker-compose up -d
    ```

3. Acesse no navegador:
    ```
    http://localhost:8080
    ```

4. Para parar e remover os containers:
    ```bash
    docker-compose down
    ```

5. Para remover também os dados do MySQL:
    ```bash
    docker-compose down -v
    ```

## Desenvolvimento

- O serviço Node.js está com volume mapeado (`./node:/usr/src/app`), permitindo hot reload durante o desenvolvimento.
- Edite os arquivos na pasta `node` e reinicie o serviço se necessário.

## Configuração dos Serviços

### MySQL

- Imagem: `mysql:5.7`
- Database: `nodedb`
- Usuário: `root`
- Senha: `root`
- Volume: `./mysql:/var/lib/mysql` (persistência dos dados)

### Node.js

- Porta interna: 3000
- Conecta ao banco via variáveis de ambiente
- Cria a tabela `people` automaticamente se não existir
- Insere um nome aleatório a cada requisição

### Nginx

- Imagem: `nginx:latest`
- Porta externa: 8080
- Proxy para o Node.js na porta 3000

## Exemplo de Resposta

Ao acessar `http://localhost:8080`, você verá algo assim:

```html
<h1>Full Cycle Rocks!</h1>
<ul>
  <li>Full Cycle User 123</li>
  <li>Full Cycle User 456</li>
  <li>Full Cycle User 789</li>
</ul>
```

Desafio proposto pela Full Cycle.