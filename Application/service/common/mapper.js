var express = require('express')
  , utils = require('./utils');

module.exports = {
    map: function (src, dest, map) {
      if (!utils.isDefined(dest))
      {
        dest = {};
      }
  	  if (utils.isDefined(map)) {
  		  for (i in map) {
  			  src[map[i]] = src[i];
  			  delete src[i];
  		  }
  	  }
      Object.keys(src).forEach(function(k) {
        dest[k] = src[k];
      });
      return dest;
    }
};
