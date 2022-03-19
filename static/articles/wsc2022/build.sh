#!/usr/bin/bash

while true; do
rm *.bbl *.blg *.aux
xelatex subhAShita-db-deduplication
bibtex subhAShita-db-deduplication
xelatex subhAShita-db-deduplication
xelatex subhAShita-db-deduplication
sleep 25
done
