# sugiyama_step1

In a hierarchical drawing of a directed graph:
* Nodes are drawn on a collection of horizontal lines (levels or layers) 
* Edges are represented with polylines (polygonal chains)

###goal
I'm going to explore the various alternatives (heuristics) for the removal of the direct cycles of a directed graph, th goal is reducing the number of edges that have been inverted.

Among the heuristics I could compare us are the following:

1. Heuristic based on a depth-first search
2. Greedy approach proposed by Eades (see slides)
3. Other heuristics that I produce

###resources
* Walter Didimo, Giuseppe Liotta, slides from Perugia University: 

##### http://www.dia.uniroma3.it/~infovis/slides/2015-2016/180-layered-first-03.pdf

