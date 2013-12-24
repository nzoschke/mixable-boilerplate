#!/bin/bash

rm -rf scripts tmp

mkdir tmp
(
  cd tmp
  cp /Applications/Spotify.app/Contents/Resources/apps.zip .

  for m in api views; do
    unzip apps.zip $m.1
    unzip $m.1 scripts/*
    (
      cd scripts
      find . -name '*.js' | xargs -I% -L1 -t ../../js-beautify/js-beautify -o ../../scripts/$m/% -s2 %
    )
    rm -rf scripts
  done
)
rm -rf tmp