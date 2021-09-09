"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapboxGradientBoxControl = exports.MapboxInfoBoxControl = void 0;
class MapboxInfoBoxControl {
    constructor(options = MapboxInfoBoxControl.DEFAULT_OPTIONS) {
        this.createContainer(options);
        const controlOptions = Object.assign({}, MapboxInfoBoxControl.DEFAULT_OPTIONS, options);
        this.formatter = controlOptions.formatter;
        this.layerId = controlOptions.layerId;
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    getDefaultPosition() {
        return "top-left";
    }
    onAdd(map) {
        this.map = map;
        this.controlContainer.style.display = "none";
        map.on("mouseenter", this.layerId, this.handleMouseEnter);
        map.on("mouseleave", this.layerId, this.handleMouseLeave);
        map.on("mousemove", this.layerId, this.handleMouseMove);
        return this.controlContainer;
    }
    onRemove() {
        if (!this.controlContainer || !this.controlContainer.parentNode || !this.map) {
            return;
        }
        this.controlContainer.parentNode.removeChild(this.controlContainer);
        this.map.off("mouseenter", this.layerId, this.handleMouseEnter);
        this.map.off("mouseleave", this.layerId, this.handleMouseLeave);
        this.map.off("mousemove", this.layerId, this.handleMouseMove);
    }
    createContainer(options) {
        var _a;
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        this.controlContainer.classList.add("mapboxgl-ctrl-icon");
        this.controlContainer.classList.add("mapboxgl-info-box-ctrl");
        if ((_a = options.additionalContainerClasses) === null || _a === void 0 ? void 0 : _a.length) {
            const classes = Array.isArray(options.additionalContainerClasses) ? options.additionalContainerClasses : [options.additionalContainerClasses];
            for (const className of classes) {
                this.controlContainer.classList.add(className);
            }
        }
    }
    handleMouseEnter() {
        if (!this.map) {
            return;
        }
        this.map.getCanvas().style.cursor = "pointer";
    }
    handleMouseLeave() {
        if (!this.map || !this.controlContainer) {
            return;
        }
        this.map.getCanvas().style.cursor = "";
        this.controlContainer.style.display = "none";
    }
    handleMouseMove(e) {
        if (!e.features || !e.features.length) {
            return;
        }
        const [feature] = e.features;
        this.controlContainer.style.display = "block";
        this.controlContainer.innerHTML = this.formatter(feature.properties);
    }
}
exports.MapboxInfoBoxControl = MapboxInfoBoxControl;
MapboxInfoBoxControl.DEFAULT_OPTIONS = {
    layerId: "features",
    formatter: properties => properties ? `Name: ${properties['name']}` : ''
};
class MapboxGradientBoxControl {
    constructor(options = MapboxGradientBoxControl.DEFAULT_OPTIONS) {
        const controlOptions = Object.assign({}, MapboxGradientBoxControl.DEFAULT_OPTIONS, options);
        const formatter = options.formatter || (value => String(value));
        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("mapboxgl-ctrl");
        this.controlContainer.classList.add("mapboxgl-ctrl-group");
        this.controlContainer.classList.add("mapboxgl-gradient-box-ctrl");
        this.leftValueElement = document.createElement("div");
        this.leftValueElement.classList.add("left-value");
        this.leftValueElement.innerText = formatter(controlOptions.gradientSteps.minValue);
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
        this.rightValueElement.innerText = formatter(controlOptions.gradientSteps.maxValue);
        this.controlContainer.appendChild(this.rightValueElement);
        this.getWeight = controlOptions.getWeight;
        this.layerId = controlOptions.layerId;
        this.gradientSteps = controlOptions.gradientSteps;
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    getDefaultPosition() {
        return "top-left";
    }
    onAdd(map) {
        this.map = map;
        map.on("mouseenter", this.layerId, this.handleMouseEnter);
        map.on("mouseleave", this.layerId, this.handleMouseLeave);
        map.on("mousemove", this.layerId, this.handleMouseMove);
        return this.controlContainer;
    }
    onRemove() {
        if (!this.controlContainer || !this.controlContainer.parentNode || !this.map) {
            return;
        }
        this.controlContainer.parentNode.removeChild(this.controlContainer);
        this.map.off("mouseenter", this.layerId, this.handleMouseEnter);
        this.map.off("mouseleave", this.layerId, this.handleMouseLeave);
        this.map.off("mousemove", this.layerId, this.handleMouseMove);
    }
    handleMouseEnter() {
        if (!this.map) {
            return;
        }
        this.map.getCanvas().style.cursor = "pointer";
    }
    handleMouseLeave() {
        if (!this.map || !this.controlContainer) {
            return;
        }
        this.map.getCanvas().style.cursor = "";
        this.controlContainer.style.display = "none";
    }
    handleMouseMove(e) {
        if (!e.features || !e.features.length) {
            return;
        }
        const [feature] = e.features;
        const weight = this.getWeight(feature.properties);
        const delta = this.gradientSteps.maxValue - this.gradientSteps.minValue;
        let percentage = (weight - this.gradientSteps.minValue) / delta * 100;
        percentage = percentage > 100 ? 100 : (percentage < 0 ? 0 : percentage);
        this.caretElement.style.paddingLeft = `${percentage}%`;
        this.caretElement.style.display = "inline";
    }
}
exports.MapboxGradientBoxControl = MapboxGradientBoxControl;
MapboxGradientBoxControl.DEFAULT_OPTIONS = {
    formatter: value => String(value),
    layerId: "features",
    gradientSteps: { minValue: 0, maxValue: 100 },
    getWeight: (properties) => (properties ? properties.weight : 0)
};
//# sourceMappingURL=index.js.map