var assert = require('assert');
//var MediaService = require('../src/mediaService.js');
import MediaService from '../src/mediaService.js';
var mediaService = new MediaService();

describe("addMatchMedia", function() {

    mediaService.addMatchMedia('tablet', '(min-width: 760px)');

    it("test", function() {
      assert(!!mediaService.addMatchMedia);
  });
});
