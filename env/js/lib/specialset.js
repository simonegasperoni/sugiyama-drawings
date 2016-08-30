function SpecialSet(){
	this.add=add;
	this.addAll=addAll;
	this.size=size;
	this.remove=remove;
	this.array=[];
	this.getList=getList;
	this.contains=contains;

	function add(elem){
		this.array.push(elem);	
	}
	function addAll(arr){
		for (var i = 0; i < arr.length; i++) {
			this.add(arr[i]);
		};
	}
	function remove(elem){
		var res=[]
		for (var i = 0; i < this.array.length; i++) {
			if(this.array[i]!=elem) res.push(this.array[i]);
		};
		this.array=res;
	}
	function size(){
		return this.array.length;
	}
	function getList(){
		return this.array;
	}
	function contains(elem){
		return this.array.indexOf(elem)>=0;
	}
}