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

  //mixable.doPlaylistForAlbum();
  $("#search").bind("click", function() {
    mixable.searchEchoNest($("#query").val());
    return false;
  });

  //mixable.searchEchoNest();
});
