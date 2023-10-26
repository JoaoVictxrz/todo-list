const button = document.querySelector('.add-tarefas')
const input = document.querySelector('.input-tarefas')
const listaCompleta = document.querySelector('.lista-tarefas')
const paragrafo = document.querySelector('.validate')

let listaTarefas = [] //array que vai agrupar a lista de tarefas mandadas pelo input

function adicionarTarefas(){
    
    if(!input.value){ //verifica se tem algo no input (!transforma o input vazio em false, por padrão é true, com isso não manda a função mostrarTarefas())
        alert('Digite uma tarefa!')
}else{ //se tiver conteudo dentro do input, ai sim gera uma nova tarefa
        listaTarefas.push({
        tarefa: input.value, //cria um obejeto que é somente o valor do input
        concluida: false, //seta por padrão que esse obejeto não está concluido
    }); //adicionar item na lista de tarefas    
        input.value = '' //limpa a seleção do input
        mostrarTarefas()
    } 
}
function mostrarTarefas(){ //função de mostrar a tarefa
    let novaLi = '' //cria uma varialvel vazia que será a prox tarefa
    listaTarefas.forEach((item, index) => { //pegar a tarefa dentro da array do input e adicionar na lista de tarefas
        //faz com que as novas tarefas não se agrupem e sim fiquem uma em cima da outra 
        novaLi =  novaLi + ` 
        <li class="tarefas ${item.concluida && 'done'}">
        <img src="./imgs/check.png" alt="Check" onClick="marcarConcluido(${index})">
        <p>${item.tarefa}</p>
        <img src="./imgs/trash.png" alt="Exclude" onClick="removerTarefas(${index})">
        </li>`
    })
    listaCompleta.innerHTML = novaLi //imprimi a tarefa ser realizada
    localStorage.setItem('lista', JSON.stringify(listaTarefas)) //deixar salvo os items (JSON.nome do objeto transoforma os objetos em string) Local.storage não aceita obj só string
}
function removerTarefas(index){  //remove uma tarefa //splice (posição, quantidade)
    listaTarefas.splice(index, 1) //chama novamente a crianção da lista agora sem a tarefa
    mostrarTarefas() //chama a criação de listas 
}
function marcarConcluido(index){ //Marca se a tarefa já foi executada  
    listaTarefas[index].concluida = !listaTarefas[index].concluida // faz a inversão do valor para "ativar e desativar" a tarefa concluida
    mostrarTarefas() // chama novamente a criação da lista
}
function recarregarTela(){
    const tarefasStorage =localStorage.getItem('lista')// busca no storage com geItem para trazer de volta do local storage
        if (tarefasStorage){ //quando reiniciar a pagina gerar novamente as tarefas salvas em um storage local
            listaTarefas = JSON.parse(tarefasStorage) // JSON.parse transforma novamente em objeto as listas que foram transformadas em strings
            }
            mostrarTarefas()//imprime na tela as tarefas que foram transformadas em objetos
}


recarregarTela() //chama a função por padrão para recarregar as tarefas na tela
button.addEventListener('click', adicionarTarefas)  // evento do botão
