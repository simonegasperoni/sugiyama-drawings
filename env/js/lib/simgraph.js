//graph minimal representation

function contains(a, obj) {
   	var i = a.length;
  	while (i--) 
  		if (a[i]===obj) 
  			return true;
   	return false;
}
function Simvertex(vertex){
	
	this.vertex=vertex;
	this.linkto=[];
	this.getVertex=getVertex;
	this.getLinks=getLinks;
	this.getLinks2=getLinks2;
	this.getLinks3=getLinks3
	this.addLinkto=addLinkto;

	function getVertex(){
		return this.vertex;
	}
	
	function getLinks(){
		return this.linkto;
	}
	
	function getLinks2(){
		var array=[];
		for (var i=0; i<this.linkto.length; i++) {
			array[i]=this.linkto[i].getVertex();
		}
		return array;
	}
	
	function getLinks3(){
		var array=[]
		for (var i=0; i<this.linkto.length; i++) {
			array[i]=this.linkto[i].printEdge();
		}
		return array;
	}
	
	function addLinkto(verticesLinked){
		this.linkto[this.linkto.length]=new Simedge(this, verticesLinked);	
	}

}

function Simedge(firstnode, secondnode){
	
	this.firstnode=firstnode;
	this.secondnode=secondnode;
	this.intree=false;

	this.printEdge=printEdge;
	this.getFirstnode=getFirstnode;
	this.getSecondnode=getSecondnode;
	this.isPartOfSpanningtree=isPartOfSpanningtree;
	this.setPartOfSpanningtree=setPartOfSpanningtree;
	this.noPartOfSpanningtree=noPartOfSpanningtree;
	this.revEdge=revEdge;


	function printEdge(){
		return "edge: "+this.firstnode.getVertex()+" -> "
						+this.secondnode.getVertex()+
						", tree: "+ this.isPartOfSpanningtree();
	}
	
	function getFirstnode(){
		return this.firstnode;
	}
	
	function getSecondnode(){
		return this.secondnode;
	}
	
	function isPartOfSpanningtree(){
		return this.intree;
	}
	
	function setPartOfSpanningtree(){
		this.intree=true;
	}
	
	function noPartOfSpanningtree(){
		this.intree=false;
	}

	function revEdge(){
		var aux1=this.firstnode;
		var aux2=this.secondnode;
		this.firstnode=aux2;
		this.secondnode=aux1;
	}

}

function Simgraph(){
	
	this.vertices=[];
	this.initialstates=[];
	this.getInitialStates=getInitialStates;
	this.setInitialStates=setInitialStates;
	this.getVertexFromLabel=getVertexFromLabel;
	this.getVertices=getVertices;
	this.addVertex=addVertex;
	this.print=print;
	this.dfs=dfs;
	this.dfs_recur=dfs_recur;
	this.getCsvForm=getCsvForm;
	
	function setInitialStates(states){
		this.initialstates=states;
	}

	function getInitialStates(){
		return this.initialstates;
	}

	function dfs_recur(node, visited) {
		var adj = node.getLinks();
		visited.push(node.getVertex());
		//document.write(node.getVertex());
		for (var i in adj) {
			var edge = adj[i];
			var dest=edge.getSecondnode();
			if (0 > visited.indexOf(dest.getVertex())){
				adj[i].setPartOfSpanningtree();
				dfs_recur(dest, visited);
			}
		}
		return visited;
	}

	function dfs(start){
		return this.dfs_recur(start,[]);
	}

	function addVertex(vertex){
		if (!contains(this.vertices, vertex))
			this.vertices[this.vertices.length]=vertex;
	}

	function getVertices(){
		return this.vertices;
	}

	function getVertexFromLabel(label){
		var i=0;
		while(i <this.vertices.length){
			if (label==this.vertices[i].getVertex()) break;
			else i++;
		}
		return this.vertices[i];
	}

	function print(){
		for (var i=0; i<this.vertices.length; i++) {
			console.log("node: "+this.vertices[i].getVertex()+" <br>");
			console.log("edges: "+this.vertices[i].getLinks3()+" <br>");
			//document.write("---------------------------- <br>");
		}
	}

	function getCsvForm(newlineform){
		var res="source,target"+newlineform;
		for (var i=0; i<this.vertices.length; i++) {
			var edges = this.vertices[i].getLinks();
			for (var j=0; j<edges.length; j++) {
				res=res+edges[j].getFirstnode().getVertex()+","+
					edges[j].getSecondnode().getVertex()+newlineform;
			}
		}
		return res;
	}
}
