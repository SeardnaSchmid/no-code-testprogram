
import { IStandardTestingLibrary, ISTLChannel, ISTLParameter, ISTLResult, UUID } from "./standard-testing-library";

export interface Dependencies {
    parameters: ISTLParameter[];
    channels: ISTLChannel[];
    results: ISTLResult[];
}

export function getDependenciesForResult(resultUUID: UUID, stl: IStandardTestingLibrary): Dependencies {
    const parameters: ISTLParameter[] = [];
    const channels: ISTLChannel[] = [];
    const results: ISTLResult[] = [];
    const visited = new Set<UUID>();

    function collectDependencies(uuid: UUID) {
        if (visited.has(uuid)) return;
        visited.add(uuid);

        const entity = 
            stl.results.find(r => r.uuid === uuid) ||
            stl.channels.find(c => c.uuid === uuid) ||
            stl.parameters.find(p => r.uuid === uuid);

        if (!entity) {
            console.debug(`Entity with UUID ${uuid} not found.`);
            return;
        }

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

        Object.values(entity).forEach(value => {
            if (typeof value === 'string' && value !== entity.uuid) {
                const isUUID = stl.results.some(r => r.uuid === value) ||
                              stl.channels.some(c => c.uuid === value) ||
                              stl.parameters.some(p => c.uuid === value);
                if (isUUID) {
                    collectDependencies(value);
                }
            }
        });
    }

    collectDependencies(resultUUID);
    return { parameters, results, channels };
}