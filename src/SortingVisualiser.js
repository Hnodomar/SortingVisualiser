import React from 'react';
import getMergeSortAnimations from './Algorithms/MergeSortAlgo';
import getBubbleSortAnimations from './Algorithms/BubbleSortAlgo';
import getQuickSortAnimations from './Algorithms/QuickSortAlgo';
import getHeapSortAnimations from './Algorithms/HeapSortAlgo';
import './SortingVisualiser.css';

const PRIMARY_COLOUR = 'turquoise';
const SECONDARY_COLOUR = 'red';


class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            timeoutIDs: [],
            sortStarted: false,
            upperBound: 600,
            animationSpeed: 90,
            numberOfElements: 100,
        }
        this.resetArray = this.resetArray.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.stopVisualiser = this.stopVisualiser.bind(this);
        this.toggleSliders = this.toggleSliders.bind(this);
    }
    componentDidMount() {
        this.resetArray();
        window.addEventListener('resize', this.resetArray);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resetArray);
        this.stopVisualiser();
    }
    stopVisualiser() {
        this.state.timeoutIDs.forEach(ID => {
            clearTimeout(ID);
        });
        this.state.timeoutIDs = [];
    }
    resetArray() {
        this.updateStatus("");
        this.stopVisualiser();
        this.toggleSliders("on");
        const array = [];
        for (let i = 0; i < this.state.numberOfElements; i++) {
            array.push(randomIntFromInterval(5, this.state.upperBound)); //Bar of 5 or below is too small for the screen!
        }
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let item of arrayBars)
            item.style.backgroundColor = PRIMARY_COLOUR;
        this.setState({array});
        this.state.sortStarted = false;
    }
    toggleSliders(toggle) {
        const sliders = document.getElementsByClassName("slider");
        const buttons = document.getElementsByClassName("VisualiserButton");
        if (toggle === "off") {
            for (let item of sliders) {
                item.disabled = true;
                item.style.opacity = 0.5;
            }
            for (let item of buttons)
                item.style.opacity = 0.5;
        }
        else if (toggle === "on") {
            for (let item of sliders) {
                item.disabled = false;
                item.style.opacity = 1.0;
            }
            for (let item of buttons)
                item.style.opacity = 1.0;
        }
    }
    updateStatus(statusUpdate) {
        document.getElementsByClassName('StatusWindowText')[0].innerHTML = `${statusUpdate}`;
    }
    mergeSort() {
        this.updateStatus("Merge Sorting...");
        this.toggleSliders("off");
        this.state.sortStarted = true;
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        let id;
        for (let i = 0; i < animations.length; ++i) {
            const [eleOne, eleTwo] = animations[i]; //Get pair from each index of animations array
            if (i % 3 !== 2) { //Every 3rd element is a swap animation
                const colour = i % 3 === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                id = setTimeout(() => {
                    arrayBars[eleOne].style.backgroundColor = colour;
                    arrayBars[eleTwo].style.backgroundColor = colour;
                }, i * this.state.animationSpeed);
            } else { //Swap animation
                id = setTimeout(() => {
                    arrayBars[eleOne].style.height = `${eleTwo}px`;
                }, i * this.state.animationSpeed);
            }
            this.state.timeoutIDs.push(id);
        }
        id = setTimeout(() => {
            this.updateStatus("Merge Sort Complete!");
            for (let item of arrayBars)
            item.style.backgroundColor = "#DA70D6";
        }, this.state.animationSpeed * animations.length);
        this.state.timeoutIDs.push(id);
    }
    bubbleSort() {
        this.toggleSliders("off");
        this.updateStatus("Bubble Sorting...");
        this.state.sortStarted = true;
        const animations = getBubbleSortAnimations(this.state.array);
        let id;
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; ++i) { //Loop the whole animations array
            const [eleOne, eleTwo] = animations[i]; //Get pair from each index of animations array
            if (eleOne === eleTwo - 1) { //If pair are indices
                const colour = i % 2 === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                id = setTimeout(() => { //Colour change & revert animations ALWAYS adjacent in array, so % 2 to distinguish 
                    arrayBars[eleOne].style.backgroundColor = colour; //'select' values being compared by changing them red
                    arrayBars[eleTwo].style.backgroundColor = colour; //'unselect' values not being compared by changing them turquoise
                }, i  * this.state.animationSpeed);
            }
            else {  //If pair is an index plus numeric value
                id = setTimeout(() => { //Change height of bar according to numeric value at index
                    arrayBars[eleOne].style.height = `${eleTwo}px`;
                }, i * this.state.animationSpeed);
            }
            this.state.timeoutIDs.push(id);
        }
        id = setTimeout(() => { //This will trigger at the same time the final animation does
            this.updateStatus("Bubble Sort Complete!");
            for (let item of arrayBars)
            item.style.backgroundColor = "#DA70D6";
        }, this.state.animationSpeed * animations.length);
        this.state.timeoutIDs.push(id);
    }
    quickSort() {
        this.toggleSliders("off");
        this.updateStatus("Quick Sorting...");
        this.state.sortStarted = true;
        const animations = getQuickSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        let id;
        let flagred = 0, flaggreen = 0;
        for (let i = 0; i < animations.length; ++i) {
            const [eleOne, eleTwo] = animations[i];
            if (animations[i].length === 2) {
                flagred++;
                const colour = flagred % 2 !== 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                id = setTimeout(() => {
                    arrayBars[eleOne].style.backgroundColor = colour;
                    arrayBars[eleTwo].style.backgroundColor = colour;
                }, i * this.state.animationSpeed);
            }
            else if (animations[i].length === 1) {
                flaggreen++;
                const colour = flaggreen % 2 !== 0 ? "green" : PRIMARY_COLOUR;
                id = setTimeout(() => {
                    arrayBars[eleOne].style.backgroundColor = colour;
                }, i * this.state.animationSpeed);
            }
            else {
                id = setTimeout(() => {
                    arrayBars[eleOne].style.height = `${eleTwo}px`
                }, i * this.state.animationSpeed);
            }
            this.state.timeoutIDs.push(id);
        }
        id = setTimeout(() => {
            this.updateStatus("Quick Sort Complete!");
            for (let item of arrayBars)
                item.style.backgroundColor = "#DA70D6";
        }, this.state.animationSpeed * animations.length);
        this.state.timeoutIDs.push(id);
    }
    heapSort() {
        this.toggleSliders("off");
        this.updateStatus("Heap Sorting...");
        this.state.sortStarted = true;
        const animations = getHeapSortAnimations(this.state.array);
        let id;
        for (let i = 0; i < animations.length; ++i) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [eleOne, eleTwo] = animations[i];
            if (animations[i].length === 3) {
                const colour = i % 2 === 0 ? SECONDARY_COLOUR : PRIMARY_COLOUR;
                id = setTimeout(() => {
                    arrayBars[eleOne].style.backgroundColor = colour;
                    arrayBars[eleTwo].style.backgroundColor = colour;
                }, i * this.state.animationSpeed);
            }
            else if (animations[i].length === 4) {
                id = setTimeout(() => {
                    arrayBars[eleOne].style.height = `${eleTwo}px`;
                    arrayBars[eleOne].style.backgroundColor = "#DA70D6";
                }, i * this.state.animationSpeed);
            }
            else {
                id = setTimeout(() => {
                    arrayBars[eleOne].style.height = `${eleTwo}px`;
                }, i * this.state.animationSpeed);
            }
            this.state.timeoutIDs.push(id);
        }
        id = setTimeout(() => {
            this.updateStatus("Heap Sort Complete!");
        }, this.state.animationSpeed * animations.length);
        this.state.timeoutIDs.push(id);
    }
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
          const array = [];
          const length = randomIntFromInterval(1, 1000);
          for (let i = 0; i < length; i++) {
            array.push(randomIntFromInterval(-1000, 1000));
          }
          const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
          const HeapSortedArray = getHeapSortAnimations(array.slice());
          console.log(arraysAreEqual(javaScriptSortedArray, HeapSortedArray));
        }
    }
    render() {
        const array = this.state.array;
        return (
            <div className="arrayContainer">
                <div className="VisualiserBars">
                    {array.map((value, index) => {
                        return (<div 
                        className="array-bar" 
                        key={index}
                        style={{backgroundColor: PRIMARY_COLOUR, height: `${value}px`, width: `${(document.getElementsByClassName('VisualiserBars')[0].offsetWidth) / this.state.numberOfElements - 2.2}px`}}>
                        </div>);
                    })}
                </div>
                <div className="VisualiserButtons">
                    <div className="StatusWindow">
                        <p className="StatusWindowText"></p>
                    </div>
                   
                    <div className="range-header">
                        <span className="range-title">Speed</span>
                        <span id="speed-value">90</span>
                    </div>
                    <input type="range" 
                        min="1" 
                        max="100"
                        defaultValue={this.state.animationSpeed}  
                        className="slider"
                        step="1" //20 - e.target.value since this is just how the direction of range sliders work
                        onChange={(e) => {this.state.animationSpeed = (101 - e.target.value) * 2;
                                    document.getElementById('speed-value').innerHTML = `${e.target.value}`;}} />
                    <div className="range-header">
                        <span className="range-title">Elements</span>
                        <span id="elements-value">100</span>
                    </div>
                    <input type="range" 
                        min="10" 
                        max="150"
                        defaultValue="100"  
                        className="slider"
                        onChange={(e) => {this.state.numberOfElements = e.target.value;
                            this.resetArray();
                            document.getElementById('elements-value').innerHTML = `${e.target.value}`}} />
                     <div className="range-header">
                        <span className="range-title">Range</span>
                        <span id="bound-value">600</span>
                    </div>
                    <input type="range" 
                        min="50" 
                        max="650"
                        defaultValue="600"  
                        className="slider" 
                        onChange={(e) => {this.state.upperBound = e.target.value;
                            this.resetArray();
                            document.getElementById('bound-value').innerHTML = `${e.target.value}`}} />
                    <button type="button" className="ResetButton" onClick={() => this.resetArray(this.state.upperBound)}>Reset</button>
                    <button type="button" className="VisualiserButton" onClick={() => this.state.sortStarted === false ? this.mergeSort() : this.updateStatus("Please reset!")}>Merge Sort</button>
                    <button type="button" className="VisualiserButton" onClick={() => this.state.sortStarted === false ? this.bubbleSort() : this.updateStatus("Please reset!")}>Bubble Sort</button>
                    <button type="button" className="VisualiserButton" onClick={() => this.state.sortStarted === false ? this.quickSort() : this.updateStatus("Please reset!")}>Quick Sort</button>
                    <button type="button" className="VisualiserButton" onClick={() => this.state.sortStarted === false ? this.heapSort() : this.updateStatus("Please reset!")}>Heap Sort</button>
                    
                    {/*<button type="button" className="VisualiserButton" onClick={() => this.stopVisualiser()}>STOP</button>*/}
                    {/*<button type="button" className="VisualiserButton" onClick={() => this.testSortingAlgorithms()}>Test</button>*/}
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
} 

export default SortingVisualiser;

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
}