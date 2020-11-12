import { IControl, Map as MapboxMap } from "mapbox-gl";
import { GeoJsonProperties } from "geojson";


export interface IMapboxInfoBoxOptions
{
    layerId?: string,
    formatter?: (properties: GeoJsonProperties) => string
}

export class MapboxInfoBoxControl implements IControl
{
    private static readonly DEFAULT_OPTIONS: IMapboxInfoBoxOptions = {
        layerId: "features",
        formatter: properties => properties ? `Name: ${properties['name']}` : ''
    }
    private controlContainer: HTMLElement;
    private formatter: (properties: GeoJsonProperties) => string;
    private layerId: string;

    constructor( options: IMapboxInfoBoxOptions = MapboxInfoBoxControl.DEFAULT_OPTIONS)
    {
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        this.controlContainer.classList.add("mapboxgl-ctrl-icon");
        this.controlContainer.classList.add("mapboxgl-info-box-ctrl");
        const controlOptions = Object.assign({}, MapboxInfoBoxControl.DEFAULT_OPTIONS, options);
        this.formatter = controlOptions.formatter!;
        this.layerId = controlOptions.layerId!;
    }

    public getDefaultPosition(): string
    {
        return "top-left";
    }
    public onAdd(map: MapboxMap): HTMLElement
    {
        this.controlContainer.style.display = "none";
        map.on("mouseenter", this.layerId, () =>
        {
            map.getCanvas().style.cursor = "pointer";
        });

        map.on("mousemove", this.layerId, (e) =>
        {
            if (!e.features || !e.features.length)
            {
                return;
            }
            const [feature] = e.features;
            this.controlContainer.style.display = "block";
            this.controlContainer.innerHTML = this.formatter(feature.properties);
        });

        map.on("mouseleave", this.layerId, () =>
        {
            map.getCanvas().style.cursor = "";
            this.controlContainer.style.display = "none";
        });  
        return this.controlContainer;
    }

    public onRemove(): void
    {
        return;
    }
}

export interface IMapboxGradientSteps
{
    minValue: number,
    maxValue: number
}

export interface IMapboxGradientBoxOptions
{
    formatter?: (value: number) => string,
    gradientSteps?: IMapboxGradientSteps,
    getWeight?: (properties: GeoJsonProperties) => number,
    layerId?: string
}

export class MapboxGradientBoxControl implements IControl
{
    private static readonly DEFAULT_OPTIONS: IMapboxGradientBoxOptions = {
        formatter: value => String(value),
        layerId: "features",
        gradientSteps: {minValue: 0, maxValue: 100},
        getWeight: (properties) => (properties ? properties.weight : 0)
    };
    private controlContainer: HTMLElement;
    private leftValueElement: HTMLElement;
    private gradientElement: HTMLElement;
    private caretElement: HTMLElement;
    private rightValueElement: HTMLElement;
    private gradientSteps: IMapboxGradientSteps;
    private getWeight: (properties: GeoJsonProperties) => number;
    private layerId: string;

    constructor( options: IMapboxGradientBoxOptions = MapboxGradientBoxControl.DEFAULT_OPTIONS)
    {
        const controlOptions = Object.assign({}, MapboxGradientBoxControl.DEFAULT_OPTIONS, options);
        const formatter = options.formatter || (value => String(value));
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        this.controlContainer.classList.add("mapboxgl-gradient-box-ctrl");

        this.leftValueElement = document.createElement("div");
        this.leftValueElement.classList.add("left-value");
        this.leftValueElement.innerText = formatter(controlOptions.gradientSteps!.minValue);
        this.controlContainer.appendChild(this.leftValueElement);
        
        this.gradientElement = document.createElement("div");
        this.gradientElement.classList.add("gradient");
        this.controlContainer.appendChild(this.gradientElement);
        
        this.caretElement = document.createElement("div");
        this.caretElement.classList.add("caret");
        this.caretElement.innerText = "◆";
        this.gradientElement.appendChild(this.caretElement);
        
        this.rightValueElement = document.createElement("div");
        this.rightValueElement.classList.add("right-value");
        this.rightValueElement.innerText = formatter(controlOptions.gradientSteps!.maxValue);
        this.controlContainer.appendChild(this.rightValueElement);
        
        this.getWeight = controlOptions.getWeight!;
        this.layerId = controlOptions.layerId!;
        this.gradientSteps = controlOptions.gradientSteps!;
    }

    public getDefaultPosition(): string
    {
        return "top-left";
    }
    public onAdd(map: MapboxMap): HTMLElement
    {

        map.on("mouseenter", this.layerId, () =>
        {
            map.getCanvas().style.cursor = "pointer";
        });

        map.on("mousemove", this.layerId, (e) =>
        {
            if (!e.features || !e.features.length)
            {
                return;
            }
            const [feature] = e.features;
            const weight = this.getWeight(feature.properties);
            const delta = this.gradientSteps.maxValue - this.gradientSteps.minValue;
            let percentage = (weight - this.gradientSteps.minValue) / delta * 100;
            percentage = percentage > 100 ? 100 : (percentage < 0 ? 0 : percentage);
            this.caretElement.style.paddingLeft = `${percentage}%`;
            this.caretElement.style.display = "inline";
        });

        map.on("mouseleave", this.layerId, () =>
        {
            map.getCanvas().style.cursor = "";
            this.caretElement.style.display = "none";
        });  
        return this.controlContainer;
    }

    public onRemove(): void
    {
        return;
    }
}
