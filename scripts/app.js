// Parcours en largeur :
function parcoursLargeur(G, d) {
  var fileSommets = [];
  var visiter = [d];

  while (visiter.length !== 0) {
    var s = visiter.shift();
    if (fileSommets.includes(s)) {
      continue;
    }
    fileSommets.push(s);
    var voisins = G[s];

    if (voisins) {
        for (var v in voisins) {
          if (!fileSommets.includes(v) && !visiter.includes(v)) {
            visiter.push(v);
          }
        }
      }
    }
  return fileSommets;
}

// Parcours en profondeur:
function parcoursProfondeur(G, d, pileSommets) {
  pileSommets.push(d);
  let voisins = G[d];
  for (var i = 0; i < voisins.length; i++) {
    let v = voisins[i];
    if (!pileSommets.includes(v)) {
      parcoursProfondeur(G, v, pileSommets);
    }
  }
}

//  Algorithme de coloriage glouton
function coloriageGlouton(graph) {
  const sommets = Object.keys(graph);
  const resultat = {};

  for (const sommet of sommets) {
    const attribue = new Set();

    for (const voisin in graph[sommet]) {
      if (resultat[voisin]) {
        attribue.add(resultat[voisin]);
      }
    }
    let coleur = 1;
    while (attribue.has(coleur)) {
      coleur++;
    }
    resultat[sommet] = coleur;
  }

  return resultat;
}

// Algorithme de Welsh-Powell pour colorier un graphe
function welshPowell(graph) {
  const nomSommets = Object.keys(graph);
  const sommetColore = {};
  const degreeSommet = {};

  for (const sommet of nomSommets) {
    sommetColore[sommet] = false;
    degreeSommet[sommet] = Object.keys(graph[sommet]).length;
  }
  let compteur = 0;
  const resultatColoriage = {};

  function colorer(sommet) {
    compteur++;
    let grande = "";
    let degreeTemp = 0;

    for (const sommet of nomSommets) {
      if (!sommetColore[sommet]) {
        if (degreeTemp < degreeSommet[sommet]) {
          degreeTemp = degreeSommet[sommet];
          grande = sommet;
        }
      }
    }

    let coleur = 1;
    const voisinsColores = [];
    for (const voisin of nomSommets) {
      if (graph[grande][voisin]) {
        if (resultatColoriage[voisin]) {
          voisinsColores.push(resultatColoriage[voisin]);
        }
      }
    }

    while (voisinsColores.includes(coleur)) {
      coleur++;
    }

    resultatColoriage[grande] = coleur;
    sommetColore[grande] = true;
    if (Object.values(sommetColore).every((i) => i)) {
      return resultatColoriage;
    }
    return colorer(sommet);
  }

  return colorer(nomSommets[0]);
}

// Algorithme de Prim
function prim(graph, debutSommet) {
  var visiter = [];
  visiter.push(debutSommet);
  var arbre = [];

  while (visiter.length !== Object.keys(graph).length) {
    var minPoids = Infinity;
    var minSommet = null;
    var minArete = null;

    for (var i = 0; i < visiter.length; i++) {
      if (graph[visiter[i]]) {
        var voisins = graph[visiter[i]];
        for (var voisin in voisins) {
          if (!visiter.includes(voisin) && voisins[voisin] < minPoids) {
            minPoids = voisins[voisin];
            minSommet = voisin;
            minArete = { de: visiter[i], vers: minSommet, poids: minPoids };
          }
        }
      }
    }
    visiter.push(minSommet);
    arbre.push(minArete);
  }

  return arbre;
}

// Algorithme de Kruskal
function trouver(parent, x) {
  if (parent[x] === undefined) {
    parent[x] = x;
  } else if (parent[x] !== x) {
    parent[x] = trouver(parent, parent[x]);
  }
  return parent[x];
}

function union(parent, x, y) {
  var racineX = trouver(parent, x);
  var racineY = trouver(parent, y);
  if (racineX !== racineY) {
    parent[racineX] = racineY;
  }
}

