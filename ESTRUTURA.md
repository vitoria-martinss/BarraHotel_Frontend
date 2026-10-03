# Estrutura do BarraHotel_Web

A estrutura abaixo mantém os nomes-base usados no projeto original e incorpora a aplicação completa do Barra Hotel.

```text
BarraHotel_Web/
├── beckend/
│   ├── db.js
│   └── servere.js
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   ├── FormularioHospedes.tsx
│   │   │   ├── ListaHospedes.tsx
│   │   │   ├── ListaReservas.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── QuartoCard.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Hospedes.tsx
│   │   │   ├── Reservas.tsx
│   │   │   └── demais páginas do sistema
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── layouts/
│   │   ├── config/
│   │   ├── data/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   ├── store.tsx
│   │   └── ui.tsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── package.json
├── package-lock.json
└── README.md
```

## Compatibilidade com a estrutura inicial

Os arquivos principais da estrutura enviada inicialmente foram preservados:

- `src/pages/Home.tsx`
- `src/pages/Hospedes.tsx`
- `src/pages/Reservas.tsx`
- `src/components/FormularioHospedes.tsx`
- `src/components/ListaHospedes.tsx`
- `src/components/ListaReservas.tsx`
- `src/services/api.ts`
- `src/App.tsx`
- `src/main.tsx`
- `src/index.css`

A extensão `.tsx` foi mantida porque o projeto completo utiliza TypeScript, conforme o requisito acadêmico.

## Backend

A pasta `beckend` mantém o nome do projeto original, inclusive a grafia utilizada no arquivo enviado.

A API continua disponibilizando:

- `GET /hospedes`
- `POST /hospedes`
- `GET /reservas`
- `POST /reservas`

O frontend usa `VITE_API_URL`, com padrão `http://localhost:3000`.
