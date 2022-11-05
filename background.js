chrome.webNavigation.onCompleted.addListener(async function() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        console.log(url)
        
        fetch('http://127.0.0.1:8000/verify/' + url, { mode: 'no-cors'}).then((response) => {
            console.log(response.status)
            if (response.status === 200) {
                chrome.action.setIcon({ path: "shield.png" })
            } else if (response.status === 422) {
                chrome.action.setIcon({ path: "unsafe.png" })
            } 
            else {
                chrome.action.setIcon({ path: "shield-empty.png" })
            }
        })
        .catch((error) => {
            chrome.action.setIcon({ path: "warning.png" })
        })
        
    });
    
});
