const abrirLista = document.getElementById("abrirLista");
const lista = document.getElementById("lista");
if (abrirLista && lista) {
    abrirLista.addEventListener("click", function(event) {
        event.preventDefault();
        lista.style.display = lista.style.display === "block" ? "none" : "block";
    });
}

const CHAVE_CARRINHO = "bellaPizzaCarrinho";
const CHAVE_HISTORICO = "bellaPizzaHistorico";
const tbody = document.querySelector(".tabela-carrinho tbody");
const taxaEntrega = 8;
const moeda = valor => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function ler(chave) {
    try { return JSON.parse(sessionStorage.getItem(chave)) || []; }
    catch { return []; }
}

function salvarCarrinho(carrinho) {
    sessionStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

function atualizarCarrinho() {
    const carrinho = ler(CHAVE_CARRINHO);
    tbody.innerHTML = "";
    let quantidadeTotal = 0;
    let subtotal = 0;

    if (carrinho.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:35px;">Seu carrinho está vazio.</td></tr>';
    }

    carrinho.forEach((item, indice) => {
        const quantidade = Math.max(1, Number(item.quantidade) || 1);
        const totalItem = item.preco * quantidade;
        quantidadeTotal += quantidade;
        subtotal += totalItem;
        const linha = document.createElement("tr");
        linha.className = "item-carrinho";

        const produto = document.createElement("td");
        produto.className = "info-produto";
        const imagem = document.createElement("img");
        imagem.className = "img-item";
        imagem.src = item.imagem || "";
        imagem.alt = item.nome;
        const detalhes = document.createElement("div");
        detalhes.className = "detalhes-produto";
        const nome = document.createElement("h3");
        nome.textContent = item.nome;
        const descricao = document.createElement("p");
        descricao.textContent = item.descricao || "";
        detalhes.append(nome, descricao);
        produto.append(imagem, detalhes);

        const preco = document.createElement("td");
        preco.className = "preco-unitario";
        preco.textContent = moeda(item.preco);

        const controle = document.createElement("td");
        const grupo = document.createElement("div");
        grupo.className = "controle-qtd";
        const mais = document.createElement("button");
        mais.className = "btn-qtd btn-mais";
        mais.textContent = "+";
        mais.type = "button";
        mais.setAttribute("aria-label", "Aumentar quantidade");
        const numero = document.createElement("span");
        numero.className = "qtd-numero";
        numero.textContent = quantidade;
        const menos = document.createElement("button");
        menos.className = "btn-qtd btn-menos";
        menos.textContent = "−";
        menos.type = "button";
        menos.setAttribute("aria-label", "Diminuir quantidade");
        mais.addEventListener("click", () => {
            const atual = ler(CHAVE_CARRINHO);
            atual[indice].quantidade++;
            salvarCarrinho(atual);
            atualizarCarrinho();
        });
        menos.addEventListener("click", () => {
            const atual = ler(CHAVE_CARRINHO);
            atual[indice].quantidade--;
            if (atual[indice].quantidade <= 0) atual.splice(indice, 1);
            salvarCarrinho(atual);
            atualizarCarrinho();
        });
        grupo.append(mais, numero, menos);
        controle.append(grupo);

        const total = document.createElement("td");
        total.className = "preco-total-item";
        total.textContent = moeda(totalItem);
        linha.append(produto, preco, controle, total);
        tbody.append(linha);
    });

    document.getElementById("qtd-total-itens").textContent = quantidadeTotal;
    document.getElementById("subtotal-valor").textContent = moeda(subtotal);
    document.getElementById("taxa-entrega").textContent = moeda(carrinho.length ? taxaEntrega : 0);
    document.getElementById("total-geral").textContent = moeda(subtotal + (carrinho.length ? taxaEntrega : 0));
}

const botaoFinalizar = document.querySelector(".btn-finalizar");
botaoFinalizar.addEventListener("click", function() {
    const carrinho = ler(CHAVE_CARRINHO);
    if (!carrinho.length) {
        alert("Adicione pelo menos um produto antes de finalizar o pedido.");
        return;
    }

    const pedido = carrinho.map(item => ({
        nome: item.nome,
        preco: Number(item.preco),
        quantidade: Number(item.quantidade),
        status: "em preparo"
    }));

    const arquivo = new Blob([JSON.stringify(pedido, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pedido-bella-pizza-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    const historico = ler(CHAVE_HISTORICO);
    historico.unshift({
        data: new Date().toLocaleString("pt-BR"),
        itens: pedido,
        total: pedido.reduce((soma, item) => soma + item.preco * item.quantidade, 0) + taxaEntrega,
        status: "comprado"
    });
    sessionStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
    salvarCarrinho([]);
    alert("Pedido finalizado! O arquivo JSON foi gerado e a compra foi adicionada ao histórico.");
    atualizarCarrinho();
});

atualizarCarrinho();
