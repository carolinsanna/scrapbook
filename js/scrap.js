var scrapList = [];
var obj;
var objTitle;
var objAuthor;

function nextId(list){
    var theLastOne = 0;
    for (var index = 0; index < list.length; index++){
        theLastOne = Math.max(theLastOne, list[index].id);
    }
    theLastOne++;
    return theLastOne;
}

function adicionaRecado() {
    var message = obj.value;
    var title = objTitle.value;
    var author = objAuthor.value;

    /*var index = scrapList.findIndex(scrap => scrap.item.toLowerCase() === message.toLowerCase());

    if(index >= 0){
        alert("Já existe");
        return;
    }*/

    if (message === "") {
        alert("Insira uma mensagem!");
        return;
    }

    if (title === "") {
        alert("Insira um título!");
        return;
    }

    if (author === "") {
        alert("Quem irá executar a tarefa?");
        return;
    }

    message = message.replaceAll("'", "");

    scrapList.push({
        item: message,
        tit: title,
        who: author,
        id: nextId(scrapList)
    });

    obj.value = "";
    objTitle.value = "";
    objAuthor.value = "";
    obj.focus();

    mostraRecado(scrapList);
    saveData(scrapList);

    var divAlert = document.getElementById("alerta");
    divAlert.style.display = "block";

    setTimeout(function () {
        divAlert.style.display = "none";
    }, 3000);

}

function saveData(list) {
    localStorage.setItem("safe", JSON.stringify(list));
}

window.addEventListener('load', function () {
    loadData();
    obj = document.getElementById('recado');
    objTitle = document.getElementById('title');
    objAuthor = document.getElementById('author');

    var botao = document.getElementById('enviar');
    botao.addEventListener('click', function () {
        adicionaRecado();
    });

    var divAlert = document.getElementById("alerta");
    divAlert.style.display = "none";

    var divAlert = document.getElementById("alerta-apagar");
    divAlert.style.display = "none";

    var divAlert = document.getElementById("alerta-editar");
    divAlert.style.display = "none";

    obj.addEventListener('keypress', function (ev) {
        if (ev.key === "Enter") {
            ev.preventDefault();
            adicionaRecado();
        }
    });
});

function loadData() {
    var saveList = localStorage.getItem('safe');
    if (saveList !== null) {
        scrapList = JSON.parse(saveList);
    } else {
        scrapList = [];
    }
    mostraRecado(scrapList);
}

function mostraRecado(list) {
    var scrap = document.getElementById('scraps');
    var novoHTML = "";
    var newList = list.slice(0, list.length);

    newList.reverse();

    for (var scr of newList) {
        novoHTML += `
                <div class="col-md-4">
                    <div class="card mb-3 text-center">
                        <div class="card-body">
                            <h5 class="card-title">${scr.tit}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${scr.who}</h6>
                            <p class="card-text">${scr.item}</p>
                            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="editar(${scr.id})">Editar</button>
                            <button type="button" class="btn btn-danger" onclick = "apagar(${scr.id})">Apagar</button>
                            
                        </div>
                    </div>
                </div>
        `;
    }

    scrap.innerHTML = novoHTML;
}

function editar(conteudo) {
    var index = scrapList.findIndex(f => f.id === conteudo);
    var card = scrapList[index];

    document.getElementById("code").value = card.id;
    document.getElementById("title-edited").value = card.tit;
    document.getElementById("author-edited").value = card.who;document.getElementById("recado-edited").value = card.item;    
}

function salvarEdicao(){
    var id = document.getElementById("code").value;
    var index = scrapList.findIndex(f => f.id === parseInt(id));

    scrapList[index].item = document.getElementById("recado-edited").value;
    scrapList[index].tit = document.getElementById("title-edited").value;
    scrapList[index].who = document.getElementById("author-edited").value;

    mostraRecado(scrapList);
    saveData(scrapList);

    var divAlert = document.getElementById("alerta-editar");
    divAlert.style.display = "block";

    setTimeout(function () {
        divAlert.style.display = "none";
    }, 3000);    
}

function apagar(conteudo) {
    var index = scrapList.findIndex(f => f.id === conteudo);
    if (index < 0) {
        return;
    }

    if (!confirm(`Deseja excluir?`)) {
        return;
    }

    scrapList.splice(index, 1);

    mostraRecado(scrapList);
    saveData(scrapList);

    var divAlert = document.getElementById("alerta-apagar");
    divAlert.style.display = "block";

    setTimeout(function () {
        divAlert.style.display = "none";
    }, 3000);
}