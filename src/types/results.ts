import { UUID, IUnitTableEntity } from './common';
import { Algorithm } from './enums';

interface IBaseResult extends IUnitTableEntity {
    algorithm: Algorithm;
}

export interface IMaximumResult extends IBaseResult {
    algorithm: Algorithm.maximum;
    inputChannel: UUID;
}

export interface IMinimumResult extends IBaseResult {
    algorithm: Algorithm.minimum;
    inputChannel: UUID;
}

export interface IMultiplicationResult extends IBaseResult {
    algorithm: Algorithm.multiplication;
    factor1: UUID;
    factor2: UUID;
}

export interface IAverageResult extends IBaseResult {
    algorithm: Algorithm.average;
    inputChannel: UUID;
}

export type IResult = IMaximumResult | IMinimumResult | IMultiplicationResult | IAverageResult;