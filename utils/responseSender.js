const RecordError = require('../exceptions/recordError');

/**
 * [sendPromiseResult description]
 * @param  {Promise}   promise [description]
 * @param  {[type]}   req     express's req
 * @param  {[type]}   res     express's res
 * @param  {Function} next    express middleware next function
 */
function sendPromiseResult(promise, req, res, next) {
    promise.then(function(result) {
            // logger.logRequest(req);
            if (result && result.hasOwnProperty('success')) return res.json(result);

            res.json({
              success: true,
              data: result
            });
        })
        .catch(RecordError,  function (error) {
          res.status(400).json({message: error.message});
        })
        .catch(apiErrorPredicate, function (err) {
          if (err.error.internalStatus) return res.status(err.statusCode).send(err.error);

          throw err;
        })
        .catch(next);
}

function apiErrorPredicate(err) {
  return !!err.statusCode;
}

module.exports = {
    sendPromiseResult: sendPromiseResult
};
