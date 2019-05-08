/*!
 * name: next-audio
 * link: https://github.com/afeiship/next-audio
 * version: 1.0.0
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxDomEvent = nx.dom ? nx.dom.Event : require('next-dom-event');
  var DEFAULT_OPTIONS = { element: null, onChange: nx.noop };
  var PROP_HOOKS = {
    rate: 'playbackRate',
    current: 'currentTime'
  };

  var NxAudio = nx.declare('nx.Audio', {
    statics: {
      STATUS: {
        stop: 0,
        play: 1,
        pause: 2
      }
    },
    properties: {
      times: {
        get: function() {
          var el = this.element;
          return {
            rate: +(el.currentTime / el.duration).toFixed(2),
            current: el.currentTime,
            total: el.duration
          };
        }
      },
      status: function() {
        return this._status;
      }
    },
    methods: {
      init: function(inOptions) {
        var callback = this._onChange.bind(this);
        this.options = nx.mix(DEFAULT_OPTIONS, inOptions);
        this.element = this.options.element;
        this._status = NxAudio.STATUS.stop;
        this._playRes = NxDomEvent.on(this.element, 'play', callback);
        this._pauseRes = NxDomEvent.on(this.element, 'pause', callback);
        this._endedRes = NxDomEvent.on(this.element, 'ended', callback);
      },

      destroy: function() {
        this._playRes.destroy();
        this._pauseRes.destroy();
        this._endedRes.destroy();
      },
      // loop/volume/rate/current
      prop: function(inKey, inValue) {
        var key = PROP_HOOKS[inKey] || inKey;
        if (typeof inValue === 'undefined') {
          return this.element[key];
        }
        this.element[key] = inValue;
      },
      play: function() {
        this.element.play();
        this._status = NxAudio.STATUS.play;
      },
      pause: function() {
        this.element.pause();
        this._status = NxAudio.STATUS.pause;
      },
      stop: function() {
        this.element.pause();
        this.element.currentTime = this.times.total;
        this._status = NxAudio.STATUS.stop;
      },
      _onChange: function(inEvent) {
        this.options.onChange(inEvent);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudio;
  }
})();
