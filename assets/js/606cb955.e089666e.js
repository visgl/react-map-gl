"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[4057],{5583:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>v,contentTitle:()=>y,default:()=>b,frontMatter:()=>h,metadata:()=>o,toc:()=>_});const o=JSON.parse('{"id":"mapbox/geocoder","title":"Geocoder","description":"","source":"@site/src/examples/mapbox/geocoder.mdx","sourceDirName":"mapbox","slug":"/mapbox/geocoder","permalink":"/react-map-gl/examples/mapbox/geocoder","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Highlight By Filter","permalink":"/react-map-gl/examples/mapbox/filter"},"next":{"title":"GeoJSON Animation","permalink":"/react-map-gl/examples/mapbox/geojson-animation"}}');var r=n(4848),s=n(8453),i=n(6540),a=(n(5338),n(4704)),c=n(5915),l=n.n(c);function u(e){const[t,n]=(0,i.useState)(null),o=(0,a.VI)((()=>{const t=new(l())(Object.assign({},e,{marker:!1,accessToken:e.mapboxAccessToken}));return t.on("loading",e.onLoading),t.on("results",e.onResults),t.on("result",(t=>{var o;e.onResult(t);const{result:s}=t,i=s&&(s.center||"Point"===(null==(o=s.geometry)?void 0:o.type)&&s.geometry.coordinates);if(i&&e.marker){const t="object"==typeof e.marker?e.marker:{};n((0,r.jsx)(a.pH,Object.assign({},t,{longitude:i[0],latitude:i[1]})))}else n(null)})),t.on("error",e.onError),t}),{position:e.position});return o._map&&(o.getProximity()!==e.proximity&&void 0!==e.proximity&&o.setProximity(e.proximity),o.getRenderFunction()!==e.render&&void 0!==e.render&&o.setRenderFunction(e.render),o.getLanguage()!==e.language&&void 0!==e.language&&o.setLanguage(e.language),o.getZoom()!==e.zoom&&void 0!==e.zoom&&o.setZoom(e.zoom),o.getFlyTo()!==e.flyTo&&void 0!==e.flyTo&&o.setFlyTo(e.flyTo),o.getPlaceholder()!==e.placeholder&&void 0!==e.placeholder&&o.setPlaceholder(e.placeholder),o.getCountries()!==e.countries&&void 0!==e.countries&&o.setCountries(e.countries),o.getTypes()!==e.types&&void 0!==e.types&&o.setTypes(e.types),o.getMinLength()!==e.minLength&&void 0!==e.minLength&&o.setMinLength(e.minLength),o.getLimit()!==e.limit&&void 0!==e.limit&&o.setLimit(e.limit),o.getFilter()!==e.filter&&void 0!==e.filter&&o.setFilter(e.filter),o.getOrigin()!==e.origin&&void 0!==e.origin&&o.setOrigin(e.origin)),t}const d=()=>{};function p(){return(0,r.jsxs)("div",{className:"control-panel",children:[(0,r.jsx)("h3",{children:"Geocoder"}),(0,r.jsx)("div",{className:"source-link",children:(0,r.jsx)("a",{href:"https://github.com/visgl/react-map-gl/tree/8.0-release/examples/mapbox/geocoder",target:"_new",children:"View Code \u2197"})})]})}u.defaultProps={marker:!0,onLoading:d,onResults:d,onResult:d,onError:d};const m=i.memo(p),f="pk.eyJ1IjoidWNmLW1hcGJveCIsImEiOiJja2tyNHQzdnIzYmNnMndwZGI3djNzdjVyIn0.xgCXV9mLZ47q7easx6WLCQ";function g(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.Ay,{initialViewState:{longitude:-79.4512,latitude:43.6568,zoom:13},mapStyle:"mapbox://styles/mapbox/streets-v9",mapboxAccessToken:f,children:(0,r.jsx)(u,{mapboxAccessToken:f,position:"top-left"})}),(0,r.jsx)(m,{})]})}const h={},y="Geocoder",v={},_=[];function x(e){const t={h1:"h1",header:"header",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"geocoder",children:"Geocoder"})}),"\n","\n",(0,r.jsx)(g,{})]})}function b(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(x,{...e})}):x(e)}},4704:(e,t,n)=>{n.d(t,{T3:()=>A,tG:()=>N,Wd:()=>q,T5:()=>j,pH:()=>z,ov:()=>D,zD:()=>k,g0:()=>W,kL:()=>G,Ay:()=>j,VI:()=>O});var o=n(6540),r=n(4848);const s=o.createContext(null);function i(e,t){if(e===t)return!0;if(!e||!t)return!1;if(Array.isArray(e)){if(!Array.isArray(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!i(e[n],t[n]))return!1;return!0}if(Array.isArray(t))return!1;if("object"==typeof e&&"object"==typeof t){const n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(const r of n){if(!t.hasOwnProperty(r))return!1;if(!i(e[r],t[r]))return!1}return!0}return!1}function a(e,t){if(!e.getProjection)return;const n=e.getProjection();i(n,t.getProjection())||t.setProjection(n)}function c(e){return{longitude:e.center.lng,latitude:e.center.lat,zoom:e.zoom,pitch:e.pitch,bearing:e.bearing,padding:e.padding}}function l(e,t){const n=t.viewState||t;let o=!1;if("zoom"in n){const t=e.zoom;e.zoom=n.zoom,o=o||t!==e.zoom}if("bearing"in n){const t=e.bearing;e.bearing=n.bearing,o=o||t!==e.bearing}if("pitch"in n){const t=e.pitch;e.pitch=n.pitch,o=o||t!==e.pitch}if(n.padding&&!e.isPaddingEqual(n.padding)&&(o=!0,e.padding=n.padding),"longitude"in n&&"latitude"in n){const t=e.center;e.center=new t.constructor(n.longitude,n.latitude),o=o||t!==e.center}return o}const u=["type","source","source-layer","minzoom","maxzoom","filter","layout"];function d(e){if(!e)return null;if("string"==typeof e)return e;if("toJS"in e&&(e=e.toJS()),!e.layers)return e;const t={};for(const o of e.layers)t[o.id]=o;const n=e.layers.map((e=>{let n=null;"interactive"in e&&(n=Object.assign({},e),delete n.interactive);const o=t[e.ref];if(o){n=n||Object.assign({},e),delete n.ref;for(const e of u)e in o&&(n[e]=o[e])}return n||e}));return Object.assign({},e,{layers:n})}const p={version:8,sources:{},layers:[]},m={mousedown:"onMouseDown",mouseup:"onMouseUp",mouseover:"onMouseOver",mousemove:"onMouseMove",click:"onClick",dblclick:"onDblClick",mouseenter:"onMouseEnter",mouseleave:"onMouseLeave",mouseout:"onMouseOut",contextmenu:"onContextMenu",touchstart:"onTouchStart",touchend:"onTouchEnd",touchmove:"onTouchMove",touchcancel:"onTouchCancel"},f={movestart:"onMoveStart",move:"onMove",moveend:"onMoveEnd",dragstart:"onDragStart",drag:"onDrag",dragend:"onDragEnd",zoomstart:"onZoomStart",zoom:"onZoom",zoomend:"onZoomEnd",rotatestart:"onRotateStart",rotate:"onRotate",rotateend:"onRotateEnd",pitchstart:"onPitchStart",pitch:"onPitch",pitchend:"onPitchEnd"},g={wheel:"onWheel",boxzoomstart:"onBoxZoomStart",boxzoomend:"onBoxZoomEnd",boxzoomcancel:"onBoxZoomCancel",resize:"onResize",load:"onLoad",render:"onRender",idle:"onIdle",remove:"onRemove",data:"onData",styledata:"onStyleData",sourcedata:"onSourceData",error:"onError"},h=["minZoom","maxZoom","minPitch","maxPitch","maxBounds","projection","renderWorldCopies"],y=["scrollZoom","boxZoom","dragRotate","dragPan","keyboard","doubleClickZoom","touchZoomRotate","touchPitch"];class v{constructor(e,t,n){this._map=null,this._internalUpdate=!1,this._inRender=!1,this._hoveredFeatures=null,this._deferredEvents={move:!1,zoom:!1,pitch:!1,rotate:!1},this._onEvent=e=>{const t=this.props[g[e.type]];t?t(e):"error"===e.type&&console.error(e.error)},this._onPointerEvent=e=>{"mousemove"!==e.type&&"mouseout"!==e.type||this._updateHover(e);const t=this.props[m[e.type]];t&&(this.props.interactiveLayerIds&&"mouseover"!==e.type&&"mouseout"!==e.type&&(e.features=this._hoveredFeatures||this._queryRenderedFeatures(e.point)),t(e),delete e.features)},this._onCameraEvent=e=>{if(!this._internalUpdate){const t=this.props[f[e.type]];t&&t(e)}e.type in this._deferredEvents&&(this._deferredEvents[e.type]=!1)},this._MapClass=e,this.props=t,this._initialize(n)}get map(){return this._map}get transform(){return this._renderTransform}setProps(e){const t=this.props;this.props=e;const n=this._updateSettings(e,t);n&&this._createShadowTransform(this._map);const o=this._updateSize(e),r=this._updateViewState(e,!0);this._updateStyle(e,t),this._updateStyleComponents(e,t),this._updateHandlers(e,t),(n||o||r&&!this._map.isMoving())&&this.redraw()}static reuse(e,t){const n=v.savedMaps.pop();if(!n)return null;const o=n.map,r=o.getContainer();for(t.className=r.className;r.childNodes.length>0;)t.appendChild(r.childNodes[0]);o._container=t,n.setProps(Object.assign({},e,{styleDiffing:!1})),o.resize();const{initialViewState:s}=e;return s&&(s.bounds?o.fitBounds(s.bounds,Object.assign({},s.fitBoundsOptions,{duration:0})):n._updateViewState(s,!1)),o.isStyleLoaded()?o.fire("load"):o.once("styledata",(()=>o.fire("load"))),o._update(),n}_initialize(e){const{props:t}=this,{mapStyle:n=p}=t,o=Object.assign({},t,t.initialViewState,{accessToken:t.mapboxAccessToken||_()||null,container:e,style:d(n)}),r=o.initialViewState||o.viewState||o;if(Object.assign(o,{center:[r.longitude||0,r.latitude||0],zoom:r.zoom||0,pitch:r.pitch||0,bearing:r.bearing||0}),t.gl){const e=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=()=>(HTMLCanvasElement.prototype.getContext=e,t.gl)}const s=new this._MapClass(o);r.padding&&s.setPadding(r.padding),t.cursor&&(s.getCanvas().style.cursor=t.cursor),this._createShadowTransform(s);const i=s._render;s._render=e=>{this._inRender=!0,i.call(s,e),this._inRender=!1};const c=s._renderTaskQueue.run;s._renderTaskQueue.run=e=>{c.call(s._renderTaskQueue,e),this._onBeforeRepaint()},s.on("render",(()=>this._onAfterRepaint()));const l=s.fire;s.fire=this._fireEvent.bind(this,l),s.on("resize",(()=>{this._renderTransform.resize(s.transform.width,s.transform.height)})),s.on("styledata",(()=>{this._updateStyleComponents(this.props,{}),a(s.transform,this._renderTransform)})),s.on("sourcedata",(()=>this._updateStyleComponents(this.props,{})));for(const a in m)s.on(a,this._onPointerEvent);for(const a in f)s.on(a,this._onCameraEvent);for(const a in g)s.on(a,this._onEvent);this._map=s}recycle(){const e=this.map.getContainer().querySelector("[mapboxgl-children]");null==e||e.remove(),v.savedMaps.push(this)}destroy(){this._map.remove()}redraw(){const e=this._map;!this._inRender&&e.style&&(e._frame&&(e._frame.cancel(),e._frame=null),e._render())}_createShadowTransform(e){const t=function(e){const t=e.clone();return t.pixelsToGLUnits=e.pixelsToGLUnits,t}(e.transform);e.painter.transform=t,this._renderTransform=t}_updateSize(e){const{viewState:t}=e;if(t){const e=this._map;if(t.width!==e.transform.width||t.height!==e.transform.height)return e.resize(),!0}return!1}_updateViewState(e,t){if(this._internalUpdate)return!1;const n=this._map,o=this._renderTransform,{zoom:r,pitch:s,bearing:i}=o,a=n.isMoving();a&&(o.cameraElevationReference="sea");const u=l(o,Object.assign({},c(n.transform),e));if(a&&(o.cameraElevationReference="ground"),u&&t){const e=this._deferredEvents;e.move=!0,e.zoom||(e.zoom=r!==o.zoom),e.rotate||(e.rotate=i!==o.bearing),e.pitch||(e.pitch=s!==o.pitch)}return a||l(n.transform,e),u}_updateSettings(e,t){const n=this._map;let o=!1;for(const r of h)if(r in e&&!i(e[r],t[r])){o=!0;const t=n["set"+r[0].toUpperCase()+r.slice(1)];null==t||t.call(n,e[r])}return o}_updateStyle(e,t){if(e.cursor!==t.cursor&&(this._map.getCanvas().style.cursor=e.cursor||""),e.mapStyle!==t.mapStyle){const{mapStyle:t=p,styleDiffing:n=!0}=e,o={diff:n};return"localIdeographFontFamily"in e&&(o.localIdeographFontFamily=e.localIdeographFontFamily),this._map.setStyle(d(t),o),!0}return!1}_updateStyleComponents(e,t){const n=this._map;let o=!1;return n.isStyleLoaded()&&("light"in e&&n.setLight&&!i(e.light,t.light)&&(o=!0,n.setLight(e.light)),"fog"in e&&n.setFog&&!i(e.fog,t.fog)&&(o=!0,n.setFog(e.fog)),"terrain"in e&&n.setTerrain&&!i(e.terrain,t.terrain)&&(e.terrain&&!n.getSource(e.terrain.source)||(o=!0,n.setTerrain(e.terrain)))),o}_updateHandlers(e,t){const n=this._map;let o=!1;for(const a of y){var r,s;const c=null==(r=e[a])||r;i(c,null==(s=t[a])||s)||(o=!0,c?n[a].enable(c):n[a].disable())}return o}_queryRenderedFeatures(e){const t=this._map,n=t.transform,{interactiveLayerIds:o=[]}=this.props;try{return t.transform=this._renderTransform,t.queryRenderedFeatures(e,{layers:o.filter(t.getLayer.bind(t))})}catch(r){return[]}finally{t.transform=n}}_updateHover(e){const{props:t}=this;if(t.interactiveLayerIds&&(t.onMouseMove||t.onMouseEnter||t.onMouseLeave)){var n;const t=e.type,o=(null==(n=this._hoveredFeatures)?void 0:n.length)>0,r=this._queryRenderedFeatures(e.point),s=r.length>0;!s&&o&&(e.type="mouseleave",this._onPointerEvent(e)),this._hoveredFeatures=r,s&&!o&&(e.type="mouseenter",this._onPointerEvent(e)),e.type=t}else this._hoveredFeatures=null}_fireEvent(e,t,n){const o=this._map,r=o.transform,s="string"==typeof t?t:t.type;return"move"===s&&this._updateViewState(this.props,!1),s in f&&("object"==typeof t&&(t.viewState=c(r)),this._map.isMoving())?(o.transform=this._renderTransform,e.call(o,t,n),o.transform=r,o):(e.call(o,t,n),o)}_onBeforeRepaint(){const e=this._map;this._internalUpdate=!0;for(const n in this._deferredEvents)this._deferredEvents[n]&&e.fire(n);this._internalUpdate=!1;const t=this._map.transform;e.transform=this._renderTransform,this._onAfterRepaint=()=>{a(this._renderTransform,t),e.transform=t}}}function _(){let e=null;if("undefined"!=typeof location){const t=/access_token=([^&\/]*)/.exec(location.search);e=t&&t[1]}try{e=e||"pk.eyJ1IjoidWNmLW1hcGJveCIsImEiOiJja2tyNHQzdnIzYmNnMndwZGI3djNzdjVyIn0.xgCXV9mLZ47q7easx6WLCQ"}catch(t){}try{e=e||process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}catch(n){}return e}v.savedMaps=[];const x=["setMaxBounds","setMinZoom","setMaxZoom","setMinPitch","setMaxPitch","setRenderWorldCopies","setProjection","setStyle","addSource","removeSource","addLayer","removeLayer","setLayerZoomRange","setFilter","setPaintProperty","setLayoutProperty","setLight","setTerrain","setFog","remove"];function b(e){if(!e)return null;const t=e.map,n={getMap:()=>t,getCenter:()=>e.transform.center,getZoom:()=>e.transform.zoom,getBearing:()=>e.transform.bearing,getPitch:()=>e.transform.pitch,getPadding:()=>e.transform.padding,getBounds:()=>e.transform.getBounds(),project:n=>{const o=t.transform;t.transform=e.transform;const r=t.project(n);return t.transform=o,r},unproject:n=>{const o=t.transform;t.transform=e.transform;const r=t.unproject(n);return t.transform=o,r},queryTerrainElevation:(n,o)=>{const r=t.transform;t.transform=e.transform;const s=t.queryTerrainElevation(n,o);return t.transform=r,s},queryRenderedFeatures:(n,o)=>{const r=t.transform;t.transform=e.transform;const s=t.queryRenderedFeatures(n,o);return t.transform=r,s}};for(const o of function(e){const t=new Set;let n=e;for(;n;){for(const o of Object.getOwnPropertyNames(n))"_"!==o[0]&&"function"==typeof e[o]&&"fire"!==o&&"setEventedParent"!==o&&t.add(o);n=Object.getPrototypeOf(n)}return Array.from(t)}(t))o in n||x.includes(o)||(n[o]=t[o].bind(t));return n}const L="undefined"!=typeof document?o.useLayoutEffect:o.useEffect,E=["baseApiUrl","maxParallelImageRequests","workerClass","workerCount","workerUrl"];const S=o.createContext(null);function C(e,t){const i=(0,o.useContext)(s),[a,c]=(0,o.useState)(null),l=(0,o.useRef)(),{current:u}=(0,o.useRef)({mapLib:null,map:null});(0,o.useEffect)((()=>{const t=e.mapLib;let o,r=!0;return Promise.resolve(t||n.e(842).then(n.t.bind(n,842,23))).then((t=>{if(!r)return;if(!t)throw new Error("Invalid mapLib");const n="Map"in t?t:t.default;if(!n.Map)throw new Error("Invalid mapLib");!function(e,t){for(const o of E)o in t&&(e[o]=t[o]);const{RTLTextPlugin:n="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"}=t;n&&e.getRTLTextPluginStatus&&"unavailable"===e.getRTLTextPluginStatus()&&e.setRTLTextPlugin(n,(e=>{e&&console.error(e)}),!0)}(n,e),e.reuseMaps&&(o=v.reuse(e,l.current)),o||(o=new v(n.Map,e,l.current)),u.map=b(o),u.mapLib=n,c(o),null==i||i.onMapMount(u.map,e.id)})).catch((t=>{const{onError:n}=e;n?n({type:"error",target:null,error:t}):console.error(t)})),()=>{r=!1,o&&(null==i||i.onMapUnmount(e.id),e.reuseMaps?o.recycle():o.destroy())}}),[]),L((()=>{a&&a.setProps(e)})),(0,o.useImperativeHandle)(t,(()=>u.map),[a]);const d=(0,o.useMemo)((()=>Object.assign({position:"relative",width:"100%",height:"100%"},e.style)),[e.style]);return(0,r.jsx)("div",{id:e.id,ref:l,style:d,children:a&&(0,r.jsx)(S.Provider,{value:u,children:(0,r.jsx)("div",{"mapboxgl-children":"",style:{height:"100%"},children:e.children})})})}const j=o.forwardRef(C);var M=n(961);const w=/box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;function P(e,t){if(!e||!t)return;const n=e.style;for(const o in t){const e=t[o];Number.isFinite(e)&&!w.test(o)?n[o]=e+"px":n[o]=e}}function T(e,t){if(e===t)return null;const n=R(e),o=R(t),r=[];for(const s of o)n.has(s)||r.push(s);for(const s of n)o.has(s)||r.push(s);return 0===r.length?null:r}function R(e){return new Set(e?e.trim().split(/\s+/):[])}const z=(0,o.memo)((0,o.forwardRef)(((e,t)=>{const{map:n,mapLib:r}=(0,o.useContext)(S),s=(0,o.useRef)({props:e}),i=(0,o.useMemo)((()=>{let t=!1;o.Children.forEach(e.children,(e=>{e&&(t=!0)}));const n=Object.assign({},e,{element:t?document.createElement("div"):null}),a=new r.Marker(n);return a.setLngLat([e.longitude,e.latitude]),a.getElement().addEventListener("click",(e=>{null==s.current.props.onClick||s.current.props.onClick({type:"click",target:a,originalEvent:e})})),a.on("dragstart",(e=>{const t=e;t.lngLat=i.getLngLat(),null==s.current.props.onDragStart||s.current.props.onDragStart(t)})),a.on("drag",(e=>{const t=e;t.lngLat=i.getLngLat(),null==s.current.props.onDrag||s.current.props.onDrag(t)})),a.on("dragend",(e=>{const t=e;t.lngLat=i.getLngLat(),null==s.current.props.onDragEnd||s.current.props.onDragEnd(t)})),a}),[]);(0,o.useEffect)((()=>(i.addTo(n.getMap()),()=>{i.remove()})),[]);const{longitude:a,latitude:c,offset:l,style:u,draggable:d=!1,popup:p=null,rotation:m=0,rotationAlignment:f="auto",pitchAlignment:g="auto"}=e;(0,o.useEffect)((()=>{P(i.getElement(),u)}),[u]),(0,o.useImperativeHandle)(t,(()=>i),[]);const h=s.current.props;i.getLngLat().lng===a&&i.getLngLat().lat===c||i.setLngLat([a,c]),l&&!function(e,t){const n=Array.isArray(e)?e[0]:e?e.x:0,o=Array.isArray(e)?e[1]:e?e.y:0,r=Array.isArray(t)?t[0]:t?t.x:0,s=Array.isArray(t)?t[1]:t?t.y:0;return n===r&&o===s}(i.getOffset(),l)&&i.setOffset(l),i.isDraggable()!==d&&i.setDraggable(d),i.getRotation()!==m&&i.setRotation(m),i.getRotationAlignment()!==f&&i.setRotationAlignment(f),i.getPitchAlignment()!==g&&i.setPitchAlignment(g),i.getPopup()!==p&&i.setPopup(p);const y=T(h.className,e.className);if(y)for(const o of y)i.toggleClassName(o);return s.current.props=e,(0,M.createPortal)(e.children,i.getElement())}))),k=(0,o.memo)((0,o.forwardRef)(((e,t)=>{const{map:n,mapLib:r}=(0,o.useContext)(S),s=(0,o.useMemo)((()=>document.createElement("div")),[]),a=(0,o.useRef)({props:e}),c=(0,o.useMemo)((()=>{const t=Object.assign({},e),n=new r.Popup(t);return n.setLngLat([e.longitude,e.latitude]),n.once("open",(e=>{null==a.current.props.onOpen||a.current.props.onOpen(e)})),n}),[]);if((0,o.useEffect)((()=>{const e=e=>{null==a.current.props.onClose||a.current.props.onClose(e)};return c.on("close",e),c.setDOMContent(s).addTo(n.getMap()),()=>{c.off("close",e),c.isOpen()&&c.remove()}}),[]),(0,o.useEffect)((()=>{P(c.getElement(),e.style)}),[e.style]),(0,o.useImperativeHandle)(t,(()=>c),[]),c.isOpen()){const t=a.current.props;c.getLngLat().lng===e.longitude&&c.getLngLat().lat===e.latitude||c.setLngLat([e.longitude,e.latitude]),e.offset&&!i(t.offset,e.offset)&&(c.options.anchor=e.anchor,c.setOffset(e.offset)),t.anchor===e.anchor&&t.maxWidth===e.maxWidth||c.setMaxWidth(e.maxWidth);const n=T(t.className,e.className);if(n)for(const e of n)c.toggleClassName(e);a.current.props=e}return(0,M.createPortal)(e.children,s)})));function O(e,t,n,r){const s=(0,o.useContext)(S),i=(0,o.useMemo)((()=>e(s)),[]);return(0,o.useEffect)((()=>{const e=r||n||t,o="function"==typeof t&&"function"==typeof n?t:null,a="function"==typeof n?n:"function"==typeof t?t:null,{map:c}=s;return c.hasControl(i)||(c.addControl(i,null==e?void 0:e.position),o&&o(s)),()=>{a&&a(s),c.hasControl(i)&&c.removeControl(i)}}),[]),i}function I(e){const t=O((t=>{let{mapLib:n}=t;return new n.FullscreenControl({container:e.containerId&&document.getElementById(e.containerId)})}),{position:e.position});return(0,o.useEffect)((()=>{P(t._controlContainer,e.style)}),[e.style]),null}const A=(0,o.memo)(I);function F(e,t){const n=(0,o.useRef)({props:e}),r=O((t=>{let{mapLib:o}=t;const r=new o.GeolocateControl(e),s=r._setupUI.bind(r);return r._setupUI=e=>{r._container.hasChildNodes()||s(e)},r.on("geolocate",(e=>{null==n.current.props.onGeolocate||n.current.props.onGeolocate(e)})),r.on("error",(e=>{null==n.current.props.onError||n.current.props.onError(e)})),r.on("outofmaxbounds",(e=>{null==n.current.props.onOutOfMaxBounds||n.current.props.onOutOfMaxBounds(e)})),r.on("trackuserlocationstart",(e=>{null==n.current.props.onTrackUserLocationStart||n.current.props.onTrackUserLocationStart(e)})),r.on("trackuserlocationend",(e=>{null==n.current.props.onTrackUserLocationEnd||n.current.props.onTrackUserLocationEnd(e)})),r}),{position:e.position});return n.current.props=e,(0,o.useImperativeHandle)(t,(()=>r),[]),(0,o.useEffect)((()=>{P(r._container,e.style)}),[e.style]),null}const N=(0,o.memo)((0,o.forwardRef)(F));function Z(e){const t=O((t=>{let{mapLib:n}=t;return new n.NavigationControl(e)}),{position:e.position});return(0,o.useEffect)((()=>{P(t._container,e.style)}),[e.style]),null}const D=(0,o.memo)(Z);function U(e){const t=O((t=>{let{mapLib:n}=t;return new n.ScaleControl(e)}),{position:e.position}),n=(0,o.useRef)(e),r=n.current;n.current=e;const{style:s}=e;return void 0!==e.maxWidth&&e.maxWidth!==r.maxWidth&&(t.options.maxWidth=e.maxWidth),void 0!==e.unit&&e.unit!==r.unit&&t.setUnit(e.unit),(0,o.useEffect)((()=>{P(t._container,s)}),[s]),null}const W=(0,o.memo)(U);function B(e,t){if(!e)throw new Error(t)}let H=0;function G(e){const t=(0,o.useContext)(S).map.getMap(),n=(0,o.useRef)(e),[,r]=(0,o.useState)(0),s=(0,o.useMemo)((()=>e.id||"jsx-source-"+H++),[]),a=(0,o.useCallback)((()=>r((e=>e+1))),[]);(0,o.useEffect)((()=>{if(t)return t.on("styledata",a),a(),()=>{if(t.off("styledata",a),t.style&&t.style._loaded&&t.getSource(s)){var e;const n=null==(e=t.getStyle())?void 0:e.layers;if(n)for(const e of n)e.source===s&&t.removeLayer(e.id);t.removeSource(s)}}}),[t]);let c=t&&t.style&&t.getSource(s);return c?function(e,t,n){B(t.id===n.id,"source id changed"),B(t.type===n.type,"source type changed");let o="",r=0;for(const a in t)"children"===a||"id"===a||i(n[a],t[a])||(o=a,r++);if(!r)return;const s=t.type;"geojson"===s?e.setData(t.data):"image"===s?e.updateImage({url:t.url,coordinates:t.coordinates}):"setCoordinates"in e&&1===r&&"coordinates"===o?e.setCoordinates(t.coordinates):"setUrl"in e&&"url"===o?e.setUrl(t.url):"setTiles"in e&&"tiles"===o?e.setTiles(t.tiles):console.warn("Unable to update <Source> prop: "+o)}(c,e,n.current):c=function(e,t,n){if(e.isStyleLoaded()){const o=Object.assign({},n);return delete o.id,delete o.children,e.addSource(t,o),e.getSource(t)}return null}(t,s,e),n.current=e,(0,o.useEffect)((()=>{if(!c)return t.on("sourcedata",a),()=>{t.off("sourcedata",a)}}),[t,c]),c&&o.Children.map(e.children,(e=>e&&(0,o.cloneElement)(e,{source:s})))||null}let V=0;function q(e){const t=(0,o.useContext)(S).map.getMap(),n=(0,o.useRef)(e),[,r]=(0,o.useState)(0),s=(0,o.useMemo)((()=>e.id||"jsx-layer-"+V++),[]);(0,o.useEffect)((()=>{if(t){const e=()=>r((e=>e+1));return t.on("styledata",e),e(),()=>{t.off("styledata",e),t.style&&t.style._loaded&&t.getLayer(s)&&t.removeLayer(s)}}}),[t]);if(t&&t.style&&t.getLayer(s))try{!function(e,t,n,o){if(B(n.id===o.id,"layer id changed"),B(n.type===o.type,"layer type changed"),"custom"===n.type||"custom"===o.type)return;const{layout:r={},paint:s={},filter:a,minzoom:c,maxzoom:l,beforeId:u}=n;if(u!==o.beforeId&&e.moveLayer(t,u),r!==o.layout){const n=o.layout||{};for(const o in r)i(r[o],n[o])||e.setLayoutProperty(t,o,r[o]);for(const o in n)r.hasOwnProperty(o)||e.setLayoutProperty(t,o,void 0)}if(s!==o.paint){const n=o.paint||{};for(const o in s)i(s[o],n[o])||e.setPaintProperty(t,o,s[o]);for(const o in n)s.hasOwnProperty(o)||e.setPaintProperty(t,o,void 0)}i(a,o.filter)||e.setFilter(t,a),c===o.minzoom&&l===o.maxzoom||e.setLayerZoomRange(t,c,l)}(t,s,e,n.current)}catch(a){console.warn(a)}else!function(e,t,n){if(e.style&&e.style._loaded&&(!("source"in n)||e.getSource(n.source))){const o=Object.assign({},n,{id:t});delete o.beforeId,e.addLayer(o,n.beforeId)}}(t,s,e);return n.current=e,null}}}]);