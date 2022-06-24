$(function () {
  var origs = [];
  var entries = [];

  for (l in _ATLAS_.fibers) {
    // var nl = l.replace("Model_","").replace(".vtk","");
    // nl = nl.split("_")[1].replace("-"," ");
    // entries.push(nl);
    // origs.push(l);
    // var nl = l.replace(".trk", "");
    var loc = l.includes("_left")
      ? " Left"
      : l.includes("_right")
      ? " Right"
      : "";

    entries.push(
      _ATLAS_.fibersName[
        l.replace("_left.trk", "").replace("_right.trk", "").replace(".trk", "")
      ] + loc
    );
    origs.push(l);
  }

  $("#fiber_tree").append("<ul id='lst'>");
  for (var j = 0; j < entries.length; j++) {
    $("#lst").append(
      '<li class="fiber" data-value="' + origs[j] + '">' + entries[j] + "</li>"
    );
  }
  $("#fiber_tree").append("</ul>");

  // create controls
  $("#fiber_control_opacity").slider({
    value: 90,
    min: 0,
    step: 1,
    max: 100,
    slide: opacityFiber,
  });

  // select fiber
  $(".fiber").click(function (e) {
    var element = $(e.target);
    var label = element.attr("data-value");
    element.hasClass("selected-fiber")
      ? element.removeClass("selected-fiber")
      : element.addClass("selected-fiber");
    toggleFiberVisibility(label);
  });
});
