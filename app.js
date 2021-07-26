

const tempoDisplay = document.querySelector('.value');
const tempoLebel = document.querySelector('.tempomarking')
const decreaseTempoBtn = document.querySelector('.decreasetempo');
const increaseTempoBtn = document.querySelector('.increasetempo');
const tempoSlider = document.querySelector('.form-range');
const decreaseBeats= document.querySelector('.decreasebeat');
const increaseBeat =document.querySelector('.increasebeat');
const measureCount =document.querySelector('.rythm');
const startStop = document.querySelector('.startstop');


const firstClick = new Audio('click1.mp3');
const secondClick = new Audio('click2.mp3');





let bpm="160";
let beatsPerMeasure = 4;
let count = 0;
let running = false;
let tempoLebel1= 'Lively and fast';

decreaseTempoBtn.addEventListener('click',()=> {
    if(bpm<=20) {return};
    bpm--;
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;updateMetronome();
}
);
increaseTempoBtn.addEventListener('click',()=> {
    if(bpm>=300) {return};
    bpm++;
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    updateMetronome();
}
);

tempoSlider.addEventListener('input',()=>{
    bpm = tempoSlider.value;
    tempoDisplay.textContent=bpm;
    tempoSlider.value = bpm;
    updateMetronome();
}
);
decreaseBeats.addEventListener('click',()=>{
    if(beatsPerMeasure <=1 ) {return};
    beatsPerMeasure--;
    measureCount.textContent=beatsPerMeasure;
    count = 0;

}
);
increaseBeat.addEventListener('click',()=>{
    if(beatsPerMeasure>=12) {return};
    beatsPerMeasure++;
    measureCount.textContent=beatsPerMeasure;
    count = 0;
}
);


startStop.addEventListener('click', ()=> {
    count = 0;
    if(!running){
        metronome.start();
        running = true;
        startStop.textContent = 'STOP';
    }
    else{
        metronome.stop();
        running = false;
        startStop.textContent = 'START';
    }
}
);

function updateMetronome(){
    metronome.timeInterval = 60000/bpm;
    if (bpm <= 24 ){tempoLebel='Very,very slow'};
    if (bpm >23 && bpm <46 ){tempoLebel= 'Very slow'};
    if (bpm >45 && bpm<60 ){tempoLebel='Slow'};
    if (bpm >59 && bpm<65 ){tempoLebel='Rather slow and broad'};
    if (bpm >64 && bpm<76 ){tempoLebel='Slighly faster'}
    if (bpm >75 && bpm<110 ){tempoLebel='Walking pace'};
    if (bpm >109 && bpm< 120 ){tempoLebel='Moderate'};
    if (bpm >119 && bpm< 156 ){tempoLebel='Fast, quick and bright'};
    if (bpm >155 && bpm<172 ){tempoLebel='Lively and fast'};
    if (bpm >171 && bpm<176 ){tempoLebel='very fast'};
    if (bpm >175 && bpm<200 ){tempoLebel='Very, very fast'};
    if (bpm >=200 ){tempoLebel='Even faster than presto'}
    tempoLebel.textContent = tempoLebel1;
}


function playClick() {
    console.log(count);
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count === 0) {
        firstClick.play();
        firstClick.currentTime = 0;
    } else {
        secondClick.play();
        secondClick.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000/bpm, {immediate: true});


// timer construction
function Timer(callback, timeInterval,options){
    this.timeInterval = timeInterval;
    
    this.start = () =>{
        this.expected = Date.now() + this.timeInterval;

        this.theTimeout = null;

        if(options.immediate){callback();}

        this.timeout = setTimeout(this.round, this.timeInterval);
        console.log('timer started');
    }


    this.stop = () => {
        clearTimeout(this.timeout);
        console.log('timer stopped')
    }


    this.round= () =>{
        console.log('timeout',this.timeout);
        let drift = Date.now() - this.expected;
        if (drift>this.timeInterval) { if (options.errorCallback){options.errorCallback}}

        callback();
        this.expected += this.timeInterval;
        console.log('drift:',drift);
        console.log('Next round time interval:', this.timeInterval - drift);
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
}








