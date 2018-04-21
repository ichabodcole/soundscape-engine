'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _timer = require('@ichabodcole/timer');

var _SoundscapeManager = require('./SoundscapeManager');

var _SoundscapeManager2 = _interopRequireDefault(_SoundscapeManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundscapeConductor = function (_Timer) {
  _inherits(SoundscapeConductor, _Timer);

  function SoundscapeConductor(audioContext) {
    _classCallCheck(this, SoundscapeConductor);

    var _this = _possibleConstructorReturn(this, (SoundscapeConductor.__proto__ || Object.getPrototypeOf(SoundscapeConductor)).call(this));

    _this.soundscapeManager = new _SoundscapeManager2.default(audioContext);
    return _this;
  }

  _createClass(SoundscapeConductor, [{
    key: 'start',
    value: function start() {
      // console.debug('Soundscape | start()')
      _get(SoundscapeConductor.prototype.__proto__ || Object.getPrototypeOf(SoundscapeConductor.prototype), 'start', this).call(this);
      this.soundscapeManager.connect();
    }
  }, {
    key: 'stop',
    value: function stop() {
      // console.debug('Soundscape | stop()')
      _get(SoundscapeConductor.prototype.__proto__ || Object.getPrototypeOf(SoundscapeConductor.prototype), 'stop', this).call(this);
      this.soundscapeManager.disconnect();
    }
  }, {
    key: 'reset',
    value: function reset() {
      // console.debug('Soundscape | reset()')
      _get(SoundscapeConductor.prototype.__proto__ || Object.getPrototypeOf(SoundscapeConductor.prototype), 'reset', this).call(this);
      this.soundscapeManager.disconnect();
    }
  }, {
    key: 'addModule',
    value: function addModule(module) {
      // console.debug('[Soundscape onAddModule] module', module)
      this.soundscapeManager.addModule(module);
    }
  }, {
    key: 'removeModule',
    value: function removeModule(moduleId) {
      this.soundscapeManager.removeModule(moduleId);
    }
  }, {
    key: 'updateModules',
    value: function updateModules(modules) {
      this.soundscapeManager.updateModules(modules);
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this.timeElapsed;
    },
    set: function set(value) {
      this.timeElapsed = value;
    }
  }, {
    key: 'volume',
    set: function set(value) {
      this.soundscapeManager.volume = value;
    }
  }]);

  return SoundscapeConductor;
}(_timer.Timer);

exports.default = SoundscapeConductor;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundscapeEvent = undefined;

var _timer = require('@ichabodcole/timer');

var SoundscapeEvent = exports.SoundscapeEvent = Object.assign({}, _timer.TimerEvent);
exports.default = SoundscapeEvent;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SoundscapeModuleManager = require('./SoundscapeModuleManager');

var _SoundscapeModuleManager2 = _interopRequireDefault(_SoundscapeModuleManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SoundscapeManager = function () {
  function SoundscapeManager(audioContext) {
    _classCallCheck(this, SoundscapeManager);

    this.ctx = audioContext;
    this.masterGain = this.ctx.createGain();
    this.moduleManager = new _SoundscapeModuleManager2.default(this.ctx, this.masterGain);
  }

  _createClass(SoundscapeManager, [{
    key: 'connect',
    value: function connect() {
      this.masterGain.connect(this.ctx.destination);
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      this.masterGain.disconnect();
    }
  }, {
    key: 'addModule',
    value: function addModule(module) {
      // console.debug('[Soundscape onAddModule] module', module)
      var id = module.id,
          type = module.type,
          properties = module.properties;

      this.moduleManager.addModule(id, type, properties);
    }
  }, {
    key: 'removeModule',
    value: function removeModule(moduleId) {
      this.moduleManager.removeModule(moduleId);
    }
  }, {
    key: 'updateModules',
    value: function updateModules(modules) {
      this.moduleManager.updateModules(modules);
    }
  }, {
    key: 'volume',
    set: function set(value) {
      this.masterGain.gain.value = value;
    }
  }]);

  return SoundscapeManager;
}();

exports.default = SoundscapeManager;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

var _SoundscapeSoundscapeModuleTypes = require('./SoundscapeSoundscapeModuleTypes');

var _SoundscapeSoundscapeModuleTypes2 = _interopRequireDefault(_SoundscapeSoundscapeModuleTypes);

var _audioModules = require('./audio-modules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SoundscapeModuleManager = function () {
  function SoundscapeModuleManager(audioContext, masterGain) {
    _classCallCheck(this, SoundscapeModuleManager);

    this.ctx = audioContext;
    this.masterGain = masterGain;
    this.modules = new Map();
  }

  _createClass(SoundscapeModuleManager, [{
    key: 'addModule',
    value: function addModule(id, type, props) {
      // console.log('[SoundscapeModuleManager addModule] id', id, 'type', type, 'props', props)
      var module = this.createModule(type, props);
      this.modules.set(id, module);
    }
  }, {
    key: 'createModule',
    value: function createModule(type, props) {
      // console.debug('[SoundscapeModuleManager createModule]', type, props)
      switch (type) {
        case _SoundscapeSoundscapeModuleTypes2.default.COLOR_NOISE_MODULE:
          return new _audioModules.ColorNoiseModule(this.ctx, this.masterGain, props);
        case _SoundscapeSoundscapeModuleTypes2.default.BINAURAL_BEAT_MODULE:
          return new _audioModules.BinauralBeatModule(this.ctx, this.masterGain, props);
      }
    }
  }, {
    key: 'removeModule',
    value: function removeModule(id) {
      var module = this.modules.get(id);
      module.destroy();
      this.modules.delete(id);
    }
  }, {
    key: 'updateModules',
    value: function updateModules(modulesData) {
      var _this = this;

      modulesData.forEach(function (moduleData) {
        _this.updateModule(moduleData.id, moduleData.properties);
      });
    }
  }, {
    key: 'updateModule',
    value: function updateModule(id, props) {
      if (!this.modules.has(id)) return;
      var module = this.modules.get(id);

      Object.keys(props).forEach(function (propKey) {
        if ((0, _helpers.instanceHasSetter)(module, propKey)) {
          module[propKey] = props[propKey];
        }
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.gainNode.disconnect();
    }
  }]);

  return SoundscapeModuleManager;
}();

exports.default = SoundscapeModuleManager;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BINAURAL_BEAT_MODULE = exports.BINAURAL_BEAT_MODULE = 'binaural-beat-module';
var COLOR_NOISE_MODULE = exports.COLOR_NOISE_MODULE = 'color-noise-module';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundscapeState = undefined;

var _timer = require('@ichabodcole/timer');

var SoundscapeState = exports.SoundscapeState = Object.assign({}, _timer.TimerState);
exports.default = SoundscapeState;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binauralbeatGen = require('binauralbeat-gen');

var _binauralbeatGen2 = _interopRequireDefault(_binauralbeatGen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinauralBeatModule = function () {
  function BinauralBeatModule(audioCtx, masterGain, props) {
    _classCallCheck(this, BinauralBeatModule);

    var waveType = props.waveType,
        pitch = props.pitch,
        beatRate = props.beatRate,
        volume = props.volume;


    this.ctx = audioCtx;
    this.masterGain = masterGain;

    this.gain = this.ctx.createGain();
    this.volume = volume;

    this.generator = new _binauralbeatGen2.default(this.ctx, { waveType: waveType, pitch: pitch, beatRate: beatRate });
    this.generator.connect(this.gain);
    this.gain.connect(this.masterGain);
    this.generator.start();
  }

  _createClass(BinauralBeatModule, [{
    key: 'destroy',
    value: function destroy() {
      this.generator.stop();
      this.generator.disconnect();
    }
  }, {
    key: 'volume',
    set: function set(value) {
      this.gain.gain.value = value;
    }
  }, {
    key: 'waveType',
    set: function set(value) {
      this.generator.waveType = value;
    }
  }, {
    key: 'pitch',
    set: function set(value) {
      this.generator.pitch = value;
    }
  }, {
    key: 'beatRate',
    set: function set(value) {
      this.generator.beatRate = value;
    }
  }]);

  return BinauralBeatModule;
}();

exports.default = BinauralBeatModule;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colornoiseGen = require('colornoise-gen');

var _colornoiseGen2 = _interopRequireDefault(_colornoiseGen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorNoiseModule = function () {
  function ColorNoiseModule(audioCtx, masterGain, props) {
    _classCallCheck(this, ColorNoiseModule);

    var noiseType = props.noiseType,
        volume = props.volume;


    this.ctx = audioCtx;
    this.masterGain = masterGain;

    this.gain = this.ctx.createGain();
    this.volume = volume;

    this.generator = new _colornoiseGen2.default(this.ctx, { noiseType: noiseType });
    this.generator.connect(this.gain);
    this.gain.connect(this.masterGain);
    this.generator.start();
  }

  _createClass(ColorNoiseModule, [{
    key: 'destroy',
    value: function destroy() {
      this.generator.stop();
      this.generator.disconnect();
      this.generator.remove();
    }
  }, {
    key: 'volume',
    set: function set(value) {
      this.gain.gain.value = value;
    }
  }, {
    key: 'noiseType',
    set: function set(value) {
      this.generator.noiseType = value;
    }
  }]);

  return ColorNoiseModule;
}();

exports.default = ColorNoiseModule;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BinauralBeatModule = exports.ColorNoiseModule = undefined;

var _ColorNoise = require('./ColorNoise');

var _ColorNoise2 = _interopRequireDefault(_ColorNoise);

var _BinauralBeat = require('./BinauralBeat');

var _BinauralBeat2 = _interopRequireDefault(_BinauralBeat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ColorNoiseModule = _ColorNoise2.default;
exports.BinauralBeatModule = _BinauralBeat2.default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

exports.default = audioContext;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceHasSetter = instanceHasSetter;
function instanceHasSetter(obj, property) {
  return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), property);
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundscapeModuleType = exports.SoundscapeState = exports.SoundscapeEvent = exports.SoundscapeManager = exports.SoundscapeConductor = exports.audioContext = undefined;

var _audioContext = require('./audioContext');

var _audioContext2 = _interopRequireDefault(_audioContext);

var _SoundscapeConductor = require('./SoundscapeConductor');

var _SoundscapeConductor2 = _interopRequireDefault(_SoundscapeConductor);

var _SoundscapeManager = require('./SoundscapeManager');

var _SoundscapeManager2 = _interopRequireDefault(_SoundscapeManager);

var _SoundscapeEvent = require('./SoundscapeEvent');

var _SoundscapeEvent2 = _interopRequireDefault(_SoundscapeEvent);

var _SoundscapeState = require('./SoundscapeState');

var _SoundscapeState2 = _interopRequireDefault(_SoundscapeState);

var _SoundscapeModuleType = require('./SoundscapeModuleType');

var _SoundscapeModuleType2 = _interopRequireDefault(_SoundscapeModuleType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.audioContext = _audioContext2.default;
exports.SoundscapeConductor = _SoundscapeConductor2.default;
exports.SoundscapeManager = _SoundscapeManager2.default;
exports.SoundscapeEvent = _SoundscapeEvent2.default;
exports.SoundscapeState = _SoundscapeState2.default;
exports.SoundscapeModuleType = _SoundscapeModuleType2.default;
exports.default = _SoundscapeConductor2.default;
