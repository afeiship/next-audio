(function() {
  const NxAudio = require('../src');

  describe('NxAudio.methods', function() {
    test('init', function() {
      const data = { key: 1, value: 2 };
      expect(!!data).toBe(true);
    });
  });
})();
