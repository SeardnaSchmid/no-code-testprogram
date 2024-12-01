import { UUID, IUnitTableEntity } from './common';
import { Algorithm } from './enums';

export interface IDeviceChannel extends IUnitTableEntity {
    deviceInput: UUID;
}

export interface IMultiplicationChannel extends IUnitTableEntity {
    algorithm: Algorithm.multiplication;
    inputChannelId1: UUID;
    inputChannelId2: UUID;
}

export type IChannel = IDeviceChannel | IMultiplicationChannel;