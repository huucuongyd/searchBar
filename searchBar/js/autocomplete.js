var newDiv = document.getElementById("divBackground");
var divSearch = document.createElement("div");
var option = document.createElement("div");
var divInputSearch = document.createElement("div");
divInputSearch.id = "divInputSearch";
var divInputSearchPlus = document.createElement("div");
divInputSearchPlus.className = 'divInputSearchPlus';
var inputSearch = document.createElement("input");
var resultSuggest = document.createElement("div");
inputSearch.autofocus = true;
inputSearch.placeholder = "Typing...";

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
const optionContent = ["All","Images","News","Videos"];
const urlImage = ['/home/cuong/aaaaa/searchBar/assets/All.svg','/home/cuong/aaaaa/searchBar/assets/Images.svg','/home/cuong/aaaaa/searchBar/assets/News.svg','/home/cuong/aaaaa/searchBar/assets/Videos.svg']
let selectedOptionIndex = 0;
let typeSearch;

function setTypeSearch(key){
    switch (key) {
        case 1:
            typeSearch = '&type=image';
            break;
        case 2:
            typeSearch = '&type=news';
            break;
        case 3:
            typeSearch = '&type=video';
            break;
        default:
            typeSearch = '';
            break;
    }
}


for (var i = 0; i < optionContent.length; i++) {
    var divSellect = document.createElement('div');
    divSellect.className = 'divSellect';
    var span = document.createElement("span");
    span.textContent = optionContent[i];

    var iconButton = document.createElement('img')
    iconButton.src = urlImage[i]
    if (i === selectedOptionIndex){
        divSellect.classList.add("selected");
    }

    var iconArrow = document.createElement('img');
    iconArrow.src = '/home/cuong/aaaaa/searchBar/assets/iconArrow.svg';
    iconArrow.className = 'iconArrow';

    divSellect.addEventListener("click", function(event) {
        let selectedIndex = optionContent.indexOf(event.target.textContent);
        for (var j = 0; j < optionContent.length; j++) {
            if(selectedIndex === j){
                option.children[j].classList.add("selected")
            }else option.children[j].classList.remove("selected");
        }
        selectedOptionIndex = selectedIndex;
        setTypeSearch(selectedOptionIndex);
    })
    divSellect.appendChild(iconButton);
    divSellect.appendChild(span);
    divSellect.appendChild(iconArrow)
    option.appendChild(divSellect);
}

var iconX = document.createElement('img')
iconX.src = '/home/cuong/aaaaa/searchBar/assets/x.svg';
iconX.style.height = '14px';
divInputSearchPlus.appendChild(inputSearch);

inputSearch.addEventListener('focus', () => {
    inputContainer.classList.add('focused');
});
  
inputSearch.addEventListener('blur', () => {
    inputContainer.classList.remove('focused');
});

divInputSearchPlus.appendChild(iconX);

divInputSearch.appendChild(divInputSearchPlus);

divSearch.appendChild(divInputSearch);

var titleResultSuggest = document.createElement("div");
titleResultSuggest.className = "titleResultSuggest"
titleResultSuggest.textContent = "RECENTS SEARCHES";
titleResultSuggest.style.display = 'none';

divSearch.appendChild(titleResultSuggest);


divSearch.appendChild(resultSuggest)

var titleTyping = document.createElement('div');
titleTyping.textContent = `Search for "Typing" in`;
titleTyping.className = "titleTyping"

var divider = document.createElement('div');
divider.className = "divider";

divSearch.appendChild(divider);
divSearch.appendChild(titleTyping);

divSearch.appendChild(option);

resultSuggest.className = 'resultSuggest';

resultSuggest.style.display = "none";

inputSearch.addEventListener("input", function() {
    var inputValue = inputSearch.value;
    if(inputValue){
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
    }else {
        resultSuggest.style.display = "none";
        titleResultSuggest.style.display = "none";
    }
})

function updateResults(newResults) {
    while (resultSuggest.firstChild) {
        resultSuggest.removeChild(resultSuggest.firstChild);
    }

    if (newResults.length !== 0) {
        resultSuggest.style.display = "block";
        titleResultSuggest.style.display = "block";
        newResults.forEach((el) => {
            const divElement = document.createElement('div');
            divElement.classList = "suggestChild";
            const imgSearchIcon = document.createElement('img');
            imgSearchIcon.src = '/home/cuong/aaaaa/searchBar/assets/icon.svg';
            divElement.appendChild(imgSearchIcon);

            const divTextContent = document.createElement('div');
            divTextContent.className = 'divTextContent';
            divTextContent.textContent = el.query;

            divElement.appendChild(divTextContent);
            divElement.addEventListener("click",function(){
                window.open(`https://weoja.com/search?q=${el.query}${typeSearch ? typeSearch : ''}`, '_blank');
            });
            resultSuggest.appendChild(divElement);

            const imgVectorIcon = document.createElement('img');
            imgVectorIcon.src = '/home/cuong/aaaaa/searchBar/assets/Vector.svg';
            imgVectorIcon.style.height = '10px'
            divElement.appendChild(imgVectorIcon);
        });
    }else {
        resultSuggest.style.display = "none";
        titleResultSuggest.style.display = "none";
    }
}