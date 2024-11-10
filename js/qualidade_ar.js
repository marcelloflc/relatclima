const apiKey = '6a863304e63d4bf4bb4163443240711'
const cidade = document.getElementById('cidades')
const estado = document.getElementById('estados')


// Qualidade do Ar
function fetchAirQuality() {

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${setCityValue(cidade.value)}&days=1&aqi=yes&alerts=no`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const airQuality = data.current.air_quality;

                document.getElementById('co').innerText = airQuality.co;
                document.getElementById('no2').innerText = airQuality.no2;
                document.getElementById('o3').innerText = airQuality.o3;
                document.getElementById('pm25').innerText = airQuality.pm2_5;
                document.getElementById('pm10').innerText = airQuality.pm10;
                document.getElementById('so2').innerText = airQuality.so2;


                const airQualityIndex = data.current.air_quality["us-epa-index"];

                if (airQualityIndex >= 0 && airQualityIndex < 51) {
                    document.getElementById("texto-indicador").innerText = "Bom"
                } else {
                    document.getElementById("texto-indicador").innerText = "Ruim"
                }

                criarFrase(cidade.value, estado.value)

                const tbody = document.querySelector('#tbody');

                while (tbody.firstChild) tbody.removeChild(tbody.firstChild);

                const time = data.forecast.forecastday[0].hour;
                time.forEach(c => {
                    fillTable(c)
                })

            }
            else {
                console.error("Erro ao obter dados da qualidade do ar");
            }
        })
        .catch(error => {
            console.error("Erro na requisição à API: ", error);
        });



}

function formatHours(value) {
    return value < 10 ? '0' + value : value;
}

function criarFrase(cidade, estado) {
    const date = new Date();
    const dataTexto = document.getElementById("text-data")
    const horaTexto = document.getElementById("text-hora")
    const minutoTexto = document.getElementById("text-minuto")
    const cidadeTexto = document.getElementById("text-cidade")
    const estadoTexto = document.getElementById("text-estado")

    dataTexto.innerText = date.toLocaleDateString("pt-BR");
    horaTexto.innerText = formatHours(date.getHours());
    minutoTexto.innerText = formatHours(date.getMinutes());
    cidadeTexto.innerText = cidade
    estadoTexto.innerText = estado
}

function setCityValue(city) {
    const notAccent = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return notAccent.includes(' ') ? notAccent.split(' ').join('-') : notAccent;
}

//TABELA
function fillTable(c) {
    const tbody = document.querySelector('#tbody');

    const tr = document.createElement('tr');

    function addCell(content) {
        const td = document.createElement('td');
        td.textContent = content
        tr.appendChild(td);
    }

    addCell(c.time.split(' ')[1]);
    addCell(c.condition.text);
    addCell(c.chance_of_rain);
    addCell(c.temp_c);
    addCell(c.windchill_c);
    addCell(c.humidity);
    addCell(c.wind_kph);
    tbody.appendChild(tr)
}