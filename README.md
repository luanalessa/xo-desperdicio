# <p align = "center">{ reprograma } </p>
<p align = "center">
<img width="500" alt="10 xodós" 2024-07-13 at 20 30 47" src="https://github.com/user-attachments/assets/14fc47df-4141-40c1-8e49-09301ddd5680">
</p>
<p align = "center">
   <img src="https://img.shields.io/badge/autor-luanalessa-BFBF5E?style=flat-square" />
   <img src="https://img.shields.io/badge/semana-14-BFBF5E?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/luanalessa/xo-desperdicio?color=BFBF5E&style=flat-square" />
</p>

# <p align = "center"> Xô Desperdício 🍏</p>

<br>

**Xô Desperdício** é uma plataforma que conecta pessoas e empresas que desejam doar alimentos próximos da data de validade, mas ainda adequados para o consumo, ou que queiram fazer doações de alimentos em geral, com pessoas em situação de vulnerabilidade e instituições que precisam. O objetivo é reduzir o desperdício de alimentos e combater a fome de maneira eficiente e sustentável.

<br>

## 🌎 Alinhamento com a ODS 2 da ONU

O projeto está diretamente alinhado com a **ODS 2 - Fome Zero e Agricultura Sustentável**, uma das 17 **Objetivos de Desenvolvimento Sustentável (ODS)** da ONU. A ODS 2 busca erradicar a fome, alcançar a segurança alimentar, melhorar a nutrição e promover a agricultura sustentável até 2030. 

A plataforma contribui para:

- **Erradicar a fome**: Facilitando o acesso a alimentos para pessoas em situação de vulnerabilidade.
- **Reduzir o desperdício de alimentos**: Conectando doadores a quem realmente precisa, evitando que alimentos em bom estado sejam descartados.
- **Promover sistemas alimentares sustentáveis**: Incentivando empresas e pessoas a adotarem práticas responsáveis em relação à doação e reaproveitamento de alimentos.

Ao conectar doadores e receptores, o **Xô Desperdício** reforça o compromisso de promover a distribuição justa de recursos alimentares e reduzir a desigualdade no acesso à alimentação de qualidade.

<br>

## 🎯 Funcionalidades

- **Cadastro de doadores**: Permite que empresas e indivíduos registrem doações de alimentos.
- **Cadastro de receptores**: Pessoas e ONGs podem se cadastrar para receber doações.
- **Geolocalização de doações**: Mostra doações disponíveis nas proximidades. [em breve]
- **Filtros de busca**: Filtra doações por tipo de alimento e data de validade. [em breve]

<br>

## 🧩 Tecnologias Utilizadas

- **Backend**: [NestJS](https://nestjs.com/) com [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Autenticação**: JWT (JSON Web Token)
- **Deploy**: [AWS](https://aws.amazon.com/)

<br>

## 📁 Rotas Disponíveis
1. Usuários (Users)
```typescript
POST /users/{type}
Cadastra um novo usuário do tipo especificado (doadores, ONGs, receptores).

Body: JSON contendo as informações do usuário.
Params: {type} pode ser donor, ngo, ou receiver.
GET /users
Lista todos os usuários registrados.

GET /users/{id}
Retorna informações detalhadas sobre um usuário específico.

Params: {id} ID do usuário.
```
<br>

2. Doações (Donations)
```typescript
GET /donations
Lista todas as doações disponíveis.

GET /donations/{id}
Retorna detalhes de uma doação específica.

Params: {id} ID da doação.
POST /donations/request
Permite que um receptor (pessoa ou ONG) solicite uma doação.

Body: JSON contendo as informações de solicitação de doação.
PUT /donations/update-status/{donationOrderId}
Atualiza o status de uma doação específica (ex: de "pendente" para "concluída").

Params: {donationOrderId} ID do pedido de doação.
```

<br>

3. Alimentos (Foods)
```typescript
POST /foods/{type}
Cadastra um novo tipo de alimento disponível para doação.

Params: {type} pode ser frutas, legumes, grãos, etc.
GET /foods/{type}


Retorna uma lista de alimentos disponíveis do tipo especificado.

Params: {type} tipo de alimento.
GET /foods
Lista todos os alimentos disponíveis.
```

<br>

## 🚀 Rodando o projeto 
<br>

Este projeto foi iniciado com [NestJS](https://nestjs.com/) , então você precisa instalar [Node.js](https://nodejs.org/en/download/package-manager) e [npm](https://www.npmjs.com) primeiro, para testar na sua máquina.

Em seguida, clone o repositório com:

```shell
git clone https://github.com/luanalessa/xo-desperdicio
```

Então, no diretório do projeto, você pode executar esse comando para instalar as dependências:

```shell
npm install
```

Suba o container do banco

```shell
docker-compose up -d
```

E depois:

```shell
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
para iniciar o servidor em diferentes modos. 

O swagger da aplicação estará disponível no [localhost](http://localhost:3000/swagger) em seu navegador.

