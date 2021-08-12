document.addEventListener('DOMContentLoaded', function () {

    let detectLanguagesSelect = document.getElementById("cmt-default-detect-language"); 
    let translateLanguagesSelect = document.getElementById("cmt-default-translate-language"); 

    let default_option = document.createElement('option');
    default_option.title = "Detect Language";
    default_option.innerHTML = "Detect Language";
    default_option.value = "auto";

    detectLanguagesSelect.appendChild(default_option);
    let iso_codes = new IsoCodes();
    iso_codes = iso_codes.iso_codes;
    for (const iso_code in iso_codes) {
        if (iso_codes.hasOwnProperty(iso_code)) {
            let option_detect = document.createElement('option');
            option_detect.value = iso_code;
            let iso_code_name = iso_codes[iso_code].name;
            option_detect.title = iso_code_name
            iso_code_name = (iso_code_name.length > 13) ? iso_code_name.substring(0, 13) + "..." : iso_code_name;
            option_detect.innerHTML = iso_code_name;
            let option_translate = option_detect.cloneNode();
            option_translate.innerHTML = iso_code_name;
            detectLanguagesSelect.appendChild(option_detect);
            translateLanguagesSelect.appendChild(option_translate);    
        }
    }

    chrome.storage.local.get(['defaultIntialLanguage', 'defaultTranslateLanguage'], function(data) {
        defaultIntialLanguage =  data.defaultIntialLanguage
        defaultTranslateLanguage = data.defaultTranslateLanguage
        detectLanguagesSelect.value = defaultIntialLanguage
        translateLanguagesSelect.value = defaultTranslateLanguage

    });

    document.getElementById("cmt-default-detect-language").addEventListener('change', function(event) {
        chrome.storage.local.set({
            defaultIntialLanguage: event.target.value
        });
    });
    
    document.getElementById("cmt-default-translate-language").addEventListener('change', function(event) {
        chrome.storage.local.set({
            defaultTranslateLanguage: event.target.value
        });
    });

});




