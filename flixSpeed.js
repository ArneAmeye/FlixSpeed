let speed = 1;

//Create the feedback notification DOM element (it'll be used by the AddFeedbackContainer function later).
var feedback = document.createElement('div');
feedback.classList.add('FlixSpeed__Feedback')
feedback.innerHTML = `<p class="FlixSpeed__Feedback--speed"><span>1</span>x</p>`

//Listen for messages from background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.changedHistoryState == true){
        if(document.querySelector('.PlayerControls--control-element.video-title') == null && window.location.pathname.indexOf("/watch") > -1 ){
            //Wait for Video element to be added to the DOM, this function then adds our needed elements.
            waitForVideoElementToDisplay('.PlayerControls--control-element.video-title',100);
        }
    }
});

window.addEventListener('keydown', function (e) {
    //only start listening for key events when there is a video element found in the DOM.
    if (document.querySelector('video')) {
        //If no feedback element is found on the video's parent container then attach it.
        CheckFeedbackContainer();

        //Get speedup and slowdown keys from settings (on each keydown because we might have changed settings onpage).
        chrome.storage.sync.get(['speedup'], function (result) {
            //Check if pressed key matches speedup key, then speedup
            if (e.keyCode == result.speedup) {
                speedup();
                e.preventDefault();
            }
        });
        chrome.storage.sync.get(['slowdown'], function (result) {
            //Check if pressed key matches slowdown key, then slowdown
            if (e.keyCode == result.slowdown) {
                slowdown();
                e.preventDefault();
            }
        });

    }
});

window.addEventListener('click', function (e) {
    //only do something when a FlixSpeed control element is clicked.
    if (e.target.classList.contains('FlixSpeed__ControlBtn') || e.target.classList.contains('FlixSpeed__ControlBtn--icon')) {
        //If no feedback element is found on the video's parent container then attach it.
        CheckFeedbackContainer()

        //Depending if container or icon clicked we extract the flixspeed data attribute
        let controlFunction = "";
        if (e.target.classList.contains('FlixSpeed__ControlBtn')) {
             controlFunction = e.target.querySelector('.FlixSpeed__ControlBtn--icon').dataset.flixspeed;
        }else{
            controlFunction = e.target.dataset.flixspeed;
        }

        //Depending on the FlixSpeed control that is clicked we speedup or slowdown
        if (controlFunction == 'slowdown') {
            slowdown();
            e.preventDefault();
        }else if (controlFunction == 'speedup') {
            speedup();
            e.preventDefault();
        }
    }
});

function waitForVideoElementToDisplay(selector, time) {
    if(document.querySelector(selector)!= null) {
        addControls(); //Checks settings and adds controls if applicable
        addFeedbackContainer(); //Add video playback feedback element to DOM
        return;
    }
    else {
        setTimeout(function() {
            waitForVideoElementToDisplay(selector, time);
        }, time);
    }
}

function speedup(){
    speed = document.querySelector('video').playbackRate;
    speed += 0.1
    document.querySelector('video').playbackRate = speed;
    showFeedback();
}

function slowdown(){
    speed = document.querySelector('video').playbackRate;
    speed -= 0.1
    document.querySelector('video').playbackRate = speed;
    showFeedback();
}

function showFeedback(){
    document.querySelector('.FlixSpeed__Feedback--speed span').innerHTML = Math.round(speed * 10) / 10;
    document.querySelector('.FlixSpeed__Feedback').classList.add('showFeedback');
    setTimeout(function(){
        document.querySelector('.FlixSpeed__Feedback').classList.remove('showFeedback');
    }, 2000);
}

function addControls(){
    //Get controls setting to check if user actualy wants the extra controls in the videoplayer
    chrome.storage.sync.get(['flixControls'], function (result) {
        //Check if controls is true, then add them to videoplayer
        if (result.flixControls == true) {

            //Create a slowdown button
            let slowdownBtn = document.createElement('div');
            slowdownBtn.classList.add('FlixSpeed__ControlBtn')
            slowdownBtn.innerHTML = `<img class="FlixSpeed__ControlBtn--icon" data-flixspeed="slowdown" src="${chrome.extension.getURL('images/flixspeed_slowdown.png')}" alt="":></img>`

            //Create a speedup button
            let speedupBtn = document.createElement('div');
            speedupBtn.classList.add('FlixSpeed__ControlBtn')
            speedupBtn.innerHTML = `<img class="FlixSpeed__ControlBtn--icon" data-flixspeed="speedup" src="${chrome.extension.getURL('images/flixspeed_speedup.png')}" alt="":></img>`

            //Insert newly created buttons into videoplayer
            let beforeElement = document.querySelector('.PlayerControls--control-element.video-title');
            beforeElement.parentNode.insertBefore(slowdownBtn, beforeElement);
            beforeElement.parentNode.insertBefore(speedupBtn, beforeElement);
        }
    });
}

function CheckFeedbackContainer(){
    if( document.querySelector('video').parentNode.querySelector('.FlixSpeed__Feedback') == null ){
       addFeedbackContainer();
    }
}

function addFeedbackContainer(){
    document.querySelector('video').parentNode.appendChild(feedback);
}