function kruskal(graph) {
  var aretes = [];
  var result = [];
  var parent = {};

  for (var u in graph) {
    for (var v in graph[u]) {
      aretes.push({
        u: u,
        v: v,
        poids: graph[u][v]
      });
    }
  }

  aretes.sort(function (a, b) {
    return a.poids - b.poids;
  });

  for (var i = 0; i < aretes.length; i++) {
    var arete = aretes[i];
    var u = arete.u;
    var v = arete.v;

    // Vérifier si l'ajout de l'arête crée un cycle
    if (tu.trouver(u) !== tu.trouver(v)) {
      // Ajouter l'arête à l'arbre couvrant minimal
      result.push(arete);
      union(parent, u, v);
    }
  }
  return result;
}

// Algorithme de Bellman-Ford
// Algorithme de Bellman-Ford
function bellmanFord(graph, debutSommet) {
  let sommets = Object.keys(graph).length;
  let distances = {};
  let predecesseurs = {};

  for (let sommet in graph) {
    distances[sommet] = Number.MAX_VALUE;
    predecesseurs[sommet] = null;
  }
  distances[debutSommet] = 0;

  for (let i = 0; i < sommets - 1; i++) {
    for (let sommet in graph) {
      for (let voisin in graph[sommet]) {
        let poids = graph[sommet][voisin];
        if (
          distances[sommet] !== Number.MAX_VALUE &&
          distances[sommet] + poids < distances[voisin]
        ) {
          distances[voisin] = distances[sommet] + poids;
          predecesseurs[voisin] = sommet;
        }
      }
    }
  }

  for (let sommet in graph) {
    for (let voisin in graph[sommet]) {
      let poids = graph[sommet][voisin];
      if (
        distances[sommet] !== Number.MAX_VALUE &&
        distances[sommet] + poids < distances[voisin]
      ) {
        console.log("Le graphe contient un cycle de poids négatif");
        return;
      }
    }
  }
  return {
    distances: distances,
    predecesseurs: predecesseurs,
  };
}

// Algorithme de Dijkstra
function dijkstra(graph, source) {
  const sommets = Object.keys(graph);
  const distances = {};
  const predecesseurs = {};

  sommets.forEach((sommet) => {
    distances[sommet] = Infinity;
    predecesseurs[sommet] = null;
  });
  distances[source] = 0;

  const nonviste = new Set(sommets);

  while (nonviste.size > 0) {
    let minDistanceSommet = null;
    for (let sommet of nonviste) {
      if (
        minDistanceSommet === null ||
        distances[sommet] < distances[minDistanceSommet]
      ) {
        minDistanceSommet = sommet;
      }
    }

    nonviste.delete(minDistanceSommet);

    for (let voisin in graph[minDistanceSommet]) {
      const poids = graph[minDistanceSommet][voisin];
      const totalDistance = distances[minDistanceSommet] + poids;

      if (totalDistance < distances[voisin]) {
        distances[voisin] = totalDistance;
        predecesseurs[voisin] = minDistanceSommet;
      }
    }
  }

  return {
    distances: distances,
    predecesseurs: predecesseurs,
  };
}

