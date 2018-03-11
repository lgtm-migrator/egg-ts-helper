/// <reference types="node" />
import { EventEmitter } from 'events';
declare global  {
    interface PlainObject {
        [key: string]: any;
    }
}
export interface WatchItem extends PlainObject {
    path: string;
    generator: string;
    trigger: string[];
}
export interface TsHelperOption {
    cwd?: string;
    framework?: string;
    typings?: string;
    watchDirs?: {
        [key: string]: WatchItem;
    };
    caseStyle?: string;
    watch?: boolean;
    autoRemoveJs?: boolean;
    throttle?: number;
    execAtInit?: boolean;
}
export declare type TsHelperConfig = typeof defaultConfig;
export declare type TsGenConfig = {
    dir: string;
    file?: string;
} & WatchItem;
export interface GeneratorResult {
    dist: string;
    content?: string;
}
export declare type TsGenerator<T, U = GeneratorResult | GeneratorResult[] | void> = (config: T, baseConfig: TsHelperConfig) => U;
export declare const defaultConfig: {
    cwd: string;
    framework: string;
    typings: string;
    caseStyle: string;
    autoRemoveJs: boolean;
    throttle: number;
    watch: boolean;
    execAtInit: boolean;
    watchDirs: {
        extend: {
            path: string;
            interface: {
                context: string;
                application: string;
                request: string;
                response: string;
                helper: string;
            };
            generator: string;
            trigger: string[];
        };
        controller: {
            path: string;
            interface: string;
            generator: string;
            trigger: string[];
        };
        proxy: {
            path: string;
            interface: string;
            generator: string;
            trigger: string[];
        };
        service: {
            path: string;
            interface: string;
            generator: string;
            trigger: string[];
        };
    };
};
export default class TsHelper extends EventEmitter {
    readonly config: TsHelperConfig;
    readonly watchDirs: string[];
    readonly watchNameList: string[];
    readonly generators: {
        [key: string]: TsGenerator<any>;
    };
    private watcher;
    private tickerMap;
    constructor(options?: TsHelperOption);
    register<T extends TsGenConfig = TsGenConfig>(name: string, tsGen: TsGenerator<T>): void;
    private initWatcher();
    private findInWatchDirs(p);
    private generateTs(index, type?, file?);
    private onChange(p, type);
}
