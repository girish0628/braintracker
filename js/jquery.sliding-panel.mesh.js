$(function () {
  var origs = [];
  var entries = [];
  for (l in _ATLAS_.meshes[0]) {
    // var nl = l.replace("Model_","").replace(".vtk","");
    // nl = nl.split("_")[1].replace("-"," ");
    // entries.push(nl);
    // origs.push(l);
    var nl = l.replace(".trk", "");
    entries.push(nl);
    origs.push(l);
  }

  $("#mesh_tree").append("<ul id='lst'>");
  for (var j = 0; j < entries.length; j++) {
    $("#lst").append(
      '<li class="mesh" data-value="' + origs[j] + '">' + entries[j] + "</li>"
    );
  }
  $("#mesh_tree").append("</ul>");

  // create controls
  $("#mesh_control_opacity").slider({
    value: 90,
    min: 0,
    step: 1,
    max: 100,
    slide: opacityMesh,
  });

  // select mesh
  $(".mesh").click(function (e) {
    var element = $(e.target);
    var label = element.attr("data-value");
    element.hasClass("selected-mesh")
      ? element.removeClass("selected-mesh")
      : element.addClass("selected-mesh");
    toggleMeshVisibility(label);
  });
});
