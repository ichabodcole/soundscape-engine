(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ticker = exports.TickerState = exports.TickerEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Ticker Event Types
var TickerEvent = {
  TICK: 'TICK',
  START: 'START',
  STOP: 'STOP'

  // Ticker States
};var TickerState = {
  STOPPED: 'STOPPED',
  TICKING: 'TICKING'
};

var Ticker = function (_EventEmitter) {
  _inherits(Ticker, _EventEmitter);

  function Ticker() {
    var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

    _classCallCheck(this, Ticker);

    var _this = _possibleConstructorReturn(this, (Ticker.__proto__ || Object.getPrototypeOf(Ticker)).call(this));

    _this._intervalId = null;
    _this._interval = interval;

    _this.state = null;
    _this.state = TickerState.STOPPED;
    return _this;
  }

  _createClass(Ticker, [{
    key: 'start',
    value: function start() {
      this.state = TickerState.TICKING;
      this.__createInterval();
      this.emit(TickerEvent.START);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.state = TickerState.STOPPED;
      this.__destroyInterval();
      this.emit(TickerEvent.STOP);
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.emit(TickerEvent.TICK);
    }
  }, {
    key: '__createInterval',
    value: function __createInterval() {
      this.__destroyInterval();
      this._intervalId = setInterval(this.tick.bind(this), this._interval);
    }
  }, {
    key: '__destroyInterval',
    value: function __destroyInterval() {
      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    }
  }, {
    key: 'interval',
    get: function get() {
      return this._interval;
    }
  }]);

  return Ticker;
}(_eventemitter2.default);

exports.default = Ticker;
exports.TickerEvent = TickerEvent;
exports.TickerState = TickerState;
exports.Ticker = Ticker;

},{"eventemitter3":15}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = exports.TimerState = exports.TimerEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ticker = require('@ichabodcole/ticker');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimerEvent = exports.TimerEvent = Object.assign({
  COMPLETE: 'COMPLETE',
  RESET: 'RESET'
}, _ticker.TickerEvent);

var TimerState = exports.TimerState = Object.assign({}, _ticker.TickerState);

var Timer = exports.Timer = function (_Ticker) {
  _inherits(Timer, _Ticker);

  function Timer(duration) {
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    _classCallCheck(this, Timer);

    var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, interval));

    _this.duration = duration;
    _this._startTime = null;
    _this._stopStartTime = 0;
    return _this;
  }

  _createClass(Timer, [{
    key: 'start',
    value: function start() {
      if (this.state !== TimerState.TICKING) {
        if (this.duration > 0 && this.duration != null) {
          var now = Date.now();

          if (this.state === TimerState.STOPPED) {
            this._startTime = this._startTime + (now - this._stopStartTime);
            this._stopStartTime = 0;
          }

          this.state = TimerState.TICKING;
          this.__createInterval();
          this.emit(TimerEvent.START);

          if (this._startTime === null) {
            this._startTime = now;
          }

          this.tick();
        } else {
          throw new Error('Timer:start() ~ Valid duration must be set before calling start. Try a number greater than 0');
        }
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.state === TimerState.TICKING) {
        this.state = TimerState.STOPPED;
        this._stopStartTime = Date.now();
        this.__destroyInterval();
        this.emit(TimerEvent.STOP);
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.state = TimerState.STOPPED;
      this.__destroyInterval();
      this.emit(TimerEvent.RESET);
      this._stopStartTime = 0;
      this._startTime = null;
    }
  }, {
    key: 'tick',
    value: function tick() {
      var isComplete = this.timeElapsed >= this.duration;

      var data = {
        duration: this.duration,
        timeElapsed: this.timeElapsed,
        progress: this.progress
      };

      this.emit(TimerEvent.TICK, data);

      if (isComplete) {
        this.emit(TimerEvent.COMPLETE);
        this.reset();
      }

      return data;
    }
  }, {
    key: 'timeElapsed',
    get: function get() {
      return this._startTime !== null ? Math.min(Date.now() - this._startTime, this.duration) : 0;
    },
    set: function set(milliseconds) {
      if (milliseconds >= 0) {
        if (milliseconds <= this.duration) {
          this._startTime = Date.now() - milliseconds;
        } else {
          throw new Error('Timer:timeElapsed ~ Should not be greater than duration (' + this.duration + '), was (' + milliseconds + ')');
        }
      } else {
        throw new Error('Timer:timeElapsed ~ Should not be less than 0, was (' + milliseconds + ')');
      }
    }
  }, {
    key: 'progress',
    get: function get() {
      return Math.min(1 / this.duration * this.timeElapsed, 1);
    },
    set: function set(value) {
      if (value < 0 || value > 1) {
        throw new Error('Timer:progress ~ Should be between 0 and 1, was (' + value + ')');
      }

      this.timeElapsed = this.duration * value;
    }
  }]);

  return Timer;
}(_ticker.Ticker);

