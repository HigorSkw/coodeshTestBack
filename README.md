<h1 align="center">
Documentação da API Backend test
</h1>

<p align="center">
  <a href="#endpoints">Endpoints</a>
</p>

A API tem um total de 7 endpoints, sendo em volta principalmente do usuário, podendo realizar o cadastro, editar, visualiazar e deletar o seu perfil e, além disto, subir arquivo txt na aplicação.
O URL base da API é  https://backendskw-txt.herokuapp.com/

<h2 align ='center'> Criação de usuário </h2>

`POST /user - FORMATO DA REQUISIÇÃO`

```json
{
	"name": "Higor Skowronski",
	"email": "higor@email.com",
	"password": "123456",
	"is_adm": "true"
}
```

obs: is_adm é opcional, por default é "false".

Caso o cadastro seja feito de forma correta, a resposta será assim:

`POST /user - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "4c3ba545-c9a0-449a-a273-57eb5d5cd895",
	"name": "Higor Skowronski",
	"email": "higor@email.com",
	"is_adm": "true"
}
```

<h2 align ='center'> LOGIN </h2>

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
	"email": "higor@email.com",
	"password": "123456"
}
```

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG0iOmZhbHNlLCJpYXQiOjE2Njg0MzkzNjYsImV4cCI6MTY2ODQ0Mjk2Niwic3ViIjoiZTg5YzRlYTItNGEyYS00MDYyLTljNDAtZDQ5MzczZjI5MjQxIn0.O02iUZGXaIxPc2leowL3QrFOzwfWcKmjaoZ5LblPRDA"
}
```

Com esta resposta, podemos utilizar o token para fazer a gestão no front-end.

## Rotas que necessitam de autorização

Rotas que necessitam de autorização(token) deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

<h2 align ='center'> Listando usuário(s) (token) </h2>

Neste banco de dados, caso o usuário seja "is_adm", retorna todos os usuários cadastrados. Caso contrário, retorna apenas as informações do usuário logado.

`GET /user - FORMATO DA RESPOSTA (ADMIN)- STATUS 200`

````json
[
	{
		"id": "e89c4ea2-4a2a-4062-9c40-d49373f29241",
		"name": "Higor Skowronski",
		"email": "higor@email.com",
		"is_adm": false
	},
	{
		"id": "d3705280-28d3-4e78-89fa-592115144577",
		"name": "Skowronski Master",
		"email": "skowronski@email.com",
		"is_adm": true
	},
]
````

`GET /user - FORMATO DA RESPOSTA (NOT ADMIN)- STATUS 200`

````json
{
	"id": "e89c4ea2-4a2a-4062-9c40-d49373f29241",
	"name": "Higor Skowronski",
	"email": "higor@email.com",
	"is_adm": false
}
````

<h2 align ='center'> Atualizando o usuário (token) </h2>

`Patch /user/id (id do Usuário a ser editado) - FORMATO DA REQUISIÇÃO`

```json
{
	"name": "Edit Name User"
}
```

`Patch /user/id - FORMATO DA RESPOSTA - STATUS 200`
```json
{
  "id": "4c3ba545-c9a0-449a-a273-57eb5d5cd895"
	"name": "Edit Name User",
	"email": "higor@email.com",
	"is_adm": "true"
}
```

<h2 align ='center'> Deletando usuário (token)</h2>

Nesta rota, caso o usuário logado seja ADMIN, consegue deletar qualquer usuário, porém caso o usuário logado não for ADMIN, pode deletar apenas o seu próprio usuário.

`DELETE /user/id - Não é necessário passar corpo na requisição`

`DELETE /user/id - FORMATO DA RESPOSTA - STATUS 204`


<h2 align ='center'> Upload de arquivos TXT (token)</h2>

`POST /sales - FORMATO DA REQUISIÇÃO (token)`

Formato do arquivo de entrada

![image](https://user-images.githubusercontent.com/92741564/201709695-3d280b2d-aca4-48d3-bfdc-58d8db93e8b0.png)

Tipos de transações - Esses são os valores possíveis para o campo Tipo:

![image](https://user-images.githubusercontent.com/92741564/201709982-85d89d07-acf9-4a25-b411-a1b50cd0d62d.png)

`POST /sales - FORMATO DA RESPOSTA - STATUS 200`
```json
{
  "totalizer": 71000,
  "sales": [
		{
			"type": 1,
			"date": "2022-01-15T22:20:30.000Z",
			"product": "CURSO DE BEM-ESTAR            ",
			"value": 12750,
			"seller": "JOSE CARLOS"
		},
		{
			"type": 1,
			"date": "2021-12-03T14:46:02.000Z",
			"product": "DOMINANDO INVESTIMENTOS       ",
			"value": 50000,
			"seller": "MARIA CANDIDA"
		},
		{
			"type": 2,
			"date": "2022-01-16T17:13:54.000Z",
			"product": "CURSO DE BEM-ESTAR            ",
			"value": 12750,
			"seller": "THIAGO OLIVEIRA"
		},
		{
			"type": 3,
			"date": "2022-01-16T17:13:54.000Z",
			"product": "CURSO DE BEM-ESTAR            ",
			"value": 4500,
			"seller": "THIAGO OLIVEIRA"
		},
	]
}
```

<h2 align ='center'> Listando uploades de arquivos TXT (token)</h2>

Caso o usuário seja ADMIN, retorna todos os uploads realizados na aplicação, caso contrário, retorna apenas os upload feito pelo proprio usuário.

`GET /sales - FORMATO DA REQUISIÇÃO (token)`

````json
{
  "totalizer": 71000,
  "sales": [
		{
			"type": 1,
			"date": "2022-01-15T22:20:30.000Z",
			"product": "CURSO DE BEM-ESTAR            ",
			"value": 12750,
			"seller": "JOSE CARLOS"
		},
		{
			"type": 1,
			"date": "2021-12-03T14:46:02.000Z",
			"product": "DOMINANDO INVESTIMENTOS       ",
			"value": 50000,
			"seller": "MARIA CANDIDA"
		},
		{
			"type": 2,
			"date": "2022-01-16T17:13:54.000Z",
			"product": "CURSO DE BEM-ESTAR            ",
			"value": 12750,
			"seller": "THIAGO OLIVEIRA"
		},
		{
			"type": 3,
			"date": "2022-01-16T17:13:54.000Z",
			"product": "CURSO DE BEM-ESTAR            ",
			"value": 4500,
			"seller": "THIAGO OLIVEIRA"
		},
	]
}
