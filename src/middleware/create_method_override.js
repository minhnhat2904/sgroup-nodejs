module.exports = function methodOverride (getter, options) {
    var opts = options || {}
    // get the getter fn
    var get = typeof getter === 'function'
      ? getter // get = getter
      : createGetter(getter || 'X-HTTP-Method-Override');
  
    // get allowed request methods to examine
    var methods = opts.methods === undefined
      ? ['POST']
      : opts.methods;
    //methods = ['POST']
  
    return function methodOverride (req, res, next) {
      var val;

      req.originalMethod = req.originalMethod || req.method;
  
      // validate request is an allowed method
      if (methods && methods.indexOf(req.originalMethod) === -1) {
        return next()
      }
      val = get(req, res);  
      // replace
      if (val !== undefined) {
        req.method = val;
        // debug('override %s as %s', req.originalMethod, req.method)
      }
  
      next()
    }
  }