exports.default = Timer;

},{"@ichabodcole/ticker":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WaveTypes = exports.BinauralBeatGen = undefined;

var _BinauralBeatGen = require('./lib/BinauralBeatGen');

var _BinauralBeatGen2 = _interopRequireDefault(_BinauralBeatGen);

var _constants = require('./lib/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _BinauralBeatGen2.default;
exports.BinauralBeatGen = _BinauralBeatGen2.default;
exports.WaveTypes = _constants.WaveTypes;

},{"./lib/BinauralBeatGen":4,"./lib/constants":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BinauralBeatGen = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinauralBeatGen = function () {
    function BinauralBeatGen(ctx) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, BinauralBeatGen);

        this.__leftChannel = ctx.createOscillator();
        this.__rightChannel = ctx.createOscillator();
        this.__channelMerger = ctx.createChannelMerger();
        this.__compressor = ctx.createDynamicsCompressor();

        this.input = ctx.createGain();
        this.output = ctx.createGain();

        this.__model = {};

        // Defaults
        this.pitch = options.pitch || 440;
        this.beatRate = options.beatRate || 5;
        this.waveType = options.waveType || _constants.WaveTypes.SINE;
        this.compressNodes = options.compressNodes || false;
        this.started = false;

        // setup functions
        this.__routeNodes();
    }

    _createClass(BinauralBeatGen, [{
        key: 'start',
        value: function start() {
            if (this.started === false) {
                this.__startOscillators();
                this.started = true;
            }
            this.__connectOscillators();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.__disconnectOscillators();
        }
    }, {
        key: 'connect',
        value: function connect(dest) {
            this.output.connect(dest.input ? dest.input : dest);
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.output.disconnect();
        }
    }, {
        key: 'getChannel',
        value: function getChannel(channel) {
            if (channel === 0) {
                return this.__leftChannel;
            } else if (channel === 1) {
                return this.__rightChannel;
            }
        }

        // Getters and Setters

    }, {
        key: 'setPeriodicWave',
        value: function setPeriodicWave(periodicWave) {
            this.__leftChannel.setPeriodicWave(periodicWave);
            this.__rightChannel.setPeriodicWave(periodicWave);
        }

        // Private methods

        // Setup Audio Routing

    }, {
        key: '__routeNodes',
        value: function __routeNodes() {
            // This can be helpful when passing other audio signals through this node
            if (this.compressNodes) {
                this.input.connect(this.__compressor);
                this.__channelMerger.connect(this.__compressor);
                this.__compressor.connect(this.output);
            } else {
                this.input.connect(this.output);
                this.__channelMerger.connect(this.output);
            }
        }
    }, {
        key: '__startOscillators',
        value: function __startOscillators() {
            this.__leftChannel.start(0);
            this.__rightChannel.start(0);
        }
    }, {
        key: '__connectOscillators',
        value: function __connectOscillators() {
            this.__leftChannel.connect(this.__channelMerger, 0, 0);
            this.__rightChannel.connect(this.__channelMerger, 0, 1);
        }
    }, {
        key: '__disconnectOscillators',
        value: function __disconnectOscillators() {
            this.__leftChannel.disconnect();
            this.__rightChannel.disconnect();
        }
    }, {
        key: '__updateBinauralFrequencies',
        value: function __updateBinauralFrequencies() {
            if (this.beatRate != null && this.pitch != null) {
                this.__leftChannel.frequency.value = this.__getChannelFrequency(0);
                this.__rightChannel.frequency.value = this.__getChannelFrequency(1);
            }
        }
    }, {
        key: '__getChannelFrequency',
        value: function __getChannelFrequency(channelNum) {
            var channelFrequency, frequencyOffset;

            frequencyOffset = this.beatRate / 2;

            if (channelNum === 0) {
                channelFrequency = this.pitch - frequencyOffset;
            } else {
                channelFrequency = this.pitch + frequencyOffset;
            }

            return channelFrequency;
        }
    }, {
        key: 'model',
        get: function get() {
            return this.__model;
        }
    }, {
        key: 'pitch',
        set: function set(pitchFreq) {
            this.__model.pitch = pitchFreq;
            this.__updateBinauralFrequencies();
        },
        get: function get() {
            return this.__model.pitch;
        }
    }, {
        key: 'beatRate',
        set: function set(beatRate) {
            this.__model.beatRate = beatRate;
            this.__updateBinauralFrequencies();
        },
        get: function get() {
            return this.__model.beatRate;
        }
    }, {
        key: 'waveType',
        set: function set(waveType) {
            this.__model.waveType = waveType;
            this.__leftChannel.type = this.__rightChannel.type = waveType;
        },
        get: function get() {
            return this.__model.waveType;
        }
    }]);

    return BinauralBeatGen;
}();

