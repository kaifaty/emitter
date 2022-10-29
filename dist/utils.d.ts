import type { BaseName, BaseListener } from './types';
export declare const warn: (method: string, data: {
    event?: BaseName | number;
    listener?: BaseListener;
}) => void;
