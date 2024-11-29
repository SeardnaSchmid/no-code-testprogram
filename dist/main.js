"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const standard_testing_library_1 = require("./standard-testing-library");
function getDependenciesForResult(resultUUID, stl) {
    const parameters = [];
    const channels = [];
    const results = [];
    const visited = new Set();
    function collectDependencies(uuid) {
        var _a, _b;
        if (visited.has(uuid))
            return;
        visited.add(uuid);
        const result = standard_testing_library_1.allSTLEntities.results.find(r => r.uuid === uuid);
        if (result) {
            results.push(result);
            (_a = result.dependencies) === null || _a === void 0 ? void 0 : _a.forEach(collectDependencies);
            return;
        }
        const channel = standard_testing_library_1.allSTLEntities.channels.find(c => c.uuid === uuid);
        if (channel) {
            channels.push(channel);
            (_b = channel.dependencies) === null || _b === void 0 ? void 0 : _b.forEach(collectDependencies);
            return;
        }
        const parameter = stl.parameters.find(p => p.uuid === uuid);
        if (parameter) {
            parameters.push(parameter);
        }
    }
    collectDependencies(resultUUID);
    return { parameters, results, channels };
}
// Example usage:
const dependencies = getDependenciesForResult(standard_testing_library_1.STLUUID.Result.StressMaximum, standard_testing_library_1.allSTLEntities);
console.log(dependencies);
