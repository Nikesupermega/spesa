let indiceModifica = null;

const form = document.getElementById("form");
const lista = document.getElementById("lista");
const cerca = document.getElementById("cerca");

let contatti = JSON.parse(localStorage.getItem("contatti")) || [];

mostra();

form.addEventListener("submit", e => {
  e.preventDefault();

  if (indiceModifica === null) {
    // AGGIUNGI
    contatti.push({
      nome: nome.value,
      cognome: cognome.value,
      telefono: telefono.value
    });
  } else {
    // MODIFICA
    contatti[indiceModifica].nome = nome.value;
    contatti[indiceModifica].cognome = cognome.value;
    contatti[indiceModifica].telefono = telefono.value;

    indiceModifica = null; // Reset per tornare alla modalità "aggiungi"
  }

  // Salva i dati nel localStorage
  localStorage.setItem("contatti", JSON.stringify(contatti));
  form.reset(); // Resetta i campi del form
  mostra(); // Rende visibile la lista aggiornata
});

function mostra() {
  lista.innerHTML = "";  // Pulisce la lista esistente
  contatti.forEach((c, i) => {
    lista.innerHTML += `
      <li class="li">
        <a class="a" href="pagina-dettagli.html?id=${i}"> ${c.nome} ${c.cognome} </a> - ${c.telefono}
        <button class="canc" onclick="cancella(${i})">❌</button>
        <button class="mod" onclick="modifica(${i})">✏️</button>
        <button class="dup" onclick="duplica(${i})">📄</button>
      </li>
    `;
  });
}


cerca.addEventListener("input", () => {
  const testo = cerca.value.toLowerCase();
  lista.innerHTML = "";

  contatti.forEach((c, i) => {
    const completo = `${c.nome} ${c.cognome} ${c.telefono}`.toLowerCase();

    if (completo.includes(testo)) {
      lista.innerHTML += `
        <li>
          <a class="a" href="pagina-dettagli.html?id=${i}"> ${c.nome} ${c.cognome} </a> - ${c.telefono}
          <button class="canc" onclick="cancella(${i})">❌</button>
          <button class="mod" onclick="modifica(${i})">✏️</button>
          <button class="dup" onclick="duplica(${i})">📄</button>
        </li>
      `;
    }
  });
});

function modifica(i) {
  indiceModifica = i; // Imposta l'indice del contatto da modificare

  // Riempie il form con i dati del contatto da modificare
  nome.value = contatti[i].nome;
  cognome.value = contatti[i].cognome;
  telefono.value = contatti[i].telefono;
}

function cancella(i) {
  contatti.splice(i, 1); // Rimuove il contatto dall'array
  localStorage.setItem("contatti", JSON.stringify(contatti)); // Aggiorna il localStorage
  mostra(); // Mostra la lista aggiornata
}

function duplica(i) {
  contatti.push({
    nome: contatti[i].nome,
    cognome: contatti[i].cognome,
    telefono: contatti[i].telefono
  });
  localStorage.setItem("contatti", JSON.stringify(contatti)); // Aggiorna il localStorage
  mostra(); // Mostra la lista aggiornata
}
