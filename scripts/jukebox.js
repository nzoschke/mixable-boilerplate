var $albums = {};
var $tracks = {};
var $t = []
var $playlistURI = "spotify:user:lunsku:playlist:0OG0sShb7v1eU5brRfKDpv"

require(["$api/models", "$views/list#List"], function(models, List) {
  "use strict";

  models.Playlist.fromURI($playlistURI).load("name", "tracks").done(function(playlist) {
    playlist.tracks.snapshot(0, 2000).done(function(snapshot) {
      for (var i = 0; i < snapshot.length; i++) {
        var track = snapshot.get(i);
        var div = document.getElementById(track.album.uri)
        if (!div) {
          div = document.createElement("div")
          div.id = track.album.uri

          var img = document.createElement("img")
          img.src = track.imageForSize(300)
          div.appendChild(img)

          var ol = document.createElement("ol")
          ol.id
          div.appendChild(ol)

          document.getElementById("jukebox").appendChild(div)
        }

        var ol = div.getElementsByTagName("ol")[0];
        var li = document.createElement("li")
        li.innerHTML = track.name;
        ol.appendChild(li)
      }
    })
  });
});