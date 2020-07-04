(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxAudio = require('../src/next-audio');

  describe('NxAudio.methods', function() {
    test('init', function() {
      var data = {
        key: 1,
        value: 2
      };
      expect(!!data).toBe(true);
    });
  });
})();
