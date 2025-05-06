document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("multi-step-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const inputs = form.querySelectorAll("input[name]");

        inputs.forEach((input) => {
            localStorage.setItem(input.name, input.value);
        });

        alert("Cadastro finalizado com sucesso!");

        inputs.forEach((input) => {
            input.value = "";
        });

        if (typeof resetStepsToFirst === "function") {
            resetStepsToFirst();
        }
    });
});
