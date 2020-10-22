function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSort(array, animations);
    return animations;
}

//This algorithm: (represent heap with array)
//Build a max heap (element with greatest value at top)
//Swap top heap element with bottom heap element, removing top element from heap altogether
//Repeat both steps above (recursively), until heap has only one element remaining

function heapify(array, length, parentIndex, animations) {  //compares three elements and makes sure they are 
    let largest = parentIndex;                  //in correct order for a max heap
    let leftChild = parentIndex * 2 + 1;
    let rightChild = leftChild + 1;

    if (leftChild < length && array[leftChild] > array[largest]) {
        animations.push([leftChild, largest, 1]);
        animations.push([leftChild, largest, 1]);
        largest = leftChild;
    }
    if (rightChild < length && array[rightChild] > array[largest]) {
        animations.push([rightChild, largest, 1]);
        animations.push([rightChild, largest, 1]);
        largest = rightChild;
    }
    if (largest != parentIndex) { //If parent wasn't larger than its children, swap large child with parent
        animations.push([parentIndex, array[largest]]);
        animations.push([largest, array[parentIndex]]);
        [array[parentIndex], array[largest]] = [array[largest], array[parentIndex]];
        heapify(array, length, largest, animations); //largest is index of largest element BEFORE swap above
    }                                    //thus, can use it as the parent for recursive call to check elements beneath
    return array;
}


function heapSort(array, animations) {
    const length = array.length;
    let lastParentIndex = Math.floor(length / 2 - 1);
    let lastChildIndex = length - 1;
    while (lastParentIndex >= 0) {
        heapify(array, length, lastParentIndex, animations); //Builds max heap
        lastParentIndex--;
    }
    while (lastChildIndex >= 0) {
        animations.push([0, array[lastChildIndex]]);
        animations.push([lastChildIndex, array[0], 1, 1]);
        [array[0], array[lastChildIndex]] = [array[lastChildIndex], array[0]]; //Swap last parent with last child
        heapify(array, lastChildIndex, 0, animations);
        lastChildIndex--;
    }
    return array;
}

export default getHeapSortAnimations;