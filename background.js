chrome.runtime.onInstalled.addListener( () => {
    chrome.storage.local.set({
        defaultIntialLanguage: "auto"
    });
    chrome.storage.local.set({
        defaultTranslateLanguage: "en"
    });
});

chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
  if ( 'cmt_translate' === info.menuItemId ) {
    let translation_text = info.selectionText.trim();

    chrome.storage.local.get(['defaultIntialLanguage', 'defaultTranslateLanguage'], function(data) {
      console.log(data.defaultIntialLanguage)
      console.log(data.defaultTranslateLanguage)
       chrome.tabs.create({ url: "https://translate.google.com/?sl="+data.defaultIntialLanguage+"&tl="+data.defaultTranslateLanguage+"&text="+translation_text+"&op=translate" });

    });
  }
});

chrome.runtime.onInstalled.addListener( () => {
    chrome.contextMenus.create({
      id: 'cmt_translate',
      title: "Translate: \"%s\"", 
      contexts:[ "selection" ]
    });
});
  