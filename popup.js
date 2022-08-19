 // read query params from URL
 const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});  

// determine if params exist
let lblText = "Please choose labels to filter and come back here to save them"
if (params == null) {
  lblText = params.label
}

// set label text
let label = document.getElementById("selectedLabels");
label.innerText = lblText

// add event listener to button
let btn = document.getElementById("initButton");
btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: onClick,
  });
});

function onClick() {
  // read query params from URL
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });    
  console.log(params.label)

  // set value in storage
  chrome.storage.sync.set({key: "ABC"});
  
  // get value from storage
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
  });

  // set query params without reload
  // if ('URLSearchParams' in window) {
  //     var searchParams = new URLSearchParams(window.location.search)
  //     searchParams.set("label", "API");
  //     var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
  //     history.pushState(null, '', newRelativePathQuery);
  // }

  // set query params with reload
  if ('URLSearchParams' in window) {
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("label", "API");
    window.location.search = searchParams.toString();
  }
}