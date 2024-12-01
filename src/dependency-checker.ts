import { UUID } from "./types/common";
import { IChannel } from "./types/channels";
import { IParameter } from "./types/parameters";
import { IResult } from "./types/results";
import { IStandardTestingLibrary } from "./standard-testing-library";

export interface Dependencies {
    parameters: IParameter[];
    channels: IChannel[];
    results: IResult[];
}

export function getDependenciesForResult(resultUUID: UUID, stl: IStandardTestingLibrary): Dependencies {
    const parameters: IParameter[] = [];
    const channels: IChannel[] = [];
    const results: IResult[] = [];
    const visited = new Set<UUID>();

    function collectDependencies(uuid: UUID) {
        if (visited.has(uuid)) return;
        visited.add(uuid);

        const entity = 
            stl.results.find(r => r.uuid === uuid) ||
            stl.channels.find(c => c.uuid === uuid) ||
            stl.parameters.find(p => p.uuid === uuid);

        if (!entity) {
            console.debug(`Entity with UUID ${uuid} not found.`);
            return;
        }

        if ('algorithm' in entity && 'unittable' in entity) {
            if (!results.includes(entity as IResult)) {
                results.push(entity as IResult);
            }
        } else if ('unittable' in entity) {
            if (!channels.includes(entity as IChannel)) {
                channels.push(entity as IChannel);
            }
        } else {
            if (!parameters.includes(entity as IParameter)) {
                parameters.push(entity as IParameter);
            }
        }

        Object.values(entity).forEach(value => {
            if (typeof value === 'string' && value !== entity.uuid) {
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