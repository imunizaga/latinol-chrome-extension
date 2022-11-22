let officialSiteLink = document.getElementById('officialSiteLink');
let powerButton = document.getElementById('powerButton');

officialSiteLink.onclick = function(element) {
  if (element.target.href !== undefined) {
    chrome.tabs.create({url: element.target.href});
  }
};

function updatePowerButton() {
  chrome.storage.sync.get('enabled', function(data) {
    if (data.enabled) {
      powerButton.innerHTML = 'Is: ON';
      powerButton.classList.remove("off");
    } else {
      powerButton.innerHTML = 'Is: OFF';
      powerButton.classList.add("off");
    }
  });

}

powerButton.onclick = function(element) {
  chrome.storage.sync.get('enabled', function(data) {
    const enabled = !data.enabled;
    chrome.storage.sync.set({enabled: enabled}, function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        updatePowerButton();

        if (enabled) {
          chrome.tabs.sendMessage(tabs[0].id, {type: 'transcribePage'});
        } else {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  });
};

updatePowerButton();
