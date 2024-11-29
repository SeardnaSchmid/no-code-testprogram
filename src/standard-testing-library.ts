export type UUID = string; // UUIDs are strings

export enum StlAlgorithm {
    multiplication = 'multiplication',
    maximum = 'maximum',
    minimum = 'minimum',
}

export enum StlUnitTable {
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

export type STLChannel = MultiplicationChannel | DeviceChannel;
export type STLResults = MaximumResult | MinimumResult | MultiplicationResult;
export type STLParameter = NumericParameter | TextParameter | ArrayParameter;

export interface StandardTestingLibrary {
    channels?: STLChannel[];
    results?: STLResults[];
    parameters?: STLParameter[]
}

export const STLUUID = {
    Channel: {
        Force: 'uuid.channel.force',
        Stress: 'uuid.channel.stress',
        Displacement: 'uuid.channel.displacement',
        Strain: 'uuid.channel.strain',
    },
    Result: {
        ForceMaximum: 'uuid.result.force.maximum',
        StressMaximum: 'uuid.result.stress.maximum',
        ReferenceValue: 'uuid.result.referenceValue',
        CrossSection: 'uuid.result.crossSection',
    },
    Parameter: {
        SpecimenWidth: 'uuid.parameter.specimenWidth',
        SpecimenThickness: 'uuid.parameter.specimenThickness',
        SpecimentLength: 'uuid.parameter.specimenLength',
        SpecimentDiameter: 'uuid.parameter.specimenDiameter',
        GaugeLength: 'uuid.parameter.gaugeLength',
    },
    Device: {
        ForceSensor: 'uuid.device.forceSensor',
        StressSensor: 'uuid.device.stressSensor',
        DisplacementSensor: 'uuid.device.displacementSensor',
        StrainSensor: 'uuid.device.strainSensor',
    }
}

export const stl: StandardTestingLibrary = {
    channels: [
        {
            uuid: STLUUID.Channel.Force,
            unittable: StlUnitTable.Force,
            deviceInput: STLUUID.Device.ForceSensor,
        },
        {
            uuid: STLUUID.Channel.Stress,
            unittable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.multiplication,
            inputChannelId1: STLUUID.Channel.Force,
            inputChannelId2: STLUUID.Result.CrossSection,
        },
    ],
    results: [
        {
            uuid: STLUUID.Result.ForceMaximum,
            unittable: StlUnitTable.Force,
            algorithm: StlAlgorithm.maximum,
            input: STLUUID.Channel.Force,
        },
        {
            uuid: STLUUID.Result.StressMaximum,
            unittable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.maximum,
            input: STLUUID.Channel.Stress,
        },
        {
            uuid: STLUUID.Result.CrossSection,
            unittable: StlUnitTable.Area,
            algorithm: StlAlgorithm.multiplication,
            input1: STLUUID.Parameter.SpecimenWidth,
            input2: STLUUID.Parameter.SpecimenThickness,
        }
    ],
    parameters: [
        {
            uuid: STLUUID.Parameter.SpecimenWidth,
            value: 1, // default value
        },
        {
            uuid: STLUUID.Parameter.SpecimenThickness,
            value: 1, // default value
        },
        {
            uuid: STLUUID.Parameter.SpecimentLength,
            value: 1, // default value
        },
        {
            uuid: STLUUID.Parameter.SpecimentDiameter,
            value: 1, // default value
        },
        {
            uuid: STLUUID.Parameter.GaugeLength,
            value: 115, // default value
        },
    ]
}