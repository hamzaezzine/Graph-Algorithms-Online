// Parcours en largeur : 
function parcoursLargeur(G, d) {
    var visited = [];
    var to_visit = [d];
    
    while (to_visit.length !== 0) {
        var s = to_visit.shift();
        
        if (visited.includes(s)) {
            continue;
        }
        
        visited.push(s);
        
        var neighbors = G[s];
        
        if (neighbors) {
            if (Array.isArray(neighbors)) {
                for (var i = 0; i < neighbors.length; i++) {
                    var v = neighbors[i];
                    
                    if (!visited.includes(v) && !to_visit.includes(v)) {
                        to_visit.push(v);
                    }
                }
            } else {
                for (var v in neighbors) {
                    if (!visited.includes(v) && !to_visit.includes(v)) {
                        if (neighbors.hasOwnProperty(v)) {
                            to_visit.push(v);
                        }
                    }
                }
            }
        }
    }
    
    return visited;
}


// Parcours en profondeur:
function parcoursProfondeur(G, d, visited) {
    visited.push(d);
    var voisins = G[d];
    for (var i = 0; i < voisins.length; i++) {
        var v = voisins[i];
        if (!visited.includes(v)) {
            parcoursProfondeur(G, v, visited);
        }
    }
}




// Algorithme glouton de coloriage d'un graphe:
function coloriageGlouton(G) {


}

function welshPowell(G) {

}

function prim(graph, startNode) {
    var visited = [];
    visited.push(startNode);
    var tree = [];
    var edges = [];
    
    while (visited.length !== Object.keys(graph).length) {
        var minWeight = Infinity;
        var minNode = null;
        var minEdge = null;
        

        for (var i = 0; i < visited.length; i++) {
            if (graph[visited[i]]) {
                var neighbors = graph[visited[i]];
                for (var j = 0; j < neighbors.length; j++) {
                    if (visited.indexOf(neighbors[j].node) === -1 && neighbors[j].weight < minWeight) {
                        minWeight = neighbors[j].weight;
                        minNode = neighbors[j].node;
                        minEdge = {from: visited[i], to: minNode};
                    }
                }
            }
        }
    
        visited.push(minNode);
        tree.push(minEdge);
        edges.push(minEdge);
    }
    return edges;
}



function createResultList(resultContainer, resultTitle, result) {
    var resultHeading = document.createElement("h2");
    resultHeading.textContent = resultTitle;
    resultContainer.appendChild(resultHeading);

    var resultList = document.createElement("ul");
    result.forEach(function (node) {
        var listItem = document.createElement("li");
        listItem.textContent = node;
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
    } 
    catch (error) {
        alert("1.Format de graphe invalide. Veuillez saisir un objet JSON valide.");
        return;
    }

    if (typeof graph !== "object" || graph === null) {
        alert("2.Format de graphe invalide. Veuillez saisir un objet JSON valide.");
        return;
    }

    var algorithmSelect = document.getElementById("algorithmSelect");
    var selectedAlgorithm = algorithmSelect.value;

    var resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = ""; 

    if (selectedAlgorithm === "parcoursLargeur") {
        var startNode = prompt("Veuillez saisir le sommet de départ pour le parcours en largeur :");
        var result = parcoursLargeur(graph, startNode);
        createResultList(resultContainer, "Résultat du parcours en largeur :", result);
    } 
    else if (selectedAlgorithm === "parcoursProfondeur") {
        var startNode = prompt("Veuillez saisir le sommet de départ pour le parcours en profondeur :");
        var visited = [];
        parcoursProfondeur(graph, startNode, visited);
        createResultList(resultContainer, "Résultat du parcours en profondeur :", visited);
    } 
    else if (selectedAlgorithm === "coloriageGlouton") {
        var colorResult = coloriageGlouton(graph);
        createResultList(resultContainer, "Coloriage glouton du graphe :", Object.entries(colorResult).map(entry => `${entry[0]} - ${entry[1]}`));
    }
    else if (selectedAlgorithm === "welshPowell") {
        var colorResult = welshPowell(graph);
        createResultList(resultContainer, "Coloriage du graphe avec l'algorithme de Welsh-Powell :", Object.entries(colorResult).map(entry => `${entry[0]} - ${entry[1]}`));
    }
    else if (selectedAlgorithm === "prim") {
        var startNode = prompt("Veuillez saisir le sommet de départ pour l'algorithme de Prim :");
        var result = prim(graph, startNode);
        createResultList(resultContainer, "Arbre couvrant minimal trouvé avec l'algorithme de Prim :", result);
    }
    else {
        alert("Algorithme sélectionné non pris en charge.");
    }
}


function voirExemple(){
    document.getElementById("popup1").classList.toggle("active");
}
