function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSort(array, 0, array.length - 1, animations);
    return animations;
}

function quickSort(array, left, right, animations) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right, animations); //Pivot index returned is 'sorted' position
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(array, left, index - 1, animations); //Recursion
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(array, index, right, animations);
        }
    }
    return array;
}

function partition(array, left, right, animations) {
    var pivot   = array[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    animations.push([Math.floor((right + left) / 2)]);
    while (i <= j) {
        while (array[i] < pivot) { //Skip elements from left smaller than pivot
            animations.push([i, j]);
            animations.push([i, j]);
            i++;
        }
        while (array[j] > pivot) { //Skip elements from right larger than pivot
            animations.push([i, j]);
            animations.push([i, j]);
            j--;
        }
        if (i <= j) { //We want to find and swap the elements from left LARGER than pivot and from right SMALLER than pivot
            animations.push([j, array[i], 1]);
            animations.push([i, array[j], 1]);
            swap(array, i, j);
            i++;
            j--;
        }
        
        
    } //When element from left LARGER than pivot has greater index than element from right SMALLER than pivot, quit
    animations.push([Math.floor((right + left) / 2)]);
    /*if (left === right - 1) 
        animations.push([left, right, i, left]);
    else if (left === right - 2)
        animations.push([left, right, left + 1, left + 2]);
    else if (left === right - 3) 
        animations.push([left, right, left + 1, left + 2]);
    else if (left === right) 
        animations.push([left, right, left, right]);*/

    return i; //and return the index of the left-most element... as this is our pivot index!
}

function swap(array, leftIndex, rightIndex) { //Utility function
    const temp = array[leftIndex];
    array[leftIndex]= array[rightIndex];
    array[rightIndex] = temp;
}

export default getQuickSortAnimations;