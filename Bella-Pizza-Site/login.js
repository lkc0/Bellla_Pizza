const abrirLista = document.getElementById("abrirLista");
const lista = document.getElementById("lista");

if (abrirLista && lista) {
    abrirLista.addEventListener("click", function(event) {
        event.preventDefault();
        lista.style.display = lista.style.display === "block" ? "none" : "block";
    });
}

const botaoLogin = document.getElementById("btn-entrar");
if (botaoLogin) {
    botaoLogin.addEventListener("click", function () {
        let conta;
        try {
            conta = JSON.parse(sessionStorage.getItem("bellaPizzaConta"));
        } catch {
            conta = null;
        }

        const email = document.getElementById("email-login").value.trim().toLowerCase();
        const senha = document.getElementById("senha-login").value;

        if (!conta) {
            alert("Nenhuma conta foi cadastrada nesta sessão. Faça seu cadastro primeiro.");
            window.location.href = "cadastro.html";
            return;
        }

        if (email !== conta.email || senha !== conta.senha) {
            alert("E-mail ou senha incorretos.");
            return;
        }

        sessionStorage.setItem("bellaPizzaLogado", "true");
        window.location.href = "cardapio.html";
    });
}
