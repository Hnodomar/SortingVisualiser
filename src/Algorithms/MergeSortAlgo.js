function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    mergeSort(array, 0, array.length - 1, animations);
    return animations;
}

function mergeSort(array, start, end, animations) {
    let mid = 0;
    if (start < end) {
        mid = Math.floor((start + end) / 2);
        mergeSort(array, start, mid, animations);
        mergeSort(array, mid + 1, end, animations);
        doMerge(array, start, mid, end, animations);
    }
}

function doMerge(
    array,
    start,
    mid,
    end,
    animations
) {
    let i = start;
    let k = start;
    let j = mid + 1;
    let auxiliary = [];
    while (i <= mid && j <= end) {
        animations.push([i,j]); //Values being compared: push them once to change their colour
        animations.push([i,j]); //Values being compared: push them again to revert colour change
        if (array[i] < array[j]) {
            animations.push([k, array[i]]);
            auxiliary[k++] = array[i++];
        }
        else {
            animations.push([k, array[j]]);
            auxiliary[k++] = array[j++];
        }
    }
    while (i <= mid) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, array[i]]);
        auxiliary[k++] = array[i++];
    }
    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, array[j]]);
        auxiliary[k++] = array[j++];
    }
    for (let v = start; v < k; v++)
        array[v] = auxiliary[v];
}

export default getMergeSortAnimations;