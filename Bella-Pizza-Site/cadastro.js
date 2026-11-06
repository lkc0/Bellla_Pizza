const abrirLista = document.getElementById("abrirLista");
const lista = document.getElementById("lista");

if (abrirLista && lista) {
    abrirLista.addEventListener("click", function(event) {
        event.preventDefault();
        lista.style.display = lista.style.display === "block" ? "none" : "block";
    });
}

function mascara_cpf() {
    const campo = document.getElementById("cpf");
    let cpf = campo.value.replace(/\D/g, "").substring(0, 11);
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    campo.value = cpf;
}

function mascara_telefone() {
    const campo = document.getElementById("telefone");
    let tel = campo.value.replace(/\D/g, "").substring(0, 11);
    if (tel.length > 0) tel = "(" + tel;
    if (tel.length > 3) tel = tel.substring(0, 3) + ") " + tel.substring(3);
    if (tel.length > 10) tel = tel.substring(0, 10) + "-" + tel.substring(10);
    campo.value = tel;
}

const botaoCadastro = document.getElementById("btn-cadastrar");
if (botaoCadastro) {
    botaoCadastro.addEventListener("click", function () {
        const conta = {
            cpf: document.getElementById("cpf").value.trim(),
            telefone: document.getElementById("telefone").value.trim(),
            email: document.getElementById("email-cadastro").value.trim().toLowerCase(),
            senha: document.getElementById("senha-cadastro").value,
            nome: document.getElementById("nome-cadastro").value.trim(),
            endereco: document.getElementById("endereco-cadastro").value.trim()
        };

        if (Object.values(conta).some(valor => !valor)) {
            alert("Preencha todos os campos para criar sua conta.");
            return;
        }

        sessionStorage.setItem("bellaPizzaConta", JSON.stringify(conta));
        sessionStorage.setItem("bellaPizzaLogado", "true");
        sessionStorage.removeItem("bellaPizzaCarrinho");
        sessionStorage.removeItem("bellaPizzaHistorico");
        alert("Cadastro realizado com sucesso!");
        window.location.href = "cardapio.html";
    });
}
