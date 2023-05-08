Olá, seja bem vindo!! \ {^_^} / 

Este projeto utiliza [Next.js](https://nextjs.org/)!!

## Instalação

Faça o download do node [Nodejs](https://nodejs.org/en/download)


# Opcional:

Caso preferir, instale também o [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) após a instalação do Nodejs


## Começando

Primeiro, instale todas as dependências do projeto:

```bash
npm install
# ou
yarn install
```

## Executando

Depois, execute o servidor de desenvolvimento e a Fake API, ambos iniciam rodando o comando abaixo:

```bash
npm run dev
# ou
yarn dev
```

## Visualizando

Abra em seu navegador [http://localhost:3000](http://localhost:3000) para acessar o site.

Para acessar a Fake API basta acessar [http://localhost:3030](http://localhost:3030) em seu navegador.

As rotas da API são: /users, /results, /currencies, /wallet 

O banco de dados pode ser visualizado no arquivo db.json, na raiz do projeto.

## API CoinAPI

É necessário criar um arquivo chamado .env.local na raiz do projeto para adicionar a key da CoinAPI. Caso isso não seja feito, apenas dados mocados serão exibidos e algumas partes do site não serão executadas corretamente!

Após criar o arquivo, adicione essa linha:

NEXT_PUBLIC_COINBASE_API_KEY={api_key}

Não esqueça de substituir {api_key} por uma Key Válida!!