import { StandardTestingLibrary, stl, StlAlgorithm, STLChannel, STLParameter, STLResults, STLUUID, UUID } from "./standard-testing-library";

function getDependenciesForResult(resultUUID: UUID, stl: StandardTestingLibrary) {
    const parameters: STLParameter[] = [];
    const channels: STLChannel[] = [];
    const results: STLResults[] = [];

    const visitedResults = new Set<UUID>();
    const visitedChannels = new Set<UUID>();
    const visitedParameters = new Set<UUID>();

    function collectResultDependencies(resultUUID: UUID) {
        if (visitedResults.has(resultUUID)) return;
        visitedResults.add(resultUUID);

        const result = stl.results?.find(r => r.uuid === resultUUID);
        if (result) {
            results.push(result);

            switch (result.algorithm) {
                case StlAlgorithm.maximum:
                case StlAlgorithm.minimum:
                    collectChannelDependencies(result.input);
                    break;
                case StlAlgorithm.multiplication:
                    collectParameterDependencies(result.input1);
                    collectParameterDependencies(result.input2);
                    break;
            }
        }
    }

    function collectChannelDependencies(channelUUID: UUID) {
        if (visitedChannels.has(channelUUID)) return;
        visitedChannels.add(channelUUID);

        const channel = stl.channels?.find(c => c.uuid === channelUUID);
        if (channel) {
            channels.push(channel);

            if ('deviceInput' in channel) {
                // DeviceChannel
                // Add device dependencies if needed
            } else if (channel.algorithm === StlAlgorithm.multiplication) {
                collectChannelDependencies(channel.inputChannelId1);
                collectChannelDependencies(channel.inputChannelId2);
            }
        }
    }

    function collectParameterDependencies(parameterUUID: UUID) {
        if (visitedParameters.has(parameterUUID)) return;
        visitedParameters.add(parameterUUID);

        const parameter = stl.parameters?.find(p => p.uuid === parameterUUID);
        if (parameter) {
            parameters.push(parameter);
        }
    }

    collectResultDependencies(resultUUID);

    return { parameters, results, channels };
}

// Example usage:
const dependencies = getDependenciesForResult(STLUUID.Result.StressMaximum, stl);
console.log(dependencies);