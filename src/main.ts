import { allSTLEntities, IStandardTestingLibrary, ISTLChannel, ISTLParameter, ISTLResult, STLUUID, UUID, EntityUUIDProperties } from "./standard-testing-library";

function getDependenciesForResult(resultUUID: UUID, stl: IStandardTestingLibrary) {
    const parameters: ISTLParameter[] = [];
    const channels: ISTLChannel[] = [];
    const results: ISTLResult[] = [];
    const visited = new Set<UUID>();

    function collectDependencies(uuid: UUID) {
        if (visited.has(uuid)) return;
        visited.add(uuid);

        // Find the entity
        const entity = 
            stl.results.find(r => r.uuid === uuid) ||
            stl.channels.find(c => c.uuid === uuid) ||
            stl.parameters.find(p => p.uuid === uuid);

        if (!entity) {
            console.debug(`Entity with UUID ${uuid} not found.`);
            return; // If no entity is found, return early
        }

        // Add to appropriate collection
        if ('algorithm' in entity && 'unittable' in entity) {
            if (!results.includes(entity as ISTLResult)) {
                results.push(entity as ISTLResult);
            }
        } else if ('unittable' in entity) {
            if (!channels.includes(entity as ISTLChannel)) {
                channels.push(entity as ISTLChannel);
            }
        } else {
            if (!parameters.includes(entity as ISTLParameter)) {
                parameters.push(entity as ISTLParameter);
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
const dependencies = getDependenciesForResult(STLUUID.Result.StressMaximum, allSTLEntities);
console.log(dependencies);