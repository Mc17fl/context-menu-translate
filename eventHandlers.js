document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.cmt-language-select').forEach(selectField => {
        selectField.addEventListener('change', event => {
            let selectFieldId = event.target.id;
            if(selectFieldId == "cmt-default-detect-language"){
                chrome.storage.local.set({
                    defaultDetectLanguage: event.target.value
                });
            }else{
                chrome.storage.local.set({
                    defaultTranslateLanguage: event.target.value
                });
            }
            let inputFieldId = selectFieldId == "cmt-default-detect-language" ? "cmt-detect-language-search" : "cmt-translate-language-search";
            let languagesInputField = document.getElementById(inputFieldId); 
            languagesInputField.value = event.target[event.target.selectedIndex].text;
        })
    });

    document.querySelectorAll('.cmt-language-search-field').forEach(inputField => {
        inputField.addEventListener('change', event => {
            if(event.target.value == "" || typeof event.target.value == 'undefined' || typeof event.target.value == null  ){
                let languageSelectId = event.target.id == "cmt-detect-language-search" ? "cmt-default-detect-language" : "cmt-default-translate-language";
                let languagesSelect = document.getElementById(languageSelectId); 
                let detectLanguageInputText = languagesSelect.options[languagesSelect.selectedIndex].text;
                event.target.value = detectLanguageInputText;
            }
        })

    });

    document.getElementById("cmt-detect-language-search").addEventListener('input', function (event) {
        console.log(this.value);
    });

    document.getElementById("cmt-translate-language-search").addEventListener('input', function (event) {
        console.log(this.value);
    });

});