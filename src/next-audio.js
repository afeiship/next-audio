(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxDomEvent = nx.dom ? nx.dom.Event : require('next-dom-event');
  var DEFAULT_OPTIONS = { onChange: nx.noop };
  var PROP_HOOKS = {
    rate: 'playbackRate',
    current: 'currentTime'
  };

  var NxAudio = nx.declare('nx.Audio', {
    statics: {
      STATUS: {
        init: 0,
        play: 1,
        pause: 2,
        ended: 4,
        timeupdate: 3
      }
    },
    properties: {
      times: {
        get: function() {
          var el = this.element;
          return {
            rate: +(el.currentTime / el.duration).toFixed(2),
            current: el.currentTime || 0,
            total: el.duration || 0
          };
        }
      },
      status: function() {
        return this._status;
      }
    },
    methods: {
      init: function(inElement, inOptions) {
        var callback = this._onChange.bind(this);
        this.element = inElement;
        this.options = nx.mix(DEFAULT_OPTIONS, inOptions);
        this._status = NxAudio.STATUS.init;
        this._playRes = NxDomEvent.on(this.element, 'play', callback);
        this._pauseRes = NxDomEvent.on(this.element, 'pause', callback);
        this._endedRes = NxDomEvent.on(this.element, 'ended', callback);
        this._timeupdateRes = NxDomEvent.on(this.element, 'timeupdate', callback);
      },

      destroy: function() {
        this._playRes.destroy();
        this._pauseRes.destroy();
        this._endedRes.destroy();
        this._timeupdateRes.destroy();
      },
      // loop/volume/rate/current
      prop: function(inKey, inValue) {
        var key = PROP_HOOKS[inKey] || inKey;
        if (typeof inValue === 'undefined') {
          return this.element[key];
        }
        this.element[key] = inValue;
      },
      move: function(inNumber) {
        var num = inNumber > 1 ? 1 : inNumber;
        var paused = this.element.paused;
        this.element.currentTime = this.times.total * num;
        paused ? this.pause() : this.play();
      },
      play: function() {
        this.element.play();
      },
      pause: function() {
        this.element.pause();
      },
      stop: function() {
        this.element.pause();
        this.element.currentTime = this.times.total;
      },
      _onChange: function(inEvent) {
        this._status = NxAudio.STATUS[inEvent.type];
        this.options.onChange(inEvent);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudio;
  }
})();
