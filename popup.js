let btn = document.getElementById("initButton");

// set label text
let label = document.getElementById("selectedLabels");
label.innerText = "jdosjaoisa"

btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: sayHi,
  });
});

function sayHi() {
  console.log("HI")

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });    
  console.log(params.label)

  let key = "Key"
  let value = "TEST"
  // chrome.storage.sync.set({key: value}, function() {
  //   console.log('Value is set to ' + value);
  // });
    
  chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
  });


  document.addEventListener("click", function(){
    console.log("CLICKED")
  });


  // set query params without reload
  if ('URLSearchParams' in window) {
      var searchParams = new URLSearchParams(window.location.search)
      searchParams.set("label", "API");
      var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      history.pushState(null, '', newRelativePathQuery);
  }
  // set query params with reload
  // if ('URLSearchParams' in window) {
  //   var searchParams = new URLSearchParams(window.location.search);
  //   searchParams.set("label", "API");
  //   window.location.search = searchParams.toString();
  // }
}


//data-test-id="filters.common.ui.list.menu.list"