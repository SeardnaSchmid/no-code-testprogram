# no-code-testprogram

A TypeScript library for managing test dependencies in a standardized testing environment.

## Features

- Dependency tracking for test parameters, channels, and results
- Recursive dependency resolution
- Type-safe UUID handling
- Built-in algorithms: multiplication, maximum, minimum
- Predefined unit tables (Force, Stress, Displacement, Strain, Area)
- Channel and device management
- Parameter handling (numeric, text, array)

## Installation

```sh
yarn install
```

## Usage

```typescript
import { getDependenciesForResult, STLUUID, allSTLEntities } from './src';

const dependencies = getDependenciesForResult(STLUUID.Result.StressMaximum, allSTLEntities);
```

## Development

```sh
yarn start
```

## Project Structure

```
src/
  ├── main.ts                 # Main dependency resolver
  └── standard-testing-library.ts  # Core types and interfaces
```

## Dependencies

- TypeScript ^5.7.2

## License

MIT