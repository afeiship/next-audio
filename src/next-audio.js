(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  var NxAudio = nx.declare('nx.Audio', {
    methods: {
      init: function(inOptions) {
        this.element = inOptions.element;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudio;
  }
})();
