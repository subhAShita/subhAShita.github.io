+++
title = "अन्ध-चितिः"
+++
<script src="/saMskRtam/padyam/quote-helper.js"></script>

|--------|--------|
|Ratings |<select id="dropdown_ratings" onchange="getRandomQuote()"></select>|
|--------|--------|

<div id="quoteInclude" class="js_include" url="https://raw.githubusercontent.com/subhAShita/db_toml_md__sa__padya/master/main/s/h/r/I/k/shrIkamTha.md"  newLevelForH1="2" includeTitle="true" metadataDetailName> </div>

<script>
module_uiLib.default.navigation.loadDropdownFromTSV(`${indexUrl}ratings/_summary.tsv`, 'dropdown_ratings', (x) => getRandomQuote("ratings", x));

{
  let quoteId = module_uiLib.default.query.getParam("quoteId");
  showQuote(quoteId);
}
</script>

