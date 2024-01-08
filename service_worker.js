//After installing extension, set basic keys (O&P) for speedup and slowdown and set FlixSpeedMore default option.
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({speedup: '80'}, function() {
      console.log('speedup shortkey is set.');
    })
    chrome.storage.sync.set({slowdown: '79'}, function() {
        console.log('slowdown shortkey is set.');
    })
    chrome.storage.sync.set({flixControls: true}, function() {
        console.log('controls setting for videoplayer is set.');
    })
    // chrome.storage.sync.set({flixSpeedOnly: true}, function() {
    //     console.log('flixSpeedOnly is set.');
    // })
});

//Inject flixSpeed logic into active tab when it equals Netflix.
chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.scripting.executeScript({
        target: {tabId: details.tabId},
        files: ['flixSpeed.js'],
    });
    chrome.scripting.insertCSS({
        target: {tabId: details.tabId},
        files: ['css/flixSpeed.css'],
    });
}, {url: [{hostContains: 'netflix.com'}] });

//Check when the url is dynamically changed on Netflix (usually video being changed), and send message to flixSpeed.js
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.sendMessage(details.tabId, {changedHistoryState: true}, function(response) {
        //... response handling here
    });
}, {url: [{hostContains: 'netflix.com'}] });