exports.default = BinauralBeatGen;
exports.BinauralBeatGen = BinauralBeatGen;

},{"./constants":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var WaveTypes = {
    SINE: 'sine',
    SQUARE: 'square',
    SAWTOOTH: 'sawtooth',
    TRIANGLE: 'triangle'
};

exports.WaveTypes = WaveTypes;
exports.default = WaveTypes;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoiseTypes = exports.ColorNoiseGen = undefined;

var _constants = require('./lib/constants');

var _ColorNoiseGen = require('./lib/ColorNoiseGen');

var _ColorNoiseGen2 = _interopRequireDefault(_ColorNoiseGen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ColorNoiseGen2.default;
exports.ColorNoiseGen = _ColorNoiseGen2.default;
exports.NoiseTypes = _constants.NoiseTypes;

},{"./lib/ColorNoiseGen":7,"./lib/constants":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColorNoiseGen = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

var _NoiseFactory = require('./NoiseFactory');

var _NoiseFactory2 = _interopRequireDefault(_NoiseFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorNoiseGen = function () {
    function ColorNoiseGen(ctx) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, ColorNoiseGen);

        this.processors = window.ColorNoiseGenProcessors = window.ColorNoiseGenProcessors || [];

        this.input = ctx.createGain();
        this.output = ctx.createGain();

        this.__noiseType = null;

        this.instanceCount = 0;
        this.bufferSize = 4096;
        this.audioProcessor = null;
        this.noise = null;
        this.state = _constants.STOPPED;
        this.timeout = null;
        this.bufferTimeout = 250;

        this.noiseType = options.noiseType || _constants.NoiseTypes.BROWN;

        this.__createInternalNodes(ctx);
        this.__routeNodes();
    }

    //Public Methods


    _createClass(ColorNoiseGen, [{
        key: 'start',
        value: function start() {
            if (this.state === _constants.STOPPED) {
                this.__clearProcessorTimeout();
                this.__setNoiseGenerator(this.noiseType);
                this.__createProcessorLoop();
                this.audioProcessor.connect(this.output);
                this.state = _constants.PLAYING;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.state === _constants.PLAYING) {
                this.__setNoiseGenerator(_constants.NoiseTypes.SILENCE);
                this.__createProcessorTimeout();
                this.state = _constants.STOPPED;
            }
        }
    }, {
        key: 'remove',
        value: function remove() {
            return this.__removeProcessor(this.audioProcessor);
        }
    }, {
        key: 'connect',
        value: function connect(dest) {
            return this.output.connect(dest.input ? dest.input : dest);
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            return this.output.disconnect();
        }
    }, {
        key: '__createInternalNodes',


        // Private methods
        value: function __createInternalNodes(ctx) {
            this.audioProcessor = this.__storeProcessor(ctx.createScriptProcessor(this.bufferSize, 1, 2));
        }
    }, {
        key: '__routeNodes',
        value: function __routeNodes() {
            return this.input.connect(this.output);
        }

        // Create an array attached to the global obect.
        // The ScripProcessor must be added to the global object or it will
        // get get garbage collected to soon.

    }, {
        key: '__getProcessorIndex',
        value: function __getProcessorIndex() {
            return window.ColorNoiseGenProcessors;
        }

        // Store the processor node in the global processor array.

    }, {
        key: '__storeProcessor',
        value: function __storeProcessor(node) {
            node.id = this.processors.length;
            this.processors[node.id] = node;

            return node;
        }

        // Remove the processor node from the global processor array.

    }, {
        key: '__removeProcessor',
        value: function __removeProcessor(node) {
            delete this.processors[node.id];
            this.processors.splice(node.id, 1);

            return node;
        }
    }, {
        key: '__createProcessorLoop',
        value: function __createProcessorLoop() {
            var _this = this;

            this.audioProcessor.onaudioprocess = function (e) {
                var outBufferL = e.outputBuffer.getChannelData(0);
                var outBufferR = e.outputBuffer.getChannelData(1);
                var i = 0;
                while (i < _this.bufferSize) {
                    outBufferL[i] = _this.noise.update();
                    outBufferR[i] = _this.noise.update();
                    i++;
                }
            };
        }
    }, {
        key: '__setNoiseGenerator',
        value: function __setNoiseGenerator() {
            this.noise = _NoiseFactory2.default.create(this.noiseType);
        }

        // We create a small delay between the stop method call and the disconnect to
        // allow time for the audio buffer to fill will silence

    }, {
        key: '__createProcessorTimeout',
        value: function __createProcessorTimeout() {
            var _this2 = this;

            this.timeout = setTimeout(function () {
                if (_this2.state === _constants.STOPPED) {
                    _this2.audioProcessor.disconnect();
                }
            }, this.bufferTimeout);
        }
    }, {
        key: '__clearProcessorTimeout',
        value: function __clearProcessorTimeout() {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
            }
        }
    }, {
        key: 'noiseType',
        set: function set(noiseType) {
            this.__noiseType = noiseType;
            this.__setNoiseGenerator();
        },
        get: function get() {
            return this.__noiseType;
        }
    }]);

    return ColorNoiseGen;
}();

