(function () {
    const pagina = window.location.pathname.split("/").pop().toLowerCase();
    const paginasProtegidas = ["cardapio.html", "carrinho.html", "historico.html", "perfil.html"];
    const conta = sessionStorage.getItem("bellaPizzaConta");
    const conectado = sessionStorage.getItem("bellaPizzaLogado") === "true" && !!conta;

    if (paginasProtegidas.includes(pagina) && !conectado) {
        window.location.replace("login.html");
        return;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const botoes = document.querySelector(".botoes");
        if (!botoes) return;

        if (conectado) {
            const cadastro = document.getElementById("btn-cadastro");
            const login = document.getElementById("btn-login");
            if (cadastro) cadastro.style.display = "none";
            if (login) login.style.display = "none";

            if (!document.getElementById("btn-sair")) {
                const sair = document.createElement("button");
                sair.id = "btn-sair";
                sair.className = "btn login";
                sair.type = "button";
                sair.textContent = "Sair";
                sair.addEventListener("click", function () {
                    sessionStorage.removeItem("bellaPizzaLogado");
                    sessionStorage.removeItem("bellaPizzaCarrinho");
                    sessionStorage.removeItem("bellaPizzaHistorico");
                    window.location.href = "index.html";
                });
                botoes.appendChild(sair);
            }
        }
    });
})();
