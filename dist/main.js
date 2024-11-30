"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const standard_testing_library_1 = require("./standard-testing-library");
function getDependenciesForResult(resultUUID, stl) {
    const parameters = [];
    const channels = [];
    const results = [];
    const visited = new Set();
    function collectDependencies(uuid) {
        if (visited.has(uuid))
            return;
        visited.add(uuid);
        // Find the entity
        const entity = stl.results.find(r => r.uuid === uuid) ||
            stl.channels.find(c => c.uuid === uuid) ||
            stl.parameters.find(p => p.uuid === uuid);
        if (!entity)
            return;
        // Add to appropriate collection
        if ('algorithm' in entity && 'unittable' in entity) {
            if (!results.includes(entity)) {
                results.push(entity);
            }
        }
        else if ('unittable' in entity) {
            if (!channels.includes(entity)) {
                channels.push(entity);
            }
        }
        else {
            if (!parameters.includes(entity)) {
                parameters.push(entity);
            }
        }
        // Collect dependencies from all UUID properties
        Object.values(entity).forEach(value => {
            if (typeof value === 'string' && value !== entity.uuid) {
                // Check if the string value matches UUID pattern or exists in STL
                const isUUID = stl.results.some(r => r.uuid === value) ||
                    stl.channels.some(c => c.uuid === value) ||
                    stl.parameters.some(p => p.uuid === value);
                if (isUUID) {
                    collectDependencies(value);
                }
            }
        });
    }
    collectDependencies(resultUUID);
    return { parameters, results, channels };
}
// Example usage:
const dependencies = getDependenciesForResult(standard_testing_library_1.STLUUID.Result.StressMaximum, standard_testing_library_1.allSTLEntities);
console.log(dependencies);
