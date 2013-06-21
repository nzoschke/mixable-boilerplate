require([
  "$api/models",
  "scripts/mixable",
], function(models, mixable) {
  "use strict";

  $("#search").bind("click", function() {
    mixable.searchLastFM($("#query").val());
    //mixable.searchEchoNest($("#query").val());
    return false;
  });
});
