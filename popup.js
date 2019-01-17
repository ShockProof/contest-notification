let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let opt = {
    type: "basic",
    title: "First Notification",
    message: "hello notification",
    // iconUrl: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png"
    iconUrl: "./images/get_started128.png"
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    chrome.notifications.create("ShockProof"+Math.random(), opt, function() {
      console.log("notification created");
    });
  }
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};