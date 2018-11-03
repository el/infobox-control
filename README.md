# Mapbox GL JS Style Switcher

Adds an infobox and/or gradient switch to `mapbox-gl`

## Installation:

```bash
npm i mapbox-gl-infobox --save
```

## Usage:

```ts
import { MapboxGradientBoxControl, MapboxInfoBoxControl } from "mapbox-gl-infobox";
import { Map as MapboxMap } from "mapbox-gl";

import "mapbox-gl-infobox/styles.css";

const map = new MapboxMap();
map.addControl(new MapboxGradientBoxControl());
map.addControl(new MapboxInfoBoxControl());
```

## Options:
If you want to supply your own list of styles, pass them in the constructor.

```ts
const layerId = "features";
map.addControl(
    new MapboxGradientBoxControl(
        layerId, 
        {minValue: 0, maxValue: 100}, 
        properties => properties ? properties['weight'] : 0
    )
);
map.addControl(
    new MapboxInfoBoxControl(
        layerId,
        properties => properties ? `<b>Name:</b> ${properties['name']}` : ''
    )
);
```

## Screenshots

![Closed](assets/hover.png)