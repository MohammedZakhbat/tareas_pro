const taches = [
  {
    titulo: "Diseño UI",
    importancia: "Urgente",
    estado: "En curso"
  },
  {
    titulo: "Documentación API",
    importancia: "Normal",
    estado: "Terminada"
  },
  {
    titulo: "Corrección de bugs",
    importancia: "Urgente",
    estado: "En espera"
  },
  {
    titulo: "Pruebas Frontend",
    importancia: "Normal",
    estado: "En curso"
  }
];

const container = document.getElementById("tasksContainer");

function renderTasks() {
  container.innerHTML = "";

  taches.forEach((tache, index) => {
    container.innerHTML += `
      <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div class="flex justify-between mb-5">
          <h3 class="text-xl font-bold">${tache.titulo}</h3>

          <span class="
            px-3 py-1 rounded-full text-xs font-bold
            ${
              tache.importancia === "Urgente"
                ? "bg-red-500/20 text-red-300"
                : "bg-emerald-500/20 text-emerald-300"
            }
          ">
            ${tache.importancia}
          </span>
        </div>

        <p class="text-slate-300">
          Estado : ${tache.estado}
        </p>

        <p class="text-slate-500 mt-2">
          Position : ${index + 1}
        </p>
      </div>
    `;
  });
}

renderTasks();

function chercherTache() {
  const valeur = document.getElementById("searchInput").value.trim().toLowerCase();

  if (!valeur) {
    alert("Escribe algo");
    return;
  }

  const indexNumerique = Number(valeur);
  const isIndex = Number.isInteger(indexNumerique) && indexNumerique > 0;

  let resultatFind = null;
  let resultatFilter = [];
  let resultatIndex = -1;

  
  if (isIndex && taches[indexNumerique - 1]) {
    const tache = taches[indexNumerique - 1];

    resultatFind = tache;
    resultatFilter = [tache];
    resultatIndex = indexNumerique - 1;

  } else {


    resultatFilter = taches.filter(t =>
      t.titulo.toLowerCase().includes(valeur) ||
      t.importancia.toLowerCase().includes(valeur) ||
      t.estado.toLowerCase().includes(valeur)
    );

    resultatFind = resultatFilter[0] || null;

    resultatIndex = taches.findIndex(t =>
      t.titulo.toLowerCase().includes(valeur) ||
      t.importancia.toLowerCase().includes(valeur) ||
      t.estado.toLowerCase().includes(valeur)
    );
  }

 
  document.getElementById("findResult").innerHTML = "";
  document.getElementById("filterResult").innerHTML = "";
  document.getElementById("indexResult").innerHTML = "";

  document.getElementById("findResult").innerHTML = resultatFind
    ? `<div class="bg-white/5 border border-cyan-400/20 rounded-xl p-4">
        <p><span class="text-cyan-300 font-bold">Tarea :</span> ${resultatFind.titulo}</p>
      </div>`
    : `<p class="text-red-300">Sin resultados</p>`;

  if (resultatFilter.length > 0) {
    resultatFilter.forEach((tache) => {
      const index = taches.indexOf(tache);

      document.getElementById("filterResult").innerHTML += `
        <div class="bg-white/5 border border-emerald-400/20 rounded-xl p-4 space-y-2">
          <p><span class="text-emerald-300 font-bold">Posición :</span> ${index + 1}</p>
          <p><span class="text-emerald-300 font-bold">Tarea :</span> ${tache.titulo}</p>
          <p><span class="text-emerald-300 font-bold">Importancia :</span> ${tache.importancia}</p>
          <p><span class="text-emerald-300 font-bold">Estado :</span> ${tache.estado}</p>
        </div>
      `;
    });
  } else {
    document.getElementById("filterResult").innerHTML =
      `<p class="text-red-300">Aucun résultat</p>`;
  }


  document.getElementById("indexResult").innerHTML =
    resultatIndex !== -1
      ? `<div class="bg-white/5 border border-pink-400/20 rounded-xl p-4">
          <p><span class="text-pink-300 font-bold">Position :</span> ${resultatIndex + 1}</p>
        </div>`
      : `<p class="text-red-300">Sin resultados</p>`;
}