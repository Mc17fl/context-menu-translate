/*
* Initial Setup of Select fields options and default language options/stored language options
*/
document.addEventListener('DOMContentLoaded', function () {

    let detectLanguagesSelect = document.getElementById("cmt-default-detect-language"); 
    let translateLanguagesSelect = document.getElementById("cmt-default-translate-language"); 
    let defaultOption = document.createElement('option');
    defaultOption.title = "Detect Language";
    defaultOption.innerHTML = "Detect Language";
    defaultOption.value = "auto";

    detectLanguagesSelect.appendChild(defaultOption);
    let isoCodes = new IsoCodes();
    isoCodes = isoCodes.isoCodes;
    for (const isoCode in isoCodes) {
        if (isoCodes.hasOwnProperty(isoCode)) {
            let optionDetect = document.createElement('option');
            let isoCodeName = isoCodes[isoCode].name;
            optionDetect.value = isoCode;
            optionDetect.title = isoCodeName;
            isoCodeName = (isoCodeName.length > 13) ? isoCodeName.substring(0, 13) + "..." : isoCodeName;
            optionDetect.innerHTML = isoCodeName;
            let optionTranslate = optionDetect.cloneNode();
            optionTranslate.innerHTML = isoCodeName;
            detectLanguagesSelect.appendChild(optionDetect);
            translateLanguagesSelect.appendChild(optionTranslate);    
        }
    }

    chrome.storage.local.get(['defaultDetectLanguage', 'defaultTranslateLanguage'], function(data) {
        let detectLanguagesSelect = document.getElementById("cmt-default-detect-language"); 
        let translateLanguagesSelect = document.getElementById("cmt-default-translate-language"); 
        defaultDetectLanguage =  data.defaultDetectLanguage;
        defaultTranslateLanguage = data.defaultTranslateLanguage;
        detectLanguagesSelect.value = defaultDetectLanguage;
        translateLanguagesSelect.value = defaultTranslateLanguage;

        let detectLanguageInputText = detectLanguagesSelect.options[detectLanguagesSelect.selectedIndex].text;
        let translateLanguageInputText = translateLanguagesSelect.options[translateLanguagesSelect.selectedIndex].text;
        let detectLanguagesInput = document.getElementById("cmt-detect-language-search"); 
        let translateLanguagesInput = document.getElementById("cmt-translate-language-search"); 
        detectLanguagesInput.value = detectLanguageInputText;
        translateLanguagesInput.value = translateLanguageInputText;
    });
});




