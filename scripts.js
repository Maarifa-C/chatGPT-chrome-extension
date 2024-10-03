var startTime; 
var stopwatchInterval;
var elapsedPausedTime = 0;

function startStopwatch() {
  if (!stopwatchInterval) {
    startTime = new Date().getTime() - elapsedPausedTime; 
    stopwatchInterval = setInterval(updateStopwatch, 1000);
  }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval); 
    elapsedPausedTime = new Date().getTime() - startTime; 
    stopwatchInterval = null; 
  }

  function resetStopwatch() {
    stopStopwatch(); // stop the interval
    elapsedPausedTime = 0; // reset the elapsed paused time variable
    document.getElementById("stopwatch").innerHTML = "00:00:00"; // reset the display
  }

  function updateStopwatch() {
    var currentTime = new Date().getTime(); // get current time in milliseconds
    var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
    var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
    var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
    var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
    var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); // format display time
    document.getElementById("stopwatch").innerHTML = displayTime; // update the display
  }
  
  function pad(number) {
    // add a leading zero if the number is less than 10
    return (number < 10 ? "0" : "") + number;
  }
    

function log_click(click_target) {
    const str = "M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
    const regex = /d="([^"]+)"/
    const dMatch = click_target.match(regex)
    if (dMatch) {
        const dValue  = dMatch[1];
        if(dValue === str){
            console.log("Sent")
        }
    }

}

// normal event listener
document.addEventListener("click", (event) => {
    log_click(event.target.innerHTML);
});

chrome.identity.getProfileUserInfo({ 'accountStatus': 'ANY' }, function (info) {
    email = info.email;
    console.log(info);
    chrome.runtime.sendMessage({ userInfo: info });

    //document.querySelector('textarea').value = JSON.stringify(info);
});

chrome.identity.getProfileUserInfo(function (info) {
    email = info.email;
    console.log(info);
    //document.querySelector('textarea').value = JSON.stringify(info);
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0]; 
    const url = activeTab.url; 

    if(url === 'https://chatgpt.com/'){
        document.querySelector('textarea').value = JSON.stringify(url);
    } else{

    }
})