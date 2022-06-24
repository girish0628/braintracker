// reset the camera view
function resetCameraPos(axis) {
  var volume = _ATLAS_.volumes[_ATLAS_.currentVolume];
  if (axis == "axial") {
    r0.camera.position = [0, 0, -200]; //
  } else if (axis == "coronal") {
    r0.camera.position = [0, 200, 0]; //
  } else if (axis == "sagittal") {
    r0.camera.position = [-200, 0, 0]; //
  }
  r0.camera.up = [0, 0, 1];
  volume.indexX = 56;
  volume.indexY = 69.5;
  volume.indexZ = 81.5;
}

// initialize the 3D viewer
function init_viewer3d() {
  // adjust window/level
  _ATLAS_.volumes.windowLow = _ATLAS_.volumes.min;
  _ATLAS_.volumes.windowHigh = _ATLAS_.volumes.max;
}

// Select fiber from the 3D scene
function scene_picking() {
  r0.interactor.onMouseMove = function () {
    if (typeof hoverTimer != "undefined") {
      clearTimeout(hoverTimer);
    }

    hoverTimer = setTimeout(function () {
      // grab the current mouse position
      var _pos = r0.interactor.mousePosition;

      // pick the current object
      var _id = r0.pick(_pos[0], _pos[1]);

      if (_id != 0) {
        var _object = r0.get(_id);
        if (_object.classname == "fiber") {
          // grab the object's ca
        }
      }
    }, 100);
  };
}
