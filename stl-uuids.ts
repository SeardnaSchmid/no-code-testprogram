type UUID = string;

type STLUUIDS = {
    Channel: { [key: string]: UUID };
    Result: { [key: string]: UUID };
    Parameter: { [key: string]: UUID };
    Device: { [key: string]: UUID };
};

export const STLUUID: STLUUIDS = {
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
    },
    Device: {
        ForceSensor: 'uuid.device.forceSensor',
        StressSensor: 'uuid.device.stressSensor',
        DisplacementSensor: 'uuid.device.displacementSensor',
        StrainSensor: 'uuid.device.strainSensor',
    }
}