document.onload = getTabs();

function getTabs(){
    chrome.tabs.query({}, function(tabs){
        alert(tabs[0].url);
    });


};
