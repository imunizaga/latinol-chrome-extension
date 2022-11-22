var latinol = new Latinol();

function transcribePage(callback) {
  chrome.storage.sync.get('enabled', function(data) {
    if (data.enabled) {
      const lang = document.documentElement.lang || document.head.lang;
      if (lang === "" || /^es\b/.test(lang)) {
        latinol.transcribePage(callback);
      }
    }
  });
}

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch (message.type) {
      case 'transcribePage':
        transcribePage(function(){console.log('done')});
        break;
    }
  }
);

transcribePage();
