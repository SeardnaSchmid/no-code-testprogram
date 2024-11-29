"use strict";
var StlAlgorithm;
(function (StlAlgorithm) {
    StlAlgorithm["multiplication"] = "multiplication";
    StlAlgorithm["maximum"] = "maximum";
    StlAlgorithm["minimum"] = "minimum";
})(StlAlgorithm || (StlAlgorithm = {}));
var StlUnitTable;
(function (StlUnitTable) {
    StlUnitTable["Force"] = "stl.unittable.force";
    StlUnitTable["Stress"] = "stl.unittable.stress";
    StlUnitTable["Displacement"] = "stl.unittable.displacement";
    StlUnitTable["Strain"] = "stl.unittable.strain";
    StlUnitTable["Area"] = "stl.unittable.area";
})(StlUnitTable || (StlUnitTable = {}));
const STLUUID = {
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
};
const stl = {
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
};
