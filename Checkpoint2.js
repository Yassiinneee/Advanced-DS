class Graph {
  constructor(directed = false) {
    this.adjacencyList = {}; // Stores vertices and their connections
    this.directed = directed; // True for directed, false for undirected
  }

  // Add a vertex if it doesn't exist
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  // Add an edge between two vertices
  addEdge(v1, v2) {
    if (!this.adjacencyList[v1]) this.addVertex(v1);
    if (!this.adjacencyList[v2]) this.addVertex(v2);
    this.adjacencyList[v1].push(v2);
    if (!this.directed) this.adjacencyList[v2].push(v1); // For undirected graphs
  }

  // Remove an edge between two vertices
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    if (!this.directed) this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }

  // Check if an edge exists
  hasEdge(v1, v2) {
    return this.adjacencyList[v1]?.includes(v2);             // Return true if v2 is in v1's adjacency list
  }

  // Print the graph
  print() {
    for (let vertex in this.adjacencyList) {
      console.log(`${vertex} -> ${this.adjacencyList[vertex].join(', ')}`);
    }
  }

  // Depth-First Search (DFS)
  dfs(start) {
    const visited = {};
    const result = [];
    const adjacencyList = this.adjacencyList;

    (function traverse(vertex) {                                             // Recursive helper function for DFS
      if (!vertex || visited[vertex]) return;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach(neighbor => traverse(neighbor));
    })(start);

    return result;
  }

  // Breadth-First Search (BFS)
  bfs(start) {
    const visited = {};
    const result = [];
    const queue = [start];
    visited[start] = true;

    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);
      this.adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

// Test
const graph = new Graph(false);                        // Create an undirected graph
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');                               // Add edges between vertices

console.log('Graph:');
graph.print();
console.log('DFS:', graph.dfs('A'));                  // Perform BFS and DFS starting from vertex 'A'
console.log('BFS:', graph.bfs('A'));
