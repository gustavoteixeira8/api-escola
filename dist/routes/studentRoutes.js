"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _studentController = require('../controllers/studentController'); var _studentController2 = _interopRequireDefault(_studentController);

const router = new (0, _express.Router)();

router.use(_loginRequired2.default);

router.post('/', _studentController2.default.create);
router.get('/', _studentController2.default.index);
router.get('/:studentId', _studentController2.default.show);
router.put('/:studentId', _studentController2.default.update);
router.delete('/:studentId', _studentController2.default.delete);

exports. default = router;
