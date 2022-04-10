"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = exports.default = void 0;
var tslib_1 = require("tslib");
var dictcc_1 = require("./dictcc");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return tslib_1.__importDefault(dictcc_1).default; } });
var languages_1 = require("./languages");
Object.defineProperty(exports, "Languages", { enumerable: true, get: function () { return languages_1.Languages; } });
tslib_1.__exportStar(require("./types"), exports);
