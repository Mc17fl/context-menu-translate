chrome.runtime.onInstalled.addListener( () => {
	chrome.storage.local.set({
		defaultDetectLanguage: "auto"
	});
	chrome.storage.local.set({
		defaultTranslateLanguage: "en"
	});
});

chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
	if ( 'cmt_translate' === info.menuItemId ) {
		let translation_text = info.selectionText.trim();
		chrome.storage.local.get(['defaultDetectLanguage', 'defaultTranslateLanguage'], function(data) {
			chrome.tabs.create({ url: "https://translate.google.com/?sl="+data.defaultDetectLanguage+"&tl="+data.defaultTranslateLanguage+"&text="+translation_text+"&op=translate" });
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
