"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[5212],{9615:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>y,contentTitle:()=>f,default:()=>w,frontMatter:()=>h,metadata:()=>n,toc:()=>_});const n=JSON.parse('{"id":"maplibre/controls","title":"Markers, Popups and Controls","description":"","source":"@site/src/examples/maplibre/controls.mdx","sourceDirName":"maplibre","slug":"/maplibre/controls","permalink":"/react-map-gl/examples/maplibre/controls","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Clusters","permalink":"/react-map-gl/examples/maplibre/clusters"},"next":{"title":"Custom Cursor","permalink":"/react-map-gl/examples/maplibre/custom-cursor"}}');var i=o(4848),r=o(8453),a=o(6540),s=(o(5338),o(5490));function l(){return(0,i.jsxs)("div",{className:"control-panel",children:[(0,i.jsx)("h3",{children:"Marker, Popup, NavigationControl and FullscreenControl "}),(0,i.jsx)("p",{children:"Map showing top 20 most populated cities of the United States. Click on a marker to learn more."}),(0,i.jsxs)("p",{children:["Data source:"," ",(0,i.jsx)("a",{href:"https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population",children:"Wikipedia"})]}),(0,i.jsx)("div",{className:"source-link",children:(0,i.jsx)("a",{href:"https://github.com/visgl/react-maplibre/tree/1.0-release/examples/controls",target:"_new",children:"View Code \u2197"})})]})}const u=a.memo(l),c={cursor:"pointer",fill:"#d00",stroke:"none"};function p(e){let{size:t=20}=e;return(0,i.jsx)("svg",{height:t,viewBox:"0 0 24 24",style:c,children:(0,i.jsx)("path",{d:"M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3\n  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9\n  C20.1,15.8,20.2,15.8,20.2,15.7z"})})}const d=a.memo(p);var m=o(5086);function g(){const[e,t]=(0,a.useState)(null),o=(0,a.useMemo)((()=>m.map(((e,o)=>(0,i.jsx)(s.pH,{longitude:e.longitude,latitude:e.latitude,anchor:"bottom",onClick:o=>{o.originalEvent.stopPropagation(),t(e)},children:(0,i.jsx)(d,{})},"marker-"+o)))),[]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s.T5,{initialViewState:{latitude:40,longitude:-100,zoom:3.5,bearing:0,pitch:0},mapStyle:"https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",children:[(0,i.jsx)(s.tG,{position:"top-left"}),(0,i.jsx)(s.T3,{position:"top-left"}),(0,i.jsx)(s.ov,{position:"top-left"}),(0,i.jsx)(s.g0,{}),o,e&&(0,i.jsxs)(s.zD,{anchor:"top",longitude:Number(e.longitude),latitude:Number(e.latitude),onClose:()=>t(null),children:[(0,i.jsxs)("div",{children:[e.city,", ",e.state," |"," ",(0,i.jsx)("a",{target:"_new",href:"http://en.wikipedia.org/w/index.php?title=Special:Search&search="+e.city+", "+e.state,children:"Wikipedia"})]}),(0,i.jsx)("img",{width:"100%",src:e.image})]})]}),(0,i.jsx)(u,{})]})}const h={},f="Markers, Popups and Controls",y={},_=[];function v(e){const t={h1:"h1",header:"header",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"markers-popups-and-controls",children:"Markers, Popups and Controls"})}),"\n","\n",(0,i.jsx)(g,{})]})}function w(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(v,{...e})}):v(e)}},5490:(e,t,o)=>{o.d(t,{T3:()=>D,tG:()=>O,Wd:()=>Z,T5:()=>k,pH:()=>L,ov:()=>N,zD:()=>M,g0:()=>F,kL:()=>J,jG:()=>U,Ay:()=>k,VI:()=>E});var n=o(6540),i=o(4848);const r=n.createContext(null);function a(e,t){if(e===t)return!0;if(!e||!t)return!1;if(Array.isArray(e)){if(!Array.isArray(t)||e.length!==t.length)return!1;for(let o=0;o<e.length;o++)if(!a(e[o],t[o]))return!1;return!0}if(Array.isArray(t))return!1;if("object"==typeof e&&"object"==typeof t){const o=Object.keys(e),n=Object.keys(t);if(o.length!==n.length)return!1;for(const i of o){if(!t.hasOwnProperty(i))return!1;if(!a(e[i],t[i]))return!1}return!0}return!1}function s(e){return{longitude:e.center.lng,latitude:e.center.lat,zoom:e.zoom,pitch:e.pitch,bearing:e.bearing,padding:e.padding}}function l(e,t){const o=t.viewState||t,n={};if("longitude"in o&&"latitude"in o&&(o.longitude!==e.center.lng||o.latitude!==e.center.lat)){const t=e.center.constructor;n.center=new t(o.longitude,o.latitude)}return"zoom"in o&&o.zoom!==e.zoom&&(n.zoom=o.zoom),"bearing"in o&&o.bearing!==e.bearing&&(n.bearing=o.bearing),"pitch"in o&&o.pitch!==e.pitch&&(n.pitch=o.pitch),o.padding&&e.padding&&!a(o.padding,e.padding)&&(n.padding=o.padding),n}const u=["type","source","source-layer","minzoom","maxzoom","filter","layout"];function c(e){if(!e)return null;if("string"==typeof e)return e;if("toJS"in e&&(e=e.toJS()),!e.layers)return e;const t={};for(const n of e.layers)t[n.id]=n;const o=e.layers.map((e=>{let o=null;"interactive"in e&&(o=Object.assign({},e),delete o.interactive);const n=t[e.ref];if(n){o=o||Object.assign({},e),delete o.ref;for(const e of u)e in n&&(o[e]=n[e])}return o||e}));return Object.assign({},e,{layers:o})}const p={version:8,sources:{},layers:[]},d={mousedown:"onMouseDown",mouseup:"onMouseUp",mouseover:"onMouseOver",mousemove:"onMouseMove",click:"onClick",dblclick:"onDblClick",mouseenter:"onMouseEnter",mouseleave:"onMouseLeave",mouseout:"onMouseOut",contextmenu:"onContextMenu",touchstart:"onTouchStart",touchend:"onTouchEnd",touchmove:"onTouchMove",touchcancel:"onTouchCancel"},m={movestart:"onMoveStart",move:"onMove",moveend:"onMoveEnd",dragstart:"onDragStart",drag:"onDrag",dragend:"onDragEnd",zoomstart:"onZoomStart",zoom:"onZoom",zoomend:"onZoomEnd",rotatestart:"onRotateStart",rotate:"onRotate",rotateend:"onRotateEnd",pitchstart:"onPitchStart",pitch:"onPitch",pitchend:"onPitchEnd"},g={wheel:"onWheel",boxzoomstart:"onBoxZoomStart",boxzoomend:"onBoxZoomEnd",boxzoomcancel:"onBoxZoomCancel",resize:"onResize",load:"onLoad",render:"onRender",idle:"onIdle",remove:"onRemove",data:"onData",styledata:"onStyleData",sourcedata:"onSourceData",error:"onError"},h=["minZoom","maxZoom","minPitch","maxPitch","maxBounds","projection","renderWorldCopies"],f=["scrollZoom","boxZoom","dragRotate","dragPan","keyboard","doubleClickZoom","touchZoomRotate","touchPitch"];class y{constructor(e,t,o){this._map=null,this._internalUpdate=!1,this._hoveredFeatures=null,this._propsedCameraUpdate=null,this._styleComponents={},this._onEvent=e=>{const t=this.props[g[e.type]];t?t(e):"error"===e.type&&console.error(e.error)},this._onCameraEvent=e=>{if(this._internalUpdate)return;e.viewState=this._propsedCameraUpdate||s(this._map.transform);const t=this.props[m[e.type]];t&&t(e)},this._onCameraUpdate=e=>this._internalUpdate?e:(this._propsedCameraUpdate=s(e),l(e,this.props)),this._onPointerEvent=e=>{"mousemove"!==e.type&&"mouseout"!==e.type||this._updateHover(e);const t=this.props[d[e.type]];t&&(this.props.interactiveLayerIds&&"mouseover"!==e.type&&"mouseout"!==e.type&&(e.features=this._hoveredFeatures||this._queryRenderedFeatures(e.point)),t(e),delete e.features)},this._MapClass=e,this.props=t,this._initialize(o)}get map(){return this._map}setProps(e){const t=this.props;this.props=e;const o=this._updateSettings(e,t),n=this._updateSize(e),i=this._updateViewState(e);this._updateStyle(e,t),this._updateStyleComponents(e),this._updateHandlers(e,t),(o||n||i&&!this._map.isMoving())&&this.redraw()}static reuse(e,t){const o=y.savedMaps.pop();if(!o)return null;const n=o.map,i=n.getContainer();for(t.className=i.className;i.childNodes.length>0;)t.appendChild(i.childNodes[0]);n._container=t;const r=n._resizeObserver;r&&(r.disconnect(),r.observe(t)),o.setProps(Object.assign({},e,{styleDiffing:!1})),n.resize();const{initialViewState:a}=e;return a&&(a.bounds?n.fitBounds(a.bounds,Object.assign({},a.fitBoundsOptions,{duration:0})):o._updateViewState(a)),n.isStyleLoaded()?n.fire("load"):n.once("style.load",(()=>n.fire("load"))),n._update(),o}_initialize(e){const{props:t}=this,{mapStyle:o=p}=t,n=Object.assign({},t,t.initialViewState,{container:e,style:c(o)}),i=n.initialViewState||n.viewState||n;if(Object.assign(n,{center:[i.longitude||0,i.latitude||0],zoom:i.zoom||0,pitch:i.pitch||0,bearing:i.bearing||0}),t.gl){const e=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=()=>(HTMLCanvasElement.prototype.getContext=e,t.gl)}const r=new this._MapClass(n);i.padding&&r.setPadding(i.padding),t.cursor&&(r.getCanvas().style.cursor=t.cursor),r.transformCameraUpdate=this._onCameraUpdate,r.on("style.load",(()=>{this._styleComponents={light:r.getLight(),sky:r.getSky(),projection:null==r.getProjection?void 0:r.getProjection(),terrain:r.getTerrain()},this._updateStyleComponents(this.props)})),r.on("sourcedata",(()=>{this._updateStyleComponents(this.props)}));for(const a in d)r.on(a,this._onPointerEvent);for(const a in m)r.on(a,this._onCameraEvent);for(const a in g)r.on(a,this._onEvent);this._map=r}recycle(){const e=this.map.getContainer().querySelector("[mapboxgl-children]");null==e||e.remove(),y.savedMaps.push(this)}destroy(){this._map.remove()}redraw(){const e=this._map;e.style&&(e._frame&&(e._frame.cancel(),e._frame=null),e._render())}_updateSize(e){const{viewState:t}=e;if(t){const e=this._map;if(t.width!==e.transform.width||t.height!==e.transform.height)return e.resize(),!0}return!1}_updateViewState(e){const t=this._map,o=t.transform;if(!t.isMoving()){const n=l(o,e);if(Object.keys(n).length>0)return this._internalUpdate=!0,t.jumpTo(n),this._internalUpdate=!1,!0}return!1}_updateSettings(e,t){const o=this._map;let n=!1;for(const i of h)if(i in e&&!a(e[i],t[i])){n=!0;const t=o["set"+i[0].toUpperCase()+i.slice(1)];null==t||t.call(o,e[i])}return n}_updateStyle(e,t){if(e.cursor!==t.cursor&&(this._map.getCanvas().style.cursor=e.cursor||""),e.mapStyle!==t.mapStyle){const{mapStyle:t=p,styleDiffing:o=!0}=e,n={diff:o};"localIdeographFontFamily"in e&&(n.localIdeographFontFamily=e.localIdeographFontFamily),this._map.setStyle(c(t),n)}}_updateStyleComponents(e){let{light:t,projection:o,sky:n,terrain:i}=e;const r=this._map,s=this._styleComponents;var l;r.style._loaded&&(t&&!a(t,s.light)&&(s.light=t,r.setLight(t)),o&&!a(o,s.projection)&&o!==(null==(l=s.projection)?void 0:l.type)&&(s.projection="string"==typeof o?{type:o}:o,null==r.setProjection||r.setProjection(s.projection)),n&&!a(n,s.sky)&&(s.sky=n,r.setSky(n)),void 0===i||a(i,s.terrain)||i&&!r.getSource(i.source)||(s.terrain=i,r.setTerrain(i)))}_updateHandlers(e,t){const o=this._map;for(const r of f){var n,i;const s=null==(n=e[r])||n;a(s,null==(i=t[r])||i)||(s?o[r].enable(s):o[r].disable())}}_queryRenderedFeatures(e){const t=this._map,{interactiveLayerIds:o=[]}=this.props;try{return t.queryRenderedFeatures(e,{layers:o.filter(t.getLayer.bind(t))})}catch(n){return[]}}_updateHover(e){const{props:t}=this;if(t.interactiveLayerIds&&(t.onMouseMove||t.onMouseEnter||t.onMouseLeave)){var o;const t=e.type,n=(null==(o=this._hoveredFeatures)?void 0:o.length)>0,i=this._queryRenderedFeatures(e.point),r=i.length>0;!r&&n&&(e.type="mouseleave",this._onPointerEvent(e)),this._hoveredFeatures=i,r&&!n&&(e.type="mouseenter",this._onPointerEvent(e)),e.type=t}else this._hoveredFeatures=null}}y.savedMaps=[];const _=["setMaxBounds","setMinZoom","setMaxZoom","setMinPitch","setMaxPitch","setRenderWorldCopies","setProjection","setStyle","addSource","removeSource","addLayer","removeLayer","setLayerZoomRange","setFilter","setPaintProperty","setLayoutProperty","setLight","setTerrain","setFog","remove"];function v(e){if(!e)return null;const t=e.map,o={getMap:()=>t};for(const n of function(e){const t=new Set;let o=e;for(;o;){for(const n of Object.getOwnPropertyNames(o))"_"!==n[0]&&"function"==typeof e[n]&&"fire"!==n&&"setEventedParent"!==n&&t.add(n);o=Object.getPrototypeOf(o)}return Array.from(t)}(t))n in o||_.includes(n)||(o[n]=t[n].bind(t));return o}const w="undefined"!=typeof document?n.useLayoutEffect:n.useEffect;const x=n.createContext(null);function b(e,t){const a=(0,n.useContext)(r),[s,l]=(0,n.useState)(null),u=(0,n.useRef)(),{current:c}=(0,n.useRef)({mapLib:null,map:null});(0,n.useEffect)((()=>{const t=e.mapLib;let n,i=!0;return Promise.resolve(t||o.e(6443).then(o.t.bind(o,6443,23))).then((t=>{if(!i)return;if(!t)throw new Error("Invalid mapLib");const o="Map"in t?t:t.default;if(!o.Map)throw new Error("Invalid mapLib");if(function(e,t){const{RTLTextPlugin:o,maxParallelImageRequests:n,workerCount:i,workerUrl:r}=t;if(o&&e.getRTLTextPluginStatus&&"unavailable"===e.getRTLTextPluginStatus()){const{pluginUrl:t,lazy:n=!0}="string"==typeof o?{pluginUrl:o}:o;e.setRTLTextPlugin(t,(e=>{e&&console.error(e)}),n)}void 0!==n&&e.setMaxParallelImageRequests(n),void 0!==i&&e.setWorkerCount(i),void 0!==r&&e.setWorkerUrl(r)}(o,e),o.supported&&!o.supported(e))throw new Error("Map is not supported by this browser");e.reuseMaps&&(n=y.reuse(e,u.current)),n||(n=new y(o.Map,e,u.current)),c.map=v(n),c.mapLib=o,l(n),null==a||a.onMapMount(c.map,e.id)})).catch((t=>{const{onError:o}=e;o?o({type:"error",target:null,originalEvent:null,error:t}):console.error(t)})),()=>{i=!1,n&&(null==a||a.onMapUnmount(e.id),e.reuseMaps?n.recycle():n.destroy())}}),[]),w((()=>{s&&s.setProps(e)})),(0,n.useImperativeHandle)(t,(()=>c.map),[s]);const p=(0,n.useMemo)((()=>Object.assign({position:"relative",width:"100%",height:"100%"},e.style)),[e.style]);return(0,i.jsx)("div",{id:e.id,ref:u,style:p,children:s&&(0,i.jsx)(x.Provider,{value:c,children:(0,i.jsx)("div",{"mapboxgl-children":"",style:{height:"100%"},children:e.children})})})}const k=n.forwardRef(b);var C=o(961);const S=/box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;function j(e,t){if(!e||!t)return;const o=e.style;for(const n in t){const e=t[n];Number.isFinite(e)&&!S.test(n)?o[n]=e+"px":o[n]=e}}const L=(0,n.memo)((0,n.forwardRef)(((e,t)=>{const{map:o,mapLib:i}=(0,n.useContext)(x),r=(0,n.useRef)({props:e});r.current.props=e;const a=(0,n.useMemo)((()=>{let t=!1;n.Children.forEach(e.children,(e=>{e&&(t=!0)}));const o=Object.assign({},e,{element:t?document.createElement("div"):null}),s=new i.Marker(o);return s.setLngLat([e.longitude,e.latitude]),s.getElement().addEventListener("click",(e=>{null==r.current.props.onClick||r.current.props.onClick({type:"click",target:s,originalEvent:e})})),s.on("dragstart",(e=>{const t=e;t.lngLat=a.getLngLat(),null==r.current.props.onDragStart||r.current.props.onDragStart(t)})),s.on("drag",(e=>{const t=e;t.lngLat=a.getLngLat(),null==r.current.props.onDrag||r.current.props.onDrag(t)})),s.on("dragend",(e=>{const t=e;t.lngLat=a.getLngLat(),null==r.current.props.onDragEnd||r.current.props.onDragEnd(t)})),s}),[]);(0,n.useEffect)((()=>(a.addTo(o.getMap()),()=>{a.remove()})),[]);const{longitude:s,latitude:l,offset:u,style:c,draggable:p=!1,popup:d=null,rotation:m=0,rotationAlignment:g="auto",pitchAlignment:h="auto"}=e;return(0,n.useEffect)((()=>{j(a.getElement(),c)}),[c]),(0,n.useImperativeHandle)(t,(()=>a),[]),a.getLngLat().lng===s&&a.getLngLat().lat===l||a.setLngLat([s,l]),u&&!function(e,t){const o=Array.isArray(e)?e[0]:e?e.x:0,n=Array.isArray(e)?e[1]:e?e.y:0,i=Array.isArray(t)?t[0]:t?t.x:0,r=Array.isArray(t)?t[1]:t?t.y:0;return o===i&&n===r}(a.getOffset(),u)&&a.setOffset(u),a.isDraggable()!==p&&a.setDraggable(p),a.getRotation()!==m&&a.setRotation(m),a.getRotationAlignment()!==g&&a.setRotationAlignment(g),a.getPitchAlignment()!==h&&a.setPitchAlignment(h),a.getPopup()!==d&&a.setPopup(d),(0,C.createPortal)(e.children,a.getElement())})));function P(e){return new Set(e?e.trim().split(/\s+/):[])}const M=(0,n.memo)((0,n.forwardRef)(((e,t)=>{const{map:o,mapLib:i}=(0,n.useContext)(x),r=(0,n.useMemo)((()=>document.createElement("div")),[]),s=(0,n.useRef)({props:e});s.current.props=e;const l=(0,n.useMemo)((()=>{const t=Object.assign({},e),o=new i.Popup(t);return o.setLngLat([e.longitude,e.latitude]),o.once("open",(e=>{null==s.current.props.onOpen||s.current.props.onOpen(e)})),o}),[]);if((0,n.useEffect)((()=>{const e=e=>{null==s.current.props.onClose||s.current.props.onClose(e)};return l.on("close",e),l.setDOMContent(r).addTo(o.getMap()),()=>{l.off("close",e),l.isOpen()&&l.remove()}}),[]),(0,n.useEffect)((()=>{j(l.getElement(),e.style)}),[e.style]),(0,n.useImperativeHandle)(t,(()=>l),[]),l.isOpen()&&(l.getLngLat().lng===e.longitude&&l.getLngLat().lat===e.latitude||l.setLngLat([e.longitude,e.latitude]),e.offset&&!a(l.options.offset,e.offset)&&l.setOffset(e.offset),l.options.anchor===e.anchor&&l.options.maxWidth===e.maxWidth||(l.options.anchor=e.anchor,l.setMaxWidth(e.maxWidth)),l.options.className!==e.className)){const t=P(l.options.className),o=P(e.className);for(const e of t)o.has(e)||l.removeClassName(e);for(const e of o)t.has(e)||l.addClassName(e);l.options.className=e.className}return(0,C.createPortal)(e.children,r)})));function E(e,t,o,i){const r=(0,n.useContext)(x),a=(0,n.useMemo)((()=>e(r)),[]);return(0,n.useEffect)((()=>{const e=i||o||t,n="function"==typeof t&&"function"==typeof o?t:null,s="function"==typeof o?o:"function"==typeof t?t:null,{map:l}=r;return l.hasControl(a)||(l.addControl(a,null==e?void 0:e.position),n&&n(r)),()=>{s&&s(r),l.hasControl(a)&&l.removeControl(a)}}),[]),a}function T(e){const t=E((t=>{let{mapLib:o}=t;return new o.FullscreenControl({container:e.containerId&&document.getElementById(e.containerId)})}),{position:e.position});return(0,n.useEffect)((()=>{j(t._controlContainer,e.style)}),[e.style]),null}const D=(0,n.memo)(T);function z(e,t){const o=(0,n.useRef)({props:e}),i=E((t=>{let{mapLib:n}=t;const i=new n.GeolocateControl(e),r=i._setupUI;return i._setupUI=()=>{i._container.hasChildNodes()||r()},i.on("geolocate",(e=>{null==o.current.props.onGeolocate||o.current.props.onGeolocate(e)})),i.on("error",(e=>{null==o.current.props.onError||o.current.props.onError(e)})),i.on("outofmaxbounds",(e=>{null==o.current.props.onOutOfMaxBounds||o.current.props.onOutOfMaxBounds(e)})),i.on("trackuserlocationstart",(e=>{null==o.current.props.onTrackUserLocationStart||o.current.props.onTrackUserLocationStart(e)})),i.on("trackuserlocationend",(e=>{null==o.current.props.onTrackUserLocationEnd||o.current.props.onTrackUserLocationEnd(e)})),i}),{position:e.position});return o.current.props=e,(0,n.useImperativeHandle)(t,(()=>i),[]),(0,n.useEffect)((()=>{j(i._container,e.style)}),[e.style]),null}const O=(0,n.memo)((0,n.forwardRef)(z));function R(e){const t=E((t=>{let{mapLib:o}=t;return new o.NavigationControl(e)}),{position:e.position});return(0,n.useEffect)((()=>{j(t._container,e.style)}),[e.style]),null}const N=(0,n.memo)(R);function A(e){const t=E((t=>{let{mapLib:o}=t;return new o.ScaleControl(e)}),{position:e.position}),o=(0,n.useRef)(e),i=o.current;o.current=e;const{style:r}=e;return void 0!==e.maxWidth&&e.maxWidth!==i.maxWidth&&(t.options.maxWidth=e.maxWidth),void 0!==e.unit&&e.unit!==i.unit&&t.setUnit(e.unit),(0,n.useEffect)((()=>{j(t._container,r)}),[r]),null}const F=(0,n.memo)(A);function I(e){const t=E((t=>{let{mapLib:o}=t;return new o.TerrainControl(e)}),{position:e.position});return(0,n.useEffect)((()=>{j(t._container,e.style)}),[e.style]),null}const U=(0,n.memo)(I);function W(e,t){if(!e)throw new Error(t)}let G=0;function J(e){const t=(0,n.useContext)(x).map.getMap(),o=(0,n.useRef)(e),[,i]=(0,n.useState)(0),r=(0,n.useMemo)((()=>e.id||"jsx-source-"+G++),[]);(0,n.useEffect)((()=>{if(t){const e=()=>setTimeout((()=>i((e=>e+1))),0);return t.on("styledata",e),e(),()=>{if(t.off("styledata",e),t.style&&t.style._loaded&&t.getSource(r)){var o;const e=null==(o=t.getStyle())?void 0:o.layers;if(e)for(const o of e)o.source===r&&t.removeLayer(o.id);t.removeSource(r)}}}}),[t]);let s=t&&t.style&&t.getSource(r);return s?function(e,t,o){W(t.id===o.id,"source id changed"),W(t.type===o.type,"source type changed");let n="",i=0;for(const s in t)"children"===s||"id"===s||a(o[s],t[s])||(n=s,i++);if(!i)return;const r=t.type;if("geojson"===r)e.setData(t.data);else if("image"===r)e.updateImage({url:t.url,coordinates:t.coordinates});else switch(n){case"coordinates":null==e.setCoordinates||e.setCoordinates(t.coordinates);break;case"url":null==e.setUrl||e.setUrl(t.url);break;case"tiles":null==e.setTiles||e.setTiles(t.tiles);break;default:console.warn("Unable to update <Source> prop: "+n)}}(s,e,o.current):s=function(e,t,o){if(e.style&&e.style._loaded){const n=Object.assign({},o);return delete n.id,delete n.children,e.addSource(t,n),e.getSource(t)}return null}(t,r,e),o.current=e,s&&n.Children.map(e.children,(e=>e&&(0,n.cloneElement)(e,{source:r})))||null}let H=0;function Z(e){const t=(0,n.useContext)(x).map.getMap(),o=(0,n.useRef)(e),[,i]=(0,n.useState)(0),r=(0,n.useMemo)((()=>e.id||"jsx-layer-"+H++),[]);(0,n.useEffect)((()=>{if(t){const e=()=>i((e=>e+1));return t.on("styledata",e),e(),()=>{t.off("styledata",e),t.style&&t.style._loaded&&t.getLayer(r)&&t.removeLayer(r)}}}),[t]);if(t&&t.style&&t.getLayer(r))try{!function(e,t,o,n){if(W(o.id===n.id,"layer id changed"),W(o.type===n.type,"layer type changed"),"custom"===o.type||"custom"===n.type)return;const{layout:i={},paint:r={},filter:s,minzoom:l,maxzoom:u,beforeId:c}=o;if(c!==n.beforeId&&e.moveLayer(t,c),i!==n.layout){const o=n.layout||{};for(const n in i)a(i[n],o[n])||e.setLayoutProperty(t,n,i[n]);for(const n in o)i.hasOwnProperty(n)||e.setLayoutProperty(t,n,void 0)}if(r!==n.paint){const o=n.paint||{};for(const n in r)a(r[n],o[n])||e.setPaintProperty(t,n,r[n]);for(const n in o)r.hasOwnProperty(n)||e.setPaintProperty(t,n,void 0)}a(s,n.filter)||e.setFilter(t,s),l===n.minzoom&&u===n.maxzoom||e.setLayerZoomRange(t,l,u)}(t,r,e,o.current)}catch(s){console.warn(s)}else!function(e,t,o){if(e.style&&e.style._loaded&&(!("source"in o)||e.getSource(o.source))){const n=Object.assign({},o,{id:t});delete n.beforeId,e.addLayer(n,o.beforeId)}}(t,r,e);return o.current=e,null}},8453:(e,t,o)=>{o.d(t,{R:()=>a,x:()=>s});var n=o(6540);const i={},r=n.createContext(i);function a(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),n.createElement(r.Provider,{value:t},e.children)}},5086:e=>{e.exports=JSON.parse('[{"city":"New York","population":"8,175,133","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg","state":"New York","latitude":40.6643,"longitude":-73.9385},{"city":"Los Angeles","population":"3,792,621","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/240px-LA_Skyline_Mountains2.jpg","state":"California","latitude":34.0194,"longitude":-118.4108},{"city":"Chicago","population":"2,695,598","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/8/85/2008-06-10_3000x1000_chicago_skyline.jpg/240px-2008-06-10_3000x1000_chicago_skyline.jpg","state":"Illinois","latitude":41.8376,"longitude":-87.6818},{"city":"Houston","population":"2,100,263","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg/240px-Aerial_views_of_the_Houston%2C_Texas%2C_28005u.jpg","state":"Texas","latitude":29.7805,"longitude":-95.3863},{"city":"Phoenix","population":"1,445,632","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Downtown_Phoenix_Aerial_Looking_Northeast.jpg/207px-Downtown_Phoenix_Aerial_Looking_Northeast.jpg","state":"Arizona","latitude":33.5722,"longitude":-112.088},{"city":"Philadelphia","population":"1,526,006","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Philly_skyline.jpg/240px-Philly_skyline.jpg","state":"Pennsylvania","latitude":40.0094,"longitude":-75.1333},{"city":"San Antonio","population":"1,327,407","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Downtown_San_Antonio_View.JPG/240px-Downtown_San_Antonio_View.JPG","state":"Texas","latitude":29.4724,"longitude":-98.5251},{"city":"San Diego","population":"1,307,402","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg/240px-US_Navy_110604-N-NS602-574_Navy_and_Marine_Corps_personnel%2C_along_with_community_leaders_from_the_greater_San_Diego_area_come_together_to_commemora.jpg","state":"California","latitude":32.8153,"longitude":-117.135},{"city":"Dallas","population":"1,197,816","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Dallas_skyline_daytime.jpg/240px-Dallas_skyline_daytime.jpg","state":"Texas","latitude":32.7757,"longitude":-96.7967},{"city":"San Jose","population":"945,942","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Downtown_San_Jose_skyline.PNG/240px-Downtown_San_Jose_skyline.PNG","state":"California","latitude":37.2969,"longitude":-121.8193},{"city":"Austin","population":"790,390","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Austin2012-12-01.JPG/240px-Austin2012-12-01.JPG","state":"Texas","latitude":30.3072,"longitude":-97.756},{"city":"Jacksonville","population":"821,784","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg/240px-Skyline_of_Jacksonville_FL%2C_South_view_20160706_1.jpg","state":"Florida","latitude":30.337,"longitude":-81.6613},{"city":"San Francisco","population":"805,235","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg","state":"California","latitude":37.7751,"longitude":-122.4193},{"city":"Columbus","population":"787,033","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Columbus-ohio-skyline-panorama.jpg/240px-Columbus-ohio-skyline-panorama.jpg","state":"Ohio","latitude":39.9848,"longitude":-82.985},{"city":"Indianapolis","population":"820,445","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Downtown_indy_from_parking_garage_zoom.JPG/213px-Downtown_indy_from_parking_garage_zoom.JPG","state":"Indiana","latitude":39.7767,"longitude":-86.1459},{"city":"Fort Worth","population":"741,206","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/d/db/FortWorthTexasSkylineW.jpg/240px-FortWorthTexasSkylineW.jpg","state":"Texas","latitude":32.7795,"longitude":-97.3463},{"city":"Charlotte","population":"731,424","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Charlotte_skyline45647.jpg/222px-Charlotte_skyline45647.jpg","state":"North Carolina","latitude":35.2087,"longitude":-80.8307},{"city":"Seattle","population":"608,660","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/240px-SeattleI5Skyline.jpg","state":"Washington","latitude":47.6205,"longitude":-122.3509},{"city":"Denver","population":"600,158","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/DenverCP.JPG/240px-DenverCP.JPG","state":"Colorado","latitude":39.7618,"longitude":-104.8806},{"city":"El Paso","population":"649,121","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg","state":"Texas","latitude":31.8484,"longitude":-106.427}]')}}]);