function createResultList(resultContainer, resultTitle, result) {
  var resultHeading = document.createElement("h2");
  resultHeading.textContent = resultTitle;
  resultContainer.appendChild(resultHeading);

  var resultList = document.createElement("ul");
  result.forEach(function (sommet, index) {
    var listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${sommet}`;
    resultList.appendChild(listItem);
  });
  resultContainer.appendChild(resultList);
}

function processGraph() {
  var graphInput = document.getElementById("graphInput");
  var graphText = graphInput.value.trim();

  if (graphText.length === 0) {
    alert("Veuillez saisir un graphe.");
    return;
  }

  var graph;
  try {
    graph = JSON.parse(graphText);
    console.log(graph);
  } catch (error) {
    alert("Format de graphe invalide. Veuillez saisir un objet JSON valide.");
    return;
  }

  var algorithmSelect = document.getElementById("algorithmSelect");
  var selectedAlgorithm = algorithmSelect.value;

  var resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  if (selectedAlgorithm === "parcoursLargeur") {
    var debutSommet = prompt(
      "Veuillez saisir le sommet de départ pour le parcours en largeur :"
    );
    var result = parcoursLargeur(graph, debutSommet);
    createResultList(
      resultContainer,
      "Résultat du parcours en largeur :",
      result
    );
  } 
  else if (selectedAlgorithm === "parcoursProfondeur") {
    var debutSommet = prompt(
      "Veuillez saisir le sommet de départ pour le parcours en profondeur :"
    );
    var pileSommets = [];
    parcoursProfondeur(graph, debutSommet, pileSommets);
    createResultList(
      resultContainer,
      "Résultat du parcours en profondeur :",
      pileSommets
    );
  } 
  else if (selectedAlgorithm === "coloriageGlouton") {
    const resultatColoriage = coloriageGlouton(graph);
    createResultList(
      resultContainer,
      "Le résultat de coloriage Glouton :",
      Object.entries(resultatColoriage).map(
        (entry) => `${entry[0]} - ${entry[1]}`
      )
    );
  } 
  else if (selectedAlgorithm === "welshPowell") {
    const resultatColoriage = welshPowell(graph);
    createResultList(
      resultContainer,
      "Le résultat de coloriage avec Welsh-Powell :",
      Object.entries(resultatColoriage).map(
        (entry) => `${entry[0]} - ${entry[1]}`
      )
    );
  } 
  else if (selectedAlgorithm === "prim") {
    var debutSommet = prompt(
      "Veuillez saisir le sommet de départ pour l'algorithme de Prim :"
    );
    var result = prim(graph, debutSommet);
    createResultList(
      resultContainer,
      "Arbre couvrant minimal trouvé avec l'algorithme de Prim :",
      result.map(
        (arete) => `${arete.de} -> ${arete.vers} (Poids : ${arete.poids})`
      )
    );
  } 
  else if (selectedAlgorithm === "kruskal") {
    var result = kruskal(graph);
    createResultList(
      resultContainer,
      "Arbre couvrant minimal trouvé avec l'algorithme de Kruskal :",
      result.map((arete) => `${arete.u} -> ${arete.v} (Poids : ${arete.poids})`)
    );
  } 
  else if (selectedAlgorithm === "bellmanFord") {
    var debutSommet = prompt(
      "Veuillez saisir le sommet de départ pour l'algorithme de Bellman-Ford :"
    );
    try {
      var result = bellmanFord(graph, debutSommet);
      var distances = result.distances;
      var predecesseurs = result.predecesseurs;

      var distancesList = Object.entries(distances).map(
        ([sommet, distance]) => `${sommet}: ${distance}`
      );
      var predecesseursList = Object.entries(predecesseurs).map(
        ([sommet, predecessor]) => `${sommet}: ${predecessor || "-"}`
      );

      createResultList(
        resultContainer,
        "Distances depuis la sommet de départ :",
        distancesList
      );
      createResultList(
        resultContainer,
        "Les sommets prédécesseur :",
        predecesseursList
      );
    } catch (error) {
      alert(error.message);
    }
  } else if (selectedAlgorithm === "dijkstra") {
    var debutSommet = prompt(
      "Veuillez saisir le sommet de départ pour l'algorithme de Dijkstra :"
    );
    try {
      var result = dijkstra(graph, debutSommet);
      var distances = result.distances;
      var predecesseurs = result.predecesseurs;

      var distancesList = Object.entries(distances).map(
        ([sommet, distance]) => `${sommet}: ${distance}`
      );
      var predecesseursList = Object.entries(predecesseurs).map(
        ([sommet, predecessor]) => `${sommet}: ${predecessor || "-"}`
      );

      createResultList(
        resultContainer,
        "Distances depuis le sommet de départ :",
        distancesList
      );
      createResultList(
        resultContainer,
        "Prédécesseurs des sommets :",
        predecesseursList
      );
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("Algorithme sélectionné non pris en charge.");
  }
}

function voirExemple() {
  document.getElementById("popup1").classList.toggle("active");
}
