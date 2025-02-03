"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[8550],{3083:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>m,frontMatter:()=>o,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"get-started/get-started","title":"Get Started","description":"You may find complete project setups in get-started examples.","source":"@site/../docs/get-started/get-started.md","sourceDirName":"get-started","slug":"/get-started/","permalink":"/react-map-gl/docs/get-started/","draft":false,"unlisted":false,"editUrl":"https://github.com/visgl/react-map-gl/tree/master/docs/../docs/get-started/get-started.md","tags":[],"version":"current","frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Contributing","permalink":"/react-map-gl/docs/contributing"},"next":{"title":"About Mapbox Tokens","permalink":"/react-map-gl/docs/get-started/mapbox-tokens"}}');var r=a(4848),l=a(8453),s=a(1470),i=a(9365);const o={},c="Get Started",u={},d=[{value:"Installation",id:"installation",level:2},{value:"Example",id:"example",level:2},{value:"Styling",id:"styling",level:2}];function p(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"get-started",children:"Get Started"})}),"\n",(0,r.jsxs)(t.p,{children:["You may find complete project setups in ",(0,r.jsx)(t.a,{href:"https://github.com/visgl/react-map-gl/tree/8.0-release/examples/get-started",children:"get-started examples"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsxs)(t.p,{children:["Using ",(0,r.jsx)(t.code,{children:"react-map-gl"})," requires ",(0,r.jsx)(t.code,{children:"node >= 12"})," and ",(0,r.jsx)(t.code,{children:"react >= 16.3"}),"."]}),"\n","\n",(0,r.jsxs)(s.A,{groupId:"map-library",children:[(0,r.jsx)(i.A,{value:"mapbox",label:"Mapbox",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"npm install react-map-gl mapbox-gl @types/mapbox-gl\n"})})}),(0,r.jsx)(i.A,{value:"maplibre",label:"Maplibre",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"npm install react-map-gl maplibre-gl\n"})})})]}),"\n",(0,r.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,r.jsxs)(s.A,{groupId:"map-library",children:[(0,r.jsxs)(i.A,{value:"mapbox",label:"Mapbox",children:[(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",metastring:'title="app.tsx"',children:"import * as React from 'react';\nimport Map from 'react-map-gl/mapbox';\n// If using with mapbox-gl v1:\n// import Map from 'react-map-gl/mapbox-legacy';\nimport 'mapbox-gl/dist/mapbox-gl.css';\n\nfunction App() {\n  return (\n    <Map\n      mapboxAccessToken=\"<Mapbox access token>\"\n      initialViewState={{\n        longitude: -122.4,\n        latitude: 37.8,\n        zoom: 14\n      }}\n      style={{width: 600, height: 400}}\n      mapStyle=\"mapbox://styles/mapbox/streets-v9\"\n    />\n  );\n}\n"})}),(0,r.jsxs)(t.p,{children:["See ",(0,r.jsx)(t.a,{href:"/react-map-gl/docs/get-started/mapbox-tokens",children:"about Mapbox tokens"})," for alternatives to providing a Mapbox token."]})]}),(0,r.jsx)(i.A,{value:"maplibre",label:"Maplibre",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-tsx",metastring:'title="app.tsx"',children:"import * as React from 'react';\nimport Map from 'react-map-gl/maplibre';\nimport 'maplibre-gl/dist/maplibre-gl.css';\n\nfunction App() {\n  return (\n    <Map\n      initialViewState={{\n        longitude: -122.4,\n        latitude: 37.8,\n        zoom: 14\n      }}\n      style={{width: 600, height: 400}}\n      mapStyle=\"https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key\"\n    />\n  );\n}\n"})})})]}),"\n",(0,r.jsx)(t.h2,{id:"styling",children:"Styling"}),"\n",(0,r.jsx)(t.p,{children:"The base map library requires its stylesheet be included at all times. The marker, popup and navigation components in react-map-gl also need the stylesheet to work properly."}),"\n",(0,r.jsx)(t.p,{children:"The above example code imports the CSS file directly into the app. Most bundlers support this syntax out-of-the-box or with an official plugin."}),"\n",(0,r.jsx)(t.p,{children:"Alternatively, you may add the stylesheet to the head of your page:"}),"\n",(0,r.jsxs)(s.A,{groupId:"map-library",children:[(0,r.jsxs)(i.A,{value:"mapbox",label:"Mapbox",children:[(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-html",metastring:'title="index.html"',children:"<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v<YOUR_MAPBOX_VERSION>/mapbox-gl.css' rel='stylesheet' />\n"})}),(0,r.jsxs)(t.p,{children:["Find out your mapbox version by running ",(0,r.jsx)(t.code,{children:"yarn list mapbox-gl"})," or ",(0,r.jsx)(t.code,{children:"npm ls mapbox-gl"}),"."]})]}),(0,r.jsxs)(i.A,{value:"maplibre",label:"Maplibre",children:[(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-html",metastring:'title="index.html"',children:"<link href='https://unpkg.com/maplibre-gl@<YOUR_MAPLIBRE_VERSION>/dist/maplibre-gl.css' rel='stylesheet' />\n"})}),(0,r.jsxs)(t.p,{children:["Find out your maplibre version by running ",(0,r.jsx)(t.code,{children:"yarn list maplibre-gl"})," or ",(0,r.jsx)(t.code,{children:"npm ls maplibre-gl"}),"."]})]})]})]})}function m(e={}){const{wrapper:t}={...(0,l.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},9365:(e,t,a)=>{a.d(t,{A:()=>s});a(6540);var n=a(4164);const r={tabItem:"tabItem_Ymn6"};var l=a(4848);function s(e){let{children:t,hidden:a,className:s}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,n.A)(r.tabItem,s),hidden:a,children:t})}},1470:(e,t,a)=>{a.d(t,{A:()=>k});var n=a(6540),r=a(4164),l=a(3104),s=a(6347),i=a(205),o=a(7485),c=a(1682),u=a(679);function d(e){var t,a;return null!=(t=null==(a=n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:a.filter(Boolean))?t:[]}function p(e){const{values:t,children:a}=e;return(0,n.useMemo)((()=>{const e=null!=t?t:function(e){return d(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}(a);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,a])}function m(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:a}=e;const r=(0,s.W6)(),l=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=a?a:null}({queryString:t,groupId:a});return[(0,o.aZ)(l),(0,n.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(r.location.search);t.set(l,e),r.replace(Object.assign({},r.location,{search:t.toString()}))}),[l,r])]}function b(e){const{defaultValue:t,queryString:a=!1,groupId:r}=e,l=p(e),[s,o]=(0,n.useState)((()=>function(e){var t;let{defaultValue:a,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(a){if(!m({value:a,tabValues:n}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+a+'" but none of its children has the corresponding value. Available values are: '+n.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return a}const r=null!=(t=n.find((e=>e.default)))?t:n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:l}))),[c,d]=h({queryString:a,groupId:r}),[b,g]=function(e){let{groupId:t}=e;const a=function(e){return e?"docusaurus.tab."+e:null}(t),[r,l]=(0,u.Dv)(a);return[r,(0,n.useCallback)((e=>{a&&l.set(e)}),[a,l])]}({groupId:r}),x=(()=>{const e=null!=c?c:b;return m({value:e,tabValues:l})?e:null})();(0,i.A)((()=>{x&&o(x)}),[x]);return{selectedValue:s,selectValue:(0,n.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error("Can't select invalid tab value="+e);o(e),d(e),g(e)}),[d,g,l]),tabValues:l}}var g=a(2303);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=a(4848);function v(e){let{className:t,block:a,selectedValue:n,selectValue:s,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,l.a_)(),u=e=>{const t=e.currentTarget,a=o.indexOf(t),r=i[a].value;r!==n&&(c(t),s(r))},d=e=>{var t;let a=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{var n;const t=o.indexOf(e.currentTarget)+1;a=null!=(n=o[t])?n:o[0];break}case"ArrowLeft":{var r;const t=o.indexOf(e.currentTarget)-1;a=null!=(r=o[t])?r:o[o.length-1];break}}null==(t=a)||t.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":a},t),children:i.map((e=>{let{value:t,label:a,attributes:l}=e;return(0,f.jsx)("li",Object.assign({role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>{o.push(e)},onKeyDown:d,onClick:u},l,{className:(0,r.A)("tabs__item",x.tabItem,null==l?void 0:l.className,{"tabs__item--active":n===t}),children:null!=a?a:t}),t)}))})}function j(e){let{lazy:t,children:a,selectedValue:l}=e;const s=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===l));return e?(0,n.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==l})))})}function y(e){const t=b(e);return(0,f.jsxs)("div",{className:(0,r.A)("tabs-container",x.tabList),children:[(0,f.jsx)(v,Object.assign({},t,e)),(0,f.jsx)(j,Object.assign({},t,e))]})}function k(e){const t=(0,g.A)();return(0,f.jsx)(y,Object.assign({},e,{children:d(e.children)}),String(t))}},8453:(e,t,a)=>{a.d(t,{R:()=>s,x:()=>i});var n=a(6540);const r={},l=n.createContext(r);function s(e){const t=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),n.createElement(l.Provider,{value:t},e.children)}}}]);