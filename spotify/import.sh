#!/bin/bash

rm -rf tmp && mkdir tmp && cd tmp

cp /Applications/Spotify.app/Contents/Resources/apps.zip .
unzip apps.zip api.1 views.1

unzip api.1   scripts/* && mv scripts ../api
unzip views.1 scripts/* && mv scripts ../views

find ../views ../api -name '*.js' | xargs -I% -L1 -t js-beautify/js-beautify -s2 -o % %