const selectUf = document.getElementById("estados")
const selectDate = document.getElementById("data")

document.addEventListener('DOMContentLoaded', () => {

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            if (!response.ok) throw new Error('Erro');

            return response.json();
        })
        .then(data => {

            data.sort((a, b) => a.nome.localeCompare(b.nome))

            data.forEach(uf => {
                const optUf = document.createElement('option');
                optUf.textContent = uf.nome;
                optUf.value = uf.sigla;

                selectUf.appendChild(optUf);
            });
        });

    selectDate.value = (new Date()).toLocaleDateString("pt-BR");
}) 


