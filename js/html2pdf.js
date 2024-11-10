async function save1(elemento,filename){

    const btnsalvar = document.querySelector("#btnsalvar")
    
    const options = {
        margin: [10,10,10,10],
        filename: filename+".pdf",
        image: { type: 'png', quality: 1 },
        html2canvas: { scale: 1 },  
        jsPDF: {
            unit:'mm',
            format:'a4' ,
            orientation:'landscape',
        }
    }
    html2pdf().set(options).from(elemento).save()
}
document.getElementById("save1").addEventListener("click", function(){
    const elemento = document.getElementById("table")
    save1(elemento, "Relatório Atual do Clima")
})