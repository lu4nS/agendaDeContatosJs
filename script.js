
let contatos = [];

const formularioContato = document.getElementById('formularioContato');
const listaContatos = document.getElementById('listaContatos');
const campoBusca = document.getElementById('campoBusca');

function salvarContatos() {
    localStorage.setItem('contatos', JSON.stringify(contatos));
}

function carregarContatos() {
    const contatosSalvos = localStorage.getItem('contatos');
    if (contatosSalvos) {
        contatos = JSON.parse(contatosSalvos);
        renderizarContatos();
    }
}

function adicionarContato(nome, telefone, email) {
    contatos.push({ nome, telefone, email });
    contatos.sort((a, b) => a.nome.localeCompare(b.nome));
    salvarContatos();
    renderizarContatos();
}

function excluirContato(index) {
    contatos.splice(index, 1);
    salvarContatos();
    renderizarContatos();
}

function atualizarContato(index, nome, telefone, email) {
    contatos[index] = { nome, telefone, email };
    contatos.sort((a, b) => a.nome.localeCompare(b.nome));
    salvarContatos();
    renderizarContatos();
}

function renderizarContatos(termoBusca = '') {
    listaContatos.innerHTML = '';
    const contatosFiltrados = contatos.filter(contato =>
        contato.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        contato.telefone.includes(termoBusca) ||
        contato.email.toLowerCase().includes(termoBusca.toLowerCase())
    );

    contatosFiltrados.forEach((contato, index) => {
        const li = document.createElement('li');
        li.className = 'item-contato';
        li.innerHTML = `
            <h3>${contato.nome}</h3>
            <p>${contato.telefone}</p>
            <p>${contato.email}</p>
            <div class="acoes-contato">
                <button onclick="promptEditarContato(${index})">Editar</button>
                <button onclick="excluirContato(${index})">Excluir</button>
            </div>
        `;
        listaContatos.appendChild(li);
    });
}

function promptEditarContato(index) {
    const contato = contatos[index];
    const nome = prompt('Editar nome:', contato.nome);
    const telefone = prompt('Editar telefone:', contato.telefone);
    const email = prompt('Editar email:', contato.email);
    if (nome && telefone && email) {
        atualizarContato(index, nome, telefone, email);
    }
}

formularioContato.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    adicionarContato(nome, telefone, email);
    formularioContato.reset();
});

campoBusca.addEventListener('input', (e) => {
    renderizarContatos(e.target.value);
});

carregarContatos();