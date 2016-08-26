function Queue(){
	this.push=push;
	this.getList=getList;
	this.getLength=getLength;
	this.array=[];
	this.shift=shift;
	function getList(){
		return this.array;	
	}
	function getLength(){
		return this.array.length;
	}
	function push(name){
		this.array[this.array.length]=name;
	}
	function shift(){
		var a=this.array[0];
		this.array.shift();
		return a;
	}
}