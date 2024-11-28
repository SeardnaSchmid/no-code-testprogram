import { STLUUID as StlMacroIds, STLUUID } from "./stl-uuids";

type UUID = string; // UUIDs are strings

enum StlAlgorithm {
    multiplication = 'multiplication',
    maximum = 'maximum',
    minimum = 'minimum',
}

enum StlUnitTable {
    Force = 'stl.unittable.force',
    Stress = 'stl.unittable.stress',
    Displacement = 'stl.unittable.displacement',
    Strain = 'stl.unittable.strain',
    Area = 'stl.unittable.area',
}

interface BaseEntity {
    uuid: UUID;
}

interface BaseChannel extends BaseEntity {
    unittable: string;
}
interface BaseResult extends BaseEntity{
    unittable: string;
    algorithm: StlAlgorithm;
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
// PARAMETERS
interface NumericParameter extends BaseEntity {
    value: number;
}
interface TextParameter extends BaseEntity {
    value: string;
}
interface ArrayParameter extends BaseEntity {
    value: number[];
}

type STLChannel = MultiplicationChannel | DeviceChannel;
type STLResults = MaximumResult | MinimumResult | MultiplicationResult;
type STLParameter = NumericParameter | TextParameter | ArrayParameter;

interface StandardTestingLibrary {
    channels?: STLChannel[];
    results?: STLResults[];
    parameters?: STLParameter[]
}

const stl: StandardTestingLibrary = {
    channels: [
        {
            uuid: StlMacroIds.Channel.Force,
            unittable: StlUnitTable.Force,
            deviceInput: StlMacroIds.Device.ForceSensor,
        },
        {
            uuid: StlMacroIds.Channel.Stress,
            unittable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.multiplication,
            inputChannelId1: StlMacroIds.Channel.Force,
            inputChannelId2: StlMacroIds.Channel.Area,
        }
    ],
    results: [
        {
            uuid: StlMacroIds.Result.ForceMaximum,
            unittable: StlUnitTable.Force,
            algorithm: StlAlgorithm.maximum,
            input: StlMacroIds.Channel.Force,
        },
        {
            uuid: StlMacroIds.Result.StressMaximum,
            unittable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.maximum,
            input: StlMacroIds.Channel.Stress,
        },
        {
            uuid: STLUUID.Result.CrossSection,
            unittable: StlUnitTable.Area,
            algorithm: StlAlgorithm.multiplication,
            input1: StlMacroIds.Parameter.SpecimenWidth,
            input2: StlMacroIds.Parameter.SpecimenThickness,
        }
    ],
    parameters: [
        {
            uuid: StlMacroIds.Parameter.SpecimenWidth,
            value: 1, // default value
        },
        {
            uuid: StlMacroIds.Parameter.SpecimenThickness,
            value: 1, // default value
        }
    ]
}