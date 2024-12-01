export type UUID = string;

export interface IBaseEntity {
    uuid: UUID;
}

export interface IUnitTableEntity extends IBaseEntity {
    unittable: string;
}

// Type utilities
export type IsUUID<T> = T extends UUID ? true : false;
export type ExtractUUIDKeys<T> = {
    [K in keyof T]: IsUUID<T[K]> extends true ? K : never
}[keyof T];
export type EntityUUIDProperties<T> = Pick<T, ExtractUUIDKeys<T>>;