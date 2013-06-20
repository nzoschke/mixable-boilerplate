require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  var doPlaylistForAlbum = function() {
    var album = models.Album.fromURI('spotify:album:5rCCCernTo6IwFwEZM4H53');
    var list = List.forAlbum(album);
    document.getElementById('playlistContainer').appendChild(list.node);
    list.init();
  };

  var searchEchoNest = function() {
    $.ajaxSetup({traditional: true, cache: true});
    var url = "http://developer.echonest.com/api/v4/song/search?api_key=FILDTEOIK2HBORODV"

    var onSearchSuccess = function(data) {
      console.log(data);

      var playlist = new models.Playlist();
      for (var i=0; i<data.response.songs.length; i++) {
        console.log(data.response.songs[i]);
      }
    };

    $.getJSON(url, {
      bucket: ["audio_summary", "id:spotify-WW", "tracks"], // id:musicbrainz => foreign_release_id: "musicbrainz:release:0299c4da-dd58-4d4f-be3d-388a0ffc9e31"
      combined: "radiohead",
      format: "json",
      results: 50,
      sort: "song_hotttnesss-desc"
    }, onSearchSuccess);
  }

  exports.doPlaylistForAlbum  = doPlaylistForAlbum;
  exports.searchEchoNest      = searchEchoNest;
});
