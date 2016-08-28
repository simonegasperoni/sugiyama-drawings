function contains(a, obj) {
   	var i = a.length;
  	while (i--) 
  		if (a[i]===obj) 
  			return true;
   	return false;
}
function addToSet(array, elem){
	if(!contains(array, elem)){
		array.push(elem);
	}
}