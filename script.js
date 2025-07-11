// Vetor global que representa os produtos atuais recebidos da API
let produtos = [];

// Ao carregar a página, busca os produtos e ajusta a visibilidade dos botões
window.onload = () => {
    fetchProdutos();
    configurarBotoes();
};

// ========================= BUSCAR PRODUTOS (GET) =========================
// Busca os produtos no backend e atualiza o vetor e a tabela na interface
const fetchProdutos = () => {
    fetch('http://localhost:3000/produtos')
        .then((res) => res.json())
        .then((data) => {
            produtos = data; // Atualiza vetor global com dados da API
            renderizarTabela(); // Atualiza a tabela na tela
        })
        .catch((erro) => console.error('Erro ao buscar produtos:', erro));
};

// ========================= CADASTRAR PRODUTO (POST) =========================
// Valida campos e envia POST para criar um novo produto no backend
const Cadastrar = () => {
    const nome = document.getElementById('nome').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const valor = parseFloat(document.getElementById('valor').value);

    // Validação básica para evitar envio de dados inválidos
    if (!nome || !marca || isNaN(valor)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const novoProduto = { nome, marca, valor };

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto),
    })
        .then((res) => res.json())
        .then((produtoCriado) => {
            produtos.push(produtoCriado); // Atualiza vetor local com o novo produto
            renderizarTabela(); // Atualiza tabela para mostrar novo produto
            Cancelar(); // Limpa formulário após sucesso
        })
        .catch((err) => console.error('Erro ao cadastrar:', err));
};

// ========================= ALTERAR PRODUTO (PUT) =========================
// Valida campos, envia PUT para atualizar produto selecionado no backend
const Alterar = () => {
    const id = document.getElementById('id').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const valor = parseFloat(document.getElementById('valor').value);

    if (!id || !nome || !marca || isNaN(valor)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const produtoAtualizado = { nome, marca, valor };

    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoAtualizado),
    })
        .then((res) => res.json())
        .then(() => {
            // Atualiza produto localmente para refletir alterações
            const index = produtos.findIndex((p) => p.id === id);
            if (index !== -1) {
                produtos[index] = { id, ...produtoAtualizado };
                renderizarTabela();
                Cancelar();
            }
        })
        .catch((err) => console.error('Erro ao alterar:', err));
};

// ========================= REMOVER PRODUTO (DELETE) =========================
// Confirma remoção e envia DELETE para backend, atualizando interface
const Remover = () => {
    const id = document.getElementById('id').value.trim();

    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    fetch(`http://localhost:3000/produtos/${id.trim()}`, {
        method: 'DELETE',
    })
        .then(() => {
            produtos = produtos.filter((p) => p.id !== id); // Remove localmente
            renderizarTabela(); // Atualiza tabela após remoção
            Cancelar();
        })
        .catch((err) => console.error('Erro ao remover:', err));
};

// ========================= CANCELAR EDIÇÃO =========================
// Limpa o formulário e ajusta os botões para o estado inicial (cadastro)
const Cancelar = () => {
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('valor').value = '';

    configurarBotoes();
};

// ========================= SELECIONAR PRODUTO =========================
// Carrega os dados do produto selecionado para o formulário para edição
const selecionar = (indice) => {
    const produto = produtos[indice];
    console.log(produto);

    document.getElementById('id').value = produto.id;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('marca').value = produto.marca;
    document.getElementById('valor').value = produto.valor;

    // Ajusta os botões para modo edição
    document.getElementById('btnCadastrar').style.display = 'none';
    document.getElementById('btnAlterar').style.display = 'inline-block';
    document.getElementById('btnRemover').style.display = 'inline-block';
    document.getElementById('btnCancelar').style.display = 'inline-block';
};

// ========================= CONTROLAR BOTÕES =========================
// Controla a visibilidade dos botões dependendo do estado do formulário
const configurarBotoes = () => {
    document.getElementById('btnCadastrar').style.display = 'inline-block';
    document.getElementById('btnAlterar').style.display = 'none';
    document.getElementById('btnRemover').style.display = 'none';
    document.getElementById('btnCancelar').style.display = 'none';
};

// ========================= RENDERIZAR TABELA =========================
// Atualiza a tabela exibida na página para mostrar os produtos atuais
const renderizarTabela = () => {
    const tabela = document.getElementById('tabela');
    tabela.innerHTML = ''; // Limpa conteúdo para evitar duplicações

    produtos.forEach((produto, indice) => {
        const linha = tabela.insertRow(-1);

        linha.insertCell(0).innerText = produto.id;
        linha.insertCell(1).innerText = produto.nome;
        linha.insertCell(2).innerText = produto.marca;
        linha.insertCell(3).innerText = `R$ ${parseFloat(produto.valor).toFixed(
            2,
        )}`;
        linha.insertCell(4).innerHTML = `
            <button onclick="selecionar(${indice})" class="btn btn-sm btn-warning">
                Selecionar
            </button>`;
    });
};
