+++
title = "अन्ध-चितिः"
+++
<script src="/saMskRtam/padyam/quote-helper.js"></script>

|--------|--------|
|Ratings |<select id="dropdown_ratings" onchange="getRandomQuote()"></select>|
|--------|--------|

<div id="quoteInclude" class="js_include" url="https://raw.githubusercontent.com/subhAShita/db_toml_md__sa__padya/master/main/s/h/r/I/k/shrIkamTha.md"  newLevelForH1="2" includeTitle="true" metadataDetailName> </div>

<script>

function dropdownValueMaker(x) {
  let value = `${x.split("\t")[2]}`;
  if (value == "value") {
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

module_uiLib.default.navigation.loadDropdownFromTSV(`${indexUrl}ratings/_summary.tsv`, 'dropdown_ratings', dropdownTextMaker, dropdownValueMaker, (x) => getRandomQuote());

setDropdownValuesFromQuery();
{
  let quoteId = module_uiLib.default.query.getParam("quoteId") || "shrIkamTha";
  showQuote(quoteId);
}
</script>

