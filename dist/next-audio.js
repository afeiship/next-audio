/*!
 * name: next-audio
 * link: https://github.com/afeiship/next-audio
 * version: 1.0.1
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxDomEvent = nx.dom ? nx.dom.Event : require('next-dom-event');
  var EVENTS = [
    'play',
    'pause',
    'ended',
    'timeupdate',
    'loadedmetadata',
    'error',
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
        if (!inElement) return;
        var callback = this._onChange.bind(this);
        this.element = inElement;
        this.options = nx.mix({ onChange: nx.noop }, inOptions);
        this._status = NxAudio.STATUS.init;
        EVENTS.forEach(function(event) {
          this['_' + event + 'Res'] = NxDomEvent.on(
            this.element,
            event,
            callback
          );
        }, this);
      },
      destroy: function() {
        EVENTS.forEach(function(event) {
          this['_' + event + 'Res'].destroy();
        }, this);
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
          this._status = NxAudio.STATUS.loaded;
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
