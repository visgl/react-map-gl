"use strict";(self.webpackChunkreact_map_gl_website=self.webpackChunkreact_map_gl_website||[]).push([[2005],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=c(r),f=a,d=p["".concat(u,".").concat(f)]||p[f]||m[f]||l;return r?n.createElement(d,o(o({ref:t},s),{},{components:r})):n.createElement(d,o({ref:t},s))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=f;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[p]="string"==typeof e?e:a,o[1]=i;for(var c=2;c<l;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5162:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(7294),a=r(6010);const l={tabItem:"tabItem_Ymn6"};function o(e){var t=e.children,r=e.hidden,o=e.className;return n.createElement("div",{role:"tabpanel",className:(0,a.Z)(l.tabItem,o),hidden:r},t)}},4866:(e,t,r)=>{r.d(t,{Z:()=>w});var n=r(7462),a=r(7294),l=r(6010),o=r(2466),i=r(6550),u=r(1980),c=r(7392),s=r(12);function p(e){return function(e){var t,r;return null!=(t=null==(r=a.Children.map(e,(function(e){if(!e||(0,a.isValidElement)(e)&&(t=e.props)&&"object"==typeof t&&"value"in t)return e;var t;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:r.filter(Boolean))?t:[]}(e).map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes,default:t.default}}))}function m(e){var t=e.values,r=e.children;return(0,a.useMemo)((function(){var e=null!=t?t:p(r);return function(e){var t=(0,c.l)(e,(function(e,t){return e.value===t.value}));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,r])}function f(e){var t=e.value;return e.tabValues.some((function(e){return e.value===t}))}function d(e){var t=e.queryString,r=void 0!==t&&t,n=e.groupId,l=(0,i.k6)(),o=function(e){var t=e.queryString,r=void 0!==t&&t,n=e.groupId;if("string"==typeof r)return r;if(!1===r)return null;if(!0===r&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:r,groupId:n});return[(0,u._X)(o),(0,a.useCallback)((function(e){if(o){var t=new URLSearchParams(l.location.search);t.set(o,e),l.replace(Object.assign({},l.location,{search:t.toString()}))}}),[o,l])]}function b(e){var t,r,n,l,o=e.defaultValue,i=e.queryString,u=void 0!==i&&i,c=e.groupId,p=m(e),b=(0,a.useState)((function(){return function(e){var t,r=e.defaultValue,n=e.tabValues;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!f({value:r,tabValues:n}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+r+'" but none of its children has the corresponding value. Available values are: '+n.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return r}var a=null!=(t=n.find((function(e){return e.default})))?t:n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:o,tabValues:p})})),v=b[0],h=b[1],g=d({queryString:u,groupId:c}),y=g[0],k=g[1],w=(t=function(e){return e?"docusaurus.tab."+e:null}({groupId:c}.groupId),r=(0,s.Nk)(t),n=r[0],l=r[1],[n,(0,a.useCallback)((function(e){t&&l.set(e)}),[t,l])]),O=w[0],C=w[1],x=function(){var e=null!=y?y:O;return f({value:e,tabValues:p})?e:null}();return(0,a.useLayoutEffect)((function(){x&&h(x)}),[x]),{selectedValue:v,selectValue:(0,a.useCallback)((function(e){if(!f({value:e,tabValues:p}))throw new Error("Can't select invalid tab value="+e);h(e),k(e),C(e)}),[k,C,p]),tabValues:p}}var v=r(2389);const h={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function g(e){var t=e.className,r=e.block,i=e.selectedValue,u=e.selectValue,c=e.tabValues,s=[],p=(0,o.o5)().blockElementScrollPositionUntilNextRender,m=function(e){var t=e.currentTarget,r=s.indexOf(t),n=c[r].value;n!==i&&(p(t),u(n))},f=function(e){var t,r=null;switch(e.key){case"Enter":m(e);break;case"ArrowRight":var n,a=s.indexOf(e.currentTarget)+1;r=null!=(n=s[a])?n:s[0];break;case"ArrowLeft":var l,o=s.indexOf(e.currentTarget)-1;r=null!=(l=s[o])?l:s[s.length-1]}null==(t=r)||t.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":r},t)},c.map((function(e){var t=e.value,r=e.label,o=e.attributes;return a.createElement("li",(0,n.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:function(e){return s.push(e)},onKeyDown:f,onClick:m},o,{className:(0,l.Z)("tabs__item",h.tabItem,null==o?void 0:o.className,{"tabs__item--active":i===t})}),null!=r?r:t)})))}function y(e){var t=e.lazy,r=e.children,n=e.selectedValue,l=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){var o=l.find((function(e){return e.props.value===n}));return o?(0,a.cloneElement)(o,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},l.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==n})})))}function k(e){var t=b(e);return a.createElement("div",{className:(0,l.Z)("tabs-container",h.tabList)},a.createElement(g,(0,n.Z)({},e,t)),a.createElement(y,(0,n.Z)({},e,t)))}function w(e){var t=(0,v.Z)();return a.createElement(k,(0,n.Z)({key:String(t)},e))}},2785:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>s,default:()=>v,frontMatter:()=>c,metadata:()=>p,toc:()=>f});var n=r(7462),a=r(3366),l=(r(7294),r(3905)),o=r(4866),i=r(5162),u=["components"],c={},s="FullscreenControl",p={unversionedId:"api-reference/fullscreen-control",id:"api-reference/fullscreen-control",title:"FullscreenControl",description:"React component that wraps the base library's FullscreenControl class (Mapbox | Maplibre).",source:"@site/../docs/api-reference/fullscreen-control.md",sourceDirName:"api-reference",slug:"/api-reference/fullscreen-control",permalink:"/react-map-gl/docs/api-reference/fullscreen-control",draft:!1,editUrl:"https://github.com/visgl/deck.gl/tree/master/website/../docs/api-reference/fullscreen-control.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"AttributionControl",permalink:"/react-map-gl/docs/api-reference/attribution-control"},next:{title:"GeolocateControl",permalink:"/react-map-gl/docs/api-reference/geolocate-control"}},m={},f=[{value:"Properties",id:"properties",level:2},{value:"Reactive Properties",id:"reactive-properties",level:3},{value:"<code>style</code>: CSSProperties",id:"style",level:4},{value:"Other Properties",id:"other-properties",level:3},{value:"<code>containerId</code>: string",id:"containerid",level:4},{value:"<code>position</code>: &#39;top-right&#39; | &#39;top-left&#39; | &#39;bottom-right&#39; | &#39;bottom-left&#39;",id:"position",level:4},{value:"Source",id:"source",level:2}],d={toc:f},b="wrapper";function v(e){var t=e.components,r=(0,a.Z)(e,u);return(0,l.kt)(b,(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"fullscreencontrol"},"FullscreenControl"),(0,l.kt)("p",null,"React component that wraps the base library's ",(0,l.kt)("inlineCode",{parentName:"p"},"FullscreenControl")," class (",(0,l.kt)("a",{parentName:"p",href:"https://docs.mapbox.com/mapbox-gl-js/api/markers/#fullscreencontrol"},"Mapbox")," | ",(0,l.kt)("a",{parentName:"p",href:"https://maplibre.org/maplibre-gl-js-docs/api/markers/#fullscreencontrol"},"Maplibre"),")."),(0,l.kt)(o.Z,{groupId:"map-library",mdxType:"Tabs"},(0,l.kt)(i.Z,{value:"mapbox",label:"Mapbox",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-tsx"},"import * as React from 'react';\nimport Map, {FullscreenControl} from 'react-map-gl';\n\nfunction App() {\n  return <Map\n    mapboxAccessToken=\"<Mapbox access token>\"\n    initialViewState={{\n      longitude: -100,\n      latitude: 40,\n      zoom: 3.5\n    }}\n    mapStyle=\"mapbox://styles/mapbox/streets-v9\"\n  >\n    <FullscreenControl />\n  </Map>;\n}\n"))),(0,l.kt)(i.Z,{value:"maplibre",label:"Maplibre",mdxType:"TabItem"},(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-tsx"},"import * as React from 'react';\nimport Map, {FullscreenControl} from 'react-map-gl/maplibre';\n\nfunction App() {\n  return <Map\n    initialViewState={{\n      longitude: -100,\n      latitude: 40,\n      zoom: 3.5\n    }}\n    mapStyle=\"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key\"\n  >\n    <FullscreenControl />\n  </Map>;\n}\n")))),(0,l.kt)("h2",{id:"properties"},"Properties"),(0,l.kt)("h3",{id:"reactive-properties"},"Reactive Properties"),(0,l.kt)("h4",{id:"style"},(0,l.kt)("inlineCode",{parentName:"h4"},"style"),": CSSProperties"),(0,l.kt)("p",null,"CSS style override that applies to the control's container."),(0,l.kt)("h3",{id:"other-properties"},"Other Properties"),(0,l.kt)("p",null,"The properties in this section are not reactive. They are only used when the component first mounts."),(0,l.kt)("h4",{id:"containerid"},(0,l.kt)("inlineCode",{parentName:"h4"},"containerId"),": string"),(0,l.kt)("p",null,"Id of the DOM element which should be made full screen. By default, the map container element will be made full screen."),(0,l.kt)("h4",{id:"position"},(0,l.kt)("inlineCode",{parentName:"h4"},"position"),": 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'"),(0,l.kt)("p",null,"Default: ",(0,l.kt)("inlineCode",{parentName:"p"},"'top-right'")),(0,l.kt)("p",null,"Placement of the control relative to the map."),(0,l.kt)("h2",{id:"source"},"Source"),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"https://github.com/visgl/react-map-gl/tree/7.1-release/src/components/fullscreen-control.ts"},"fullscreen-control.ts")))}v.isMDXComponent=!0}}]);