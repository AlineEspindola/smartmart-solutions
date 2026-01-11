# 🛒 Sistema de Produtos e Vendas

Este projeto é uma aplicação completa para gerenciamento de **produtos, categorias e vendas**, com dashboard interativo, upload de CSV e visualização de estatísticas. Ele é dividido em duas partes:

1. **Frontend**: React + Vite + Tailwind + Shadcn
2. **Backend**: Python + Flask

---

## 📂 Estrutura do Projeto (Principais Arquivos)

```
root/
│
├── backend/                 # Backend em Python/Flask
│   ├── app.py               # Entrypoint do Flask
│   ├── routes/              # Rotas da API
│   │   ├── products.py
│   │   ├── categories.py
│   │   └── sales.py
|   |── database.py   
|   |── models.py   
│   ├── services/            # Lógica de CSV
│   └── requirements.txt     # Dependências Python
│
└── frontend/                # Frontend em React + Vite
    ├── src/
    │   ├── components/     # Componentes UI (Tabela, Cards, Charts, Modal)
    │   ├── contexts/       # Contexto de Produtos
    │   ├── hooks/          # Hooks customizados (useProducts, useSales, useCategories)
    │   ├── pages/          # Páginas / Dashboards
    │   ├── services/       # Funções de requisição HTTP
    │   └── types/          # Tipagens TypeScript
    ├── index.css
    ├── main.tsx
    └── vite.config.ts
```

---

## ⚡ Funcionalidades

### Backend (Flask)

* API para **Produtos, Categorias e Vendas**
* Upload de CSV para produtos e vendas
* Endpoints principais:

  * `/products` → CRUD de produtos
  * `/categories` → Listagem de categorias
  * `/sales` → CRUD e dashboard de vendas
* Dashboard do backend calculando totais, faturamento e ticket médio
* Estrutura modular com `routes` e `services`

### Frontend (React + Vite)

* Dashboard de produtos e vendas
* Upload de CSV diretamente do frontend
* Tabelas com filtros por **categorias**, pesquisa e ordenação
* Charts de vendas: **Bar, Line, Area** (Recharts)
* Cards com totais:

  * Total de produtos
  * Total de marcas
  * Total de categorias em uso
  * Valor total em estoque
  * Total de itens vendidos
  * Faturamento total
  * Ticket médio
* Modal para adicionar produtos, com **select de categorias**
* Context API para gerenciamento centralizado de produtos

---

## 🚀 Como Rodar o Projeto

### Backend (Python + Flask)

1. **Acesse a pasta backend:**

```bash
cd backend
```

2. **Crie um ambiente virtual (opcional, mas recomendado):**

```bash
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
```

3. **Instale as dependências:**

```bash
pip install -r requirements.txt
```

4. **Execute o servidor Flask:**

```bash
python app.py
```

O servidor ficará disponível em: `http://localhost:5000`

> ⚠️ Certifique-se que o backend esteja rodando antes de iniciar o frontend.

---

### Frontend (React + Vite)

1. **Acesse a pasta frontend:**

```bash
cd frontend
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn
```

3. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
# ou
yarn dev
```

O frontend ficará disponível em: `http://localhost:5173`

---

## 🧩 Tecnologias Usadas

* **Frontend:**

  * React + TypeScript
  * Vite
  * Tailwind CSS
  * ShadCN UI (Cards, Tables, Dialogs, Selects)
  * Recharts (Gráficos de vendas)
* **Backend:**

  * Python 3.x
  * Flask
  * Flask-CORS
  * CSV parsing para importação de produtos e vendas

---

## 🔧 Observações

* No frontend, o contexto `ProductsContext` calcula automaticamente:

  * Total de produtos
  * Total de marcas
  * Total de categorias únicas em uso
  * Valor total em estoque
* O select de categorias nos formulários é **dinâmico** e busca os dados do backend.
* Todas as tabelas têm filtros e pesquisa implementados usando apenas componentes nativos do ShadCN (sem bibliotecas externas).
* Categorias foram previamente cadastradas. Para utilizar sistema, tenha categorias já existentes no sistema
