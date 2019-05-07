(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var PROP_HOOKS = {
    rate: 'playbackRate'
  };

  var NxAudio = nx.declare('nx.Audio', {
    methods: {
      init: function(inOptions) {
        this.element = inOptions.element;
      },
      // loop/volume/rate
      prop: function(inKey, inValue) {
        var key = PROP_HOOKS[inKey] || inKey;
        if (typeof inValue === 'undefined') {
          return this.element[key];
        }
        this.element[key] = inValue;
      },
      stop: function() {
        this.element.load();
      },
      'play,pause': function(inName) {
        return function() {
          this.element[inName].apply(this.element, arguments);
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudio;
  }
})();
