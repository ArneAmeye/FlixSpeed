//Set useful variables
const SpeedupInput = document.querySelector('.Settings__Speedup--input');
const SlowdownInput = document.querySelector('.Settings__Slowdown--input');
const ControlsCheckbox = document.querySelector('#flixControls');
//const FlixCheckbox = document.querySelector('#FlixSpeedOnly');

//Load settings and show them
chrome.storage.sync.get(['speedup'], function(result) {
    SpeedupInput.placeholder = String.fromCharCode(result.speedup);
});
chrome.storage.sync.get(['slowdown'], function(result) {
    SlowdownInput.placeholder = String.fromCharCode(result.slowdown);
});
chrome.storage.sync.get(['flixControls'], function(result) {
    ControlsCheckbox.checked = result.flixControls;
});
// chrome.storage.sync.get(['flixSpeedOnly'], function(result) {
//     FlixCheckbox.checked = result.flixSpeedOnly;
// });


//Listen for settings changes and store them
SpeedupInput.addEventListener('keydown', function(e) {
    //Get slowdown key from storage to check if it is not equal to our new speedup key
    chrome.storage.sync.get(['slowdown'], function(result) {
        if (e.keyCode != result.slowdown) {
            //All is safe, set speedup key
            chrome.storage.sync.set({speedup: e.keyCode}, function() {});
            SpeedupInput.placeholder = String.fromCharCode(e.keyCode);
        }
    });
    e.preventDefault();
});
SlowdownInput.addEventListener('keydown', function(e) {
    //Get speedup key from storage to check if it is not equal to our new slowdown key
    chrome.storage.sync.get(['speedup'], function(result) {
        if (e.keyCode != result.speedup) {
            //All is safe, set slowdown key
            chrome.storage.sync.set({slowdown: e.keyCode}, function() {});
            SlowdownInput.placeholder = String.fromCharCode(e.keyCode);
        }
    });
    e.preventDefault();
});
ControlsCheckbox.addEventListener('change', function() {
    //Check the checked value of the controls checkbox and store it.
    chrome.storage.sync.set({flixControls: ControlsCheckbox.checked}, function() {});
});
// FlixCheckbox.addEventListener('change', function() {
//     chrome.storage.sync.set({flixSpeedOnly: FlixCheckbox.checked}, function() {});
// });