<div align="center">
  <h1>Web Virtual Cloud Frontend</h1>

</div>

<div align="center">

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2335495e.svg?style=for-the-badge&logo=react&logoColor=%0a7ea4)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

## Commands list

Install dependencies:

```ssh
npm i
```

Run development server

```ssh
npm run dev
```

Build for production

```ssh
npm run build
```

## Environment Variables

| Variable              | Description                            | Default                             |
|-----------------------|----------------------------------------|-------------------------------------|
| `VITE_API_DOMAIN`     | API domain.                            | Current URL (`window.location.href`) |
| `VITE_API_PREFIX`     | API prefix.                            | `api/v1`                            |
| `VITE_LOADBALANCER`   | Enabled or disabled Load Balancer.     | `undefined` (disabled)              |
| `VITE_DISPLAY_PRICES` | Enabled or disabled displaying prices. | `undefined` (disabled)              |
