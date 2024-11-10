const selectEstado = document.getElementById("estados")
const selectCidade = document.getElementById("cidades")

function loadCity() {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectEstado.value}/municipios`)
        .then( response => {
           if (!response.ok) alert("Error")
           return response.json()
        })
        .then( data => {
            data.sort((a, b) => a.nome.localeCompare(b.nome))
            while(selectCidade.firstChild) { 
                selectCidade.removeChild(selectCidade.firstChild)
            }
            data.forEach(cidade => {
                const option = document.createElement("option")

                option.textContent = cidade.nome
                option.value = cidade.nome
                selectCidade.appendChild(option)
            })
        })
}

