/*

    .----.                    _..._                                                     .-'''-.
   / .--./    .---.        .-'_..._''.                          _______                '   _    \
  ' '         |   |.--.  .' .'      '.\     __.....__           \  ___ `'.           /   /` '.   \_________   _...._
  \ \         |   ||__| / .'            .-''         '.    ,.--. ' |--.\  \         .   |     \  '\        |.'      '-.
   `.`'--.    |   |.--.. '             /     .-''"'-.  `. //    \| |    \  ' .-,.--.|   '      |  '\        .'```'.    '.
     `'-. `.  |   ||  || |            /     /________\   \\\    /| |     |  '|  .-. \    \     / /  \      |       \     \
         `. \ |   ||  || |            |                  | `'--' | |     |  || |  | |`.   ` ..' /    |     |        |    |
           \ '|   ||  |. '            \    .-------------' ,.--. | |     ' .'| |  | |   '-...-'`     |      \      /    .
            | |   ||  | \ '.          .\    '-.____...---.//    \| |___.' /' | |  '-                 |     |\`'-.-'   .'
            | |   ||__|  '. `._____.-'/ `.             .' \\    /_______.'/  | |                     |     | '-....-'`
           / /'---'        `-.______ /    `''-...... -'    `'--'\_______|/   | |                    .'     '.
     /...-'.'                       `                                        |_|                  '-----------'
    /--...-'

    Slice:Drop - Instantly view scientific and medical imaging data in 3D.

     http://slicedrop.com

    Copyright (c) 2012 The Slice:Drop and X Toolkit Developers <dev@goXTK.com>

    Slice:Drop is licensed under the MIT License:
      http://www.opensource.org/licenses/mit-license.php

    CREDITS: http://slicedrop.com/LICENSE

*/

/**
 * Setup all UI elements once the loading was completed.
 */
function setupUi() {}

function toggleVolumeRendering() {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  volume.volumeRendering = !volume.volumeRendering;
}

function thresholdVolume(event, ui) {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  if (!volume) {
    return;
  }
  if (event == null) {
    if (ui[0] != null) {
      volume.lowerThreshold = ui[0];
      volume.upperThreshold = ui[1];
    }
    if (ui[1] != null) {
      volume.lowerThreshold = ui[0];
      volume.upperThreshold = ui[1];
    }
  } else {
    volume.lowerThreshold = ui.values[0];
    volume.upperThreshold = ui.values[1];
  }
}

function windowLevelVolume(event, ui) {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  if (!volume) {
    return;
  }

  volume.windowLow = ui.values[0];
  volume.windowHigh = ui.values[1];
}

function opacity3dVolume(event, ui) {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  if (!volume) {
    return;
  }
  if (event == null) {
    volume.opacity = ui;
  } else {
    volume.opacity = ui.value / 100;
  }
}

function toggleAxialSliceVisibility() {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  volume.children[2].children[Math.floor(volume.indexZ)].visible =
    !volume.children[2].children[Math.floor(volume.indexZ)].visible;
}

function toggleCoronalSliceVisibility() {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  volume.children[1].children[Math.floor(volume.indexY)].visible =
    !volume.children[1].children[Math.floor(volume.indexY)].visible;
}

function toggleSagittalSliceVisibility() {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  volume.children[0].children[Math.floor(volume.indexX)].visible =
    !volume.children[0].children[Math.floor(volume.indexX)].visible;
}

function volumeslicingX(event, ui) {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  if (!volume) {
    return;
  }
  volume.indexX = Math.floor($("#yellow_slider").slider("option", "value"));
}

function volumeslicingY(event, ui) {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  if (!volume) {
    return;
  }
  volume.indexY = Math.floor($("#red_slider").slider("option", "value"));
}

function volumeslicingZ(event, ui) {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  if (!volume) {
    return;
  }
  volume.indexZ = Math.floor($("#green_slider").slider("option", "value"));
}

function fgColorVolume(hex, rgb) {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  if (!volume) {
    return;
  }

  volume.maxColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

  if (RT.linked) {
    clearTimeout(RT._updater);
    RT._updater = setTimeout(
      RT.pushVolume.bind(RT, "maxColor", volume.maxColor),
      150
    );
  }
}

