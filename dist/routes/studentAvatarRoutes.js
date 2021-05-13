"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _studentAvatarController = require('../controllers/studentAvatarController'); var _studentAvatarController2 = _interopRequireDefault(_studentAvatarController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.use(_loginRequired2.default);

router.post('/:studentId', _studentAvatarController2.default.create);

exports. default = router;
