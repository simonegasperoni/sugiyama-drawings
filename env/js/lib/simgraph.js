//graph minimal representation

function contains(a, obj) {
   	var i = a.length;
  	while (i--) 
  		if (a[i]===obj) 
  			return true;
   	return false;
}
function Simvertex(vertex){
	
	this.othertree=false;
	this.vertex=vertex;
	this.linkto=[];
	this.getVertex=getVertex;
	this.getLinks=getLinks;
	this.getLinks2=getLinks2;
	this.getLinks3=getLinks3;
	this.getLinks4=getLinks4;
	this.rmLinkto=rmLinkto;
	this.addLinkto=addLinkto;
	this.print=print;

	function print(){
		return this.vertex+" - othertree: "+this.othertree;
	}

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

	function getLinks4(){
		var array=[];
		for (var i=0; i<this.linkto.length; i++) {
			array[i]=this.linkto[i].getSecondnode();
		}
		return array;
	}
	
	function addLinkto(vertex){
		this.linkto[this.linkto.length]=new Simedge(this, vertex);	
	}

	function rmLinkto(vertex){
		var newlinksto=[];
		for (var i = 0; i < this.linkto.length; i++) {
			if (!(this.linkto[i].getSecondnode()==vertex)) newlinksto.push(this.linkto[i]);
		};
		this.linkto=newlinksto;
	}

}

function Simedge(firstnode, secondnode){
	
	this.firstnode=firstnode;
	this.secondnode=secondnode;
	this.intree=false;

	this.printEdge=printEdge;
	this.getFirstnode=getFirstnode;
	this.getSecondnode=getSecondnode;
	this.revEdge=revEdge;
	this.setInverted=setInverted;
	this.isInverted=isInverted;


	function printEdge(){
		return "edge: "+this.firstnode.getVertex()+" -> "
						+this.secondnode.getVertex()+"; ";
	}
	
	function getFirstnode(){
		return this.firstnode;
	}
	
	function getSecondnode(){
		return this.secondnode;
	}
	
	function setInverted(){
		this.intree=true;
	}

	function isInverted(){
		return this.intree;
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
	this.getCsvForm2=getCsvForm2;
	this.getCsvLW=getCsvLW;
	this.outdeg=outdeg;
	this.indeg=indeg;
	this.rmVertex=rmVertex;
	this.thereIsSink=thereIsSink;
	this.thereIsSource=thereIsSource;
	this.returnSink=returnSink;
	this.returnSource=returnSource;
	this.getVertexFromLabel=getVertexFromLabel;

	function getVertexFromLabel(label){
		var res=null;
		for (var i = 0; i < this.vertices.length; i++) {
			if(this.vertices[i].getVertex()==label){
				res=this.vertices[i];
				break;
			}
		};
		return res;
	}
	
	function setInitialStates(states){
		this.initialstates=states;
	}

	function getInitialStates(){
		return this.initialstates;
	}

	function dfs_recur(node, visited) {
		var adj = node.getLinks();
		visited.push(node);
		//document.write(node.getVertex());
		for (var i in adj) {
			var edge=adj[i];
			var dest=edge.getSecondnode();
			if (visited.indexOf(dest)<0){
				dfs_recur(dest, visited);
			}
			else adj[i].setInverted();
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

	function rmVertex(vertex){
		var newvertices=[];
		for (var i=0; i<this.vertices.length; i++) {
			this.vertices[i].rmLinkto(vertex);
			if(!(this.vertices[i]==vertex)) newvertices.push(this.vertices[i]);
		};
		this.vertices=newvertices;
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
		document.write("----------------------------------------<br>");
		for (var i=0; i<this.vertices.length; i++) {
			document.write("node: "+this.vertices[i].getVertex()+" <br>");
			document.write("edges: "+this.vertices[i].getLinks3()+" <br>");
			document.write("----------------------------------------<br>");
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

	function getCsvForm2(newlineform){
		var res="source,target,value"+newlineform;
		for (var i=0; i<this.vertices.length; i++) {
			var edges = this.vertices[i].getLinks();
			for (var j=0; j<edges.length; j++) {
				var value="1";
				if(!edges[j].isPartOfSpanningtree()) value=0;
				res=res+edges[j].getFirstnode().getVertex()+","+
					edges[j].getSecondnode().getVertex()+","+value+newlineform;
			}
		}
		return res;
	}

	function getCsvLW(newlineform){
		var res="source,target,value"+newlineform;
		for (var i=0; i<this.vertices.length; i++) {
			var edges = this.vertices[i].getLinks();
			for (var j=0; j<edges.length; j++) {
				var value="1";
				if(edges[j].isInverted()) value=0;
				res=res+edges[j].getFirstnode().getVertex()+","+
					edges[j].getSecondnode().getVertex()+","+value+newlineform;
			}
		}
		return res;
	}

	function outdeg(node){
		return node.getLinks().length;

	}

	function indeg(node){
		var counter=0;
		for (var i = 0; i < this.vertices.length; i++){
			var links=this.vertices[i].getLinks();
			for (var j = 0; j < links.length; j++) {
				if(links[j].getSecondnode()==node) counter++;
			};
		};
		return counter;
	}

	function thereIsSink(){
		var value=false;
		for (var i = 0; i < this.vertices.length; i++) {
			if(this.outdeg(this.vertices[i])==0) value=true;
		};
		return value;
	}

	function thereIsSource(){
		var value=false;
		for (var i = 0; i < this.vertices.length; i++) {
			if(this.indeg(this.vertices[i])==0) value=true;
		};
		return value;
	}

	function returnSink(){
		var value;
		for (var i = 0; i < this.vertices.length; i++) {
			if(this.outdeg(this.vertices[i])==0) value=this.vertices[i];
		};
		return value;
	}
	
	function returnSource(){
		var value;
		for (var i = 0; i < this.vertices.length; i++) {
			if(this.indeg(this.vertices[i])==0) value=this.vertices[i];
		};
		return value;
	}
}


function createGraphFromCsv(text){
	var graph=new Simgraph();
	var nodes=[];
	var edgesour=[];
	var edgedest=[];
 				
	result = text.split(/\r?\n/);
	for (var i = 1 ; i <result.length-1; i++) {
		var record=result[i].split(",");
		addToSet(nodes,record[0]);
		addToSet(nodes,record[1]);
		edgesour.push(record[0]);
		edgedest.push(record[1]);
	};

	for (var i = 0 ; i<nodes.length; i++) {
		graph.addVertex(new Simvertex(nodes[i]));
	};

	for (var i = 0 ; i<edgesour.length; i++) {
		var sour=graph.getVertexFromLabel(edgesour[i]);
		var dest=graph.getVertexFromLabel(edgedest[i]);
		sour.addLinkto(dest);
	};
 					
	return graph;
}