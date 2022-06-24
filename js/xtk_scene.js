/*
 * This is the entry point
 */

var _ATLAS_ = {};
_ATLAS_.volumes = [];
_ATLAS_.fibers = [];
_ATLAS_.volumesLoaded = false;
_ATLAS_.fiberOpacity = 0.9;
_ATLAS_.labelOpacity = 0.5;
_ATLAS_.hover = null;
_ATLAS_.hoverLabelSelect = true;
_ATLAS_.atlasLoop = null;
_ATLAS_.infoWindow = null;
_ATLAS_.fibersName = TRK_NAME;

// setup fiber cache
// for (m in _ATLAS_.fibers) {
var _fibers = [
  // "Model_26_Left-Accumbens-area.vtk",
  "AF_left.trk",
  "AF_right.trk",
  "ATR_left.trk",
  "ATR_right.trk",
  "CA.trk",
  "CC_1.trk",
  "CC_2.trk",
  "CC_3.trk",
  "CC_4.trk",
  "CC_5.trk",
  "CC_6.trk",
  "CC_7.trk",
  "CC.trk",
  "CG_left.trk",
  "CG_right.trk",
  "CST_left.trk",
  "CST_right.trk",
  "FPT_left.trk",
  "FPT_right.trk",
  "FX_left.trk",
  "FX_right.trk",
  "ICP_left.trk",
  "ICP_right.trk",
  "IFO_left.trk",
  "IFO_right.trk",
  "ILF_left.trk",
  "ILF_right.trk",
  "MCP.trk",
  "MLF_left.trk",
  "MLF_right.trk",
  "OR_left.trk",
  "OR_right.trk",
  "POPT_left.trk",
  "POPT_right.trk",
  "SCP_left.trk",
  "SCP_right.trk",
  "SLF_I_left.trk",
  "SLF_I_right.trk",
  "SLF_II_left.trk",
  "SLF_II_right.trk",
  "SLF_III_left.trk",
  "SLF_III_right.trk",
  "ST_FO_left.trk",
  "ST_FO_right.trk",
  "ST_OCC_left.trk",
  "ST_OCC_right.trk",
  "ST_PAR_left.trk",
  "ST_PAR_right.trk",
  "ST_POSTC_left.trk",
  "ST_POSTC_right.trk",
  "ST_PREC_left.trk",
  "ST_PREC_right.trk",
  "ST_PREF_left.trk",
  "ST_PREF_right.trk",
  "ST_PREM_left.trk",
  "ST_PREM_right.trk",
  "STR_left.trk",
  "STR_right.trk",
  "T_OCC_left.trk",
  "T_OCC_right.trk",
  "T_PAR_left.trk",
  "T_PAR_right.trk",
  "T_POSTC_left.trk",
  "T_POSTC_right.trk",
  "T_PREC_left.trk",
  "T_PREC_right.trk",
  "T_PREF_left.trk",
  "T_PREF_right.trk",
  "T_PREM_left.trk",
  "T_PREM_right.trk",
  "UF_left.trk",
  "UF_right.trk",
];

// _ATLAS_.fibers[m] = new Array(_fibers.length);
for (var i = 0; i < _fibers.length; i++) {
  var _currentFiber = jQuery.trim(_fibers[i]);
  _ATLAS_.fibers[_currentFiber] = null;
}
// }

sliceX = null;
sliceY = null;
sliceZ = null;

$(function () {
  // initialize with the MRI volume with the youngest dataset
  var volume = new X.volume();
  volume.file = "https://neuronorm0.s3.us-east-2.amazonaws.com/demo/fa.nii.gz";
  _ATLAS_.volumes = volume;

  // 3D rendering
  r0 = new X.renderer3D();
  r0.container = "3d";
  r0.config.INTERMEDIATE_RENDERING = true;
  r0.init();
  r0.add(volume);
  r0.camera.position = [0, 0, -200]; //
  r0.camera.up = [0, 1, 0];
  r0.onShowtime = function () {
    init_viewer3d();
    init_viewer2d();
    scene_picking();
  };
  r0.render();
});
