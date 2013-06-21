require([
  '$api/models',
  '$views/list#List'
], function(models, List) {
  'use strict';

  var loadPlaylist = function(tracks) {
    models.Playlist.createTemporary().done(function(playlist) {
      playlist.load("tracks").done(function() {
        playlist.tracks.clear().done(function() {
          playlist.tracks.add(tracks).done(function() {
            var list = List.forPlaylist(playlist);
            $("#playlistContainer").empty().append(list.node);
            list.init();              
          });
        });
      });
    });
  };

  var searchEchoNest = function(query) {
    $.ajaxSetup({traditional: true, cache: true});
    var url = "http://developer.echonest.com/api/v4/song/search?api_key=FILDTEOIK2HBORODV"

    var onSearchSuccess = function(data) {
      models.Playlist.createTemporary().done(function(playlist) {
        playlist.load("tracks").done(function() {
          playlist.tracks.clear().done(function() {

            var tracks = [];
            for (var i=0; i < data.response.songs.length; i++) {
              var song = data.response.songs[i];
              var track, track_uri;

              console.log(song);

              track_uri = ["spotify", "local", song.artist_name, "mixable", song.title, song.audio_summary.duration.toFixed()].join(":")
              if (song.tracks.length > 0) {
                track_uri = song.tracks[0].foreign_id.replace("-WW", "");
              }

              tracks.push(models.Track.fromURI(track_uri))
            }

            playlist.tracks.add(tracks).done(function() {
              var list = List.forPlaylist(playlist);
              $("#playlistContainer").empty().append(list.node);
              list.init();              
            });
          });
        });
      });
    };

    $.getJSON(url, {
      bucket: ["audio_summary", "id:spotify-WW", "tracks"], // id:musicbrainz => foreign_release_id: "musicbrainz:release:0299c4da-dd58-4d4f-be3d-388a0ffc9e31"
      combined: query,
      format: "json",
      results: 20,
      // sort: "song_hotttnesss-desc"
    }, onSearchSuccess);
  };

  var searchLastFM = function(query) {
    var url = "http://www.last.fm/search/autocomplete"

    var onSearchError    = function(e) { console.log(e); };
    var onSearchSuccess  = function(data) {
      var tracks = [];

      for (var i=0; i < data.response.docs.length; i++) {
        var doc = data.response.docs[i];
        if (doc.restype != 9) continue; // restype 8 => album, 9 => track

        var track_uri = ["spotify", "local", doc.artist, "mixable", doc.track, doc.duration].join(":")
        tracks.push(models.Track.fromURI(track_uri))
      }

      loadPlaylist(tracks);
    };

    $.getJSON(url, {q: query}, onSearchSuccess, onSearchError);
  };

  exports.searchEchoNest = searchEchoNest;
  exports.searchLastFM   = searchLastFM;
});
