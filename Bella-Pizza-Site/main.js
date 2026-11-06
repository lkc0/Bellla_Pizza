const abrirLista = document.getElementById("abrirLista");
const lista = document.getElementById("lista");

if (abrirLista && lista) {
    abrirLista.addEventListener("click", function(event) {
        event.preventDefault();
        lista.style.display = lista.style.display === "block" ? "none" : "block";
    });
}
