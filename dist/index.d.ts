import { IControl, Map as MapboxMap } from "mapbox-gl";
import { GeoJsonProperties } from "geojson";
export interface IMapboxInfoBoxOptions {
    layerId?: string;
    formatter?: (properties: GeoJsonProperties) => string;
    additionalContainerClasses?: string | string[];
}
export declare class MapboxInfoBoxControl implements IControl {
    private static readonly DEFAULT_OPTIONS;
    private controlContainer;
    private formatter;
    private layerId;
    private map?;
    constructor(options?: IMapboxInfoBoxOptions);
    getDefaultPosition(): string;
    onAdd(map: MapboxMap): HTMLElement;
    onRemove(): void;
    private createContainer;
    private handleMouseEnter;
    private handleMouseLeave;
    private handleMouseMove;
}
export interface IMapboxGradientSteps {
    minValue: number;
    maxValue: number;
}
export interface IMapboxGradientBoxOptions {
    formatter?: (value: number) => string;
    gradientSteps?: IMapboxGradientSteps;
    getWeight?: (properties: GeoJsonProperties) => number;
    layerId?: string;
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
    private map?;
    constructor(options?: IMapboxGradientBoxOptions);
    getDefaultPosition(): string;
    onAdd(map: MapboxMap): HTMLElement;
    onRemove(): void;
    private handleMouseEnter;
    private handleMouseLeave;
    private handleMouseMove;
}
