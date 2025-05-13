document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("multi-step-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const previewImage = document.getElementById("preview-image");
        const currentSrc = previewImage.getAttribute("src");
        const isDefault = currentSrc.includes("default-avatar.png");

        if (isDefault) {
            alert("Por favor, selecione uma imagem antes de continuar.");
            return; // Impede de finalizar o cadastro
        }

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
