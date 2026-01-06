let listaSpesa = [];

function aggiungi() {
  const input = document.getElementById("prodotto");
  const qtaInput = document.getElementById("quantita");

  const nome = input.value.trim();
  const qty = parseInt(qtaInput.value);

  if (nome === "" || qty < 1) return;

  listaSpesa.push({ nome, qty });

  salva();
  mostraLista();

  input.value = "";
  qtaInput.value = 1;
}

function mostraLista() {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";

  listaSpesa.forEach((item, index) => {
    const li = document.createElement("li");

    const testo = document.createElement("span");
    testo.textContent = `${item.nome} x${item.qty}`;
    testo.className = "item-text";

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => rimuovi(index);

    li.appendChild(testo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function rimuovi(index) {
  listaSpesa.splice(index, 1);
  salva();
  mostraLista();
}

function salva() {
  localStorage.setItem("listaSpesa", JSON.stringify(listaSpesa));
}

function carica() {
  const dati = localStorage.getItem("listaSpesa");
  if (dati) listaSpesa = JSON.parse(dati);
  mostraLista();
}

carica();