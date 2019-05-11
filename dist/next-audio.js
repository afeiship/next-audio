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
        ended: 4
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
        this.options = nx.mix({ onChange: nx.noop, onLoad: nx.noop }, inOptions);
        this._status = NxAudio.STATUS.init;
        this._playRes = NxDomEvent.on(this.element, 'play', callback);
        this._pauseRes = NxDomEvent.on(this.element, 'pause', callback);
        this._endedRes = NxDomEvent.on(this.element, 'ended', callback);
        this._timeupdateRes = NxDomEvent.on(this.element, 'timeupdate', callback);
        this._loadedmetadataRes = NxDomEvent.on(this.element, 'loadedmetadata', callback);
      },

      destroy: function() {
        this._playRes.destroy();
        this._pauseRes.destroy();
        this._endedRes.destroy();
        this._timeupdateRes.destroy();
        this._loadedmetadataRes.destroy();
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
        this.element.currentTime = this.times.total * num;
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
      onTimeUpdate: function(inEvent) {
        var type = inEvent.type;
        var paused = this.element.paused;
        if (type !== 'timeupdate') {
          this._status = NxAudio.STATUS[type];
        } else {
          this._status = paused ? NxAudio.STATUS.pause : NxAudio.STATUS.play;
        }
      },
      onLoad: function(inEvent) {
        var type = inEvent.type;
        if (type === 'loadedmetadata') {
          this.options.onLoad(inEvent);
        }
      },
      _onChange: function(inEvent) {
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
