var isRunning = false
var xprediction;
var yprediction;

function startGaze(){
    webgazer.setGazeListener(function(data, elapsedTime) {
        if (data == null) {
            return;
        }
        var xprediction = data.x; //these x coordinates are relative to the viewport
        var yprediction = data.y; //these y coordinates are relative to the viewport
    }).begin();

    webgazer.showVideo(false);

}

function findTrack(){
    return [xprediction,yprediction];
}

function endGaze(){
    console.log(webgazer.getVideoElementCanvas());
    webgazer.end();
    isRunning = false;
}

function setWebcam(){
    
    if (isRunning){
        webgazer.showVideo(true);
        isRunning = !isRunning;
    }
    else{
        webgazer.showVideo(false);
        isRunning = !isRunning;
    }
}

function makeNarration(){
    const rects = findBoxes();
    const track = findTrack()
    var words = "";

    for(const x of rects){
        if(track[0] > x[1] && track[1] < x[3]){
            if(track[1] > x[0] && track[2] < x[2]){
                words = x[4].innerHTML;
                break
            }
        
        } 
    }   
    if(words != ""){
        var msg = new SpeechSynthesisUtterance();
        msg.txt = words;
        window.speechSynthesis.speak(msg);
    }

}


function findBoxes(){
    const rects = document.getElementsByClassName("readable-statement");
    const lst = []

    for(const x of rects){
        console.log(x.innerHTML);
        var rect = x.getBoundingClientRect()
        lst.push([rect.top, rect.right, rect.bottom, rect.left, x]);
    }

    return lst


}

function highlight(){
    const rects = findBoxes();
    const track = findTrack()
    var item = "";

    for(const x of rects){
        if(track[0] > x[1] && track[1] < x[3]){
            if(track[1] > x[0] && track[2] < x[2]){
                item = x[4]
                break
            }
        
        } 
    }   
    
    item.innerHTML.style.color = red;

    





}



document.getElementById("start").addEventListener("click", startGaze);


document.getElementById("end").addEventListener("click", endGaze);

document.getElementById("webcam").addEventListener("click", setWebcam);

document.getElementById("enableNarrator").addEventListener("click", makeNarration);