exports.default = ColorNoiseGen;
exports.ColorNoiseGen = ColorNoiseGen;

},{"./NoiseFactory":8,"./constants":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

var _Silence = require('./noise-modules/Silence');

var _Silence2 = _interopRequireDefault(_Silence);

var _White = require('./noise-modules/White');

var _White2 = _interopRequireDefault(_White);

var _Brown = require('./noise-modules/Brown');

var _Brown2 = _interopRequireDefault(_Brown);

var _Pink = require('./noise-modules/Pink');

var _Pink2 = _interopRequireDefault(_Pink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Noise Factory returns a the given type of noise generator.
var NoiseFactory = {
    create: function create(type) {
        var noise;

        switch (type) {
            case _constants.NoiseTypes.WHITE:
                noise = new _White2.default();
                break;

            case _constants.NoiseTypes.PINK:
                noise = new _Pink2.default();
                break;

            case _constants.NoiseTypes.BROWN:
                noise = new _Brown2.default();
                break;

            case _constants.NoiseTypes.SILENCE:
                noise = new _Silence2.default();
                break;

            default:
                noise = new _Brown2.default();
        }

        return noise;
    }
};

exports.default = NoiseFactory;

},{"./constants":9,"./noise-modules/Brown":10,"./noise-modules/Pink":12,"./noise-modules/Silence":13,"./noise-modules/White":14}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var NoiseTypes = {
    WHITE: 'white',
    BROWN: 'brown',
    PINK: 'pink',
    SILENCE: 'silence'
};

var STOPPED = 'stopped';
var PLAYING = 'playing';

exports.NoiseTypes = NoiseTypes;
exports.STOPPED = STOPPED;
exports.PLAYING = PLAYING;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NoiseBase2 = require('./NoiseBase');

var _NoiseBase3 = _interopRequireDefault(_NoiseBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrownNoise = function (_NoiseBase) {
    _inherits(BrownNoise, _NoiseBase);

    function BrownNoise() {
        _classCallCheck(this, BrownNoise);

        var _this = _possibleConstructorReturn(this, (BrownNoise.__proto__ || Object.getPrototypeOf(BrownNoise)).call(this));

        _this.base = 0;
        return _this;
    }

    _createClass(BrownNoise, [{
        key: 'update',
        value: function update() {
            var r = this.random() * 0.1;
            this.base += r;

            if (this.base < -1 || this.base > 1) {
                this.base -= r;
            }

            return this.base;
        }
    }]);

    return BrownNoise;
}(_NoiseBase3.default);

exports.default = BrownNoise;

},{"./NoiseBase":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Abstract NoiseBase Class
var NoiseBase = function () {
    function NoiseBase() {
        _classCallCheck(this, NoiseBase);

        // if (new.target === NoiseBase) {
        //     throw new TypeError('Cannot construct Abstract NoiseBase instances directly');
        // }

        if (this.update === void 0) {
            throw new TypeError('NoiseBase child instances must override update method');
        }
    }

    _createClass(NoiseBase, [{
        key: 'random',
        value: function random() {
            return Math.random() * 2 - 1;
        }
    }]);

    return NoiseBase;
}();

exports.default = NoiseBase;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NoiseBase2 = require('./NoiseBase');

var _NoiseBase3 = _interopRequireDefault(_NoiseBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PinkNoise = function (_NoiseBase) {
    _inherits(PinkNoise, _NoiseBase);

    function PinkNoise() {
        _classCallCheck(this, PinkNoise);

        var _this = _possibleConstructorReturn(this, (PinkNoise.__proto__ || Object.getPrototypeOf(PinkNoise)).call(this));

        _this.alpha = 1;
        _this.poles = 5;
        _this.multipliers = _this.__zeroFill([], _this.poles);
        _this.values = _this.__zeroFill([], _this.poles);
        _this.__fillArrays();
        return _this;
    }

    _createClass(PinkNoise, [{
        key: 'update',
        value: function update() {
            var x = this.random() * 1;

            for (var i = 0; i < this.poles; i++) {
                x -= this.multipliers[i] * this.values[i];

                this.values.unshift(x);
                this.values.pop();
            }
            return x * 0.5;
        }
    }, {
        key: '__fillArrays',
        value: function __fillArrays() {
            var a = 1;
            for (var i = 0; i < this.poles; i++) {
                a = (i - this.alpha / 2) * a / (i + 1);
                this.multipliers[i] = a;
            }

            for (var j = 0; j < this.poles * 5; j++) {
                this.update();
            }
        }
    }, {
        key: '__zeroFill',
        value: function __zeroFill(array, fillSize) {
            for (var i = 0; i < fillSize; i++) {
                array[i] = 0;
            }
            return array;
        }
    }]);

    return PinkNoise;
}(_NoiseBase3.default);

exports.default = PinkNoise;

},{"./NoiseBase":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NoiseBase2 = require('./NoiseBase');

var _NoiseBase3 = _interopRequireDefault(_NoiseBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Silence = function (_NoiseBase) {
    _inherits(Silence, _NoiseBase);

    function Silence() {
        _classCallCheck(this, Silence);

        return _possibleConstructorReturn(this, (Silence.__proto__ || Object.getPrototypeOf(Silence)).call(this));
    }

    _createClass(Silence, [{
        key: 'update',
        value: function update() {
            return 0;
        }
    }]);

    return Silence;
}(_NoiseBase3.default);

exports.default = Silence;

},{"./NoiseBase":11}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NoiseBase2 = require('./NoiseBase');

var _NoiseBase3 = _interopRequireDefault(_NoiseBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WhiteNoise = function (_NoiseBase) {
    _inherits(WhiteNoise, _NoiseBase);

    function WhiteNoise() {
        _classCallCheck(this, WhiteNoise);

        return _possibleConstructorReturn(this, (WhiteNoise.__proto__ || Object.getPrototypeOf(WhiteNoise)).call(this));
    }

    _createClass(WhiteNoise, [{
        key: 'update',
        value: function update() {
            return this.random();
        }
    }]);

    return WhiteNoise;
}(_NoiseBase3.default);

exports.default = WhiteNoise;

},{"./NoiseBase":11}],15:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

},{}],16:[function(require,module,exports){
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

},{"./SoundscapeManager":18,"@ichabodcole/timer":2}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundscapeEvent = undefined;

var _timer = require('@ichabodcole/timer');

var SoundscapeEvent = exports.SoundscapeEvent = Object.assign({}, _timer.TimerEvent);
exports.default = SoundscapeEvent;

},{"@ichabodcole/timer":2}],18:[function(require,module,exports){
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

},{"./SoundscapeModuleManager":19}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

var _SoundscapeModuleType = require('./SoundscapeModuleType');

var _SoundscapeModuleType2 = _interopRequireDefault(_SoundscapeModuleType);

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
        case _SoundscapeModuleType2.default.COLOR_NOISE_MODULE:
          return new _audioModules.ColorNoiseModule(this.ctx, this.masterGain, props);
        case _SoundscapeModuleType2.default.BINAURAL_BEAT_MODULE:
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

},{"./SoundscapeModuleType":20,"./audio-modules":24,"./helpers":26}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BINAURAL_BEAT_MODULE = exports.BINAURAL_BEAT_MODULE = 'binaural-beat-module';
var COLOR_NOISE_MODULE = exports.COLOR_NOISE_MODULE = 'color-noise-module';

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundscapeState = undefined;

