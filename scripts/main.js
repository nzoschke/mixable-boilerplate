require([
  '$api/models',
  'scripts/mixable',
], function(models, mixable) {
  'use strict';

  //languageExample.doHelloWorld();
  //coverExample.doCoverForAlbum();
  //buttonExample.doShareButtonForArtist();
  //buttonExample.doPlayButtonForAlbum();
  //playlistExample.doPlaylistForAlbum();

  mixable.doPlaylistForAlbum();
  mixable.searchEchoNest();
});
