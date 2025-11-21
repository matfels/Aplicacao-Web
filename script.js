const cardcontainer = document.querySelector(".card-container"); // .card-container" está declarado no HTML, estamos utilizando esse container para inserir os dados.  
const searchInput = document.querySelector("header div input");
let dados = []; // Variavel para armazenar os dados do JSON.

// Função para carregar os dados do JSON uma única vez.
async function carregarDados() {
    try {
        const resposta = await fetch("data.json"); // Está recebendo o arquivo .json e não sómente os seus dados.
        dados = await resposta.json(); // Está recebendo apenas os dados do arquivo .json.
        renderizarCards(dados); // Exibe todos os cards inicialmente.
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function iniciarBusca() {
    const termoBusca = searchInput.value.toLowerCase(); // Pega o valor do input e converte para minúsculas.

    // Filtra os dados com base no nome ou na descrição.
    const dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoBusca) ||
               dado.descrição.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados); // Renderiza apenas os cards filtrados.
}

function renderizarCards(dados){
    cardcontainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards.

    for (let dado of dados){
        let article = document.createElement("article"); // A variável está recebendo a TAG <article></article>
        article.classList.add("card"); // Adicionando um "card" dentro da tag <article>
        // esse innerHTML diz qual dado será inserido, no caso HTML
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
            <p>Ano de criação: ${dado.data_criacao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardcontainer.appendChild(article); // Dizendo que vamos anexar um filho dentro desse container.
    }
}

// Carrega os dados assim que o script é executado.
carregarDados();
