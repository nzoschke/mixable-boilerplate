var $console      = {};
var $context      = {"uri": "spotify:user:nzoschke:playlist:4fDBRTnfpuXcgfNhQQQ5rK"};
var $playlistURI  = $context.uri;
var $snapshot     = null;

require(["$api/models", "$views/list#List"], function(models, List) {
  "use strict";

  // title: 200 characters; UTF-8
  var tracks = [
    models.Track.fromURI("spotify:local:::=== Warm up with some indie ===:0"),
    models.Track.fromURI("spotify:local:Radiohead:Pablo+Honey:Creep:235"),        // resolved to spotify:track:0fuLRqMU6IaRoNAFIUdjPx
    models.Track.fromURI("spotify:local:::    what the hell am i doing here:0"),  // resolved to spotify:local:::what+the+hell+am+i+doing+here:
    models.Track.fromURI("spotify:local:::    💩:0"),                             // spotify:local:::%f0%9f%92%a9:
    models.Track.fromURI("spotify:local:::    ♡:0"),
    models.Track.fromURI("spotify:local:::    ←0133-0142→:0"),
    models.Track.fromURI("spotify:local:Beatles:Please Please Me:I Saw Her Standing There:178"),
    models.Track.fromURI("spotify:local:::=== Transition to hip hop ===:0"),
    models.Track.fromURI("spotify:track:4piae89WoVnwucdJzWrB7M"),
    models.Track.fromURI("spotify:track:0nmxH6IsSQVT1YEsCB9UMi"),
    models.Track.fromURI("spotify:local:::=== Close with some electronic ===:0"),
    models.Track.fromURI("spotify:track:0DiWol3AO6WpXZgp0goxAV"),
  ];

  // re-initialize the "testable" playlist
  models.Playlist.fromURI($playlistURI).load("name", "tracks").done(function(playlist) {
    $console["playlist"] = playlist;

    //models.player.playContext(playlist);

    playlist.tracks.clear().done(function() {
      playlist.tracks.add(tracks).done(function() {

        var list = List.forPlaylist(playlist);
        $("#playlistContainer").empty().append(list.node);
        list.init();

        //

      }).fail(function(l, e) {
        console.log(e)
      });
    });

    // Play track in this playlist context
    //models.player.addEventListener('change', function() { console.log("player changed") });
    //models.player.playTrack(tracks[8]);
    //models.player.playTrack(models.Track.fromURI('spotify:track:7MzmBmyI9KkyQJaPNLdtUi'));


    // playlist.tracks.snapshot(0, 50).done(function(snapshot) {
    //   var len = Math.min(snapshot.length, 50);
    //   for (var i = 0; i < len; i++) {
    //     doSomethingWithTrack(snapshot.get(i));
    //   }
    // });
    //console.log(playlist.uri + ': ' + playlist.name.decodeForText());
  });

  // Manage Player
  var $timer = null;
  models.player.addEventListener("change", function(e) {
    var player = e.target
    // console.log(player)

    // load and snapshot playlist
    models.Playlist.fromURI(player.context.uri).load("tracks").done(function(playlist) {
      playlist.tracks.snapshot().done(function(snapshot) {

        // scan for metadata cue point between this and next track
        for (var i = player.index + 1; i < snapshot.length; i++) {
          var t = snapshot.get(i);

          // metadata track
          if (t.duration == -1 && t.album.name == "") {
            var m = /←([0-9]+)-([0-9]+)→/g.exec(t.name);
            if (m) {
              // if position < from, advance to from
              var cueIn  = parseInt(m[1] * 1000)
              var cueOut = parseInt(m[2] * 1000)

              if (player.position < cueIn) {
                player.seek(cueIn)
                $timer = setTimeout(function() {
                  player.skipToNextTrack();
                }, cueOut - cueIn);
                setInterval
              }

              //cues[lastTrackURI] = {"from": m[1], "to": m[2]}
            }
          }
          else break; // music track
        }
      });
    });

    // models.Playlist.fromURI(context.uri).load("tracks").done(function(playlist) {
    //   playlist.tracks.snapshot().done(function(snapshot) {
    //     //var len = Math.min(snapshot.length, 50);
    //     for (var i = 0; i < snapshot.length; i++) {
    //       console.log(snapshot.get(i))
    //       //doSomethingWithTrack(snapshot.get(i));
    //     }
    //   });
    // });
    // playlist.load("tracks").done(function() {
    //   console.log(this);
    // });
    //console.log(playlist.tracks)
    // seek to cue point
  });

})