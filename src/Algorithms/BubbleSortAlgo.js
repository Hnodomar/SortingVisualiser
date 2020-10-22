function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSort(array, animations);
    return animations;
}

function bubbleSort(array, animations) {
    let len = array.length;
    let swapped;
    do { //Keep looping array until a swap does not occur
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            animations.push([i, i+1]);  //Push element index to change colour
            animations.push([i, i+1]);  //Push element index AGAIN to revert colour change
            if (array[i] > array[i + 1]) { //If true, swap these elements
                animations.push([i+1, array[i]]); //Push element index AND numeric value to change bar height
                animations.push([i, array[i+1]]); //Push element index AND numeric value to change bar height
                let tmp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
    return array;
}

export default getBubbleSortAnimations;