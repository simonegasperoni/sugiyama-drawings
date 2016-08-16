# sugiyama_step1

##An overview on hierarchical graph
In a hierarchical drawing of a directed graph: nodes are drawn on a collection of horizontal lines (levels or layers), edges are represented with polylines (polygonal chains).

----------------------

![Alt text](img/hg.png?raw=true "an example of hierarchical graph")

----------------------

Hierarchical drawings are used to represent precedence relationships. Applications include: computer network visualization, web maps visualization, visualization of biologic maps, social networks visualization, others...

##Sugiyama methodology
Layered graph drawing or hierarchical graph drawing is a type of graph drawing in which the vertices of a directed graph are drawn in horizontal rows or layers with the edges generally directed downwards.It is also known as Sugiyama-style graph drawing after Kozo Sugiyama, who first developed this drawing style.

The four steps of the methodology:

1. Cycle removal: temporarily reverts the direction of some edges in such a way to have an acyclic input graph, this step is not needed if the input graph has no directed cycle.
2. Level assignment assigns nodes to levels (hence determining their y-coordinate) the graph is changed in such a way that each edge connects nodes on adjacent levels: this is obtained by introducing dummy nodes.
3. Crossing reduction: sorts the nodes of each level in such a way to reduce the number of edge crossings.
4. X-coordinate assignment: assigns an x-coordinate (hence a placement) to each node, dummy nodes are replaced with bends.

Several alternative algorithms and heuristics are nowadays available for each step.

##Goal
I'm going to explore the various alternatives (heuristics) for the removal of the direct cycles of a directed graph, th goal is reducing the number of edges that have been inverted.

I would compare the following heuristics:

1. **Heuristic based on a depth-first search**
2. **Greedy approach proposed by Eades (see resources)**
3. **Other heuristics that I produce**

##Focus on cycle removal
Simply we have a graph G with a set of edege E and a set of vertices V (nodes), the problem is the following:

```
INPUT:    A directed graph G
OUTPUT:   A directed acyclic graph (DAG) G’
TARGET:   Reverse the direction of a small subset of the edges of G
```

If G=(V,E) is a directed graph and R is a set of edges, G<sub>rev(R)</sub> is the graph obtained by reversing the edges in R. We would like to reverse a set of edges R, our target is obtain a G<sub>rev(R)</sub> such that G<sub>rev(R)</sub> is acyclic and |R| is minimum.

##Feedback set vs feedback arc set
A set R of edges of a directed graph G=(V,E) is a **feedback set** if G<sub>rev(R)</sub> is acyclic, whereas a **feedback arc set** is a set of edges whose removal makes the graph acyclic.

*Feedback set and feedback arc set are related but different concepts removing all edges of a cycle makes it trivially acyclic, reversing all edges of a cycle only changes its direction*

##Heuristics
####A simple heuristic based on DFS: Depth First Search
A simple algorithm to find a feedback set R of a directed graph G consists of performing a series of DFS traversals of G and add all back 
edges to R, DFS visits are launched on non-explored nodes until the whole graph is explored.

Size of the feedback set R: we assume G is connected, if a single DFS is performed then the forward edges are a spanning tree with |V|-1 edges, if more DFS’s are performed each DFS gives a tree and at least one edge links nodes of one exploration to some nodes of the previous explorations. Hence, once again we have |V|-1 "good" edges, the size of R is:
```
|R| = |E|-(|V|-1) = |E|-|V|+1
```

####A simple heuristic based on leftward edges
Lets look at the problem from a different perspective, let us choose a permutation:
```
π = (v<sub>1</sub>, v<sub>2</sub>, ..., v<sub>n</sub>)
``` 
of the nodes of G any edge (v<sub>i</sub>, v<sub>j</sub>) with i > j is said to be a leftward edge (with respect to π)
![Alt text](img/dfs.png?raw=true "dfs approach")

*A topological sort of a directed graph is a linear ordering of its nodes such that for every directed edge (u,v), u comes before v in the ordering, a topological sort is possible if and only if the graph has no directed cycles*

Given a permutation π of the nodes of G, the set of leftward egdes is a feedback set (it is also a feedback arc set). On the other hand, let R be a feedback set: if you compute a topological sort of the directed graph obtained by reverting all edges in R, you obtain a permutation of the nodes whose leftward edge set coincides with R. 

**Hence, the problem of finding a minimum size feedback set is equivalent to the problem of finding a permutation with the minimum number of leftward edges**


Arbitrarily choose a permutation of the nodes of G and count the number of leftward egdes, if this number is greater than half the edges of G, we choose the opposite node sequence.
Size of R: the number of reverted edges is at most half the total number of the edges of G, this heuristic is surely preferable with respect to the previous one whenever: 
``` 
|E|/2 < |E|-|V|+1
``` 
that is, whenever
```
|E| > 2|V| - 2
```

##Resources

- http://www.dia.uniroma3.it/~infovis/slides/2015-2016/180-layered-first-03.pdf
- https://en.wikipedia.org/wiki/Layered_graph_drawing
