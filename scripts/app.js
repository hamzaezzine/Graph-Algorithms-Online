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
            for (var i = 0; i < neighbors.length; i++) {
                var v = neighbors[i];
                
                if (!visited.includes(v) && !to_visit.includes(v)) {
                    to_visit.push(v);
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



    if (selectedAlgorithm === "parcoursLargeur") {
        var startNode = prompt("Veuillez saisir le sommet de départ pour le parcours en largeur :");
        var result = parcoursLargeur(graph, startNode);
        console.log("Parcours en largeur :", result);
    } 
    
    else if (selectedAlgorithm === "parcoursProfondeur") {
        var startNode = prompt("Veuillez saisir le sommet de départ pour le parcours en profondeur :");
        var visited = [];
        parcoursProfondeur(graph, startNode, visited);
        console.log("Parcours en profondeur :", visited);
    } 
    
    else {
        alert("Algorithme sélectionné non pris en charge.");
    }
}
