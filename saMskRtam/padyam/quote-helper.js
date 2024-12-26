let indexUrl = "https://raw.githubusercontent.com/subhAShita/db_toml_md__sa__padya/master/index/";
let filterTypes = ["ratings", "sources", "topics", "meters", "rasas", "first_letter"];

function dropdownValueMaker(x) {
    let value = `${x.split("\t")[2]}`;
    if (value == "file_key") {
        value = "*";
    }
    return value;
}

function dropdownTextMaker(x) {
    let value = `${x.split("\t")[0]}`;
    if (value == "value") {
        value = "*";
    }
    return value;
}

function showQuote(quoteId) {
    console.log(quoteId);
    if (quoteId) {
        let includeElement = document.querySelector("#quoteInclude");
        let newUrl = includeElement.getAttribute("url");
        newUrl = newUrl.replace(/main\/.+/, `main/${quoteId[0]}/${quoteId[1]}/${quoteId[2]}/${quoteId[3]}/${quoteId[4]}/${quoteId}.md`);
        includeElement.setAttribute("url", newUrl);
    }
}

async function setDropdownValuesFromQuery() {
    console.log("Entering setDropdownValuesFromQuery");
    for (let i = 0; i < filterTypes.length; i++) {
        let filterType = filterTypes[i];
        let queryValue = module_uiLib.default.query.getParam(filterType) || "*";
        module_uiLib.default.navigation.loadDropdownFromTSV(`${indexUrl}${filterType}/_summary.tsv`, `dropdown_${filterType}`, dropdownTextMaker, dropdownValueMaker, (x) => getRandomQuote(), queryValue);
    }
    console.log("Exiting setDropdownValuesFromQuery");
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
                quotes = quotes.filter((quote) => filterSet.includes(quote));
            }
            return quotes;
        }).catch(error => console.error('There was a problem with the fetch operation:', error));
}

async function getRandomQuote() {
    // TODO : consider transliterating the value and doing   
    //  module_uiLib.default.query.setParamsAndGo();
    let paramDict = {};
    let quotes = null;
    for (let i = 0; i < filterTypes.length; i++) {
        let filterType = filterTypes[i];
        var dropdown = document.getElementById(`dropdown_${filterType}`);
        let filterValue = dropdown.options[dropdown.selectedIndex].value;
        paramDict[filterType] = filterValue;
        if (filterValue != "*") {
            quotes = await getQuotes(filterType, filterValue, quotes);
        }
    }
    if (!quotes || quotes.length == 0) {
        alert("No quotes found.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    paramDict["quoteId"] = randomQuote;
    console.log(paramDict, randomQuote);
    // alert(JSON.stringify(paramDict));
    module_uiLib.default.query.setParamsAndGo(paramDict);
}
