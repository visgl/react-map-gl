"use strict";(self.webpackChunkreact_map_gl_website=self.webpackChunkreact_map_gl_website||[]).push([[6671],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=u(n),d=a,f=c["".concat(i,".").concat(d)]||c[d]||m[d]||o;return n?r.createElement(f,p(p({ref:t},s),{},{components:n})):r.createElement(f,p({ref:t},s))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,p=new Array(o);p[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[c]="string"==typeof e?e:a,p[1]=l;for(var u=2;u<o;u++)p[u]=n[u];return r.createElement.apply(null,p)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>p});var r=n(7294),a=n(6010);const o={tabItem:"tabItem_Ymn6"};function p(e){var t=e.children,n=e.hidden,p=e.className;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(o.tabItem,p),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>N});var r=n(7462),a=n(7294),o=n(6010),p=n(2466),l=n(6550),i=n(1980),u=n(7392),s=n(12);function c(e){return function(e){var t,n;return null!=(t=null==(n=a.Children.map(e,(function(e){if(!e||(0,a.isValidElement)(e)&&(t=e.props)&&"object"==typeof t&&"value"in t)return e;var t;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:n.filter(Boolean))?t:[]}(e).map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes,default:t.default}}))}function m(e){var t=e.values,n=e.children;return(0,a.useMemo)((function(){var e=null!=t?t:c(n);return function(e){var t=(0,u.l)(e,(function(e,t){return e.value===t.value}));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,n])}function d(e){var t=e.value;return e.tabValues.some((function(e){return e.value===t}))}function f(e){var t=e.queryString,n=void 0!==t&&t,r=e.groupId,o=(0,l.k6)(),p=function(e){var t=e.queryString,n=void 0!==t&&t,r=e.groupId;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=r?r:null}({queryString:n,groupId:r});return[(0,i._X)(p),(0,a.useCallback)((function(e){if(p){var t=new URLSearchParams(o.location.search);t.set(p,e),o.replace(Object.assign({},o.location,{search:t.toString()}))}}),[p,o])]}function h(e){var t,n,r,o,p=e.defaultValue,l=e.queryString,i=void 0!==l&&l,u=e.groupId,c=m(e),h=(0,a.useState)((function(){return function(e){var t,n=e.defaultValue,r=e.tabValues;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!d({value:n,tabValues:r}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+n+'" but none of its children has the corresponding value. Available values are: '+r.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return n}var a=null!=(t=r.find((function(e){return e.default})))?t:r[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:p,tabValues:c})})),b=h[0],v=h[1],k=f({queryString:i,groupId:u}),g=k[0],y=k[1],N=(t=function(e){return e?"docusaurus.tab."+e:null}({groupId:u}.groupId),n=(0,s.Nk)(t),r=n[0],o=n[1],[r,(0,a.useCallback)((function(e){t&&o.set(e)}),[t,o])]),P=N[0],w=N[1],x=function(){var e=null!=g?g:P;return d({value:e,tabValues:c})?e:null}();return(0,a.useLayoutEffect)((function(){x&&v(x)}),[x]),{selectedValue:b,selectValue:(0,a.useCallback)((function(e){if(!d({value:e,tabValues:c}))throw new Error("Can't select invalid tab value="+e);v(e),y(e),w(e)}),[y,w,c]),tabValues:c}}var b=n(2389);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function k(e){var t=e.className,n=e.block,l=e.selectedValue,i=e.selectValue,u=e.tabValues,s=[],c=(0,p.o5)().blockElementScrollPositionUntilNextRender,m=function(e){var t=e.currentTarget,n=s.indexOf(t),r=u[n].value;r!==l&&(c(t),i(r))},d=function(e){var t,n=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":var r,a=s.indexOf(e.currentTarget)+1;n=null!=(r=s[a])?r:s[0];break;case"ArrowLeft":var o,p=s.indexOf(e.currentTarget)-1;n=null!=(o=s[p])?o:s[s.length-1]}null==(t=n)||t.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t)},u.map((function(e){var t=e.value,n=e.label,p=e.attributes;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:function(e){return s.push(e)},onKeyDown:d,onClick:m},p,{className:(0,o.Z)("tabs__item",v.tabItem,null==p?void 0:p.className,{"tabs__item--active":l===t})}),null!=n?n:t)})))}function g(e){var t=e.lazy,n=e.children,r=e.selectedValue,o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){var p=o.find((function(e){return e.props.value===r}));return p?(0,a.cloneElement)(p,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},o.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r})})))}function y(e){var t=h(e);return a.createElement("div",{className:(0,o.Z)("tabs-container",v.tabList)},a.createElement(k,(0,r.Z)({},e,t)),a.createElement(g,(0,r.Z)({},e,t)))}function N(e){var t=(0,b.Z)();return a.createElement(y,(0,r.Z)({key:String(t)},e))}},1793:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>s,default:()=>b,frontMatter:()=>u,metadata:()=>c,toc:()=>d});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),p=n(4866),l=n(5162),i=["components"],u={},s="Popup",c={unversionedId:"api-reference/popup",id:"api-reference/popup",title:"Popup",description:"React component that wraps the base library's Popup class (Mapbox | Maplibre).",source:"@site/../docs/api-reference/popup.md",sourceDirName:"api-reference",slug:"/api-reference/popup",permalink:"/react-map-gl/docs/api-reference/popup",draft:!1,editUrl:"https://github.com/visgl/deck.gl/tree/master/website/../docs/api-reference/popup.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"NavigationControl",permalink:"/react-map-gl/docs/api-reference/navigation-control"},next:{title:"ScaleControl",permalink:"/react-map-gl/docs/api-reference/scale-control"}},m={},d=[{value:"Properties",id:"properties",level:2},{value:"Reactive Properties",id:"reactive-properties",level:3},{value:"<code>anchor</code>: &#39;center&#39; | &#39;left&#39; | &#39;right&#39; | &#39;top&#39; | &#39;bottom&#39; | &#39;top-left&#39; | &#39;top-right&#39; | &#39;bottom-left&#39; | &#39;bottom-right&#39; | undefined",id:"anchor",level:4},{value:"<code>className</code>: string",id:"classname",level:4},{value:"<code>offset</code>: number | PointLike | Record&lt;string, PointLike&gt;",id:"offset",level:4},{value:"<code>maxWidth</code>: string",id:"maxwidth",level:4},{value:"<code>style</code>: CSSProperties",id:"style",level:4},{value:"Callbacks",id:"callbacks",level:3},{value:"<code>onOpen</code>: (evt: PopupEvent) =&gt; void",id:"onopen",level:4},{value:"<code>onClose</code>: (evt: PopupEvent) =&gt; void",id:"onclose",level:4},{value:"Other Properties",id:"other-properties",level:3},{value:"Methods",id:"methods",level:2},{value:"Source",id:"source",level:2}],f={toc:d},h="wrapper";function b(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)(h,(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"popup"},"Popup"),(0,o.kt)("p",null,"React component that wraps the base library's ",(0,o.kt)("inlineCode",{parentName:"p"},"Popup")," class (",(0,o.kt)("a",{parentName:"p",href:"https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup"},"Mapbox")," | ",(0,o.kt)("a",{parentName:"p",href:"https://maplibre.org/maplibre-gl-js-docs/api/markers/#popup"},"Maplibre"),")."),(0,o.kt)(p.Z,{groupId:"map-library",mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"mapbox",label:"Mapbox",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import * as React from 'react';\nimport {useState} from 'react';\nimport Map, {Popup} from 'react-map-gl';\n\nfunction App() {\n  const [showPopup, setShowPopup] = useState<boolean>(true);\n\n  return <Map\n    mapboxAccessToken=\"<Mapbox access token>\"\n    initialViewState={{\n      longitude: -100,\n      latitude: 40,\n      zoom: 3.5\n    }}\n    mapStyle=\"mapbox://styles/mapbox/streets-v9\"\n  >\n    {showPopup && (\n      <Popup longitude={-100} latitude={40}\n        anchor=\"bottom\"\n        onClose={() => setShowPopup(false)}>\n        You are here\n      </Popup>)}\n  </Map>;\n}\n"))),(0,o.kt)(l.Z,{value:"maplibre",label:"Maplibre",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import * as React from 'react';\nimport {useState} from 'react';\nimport Map, {Popup} from 'react-map-gl/maplibre';\n\nfunction App() {\n  const [showPopup, setShowPopup] = useState<boolean>(true);\n\n  return <Map\n    initialViewState={{\n      longitude: -100,\n      latitude: 40,\n      zoom: 3.5\n    }}\n    mapStyle=\"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key\"\n  >\n    {showPopup && (\n      <Popup longitude={-100} latitude={40}\n        anchor=\"bottom\"\n        onClose={() => setShowPopup(false)}>\n        You are here\n      </Popup>)}\n  </Map>;\n}\n")))),(0,o.kt)("h2",{id:"properties"},"Properties"),(0,o.kt)("h3",{id:"reactive-properties"},"Reactive Properties"),(0,o.kt)("h4",{id:"anchor"},(0,o.kt)("inlineCode",{parentName:"h4"},"anchor"),": 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined"),(0,o.kt)("p",null,"A string indicating the part of the popup that should be positioned closest to the coordinate, set via ",(0,o.kt)("inlineCode",{parentName:"p"},"longitude")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"latitude"),".\nIf unset, the anchor will be dynamically set to ensure the popup falls within the map container with a preference for ",(0,o.kt)("inlineCode",{parentName:"p"},"'bottom'"),"."),(0,o.kt)("h4",{id:"classname"},(0,o.kt)("inlineCode",{parentName:"h4"},"className"),": string"),(0,o.kt)("p",null,"Space-separated CSS class names to add to popup container."),(0,o.kt)("h4",{id:"offset"},(0,o.kt)("inlineCode",{parentName:"h4"},"offset"),": number | ",(0,o.kt)("a",{parentName:"h4",href:"/react-map-gl/docs/api-reference/types#pointlike"},"PointLike")," | Record\\<string, ",(0,o.kt)("a",{parentName:"h4",href:"/react-map-gl/docs/api-reference/types#pointlike"},"PointLike"),">"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"null")),(0,o.kt)("p",null,"A pixel offset applied to the popup's location specified as:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"a single number specifying a distance from the popup's location"),(0,o.kt)("li",{parentName:"ul"},"a PointLike specifying a constant offset"),(0,o.kt)("li",{parentName:"ul"},"an object of Points specifing an offset for each anchor position.")),(0,o.kt)("p",null,"Negative offsets indicate left and up."),(0,o.kt)("h4",{id:"maxwidth"},(0,o.kt)("inlineCode",{parentName:"h4"},"maxWidth"),": string"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"240px")),(0,o.kt)("p",null,"A string that sets the CSS property of the popup's maximum width."),(0,o.kt)("h4",{id:"style"},(0,o.kt)("inlineCode",{parentName:"h4"},"style"),": CSSProperties"),(0,o.kt)("p",null,"CSS style override that applies to the popup's container."),(0,o.kt)("h3",{id:"callbacks"},"Callbacks"),(0,o.kt)("h4",{id:"onopen"},(0,o.kt)("inlineCode",{parentName:"h4"},"onOpen"),": (evt: ",(0,o.kt)("a",{parentName:"h4",href:"/react-map-gl/docs/api-reference/types#popupevent"},"PopupEvent"),") => void"),(0,o.kt)("p",null,"Called when the popup is opened."),(0,o.kt)("h4",{id:"onclose"},(0,o.kt)("inlineCode",{parentName:"h4"},"onClose"),": (evt: ",(0,o.kt)("a",{parentName:"h4",href:"/react-map-gl/docs/api-reference/types#popupevent"},"PopupEvent"),") => void"),(0,o.kt)("p",null,"Called when the popup is closed by the user clicking on the close button or outside (if ",(0,o.kt)("inlineCode",{parentName:"p"},"closeOnClick: true"),")."),(0,o.kt)("h3",{id:"other-properties"},"Other Properties"),(0,o.kt)("p",null,"The properties in this section are not reactive. They are only used when the component first mounts."),(0,o.kt)("p",null,"Any options supported by the ",(0,o.kt)("inlineCode",{parentName:"p"},"Popup")," class (",(0,o.kt)("a",{parentName:"p",href:"https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup"},"Mapbox")," | ",(0,o.kt)("a",{parentName:"p",href:"https://maplibre.org/maplibre-gl-js-docs/api/markers/#popup"},"Maplibre"),"), such as"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"closeButton")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"closeOnClick")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"closeOnMove")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"focusAfterOpen"))),(0,o.kt)("h2",{id:"methods"},"Methods"),(0,o.kt)("p",null,"The underlying native ",(0,o.kt)("inlineCode",{parentName:"p"},"Popup")," instance is accessible via a ",(0,o.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/refs-and-the-dom.html#creating-refs"},"React ref")," hook.\nYou may use it to call any imperative methods:"),(0,o.kt)(p.Z,{groupId:"map-library",mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"mapbox",label:"Mapbox",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import * as React from 'react';\nimport {useRef, useEffect} from 'react';\nimport Map, {Popup} from 'react-map-gl';\nimport mapboxgl from 'mapbox-gl';\n\nfunction App() {\n  const popupRef = useRef<mapboxgl.Popup>();\n\n  useEffect(() => {\n    popupRef.current?.trackPointer();\n  }, [popupRef.current])\n\n  return <Map>\n    <Popup longitude={-122.4} latitude={37.8} ref={popupRef} >\n      Tooltip\n    </Popup>\n  </Map>;\n}\n"))),(0,o.kt)(l.Z,{value:"maplibre",label:"Maplibre",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import * as React from 'react';\nimport {useRef, useEffect} from 'react';\nimport Map, {Popup} from 'react-map-gl/maplibre';\nimport maplibregl from 'maplibre-gl';\n\nfunction App() {\n  const popupRef = useRef<maplibregl.Popup>();\n\n  useEffect(() => {\n    popupRef.current?.trackPointer();\n  }, [popupRef.current])\n\n  return <Map>\n    <Popup longitude={-122.4} latitude={37.8} ref={popupRef} >\n      Tooltip\n    </Popup>\n  </Map>;\n}\n")))),(0,o.kt)("h2",{id:"source"},"Source"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/visgl/react-map-gl/tree/7.1-release/src/components/popup.ts"},"popup.ts")))}b.isMDXComponent=!0}}]);