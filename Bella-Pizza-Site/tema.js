(function () {
    const chave = "bellaPizzaModoEscuro";
    const html = document.documentElement;

    function aplicarTema(escuro) {
        html.classList.toggle("dark-mode", escuro);
        if (document.body) document.body.classList.toggle("dark-mode", escuro);
        const trilho = document.getElementById("trilho");
        const checkbox = document.getElementById("switch");
        if (trilho) trilho.classList.toggle("dark", escuro);
        if (checkbox) checkbox.checked = escuro;
    }

    aplicarTema(localStorage.getItem(chave) === "true");

    document.addEventListener("DOMContentLoaded", function () {
        aplicarTema(localStorage.getItem(chave) === "true");
        const checkbox = document.getElementById("switch");
        if (checkbox) {
            checkbox.addEventListener("change", function () {
                localStorage.setItem(chave, checkbox.checked ? "true" : "false");
                aplicarTema(checkbox.checked);
            });
        }
    });
})();
