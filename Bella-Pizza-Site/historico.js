const abrirLista = document.getElementById("abrirLista");
const lista = document.getElementById("lista");
if (abrirLista && lista) {
    abrirLista.addEventListener("click", function(event) {
        event.preventDefault();
        lista.style.display = lista.style.display === "block" ? "none" : "block";
    });
}

const historico = (() => {
    try { return JSON.parse(sessionStorage.getItem("bellaPizzaHistorico")) || []; }
    catch { return []; }
})();
const area = document.querySelector(".fundo-historico");
area.innerHTML = "";

if (!historico.length) {
    const imagem = document.createElement("img");
    imagem.src = "img/Nenhum Pedido Realizado Ainda 1.png";
    imagem.alt = "Nenhum pedido realizado ainda";
    area.append(imagem);
} else {
    historico.forEach(pedido => {
        const cartao = document.createElement("section");
        cartao.className = "pedido-historico";
        const titulo = document.createElement("h2");
        titulo.textContent = `Pedido realizado em ${pedido.data}`;
        const status = document.createElement("p");
        status.className = "status-pedido";
        status.textContent = "Status: comprado";
        const itens = document.createElement("ul");
        pedido.itens.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.quantidade}x ${item.nome} — ${item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} cada`;
            itens.append(li);
        });
        const total = document.createElement("strong");
        total.textContent = `Total: ${pedido.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
        cartao.append(titulo, status, itens, total);
        area.append(cartao);
    });
}
