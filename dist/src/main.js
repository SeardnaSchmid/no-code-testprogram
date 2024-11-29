"use strict";
function getDependenciesForResult(resultUUID, stl) {
    const parameters = [];
    const channels = [];
    const results = [];
    const visitedResults = new Set();
    const visitedChannels = new Set();
    const visitedParameters = new Set();
    function collectResultDependencies(resultUUID) {
        var _a;
        if (visitedResults.has(resultUUID))
            return;
        visitedResults.add(resultUUID);
        const result = (_a = stl.results) === null || _a === void 0 ? void 0 : _a.find(r => r.uuid === resultUUID);
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
    function collectChannelDependencies(channelUUID) {
        var _a;
        if (visitedChannels.has(channelUUID))
            return;
        visitedChannels.add(channelUUID);
        const channel = (_a = stl.channels) === null || _a === void 0 ? void 0 : _a.find(c => c.uuid === channelUUID);
        if (channel) {
            channels.push(channel);
            if ('deviceInput' in channel) {
                // DeviceChannel
                // Add device dependencies if needed
            }
            else if (channel.algorithm === StlAlgorithm.multiplication) {
                collectChannelDependencies(channel.inputChannelId1);
                collectChannelDependencies(channel.inputChannelId2);
            }
        }
    }
    function collectParameterDependencies(parameterUUID) {
        var _a;
        if (visitedParameters.has(parameterUUID))
            return;
        visitedParameters.add(parameterUUID);
        const parameter = (_a = stl.parameters) === null || _a === void 0 ? void 0 : _a.find(p => p.uuid === parameterUUID);
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
