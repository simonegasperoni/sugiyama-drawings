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
function permutate(array, callback) {
    // Do the actual permuation work on array[], starting at index
    function p(array, index, callback) {
      // Swap elements i1 and i2 in array a[]
      function swap(a, i1, i2) {
        var t = a[i1];
        a[i1] = a[i2];
        a[i2] = t;
      }
      if (index == array.length - 1) {
        callback(array);
        return 1;
      } 
      else {
        var count = p(array, index + 1, callback);
        for (var i = index + 1; i < array.length; i++) {
          swap(array, i, index);
          count += p(array, index + 1, callback);
          swap(array, i, index);
        }
        return count;
      }
    }
    if (!array || array.length == 0) {
      return 0;
    }
    return p(array, 0, callback);
}
