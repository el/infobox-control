import { IControl, Map as MapboxMap } from "mapbox-gl";
import { GeoJsonProperties } from "geojson";
export declare class MapboxInfoBoxControl implements IControl {
    private controlContainer;
    private formatter;
    private layerId;
    constructor(layerId?: string, formatter?: (properties: GeoJsonProperties) => string);
    getDefaultPosition(): string;
    onAdd(map: MapboxMap): HTMLElement;
    onRemove(): void;
}
export interface IMapboxGradientSteps {
    minValue: number;
    maxValue: number;
}
export declare class MapboxGradientBoxControl implements IControl {
    private controlContainer;
    private leftValueElement;
    private gradientElement;
    private caretElement;
    private rightValueElement;
    private gradientSteps;
    private getWeight;
    private layerId;
    constructor(layerId?: string, gradientSteps?: IMapboxGradientSteps, getWeight?: (properties: GeoJsonProperties) => number);
    getDefaultPosition(): string;
    onAdd(map: MapboxMap): HTMLElement;
    onRemove(): void;
}
