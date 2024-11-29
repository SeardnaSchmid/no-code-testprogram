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

interface IBaseEntity {
    uuid: UUID;
    dependencies?: UUID[];
}

interface IBaseChannel extends IBaseEntity {
    unittable: string;
}
interface IBaseResult extends IBaseEntity{
    unittable: string;
    algorithm: StlAlgorithm;
}

// CHANNELS
interface IDeviceChannel extends IBaseChannel {
    deviceInput: UUID;
}
interface IMultiplicationChannel extends IBaseChannel {
    algorithm: StlAlgorithm.multiplication;
    inputChannelId1: UUID;
    inputChannelId2: UUID;
}

// RESULTS
interface IMaximumResult extends IBaseResult {
    algorithm: StlAlgorithm.maximum;
    input: UUID;
}
interface IMinimumResult extends IBaseResult {
    algorithm: StlAlgorithm.minimum;
    input: UUID;
}
interface IMultiplicationResult extends IBaseResult {
    algorithm: StlAlgorithm.multiplication;
    input1: UUID;
    input2: UUID;
}

// PARAMETERS
interface INumericParameter extends IBaseEntity {
    value: number;
}
interface ITextParameter extends IBaseEntity {
    value: string;
}
interface IArrayParameter extends IBaseEntity {
    value: number[];
}

export type ISTLChannel = IMultiplicationChannel | IDeviceChannel;
export type ISTLResult = IMaximumResult | IMinimumResult | IMultiplicationResult;
export type ISTLParameter = INumericParameter | ITextParameter | IArrayParameter;

export interface IStandardTestingLibrary {
    channels: ISTLChannel[];
    results: ISTLResult[];
    parameters: ISTLParameter[]
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

export const allSTLEntities: IStandardTestingLibrary = {
    channels: [
        {
            uuid: STLUUID.Channel.Force,
            unittable: StlUnitTable.Force,
            deviceInput: STLUUID.Device.ForceSensor,
            dependencies: [STLUUID.Device.ForceSensor],
        },
        {
            uuid: STLUUID.Channel.Stress,
            unittable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.multiplication,
            inputChannelId1: STLUUID.Channel.Force,
            inputChannelId2: STLUUID.Result.CrossSection,
            dependencies: [STLUUID.Channel.Force, STLUUID.Result.CrossSection],
        },
    ],
    results: [
        {
            uuid: STLUUID.Result.ForceMaximum,
            unittable: StlUnitTable.Force,
            algorithm: StlAlgorithm.maximum,
            input: STLUUID.Channel.Force,
            dependencies: [STLUUID.Channel.Force],
        },
        {
            uuid: STLUUID.Result.StressMaximum,
            unittable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.maximum,
            input: STLUUID.Channel.Stress,
            dependencies: [STLUUID.Channel.Stress],
        },
        {
            uuid: STLUUID.Result.CrossSection,
            unittable: StlUnitTable.Area,
            algorithm: StlAlgorithm.multiplication,
            input1: STLUUID.Parameter.SpecimenWidth,
            input2: STLUUID.Parameter.SpecimenThickness,
            dependencies: [STLUUID.Parameter.SpecimenWidth, STLUUID.Parameter.SpecimenThickness],
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