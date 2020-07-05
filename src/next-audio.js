(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDomEvent = nx.DomEvent || require('@feizheng/next-dom-event');

  var EVENTS = [
    'error',
    'play',
    'pause',
    'ended',
    'timeupdate',
    'loadedmetadata',
    'load',
    'canplay'
  ];

  var PROP_HOOKS = {
    rate: 'playbackRate',
    current: 'currentTime'
  };

  var NxAudio = nx.declare('nx.Audio', {
    statics: {
      STATUS: {
        error: -1,
        init: 0,
        play: 1,
        pause: 2,
        loaded: 3,
        ended: 4,
        canplay: 5
      }
    },
    properties: {
      times: {
        get: function () {
          var el = this.element;
          return {
            rate: +(el.currentTime / el.duration).toFixed(2),
            current: el.currentTime || 0,
            duration: el.duration || 0
          };
        }
      },
      status: function () {
        return this._status;
      }
    },
    methods: {
      init: function (inElement, inOptions) {
        if (!inElement) return;
        var callback = this.onChange.bind(this);
        this.element = inElement;
        this.options = nx.mix({ onChange: nx.noop }, inOptions);
        this._status = NxAudio.STATUS.init;
        EVENTS.forEach(function (event) {
          this['_' + event + 'Res'] = NxDomEvent.on(
            this.element,
            event,
            callback
          );
        }, this);
      },
      destroy: function () {
        EVENTS.forEach(function (event) {
          this['_' + event + 'Res'].destroy();
        }, this);
        document.body.removeChild(this.element);
        this.element = null;
      },
      // loop/volume/rate/current/muted
      prop: function (inKey, inValue) {
        var key = PROP_HOOKS[inKey] || inKey;
        var value = this.element[key];
        var event = { type: 'prop', target: { key: inKey, value: value } };
        if (typeof inValue === 'undefined') {
          return value;
        }
        this.element[key] = inValue;
        this.options.onChange(event);
      },
      'play,pause,load': function (inName) {
        return function () {
          if (!this.element) return Promise.resolve();
          return this.element[inName].apply(this.element, arguments);
        }
      },
      move: function (inNumber) {
        var num = inNumber > 1 ? 1 : inNumber;
        this.element.currentTime = this.times.duration * num;
      },
      seek: function (inNumber) {
        this.element.currentTime = inNumber;
      },
      stop: function () {
        if (!this.element) return Promise.resolve();
        this.element.currentTime = this.times.duration;
        return this.element.pause();
      },
      onTimeUpdate: function (inEvent) {
        var type = inEvent.type;
        var paused = this.element.paused;
        if (type !== 'timeupdate') {
          this._status = NxAudio.STATUS[type];
        } else {
          this._status = paused ? NxAudio.STATUS.pause : NxAudio.STATUS.play;
        }
      },
      onLoad: function (inEvent) {
        var type = inEvent.type;
        if (type === 'loadedmetadata') {
          this._status = NxAudio.STATUS.loaded;
        }
      },
      onChange: function (inEvent) {
        this.onTimeUpdate(inEvent);
        this.onLoad(inEvent);
        this.options.onChange(inEvent);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudio;
  }
})();
