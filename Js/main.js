function searchAPI(div, id = 5){
    var dados = document.querySelectorAll("select");
    var string = '';
    var options = ['marcas', 'modelos', 'anos', ''];
    var validador = true;
    
    resetResults(id);

    for(i = 0; i < dados.length; i++){
        if(!dados[i].parentElement.hasAttribute('hidden')){
            if(dados[i].value != ""){
                string += "/"+dados[i].value+"/"+options[i];
            }
            else{
                validador = false;
                alert("Não foi preenchido o campo:  "+ dados[i].getAttribute('name'));
                break;
            }
        }
    }

    if(validador){
        const url = `https://parallelum.com.br/fipe/api/v1${string}`;
        fetch(url, {method : "GET", }).then((resp) => resp.json()).then((data) => {showResults(data, div, id);});
    }
}

function resetResults(id){
    var resultados = document.querySelector('.detalhes_div');

    for(i = id; i <= 4; i++){
        var item = document.querySelector('.div_'+i);
        item.innerHTML = '<option value="" selected disabled style="display: none;"> </option>';
        item.parentElement.setAttribute('hidden', 'hidden');
    }
    
    for(i = 0; i <  resultados.childElementCount; i++){
        resultados.children[i].innerHTML = '';
    }
}

function showResults(data, element){
    if(data.error){
        alert("Erro da pesquisa: "+data.error);
    }
    
    else{
        document.querySelector('.'+element+'_div').removeAttribute('hidden');
        var tipo = document.querySelector('.'+element+'_select');
    
        if(element == 'marca' || element == 'ano'){
            for(i = 0; i < data.length; i++){
                tipo.innerHTML += '<option value="'+data[i].codigo+'">'+data[i].nome+'</option>';
            }
        }
    
        if(element == 'modelo'){
            for(i = 0; i < data.modelos.length; i++){
                tipo.innerHTML += '<option value="'+data.modelos[i].codigo+'">'+data.modelos[i].nome+'</option>';
            }
        }
    
        if(element == 'detalhes'){
            document.querySelector('.detalhes_valor').innerHTML = data.Valor;
            document.querySelector('.detalhes_combustivel').innerHTML = data.Combustivel + data.SiglaCombustivel;
            document.querySelector('.detalhes_fipe').innerHTML = data.CodigoFipe;
            document.querySelector('.detalhes_mes').innerHTML = data.MesReferencia;
        }
    }
}