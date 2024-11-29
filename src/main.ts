import { allSTLEntities, IStandardTestingLibrary, ISTLChannel, ISTLParameter, ISTLResult, STLUUID, UUID } from "./standard-testing-library";

function getDependenciesForResult(resultUUID: UUID, stl: IStandardTestingLibrary) {
  const parameters: ISTLParameter[] = [];
  const channels: ISTLChannel[] = [];
  const results: ISTLResult[] = [];
  const visited = new Set<UUID>();

  function collectDependencies(uuid: UUID) {
    if (visited.has(uuid)) return;
    visited.add(uuid);

    const result = allSTLEntities.results.find(r => r.uuid === uuid);
    if (result) {
      results.push(result);
      result.dependencies?.forEach(collectDependencies);
      return;
    }

    const channel = allSTLEntities.channels.find(c => c.uuid === uuid);
    if (channel) {
      channels.push(channel);
      channel.dependencies?.forEach(collectDependencies);
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
const dependencies = getDependenciesForResult(STLUUID.Result.StressMaximum, allSTLEntities);
console.log(dependencies);