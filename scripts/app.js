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



// Algorithme de Welsh-Powell pour colorier un graphe
function welshPowell(G) {
    var degrees = {};
    for (var node in G) {
        if (G.hasOwnProperty(node)) {
            degrees[node] = G[node].length;
        }
    }

    var sortedNodes = Object.keys(degrees).sort(function (a, b) {
        return degrees[b] - degrees[a];
    });

    var colors = {};
    var colorCount = 0;
    for (var i = 0; i < sortedNodes.length; i++) {
        var node = sortedNodes[i];
        if (!colors[node]) {
            colorCount++;
            colors[node] = colorCount;
            
            for (var j = i + 1; j < sortedNodes.length; j++){
                var adjacent = false;
                for (var k = 0; k < G[sortedNodes[j]].length; k++) {
                    if (G[sortedNodes[j]][k] === node) {
                        adjacent = true;
                        break;
                    }
                }
                if(!adjacent) {
                    colors[sortedNodes[j]] = colorCount;
                }
            }
        }
    }

    return colors;
}




// Algorithme de Prim
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
                for (var neighbor in neighbors) {
                    if (!visited.includes(neighbor) && neighbors[neighbor] < minWeight) {
                        minWeight = neighbors[neighbor];
                        minNode = neighbor;
                        minEdge = { from: visited[i], to: minNode, weight: minWeight };
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

// Algorithme de Kruskal
function kruskal(graph) {
    var edges = [];
    for (var node in graph) {
        if (graph.hasOwnProperty(node)) {
            var neighbors = graph[node];
            for (var neighbor in neighbors) {
                if (neighbors.hasOwnProperty(neighbor)) {
                    edges.push({ from: node, to: neighbor, weight: neighbors[neighbor] });
                }
            }
        }
    }
    edges.sort(function (a, b) {
        return a.weight - b.weight;
    });

    var disjointSet = {};
    for (var node in graph) {
        if (graph.hasOwnProperty(node)) {
            disjointSet[node] = [node];
        }
    }
    var result = [];
    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];
        var fromSet = disjointSet[edge.from];
        var toSet = disjointSet[edge.to];

        if (fromSet !== toSet) {
            result.push(edge);
            for (var j = 0; j < toSet.length; j++) {
                fromSet.push(toSet[j]);
                disjointSet[toSet[j]] = fromSet;
            }
        }
    }
    return result;
}

// Algorithme de Bellman-Ford :
function bellmanFord(graph, startNode) {
    var distances = {};
    var predecessors = {};

    for (var node in graph) {
        distances[node] = Infinity;
        predecessors[node] = null;
    }
    distances[startNode] = 0;

    for (var i = 0; i < Object.keys(graph).length - 1; i++) {
        for (var node in graph) {
            if (graph.hasOwnProperty(node)) {
                var neighbors = graph[node];
                for (var neighbor in neighbors) {
                    if (neighbors.hasOwnProperty(neighbor)) {
                        var weight = neighbors[neighbor];
                        if (distances[node] + weight < distances[neighbor]) {
                            distances[neighbor] = distances[node] + weight;
                            predecessors[neighbor] = node;
                        }
                    }
                }
            }
        }
    }

    for (var node in graph) {
        if (graph.hasOwnProperty(node)) {
            var neighbors = graph[node];
            for (var neighbor in neighbors) {
                if (neighbors.hasOwnProperty(neighbor)) {
                    var weight = neighbors[neighbor];
                    if (distances[node] + weight < distances[neighbor]) {
                        throw new Error("Graph contains negative-weight cycles.");
                    }
                }
            }
        }
    }

    return { distances, predecessors };
}

// Algorithme de Bellman :


function createResultList(resultContainer, resultTitle, result) {
    var resultHeading = document.createElement("h2");
    resultHeading.textContent = resultTitle;
    resultContainer.appendChild(resultHeading);

    var resultList = document.createElement("ul");
    result.forEach(function (node, index) {
        var listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${node}`;
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
        createResultList(resultContainer, "Coloriage glouton du graphe :", Object.keys(colorResult).map(key => `${key} - ${colorResult[key]}`));
    }
    else if (selectedAlgorithm === "welshPowell") {
        var colorResult = welshPowell(graph);
        createResultList(resultContainer, "Coloriage du graphe avec l'algorithme de Welsh-Powell :", Object.entries(colorResult).map(entry => `${entry[0]} - ${entry[1]}`));
    }
    else if (selectedAlgorithm === "prim") {
        var startNode = prompt("Veuillez saisir le sommet de départ pour l'algorithme de Prim :");
        var result = prim(graph, startNode);
        createResultList(resultContainer, "Arbre couvrant minimal trouvé avec l'algorithme de Prim :", result.map(edge => `${edge.from} -> ${edge.to} (Poids : ${edge.weight})`));
    }
    else if (selectedAlgorithm === "kruskal") {
        var result = kruskal(graph);
        createResultList(resultContainer, "Arbre couvrant minimal trouvé avec l'algorithme de Kruskal :", result.map(edge => `${edge.from} -> ${edge.to} (Poids : ${edge.weight})`));
    }
    else if (selectedAlgorithm === "bellmanFord") {
        var startNode = prompt("Veuillez saisir le sommet de départ pour l'algorithme de Bellman-Ford :");
        try {
            var result = bellmanFord(graph, startNode);
            var distances = result.distances;
            var predecessors = result.predecessors;
    
            var distancesList = Object.entries(distances).map(([node, distance]) => `${node}: ${distance}`);
            var predecessorsList = Object.entries(predecessors).map(([node, predecessor]) => `${node}: ${predecessor || '-'}`);
    
            createResultList(resultContainer, "Distances depuis la sommet de départ :", distancesList);
            createResultList(resultContainer, "Les sommets prédécesseur :", predecessorsList);
        } catch (error) {
            alert(error.message);
        }
    }
    else {
        alert("Algorithme sélectionné non pris en charge.");
    }
}


function voirExemple(){
    document.getElementById("popup1").classList.toggle("active");
}
