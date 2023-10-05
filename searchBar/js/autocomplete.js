var newDiv = document.getElementById("divBackground");
var divSearch = document.createElement("div");
var option = document.createElement("div");
var divInputSearch = document.createElement("div");
divInputSearch.id = "divInputSearch0510";
var divInputSearchPlus = document.createElement("div");
divInputSearchPlus.className = 'divInputSearchPlus0510';
var inputSearch = document.createElement("input");
inputSearch.className = 'inputSearch0510';
var resultSuggest = document.createElement("div");

inputSearch.autofocus = true;
inputSearch.placeholder = 'Type anything...';

divSearch.id = "divSearch0510";
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

option.id = "optionSelected0510";
const optionContent = ["All","Images","News","Videos"];
const urlImage = ['https://raw.githubusercontent.com/huucuongyd/searchBar/main/searchBar/assets/All.svg','https://raw.githubusercontent.com/huucuongyd/searchBar/main/searchBar/assets/Images.svg','https://raw.githubusercontent.com/huucuongyd/searchBar/main/searchBar/assets/News.svg','https://raw.githubusercontent.com/huucuongyd/searchBar/main/searchBar/assets/Videos.svg']
let selectedOptionIndex = 0;
let typeSearch;

var titleTyping = document.createElement('div');
titleTyping.textContent = `Search for "${optionContent[0]}"`;
titleTyping.className = "titleTyping0510"

function setTypeSearch(key){
    titleTyping.textContent = `Search for "${optionContent[key]}"`;
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
    divSellect.className = 'divSellect0510';
    var span = document.createElement("span");
    span.textContent = optionContent[i];

    var iconButton = document.createElement('img')
    iconButton.src = urlImage[i]
    if (i === selectedOptionIndex){
        divSellect.classList.add("selected0510");
    }

    var iconArrow = document.createElement('img');
    iconArrow.src = 'https://raw.githubusercontent.com/huucuongyd/searchBar/main/searchBar/assets/iconArrow.svg';
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
    option.appendChild(divSellect);
}

var iconX = document.createElement('img')
iconX.src = 'https://raw.githubusercontent.com/huucuongyd/searchBar/main/searchBar/assets/x.svg';
iconX.style.height = '14px';
iconX.style.cursor = "pointer";

iconX.addEventListener("click", function(){
    inputSearch.value = "";
    resultSuggest.style.display = "none";
    titleResultSuggest.style.display = "none";
})
divInputSearchPlus.appendChild(inputSearch);

inputSearch.addEventListener('focus', () => {
    divInputSearchPlus.classList.add('focused');
});
  
inputSearch.addEventListener('blur', () => {
    divInputSearchPlus.classList.remove('focused');
});

divInputSearchPlus.appendChild(iconX);

var iconInputSiteSearch = document.createElement('img');
iconInputSiteSearch.src = 'https://raw.githubusercontent.com/huucuongyd/searchBar/main/searchBar/assets/site.svg'

divInputSearch.appendChild(divInputSearchPlus);

if (!window.hasOwnProperty('siteSearchSpecial')) {
    var siteSearchSpecial = '';
}

var divSelectSearchInSpecialSite = document.createElement('div');
divSelectSearchInSpecialSite.className = 'divSelectSearchInSpecialSite0510';
divSelectSearchInSpecialSite.style.display = siteSearchSpecial? 'block':'none';
divSelectSearchInSpecialSite.textContent = `Search results from ${siteSearchSpecial} only`;
var labelSwitchButton = document.createElement('label');
labelSwitchButton.className = 'switch0510';
var inputLabelSwitchButton = document.createElement('input');
inputLabelSwitchButton.type = 'checkbox';
inputLabelSwitchButton.checked = true;
var spanLabelSwitchButton = document.createElement('span');
spanLabelSwitchButton.className = 'slider0510 round'

labelSwitchButton.appendChild(inputLabelSwitchButton);
labelSwitchButton.appendChild(spanLabelSwitchButton);

divInputSearch.appendChild(divSelectSearchInSpecialSite);

var divBorderLabelSwitchButton = document.createElement('div');
divBorderLabelSwitchButton.style.display = siteSearchSpecial ? 'block' : 'none'
divBorderLabelSwitchButton.className = 'divBorderLabelSwitchButton';

divBorderLabelSwitchButton.appendChild(labelSwitchButton);

divInputSearch.appendChild(divBorderLabelSwitchButton);

divSearch.appendChild(divInputSearch);

var checkbox = document.querySelector('.switch0510 input');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        divSelectSearchInSpecialSite.textContent = `Search results from ${siteSearchSpecial} only`;
    } else {
        divSelectSearchInSpecialSite.textContent = `Search results from all domain`;
    }
  });

var titleResultSuggest = document.createElement("div");
titleResultSuggest.className = "titleResultSuggest"
titleResultSuggest.textContent = "RECENTS SEARCHES";
titleResultSuggest.style.display = 'none';

divSearch.appendChild(titleResultSuggest);


divSearch.appendChild(resultSuggest)

var divider = document.createElement('div');
divider.className = "divider0510";

divSearch.appendChild(divider);
divSearch.appendChild(titleTyping);

divSearch.appendChild(option);

resultSuggest.className = 'resultSuggest0510';

resultSuggest.style.display = "none";

inputSearch.addEventListener("input", function() {
    var inputValue = inputSearch.value;
    if(inputValue !== ''){
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
});
inputSearch.addEventListener("keydown", function(event){
    if(event.key === 'Enter' && inputSearch.value !== ''){
        window.open(`https://weoja.com/search?q=${checkbox.checked ? 'site:' + siteSearchSpecial + "+":''}${inputSearch.value}${typeSearch ? typeSearch : ''}`, '_blank');
    }
});

function updateResults(newResults) {
    while (resultSuggest.firstChild) {
        resultSuggest.removeChild(resultSuggest.firstChild);
    }

    if (newResults.length !== 0) {
        resultSuggest.style.display = "block";
        titleResultSuggest.style.display = "block";
        newResults.forEach((el) => {
            const divElement = document.createElement('div');
            divElement.classList = "suggestChild0510";
            const imgSearchIcon = document.createElement('img');
            imgSearchIcon.src = 'https://raw.githubusercontent.com/huucuongyd/searchBar/main/searchBar/assets/icon.svg';
            divElement.appendChild(imgSearchIcon);

            const divTextContent = document.createElement('div');
            divTextContent.className = 'divTextContent0510';
            divTextContent.textContent = el.query;

            divElement.appendChild(divTextContent);
            divElement.addEventListener("click",function(){
                window.open(`https://weoja.com/search?q=${checkbox.checked ? 'site:' + siteSearchSpecial + "+":''}${el.query}${typeSearch ? typeSearch : ''}`, '_blank');
            });
            resultSuggest.appendChild(divElement);

            const imgVectorIcon = document.createElement('img');
            imgVectorIcon.src = 'https://raw.githubusercontent.com/huucuongyd/searchBar/main/searchBar/assets/Vector.svg';
            imgVectorIcon.style.height = '10px'
            divElement.appendChild(imgVectorIcon);
        });
    }else {
        resultSuggest.style.display = "none";
        titleResultSuggest.style.display = "none";
    }
}