document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("multi-step-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const inputs = form.querySelectorAll('input[name]:not([type="file"])');

        // Salvar CADA campo separadamente no localStorage
        inputs.forEach((input) => {
            localStorage.setItem(input.name, input.value);
        });

        alert("Cadastro finalizado com sucesso!");

        // Limpar apenas os valores dos inputs, não o localStorage
        inputs.forEach((input) => {
            input.value = "";
        });

        // Voltar para o primeiro step
        if (typeof resetStepsToFirst === "function") {
            resetStepsToFirst();
        }
    });
});
