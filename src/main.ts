import { allSTLEntities, STLUUID } from "./standard-testing-library";
import { getDependenciesForResult } from "./dependency-checker";




// Example usage:
const dependencies = getDependenciesForResult(STLUUID.Result.StressMaximum, allSTLEntities);
console.log(dependencies);