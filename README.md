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

## Product & Sales Dashboard - Q&A

### 1. What would be your first improvements if you had more implementation time?

If I had more time, my first improvements would focus on *performance, reliability, user experience, and scalability*:

1. *Caching and Optimized API Calls*
   - Implement caching using *Redis* on the backend or *React Query* on the frontend to reduce unnecessary API calls and improve response time.
   - Example: After adding a new product, append it directly to the existing list instead of refetching the entire table.

2. *Enhanced Hooks and State Management*
   - Improve custom hooks (useProducts, useSales) to return consistent data structures and handle optimistic updates.
   - Allows adding products or sales without fully reloading data, keeping the UI responsive.

3. *Logging and Monitoring*
   - Add detailed *logging* in both frontend and backend to track errors and user actions.
   - Integrate monitoring tools (like *Sentry*) for better production debugging.

4. *Full CRUD Operations*
   - Expand functionalities to include *delete, update, and edit* operations for products, categories, and sales.
   - Makes the app fully operational for real business workflows.

5. *Better Error Handling and User Feedback*
   - Improve backend error responses and display coherent, user-friendly messages in the frontend.
   - Example: If a CSV import fails, show which row failed and why.

6. *Application Completeness*
   - Add *user management* with authentication/authorization.
   - Implement *sales registration* workflow and more dashboard metrics.

7. *Testing*
   - Introduce structured *end-to-end tests* using *Cypress*.
   - Add unit and integration tests to ensure reliability across components and API endpoints.

---

### 2. What approach would you use to insert a price history into the database and chart for the dashboard?

1. *Database Approach*
   - Create a product_price_history table:
     sql
     id | product_id | price | changed_at
     
   - Insert a new record for each price update instead of overwriting previous prices.

2. *Backend Implementation*
   - Add a trigger or handle in the product update endpoint to automatically log price changes.
   - Optional: Keep only the last N records or archive older history for performance.

3. *Frontend / Dashboard*
   - Fetch price history via a dedicated endpoint.
   - Use chart components (like *Recharts*) to visualize price trends:
     - Line chart for individual product price changes.
     - Bar chart for average price per month.
   - Allow filtering by product or category.

---

### 3. What changes would need to be made to support updates in the product categories to have a discount percentage so that whenever the discount percentage is changed, the new price would be reflected in all products of the same category?

1. *Database Changes*
   - Add a discount_percentage column to the categories table:
     sql
     categories: id | name | discount_percentage
     

2. *Backend Changes*
   - Calculate discounted price dynamically when fetching products:
     python
     discounted_price = product.price * (1 - category.discount_percentage / 100)
     
   - Alternatively, perform a batch update of all products in the category whenever the discount changes.

3. *Frontend Changes*
   - Display *discounted price* in the product table and dashboard metrics.
   - Ensure CSV imports and product creation respect the current category discount.

4. *Optional Optimizations*
   - Trigger recalculation only when the discount changes.
   - Use caching to avoid repeated calculations for the same product list.

## 👥 Desenvolvedora

<table>
  <tr>
    <td align="center"><a href="https://github.com/AlineEspindola"><img src="https://avatars.githubusercontent.com/AlineEspindola" width="80px;" alt="Aline Espindola"/><br /><sub><b>Aline Espindola</b></sub></a><br /><a href="#" title="Code">💻🎨</a></td>
  </tr>
</table>
