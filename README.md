# ГидроМонитор — frontend

Шаблон моих проектов для быстрого создания

Основные библиотеки:
- React + TS
- TanStack Query
- MantineUI
- ReactRouter
- TablerIcons (Первая загрузка может быть долгим из-за этой библиотеки, если вы сталкиваетесь с проблемой производительности можете попробовать заменить ее на похожие, по типу ReactIcons)

Создана архитектура FSD, настроен роутинг

Архитектура:

Классический FSD:
```text
gidromonitor-frontend
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ public
│  ├─ favicon.svg
│  ├─ icons
│  └─ img
├─ README.md
├─ src
│  ├─ app
│  │  ├─ main.tsx
│  │  ├─ providers
│  │  │  └─ styles
│  │  │     └─ index.css
│  │  ├─ theme.ts
│  │  └─ vite-env.d.ts
│  ├─ pages
│  │  ├─ Errors
│  │  │  └─ Error404
│  │  │     ├─ Error404.page.tsx
│  │  │     └─ index.ts
│  │  └─ Main
│  │     ├─ index.ts
│  │     └─ Main.page.tsx
│  ├─ entities
│  │  ├─ auth
│  │  └─ user
│  ├─ shared
│  │  ├─ api
│  │  │  ├─ baseQuery.ts
│  │  │  └─ queryClient.ts
│  │  └─ lib
│  │     └─ hooks
│  └─ widgets
│     └─ Read.txt
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts


```