var _timer = require('@ichabodcole/timer');

var SoundscapeState = exports.SoundscapeState = Object.assign({}, _timer.TimerState);
exports.default = SoundscapeState;

},{"@ichabodcole/timer":2}],22:[function(require,module,exports){
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

},{"binauralbeat-gen":3}],23:[function(require,module,exports){
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

},{"colornoise-gen":6}],24:[function(require,module,exports){
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

},{"./BinauralBeat":22,"./ColorNoise":23}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

exports.default = audioContext;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceHasSetter = instanceHasSetter;
function instanceHasSetter(obj, property) {
  return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), property);
}

},{}],27:[function(require,module,exports){
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

var SoundscapeModuleType = _interopRequireWildcard(_SoundscapeModuleType);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.audioContext = _audioContext2.default;
exports.SoundscapeConductor = _SoundscapeConductor2.default;
exports.SoundscapeManager = _SoundscapeManager2.default;
exports.SoundscapeEvent = _SoundscapeEvent2.default;
exports.SoundscapeState = _SoundscapeState2.default;
exports.SoundscapeModuleType = SoundscapeModuleType;

// export default SoundscapeConductor

},{"./SoundscapeConductor":16,"./SoundscapeEvent":17,"./SoundscapeManager":18,"./SoundscapeModuleType":20,"./SoundscapeState":21,"./audioContext":25}]},{},[27]);
