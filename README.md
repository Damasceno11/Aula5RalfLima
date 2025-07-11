# 🛒 CRUD de Produtos - Projeto +Devs2Blu

Este é um projeto prático de CRUD (Create, Read, Update, Delete) de produtos, desenvolvido com **HTML, CSS e JavaScript puro (Vanilla JS)**, utilizando uma API REST simulada com o **JSON Server**. O objetivo é exercitar a manipulação de formulários, tabelas e requisições HTTP (`fetch`) no frontend.

---

## 📌 Funcionalidades

- ✅ Listagem de produtos existentes (GET)
- ✅ Cadastro de novos produtos (POST)
- ✅ Seleção de produtos para edição
- ✅ Edição de produtos (PUT)
- ✅ Remoção de produtos (DELETE)
- ✅ Botões contextuais que aparecem conforme a ação (Cadastrar, Alterar, Remover, Cancelar)
- ✅ Validação de campos antes de enviar dados para a API

---

## 🧠 Tecnologias e conceitos aplicados

- HTML5 e semântica de formulários
- CSS + Bootstrap 5 para layout e responsividade
- JavaScript moderno (ES6+)
- `fetch API` para consumo de serviços REST
- Manipulação do DOM (`document.getElementById`)
- Organização de código por funções
- Uso de `.trim()` e `parseFloat()` para validação
- Controle de estado com vetor global (`produtos[]`)
- Separação entre camada de dados e interface

---

## 🚀 Como executar o projeto

### Pré-requisitos:
- Node.js instalado na máquina
- Editor de código (ex: VSCode)

### Passos:

1. Instale o JSON Server:
```bash
npm install -g json-server
````

2. Crie um arquivo chamado `db.json` com estrutura inicial:

```json
{
  "produtos": [
    {
      "id": "97a1",
      "nome": "Smart TV 55\"",
      "marca": "Samsung",
      "valor": 4300
    }
  ]
}
```

3. Rode o servidor:

```bash
json-server --watch db.json --port 3000
```

4. Abra o `index.html` no navegador e interaja com a interface CRUD.

---

## 📁 Estrutura do projeto

```
.
├── index.html        # Interface com formulário e tabela
├── estilos.css       # Estilo customizado + Bootstrap
└── script.js         # Lógica JS: CRUD completo com fetch API
```

---

## 👨‍💻 Autor

**Pedro Paulo Damasceno Muniz**
Estudante de Análise e Desenvolvimento de Sistemas – Uniasselvi
Participante do projeto intensivo +Devs2Blu – Proway - Blumenau
GitHub: [Damasceno11](https://github.com/Damasceno11)

---

## 📚 Créditos

Projeto desenvolvido com fins didáticos para reforçar os conceitos de:

* Integração frontend e backend com APIs REST
* Estrutura de código organizado e comentado
* Validação de dados no navegador

```

