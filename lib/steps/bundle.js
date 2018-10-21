"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var semaphore_1 = require("@calebboyd/semaphore");
var resolve_dependencies_1 = require("resolve-dependencies");
function bundle(compiler, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, bundle, cwd, input, files;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = compiler.options, bundle = _a.bundle, cwd = _a.cwd, input = _a.input;
                    if (!!bundle) return [3 /*break*/, 2];
                    return [4 /*yield*/, compiler.addResource(path_1.resolve(cwd, input))];
                case 1:
                    _b.sent();
                    return [2 /*return*/, next()];
                case 2:
                    if (!input) {
                        return [2 /*return*/, next()];
                    }
                    return [4 /*yield*/, resolve_dependencies_1.default(input, { cwd: cwd, expand: true, loadContent: false })];
                case 3:
                    files = (_b.sent()).files;
                    return [4 /*yield*/, semaphore_1.each(Object.keys(files), function (filename) { return compiler.addResource(filename); }, {
                            concurrency: 10
                        })];
                case 4:
                    _b.sent();
                    return [2 /*return*/, next()];
            }
        });
    });
}
exports.default = bundle;
