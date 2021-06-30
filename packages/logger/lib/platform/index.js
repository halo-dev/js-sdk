"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectPlatformDeps = exports.platformDeps = void 0;
exports.platformDeps = {
    log(..._args) {
        throw new Error("not implemented");
    }
};
const injectPlatformDeps = (deps) => {
    exports.platformDeps.log = deps.log;
};
exports.injectPlatformDeps = injectPlatformDeps;
//# sourceMappingURL=index.js.map