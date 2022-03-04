+++
title = "दर्शकः"
unicode_script = "devanagari"
+++
<button></button>

<div id="quoteInclude" class="js_include" url="https://raw.githubusercontent.com/subhAShita/db_toml_md__sa__padya/master/main/s/h/r/I/k/shrIkamTha.md"  newLevelForH1="2" includeTitle="true" metadataDetailName> </div>

<script>
{
  let quoteId = module_main.default.query.getParam("quoteId");
  showQuote(quoteId);
}

function showQuote(quoteId) {
  if (quoteId) {
    let includeElement = document.querySelector("#quoteInclude");
    let newUrl = includeElement.getAttribute("url");
    newUrl = newUrl.replace(/main\/.+/, `main/${quoteId[0]}/${quoteId[1]}/${quoteId[2]}/${quoteId[3]}/${quoteId[4]}/${quoteId}.md`);
    includeElement.setAttribute("url", newUrl);
  }
}

</script>