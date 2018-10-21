/// <reference types="node" />
import { Logger } from './logger';
import { NexeOptions } from './options';
import { NexeTarget } from './target';
export interface NexeFile {
    filename: string;
    absPath: string;
    contents: string;
}
export { NexeOptions };
export declare class NexeCompiler {
    options: NexeOptions;
    /**
     * Epoch of when compilation started
     */
    private start;
    /**
     * Copy of process.env
     */
    private env;
    /**
     * Virtual FileSystem
     */
    private bundle;
    private compileStep;
    log: Logger;
    /**
     * Root directory for the source of the current build
     */
    src: string;
    /**
     * In memory files that are being manipulated by the compiler
     */
    files: NexeFile[];
    /**
     * Standalone pieces of code run before the application entrypoint
     */
    shims: string[];
    /**
     * The last shim (defaults to "require('module').runMain()")
     */
    startup: string;
    /**
     * The main entrypoint filename for your application - eg. node mainFile.js
     */
    entrypoint: string | undefined;
    /**
     * Not used
     */
    targets: NexeTarget[];
    /**
     * Current target of the compiler
     */
    target: NexeTarget;
    /**
     * Output filename (-o myapp.exe)
     */
    output: string;
    /**
     * Path to the configure script
     */
    configureScript: string;
    /**
     * The file path of node binary
     */
    private nodeSrcBinPath;
    constructor(options: NexeOptions);
    addResource(file: string, content?: Buffer | string): Promise<void>;
    readonly binaryConfiguration: {
        resources: {
            [relativeFilePath: string]: [number, number];
        };
    };
    readonly resourceSize: number;
    readFileAsync(file: string): Promise<NexeFile>;
    writeFileAsync(file: string, contents: string | Buffer): Promise<any>;
    replaceInFileAsync(file: string, replace: string | RegExp, value: string): Promise<void>;
    setFileContentsAsync(file: string, contents: string): Promise<void>;
    quit(): Promise<{}>;
    assertBuild(): void;
    getNodeExecutableLocation(target?: NexeTarget): string;
    private _runBuildCommandAsync;
    private _configureAsync;
    private _buildAsync;
    private _fetchPrebuiltBinaryAsync;
    compileAsync(target: NexeTarget): Promise<NodeJS.ReadableStream>;
    code(): string;
    private _assembleDeliverable;
}
