var scrapList = [];
var obj;
var objTitle;
var objAuthor;


function adicionaRecado(){
    var message = obj.value;
    var title = objTitle.value;
    var author = objAuthor.value;

    /*var index = scrapList.findIndex(scrap => scrap.item.toLowerCase() === message.toLowerCase());

    if(index >= 0){
        alert("Já existe");
        return;
    }*/

    if(message === ""){
        alert("Insira uma mensagem!");
        return;
    }
    
    if(title === ""){
        alert("Insira um título!");
        return;
    }

    message = message.replaceAll("'", "");
        
    scrapList.push({
        item: message,
        tit: title,
        who: author
    });

    obj.value = "";
    objTitle.value = "";
    objAuthor.value = "";
    obj.focus();

    mostraRecado(scrapList);
    saveData(scrapList);

    var divAlert = document.getElementById("alerta");
    divAlert.style.display = "block";

    setTimeout(function() {
        divAlert.style.display = "none";
    }, 3000);

}

function saveData(list){
    localStorage.setItem("id", JSON.stringify(list));
}

window.addEventListener('load', function(){
    loadData();
    obj = document.getElementById('recado');
    objTitle = document.getElementById('title');
    objAuthor = document.getElementById('author');

    var botao = document.getElementById('enviar');
    botao.addEventListener('click', function(){
        adicionaRecado();
    });
    
    var divAlert = document.getElementById("alerta");
    divAlert.style.display = "none";

    var divAlert = document.getElementById("alerta-apagar");
    divAlert.style.display = "none";

    obj.addEventListener('keypress', function(ev){
        if(ev.key === "Enter"){
            ev.preventDefault();
            adicionaRecado();
        }
    });
});



function loadData(){
    var saveList = localStorage.getItem('id');
    if(saveList !== null){
        scrapList = JSON.parse(saveList);
    } else {
        scrapList = [];
    }
    mostraRecado(scrapList);
}

function mostraRecado(list){
    var scrap = document.getElementById('scraps');
    
    var novoHTML = "";

    for (var scr of list){
        novoHTML += `
                <div class="col-md-4">
                    <div class="card mb-3 text-center">
                        <div class="card-body">
                            <h5 class="card-title">${scr.tit}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${scr.who}</h6>
                            <p class="card-text">${scr.item}</p>
                            <button type="button" class="btn btn-danger" onclick = "apagar('${scr.item}')">Apagar</button>
                        </div>
                    </div>
                </div>
        `;
    }

    scrap.innerHTML = novoHTML;
}

function apagar(conteudo){
    var index = scrapList.findIndex(f => f.item === conteudo);
    if(index < 0){
        return;
    }

    if(!confirm(`Deseja excluir?`)){
        return;
    }

    scrapList.splice(index, 1);

    mostraRecado(scrapList);
    saveData(scrapList);

    var divAlert = document.getElementById("alerta-apagar");
    divAlert.style.display = "block";

    setTimeout(function() {
        divAlert.style.display = "none";
    }, 3000);
}