# Teste - Brain Agriculture - Frontend

[Clique aqui para ver o projeto no ar](https://brain-agriculture-front.vercel.app/)

### Tecnologias usadas:

Next, Shadcn, Tailwind, React Query, React Hook Form, Redux e Zod

## Decisões Técnicas:

1. Os dados iniciais a serem apresentados foram colocados dentro de um json na pasta mock. Optei por não desmembrar produtor e fazenda em dados diferentes já que a descrição do teste e requisitos do formulário sugerem uma relação 1-1
2. Os dados são guardados dentro de um store e manipulado através do redux, conforme pedido na descrição. Também seria confortável usar Context Api ou Zustand para manipular o estado.
3. Para os dados de Estado e Cidado, optei por usar diretamente a [api do ibge](https://servicodados.ibge.gov.br/)
4. Para os estilos, optei por usar componentes Shadcn e tailwind para prover mais agilidade no desenvolvimento. Também estaria confortável em usar qualquer outra lib ou framework CSS.
5. Para requisições à api de localidades usei o fetch api
6. Realizei alguns testes unitários com jest, mas não fiz muitos em vista do tempo.
   
---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
