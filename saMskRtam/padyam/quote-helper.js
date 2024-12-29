let indexUrl = "https://raw.githubusercontent.com/subhAShita/db_toml_md__sa__padya/master/index/";
let filterTypes = ["ratings", "sources", "secondary_sources", "topics", "meters", "rasas", "first_letter"];


function dropdownValueMaker(x) {
    let value = `${x.split("\t")[2]}`;
    if (value.startsWith("NO_")) {
        value = "*";
    }
    return value;
}

function dropdownTextMaker(x) {
    let fields = x.split("\t");
    let value = `${fields[0]}|${fields[1]}`;
    if (fields[0] == "value") {
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

async function setFilterValueFromQuery(filterType) {
    let queryValue = module_uiLib.default.query.getParam(filterType) || null;
    if (queryValue) {
        const input = document.getElementById(`input_${filterType}`);
        input.value = queryValue;
    }
}

async function initFilterBoxes() {
    console.log("Entering initFilterBoxes");
    for (let i = 0; i < filterTypes.length; i++) {
        let filterType = filterTypes[i];
        let queryValue = module_uiLib.default.query.getParam(filterType) || null;
        module_uiLib.default.navigation.loadDataListFromTSV(`${indexUrl}${filterType}/_summary.tsv`, `datalist_${filterType}`, dropdownTextMaker, dropdownValueMaker, (x) => getRandomQuote(), queryValue, true);
    }
    console.log("Exiting initFilterBoxes");
}

async function getQuotes(filterType, filterValue, filterSet = null) {
    console.log("Getting quotes", filterType, filterValue);
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

function selectRandomOption(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) {
        console.error(`Dropdown with ID "${dropdownId}" not found.`);
        return;
    }
    const options = dropdown.options;

    if (options.length <= 1) {
        console.log('Dropdown has no options to select.');
        return;
    }

    // Generate a random index, excluding the first option
    const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;

    // Set the selected index to the random index
    dropdown.selectedIndex = randomIndex;

    console.log(`Selected option: ${dropdown.options[randomIndex].text}`);
    return dropdown.options[randomIndex].value;
}


async function getRandomQuote() {
    let paramDict = {};
    let quotes = null;
    for (let i = 0; i < filterTypes.length; i++) {
        let filterType = filterTypes[i];
        var dropdown = document.getElementById(`input_${filterType}`);
        let filterValue = dropdown.value;
        paramDict[filterType] = filterValue;
        console.log(filterType, filterValue);
        if (filterValue != "*" && filterValue != "") {
            quotes = await getQuotes(filterType, filterValue, quotes);
        }
    }
    if (!quotes) {
        //     TODO : Get a letter by quote weight.
        console.log("No filter seems selected. Picking randomly");
        
        let filterType = "first_letter";
        let filterValue = selectRandomOption(`datalist_${filterType}`);
        quotes = await getQuotes(filterType, filterValue, filterSet = null);
    }
    if (quotes.length == 0) {
        let divMessage = document.querySelector("#divMessage");
        if (divMessage)
            divMessage.textContent = "No quotes found.";
        // alert(divMessage.textContent);
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    paramDict["quoteId"] = randomQuote;
    console.log(paramDict, randomQuote);
    // alert(JSON.stringify(paramDict));
    module_uiLib.query.setParamsAndGo(paramDict);
}

async function pratimAlA() {
    // Rules per R Ganesh - https://www.prekshaa.in/pratim%C4%81l%C4%81-lovely-garland-world-literary-games
    let includeElement = document.querySelector("#quoteInclude");
    let metadata = JSON.parse(includeElement.dataset.metadataJson);
    console.log(metadata);
    let letters = metadata["pratimaalaa_letters"];
    if (letters) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        const randomLetter = letters[randomIndex];
        console.log(randomLetter, letters);
        var dropdown = document.getElementById(`input_first_letter`);
        let selectedOption = null;
        let options = document.getElementById(`datalist_first_letter`).options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].text.split("|")[0] == randomLetter) {
                console.log(options[i], randomLetter);
                selectedOption = options[i];
                dropdown.selectedIndex = i;
                dropdown.value = selectedOption.value;
                break;
            }
        }
        if (selectedOption) {
            getRandomQuote();
        } else {
            console.error("No index with letter ", randomLetter);
        }
    } else {
        divMessage.innerHTML = "<h2>Not implemented. Contribute <a href='https://github.com/subhAShita/subhAShita.github.io/edit/content/saMskRtam/padyam/quote-helper.js'>code?</h2>";
    }
}

document.addEventListener('sdThemeDone', function (event) {
    console.log('Handling sdThemeDoneEvent:', event.detail.someData);
    for (let i = 0; i < filterTypes.length; i++) {
        let filterType = filterTypes[i];
        setFilterValueFromQuery(filterType);
    }
    let quoteId = module_uiLib.default.query.getParam("quoteId") || null;
    let inputQuoteId = document.querySelector("#inputQuoteId");
    inputQuoteId.value = quoteId;

});
console.log("sdThemeDone event listener attached.");
