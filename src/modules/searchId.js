import { getClients } from "../services/clients";


const searchInput = document.getElementById("search");

// Função para ser chamada quando "Enter" for pressionado
function pesquisar() {
    const valor = searchInput.value;
    console.log("Valor digitado:", valor);
    // getClients(valor);
    // Aqui você pode adicionar a lógica de pesquisa
}

// Escuta eventos de entrada e pressionamento de teclas
searchInput.addEventListener("keydown", (event) => {
    // Verifica se a tecla pressionada é "Enter"
    if (event.key === "Enter") {
        pesquisar();
    }
});