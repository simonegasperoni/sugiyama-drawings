//a minimal representation for graph by simone gasperoni

function Simvertex(vertex){
	this.vertex=vertex;
	this.linkto=[];
	this.getVertex=getVertex;
	this.getLinks=getLinks;
	this.addLinkto=addLinkto;

	function getVertex(){
		return this.vertex;
	}
	function getLinks(){
		return this.linkto;
	}
	function contains(a, obj) {
    	var i = a.length;
    	while (i--) {
       		if (a[i] === obj) {
           		return true;
       		}
    	}
    	return false;
	}
	function addLinkto(vertexlinked){
		if (!contains(this.linkto, vertexlinked)) this.linkto[this.linkto.length]=vertexlinked;
	}
}

function Simgraph(){
	//...
}
