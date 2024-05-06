function searchAPI(div, id = 5){
    var dados = document.querySelectorAll("select");
    var string = ''
    var options = ['marcas', 'modelos', 'anos', '']
    var validador = true
    
    for(i = id; i <= 4; i++){
        var item = document.querySelector('.div_'+i)
        item.innerHTML = '<option value="" selected disabled style="display: none;"> </option>'
        item.parentElement.setAttribute('hidden', 'hidden')
    }

    for(i = 0; i < dados.length; i++){
        if(!dados[i].parentElement.hasAttribute('hidden')){
            if(dados[i].value != ""){
                string += "/"+dados[i].value+"/"+options[i]
            }
            else{
                validador = false
                alert("Algum campo não foi o campo "+ dados[i].getAttribute('name'))
                break
            }
        }
    }

    if(validador){
        const url = `https://parallelum.com.br/fipe/api/v1${string}`;
        fetch(url, {method : "GET", }).then((resp) => resp.json()).then((data) => {showResults(data, div, id);})
    }
}

function showResults(data, element){
    if(data.error){
        alert("Erro da pesquisa: "+data.error)
    }
    
    else{
        var div = document.querySelector('.'+element+'_div')
        var tipo = document.querySelector('.'+element+'_select');
    
        div.removeAttribute('hidden')
    
        if(element == 'marca' || element == 'ano'){
            for(i = 0; i < data.length; i++){
                tipo.innerHTML += '<option value="'+data[i].codigo+'">'+data[i].nome+'</option>'
            }
        }
    
        if(element == 'modelo'){
            for(i = 0; i < data.modelos.length; i++){
                tipo.innerHTML += '<option value="'+data.modelos[i].codigo+'">'+data.modelos[i].nome+'</option>'
            }
        }
    
        if(element == 'detalhes'){
            var valor = document.querySelector('.detalhes_valor')
            var combustivel = document.querySelector('.detalhes_combustivel')
            var fipe = document.querySelector('.detalhes_fipe')
            var mes = document.querySelector('.detalhes_mes')
    
            valor.innerHTML = data.Valor
            combustivel.innerHTML = data.Combustivel
            combustivel.innerHTML += data.SiglaCombustivel
            fipe.innerHTML = data.CodigoFipe
            mes.innerHTML = data.MesReferencia
        }
    }
}