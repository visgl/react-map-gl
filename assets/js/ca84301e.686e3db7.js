"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[4432],{3809:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>h,default:()=>b,frontMatter:()=>f,metadata:()=>o,toc:()=>y});const o=JSON.parse('{"id":"mapbox/side-by-side","title":"Side by Side","description":"","source":"@site/src/examples/mapbox/side-by-side.mdx","sourceDirName":"mapbox","slug":"/mapbox/side-by-side","permalink":"/react-map-gl/examples/mapbox/side-by-side","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Dynamic Styling","permalink":"/react-map-gl/examples/mapbox/layers"},"next":{"title":"Terrain","permalink":"/react-map-gl/examples/mapbox/terrain"}}');var r=n(4848),s=n(8453),i=n(6540),a=(n(5338),n(2198));function c(e){const t=(0,i.useCallback)((t=>{e.onModeChange(t.target.value)}),[e.onModeChange]);return(0,r.jsxs)("div",{className:"control-panel",children:[(0,r.jsx)("h3",{children:"Side by Side"}),(0,r.jsx)("p",{children:"Synchronize two maps."}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{children:"Mode: "}),(0,r.jsxs)("select",{value:e.mode,onChange:t,children:[(0,r.jsx)("option",{value:"side-by-side",children:"Side by side"}),(0,r.jsx)("option",{value:"split-screen",children:"Split screen"})]})]}),(0,r.jsx)("div",{className:"source-link",children:(0,r.jsx)("a",{href:"https://github.com/visgl/react-map-gl/tree/7.0-release/examples/side-by-side",target:"_new",children:"View Code \u2197"})})]})}const l=i.memo(c),u="",d={position:"absolute",width:"50%",height:"100%"},p={position:"absolute",left:"50%",width:"50%",height:"100%"};function m(){const[e,t]=(0,i.useState)({longitude:-122.43,latitude:37.78,zoom:12,pitch:30}),[n,o]=(0,i.useState)("side-by-side"),[s,c]=(0,i.useState)("left"),m=(0,i.useCallback)((()=>c("left")),[]),f=(0,i.useCallback)((()=>c("right")),[]),h=(0,i.useCallback)((e=>t(e.viewState)),[]),g="undefined"==typeof window?100:window.innerWidth,y=(0,i.useMemo)((()=>({left:"split-screen"===n?g/2:0,top:0,right:0,bottom:0})),[g,n]),v=(0,i.useMemo)((()=>({right:"split-screen"===n?g/2:0,top:0,left:0,bottom:0})),[g,n]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{style:{position:"relative",height:"100%"},children:[(0,r.jsx)(a.Ay,Object.assign({id:"left-map"},e,{padding:y,onMoveStart:m,onMove:"left"===s&&h,style:d,mapStyle:"mapbox://styles/mapbox/light-v9",mapboxAccessToken:u})),(0,r.jsx)(a.Ay,Object.assign({id:"right-map"},e,{padding:v,onMoveStart:f,onMove:"right"===s&&h,style:p,mapStyle:"mapbox://styles/mapbox/dark-v9",mapboxAccessToken:u}))]}),(0,r.jsx)(l,{mode:n,onModeChange:o})]})}const f={},h="Side by Side",g={},y=[];function v(e){const t={h1:"h1",header:"header",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"side-by-side",children:"Side by Side"})}),"\n","\n",(0,r.jsx)(m,{})]})}function b(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(v,{...e})}):v(e)}},2198:(e,t,n)=>{n.d(t,{T3:()=>A,tG:()=>F,Wd:()=>V,T5:()=>M,pH:()=>T,ov:()=>D,zD:()=>k,g0:()=>Z,kL:()=>H,Ay:()=>M,VI:()=>z});var o=n(6540),r=n(4848);const s=o.createContext(null);function i(e,t){if(e===t)return!0;if(!e||!t)return!1;if(Array.isArray(e)){if(!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!i(e[n],t[n]))return!1;return!0}if(Array.isArray(t))return!1;if("object"==typeof e&&"object"==typeof t){const n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(const r of n){if(!t.hasOwnProperty(r))return!1;if(!i(e[r],t[r]))return!1}return!0}return!1}function a(e,t){if(!e.getProjection)return;const n=e.getProjection();i(n,t.getProjection())||t.setProjection(n)}function c(e){return{longitude:e.center.lng,latitude:e.center.lat,zoom:e.zoom,pitch:e.pitch,bearing:e.bearing,padding:e.padding}}function l(e,t){const n=t.viewState||t;let o=!1;if("zoom"in n){const t=e.zoom;e.zoom=n.zoom,o=o||t!==e.zoom}if("bearing"in n){const t=e.bearing;e.bearing=n.bearing,o=o||t!==e.bearing}if("pitch"in n){const t=e.pitch;e.pitch=n.pitch,o=o||t!==e.pitch}if(n.padding&&!e.isPaddingEqual(n.padding)&&(o=!0,e.padding=n.padding),"longitude"in n&&"latitude"in n){const t=e.center;e.center=new t.constructor(n.longitude,n.latitude),o=o||t!==e.center}return o}const u=["type","source","source-layer","minzoom","maxzoom","filter","layout"];function d(e){if(!e)return null;if("string"==typeof e)return e;if("toJS"in e&&(e=e.toJS()),!e.layers)return e;const t={};for(const o of e.layers)t[o.id]=o;const n=e.layers.map((e=>{let n=null;"interactive"in e&&(n=Object.assign({},e),delete n.interactive);const o=t[e.ref];if(o){n=n||Object.assign({},e),delete n.ref;for(const e of u)e in o&&(n[e]=o[e])}return n||e}));return Object.assign({},e,{layers:n})}const p={version:8,sources:{},layers:[]},m={mousedown:"onMouseDown",mouseup:"onMouseUp",mouseover:"onMouseOver",mousemove:"onMouseMove",click:"onClick",dblclick:"onDblClick",mouseenter:"onMouseEnter",mouseleave:"onMouseLeave",mouseout:"onMouseOut",contextmenu:"onContextMenu",touchstart:"onTouchStart",touchend:"onTouchEnd",touchmove:"onTouchMove",touchcancel:"onTouchCancel"},f={movestart:"onMoveStart",move:"onMove",moveend:"onMoveEnd",dragstart:"onDragStart",drag:"onDrag",dragend:"onDragEnd",zoomstart:"onZoomStart",zoom:"onZoom",zoomend:"onZoomEnd",rotatestart:"onRotateStart",rotate:"onRotate",rotateend:"onRotateEnd",pitchstart:"onPitchStart",pitch:"onPitch",pitchend:"onPitchEnd"},h={wheel:"onWheel",boxzoomstart:"onBoxZoomStart",boxzoomend:"onBoxZoomEnd",boxzoomcancel:"onBoxZoomCancel",resize:"onResize",load:"onLoad",render:"onRender",idle:"onIdle",remove:"onRemove",data:"onData",styledata:"onStyleData",sourcedata:"onSourceData",error:"onError"},g=["minZoom","maxZoom","minPitch","maxPitch","maxBounds","projection","renderWorldCopies"],y=["scrollZoom","boxZoom","dragRotate","dragPan","keyboard","doubleClickZoom","touchZoomRotate","touchPitch"];class v{constructor(e,t,n){this._map=null,this._internalUpdate=!1,this._inRender=!1,this._hoveredFeatures=null,this._deferredEvents={move:!1,zoom:!1,pitch:!1,rotate:!1},this._onEvent=e=>{const t=this.props[h[e.type]];t?t(e):"error"===e.type&&console.error(e.error)},this._onPointerEvent=e=>{"mousemove"!==e.type&&"mouseout"!==e.type||this._updateHover(e);const t=this.props[m[e.type]];t&&(this.props.interactiveLayerIds&&"mouseover"!==e.type&&"mouseout"!==e.type&&(e.features=this._hoveredFeatures||this._queryRenderedFeatures(e.point)),t(e),delete e.features)},this._onCameraEvent=e=>{if(!this._internalUpdate){const t=this.props[f[e.type]];t&&t(e)}e.type in this._deferredEvents&&(this._deferredEvents[e.type]=!1)},this._MapClass=e,this.props=t,this._initialize(n)}get map(){return this._map}get transform(){return this._renderTransform}setProps(e){const t=this.props;this.props=e;const n=this._updateSettings(e,t);n&&this._createShadowTransform(this._map);const o=this._updateSize(e),r=this._updateViewState(e,!0);this._updateStyle(e,t),this._updateStyleComponents(e,t),this._updateHandlers(e,t),(n||o||r&&!this._map.isMoving())&&this.redraw()}static reuse(e,t){const n=v.savedMaps.pop();if(!n)return null;const o=n.map,r=o.getContainer();for(t.className=r.className;r.childNodes.length>0;)t.appendChild(r.childNodes[0]);o._container=t,n.setProps(Object.assign({},e,{styleDiffing:!1})),o.resize();const{initialViewState:s}=e;return s&&(s.bounds?o.fitBounds(s.bounds,Object.assign({},s.fitBoundsOptions,{duration:0})):n._updateViewState(s,!1)),o.isStyleLoaded()?o.fire("load"):o.once("styledata",(()=>o.fire("load"))),o._update(),n}_initialize(e){const{props:t}=this,{mapStyle:n=p}=t,o=Object.assign({},t,t.initialViewState,{accessToken:t.mapboxAccessToken||b()||null,container:e,style:d(n)}),r=o.initialViewState||o.viewState||o;if(Object.assign(o,{center:[r.longitude||0,r.latitude||0],zoom:r.zoom||0,pitch:r.pitch||0,bearing:r.bearing||0}),t.gl){const e=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=()=>(HTMLCanvasElement.prototype.getContext=e,t.gl)}const s=new this._MapClass(o);r.padding&&s.setPadding(r.padding),t.cursor&&(s.getCanvas().style.cursor=t.cursor),this._createShadowTransform(s);const i=s._render;s._render=e=>{this._inRender=!0,i.call(s,e),this._inRender=!1};const c=s._renderTaskQueue.run;s._renderTaskQueue.run=e=>{c.call(s._renderTaskQueue,e),this._onBeforeRepaint()},s.on("render",(()=>this._onAfterRepaint()));const l=s.fire;s.fire=this._fireEvent.bind(this,l),s.on("resize",(()=>{this._renderTransform.resize(s.transform.width,s.transform.height)})),s.on("styledata",(()=>{this._updateStyleComponents(this.props,{}),a(s.transform,this._renderTransform)})),s.on("sourcedata",(()=>this._updateStyleComponents(this.props,{})));for(const a in m)s.on(a,this._onPointerEvent);for(const a in f)s.on(a,this._onCameraEvent);for(const a in h)s.on(a,this._onEvent);this._map=s}recycle(){const e=this.map.getContainer().querySelector("[mapboxgl-children]");null==e||e.remove(),v.savedMaps.push(this)}destroy(){this._map.remove()}redraw(){const e=this._map;!this._inRender&&e.style&&(e._frame&&(e._frame.cancel(),e._frame=null),e._render())}_createShadowTransform(e){const t=function(e){const t=e.clone();return t.pixelsToGLUnits=e.pixelsToGLUnits,t}(e.transform);e.painter.transform=t,this._renderTransform=t}_updateSize(e){const{viewState:t}=e;if(t){const e=this._map;if(t.width!==e.transform.width||t.height!==e.transform.height)return e.resize(),!0}return!1}_updateViewState(e,t){if(this._internalUpdate)return!1;const n=this._map,o=this._renderTransform,{zoom:r,pitch:s,bearing:i}=o,a=n.isMoving();a&&(o.cameraElevationReference="sea");const u=l(o,Object.assign({},c(n.transform),e));if(a&&(o.cameraElevationReference="ground"),u&&t){const e=this._deferredEvents;e.move=!0,e.zoom||(e.zoom=r!==o.zoom),e.rotate||(e.rotate=i!==o.bearing),e.pitch||(e.pitch=s!==o.pitch)}return a||l(n.transform,e),u}_updateSettings(e,t){const n=this._map;let o=!1;for(const r of g)if(r in e&&!i(e[r],t[r])){o=!0;const t=n["set"+r[0].toUpperCase()+r.slice(1)];null==t||t.call(n,e[r])}return o}_updateStyle(e,t){if(e.cursor!==t.cursor&&(this._map.getCanvas().style.cursor=e.cursor||""),e.mapStyle!==t.mapStyle){const{mapStyle:t=p,styleDiffing:n=!0}=e,o={diff:n};return"localIdeographFontFamily"in e&&(o.localIdeographFontFamily=e.localIdeographFontFamily),this._map.setStyle(d(t),o),!0}return!1}_updateStyleComponents(e,t){const n=this._map;let o=!1;return n.isStyleLoaded()&&("light"in e&&n.setLight&&!i(e.light,t.light)&&(o=!0,n.setLight(e.light)),"fog"in e&&n.setFog&&!i(e.fog,t.fog)&&(o=!0,n.setFog(e.fog)),"terrain"in e&&n.setTerrain&&!i(e.terrain,t.terrain)&&(e.terrain&&!n.getSource(e.terrain.source)||(o=!0,n.setTerrain(e.terrain)))),o}_updateHandlers(e,t){const n=this._map;let o=!1;for(const a of y){var r,s;const c=null==(r=e[a])||r;i(c,null==(s=t[a])||s)||(o=!0,c?n[a].enable(c):n[a].disable())}return o}_queryRenderedFeatures(e){const t=this._map,n=t.transform,{interactiveLayerIds:o=[]}=this.props;try{return t.transform=this._renderTransform,t.queryRenderedFeatures(e,{layers:o.filter(t.getLayer.bind(t))})}catch(r){return[]}finally{t.transform=n}}_updateHover(e){const{props:t}=this;if(t.interactiveLayerIds&&(t.onMouseMove||t.onMouseEnter||t.onMouseLeave)){var n;const t=e.type,o=(null==(n=this._hoveredFeatures)?void 0:n.length)>0,r=this._queryRenderedFeatures(e.point),s=r.length>0;!s&&o&&(e.type="mouseleave",this._onPointerEvent(e)),this._hoveredFeatures=r,s&&!o&&(e.type="mouseenter",this._onPointerEvent(e)),e.type=t}else this._hoveredFeatures=null}_fireEvent(e,t,n){const o=this._map,r=o.transform,s="string"==typeof t?t:t.type;return"move"===s&&this._updateViewState(this.props,!1),s in f&&("object"==typeof t&&(t.viewState=c(r)),this._map.isMoving())?(o.transform=this._renderTransform,e.call(o,t,n),o.transform=r,o):(e.call(o,t,n),o)}_onBeforeRepaint(){const e=this._map;this._internalUpdate=!0;for(const n in this._deferredEvents)this._deferredEvents[n]&&e.fire(n);this._internalUpdate=!1;const t=this._map.transform;e.transform=this._renderTransform,this._onAfterRepaint=()=>{a(this._renderTransform,t),e.transform=t}}}function b(){let e=null;if("undefined"!=typeof location){const t=/access_token=([^&\/]*)/.exec(location.search);e=t&&t[1]}try{e=e||"pk.eyJ1IjoidWNmLW1hcGJveCIsImEiOiJja2tyNHQzdnIzYmNnMndwZGI3djNzdjVyIn0.xgCXV9mLZ47q7easx6WLCQ"}catch(t){}try{e=e||process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}catch(n){}return e}v.savedMaps=[];const _=["setMaxBounds","setMinZoom","setMaxZoom","setMinPitch","setMaxPitch","setRenderWorldCopies","setProjection","setStyle","addSource","removeSource","addLayer","removeLayer","setLayerZoomRange","setFilter","setPaintProperty","setLayoutProperty","setLight","setTerrain","setFog","remove"];function x(e){if(!e)return null;const t=e.map,n={getMap:()=>t,getCenter:()=>e.transform.center,getZoom:()=>e.transform.zoom,getBearing:()=>e.transform.bearing,getPitch:()=>e.transform.pitch,getPadding:()=>e.transform.padding,getBounds:()=>e.transform.getBounds(),project:n=>{const o=t.transform;t.transform=e.transform;const r=t.project(n);return t.transform=o,r},unproject:n=>{const o=t.transform;t.transform=e.transform;const r=t.unproject(n);return t.transform=o,r},queryTerrainElevation:(n,o)=>{const r=t.transform;t.transform=e.transform;const s=t.queryTerrainElevation(n,o);return t.transform=r,s},queryRenderedFeatures:(n,o)=>{const r=t.transform;t.transform=e.transform;const s=t.queryRenderedFeatures(n,o);return t.transform=r,s}};for(const o of function(e){const t=new Set;let n=e;for(;n;){for(const o of Object.getOwnPropertyNames(n))"_"!==o[0]&&"function"==typeof e[o]&&"fire"!==o&&"setEventedParent"!==o&&t.add(o);n=Object.getPrototypeOf(n)}return Array.from(t)}(t))o in n||_.includes(o)||(n[o]=t[o].bind(t));return n}const S="undefined"!=typeof document?o.useLayoutEffect:o.useEffect,C=["baseApiUrl","maxParallelImageRequests","workerClass","workerCount","workerUrl"];const L=o.createContext(null);function E(e,t){const i=(0,o.useContext)(s),[a,c]=(0,o.useState)(null),l=(0,o.useRef)(),{current:u}=(0,o.useRef)({mapLib:null,map:null});(0,o.useEffect)((()=>{const t=e.mapLib;let o,r=!0;return Promise.resolve(t||n.e(842).then(n.t.bind(n,842,23))).then((t=>{if(!r)return;if(!t)throw new Error("Invalid mapLib");const n="Map"in t?t:t.default;if(!n.Map)throw new Error("Invalid mapLib");if(function(e,t){for(const o of C)o in t&&(e[o]=t[o]);const{RTLTextPlugin:n="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"}=t;n&&e.getRTLTextPluginStatus&&"unavailable"===e.getRTLTextPluginStatus()&&e.setRTLTextPlugin(n,(e=>{e&&console.error(e)}),!0)}(n,e),n.supported&&!n.supported(e))throw new Error("Map is not supported by this browser");e.reuseMaps&&(o=v.reuse(e,l.current)),o||(o=new v(n.Map,e,l.current)),u.map=x(o),u.mapLib=n,c(o),null==i||i.onMapMount(u.map,e.id)})).catch((t=>{const{onError:n}=e;n?n({type:"error",target:null,error:t}):console.error(t)})),()=>{r=!1,o&&(null==i||i.onMapUnmount(e.id),e.reuseMaps?o.recycle():o.destroy())}}),[]),S((()=>{a&&a.setProps(e)})),(0,o.useImperativeHandle)(t,(()=>u.map),[a]);const d=(0,o.useMemo)((()=>Object.assign({position:"relative",width:"100%",height:"100%"},e.style)),[e.style]);return(0,r.jsx)("div",{id:e.id,ref:l,style:d,children:a&&(0,r.jsx)(L.Provider,{value:u,children:(0,r.jsx)("div",{"mapboxgl-children":"",style:{height:"100%"},children:e.children})})})}const M=o.forwardRef(E);var w=n(961);const j=/box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;function P(e,t){if(!e||!t)return;const n=e.style;for(const o in t){const e=t[o];Number.isFinite(e)&&!j.test(o)?n[o]=e+"px":n[o]=e}}const T=(0,o.memo)((0,o.forwardRef)(((e,t)=>{const{map:n,mapLib:r}=(0,o.useContext)(L),s=(0,o.useRef)({props:e});s.current.props=e;const i=(0,o.useMemo)((()=>{let t=!1;o.Children.forEach(e.children,(e=>{e&&(t=!0)}));const n=Object.assign({},e,{element:t?document.createElement("div"):null}),a=new r.Marker(n);return a.setLngLat([e.longitude,e.latitude]),a.getElement().addEventListener("click",(e=>{null==s.current.props.onClick||s.current.props.onClick({type:"click",target:a,originalEvent:e})})),a.on("dragstart",(e=>{const t=e;t.lngLat=i.getLngLat(),null==s.current.props.onDragStart||s.current.props.onDragStart(t)})),a.on("drag",(e=>{const t=e;t.lngLat=i.getLngLat(),null==s.current.props.onDrag||s.current.props.onDrag(t)})),a.on("dragend",(e=>{const t=e;t.lngLat=i.getLngLat(),null==s.current.props.onDragEnd||s.current.props.onDragEnd(t)})),a}),[]);(0,o.useEffect)((()=>(i.addTo(n.getMap()),()=>{i.remove()})),[]);const{longitude:a,latitude:c,offset:l,style:u,draggable:d=!1,popup:p=null,rotation:m=0,rotationAlignment:f="auto",pitchAlignment:h="auto"}=e;return(0,o.useEffect)((()=>{P(i.getElement(),u)}),[u]),(0,o.useImperativeHandle)(t,(()=>i),[]),i.getLngLat().lng===a&&i.getLngLat().lat===c||i.setLngLat([a,c]),l&&!function(e,t){const n=Array.isArray(e)?e[0]:e?e.x:0,o=Array.isArray(e)?e[1]:e?e.y:0,r=Array.isArray(t)?t[0]:t?t.x:0,s=Array.isArray(t)?t[1]:t?t.y:0;return n===r&&o===s}(i.getOffset(),l)&&i.setOffset(l),i.isDraggable()!==d&&i.setDraggable(d),i.getRotation()!==m&&i.setRotation(m),i.getRotationAlignment()!==f&&i.setRotationAlignment(f),i.getPitchAlignment()!==h&&i.setPitchAlignment(h),i.getPopup()!==p&&i.setPopup(p),(0,w.createPortal)(e.children,i.getElement())})));function R(e){return new Set(e?e.trim().split(/\s+/):[])}const k=(0,o.memo)((0,o.forwardRef)(((e,t)=>{const{map:n,mapLib:r}=(0,o.useContext)(L),s=(0,o.useMemo)((()=>document.createElement("div")),[]),a=(0,o.useRef)({props:e});a.current.props=e;const c=(0,o.useMemo)((()=>{const t=Object.assign({},e),n=new r.Popup(t);return n.setLngLat([e.longitude,e.latitude]),n.once("open",(e=>{null==a.current.props.onOpen||a.current.props.onOpen(e)})),n}),[]);if((0,o.useEffect)((()=>{const e=e=>{null==a.current.props.onClose||a.current.props.onClose(e)};return c.on("close",e),c.setDOMContent(s).addTo(n.getMap()),()=>{c.off("close",e),c.isOpen()&&c.remove()}}),[]),(0,o.useEffect)((()=>{P(c.getElement(),e.style)}),[e.style]),(0,o.useImperativeHandle)(t,(()=>c),[]),c.isOpen()&&(c.getLngLat().lng===e.longitude&&c.getLngLat().lat===e.latitude||c.setLngLat([e.longitude,e.latitude]),e.offset&&!i(c.options.offset,e.offset)&&c.setOffset(e.offset),c.options.anchor===e.anchor&&c.options.maxWidth===e.maxWidth||(c.options.anchor=e.anchor,c.setMaxWidth(e.maxWidth)),c.options.className!==e.className)){const t=R(c.options.className),n=R(e.className);for(const e of t)n.has(e)||c.removeClassName(e);for(const e of n)t.has(e)||c.addClassName(e);c.options.className=e.className}return(0,w.createPortal)(e.children,s)})));function z(e,t,n,r){const s=(0,o.useContext)(L),i=(0,o.useMemo)((()=>e(s)),[]);return(0,o.useEffect)((()=>{const e=r||n||t,o="function"==typeof t&&"function"==typeof n?t:null,a="function"==typeof n?n:"function"==typeof t?t:null,{map:c}=s;return c.hasControl(i)||(c.addControl(i,null==e?void 0:e.position),o&&o(s)),()=>{a&&a(s),c.hasControl(i)&&c.removeControl(i)}}),[]),i}function O(e){const t=z((t=>{let{mapLib:n}=t;return new n.FullscreenControl({container:e.containerId&&document.getElementById(e.containerId)})}),{position:e.position});return(0,o.useEffect)((()=>{P(t._controlContainer,e.style)}),[e.style]),null}const A=(0,o.memo)(O);function I(e,t){const n=(0,o.useRef)({props:e}),r=z((t=>{let{mapLib:o}=t;const r=new o.GeolocateControl(e),s=r._setupUI.bind(r);return r._setupUI=e=>{r._container.hasChildNodes()||s(e)},r.on("geolocate",(e=>{null==n.current.props.onGeolocate||n.current.props.onGeolocate(e)})),r.on("error",(e=>{null==n.current.props.onError||n.current.props.onError(e)})),r.on("outofmaxbounds",(e=>{null==n.current.props.onOutOfMaxBounds||n.current.props.onOutOfMaxBounds(e)})),r.on("trackuserlocationstart",(e=>{null==n.current.props.onTrackUserLocationStart||n.current.props.onTrackUserLocationStart(e)})),r.on("trackuserlocationend",(e=>{null==n.current.props.onTrackUserLocationEnd||n.current.props.onTrackUserLocationEnd(e)})),r}),{position:e.position});return n.current.props=e,(0,o.useImperativeHandle)(t,(()=>r),[]),(0,o.useEffect)((()=>{P(r._container,e.style)}),[e.style]),null}const F=(0,o.memo)((0,o.forwardRef)(I));function N(e){const t=z((t=>{let{mapLib:n}=t;return new n.NavigationControl(e)}),{position:e.position});return(0,o.useEffect)((()=>{P(t._container,e.style)}),[e.style]),null}const D=(0,o.memo)(N);function U(e){const t=z((t=>{let{mapLib:n}=t;return new n.ScaleControl(e)}),{position:e.position}),n=(0,o.useRef)(e),r=n.current;n.current=e;const{style:s}=e;return void 0!==e.maxWidth&&e.maxWidth!==r.maxWidth&&(t.options.maxWidth=e.maxWidth),void 0!==e.unit&&e.unit!==r.unit&&t.setUnit(e.unit),(0,o.useEffect)((()=>{P(t._container,s)}),[s]),null}const Z=(0,o.memo)(U);function W(e,t){if(!e)throw new Error(t)}let B=0;function H(e){const t=(0,o.useContext)(L).map.getMap(),n=(0,o.useRef)(e),[,r]=(0,o.useState)(0),s=(0,o.useMemo)((()=>e.id||"jsx-source-"+B++),[]);(0,o.useEffect)((()=>{if(t){const e=()=>setTimeout((()=>r((e=>e+1))),0);return t.on("styledata",e),e(),()=>{if(t.off("styledata",e),t.style&&t.style._loaded&&t.getSource(s)){var n;const e=null==(n=t.getStyle())?void 0:n.layers;if(e)for(const n of e)n.source===s&&t.removeLayer(n.id);t.removeSource(s)}}}}),[t]);let a=t&&t.style&&t.getSource(s);return a?function(e,t,n){W(t.id===n.id,"source id changed"),W(t.type===n.type,"source type changed");let o="",r=0;for(const a in t)"children"===a||"id"===a||i(n[a],t[a])||(o=a,r++);if(!r)return;const s=t.type;"geojson"===s?e.setData(t.data):"image"===s?e.updateImage({url:t.url,coordinates:t.coordinates}):"setCoordinates"in e&&1===r&&"coordinates"===o?e.setCoordinates(t.coordinates):"setUrl"in e&&"url"===o?e.setUrl(t.url):"setTiles"in e&&"tiles"===o?e.setTiles(t.tiles):console.warn("Unable to update <Source> prop: "+o)}(a,e,n.current):a=function(e,t,n){if(e.style&&e.style._loaded){const o=Object.assign({},n);return delete o.id,delete o.children,e.addSource(t,o),e.getSource(t)}return null}(t,s,e),n.current=e,a&&o.Children.map(e.children,(e=>e&&(0,o.cloneElement)(e,{source:s})))||null}let q=0;function V(e){const t=(0,o.useContext)(L).map.getMap(),n=(0,o.useRef)(e),[,r]=(0,o.useState)(0),s=(0,o.useMemo)((()=>e.id||"jsx-layer-"+q++),[]);(0,o.useEffect)((()=>{if(t){const e=()=>r((e=>e+1));return t.on("styledata",e),e(),()=>{t.off("styledata",e),t.style&&t.style._loaded&&t.getLayer(s)&&t.removeLayer(s)}}}),[t]);if(t&&t.style&&t.getLayer(s))try{!function(e,t,n,o){if(W(n.id===o.id,"layer id changed"),W(n.type===o.type,"layer type changed"),"custom"===n.type||"custom"===o.type)return;const{layout:r={},paint:s={},filter:a,minzoom:c,maxzoom:l,beforeId:u}=n;if(u!==o.beforeId&&e.moveLayer(t,u),r!==o.layout){const n=o.layout||{};for(const o in r)i(r[o],n[o])||e.setLayoutProperty(t,o,r[o]);for(const o in n)r.hasOwnProperty(o)||e.setLayoutProperty(t,o,void 0)}if(s!==o.paint){const n=o.paint||{};for(const o in s)i(s[o],n[o])||e.setPaintProperty(t,o,s[o]);for(const o in n)s.hasOwnProperty(o)||e.setPaintProperty(t,o,void 0)}i(a,o.filter)||e.setFilter(t,a),c===o.minzoom&&l===o.maxzoom||e.setLayerZoomRange(t,c,l)}(t,s,e,n.current)}catch(a){console.warn(a)}else!function(e,t,n){if(e.style&&e.style._loaded&&(!("source"in n)||e.getSource(n.source))){const o=Object.assign({},n,{id:t});delete o.beforeId,e.addLayer(o,n.beforeId)}}(t,s,e);return n.current=e,null}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>a});var o=n(6540);const r={},s=o.createContext(r);function i(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);