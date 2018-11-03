import { IControl, Map as MapboxMap } from "mapbox-gl";
import { GeoJsonProperties } from "geojson";
export interface IMapboxInfoBoxOptions {
    layerId?: string;
    formatter?: (properties: GeoJsonProperties) => string;
}
export declare class MapboxInfoBoxControl implements IControl {
    private static readonly DEFAULT_OPTIONS;
    private controlContainer;
    private formatter;
    private layerId;
    constructor(options?: IMapboxInfoBoxOptions);
    getDefaultPosition(): string;
    onAdd(map: MapboxMap): HTMLElement;
    onRemove(): void;
}
export interface IMapboxGradientSteps {
    minValue: number;
    maxValue: number;
}
export interface IMapboxGradientBoxOptions {
    layerId?: string;
    gradientSteps?: IMapboxGradientSteps;
    getWeight?: (properties: GeoJsonProperties) => number;
}
export declare class MapboxGradientBoxControl implements IControl {
    private static readonly DEFAULT_OPTIONS;
    private controlContainer;
    private leftValueElement;
    private gradientElement;
    private caretElement;
    private rightValueElement;
    private gradientSteps;
    private getWeight;
    private layerId;
    constructor(options?: IMapboxGradientBoxOptions);
    getDefaultPosition(): string;
    onAdd(map: MapboxMap): HTMLElement;
    onRemove(): void;
}
