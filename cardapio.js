const abrirLista = document.getElementById("abrirLista");
const lista = document.getElementById("lista");

if (abrirLista && lista) {
    abrirLista.addEventListener("click", function(event) {
        event.preventDefault();
        lista.style.display = lista.style.display === "block" ? "none" : "block";
    });
}

const CHAVE_CARRINHO = "bellaPizzaCarrinho";
const botoesAdicionar = document.querySelectorAll(".adicionar");

function lerCarrinho() {
    try {
        return JSON.parse(sessionStorage.getItem(CHAVE_CARRINHO)) || [];
    } catch {
        return [];
    }
}

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", function() {
        const card = botao.closest(".pizza");
        const nome = card.querySelector("h3").textContent.trim();
        const preco = Number(card.querySelector("h2").textContent.replace(",", ".").replace(/[^0-9.]/g, ""));
        const imagem = card.querySelector("img")?.getAttribute("src") || "";
        const descricao = card.querySelector("p")?.textContent.trim() || "";
        const carrinho = lerCarrinho();
        const existente = carrinho.find(item => item.nome === nome);

        if (existente) {
            existente.quantidade += 1;
        } else {
            carrinho.push({ nome, preco, quantidade: 1, imagem, descricao });
        }

        sessionStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
        const textoOriginal = botao.textContent;
        botao.textContent = "✓ Adicionado";
        setTimeout(() => botao.textContent = textoOriginal, 1000);
    });
});
