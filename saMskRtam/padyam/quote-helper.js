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

async function getQuotes(subtype, indexRow, filterSet=null) {
    let indexTsv = `${indexUrl}${subtype}/${indexRow.split("\t")[2]}.tsv`;
    console.log(indexRow.split("\t"), indexTsv);
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
    let subtype = "ratings";
    var dropdown = document.getElementById(`dropdown_${subtype}`);
    let indexRow = dropdown.options[dropdown.selectedIndex].value;
    console.log(indexRow);
    let filterSet = null;
    let quotes = await getQuotes(subtype, indexRow, filterSet);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomRow = quotes[randomIndex];
    console.log(randomRow);
    module_uiLib.default.query.setParamsAndGo({"quoteId": randomRow});
}
