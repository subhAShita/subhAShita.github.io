let indexUrl = "https://raw.githubusercontent.com/subhAShita/db_toml_md__sa__padya/master/index/";


function showQuote(quoteId) {
    console.log(quoteId);
    if (quoteId) {
        let includeElement = document.querySelector("#quoteInclude");
        let newUrl = includeElement.getAttribute("url");
        newUrl = newUrl.replace(/main\/.+/, `main/${quoteId[0]}/${quoteId[1]}/${quoteId[2]}/${quoteId[3]}/${quoteId[4]}/${quoteId}.md`);
        includeElement.setAttribute("url", newUrl);
    }
}

function setDropdownValuesFromQuery() {
    let filterTypes = ["ratings"];
    for (let i = 0; i < filterTypes.length; i++) {
        let filterType = filterTypes[i];
        let queryValue = module_uiLib.default.query.getParam(filterType) || "*";
        var dropdown = document.getElementById(`dropdown_${filterType}`);
        dropdown.set(queryValue);
    }
    
}

async function getQuotes(filterType, filterValue, filterSet=null) {
    let indexTsv = `${indexUrl}${filterType}/${filterValue}.tsv`;
    // console.log(indexRow.split("\t"), indexTsv);
    return fetch(indexTsv)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = response.text();
            // console.debug(data);
            return data;
        }).then(data => {
            let quotes = data.split('\n');
            if (filterSet) {
                quotes = quotes.filter((quote) => !filterSet.includes(quote));
            }
            return quotes;
        }).catch(error => console.error('There was a problem with the fetch operation:', error));
}

async function getRandomQuote() {
    // TODO : consider transliterating the value and doing   
    //  module_uiLib.default.query.setParamsAndGo();
    let filterTypes = ["ratings"];
    let paramDict = {};
    let quotes = null;
    for (let i = 0; i < filterTypes.length; i++) {
        let filterType = filterTypes[i];
        var dropdown = document.getElementById(`dropdown_${filterType}`);
        let filterValue = dropdown.options[dropdown.selectedIndex].value;
        paramDict[filterType] = filterValue;
        quotes = await getQuotes(filterType, filterValue, quotes);
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    paramDict["queryId"] = randomQuote;
    console.log(paramDict, randomQuote);
    alert(randomQuote);
    // module_uiLib.default.query.setParamsAndGo(paramDict);
}
