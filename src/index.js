// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// React Components
export {default as InteractiveMap} from './components/interactive-map';
export {default as StaticMap} from './components/static-map';
export {default as MapControls} from './components/map-controls';

export {default as default} from './components/interactive-map';
export {default as MapGL} from './components/interactive-map';

// export {default as ClassicMap} from './deprecated/map';

// React Controls
export {default as Marker} from './components/marker';
export {default as Popup} from './components/popup';
export {default as NavigationControl} from './components/navigation-control';

// Utilities
// export {default as fitBounds} from './utils/fit-bounds';

// TODO - should not be exposed
export {default as autobind} from './utils/autobind';

// TODO - should these be exported or better keep them as internal or separate module?
// If exported, should we document them?
// export {default as EventManager} from './utils/event-manager';

// Overlays
export {default as CanvasOverlay} from './overlays/canvas-overlay';
export {default as DraggablePointsOverlay} from './overlays/draggable-points-overlay';
export {default as HTMLOverlay} from './overlays/html-overlay';
export {default as ScatterplotOverlay} from './overlays/scatterplot-overlay';
export {default as SVGOverlay} from './overlays/svg-overlay';
