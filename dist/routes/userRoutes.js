"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _userController = require('../controllers/userController'); var _userController2 = _interopRequireDefault(_userController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _userController2.default.create);

router.use(_loginRequired2.default);

router.get('/', _userController2.default.show);
router.put('/', _userController2.default.update);
router.delete('/', _userController2.default.delete);

/*
  * Create - POST
  * Update - PUT
  * Show (Show one USER) - GET
  * Delete - DELETE
*/

exports. default = router;
