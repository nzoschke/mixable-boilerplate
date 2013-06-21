require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  var doPlaylistForAlbum = function() {
    var album = models.Album.fromURI('spotify:album:5rCCCernTo6IwFwEZM4H53');
    var list = List.forAlbum(album);

    var playlist = models.Playlist.fromURI('spotify:user:nzoschke:playlist:1WZbSSUhher76SwrTEWvQx');
    var list = List.forPlaylist(playlist);
    document.getElementById('playlistContainer').appendChild(list.node);
    list.init();
  };

  var searchEchoNest = function() {
    $.ajaxSetup({traditional: true, cache: true});
    var url = "http://developer.echonest.com/api/v4/song/search?api_key=FILDTEOIK2HBORODV"

    var onSearchSuccess = function(data) {
      models.Playlist.createTemporary().done(function(playlist) {
        playlist.load("tracks").done(function() {
          console.log(playlist)

          for (var i=0; i < data.response.songs.length; i++) {
            var song = data.response.songs[i];
            console.log(song);

            if (song.tracks.length > 0) {
              var track_uri = song.tracks[0].foreign_id.replace("-WW", "");
              var track = models.Track.fromURI(track_uri);
            } else {
              var track = models.Track.fromURI("spotify:local:Metro+Area:mixable:Nerves:387");
            }

            playlist.tracks.add(track);
          }

          var list = List.forPlaylist(playlist);
          document.getElementById("playlistContainer").appendChild(list.node);
          list.init();
        });
        //document.getElementById('playlist').innerHTML = playlist.name.decodeForHtml();
      });

      // var playlist = models.Playlist.fromURI('spotify:user:nzoschke:playlist:1WZbSSUhher76SwrTEWvQx');
      // playlist.load("tracks").done(function() {
      //   var collection = playlist.tracks;

      //   for (var i=0; i < data.response.songs.length; i++) {
      //     var song = data.response.songs[i];
      //     console.log(song);

      //     if (song.tracks.length > 0) {
      //       var track_uri = song.tracks[0].foreign_id.replace('-WW', '');
      //       var track = models.Track.fromURI(track_uri);
      //       collection.add(track);
      //     }
      //   }

      //   var list = List.forCollection(collection);
      //   document.getElementById("playlistContainer").appendChild(list.node);
      //   list.init();
      // });

      //var collection = new models.Collection();
      //console.log(collection);
      //console.log(data);



      // //var list = List.forCollection(collection)
      // //document.getElementById('playlistContainer').appendChild(list.node);
      // //list.init();

      // var album = models.Album.fromURI('spotify:album:5rCCCernTo6IwFwEZM4H53');
      // var list = List.forAlbum(album);
      // document.getElementById('playlistContainer').appendChild(list.node);
      // list.init();
    };

    $.getJSON(url, {
      bucket: ["audio_summary", "id:spotify-WW", "tracks"], // id:musicbrainz => foreign_release_id: "musicbrainz:release:0299c4da-dd58-4d4f-be3d-388a0ffc9e31"
      combined: "radiohead",
      format: "json",
      results: 2,
      sort: "song_hotttnesss-desc"
    }, onSearchSuccess);
  }

  exports.doPlaylistForAlbum  = doPlaylistForAlbum;
  exports.searchEchoNest      = searchEchoNest;
});
