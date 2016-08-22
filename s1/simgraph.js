//graph minimal representation

function contains(a, obj) {
   	var i = a.length;
  	while (i--) if (a[i]===obj) return true;
   	return false;
}

function Simvertex(vertex){
	this.vertex=vertex;
	this.linkto=[];
	this.getVertex=getVertex;
	this.getLinks=getLinks;
	this.getLinks2=getLinks2;
	this.addLinkto=addLinkto;

	function getVertex(){
		return this.vertex;
	}
	function getLinks(){
		return this.linkto;
	}
	function getLinks2(){
		var array=[]
		for (var i=0; i<this.linkto.length; i++) {
			array[i]=this.linkto[i].getVertex();
		}
		return array;
	}
	function addLinkto(verticesLinked){
		for (var i=0; i<verticesLinked.length; i++) {
			if (!contains(this.linkto, verticesLinked[i])){
				this.linkto[this.linkto.length]=verticesLinked[i];
			}
		}
	}
}

function Simgraph(){
	this.vertices=[];
	this.initialstates=[];
	this.getInitialStates=getInitialStates;
	this.setInitialStates=setInitialStates;
	this.getVertices=getVertices;
	this.addVertex=addVertex;
	this.print=print;
	function setInitialStates(states){
		this.initialstates=states;
	}
	function getInitialStates(){
		return this.initialstates;
	}
	
	function addVertex(vertex){
		if (!contains(this.vertices, vertex))
			this.vertices[this.vertices.length]=vertex;
	}
	function getVertices(){
		return this.vertices;
	}
	function print(){
		for (var i=0; i<this.vertices.length; i++) {
			document.write("---------------------------- <br>");
			document.write("node: "+this.vertices[i].getVertex()+" <br>");
			document.write("links to "+this.vertices[i].getLinks2()+" <br>");
			document.write("---------------------------- <br>");
		}
	}
}
