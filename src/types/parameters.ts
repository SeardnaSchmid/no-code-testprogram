import { IBaseEntity } from './common';

export interface INumericParameter extends IBaseEntity {
    value: number;
}

export interface ITextParameter extends IBaseEntity {
    value: string;
}

export interface IArrayParameter extends IBaseEntity {
    value: number[];
}

export type IParameter = INumericParameter | ITextParameter | IArrayParameter;