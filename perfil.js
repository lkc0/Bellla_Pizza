function mascara_telefone() {
    const campo = document.getElementById("telefone");
    let tel = campo.value.replace(/\D/g, "").substring(0, 11);
    if (tel.length > 0) tel = "(" + tel;
    if (tel.length > 3) tel = tel.substring(0, 3) + ") " + tel.substring(3);
    if (tel.length > 10) tel = tel.substring(0, 10) + "-" + tel.substring(10);
    campo.value = tel;
}

const abrirLista = document.getElementById("abrirLista");
const lista = document.getElementById("lista");
if (abrirLista && lista) {
    abrirLista.addEventListener("click", function(event) {
        event.preventDefault();
        lista.style.display = lista.style.display === "block" ? "none" : "block";
    });
}

try {
    const conta = JSON.parse(sessionStorage.getItem("bellaPizzaConta"));
    if (conta) {
        const titulo = document.querySelector(".fundo-perfil h3");
        if (titulo) titulo.textContent = conta.nome;
        const campos = document.querySelectorAll(".fundo-info input");
        if (campos.length >= 4) {
            campos[0].value = conta.nome || "";
            campos[1].value = conta.telefone || "";
            campos[2].value = conta.email || "";
            campos[3].value = conta.endereco || "";
            campos.forEach(campo => campo.readOnly = true);
        }
    }
} catch {}
