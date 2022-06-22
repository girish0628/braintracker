/*
 * This is the entry point
 */

var _ATLAS_ = {};
_ATLAS_.steps = [0.14, 41, 80];
_ATLAS_.volumes = new Array(_ATLAS_.steps.length);
_ATLAS_.meshes = [0.14, 41, 80];
_ATLAS_.currentVolume = 0;
_ATLAS_.volumesLoaded = false;
_ATLAS_.currentMesh = 0;
_ATLAS_.meshOpacity = 0.9;
_ATLAS_.labelOpacity = 0.5;
_ATLAS_.hover = null;
_ATLAS_.hoverLabelSelect = true;
_ATLAS_.atlasLoop = null;
_ATLAS_.infoWindow = null;
debugger;
// create dictionary "label name" : "label value"
// _ATLAS_.labels = {
//   "Accumbens area": 26,
//   Amygdala: 18,
//   Caudate: 11,
//   "Cerebellum Cortex": 8,
//   "Cerebral Cortex": 3,
//   Hippocampus: 17,
//   "Lateral Ventricle": 4,
//   Medulla: 175,
//   Midbrain: 173,
//   Pallidum: 13,
//   Pons: 174,
//   Putamen: 12,
//   Thalamus: 9,
//   "Ventral DC": 28,
//   Vermis: 172,
//   "3rd Ventricle": 14,
//   "4th Ventricle": 15,
// };

// setup mesh cache
for (m in _ATLAS_.meshes) {
  // var _meshes = [
  //   "AModel_88_AFLeft-Cerebral-Cortex.trk",
  //   "Model_26_Left-Accumbens-area.vtk",
  //   "Model_18_Left-Amygdala.vtk",
  //   "Model_11_Left-Caudate.vtk",
  //   "Model_8_Left-Cerebellum-Cortex.vtk",
  //   "Model_3_Left-Cerebral-Cortex.vtk",
  //   "Model_17_Left-Hippocampus.vtk",
  //   "Model_4_Left-Lateral-Ventricle.vtk ",
  //   "Model_13_Left-Pallidum.vtk",
  //   "Model_12_Left-Putamen.vtk",
  //   "Model_9_Left-Thalamus.vtk",
  //   "Model_28_Left-VentralDC.vtk",

  //   "Model_58_Right-Accumbens-area.vtk",
  //   "Model_54_Right-Amygdala.vtk",
  //   "Model_50_Right-Caudate.vtk",
  //   "Model_47_Right-Cerebellum-Cortex.vtk",
  //   "Model_42_Right-Cerebral-Cortex.vtk",
  //   "Model_53_Right-Hippocampus.vtk",
  //   "Model_43_Right-Lateral-Ventricle.vtk ",
  //   "Model_52_Right-Pallidum.vtk",
  //   "Model_51_Right-Putamen.vtk",
  //   "Model_48_Right-Thalamus.vtk",
  //   "Model_60_Right-VentralDC.vtk",

  //   "Model_175_Medulla.vtk",
  //   "Model_173_Midbrain.vtk",
  //   "Model_174_Pons.vtk",
  //   "Model_172_Vermis.vtk",
  //   "Model_14_3rd-Ventricle.vtk",
  //   "Model_15_4th-Ventricle.vtk",
  // ];
  var _meshes = [
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

  _ATLAS_.meshes[m] = new Array(_meshes.length);
  for (var i = 0; i < _meshes.length; i++) {
    var _currentMesh = jQuery.trim(_meshes[i]);
    _ATLAS_.meshes[m][_currentMesh] = null;
  }
}

sliceX = null;
sliceY = null;
sliceZ = null;

$(function () {
  // initialize with the MRI volume with the youngest dataset
  var volume = new X.volume();
  volume.file = "data/0.14/volume.nii.gz";
  _ATLAS_.volumes[_ATLAS_.currentVolume] = volume;

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
