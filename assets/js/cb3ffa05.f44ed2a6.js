"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[8621],{1346:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>h,contentTitle:()=>f,default:()=>v,frontMatter:()=>m,metadata:()=>n,toc:()=>g});const n=JSON.parse('{"id":"maplibre/side-by-side","title":"Side by Side","description":"","source":"@site/src/examples/maplibre/side-by-side.mdx","sourceDirName":"maplibre","slug":"/maplibre/side-by-side","permalink":"/react-map-gl/examples/maplibre/side-by-side","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Dynamic Styling","permalink":"/react-map-gl/examples/maplibre/layers"},"next":{"title":"Terrain","permalink":"/react-map-gl/examples/maplibre/terrain"}}');var r=o(4848),s=o(8453),i=o(6540),a=(o(5338),o(5490));function l(e){const t=(0,i.useCallback)((t=>{e.onModeChange(t.target.value)}),[e.onModeChange]);return(0,r.jsxs)("div",{className:"control-panel",children:[(0,r.jsx)("h3",{children:"Side by Side"}),(0,r.jsx)("p",{children:"Synchronize two maps."}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{children:"Mode: "}),(0,r.jsxs)("select",{value:e.mode,onChange:t,children:[(0,r.jsx)("option",{value:"side-by-side",children:"Side by side"}),(0,r.jsx)("option",{value:"split-screen",children:"Split screen"})]})]}),(0,r.jsx)("div",{className:"source-link",children:(0,r.jsx)("a",{href:"https://github.com/visgl/react-maplibre/tree/1.0-release/examples/side-by-side",target:"_new",children:"View Code \u2197"})})]})}const c=i.memo(l),u={position:"absolute",width:"50%",height:"100%"},d={position:"absolute",left:"50%",width:"50%",height:"100%"};function p(){const[e,t]=(0,i.useState)({longitude:-122.43,latitude:37.78,zoom:12,pitch:30}),[o,n]=(0,i.useState)("side-by-side"),s=(0,i.useCallback)((e=>t(e.viewState)),[]),l="undefined"==typeof window?100:window.innerWidth,p=(0,i.useMemo)((()=>({left:"split-screen"===o?l/2:0,top:0,right:0,bottom:0})),[l,o]),m=(0,i.useMemo)((()=>({right:"split-screen"===o?l/2:0,top:0,left:0,bottom:0})),[l,o]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{style:{position:"relative",height:"100%"},children:[(0,r.jsx)(a.T5,Object.assign({id:"left-map"},e,{padding:p,onMove:s,style:u,mapStyle:"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"})),(0,r.jsx)(a.T5,Object.assign({id:"right-map"},e,{padding:m,onMove:s,style:d,mapStyle:"https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"}))]}),(0,r.jsx)(c,{mode:o,onModeChange:n})]})}const m={},f="Side by Side",h={},g=[];function y(e){const t={h1:"h1",header:"header",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"side-by-side",children:"Side by Side"})}),"\n","\n",(0,r.jsx)(p,{})]})}function v(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(y,{...e})}):y(e)}},5490:(e,t,o)=>{o.d(t,{T3:()=>R,tG:()=>T,Wd:()=>V,T5:()=>C,pH:()=>j,ov:()=>I,zD:()=>P,g0:()=>A,kL:()=>H,jG:()=>N,Ay:()=>C,VI:()=>k});var n=o(6540),r=o(4848);const s=n.createContext(null);function i(e,t){if(e===t)return!0;if(!e||!t)return!1;if(Array.isArray(e)){if(!Array.isArray(t)||e.length!==t.length)return!1;for(let o=0;o<e.length;o++)if(!i(e[o],t[o]))return!1;return!0}if(Array.isArray(t))return!1;if("object"==typeof e&&"object"==typeof t){const o=Object.keys(e),n=Object.keys(t);if(o.length!==n.length)return!1;for(const r of o){if(!t.hasOwnProperty(r))return!1;if(!i(e[r],t[r]))return!1}return!0}return!1}function a(e){return{longitude:e.center.lng,latitude:e.center.lat,zoom:e.zoom,pitch:e.pitch,bearing:e.bearing,padding:e.padding}}function l(e,t){const o=t.viewState||t,n={};if("longitude"in o&&"latitude"in o&&(o.longitude!==e.center.lng||o.latitude!==e.center.lat)){const t=e.center.constructor;n.center=new t(o.longitude,o.latitude)}return"zoom"in o&&o.zoom!==e.zoom&&(n.zoom=o.zoom),"bearing"in o&&o.bearing!==e.bearing&&(n.bearing=o.bearing),"pitch"in o&&o.pitch!==e.pitch&&(n.pitch=o.pitch),o.padding&&e.padding&&!i(o.padding,e.padding)&&(n.padding=o.padding),n}const c=["type","source","source-layer","minzoom","maxzoom","filter","layout"];function u(e){if(!e)return null;if("string"==typeof e)return e;if("toJS"in e&&(e=e.toJS()),!e.layers)return e;const t={};for(const n of e.layers)t[n.id]=n;const o=e.layers.map((e=>{let o=null;"interactive"in e&&(o=Object.assign({},e),delete o.interactive);const n=t[e.ref];if(n){o=o||Object.assign({},e),delete o.ref;for(const e of c)e in n&&(o[e]=n[e])}return o||e}));return Object.assign({},e,{layers:o})}const d={version:8,sources:{},layers:[]},p={mousedown:"onMouseDown",mouseup:"onMouseUp",mouseover:"onMouseOver",mousemove:"onMouseMove",click:"onClick",dblclick:"onDblClick",mouseenter:"onMouseEnter",mouseleave:"onMouseLeave",mouseout:"onMouseOut",contextmenu:"onContextMenu",touchstart:"onTouchStart",touchend:"onTouchEnd",touchmove:"onTouchMove",touchcancel:"onTouchCancel"},m={movestart:"onMoveStart",move:"onMove",moveend:"onMoveEnd",dragstart:"onDragStart",drag:"onDrag",dragend:"onDragEnd",zoomstart:"onZoomStart",zoom:"onZoom",zoomend:"onZoomEnd",rotatestart:"onRotateStart",rotate:"onRotate",rotateend:"onRotateEnd",pitchstart:"onPitchStart",pitch:"onPitch",pitchend:"onPitchEnd"},f={wheel:"onWheel",boxzoomstart:"onBoxZoomStart",boxzoomend:"onBoxZoomEnd",boxzoomcancel:"onBoxZoomCancel",resize:"onResize",load:"onLoad",render:"onRender",idle:"onIdle",remove:"onRemove",data:"onData",styledata:"onStyleData",sourcedata:"onSourceData",error:"onError"},h=["minZoom","maxZoom","minPitch","maxPitch","maxBounds","projection","renderWorldCopies"],g=["scrollZoom","boxZoom","dragRotate","dragPan","keyboard","doubleClickZoom","touchZoomRotate","touchPitch"];class y{constructor(e,t,o){this._map=null,this._internalUpdate=!1,this._hoveredFeatures=null,this._propsedCameraUpdate=null,this._styleComponents={},this._onEvent=e=>{const t=this.props[f[e.type]];t?t(e):"error"===e.type&&console.error(e.error)},this._onCameraEvent=e=>{if(this._internalUpdate)return;e.viewState=this._propsedCameraUpdate||a(this._map.transform);const t=this.props[m[e.type]];t&&t(e)},this._onCameraUpdate=e=>this._internalUpdate?e:(this._propsedCameraUpdate=a(e),l(e,this.props)),this._onPointerEvent=e=>{"mousemove"!==e.type&&"mouseout"!==e.type||this._updateHover(e);const t=this.props[p[e.type]];t&&(this.props.interactiveLayerIds&&"mouseover"!==e.type&&"mouseout"!==e.type&&(e.features=this._hoveredFeatures||this._queryRenderedFeatures(e.point)),t(e),delete e.features)},this._MapClass=e,this.props=t,this._initialize(o)}get map(){return this._map}setProps(e){const t=this.props;this.props=e;const o=this._updateSettings(e,t),n=this._updateSize(e),r=this._updateViewState(e);this._updateStyle(e,t),this._updateStyleComponents(e),this._updateHandlers(e,t),(o||n||r&&!this._map.isMoving())&&this.redraw()}static reuse(e,t){const o=y.savedMaps.pop();if(!o)return null;const n=o.map,r=n.getContainer();for(t.className=r.className;r.childNodes.length>0;)t.appendChild(r.childNodes[0]);n._container=t;const s=n._resizeObserver;s&&(s.disconnect(),s.observe(t)),o.setProps(Object.assign({},e,{styleDiffing:!1})),n.resize();const{initialViewState:i}=e;return i&&(i.bounds?n.fitBounds(i.bounds,Object.assign({},i.fitBoundsOptions,{duration:0})):o._updateViewState(i)),n.isStyleLoaded()?n.fire("load"):n.once("style.load",(()=>n.fire("load"))),n._update(),o}_initialize(e){const{props:t}=this,{mapStyle:o=d}=t,n=Object.assign({},t,t.initialViewState,{container:e,style:u(o)}),r=n.initialViewState||n.viewState||n;if(Object.assign(n,{center:[r.longitude||0,r.latitude||0],zoom:r.zoom||0,pitch:r.pitch||0,bearing:r.bearing||0}),t.gl){const e=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=()=>(HTMLCanvasElement.prototype.getContext=e,t.gl)}const s=new this._MapClass(n);r.padding&&s.setPadding(r.padding),t.cursor&&(s.getCanvas().style.cursor=t.cursor),s.transformCameraUpdate=this._onCameraUpdate,s.on("style.load",(()=>{this._styleComponents={light:s.getLight(),sky:s.getSky(),projection:null==s.getProjection?void 0:s.getProjection(),terrain:s.getTerrain()},this._updateStyleComponents(this.props)})),s.on("sourcedata",(()=>{this._updateStyleComponents(this.props)}));for(const i in p)s.on(i,this._onPointerEvent);for(const i in m)s.on(i,this._onCameraEvent);for(const i in f)s.on(i,this._onEvent);this._map=s}recycle(){const e=this.map.getContainer().querySelector("[mapboxgl-children]");null==e||e.remove(),y.savedMaps.push(this)}destroy(){this._map.remove()}redraw(){const e=this._map;e.style&&(e._frame&&(e._frame.cancel(),e._frame=null),e._render())}_updateSize(e){const{viewState:t}=e;if(t){const e=this._map;if(t.width!==e.transform.width||t.height!==e.transform.height)return e.resize(),!0}return!1}_updateViewState(e){const t=this._map,o=t.transform;if(!t.isMoving()){const n=l(o,e);if(Object.keys(n).length>0)return this._internalUpdate=!0,t.jumpTo(n),this._internalUpdate=!1,!0}return!1}_updateSettings(e,t){const o=this._map;let n=!1;for(const r of h)if(r in e&&!i(e[r],t[r])){n=!0;const t=o["set"+r[0].toUpperCase()+r.slice(1)];null==t||t.call(o,e[r])}return n}_updateStyle(e,t){if(e.cursor!==t.cursor&&(this._map.getCanvas().style.cursor=e.cursor||""),e.mapStyle!==t.mapStyle){const{mapStyle:t=d,styleDiffing:o=!0}=e,n={diff:o};"localIdeographFontFamily"in e&&(n.localIdeographFontFamily=e.localIdeographFontFamily),this._map.setStyle(u(t),n)}}_updateStyleComponents(e){let{light:t,projection:o,sky:n,terrain:r}=e;const s=this._map,a=this._styleComponents;var l;s.style._loaded&&(t&&!i(t,a.light)&&(a.light=t,s.setLight(t)),o&&!i(o,a.projection)&&o!==(null==(l=a.projection)?void 0:l.type)&&(a.projection="string"==typeof o?{type:o}:o,null==s.setProjection||s.setProjection(a.projection)),n&&!i(n,a.sky)&&(a.sky=n,s.setSky(n)),void 0===r||i(r,a.terrain)||r&&!s.getSource(r.source)||(a.terrain=r,s.setTerrain(r)))}_updateHandlers(e,t){const o=this._map;for(const s of g){var n,r;const a=null==(n=e[s])||n;i(a,null==(r=t[s])||r)||(a?o[s].enable(a):o[s].disable())}}_queryRenderedFeatures(e){const t=this._map,{interactiveLayerIds:o=[]}=this.props;try{return t.queryRenderedFeatures(e,{layers:o.filter(t.getLayer.bind(t))})}catch(n){return[]}}_updateHover(e){const{props:t}=this;if(t.interactiveLayerIds&&(t.onMouseMove||t.onMouseEnter||t.onMouseLeave)){var o;const t=e.type,n=(null==(o=this._hoveredFeatures)?void 0:o.length)>0,r=this._queryRenderedFeatures(e.point),s=r.length>0;!s&&n&&(e.type="mouseleave",this._onPointerEvent(e)),this._hoveredFeatures=r,s&&!n&&(e.type="mouseenter",this._onPointerEvent(e)),e.type=t}else this._hoveredFeatures=null}}y.savedMaps=[];const v=["setMaxBounds","setMinZoom","setMaxZoom","setMinPitch","setMaxPitch","setRenderWorldCopies","setProjection","setStyle","addSource","removeSource","addLayer","removeLayer","setLayerZoomRange","setFilter","setPaintProperty","setLayoutProperty","setLight","setTerrain","setFog","remove"];function b(e){if(!e)return null;const t=e.map,o={getMap:()=>t};for(const n of function(e){const t=new Set;let o=e;for(;o;){for(const n of Object.getOwnPropertyNames(o))"_"!==n[0]&&"function"==typeof e[n]&&"fire"!==n&&"setEventedParent"!==n&&t.add(n);o=Object.getPrototypeOf(o)}return Array.from(t)}(t))n in o||v.includes(n)||(o[n]=t[n].bind(t));return o}const x="undefined"!=typeof document?n.useLayoutEffect:n.useEffect;const _=n.createContext(null);function S(e,t){const i=(0,n.useContext)(s),[a,l]=(0,n.useState)(null),c=(0,n.useRef)(),{current:u}=(0,n.useRef)({mapLib:null,map:null});(0,n.useEffect)((()=>{const t=e.mapLib;let n,r=!0;return Promise.resolve(t||o.e(6443).then(o.t.bind(o,6443,23))).then((t=>{if(!r)return;if(!t)throw new Error("Invalid mapLib");const o="Map"in t?t:t.default;if(!o.Map)throw new Error("Invalid mapLib");if(function(e,t){const{RTLTextPlugin:o,maxParallelImageRequests:n,workerCount:r,workerUrl:s}=t;if(o&&e.getRTLTextPluginStatus&&"unavailable"===e.getRTLTextPluginStatus()){const{pluginUrl:t,lazy:n=!0}="string"==typeof o?{pluginUrl:o}:o;e.setRTLTextPlugin(t,(e=>{e&&console.error(e)}),n)}void 0!==n&&e.setMaxParallelImageRequests(n),void 0!==r&&e.setWorkerCount(r),void 0!==s&&e.setWorkerUrl(s)}(o,e),o.supported&&!o.supported(e))throw new Error("Map is not supported by this browser");e.reuseMaps&&(n=y.reuse(e,c.current)),n||(n=new y(o.Map,e,c.current)),u.map=b(n),u.mapLib=o,l(n),null==i||i.onMapMount(u.map,e.id)})).catch((t=>{const{onError:o}=e;o?o({type:"error",target:null,originalEvent:null,error:t}):console.error(t)})),()=>{r=!1,n&&(null==i||i.onMapUnmount(e.id),e.reuseMaps?n.recycle():n.destroy())}}),[]),x((()=>{a&&a.setProps(e)})),(0,n.useImperativeHandle)(t,(()=>u.map),[a]);const d=(0,n.useMemo)((()=>Object.assign({position:"relative",width:"100%",height:"100%"},e.style)),[e.style]);return(0,r.jsx)("div",{id:e.id,ref:c,style:d,children:a&&(0,r.jsx)(_.Provider,{value:u,children:(0,r.jsx)("div",{"mapboxgl-children":"",style:{height:"100%"},children:e.children})})})}const C=n.forwardRef(S);var L=o(961);const M=/box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;function w(e,t){if(!e||!t)return;const o=e.style;for(const n in t){const e=t[n];Number.isFinite(e)&&!M.test(n)?o[n]=e+"px":o[n]=e}}const j=(0,n.memo)((0,n.forwardRef)(((e,t)=>{const{map:o,mapLib:r}=(0,n.useContext)(_),s=(0,n.useRef)({props:e});s.current.props=e;const i=(0,n.useMemo)((()=>{let t=!1;n.Children.forEach(e.children,(e=>{e&&(t=!0)}));const o=Object.assign({},e,{element:t?document.createElement("div"):null}),a=new r.Marker(o);return a.setLngLat([e.longitude,e.latitude]),a.getElement().addEventListener("click",(e=>{null==s.current.props.onClick||s.current.props.onClick({type:"click",target:a,originalEvent:e})})),a.on("dragstart",(e=>{const t=e;t.lngLat=i.getLngLat(),null==s.current.props.onDragStart||s.current.props.onDragStart(t)})),a.on("drag",(e=>{const t=e;t.lngLat=i.getLngLat(),null==s.current.props.onDrag||s.current.props.onDrag(t)})),a.on("dragend",(e=>{const t=e;t.lngLat=i.getLngLat(),null==s.current.props.onDragEnd||s.current.props.onDragEnd(t)})),a}),[]);(0,n.useEffect)((()=>(i.addTo(o.getMap()),()=>{i.remove()})),[]);const{longitude:a,latitude:l,offset:c,style:u,draggable:d=!1,popup:p=null,rotation:m=0,rotationAlignment:f="auto",pitchAlignment:h="auto"}=e;return(0,n.useEffect)((()=>{w(i.getElement(),u)}),[u]),(0,n.useImperativeHandle)(t,(()=>i),[]),i.getLngLat().lng===a&&i.getLngLat().lat===l||i.setLngLat([a,l]),c&&!function(e,t){const o=Array.isArray(e)?e[0]:e?e.x:0,n=Array.isArray(e)?e[1]:e?e.y:0,r=Array.isArray(t)?t[0]:t?t.x:0,s=Array.isArray(t)?t[1]:t?t.y:0;return o===r&&n===s}(i.getOffset(),c)&&i.setOffset(c),i.isDraggable()!==d&&i.setDraggable(d),i.getRotation()!==m&&i.setRotation(m),i.getRotationAlignment()!==f&&i.setRotationAlignment(f),i.getPitchAlignment()!==h&&i.setPitchAlignment(h),i.getPopup()!==p&&i.setPopup(p),(0,L.createPortal)(e.children,i.getElement())})));function E(e){return new Set(e?e.trim().split(/\s+/):[])}const P=(0,n.memo)((0,n.forwardRef)(((e,t)=>{const{map:o,mapLib:r}=(0,n.useContext)(_),s=(0,n.useMemo)((()=>document.createElement("div")),[]),a=(0,n.useRef)({props:e});a.current.props=e;const l=(0,n.useMemo)((()=>{const t=Object.assign({},e),o=new r.Popup(t);return o.setLngLat([e.longitude,e.latitude]),o.once("open",(e=>{null==a.current.props.onOpen||a.current.props.onOpen(e)})),o}),[]);if((0,n.useEffect)((()=>{const e=e=>{null==a.current.props.onClose||a.current.props.onClose(e)};return l.on("close",e),l.setDOMContent(s).addTo(o.getMap()),()=>{l.off("close",e),l.isOpen()&&l.remove()}}),[]),(0,n.useEffect)((()=>{w(l.getElement(),e.style)}),[e.style]),(0,n.useImperativeHandle)(t,(()=>l),[]),l.isOpen()&&(l.getLngLat().lng===e.longitude&&l.getLngLat().lat===e.latitude||l.setLngLat([e.longitude,e.latitude]),e.offset&&!i(l.options.offset,e.offset)&&l.setOffset(e.offset),l.options.anchor===e.anchor&&l.options.maxWidth===e.maxWidth||(l.options.anchor=e.anchor,l.setMaxWidth(e.maxWidth)),l.options.className!==e.className)){const t=E(l.options.className),o=E(e.className);for(const e of t)o.has(e)||l.removeClassName(e);for(const e of o)t.has(e)||l.addClassName(e);l.options.className=e.className}return(0,L.createPortal)(e.children,s)})));function k(e,t,o,r){const s=(0,n.useContext)(_),i=(0,n.useMemo)((()=>e(s)),[]);return(0,n.useEffect)((()=>{const e=r||o||t,n="function"==typeof t&&"function"==typeof o?t:null,a="function"==typeof o?o:"function"==typeof t?t:null,{map:l}=s;return l.hasControl(i)||(l.addControl(i,null==e?void 0:e.position),n&&n(s)),()=>{a&&a(s),l.hasControl(i)&&l.removeControl(i)}}),[]),i}function O(e){const t=k((t=>{let{mapLib:o}=t;return new o.FullscreenControl({container:e.containerId&&document.getElementById(e.containerId)})}),{position:e.position});return(0,n.useEffect)((()=>{w(t._controlContainer,e.style)}),[e.style]),null}const R=(0,n.memo)(O);function z(e,t){const o=(0,n.useRef)({props:e}),r=k((t=>{let{mapLib:n}=t;const r=new n.GeolocateControl(e),s=r._setupUI;return r._setupUI=()=>{r._container.hasChildNodes()||s()},r.on("geolocate",(e=>{null==o.current.props.onGeolocate||o.current.props.onGeolocate(e)})),r.on("error",(e=>{null==o.current.props.onError||o.current.props.onError(e)})),r.on("outofmaxbounds",(e=>{null==o.current.props.onOutOfMaxBounds||o.current.props.onOutOfMaxBounds(e)})),r.on("trackuserlocationstart",(e=>{null==o.current.props.onTrackUserLocationStart||o.current.props.onTrackUserLocationStart(e)})),r.on("trackuserlocationend",(e=>{null==o.current.props.onTrackUserLocationEnd||o.current.props.onTrackUserLocationEnd(e)})),r}),{position:e.position});return o.current.props=e,(0,n.useImperativeHandle)(t,(()=>r),[]),(0,n.useEffect)((()=>{w(r._container,e.style)}),[e.style]),null}const T=(0,n.memo)((0,n.forwardRef)(z));function U(e){const t=k((t=>{let{mapLib:o}=t;return new o.NavigationControl(e)}),{position:e.position});return(0,n.useEffect)((()=>{w(t._container,e.style)}),[e.style]),null}const I=(0,n.memo)(U);function D(e){const t=k((t=>{let{mapLib:o}=t;return new o.ScaleControl(e)}),{position:e.position}),o=(0,n.useRef)(e),r=o.current;o.current=e;const{style:s}=e;return void 0!==e.maxWidth&&e.maxWidth!==r.maxWidth&&(t.options.maxWidth=e.maxWidth),void 0!==e.unit&&e.unit!==r.unit&&t.setUnit(e.unit),(0,n.useEffect)((()=>{w(t._container,s)}),[s]),null}const A=(0,n.memo)(D);function F(e){const t=k((t=>{let{mapLib:o}=t;return new o.TerrainControl(e)}),{position:e.position});return(0,n.useEffect)((()=>{w(t._container,e.style)}),[e.style]),null}const N=(0,n.memo)(F);function W(e,t){if(!e)throw new Error(t)}let Z=0;function H(e){const t=(0,n.useContext)(_).map.getMap(),o=(0,n.useRef)(e),[,r]=(0,n.useState)(0),s=(0,n.useMemo)((()=>e.id||"jsx-source-"+Z++),[]);(0,n.useEffect)((()=>{if(t){const e=()=>setTimeout((()=>r((e=>e+1))),0);return t.on("styledata",e),e(),()=>{if(t.off("styledata",e),t.style&&t.style._loaded&&t.getSource(s)){var o;const e=null==(o=t.getStyle())?void 0:o.layers;if(e)for(const o of e)o.source===s&&t.removeLayer(o.id);t.removeSource(s)}}}}),[t]);let a=t&&t.style&&t.getSource(s);return a?function(e,t,o){W(t.id===o.id,"source id changed"),W(t.type===o.type,"source type changed");let n="",r=0;for(const a in t)"children"===a||"id"===a||i(o[a],t[a])||(n=a,r++);if(!r)return;const s=t.type;if("geojson"===s)e.setData(t.data);else if("image"===s)e.updateImage({url:t.url,coordinates:t.coordinates});else switch(n){case"coordinates":null==e.setCoordinates||e.setCoordinates(t.coordinates);break;case"url":null==e.setUrl||e.setUrl(t.url);break;case"tiles":null==e.setTiles||e.setTiles(t.tiles);break;default:console.warn("Unable to update <Source> prop: "+n)}}(a,e,o.current):a=function(e,t,o){if(e.style&&e.style._loaded){const n=Object.assign({},o);return delete n.id,delete n.children,e.addSource(t,n),e.getSource(t)}return null}(t,s,e),o.current=e,a&&n.Children.map(e.children,(e=>e&&(0,n.cloneElement)(e,{source:s})))||null}let B=0;function V(e){const t=(0,n.useContext)(_).map.getMap(),o=(0,n.useRef)(e),[,r]=(0,n.useState)(0),s=(0,n.useMemo)((()=>e.id||"jsx-layer-"+B++),[]);(0,n.useEffect)((()=>{if(t){const e=()=>r((e=>e+1));return t.on("styledata",e),e(),()=>{t.off("styledata",e),t.style&&t.style._loaded&&t.getLayer(s)&&t.removeLayer(s)}}}),[t]);if(t&&t.style&&t.getLayer(s))try{!function(e,t,o,n){if(W(o.id===n.id,"layer id changed"),W(o.type===n.type,"layer type changed"),"custom"===o.type||"custom"===n.type)return;const{layout:r={},paint:s={},filter:a,minzoom:l,maxzoom:c,beforeId:u}=o;if(u!==n.beforeId&&e.moveLayer(t,u),r!==n.layout){const o=n.layout||{};for(const n in r)i(r[n],o[n])||e.setLayoutProperty(t,n,r[n]);for(const n in o)r.hasOwnProperty(n)||e.setLayoutProperty(t,n,void 0)}if(s!==n.paint){const o=n.paint||{};for(const n in s)i(s[n],o[n])||e.setPaintProperty(t,n,s[n]);for(const n in o)s.hasOwnProperty(n)||e.setPaintProperty(t,n,void 0)}i(a,n.filter)||e.setFilter(t,a),l===n.minzoom&&c===n.maxzoom||e.setLayerZoomRange(t,l,c)}(t,s,e,o.current)}catch(a){console.warn(a)}else!function(e,t,o){if(e.style&&e.style._loaded&&(!("source"in o)||e.getSource(o.source))){const n=Object.assign({},o,{id:t});delete n.beforeId,e.addLayer(n,o.beforeId)}}(t,s,e);return o.current=e,null}},8453:(e,t,o)=>{o.d(t,{R:()=>i,x:()=>a});var n=o(6540);const r={},s=n.createContext(r);function i(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);