# sugiyama_step1

###an overview on hierarchical graph

In a hierarchical drawing of a directed graph:
* Nodes are drawn on a collection of horizontal lines (levels or layers) 
* Edges are represented with polylines (polygonal chains)

![Alt text](img/hg.png?raw=true "workflow")

Hierarchical drawings are used to represent precedence relationships. Applications include: computer network visualization, web maps visualization, visualization of biologic maps, social networks visualization, others...

###sugiyama methodology

Layered graph drawing or hierarchical graph drawing is a type of graph drawing in which the vertices of a directed graph are drawn in horizontal rows or layers with the edges generally directed downwards.It is also known as Sugiyama-style graph drawing after Kozo Sugiyama, who first developed this drawing style.

The four steps of the methodology:

1. Cycle removal: temporarily reverts the direction of some edges in such a way to have an acyclic input graph, this step is not needed if the input graph has no directed cycle.
2. Level assignment assigns nodes to levels (hence determining their y-coordinate) the graph is changed in such a way that each edge connects nodes on adjacent levels: this is obtained by introducing dummy nodes.
3. Crossing reduction: sorts the nodes of each level in such a way to reduce the number of edge crossings.
4. X-coordinate assignment: assigns an x-coordinate (hence a placement) to each node, dummy nodes are replaced with bends.

Several alternative algorithms and heuristics are nowadays available for each step.

###goal
I'm going to explore the various alternatives (heuristics) for the removal of the direct cycles of a directed graph, th goal is reducing the number of edges that have been inverted.

I would compare the following heuristics:

1. Heuristic based on a depth-first search
2. Greedy approach proposed by Eades (see slides)
3. Other heuristics that I produce

###resources

##### http://www.dia.uniroma3.it/~infovis/slides/2015-2016/180-layered-first-03.pdf
##### https://en.wikipedia.org/wiki/Layered_graph_drawing
