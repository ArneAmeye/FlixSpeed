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
    chrome.tabs.executeScript(details.tabId, {
        file: 'flixSpeed.js',
        runAt: 'document_end'
    });
    chrome.tabs.insertCSS(details.tabId, {
        file: 'css/flixSpeed.css',
        runAt: 'document_end'
    });
}, {url: [{hostContains: 'netflix.com'}]
});