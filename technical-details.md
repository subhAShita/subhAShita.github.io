+++
title = "Technical details"
+++
[Pdf article](/articles/intro2022/subhAShita-db-deduplication.pdf)

## Backend
### Requirements
- Maintenance costs (including server and hosting fees) should be zero.
- The quote database itself be independent of any particular UI system.
- It should be easy to contribute to the quote database - but such contributions should be verifiable.
- Data format should be easily parsable in a variety of machine languages.

### Current solution
- Quotes are stored as simple markdown files with TOML metadata, so as to capture annotations such as meter, topic, poetic ornamentation, rasas, bhAva-s, sources, secondary sources, etc..
- Within each markdown file, the text and various commentaries or presentations are stored under html details tags (which contain relevant content in markdown format).
- For location of databases, see [contribution](../contribution) page.

## UI
- Report issues other than the below on [github](https://github.com/subhAShita/subhAShita.github.io/issues/new). 

## TODOS
- प्रतिमाला - अनुष्टुभ्-अपाकरणे विकल्पः। अक्षरालाभेऽक्षरान्तरग्रहणम्। 
- Stats - author, sources etc..
- Access keys/ shortcuts
- Replace dropdowns with typable filters.