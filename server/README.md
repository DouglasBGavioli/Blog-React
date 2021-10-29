# API Server

## Instalando e Executando

Para instalar os pacotes necessários de execução:

```sh
npm install
```

Para executar a aplicação depois de instalar os pacotes:

```sh
node server.js
```

## Usando a API

### Incluir um header de Authorization

Todas as requests devem ter um **Authorization header** para funcionar corretamente, por exemplo:

```js
fetch(
    url,
    {
        headers: { 'Authorization': 'qualquer-coisa-aqui' }
    }
)como
```

### API

| Endpoint       | Descrição          | Parâmetros         |
|-----------------|----------------|----------------|
| `GET /categories` | Retorna uma lista de todas as categorias disponíveis na API. A lista pode ser encontrada em `categories.js`. Sinta-se a vontade para criar novas categorias se desejar. |  |
| `GET /:category/posts` | Retorna todos os posts para uma determinada categoria. |  |
| `GET /posts` | Traz todos os posts. Útil para a página principal quando nenhuma categoria for selecionada. |  |
| `POST /posts` | Cria um novo post. | **id** - id único do post, como por exemplo <b>UUID</b> <br> **timestamp** - [Timestamp] Hora de criação, vc pode usar `Date.now()` se preferir. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Qualquer uma das categorias listadas em `categories.js`. |
| `GET /posts/:id` | Retorna os detalhes de um post. | |
| `POST /posts/:id` | Usado para votar em um post. | **option** - [String]: `"upVote"` ou `"downVote"`. |
| `PUT /posts/:id` | Edita os detalhes de um post. | **title** - [String] <br> **body** - [String] |
| `DELETE /posts/:id` | Exclui (soft) um determinado post. Altera os comentários do post para ter o campo `parentDeleted = true`. | |
| `GET /posts/:id/comments` | Retorna todos os comentários do post. | |
| `POST /comments` | Adiciona um comentário à um post. | **id** - id único do post, como por exemplo <b>UUID</b> <br> **timestamp** - [Timestamp] Hora de criação, vc pode usar `Date.now()` se preferir. <br> **body** - [String] <br> **author** - [String] <br> **parentId** - ID único do post que o comentário pertence. |
| `GET /comments/:id` | Retorna os detalhes de um comentário. | |
| `POST /comments/:id` | Usado para votar em um comentário. | **option** - [String]: `"upVote"` ou `"downVote"`.  |
| `PUT /comments/:id` | Edita os detalhes de um comentário. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String] |
| `DELETE /comments/:id` | Exclui um determinado comentário. | &nbsp; |
