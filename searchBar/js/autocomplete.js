var newDiv = document.getElementById("divBackground");
var divSearch = document.createElement("div");
var option = document.createElement("div");
var inputSearch = document.createElement("input");
var resultSuggest = document.createElement("div");
inputSearch.autofocus = true;

divSearch.id = "divSearch";
newDiv.appendChild(divSearch)

searchBar.addEventListener("click", function() {
    newDiv.style.display = "block"
});

newDiv.addEventListener("click", function(event) {
    if (event.target === newDiv) {
        newDiv.style.display = "none";
        inputSearch.value = "";
        updateResults([])
    }
});

option.id = "optionSelected";
const optionContent = ["TẤT CẢ","ẢNH","VIDEO","TIN TỨC"];
let selectedOptionIndex = 2;
let typeSearch;

function setTypeSearch(key){
    switch (key) {
        case 1:
            typeSearch = '&type=image';
            break;
        case 2:
            typeSearch = '&type=video';
            break;
        case 3:
            typeSearch = '&type=news';
            break;
        default:
            typeSearch = '';
            break;
    }
}


for (var i = 0; i < optionContent.length; i++) {
    var span = document.createElement("span");
    span.textContent = optionContent[i];

    if (i === selectedOptionIndex){
        span.classList.add("selected");
    }

    span.addEventListener("click", function(event) {
        let selectedIndex = optionContent.indexOf(event.target.textContent);
        for (var j = 0; j < optionContent.length; j++) {
            option.children[j].classList.remove("selected");
        }
        event.target.classList.add("selected");
        selectedOptionIndex = selectedIndex;
        setTypeSearch(selectedOptionIndex);
    })

    option.appendChild(span);
}

divSearch.appendChild(option)

divSearch.appendChild(inputSearch)

divSearch.appendChild(resultSuggest)

resultSuggest.className = 'resultSuggest';

resultSuggest.style.display = "none";

inputSearch.addEventListener("input", function() {
    var inputValue = inputSearch.value;
    if(inputValue){
        resultSuggest.style.display = "block";
        fetch(`https://api.weoja.com/v1/search/suggestions?q=${inputValue}&setLang=en&struct=BING`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Lỗi mạng: ' + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            const result = data.data.suggestionGroups[0].searchSuggestions;
            updateResults(result)
        })
        .catch(function (error) {
            console.error('Lỗi: ' + error);
        });
    }else resultSuggest.style.display = "none";
})

function updateResults(newResults) {
    while (resultSuggest.firstChild) {
        resultSuggest.removeChild(resultSuggest.firstChild);
    }

    if (newResults.length !== 0) {
        newResults.forEach((el) => {
            const divElement = document.createElement('div');
            divElement.classList = "suggestChild";
            divElement.textContent = el.query;
            divElement.addEventListener("click",function(){
                window.open(`https://weoja.com/search?q=${el.query}${typeSearch ? typeSearch : ''}`, '_blank');
            })
            resultSuggest.appendChild(divElement);
        });
    }else resultSuggest.style.display = "none";
}



