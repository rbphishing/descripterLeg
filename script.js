document.addEventListener("DOMContentLoaded", () => {
    const descricaoInput = document.getElementById("descricao");
    const palavrasChaveInput = document.getElementById("palavras-chave");
    const legendaOutput = document.getElementById("legenda");
    const botaoGerar = document.querySelector("button");

    botaoGerar.addEventListener("click", () => {
        const descricao = descricaoInput.value.trim();
        const palavrasChave = palavrasChaveInput.value.trim().split(",").map(palavra => palavra.trim());

        if (descricao === "") {
            legendaOutput.textContent = "Por favor, insira uma descrição para gerar a legenda.";
            return;
        }

        // Requisição à API da Predis.ai
        const apiKey = 'jzxgdcDyAkM2s3qhgJCb99FqB16s0QBf'; // Substitua pela chave de API fornecida
        const url = 'https://api.predis.ai/gerar-legenda';  // Endpoint da Predis.ai (substitua conforme necessário)

        const data = {
            descricao: descricao,
            palavrasChave: palavrasChave
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            const legendaGerada = data.legenda || "Erro ao gerar legenda."; // Ajuste conforme o retorno da API
            legendaOutput.textContent = legendaGerada;
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            legendaOutput.textContent = "Erro ao gerar legenda.";
        });
    });
});
