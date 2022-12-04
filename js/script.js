function buscarEstado(dadoCep) {}

let listaCeps = []

function limparCampos() {
  document.getElementById("txtCep").value = ""
}

function addEndereco(cep) {
  const novoEndereco = document.getElementById("txtCep").value

  listaCeps.push(cep)
  renderizarEnderecos()
  limparCampos()
}

function removerTarefa(id) {
  listaCeps = listaCeps.filter((endereco) => endereco.id !== id)
  renderizarEnderecos()
}

function renderizarEnderecos() {
  let lista = document.getElementById("ListaCep")
  lista.innerHTML = ""

  listaCeps.map((endereco) => {
    let li = document.createElement("li")
    li.classList.add("my-3")
    li.innerHTML = endereco.cep
    console.log(endereco.cep)
    if(endereco.cidade === undefined){
      li.innerHTML =
      "CEP:  " + endereco.cep + "&nbsp | o CEP digitado é inválido"

    li.innerHTML += ` &nbsp &nbsp <button type="button"
                      class="btn btn-danger btn-sm"
                      onclick="removerTarefa(${endereco.id})">
                      Remover
                      </button>
                      `
    }else{
      li.innerHTML =
      "CEP:  " + endereco.cep + "&nbsp  |  Cidade:  " + endereco.cidade + "&nbsp  |  Estado:  " + endereco.estado

    li.innerHTML += ` &nbsp &nbsp <button type="button"
                      class="btn btn-danger btn-sm"
                      onclick="removerTarefa(${endereco.id})">
                      Remover
                      </button>
                      `
    }
    

    lista.appendChild(li)
  })
  let tempoTotal = document.getElementById("qtdCeps")
  tempoTotal.innerHTML = listaCeps.length
}

renderizarEnderecos()
const btnAdicionar = document.getElementById("btnAdicionar")
const txtCep = document.getElementById("txtCep")
btnAdicionar.addEventListener("click", function () {
  const tmn = document.getElementById("txtCep").value

  console.log(txtCep.length)
  if(tmn.length !== 8){
    alert("A quantidade de números digitados não corresponde ao tamanho do CEP. Por favor, tente novamente.")
  }else{
  const endereco = document.getElementById("txtCep").value
  fetch(`https://viacep.com.br/ws/${endereco}/json/`)
    .then((response) => response.json()) //
    .then((dados) => {
      addEndereco({
        id: listaCeps.length + 1,
        cep: endereco,
        estado: dados.uf,
        cidade: dados.localidade,
      })
    })
  }
})