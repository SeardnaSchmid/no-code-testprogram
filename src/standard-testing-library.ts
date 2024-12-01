import { ImportedExistingCrossSectionResult } from './existing-entities';
import { IBaseEntity } from './types/common';
import { Algorithm, UnitTable } from './types/enums';
import { IChannel } from './types/channels';
import { IResult } from './types/results';
import { IParameter } from './types/parameters';

export interface IStandardTestingLibrary {
    channels: IChannel[];
    results: IResult[];
    parameters: IParameter[];
    devices: IBaseEntity[];
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
        CrossSection: ImportedExistingCrossSectionResult.id, // Updated to use imported ID
    },
    Parameter: {
        SpecimenWidth: 'uuid.parameter.specimenWidth',
        SpecimenThickness: 'uuid.parameter.specimenThickness',
        SpecimentLength: 'uuid.parameter.specimentLength',
        SpecimentDiameter: 'uuid.parameter.specimentDiameter',
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
            unittable: UnitTable.Force,
            deviceInput: STLUUID.Device.ForceSensor,
        },
        {
            uuid: STLUUID.Channel.Stress,
            unittable: UnitTable.Stress,
            algorithm: Algorithm.multiplication,
            inputChannelId1: STLUUID.Channel.Force,
            inputChannelId2: STLUUID.Result.CrossSection,
        },
    ],
    results: [
        {
            uuid: STLUUID.Result.ForceMaximum,
            unittable: UnitTable.Force,
            algorithm: Algorithm.maximum,
            inputChannel: STLUUID.Channel.Force,
        },
        {
            uuid: STLUUID.Result.StressMaximum,
            unittable: UnitTable.Stress,
            algorithm: Algorithm.maximum,
            inputChannel: STLUUID.Channel.Stress,
        },
        {
            uuid: STLUUID.Result.CrossSection,
            unittable: UnitTable.Area,
            algorithm: Algorithm.multiplication,
            factor1: STLUUID.Parameter.SpecimenWidth,
            factor2: STLUUID.Parameter.SpecimenThickness,
        }
    ],
    devices: [
        {
            uuid: STLUUID.Device.ForceSensor,
        },
        {
            uuid: STLUUID.Device.StressSensor,
        },
        {
            uuid: STLUUID.Device.DisplacementSensor,
        },
        {
            uuid: STLUUID.Device.StrainSensor,
        },
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

// Re-export types
export * from './types/common';
export * from './types/enums';
export * from './types/channels';
export * from './types/results';
export * from './types/parameters';