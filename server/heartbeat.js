'use strict';

function HeartbeatController(query) {
  var _this = this;
  this.getStatus = function(request, response) {
    query.get(function (err, result) {
      _this.handleResponse(err, result, response);
    });
  };

  this.handleResponse = function(err, result, response) {
    if (err) {
      response.status(500).json({'Connection Error:': err});
    }	else {
      if (result.rows.length > 0) {
        response.status(200).json(result.rows);
      } else {
        response.status(500).json(result.rows);
      }
    }
  };
}

module.exports = HeartbeatController;
