"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allSTLEntities = exports.STLUUID = exports.StlUnitTable = exports.StlAlgorithm = void 0;
var StlAlgorithm;
(function (StlAlgorithm) {
    StlAlgorithm["multiplication"] = "multiplication";
    StlAlgorithm["maximum"] = "maximum";
    StlAlgorithm["minimum"] = "minimum";
})(StlAlgorithm || (exports.StlAlgorithm = StlAlgorithm = {}));
var StlUnitTable;
(function (StlUnitTable) {
    StlUnitTable["Force"] = "stl.unittable.force";
    StlUnitTable["Stress"] = "stl.unittable.stress";
    StlUnitTable["Displacement"] = "stl.unittable.displacement";
    StlUnitTable["Strain"] = "stl.unittable.strain";
    StlUnitTable["Area"] = "stl.unittable.area";
})(StlUnitTable || (exports.StlUnitTable = StlUnitTable = {}));
exports.STLUUID = {
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
exports.allSTLEntities = {
    channels: [
        {
            uuid: exports.STLUUID.Channel.Force,
            unittable: StlUnitTable.Force,
            deviceInput: exports.STLUUID.Device.ForceSensor,
            dependencies: [exports.STLUUID.Device.ForceSensor],
        },
        {
            uuid: exports.STLUUID.Channel.Stress,
            unittable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.multiplication,
            inputChannelId1: exports.STLUUID.Channel.Force,
            inputChannelId2: exports.STLUUID.Result.CrossSection,
            dependencies: [exports.STLUUID.Channel.Force, exports.STLUUID.Result.CrossSection],
        },
    ],
    results: [
        {
            uuid: exports.STLUUID.Result.ForceMaximum,
            unittable: StlUnitTable.Force,
            algorithm: StlAlgorithm.maximum,
            input: exports.STLUUID.Channel.Force,
            dependencies: [exports.STLUUID.Channel.Force],
        },
        {
            uuid: exports.STLUUID.Result.StressMaximum,
            unittable: StlUnitTable.Stress,
            algorithm: StlAlgorithm.maximum,
            input: exports.STLUUID.Channel.Stress,
            dependencies: [exports.STLUUID.Channel.Stress],
        },
        {
            uuid: exports.STLUUID.Result.CrossSection,
            unittable: StlUnitTable.Area,
            algorithm: StlAlgorithm.multiplication,
            input1: exports.STLUUID.Parameter.SpecimenWidth,
            input2: exports.STLUUID.Parameter.SpecimenThickness,
            dependencies: [exports.STLUUID.Parameter.SpecimenWidth, exports.STLUUID.Parameter.SpecimenThickness],
        }
    ],
    parameters: [
        {
            uuid: exports.STLUUID.Parameter.SpecimenWidth,
            value: 1, // default value
        },
        {
            uuid: exports.STLUUID.Parameter.SpecimenThickness,
            value: 1, // default value
        },
        {
            uuid: exports.STLUUID.Parameter.SpecimentLength,
            value: 1, // default value
        },
        {
            uuid: exports.STLUUID.Parameter.SpecimentDiameter,
            value: 1, // default value
        },
        {
            uuid: exports.STLUUID.Parameter.GaugeLength,
            value: 115, // default value
        },
    ]
};
