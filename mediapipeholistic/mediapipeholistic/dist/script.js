

var config = { locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
    } };
// Our input frames will come from here.

var videoElement = document.getElementsByClassName('input_video')[0];
var canvasElement = document.getElementsByClassName('output_canvas')[0];
var controlsElement = document.getElementsByClassName('control-panel')[0];
var canvasCtx = canvasElement.getContext('2d');
var blank = document.getElementById('blank');
var firstRound=true;
var res={}
var id=0;
var key=0;
var myInterval;
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
var fpsControl = new FPS();
// Optimization: Turn off animated spinner after its hiding animation is done.
var spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};

let activeEffect = 'mask';

function onResults(results) {
    res[id]=results;
    id++
    
}
var holistic = new Holistic(config);
holistic.onResults(onResults);

new ControlPanel(controlsElement, {
    selfieMode: false,
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    effect: 'background',
   
})
    .add([
    
    fpsControl,
    new Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
    new SourcePicker({
        
        onSourceChanged: () => {
            // Resets because the pose gives better results when reset between
            // source changes.
            holistic.reset();
        },
        onFrame: async (input) => {
            var mzminutes = Math.floor(input.duration / 60);
            var mzseconds = Math.floor(input.duration - (mzminutes * 60));
            var duration="0"+mzminutes+":0"+mzseconds;
          
           var time= document.getElementsByClassName("video-time")[0].innerHTML;
           
           let width=480
           let height=480
           
            canvasElement.width = width;
            canvasElement.height = height;
            await holistic.send({ image: input });
          
             if(time==duration){
                if(firstRound){firstRound=false}
               else{
                   input.pause();
                   store("YOU",res)
                   console.log("stored!")
                  //myInterval= setInterval(function(){draw(res[key])}, 100);
              
            }}
        },
    }),
    new Slider({
        title: 'Model Complexity',
        field: 'modelComplexity',
        discrete: ['Lite', 'Full', 'Heavy'],
    }),
    new Toggle({ title: 'Smooth Landmarks', field: 'smoothLandmarks' }),
    new Toggle({ title: 'Enable Segmentation', field: 'enableSegmentation' }),
    new Toggle({ title: 'Smooth Segmentation', field: 'smoothSegmentation' }),
    new Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
    }),
    new Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
    }),
    new Slider({
        title: 'Effect',
        field: 'effect',
        discrete: { 'background': 'Background', 'mask': 'Foreground' },
    }),
])
    .on(x => {
    var options = x;
    videoElement.classList.toggle('selfie', options.selfieMode);
    activeEffect = x['effect'];
    holistic.setOptions(options);
});