function bgColorVolume(hex, rgb) {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  if (!volume) {
    return;
  }

  volume.minColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

  if (RT.linked) {
    clearTimeout(RT._updater);
    RT._updater = setTimeout(
      RT.pushVolume.bind(RT, "minColor", volume.minColor),
      150
    );
  }
}

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "./data/config.json", true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
//
// MESH
//
function toggleMeshVisibility(label) {
  loadJSON(function (response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    console.log(actual_JSON);
    if (!_ATLAS_.meshes[_ATLAS_.currentVolume][label]) {
      // load mesh
      var m = new X.fibers();
      // var m = new X.mesh();
      m.file = "https://neuronorm0.s3.us-east-2.amazonaws.com/demo/" + label;
      // m.file = "data/" + _ATLAS_.steps[_ATLAS_.currentVolume] + "/" + label;
      // m.file = "https://neuronorm0.s3.us-east-2.amazonaws.com/demo/AF_left.trk";
      // m.caption = label.replace(".trk", "");
      // .split("_")[2].split(); //.replace("Model_","")
      m.caption =
        actual_JSON[label.replace("_left.trk", "").replace("_right.trk", "")];
      console.log(label);
      r0.add(m);
      _ATLAS_.meshes[_ATLAS_.currentVolume][label] = m;
      _ATLAS_.meshes[_ATLAS_.currentVolume][label].visible = false;
      _ATLAS_.meshes[_ATLAS_.currentVolume][label].opacity =
        _ATLAS_.meshOpacity;
    }
    // show the mesh
    _ATLAS_.meshes[_ATLAS_.currentVolume][label].visible =
      !_ATLAS_.meshes[_ATLAS_.currentVolume][label].visible;
  });
}

function meshColor(hex, rgb) {
  if (!mesh) {
    return;
  }

  mesh.color = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

  if (RT.linked) {
    clearTimeout(RT._updater);
    RT._updater = setTimeout(RT.pushMesh.bind(RT, "color", mesh.color), 150);
  }
}

function opacityMesh(event, ui) {
  for (var m in _ATLAS_.meshes[_ATLAS_.currentVolume]) {
    if (_ATLAS_.meshes[_ATLAS_.currentVolume][m] != null) {
      _ATLAS_.meshes[_ATLAS_.currentVolume][m].opacity = ui.value / 100;
    }
  }
  _ATLAS_.meshOpacity = ui.value / 100;
}

function thresholdScalars(event, ui) {
  if (!mesh) {
    return;
  }

  mesh.scalars.lowerThreshold = ui.values[0] / 100;
  mesh.scalars.upperThreshold = ui.values[1] / 100;

  if (RT.linked) {
    clearTimeout(RT._updater);
    RT._updater = setTimeout(
      RT.pushScalars.bind(RT, "lowerThreshold", mesh.scalars.lowerThreshold),
      150
    );
    clearTimeout(RT._updater2);
    RT._updater2 = setTimeout(
      RT.pushScalars.bind(RT, "upperThreshold", mesh.scalars.upperThreshold),
      150
    );
  }
}

function scalarsMinColor(hex, rgb) {
  if (!mesh) {
    return;
  }

  mesh.scalars.minColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

  if (RT.linked) {
    clearTimeout(RT._updater);
    RT._updater = setTimeout(
      RT.pushScalars.bind(RT, "minColor", mesh.scalars.minColor),
      150
    );
  }
}

function scalarsMaxColor(hex, rgb) {
  if (!mesh) {
    return;
  }

  mesh.scalars.maxColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];

  if (RT.linked) {
    clearTimeout(RT._updater);
    RT._updater = setTimeout(
      RT.pushScalars.bind(RT, "maxColor", mesh.scalars.maxColor),
      150
    );
  }
}

//
// Fibers
//
function toggleFibersVisibility() {
  if (!fibers) {
    return;
  }

  fibers.visible = !fibers.visible;

  if (RT.linked) {
    clearTimeout(RT._updater);
    RT._updater = setTimeout(
      RT.pushFibers.bind(RT, "visible", fibers.visible),
      150
    );
  }
}

function thresholdFibers(event, ui) {
  if (!fibers) {
    return;
  }

  fibers.scalars.lowerThreshold = ui.values[0];
  fibers.scalars.upperThreshold = ui.values[1];
  if (RT.linked) {
    clearTimeout(RT._updater);
    RT._updater = setTimeout(
      RT.pushFibersScalars.bind(
        RT,
        "lowerThreshold",
        fibers.scalars.lowerThreshold
      ),
      150
    );
    clearTimeout(RT._updater2);
    RT._updater2 = setTimeout(
      RT.pushFibersScalars.bind(
        RT,
        "upperThreshold",
        fibers.scalars.upperThreshold
      ),
      150
    );
  }
}

function scene_picking_check() {
  // return the currently picked model
  return $(".scene_picker").filter(":visible").html();
}
