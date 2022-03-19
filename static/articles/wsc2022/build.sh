#!/usr/bin/bash
rm *.bbl *.blg *.aux
xelatex subhAShita-db-deduplication
bibtex subhAShita-db-deduplication
xelatex subhAShita-db-deduplication
xelatex subhAShita-db-deduplication

