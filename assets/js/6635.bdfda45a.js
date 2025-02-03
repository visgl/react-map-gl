/*! For license information please see 6635.bdfda45a.js.LICENSE.txt */
"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[6635],{6583:(e,t,i)=>{function n(e,t,i,n){return new(i||(i=Promise))((function(s,r){function o(e){try{a(n.next(e))}catch(t){r(t)}}function l(e){try{a(n.throw(e))}catch(t){r(t)}}function a(e){e.done?s(e.value):new i((function(t){t(e.value)})).then(o,l)}a((n=n.apply(e,t||[])).next())}))}i.d(t,{A:()=>F});var s,r,o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function l(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function a(){if(r)return s;r=1,s=function(){for(var t={},i=0;i<arguments.length;i++){var n=arguments[i];for(var s in n)e.call(n,s)&&(t[s]=n[s])}return t};var e=Object.prototype.hasOwnProperty;return s}var h,u,c,p,d,f,g,m={exports:{}};function y(){return h||(h=1,e=m,function(){var t={};e.exports=t,t.simpleFilter=function(e,i){return i.filter((function(i){return t.test(e,i)}))},t.test=function(e,i){return null!==t.match(e,i)},t.match=function(e,t,i){i=i||{};var n,s=0,r=[],o=t.length,l=0,a=0,h=i.pre||"",u=i.post||"",c=i.caseSensitive&&t||t.toLowerCase();e=i.caseSensitive&&e||e.toLowerCase();for(var p=0;p<o;p++)n=t[p],c[p]===e[s]?(n=h+n+u,s+=1,a+=1+a):a=0,l+=a,r[r.length]=n;return s===e.length?(l=c===e?1/0:l,{rendered:r.join(""),score:l}):null},t.filter=function(e,i,n){return i&&0!==i.length?"string"!=typeof e?i:(n=n||{},i.reduce((function(i,s,r,o){var l=s;n.extract&&(l=n.extract(s));var a=t.match(e,l,n);return null!=a&&(i[i.length]={string:a.rendered,score:a.score,index:r,original:s}),i}),[]).sort((function(e,t){var i=t.score-e.score;return i||e.index-t.index}))):[]}}()),m.exports;var e}function v(){if(d)return p;d=1;var e=a(),t=y(),i=function(){if(c)return u;c=1;var e=function(e){return this.component=e,this.items=[],this.active=e.options.noInitialSelection?-1:0,this.wrapper=document.createElement("div"),this.wrapper.className="suggestions-wrapper",this.element=document.createElement("ul"),this.element.className="suggestions",this.wrapper.appendChild(this.element),this.selectingListItem=!1,e.el.parentNode.insertBefore(this.wrapper,e.el.nextSibling),this};return e.prototype.show=function(){this.element.style.display="block"},e.prototype.hide=function(){this.element.style.display="none"},e.prototype.add=function(e){this.items.push(e)},e.prototype.clear=function(){this.items=[],this.active=this.component.options.noInitialSelection?-1:0},e.prototype.isEmpty=function(){return!this.items.length},e.prototype.isVisible=function(){return"block"===this.element.style.display},e.prototype.draw=function(){if(this.element.innerHTML="",0!==this.items.length){for(var e=0;e<this.items.length;e++)this.drawItem(this.items[e],this.active===e);this.show()}else this.hide()},e.prototype.drawItem=function(e,t){var i=document.createElement("li"),n=document.createElement("a");t&&(i.className+=" active"),n.innerHTML=e.string,i.appendChild(n),this.element.appendChild(i),i.addEventListener("mousedown",function(){this.selectingListItem=!0}.bind(this)),i.addEventListener("mouseup",function(){this.handleMouseUp.call(this,e)}.bind(this))},e.prototype.handleMouseUp=function(e){this.selectingListItem=!1,this.component.value(e.original),this.clear(),this.draw()},e.prototype.move=function(e){this.active=e,this.draw()},e.prototype.previous=function(){this.move(this.active<=0?this.items.length-1:this.active-1)},e.prototype.next=function(){this.move(this.active>=this.items.length-1?0:this.active+1)},e.prototype.drawError=function(e){var t=document.createElement("li");t.innerHTML=e,this.element.appendChild(t),this.show()},u=e}(),n=function(t,n,s){return s=s||{},this.options=e({minLength:2,limit:5,filter:!0,hideOnBlur:!0,noInitialSelection:!0},s),this.el=t,this.data=n||[],this.list=new i(this),this.query="",this.selected=null,this.list.draw(),this.el.addEventListener("keyup",function(e){this.handleKeyUp(e.keyCode,e)}.bind(this),!1),this.el.addEventListener("keydown",function(e){this.handleKeyDown(e)}.bind(this)),this.el.addEventListener("focus",function(){this.handleFocus()}.bind(this)),this.el.addEventListener("blur",function(){this.handleBlur()}.bind(this)),this.el.addEventListener("paste",function(e){this.handlePaste(e)}.bind(this)),this.render=this.options.render?this.options.render.bind(this):this.render.bind(this),this.getItemValue=this.options.getItemValue?this.options.getItemValue.bind(this):this.getItemValue.bind(this),this};return n.prototype.handleKeyUp=function(e,t){40!==e&&38!==e&&27!==e&&9!==e&&(13!==e?this.handleInputChange(this.el.value):this.list.items[this.list.active]&&(this.list.handleMouseUp(this.list.items[this.list.active]),t.stopPropagation()))},n.prototype.handleKeyDown=function(e){switch(e.keyCode){case 13:this.list.active>=0&&(this.list.selectingListItem=!0);break;case 9:this.list.isEmpty()||(this.list.isVisible()&&e.preventDefault(),this.value(this.list.active>=0?this.list.items[this.list.active].original:null),this.list.hide());break;case 27:this.list.isEmpty()||this.list.hide();break;case 38:this.list.previous();break;case 40:this.list.next()}},n.prototype.handleBlur=function(){!this.list.selectingListItem&&this.options.hideOnBlur&&this.list.hide()},n.prototype.handlePaste=function(e){if(e.clipboardData)this.handleInputChange(e.clipboardData.getData("Text"));else{var t=this;setTimeout((function(){t.handleInputChange(e.target.value)}),100)}},n.prototype.handleInputChange=function(e){this.query=this.normalize(e),this.list.clear(),this.query.length<this.options.minLength?this.list.draw():this.getCandidates(function(e){for(var t=0;t<e.length&&(this.list.add(e[t]),t!==this.options.limit-1);t++);this.list.draw()}.bind(this))},n.prototype.handleFocus=function(){this.list.isEmpty()||this.list.show(),this.list.selectingListItem=!1},n.prototype.update=function(e){this.data=e,this.handleKeyUp()},n.prototype.clear=function(){this.data=[],this.list.clear()},n.prototype.normalize=function(e){return e=e.toLowerCase()},n.prototype.match=function(e,t){return e.indexOf(t)>-1},n.prototype.value=function(e){if(this.selected=e,this.el.value=this.getItemValue(e||{place_name:this.query}),document.createEvent){var t=document.createEvent("HTMLEvents");t.initEvent("change",!0,!1),this.el.dispatchEvent(t)}else this.el.fireEvent("onchange")},n.prototype.getCandidates=function(e){var i={pre:"<strong>",post:"</strong>",extract:function(e){return this.getItemValue(e)}.bind(this)};e(this.options.filter?t.filter(this.query,this.data,i).map(function(e){return{original:e.original,string:this.render(e.original,e.string)}}.bind(this)):this.data.map(function(e){return{original:e,string:this.render(e)}}.bind(this)))},n.prototype.getItemValue=function(e){return e},n.prototype.render=function(e,t){if(t)return t;for(var i=e.original?this.getItemValue(e.original):this.getItemValue(e),n=this.normalize(i),s=n.lastIndexOf(this.query);s>-1;){var r=s+this.query.length;i=i.slice(0,s)+"<strong>"+i.slice(s,r)+"</strong>"+i.slice(r),s=n.slice(0,s).lastIndexOf(this.query)}return i},n.prototype.renderError=function(e){this.list.drawError(e)},p=n}var _,b=l(function(){if(g)return f;g=1;var e=v();return f=e,"undefined"!=typeof window&&(window.Suggestions=e),f}()),w={exports:{}};var E,L,x,C,k,M=l((_||(_=1,L=w.exports,x=function(){var e=/^([a-zA-Z]{2,3})(?:[_-]+([a-zA-Z]{3})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{4})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{2}|[0-9]{3})(?=$|[_-]+))?/;function t(t){return t.match(e)||[]}function i(e){return{language:(e=t(e))[1]||"",extlang:e[2]||"",script:e[3]||"",region:e[4]||""}}function n(e,t,i){Object.defineProperty(e,t,{value:i,enumerable:!0})}function s(e,s,r){function o(i){return t(i)[e]||""}n(o,"pattern",s),n(i,r,o)}return s(1,/^[a-zA-Z]{2,3}$/,"language"),s(2,/^[a-zA-Z]{3}$/,"extlang"),s(3,/^[a-zA-Z]{4}$/,"script"),s(4,/^[a-zA-Z]{2}$|^[0-9]{3}$/,"region"),n(i,"split",(function(e){return t(e).filter((function(e,t){return e&&t}))})),i},(E=w).exports?E.exports=x():L.subtag=x()),w.exports));var R,T=function(){if(k)return C;k=1;var e=/^\s+|\s+$/g,t=/^[-+]0x[0-9a-f]+$/i,i=/^0b[01]+$/i,n=/^0o[0-7]+$/i,s=parseInt,r="object"==typeof o&&o&&o.Object===Object&&o,l="object"==typeof self&&self&&self.Object===Object&&self,a=r||l||Function("return this")(),h=Object.prototype.toString,u=Math.max,c=Math.min,p=function(){return a.Date.now()};function d(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function f(r){if("number"==typeof r)return r;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==h.call(e)}(r))return NaN;if(d(r)){var o="function"==typeof r.valueOf?r.valueOf():r;r=d(o)?o+"":o}if("string"!=typeof r)return 0===r?r:+r;r=r.replace(e,"");var l=i.test(r);return l||n.test(r)?s(r.slice(2),l?2:8):t.test(r)?NaN:+r}return C=function(e,t,i){var n,s,r,o,l,a,h=0,g=!1,m=!1,y=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function v(t){var i=n,r=s;return n=s=void 0,h=t,o=e.apply(r,i)}function _(e){var i=e-a;return void 0===a||i>=t||i<0||m&&e-h>=r}function b(){var e=p();if(_(e))return w(e);l=setTimeout(b,function(e){var i=t-(e-a);return m?c(i,r-(e-h)):i}(e))}function w(e){return l=void 0,y&&n?v(e):(n=s=void 0,o)}function E(){var e=p(),i=_(e);if(n=arguments,s=this,a=e,i){if(void 0===l)return function(e){return h=e,l=setTimeout(b,t),g?v(e):o}(a);if(m)return l=setTimeout(b,t),v(a)}return void 0===l&&(l=setTimeout(b,t)),o}return t=f(t)||0,d(i)&&(g=!!i.leading,r=(m="maxWait"in i)?u(f(i.maxWait)||0,t):r,y="trailing"in i?!!i.trailing:y),E.cancel=function(){void 0!==l&&clearTimeout(l),h=0,n=a=s=l=void 0},E.flush=function(){return void 0===l?o:w(p())},E}}(),O=l(T),P=l(a()),I={exports:{}};var A=function(){if(R)return I.exports;R=1;var e,t="object"==typeof Reflect?Reflect:null,i=t&&"function"==typeof t.apply?t.apply:function(e,t,i){return Function.prototype.apply.call(e,t,i)};e=t&&"function"==typeof t.ownKeys?t.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var n=Number.isNaN||function(e){return e!=e};function s(){s.init.call(this)}I.exports=s,I.exports.once=function(e,t){return new Promise((function(i,n){function s(i){e.removeListener(t,r),n(i)}function r(){"function"==typeof e.removeListener&&e.removeListener("error",s),i([].slice.call(arguments))}f(e,t,r,{once:!0}),"error"!==t&&function(e,t,i){"function"==typeof e.on&&f(e,"error",t,i)}(e,s,{once:!0})}))},s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var r=10;function o(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function l(e){return void 0===e._maxListeners?s.defaultMaxListeners:e._maxListeners}function a(e,t,i,n){var s,r,a,h;if(o(i),void 0===(r=e._events)?(r=e._events=Object.create(null),e._eventsCount=0):(void 0!==r.newListener&&(e.emit("newListener",t,i.listener?i.listener:i),r=e._events),a=r[t]),void 0===a)a=r[t]=i,++e._eventsCount;else if("function"==typeof a?a=r[t]=n?[i,a]:[a,i]:n?a.unshift(i):a.push(i),(s=l(e))>0&&a.length>s&&!a.warned){a.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=a.length,h=u,console&&console.warn&&console.warn(h)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function u(e,t,i){var n={fired:!1,wrapFn:void 0,target:e,type:t,listener:i},s=h.bind(n);return s.listener=i,n.wrapFn=s,s}function c(e,t,i){var n=e._events;if(void 0===n)return[];var s=n[t];return void 0===s?[]:"function"==typeof s?i?[s.listener||s]:[s]:i?function(e){for(var t=new Array(e.length),i=0;i<t.length;++i)t[i]=e[i].listener||e[i];return t}(s):d(s,s.length)}function p(e){var t=this._events;if(void 0!==t){var i=t[e];if("function"==typeof i)return 1;if(void 0!==i)return i.length}return 0}function d(e,t){for(var i=new Array(t),n=0;n<t;++n)i[n]=e[n];return i}function f(e,t,i,n){if("function"==typeof e.on)n.once?e.once(t,i):e.on(t,i);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function s(r){n.once&&e.removeEventListener(t,s),i(r)}))}}return Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return r},set:function(e){if("number"!=typeof e||e<0||n(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");r=e}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||n(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},s.prototype.getMaxListeners=function(){return l(this)},s.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var s="error"===e,r=this._events;if(void 0!==r)s=s&&void 0===r.error;else if(!s)return!1;if(s){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var l=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw l.context=o,l}var a=r[e];if(void 0===a)return!1;if("function"==typeof a)i(a,this,t);else{var h=a.length,u=d(a,h);for(n=0;n<h;++n)i(u[n],this,t)}return!0},s.prototype.addListener=function(e,t){return a(this,e,t,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(e,t){return a(this,e,t,!0)},s.prototype.once=function(e,t){return o(t),this.on(e,u(this,e,t)),this},s.prototype.prependOnceListener=function(e,t){return o(t),this.prependListener(e,u(this,e,t)),this},s.prototype.removeListener=function(e,t){var i,n,s,r,l;if(o(t),void 0===(n=this._events))return this;if(void 0===(i=n[e]))return this;if(i===t||i.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete n[e],n.removeListener&&this.emit("removeListener",e,i.listener||t));else if("function"!=typeof i){for(s=-1,r=i.length-1;r>=0;r--)if(i[r]===t||i[r].listener===t){l=i[r].listener,s=r;break}if(s<0)return this;0===s?i.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(i,s),1===i.length&&(n[e]=i[0]),void 0!==n.removeListener&&this.emit("removeListener",e,l||t)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(e){var t,i,n;if(void 0===(i=this._events))return this;if(void 0===i.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==i[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete i[e]),this;if(0===arguments.length){var s,r=Object.keys(i);for(n=0;n<r.length;++n)"removeListener"!==(s=r[n])&&this.removeAllListeners(s);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=i[e]))this.removeListener(e,t);else if(void 0!==t)for(n=t.length-1;n>=0;n--)this.removeListener(e,t[n]);return this},s.prototype.listeners=function(e){return c(this,e,!0)},s.prototype.rawListeners=function(e){return c(this,e,!1)},s.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):p.call(e,t)},s.prototype.listenerCount=p,s.prototype.eventNames=function(){return this._eventsCount>0?e(this._events):[]},I.exports}();const B={fr:{name:"France",bbox:[[-4.59235,41.380007],[9.560016,51.148506]]},us:{name:"United States",bbox:[[-171.791111,18.91619],[-66.96466,71.357764]]},ru:{name:"Russia",bbox:[[19.66064,41.151416],[190.10042,81.2504]]},ca:{name:"Canada",bbox:[[-140.99778,41.675105],[-52.648099,83.23324]]}},j={de:"Suche",it:"Ricerca",en:"Search",nl:"Zoeken",fr:"Chercher",ca:"Cerca",he:"\u05dc\u05d7\u05e4\u05e9",ja:"\u30b5\u30fc\u30c1",lv:"Mekl\u0113t",pt:"Procurar",sr:"\u041f\u0440\u0435\u0442\u0440\u0430\u0433\u0430",zh:"\u641c\u7d22",cs:"Vyhled\xe1v\xe1n\xed",hu:"Keres\xe9s",ka:"\u10eb\u10d8\u10d4\u10d1\u10d0",nb:"S\xf8ke",sk:"Vyh\u013ead\xe1vanie",th:"\u0e04\u0e49\u0e19\u0e2b\u0e32",fi:"Hae",is:"Leita",ko:"\uc218\uc0c9",pl:"Szukaj",sl:"Iskanje",fa:"\u062c\u0633\u062a\u062c\u0648",ru:"\u041f\u043e\u0438\u0441\u043a"},S=/(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)[ ]*$/;class F{constructor(e,t){this.options={zoom:16,flyTo:!0,trackProximity:!0,showResultsWhileTyping:!1,minLength:2,reverseGeocode:!1,limit:5,enableEventLogging:!0,marker:!0,popup:!1,maplibregl:void 0,collapsed:!1,clearAndBlurOnEsc:!1,clearOnBlur:!1,proximityMinZoom:9,getItemValue:e=>void 0!==e.text?e.text:e.place_name,render:function(e){if(!e.geometry){const t=e.text,i=t.toLowerCase().indexOf(this.query.toLowerCase()),n=this.query.length;return'<div class="maplibregl-ctrl-geocoder--suggestion"><svg class="maplibregl-ctrl-geocoder--suggestion-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22.8702 20.1258H21.4248L20.9125 19.6318C22.7055 17.546 23.785 14.8382 23.785 11.8925C23.785 5.32419 18.4608 0 11.8925 0C5.32419 0 0 5.32419 0 11.8925C0 18.4608 5.32419 23.785 11.8925 23.785C14.8382 23.785 17.546 22.7055 19.6318 20.9125L20.1258 21.4248V22.8702L29.2739 32L32 29.2739L22.8702 20.1258ZM11.8925 20.1258C7.33676 20.1258 3.65923 16.4483 3.65923 11.8925C3.65923 7.33676 7.33676 3.65923 11.8925 3.65923C16.4483 3.65923 20.1258 7.33676 20.1258 11.8925C20.1258 16.4483 16.4483 20.1258 11.8925 20.1258Z" fill="#687078"/></svg><div class="maplibregl-ctrl-geocoder--suggestion-info"><div class="maplibregl-ctrl-geocoder--suggestion-title">'+t.substring(0,i)+'<span class="maplibregl-ctrl-geocoder--suggestion-match">'+t.substring(i,i+n)+"</span>"+t.substring(i+n)+"</div></div></div>"}const t=e.place_name.split(",");return'<div class="maplibregl-ctrl-geocoder--result"><svg class="maplibregl-ctrl-geocoder--result-icon" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.36571 0 0 5.38676 0 12.0471C0 21.0824 12 32 12 32C12 32 24 21.0824 24 12.0471C24 5.38676 18.6343 0 12 0ZM12 16.3496C9.63428 16.3496 7.71429 14.4221 7.71429 12.0471C7.71429 9.67207 9.63428 7.74454 12 7.74454C14.3657 7.74454 16.2857 9.67207 16.2857 12.0471C16.2857 14.4221 14.3657 16.3496 12 16.3496Z" fill="#687078"/></svg><div><div class="maplibregl-ctrl-geocoder--result-title">'+t[0]+'</div><div class="maplibregl-ctrl-geocoder--result-address">'+t.splice(1,t.length).join(",")+"</div></div></div>"},popupRender:e=>{const t=e.place_name.split(",");return'<div class="maplibregl-ctrl-geocoder--suggestion popup-suggestion"><div class="maplibregl-ctrl-geocoder--suggestion-title popup-suggestion-title">'+t[0]+'</div><div class="maplibregl-ctrl-geocoder--suggestion-address popup-suggestion-address">'+t.splice(1,t.length).join(",")+"</div></div>"},showResultMarkers:!0,debounceSearch:200},this._eventEmitter=new A.EventEmitter,this.options=P({},this.options,t),this.fresh=!0,this.lastSelected=null,this.geocoderApi=e}addTo(e){function t(e,t){if(!document.body.contains(t))throw new Error("Element provided to #addTo() exists, but is not in the DOM");const i=e.onAdd();t.appendChild(i)}if(e instanceof HTMLElement)t(this,e);else if("string"==typeof e){const i=document.querySelectorAll(e);if(0===i.length)throw new Error("Element "+e+"not found.");if(i.length>1)throw new Error("Geocoder can only be added to a single html element");t(this,i[0])}else{if(!("addControl"in e))throw new Error("Error: addTo must be a maplibre-gl-js map, an html element, or a CSS selector query for a single html element");e.addControl(this)}}onAdd(e){if(e&&"string"!=typeof e&&(this._map=e),this.setLanguage(),this.options.localGeocoderOnly&&!this.options.localGeocoder)throw new Error("A localGeocoder function must be specified to use localGeocoderOnly mode");this._onChange=this._onChange.bind(this),this._onKeyDown=this._onKeyDown.bind(this),this._onPaste=this._onPaste.bind(this),this._onBlur=this._onBlur.bind(this),this._showButton=this._showButton.bind(this),this._hideButton=this._hideButton.bind(this),this._onQueryResult=this._onQueryResult.bind(this),this.clear=this.clear.bind(this),this._updateProximity=this._updateProximity.bind(this),this._collapse=this._collapse.bind(this),this._unCollapse=this._unCollapse.bind(this),this._clear=this._clear.bind(this),this._clearOnBlur=this._clearOnBlur.bind(this);const t=this.container=document.createElement("div");t.className="maplibregl-ctrl-geocoder maplibregl-ctrl maplibregl-ctrl-geocoder maplibregl-ctrl";const i=this.createIcon("search",'<path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>');this._inputEl=document.createElement("input"),this._inputEl.type="text",this._inputEl.className="maplibregl-ctrl-geocoder--input",this.setPlaceholder(),this.options.collapsed&&(this._collapse(),this.container.addEventListener("mouseenter",this._unCollapse),this.container.addEventListener("mouseleave",this._collapse),this._inputEl.addEventListener("focus",this._unCollapse)),(this.options.collapsed||this.options.clearOnBlur)&&this._inputEl.addEventListener("blur",this._onBlur),this._inputEl.addEventListener("keydown",O(this._onKeyDown,this.options.debounceSearch)),this._inputEl.addEventListener("paste",this._onPaste),this._inputEl.addEventListener("change",this._onChange),this.container.addEventListener("mouseenter",this._showButton),this.container.addEventListener("mouseleave",this._hideButton);const n=document.createElement("div");n.classList.add("maplibregl-ctrl-geocoder--pin-right"),this._clearEl=document.createElement("button"),this._clearEl.setAttribute("type","button"),this._clearEl.setAttribute("aria-label","Clear"),this._clearEl.addEventListener("click",this.clear),this._clearEl.className="maplibregl-ctrl-geocoder--button";const s=this.createIcon("close",'<path d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"/>');return this._clearEl.appendChild(s),this._loadingEl=this.createIcon("loading",'<path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"/><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"/>'),n.appendChild(this._clearEl),n.appendChild(this._loadingEl),t.appendChild(i),t.appendChild(this._inputEl),t.appendChild(n),this._typeahead=new b(this._inputEl,[],{filter:!1,minLength:this.options.minLength,limit:this.options.limit,noInitialSelection:!0}),this.setRenderFunction(this.options.render),this._typeahead.getItemValue=this.options.getItemValue,this.mapMarker=null,this.resultMarkers=[],this._handleMarker=this._handleMarker.bind(this),this._handleResultMarkers=this._handleResultMarkers.bind(this),this._map&&(this.options.trackProximity&&(this._updateProximity(),this._map.on("moveend",this._updateProximity)),this._maplibregl=this.options.maplibregl,!this._maplibregl&&this.options.marker&&(console.error("No maplibregl detected in options. Map markers are disabled. Please set options.maplibregl."),this.options.marker=!1)),t}createIcon(e,t){const i=document.createElementNS("http://www.w3.org/2000/svg","svg");if(i.setAttribute("class","maplibregl-ctrl-geocoder--icon maplibregl-ctrl-geocoder--icon-"+e),i.setAttribute("viewBox","0 0 18 18"),i.setAttribute("xml:space","preserve"),i.setAttribute("width","18"),i.setAttribute("height","18"),"innerHTML"in i)i.innerHTML=t;else{const e=document.createElement("div");e.innerHTML="<svg>"+t.valueOf().toString()+"</svg>";const n=e.firstChild.firstChild;i.appendChild(n)}return i}onRemove(){return this.container.remove(),this.options.trackProximity&&this._map&&this._map.off("moveend",this._updateProximity),this._removeMarker(),this._map=null,this}_onPaste(e){const t=(e.clipboardData||window.clipboardData).getData("text");t.length>=this.options.minLength&&this.options.showResultsWhileTyping&&this._geocode(t)}_onKeyDown(e){const t=27,i=9;if(e.keyCode===t&&this.options.clearAndBlurOnEsc)return this._clear(e),this._inputEl.blur();const n=e.target&&e.target.shadowRoot?e.target.shadowRoot.activeElement:e.target;if(!(n?n.value:""))return this.fresh=!0,e.keyCode!==i&&this.clear(e),this._clearEl.style.display="none";if(!e.metaKey&&-1===[i,t,37,39,38,40].indexOf(e.keyCode)){if(13===e.keyCode){if(this.options.showResultsWhileTyping)return void(null==this._typeahead.selected&&this.geocoderApi.getSuggestions?this._geocode(n.value,!0):null==this._typeahead.selected&&this.options.showResultMarkers&&this._fitBoundsForMarkers());this._typeahead.selected||this._geocode(n.value)}n.value.length>=this.options.minLength&&this.options.showResultsWhileTyping&&this._geocode(n.value)}}_showButton(){this._inputEl.value.length>0&&(this._clearEl.style.display="block")}_hideButton(){this._typeahead.selected&&(this._clearEl.style.display="none")}_onBlur(e){this.options.clearOnBlur&&this._clearOnBlur(e),this.options.collapsed&&this._collapse()}_onChange(){const e=this._typeahead.selected;if(e&&!e.geometry)e.placeId?this._geocode(e.placeId,!0,!0):this._geocode(e.text,!0);else if(e&&JSON.stringify(e)!==this.lastSelected){if(this._clearEl.style.display="none",this.options.flyTo){let t;if(this._removeResultMarkers(),e.properties&&B[e.properties.short_code])t=P({},this.options.flyTo),this._map&&this._map.fitBounds(B[e.properties.short_code].bbox,t);else if(e.bbox){const i=e.bbox;t=P({},this.options.flyTo),this._map&&this._map.fitBounds([[i[0],i[1]],[i[2],i[3]]],t)}else{const i={zoom:this.options.zoom};t=P({},i,this.options.flyTo),e.center?t.center=e.center:e.geometry&&e.geometry.type&&"Point"===e.geometry.type&&e.geometry.coordinates&&(t.center=e.geometry.coordinates),this._map&&this._map.flyTo(t)}}this.options.marker&&this._maplibregl&&this._handleMarker(e),this._inputEl.focus(),this._inputEl.scrollLeft=0,this._inputEl.setSelectionRange(0,0),this.lastSelected=JSON.stringify(e),this._typeahead.selected=null,this._eventEmitter.emit("result",{result:e})}}_getConfigForRequest(){return["bbox","limit","proximity","countries","types","language","reverseMode"].reduce(((e,t)=>(this.options[t]&&(["countries","types","language"].indexOf(t)>-1?e[t]=this.options[t].split(/[\s,]+/):e[t]=this.options[t],"proximity"===t&&this.options[t]&&"number"==typeof this.options[t].longitude&&"number"==typeof this.options[t].latitude&&(e[t]=[this.options[t].longitude,this.options[t].latitude])),e)),{})}_geocode(e){return n(this,arguments,void 0,(function*(e,t=!1,i=!1){this._loadingEl.style.display="block",this._eventEmitter.emit("loading",{query:e});const n=this._getConfigForRequest(),s=this._createGeocodeRequest(n,e,t,i),r=this.options.localGeocoder&&this.options.localGeocoder(e)||[];try{const i=yield s;yield this._handleGeocodeResponse(i,n,e,t,r)}catch(o){this._handleGeocodeErrorResponse(o,r)}return s}))}_createGeocodeRequest(e,t,i,n){return this.options.localGeocoderOnly?Promise.resolve({}):this.options.reverseGeocode&&S.test(t)?this._createReverseGeocodeRequest(t,e):(e.query=t,this.geocoderApi.getSuggestions?i?this.geocoderApi.searchByPlaceId&&n?this.geocoderApi.searchByPlaceId(e):this.geocoderApi.forwardGeocode(e):this.geocoderApi.getSuggestions(e):this.geocoderApi.forwardGeocode(e))}_createReverseGeocodeRequest(e,t){const i=e.split(/[\s(,)?]+/).map((e=>parseFloat(e))).reverse();return t.query=i,t.limit=1,"proximity"in t&&delete t.proximity,this.geocoderApi.reverseGeocode(t)}_handleGeocodeResponse(e,t,i,s,r){return n(this,void 0,void 0,(function*(){this._loadingEl.style.display="none";let n={};n=e||{type:"FeatureCollection",features:[]},n.config=t,this.fresh&&(this.fresh=!1),n.features=n.features?r.concat(n.features):r;const o=this.options.externalGeocoder&&this.options.externalGeocoder(i,n.features,t)||Promise.resolve([]);try{const e=yield o;n.features=n.features?e.concat(n.features):e}catch(a){}this.options.filter&&n.features.length&&(n.features=n.features.filter(this.options.filter));let l=[];l="suggestions"in n?n.suggestions:"place"in n?[n.place]:n.features,l.length?(this._clearEl.style.display="block",this._typeahead.update(l),(!this.options.showResultsWhileTyping||s)&&this.options.showResultMarkers&&(n.features.length>0||"place"in n)&&this._fitBoundsForMarkers(),this._eventEmitter.emit("results",n)):(this._clearEl.style.display="none",this._typeahead.selected=null,this._renderNoResults(),this._eventEmitter.emit("results",n))}))}_handleGeocodeErrorResponse(e,t){this._loadingEl.style.display="none",t.length&&this.options.localGeocoder?(this._clearEl.style.display="block",this._typeahead.update(t)):(this._clearEl.style.display="none",this._typeahead.selected=null,this._renderError()),this._eventEmitter.emit("results",{features:t}),this._eventEmitter.emit("error",{error:e})}_clear(e){e&&e.preventDefault(),this._inputEl.value="",this._typeahead.selected=null,this._typeahead.clear(),this._onChange(),this._clearEl.style.display="none",this._removeMarker(),this._removeResultMarkers(),this.lastSelected=null,this._eventEmitter.emit("clear"),this.fresh=!0}clear(e){this._clear(e),this._inputEl.focus()}_clearOnBlur(e){e.relatedTarget&&this._clear(e)}_onQueryResult(e){if(!("features"in e))return;if(!e.features.length)return;const t=e.features[0];this._typeahead.selected=t,this._inputEl.value=t.place_name,this._onChange()}_updateProximity(){if(this._map)if(this._map.getZoom()>this.options.proximityMinZoom){const e=this._map.getCenter().wrap();this.setProximity({longitude:e.lng,latitude:e.lat})}else this.setProximity(null)}_collapse(){this._inputEl.value||this._inputEl===document.activeElement||this.container.classList.add("maplibregl-ctrl-geocoder--collapsed")}_unCollapse(){this.container.classList.remove("maplibregl-ctrl-geocoder--collapsed")}query(e){return n(this,void 0,void 0,(function*(){const t=yield this._geocode(e);this._onQueryResult(t)}))}_renderError(){this._renderMessage("<div class='maplibre-gl-geocoder--error'>There was an error reaching the server</div>")}_renderNoResults(){this._renderMessage("<div class='maplibre-gl-geocoder--error maplibre-gl-geocoder--no-results'>No results found</div>")}_renderMessage(e){this._typeahead.update([]),this._typeahead.selected=null,this._typeahead.clear(),this._typeahead.renderError(e)}_getPlaceholderText(){if(this.options.placeholder)return this.options.placeholder;if(this.options.language){const e=this.options.language.split(",")[0],t=M.language(e),i=j[t];if(i)return i}return"Search"}_fitBoundsForMarkers(){if(this._typeahead.data.length<1)return;const e=this._typeahead.data.filter((e=>"string"!=typeof e)).slice(0,this.options.limit);if(this._clearEl.style.display="none",this.options.flyTo&&this._maplibregl&&this._map){const t=P({},{padding:100},this.options.flyTo),i=new this._maplibregl.LngLatBounds;for(const n of e)i.extend(n.geometry.coordinates);this._map.fitBounds(i,t)}return e.length>0&&this._maplibregl&&this._handleResultMarkers(e),this}setInput(e){return this._inputEl.value=e,this._typeahead.selected=null,this._typeahead.clear(),e.length>=this.options.minLength&&this.options.showResultsWhileTyping&&this._geocode(e),this}setProximity(e){return this.options.proximity=e,this}getProximity(){return this.options.proximity}setRenderFunction(e){return e&&"function"==typeof e&&(this._typeahead.render=e),this}getRenderFunction(){return this._typeahead.render}setLanguage(e){return this.options.language=e||this.options.language||navigator.language,this}getLanguage(){return this.options.language}getZoom(){return this.options.zoom}setZoom(e){return this.options.zoom=e,this}getFlyTo(){return this.options.flyTo}setFlyTo(e){return this.options.flyTo=e,this}getPlaceholder(){return this.options.placeholder}setPlaceholder(e){return this.placeholder=e||this._getPlaceholderText(),this._inputEl.placeholder=this.placeholder,this._inputEl.setAttribute("aria-label",this.placeholder),this}getBbox(){return this.options.bbox}setBbox(e){return this.options.bbox=e,this}getCountries(){return this.options.countries}setCountries(e){return this.options.countries=e,this}getTypes(){return this.options.types}setTypes(e){return this.options.types=e,this}getMinLength(){return this.options.minLength}setMinLength(e){return this.options.minLength=e,this._typeahead&&(this._typeahead.options.minLength=e),this}getLimit(){return this.options.limit}setLimit(e){return this.options.limit=e,this._typeahead&&(this._typeahead.options.limit=e),this}getFilter(){return this.options.filter}setFilter(e){return this.options.filter=e,this}setGeocoderApi(e){return this.geocoderApi=e,this}getGeocoderApi(){return this.geocoderApi}_handleMarker(e){if(!this._map)return;this._removeMarker();const t=P({},{color:"#4668F2"},this.options.marker);let i;if(this.mapMarker=new this._maplibregl.Marker(t),this.options.popup){const t=P({},{},this.options.popup);i=new this._maplibregl.Popup(t).setHTML(this.options.popupRender(e))}return e.center?(this.mapMarker.setLngLat(e.center).addTo(this._map),this.options.popup&&this.mapMarker.setPopup(i)):e.geometry&&e.geometry.type&&"Point"===e.geometry.type&&e.geometry.coordinates&&(this.mapMarker.setLngLat(e.geometry.coordinates).addTo(this._map),this.options.popup&&this.mapMarker.setPopup(i)),this}_removeMarker(){this.mapMarker&&(this.mapMarker.remove(),this.mapMarker=null)}_handleResultMarkers(e){if(!this._map)return;this._removeResultMarkers();let t=P({},{color:"#4668F2"},this.options.showResultMarkers);for(const i of e){let e;if(this.options.showResultMarkers){this.options.showResultMarkers&&this.options.showResultMarkers.element&&(e=this.options.showResultMarkers.element.cloneNode(!0),t=P(t,{element:e}));const n=new this._maplibregl.Marker(P({},t,{element:e}));let s;if(this.options.popup){const e=P({},{},this.options.popup);s=new this._maplibregl.Popup(e).setHTML(this.options.popupRender(i))}i.center?(n.setLngLat(i.center).addTo(this._map),this.options.popup&&n.setPopup(s)):i.geometry&&i.geometry.type&&"Point"===i.geometry.type&&i.geometry.coordinates&&(n.setLngLat(i.geometry.coordinates).addTo(this._map),this.options.popup&&n.setPopup(s)),this.resultMarkers.push(n)}}return this}_removeResultMarkers(){this.resultMarkers&&this.resultMarkers.length>0&&(this.resultMarkers.forEach((function(e){e.remove()})),this.resultMarkers=[])}on(e,t){return this._eventEmitter.on(e,t),this}once(e){return new Promise((t=>{this._eventEmitter.once(e,t)}))}off(e,t){return this._eventEmitter.removeListener(e,t),this}}},8453:(e,t,i)=>{i.d(t,{R:()=>o,x:()=>l});var n=i(6540);const s={},r=n.createContext(s);function o(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);