import { STLUUID as StlMacroIds, STLUUID } from "./stl-uuids";

type UUID = string; // UUIDs are strings

enum StlUnitTable {
    Force = 'stl.unittable.force',
    Stress = 'stl.unittable.stress',
    Displacement = 'stl.unittable.displacement',
    Strain = 'stl.unittable.strain',
    Area = 'stl.unittable.area',
}

// Base interfaces
interface BaseChannel {
    uuid: UUID;
    unitTable: StlUnitTable;
}

interface BaseResult {
    uuid: UUID;
    unitTable: StlUnitTable;
}

// Algorithm enumeration
enum StlAlgorithm {
    multiplication = 'multiplication',
    maximum = 'maximum',
    minimum = 'minimum',
}

// CHANNELS
interface DeviceChannel extends BaseChannel {
    deviceInput: UUID;
}

interface MultiplicationChannel extends BaseChannel {
    algorithm: StlAlgorithm.multiplication;
    inputChannelId1: UUID;
    inputChannelId2: UUID;
}

// RESULTS
interface MaximumResult extends BaseResult {
    algorithm: StlAlgorithm.maximum;
    input: UUID;
}

interface MinimumResult extends BaseResult {
    algorithm: StlAlgorithm.minimum;
    input: UUID;
}

interface MultiplicationResult extends BaseResult {
    algorithm: StlAlgorithm.multiplication;
    input1: UUID;
    input2: UUID;
}

type STLChannel = DeviceChannel | MultiplicationChannel;
type STLResults = MaximumResult | MinimumResult | MultiplicationResult;

// Main interface
interface StandardTestingLibrary {
    channels?: STLChannel[];
    results?: STLResults[];
}

// Constants
const stl: StandardTestingLibrary = {
    channels: [
        {
            uuid: STLUUID.Channels.Force,
            unitTable: StlUnitTable.Force,
            deviceInput: STLUUID.Devices.ForceSensor,
        },
        {
            uuid: STLUUID.Channels.Stress,
            unitTable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.multiplication,
            inputChannelId1: STLUUID.Channels.Force,
            inputChannelId2: STLUUID.Parameters.CrossSection,
        },
    ],
    results: [
        {
            uuid: STLUUID.Results.ForceMaximum,
            unitTable: StlUnitTable.Force,
            algorithm: StlAlgorithm.maximum,
            input: STLUUID.Channels.Force,
        },
        {
            uuid: STLUUID.Results.StressMaximum,
            unitTable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.maximum,
            input: STLUUID.Channels.Stress,
        },
    ],
};