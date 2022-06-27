let pratoSelecionado = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;

class Produto {
  constructor({ nome, imagem, descricao, preco }) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
  }
}

class View {
  constructor(tipo) {
    this.tipo = tipo;
  }

  display(produto) {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionar(view, produto.nome, produto.preco);
    });
    view.innerHTML = `
          <img src="${produto.imagem}" />
          <div class="titulo">${produto.nome}</div>
          <div class="descricao">${produto.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }

  selecionar(elemento, nome, preco) {
    const selecionado = document.querySelector(`.${this.tipo} .selecionado`);
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    console.log(this.tipo);

    if (this.tipo === "prato") {
      pratoSelecionado = {
        nome,
        preco,
      };
    } else if (this.tipo === "bebida") {
      bebidaSelecionada = {
        nome,
        preco,
      };
    } else {
      sobremesaSelecionada = {
        nome,
        preco,
      };
    }

    verificarPedido();
  }
}

const pratos = [
  new Produto({
    nome: "Coisa de jaca",
    imagem: "img/frango_yin_yang.png",
    descricao: "Um pouco de batata, um pouco de salada",
    preco: 14.9,
  }),
  new Produto({
    nome: "Asa de Boi",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com molho shoyu",
    preco: 14.9,
  }),
  new Produto({
    nome: "Carne de Monstro",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com batata assada e farofa",
    preco: 14.9,
  }),
];

const bebidas = [
  new Produto({
    nome: "Coquinha gelada",
    imagem: "img/coquinha_gelada.png",
    descricao: "Lata 350ml",
    preco: 4.9,
  }),
  new Produto({
    nome: "Caldo de Cana",
    imagem: "img/coquinha_gelada.png",
    descricao: "Copo 600ml",
    preco: 4.9,
  }),
  new Produto({
    nome: "Corote Gelado",
    imagem: "img/coquinha_gelada.png",
    descricao: "Garrafa 400ml",
    preco: 4.9,
  }),
];

const sobremesas = [
  new Produto({
    nome: "Pudim",
    imagem: "img/pudim.png",
    descricao: "Gosto de doce de leite",
    preco: 7.9,
  }),
  new Produto({
    nome: "Flam",
    imagem: "img/pudim.png",
    descricao: "Gosto de chocolate",
    preco: 7.9,
  }),
  new Produto({
    nome: "Brigadeiro",
    imagem: "img/pudim.png",
    descricao: "3 unidades",
    preco: 7.9,
  }),
];

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

function getPrecoTotal() {
  return (
    pratoSelecionado.preco +
    bebidaSelecionada.preco +
    sobremesaSelecionada.preco
  );
}

function confirmarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.remove("escondido");

  document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
    pratoSelecionado.nome;
  document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
    pratoSelecionado.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
    bebidaSelecionada.nome;
  document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
    bebidaSelecionada.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
    sobremesaSelecionada.nome;
  document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
    sobremesaSelecionada.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .total .preco").innerHTML =
    getPrecoTotal().toFixed(2);
}

function cancelarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.add("escondido");
}

function enviarZap() {
  const telefoneRestaurante = 553299999999;
  const encodedText = encodeURIComponent(
    `Olá, gostaria de fazer o pedido: \n- Prato: ${
      pratoSelecionado.nome
    } \n- Bebida: ${bebidaSelecionada.nome} \n- Sobremesa: ${
      sobremesaSelecionada.nome
    } \nTotal: R$ ${getPrecoTotal().toFixed(2)}`
  );

  const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
  window.open(urlWhatsapp);
}

function verificarPedido() {
  console.log(pratoSelecionado);
  console.log(bebidaSelecionada);
  console.log(sobremesaSelecionada);

  if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
    btnPedir.classList.add("ativo");
    btnPedir.disabled = false;
    btnPedir.innerHTML = "Fazer pedido";
  }
}

const pratosContainer = document.querySelector(".opcoes.prato");
const pratoView = new View("prato");
pratos.forEach((prato) =>
  pratosContainer.appendChild(pratoView.display(prato))
);

const bebidasContainer = document.querySelector(".opcoes.bebida");
const bebidaView = new View("bebida");
bebidas.forEach((bebida) =>
  bebidasContainer.appendChild(bebidaView.display(bebida))
);

const sobremesasContainer = document.querySelector(".opcoes.sobremesa");
const sobremesaView = new View("sobremesa");

sobremesas.forEach((sobremesa) =>
  sobremesasContainer.appendChild(sobremesaView.display(sobremesa))
);

btnConfirmar.addEventListener("click", () => {
  enviarZap();
});

btnCancelar.addEventListener("click", () => {
  cancelarPedido();
});

btnPedir.addEventListener("click", () => {
  confirmarPedido();
});
