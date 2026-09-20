var qd=Object.defineProperty;var Hd=(n,t,e)=>t in n?qd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var _=(n,t,e)=>Hd(n,typeof t!="symbol"?t+"":t,e);const jd=()=>{};var Mu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Gd=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[e++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[e++],o=n[e++],c=n[e++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(u>>10)),t[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[e++],o=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return t.join("")},zh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,p=i>>2,m=(i&3)<<4|c>>4;let T=(c&15)<<2|h>>6,P=h&63;u||(P=64,o||(T=64)),r.push(e[p],e[m],e[T],e[P])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Gh(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Gd(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const h=s<n.length?e[n.charAt(s)]:64;++s;const m=s<n.length?e[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new zd;const T=i<<2|c>>4;if(r.push(T),h!==64){const P=c<<4&240|h>>2;if(r.push(P),m!==64){const O=h<<6&192|m;r.push(O)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Wd=function(n){const t=Gh(n);return zh.encodeByteArray(t,!0)},Wh=function(n){return Wd(n).replace(/\./g,"")},Kh=function(n){try{return zh.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd=()=>Kd().__FIREBASE_DEFAULTS__,Qd=()=>{if(typeof process>"u"||typeof Mu>"u")return;const n=Mu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Xd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Kh(n[1]);return t&&JSON.parse(t)},vo=()=>{try{return jd()||Yd()||Qd()||Xd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Jd=n=>{var t,e;return(e=(t=vo())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},Yh=()=>{var n;return(n=vo())==null?void 0:n.config},Qh=n=>{var t;return(t=vo())==null?void 0:t[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Wt())}function t0(){var t;const n=(t=vo())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function e0(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function n0(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function r0(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function s0(){const n=Wt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function i0(){return!t0()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function o0(){try{return typeof indexedDB=="object"}catch{return!1}}function a0(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c0="FirebaseError";class Be extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=c0,Object.setPrototypeOf(this,Be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ur.prototype.create)}}class ur{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],o=i?u0(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new Be(s,c,r)}}function u0(n,t){return n.replace(l0,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const l0=/\{\$([^}]+)}/g;function h0(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function Xe(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const i=n[s],o=t[s];if(Fu(i)&&Fu(o)){if(!Xe(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Fu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zs(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function _s(n){const t={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");t[decodeURIComponent(s)]=decodeURIComponent(i)}}),t}function ys(n){const t=n.indexOf("?");if(!t)return"";const e=n.indexOf("#",t);return n.substring(t,e>0?e:void 0)}function f0(n,t){const e=new d0(n,t);return e.subscribe.bind(e)}class d0{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");p0(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=ba),s.error===void 0&&(s.error=ba),s.complete===void 0&&(s.complete=ba);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function p0(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function ba(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ti(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Jh(n){return(await fetch(n,{credentials:"include"})).ok}class ve{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g0{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Xh;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(_0(t))try{this.getOrInitializeService({instanceIdentifier:Kn})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=Kn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Kn){return this.instances.has(t)}getOptions(t=Kn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:m0(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Kn){return this.component?this.component.multipleInstances?t:Kn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function m0(n){return n===Kn?void 0:n}function _0(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y0{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new g0(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var it;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(it||(it={}));const E0={debug:it.DEBUG,verbose:it.VERBOSE,info:it.INFO,warn:it.WARN,error:it.ERROR,silent:it.SILENT},w0=it.INFO,T0={[it.DEBUG]:"log",[it.VERBOSE]:"log",[it.INFO]:"info",[it.WARN]:"warn",[it.ERROR]:"error"},I0=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=T0[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class I1{constructor(t){this.name=t,this._logLevel=w0,this._logHandler=I0,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in it))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?E0[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,it.DEBUG,...t),this._logHandler(this,it.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,it.VERBOSE,...t),this._logHandler(this,it.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,it.INFO,...t),this._logHandler(this,it.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,it.WARN,...t),this._logHandler(this,it.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,it.ERROR,...t),this._logHandler(this,it.ERROR,...t)}}const A0=(n,t)=>t.some(e=>n instanceof e);let Uu,Bu;function v0(){return Uu||(Uu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function R0(){return Bu||(Bu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zh=new WeakMap,za=new WeakMap,t2=new WeakMap,Na=new WeakMap,A1=new WeakMap;function S0(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{e(ze(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return t.then(e=>{e instanceof IDBCursor&&Zh.set(e,n)}).catch(()=>{}),A1.set(t,n),t}function C0(n){if(za.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{e(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});za.set(n,t)}let Wa={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return za.get(n);if(t==="objectStoreNames")return n.objectStoreNames||t2.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return ze(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function P0(n){Wa=n(Wa)}function b0(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Oa(this),t,...e);return t2.set(r,t.sort?t.sort():[t]),ze(r)}:R0().includes(n)?function(...t){return n.apply(Oa(this),t),ze(Zh.get(this))}:function(...t){return ze(n.apply(Oa(this),t))}}function N0(n){return typeof n=="function"?b0(n):(n instanceof IDBTransaction&&C0(n),A0(n,v0())?new Proxy(n,Wa):n)}function ze(n){if(n instanceof IDBRequest)return S0(n);if(Na.has(n))return Na.get(n);const t=N0(n);return t!==n&&(Na.set(n,t),A1.set(t,n)),t}const Oa=n=>A1.get(n);function Ro(n,t,{blocked:e,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,t),c=ze(o);return r&&o.addEventListener("upgradeneeded",u=>{r(ze(o.result),u.oldVersion,u.newVersion,ze(o.transaction),u)}),e&&o.addEventListener("blocked",u=>e(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}function Hi(n,{blocked:t}={}){const e=indexedDB.deleteDatabase(n);return t&&e.addEventListener("blocked",r=>t(r.oldVersion,r)),ze(e).then(()=>{})}const O0=["get","getKey","getAll","getAllKeys","count"],D0=["put","add","delete","clear"],Da=new Map;function $u(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Da.get(t))return Da.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=D0.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||O0.includes(e)))return;const i=async function(o,...c){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[e](...c),s&&u.done]))[0]};return Da.set(t,i),i}P0(n=>({...n,get:(t,e,r)=>$u(t,e)||n.get(t,e,r),has:(t,e)=>!!$u(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k0{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(V0(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function V0(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Ka="@firebase/app",qu="0.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=new I1("@firebase/app"),x0="@firebase/app-compat",L0="@firebase/analytics-compat",M0="@firebase/analytics",F0="@firebase/app-check-compat",U0="@firebase/app-check",B0="@firebase/auth",$0="@firebase/auth-compat",q0="@firebase/database",H0="@firebase/data-connect",j0="@firebase/database-compat",G0="@firebase/functions",z0="@firebase/functions-compat",W0="@firebase/installations",K0="@firebase/installations-compat",Y0="@firebase/messaging",Q0="@firebase/messaging-compat",X0="@firebase/performance",J0="@firebase/performance-compat",Z0="@firebase/remote-config",tp="@firebase/remote-config-compat",ep="@firebase/storage",np="@firebase/storage-compat",rp="@firebase/firestore",sp="@firebase/ai",ip="@firebase/firestore-compat",op="firebase",ap="12.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya="[DEFAULT]",cp={[Ka]:"fire-core",[x0]:"fire-core-compat",[M0]:"fire-analytics",[L0]:"fire-analytics-compat",[U0]:"fire-app-check",[F0]:"fire-app-check-compat",[B0]:"fire-auth",[$0]:"fire-auth-compat",[q0]:"fire-rtdb",[H0]:"fire-data-connect",[j0]:"fire-rtdb-compat",[G0]:"fire-fn",[z0]:"fire-fn-compat",[W0]:"fire-iid",[K0]:"fire-iid-compat",[Y0]:"fire-fcm",[Q0]:"fire-fcm-compat",[X0]:"fire-perf",[J0]:"fire-perf-compat",[Z0]:"fire-rc",[tp]:"fire-rc-compat",[ep]:"fire-gcs",[np]:"fire-gcs-compat",[rp]:"fire-fst",[ip]:"fire-fst-compat",[sp]:"fire-vertex","fire-js":"fire-js",[op]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs=new Map,up=new Map,Qa=new Map;function Hu(n,t){try{n.container.addComponent(t)}catch(e){Je.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Ve(n){const t=n.name;if(Qa.has(t))return Je.debug(`There were multiple attempts to register component ${t}.`),!1;Qa.set(t,n);for(const e of xs.values())Hu(e,n);for(const e of up.values())Hu(e,n);return!0}function ei(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function ue(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Tn=new ur("app","Firebase",lp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ve("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Tn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur=ap;function fp(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:Ya,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Tn.create("bad-app-name",{appName:String(s)});if(e||(e=Yh()),!e)throw Tn.create("no-options");const i=xs.get(s);if(i){if(Xe(e,i.options)&&Xe(r,i.config))return i;throw Tn.create("duplicate-app",{appName:s})}const o=new y0(s);for(const u of Qa.values())o.addComponent(u);const c=new hp(e,r,o);return xs.set(s,c),c}function dp(n=Ya){const t=xs.get(n);if(!t&&n===Ya&&Yh())return fp();if(!t)throw Tn.create("no-app",{appName:n});return t}function R_(){return Array.from(xs.values())}function _e(n,t,e){let r=cp[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${t}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Je.warn(o.join(" "));return}Ve(new ve(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp="firebase-heartbeat-database",gp=1,Ls="firebase-heartbeat-store";let ka=null;function e2(){return ka||(ka=Ro(pp,gp,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Ls)}catch(e){console.warn(e)}}}}).catch(n=>{throw Tn.create("idb-open",{originalErrorMessage:n.message})})),ka}async function mp(n){try{const e=(await e2()).transaction(Ls),r=await e.objectStore(Ls).get(n2(n));return await e.done,r}catch(t){if(t instanceof Be)Je.warn(t.message);else{const e=Tn.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Je.warn(e.message)}}}async function ju(n,t){try{const r=(await e2()).transaction(Ls,"readwrite");await r.objectStore(Ls).put(t,n2(n)),await r.done}catch(e){if(e instanceof Be)Je.warn(e.message);else{const r=Tn.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Je.warn(r.message)}}}function n2(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _p=1024,yp=30;class Ep{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Tp(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Gu();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>yp){const o=Ip(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Je.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Gu(),{heartbeatsToSend:r,unsentEntries:s}=wp(this._heartbeatsCache.heartbeats),i=Wh(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Je.warn(e),""}}}function Gu(){return new Date().toISOString().substring(0,10)}function wp(n,t=_p){const e=[];let r=n.slice();for(const s of n){const i=e.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),zu(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),zu(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Tp{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return o0()?a0().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await mp(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ju(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ju(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function zu(n){return Wh(JSON.stringify({version:2,heartbeats:n})).length}function Ip(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ap(n){Ve(new ve("platform-logger",t=>new k0(t),"PRIVATE")),Ve(new ve("heartbeat",t=>new Ep(t),"PRIVATE")),_e(Ka,qu,n),_e(Ka,qu,"esm2020"),_e("fire-js","")}Ap("");var vp="firebase",Rp="12.15.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_e(vp,Rp,"app");function r2(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Sp=r2,s2=new ur("auth","Firebase",r2());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo=new I1("@firebase/auth");function Cp(n,...t){eo.logLevel<=it.WARN&&eo.warn(`Auth (${Ur}): ${n}`,...t)}function ji(n,...t){eo.logLevel<=it.ERROR&&eo.error(`Auth (${Ur}): ${n}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(n,...t){throw R1(n,...t)}function Ae(n,...t){return R1(n,...t)}function v1(n,t,e){const r={...Sp(),[t]:e};return new ur("auth","Firebase",r).create(t,{appName:n.name})}function We(n){return v1(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Pp(n,t,e){const r=e;if(!(t instanceof r))throw r.name!==t.constructor.name&&ye(n,"argument-error"),v1(n,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function R1(n,...t){if(typeof n!="string"){const e=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(e,...r)}return s2.create(n,...t)}function Q(n,t,...e){if(!n)throw R1(t,...e)}function qe(n){const t="INTERNAL ASSERTION FAILED: "+n;throw ji(t),new Error(t)}function Ze(n,t){n||qe(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xa(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function bp(){return Wu()==="http:"||Wu()==="https:"}function Wu(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(bp()||n0()||"connection"in navigator)?navigator.onLine:!0}function Op(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(t,e){this.shortDelay=t,this.longDelay=e,Ze(e>t,"Short delay should be less than long delay!"),this.isMobile=Zd()||r0()}get(){return Np()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S1(n,t){Ze(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i2{static initialize(t,e,r){this.fetchImpl=t,e&&(this.headersImpl=e),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;qe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;qe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;qe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kp=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Vp=new ni(3e4,6e4);function Fn(n,t){return n.tenantId&&!t.tenantId?{...t,tenantId:n.tenantId}:t}async function nn(n,t,e,r,s={}){return o2(n,s,async()=>{let i={},o={};r&&(t==="GET"?o=r:i={body:JSON.stringify(r)});const c=Zs({...o,key:n.config.apiKey}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:t,headers:u,...i};return e0()||(h.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&ti(n.emulatorConfig.host)&&(h.credentials="include"),i2.fetch()(await a2(n,n.config.apiHost,e,c),h)})}async function o2(n,t,e){n._canInitEmulator=!1;const r={...Dp,...t};try{const s=new Lp(n),i=await Promise.race([e(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw xi(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw xi(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw xi(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw xi(n,"user-disabled",o);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw v1(n,p,h);ye(n,p)}}catch(s){if(s instanceof Be)throw s;ye(n,"network-request-failed",{message:String(s)})}}async function ri(n,t,e,r,s={}){const i=await nn(n,t,e,r,s);return"mfaPendingCredential"in i&&ye(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function a2(n,t,e,r){const s=`${t}${e}?${r}`,i=n,o=i.config.emulator?S1(n.config,s):`${n.config.apiScheme}://${s}`;return kp.includes(e)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function xp(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Lp{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,r)=>{this.timer=setTimeout(()=>r(Ae(this.auth,"network-request-failed")),Vp.get())})}}function xi(n,t,e){const r={appName:n.name};e.email&&(r.email=e.email),e.phoneNumber&&(r.phoneNumber=e.phoneNumber);const s=Ae(n,t,r);return s.customData._tokenResponse=e,s}function Ku(n){return n!==void 0&&n.enterprise!==void 0}class Mp{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const e of this.recaptchaEnforcementState)if(e.provider&&e.provider===t)return xp(e.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Fp(n,t){return nn(n,"GET","/v2/recaptchaConfig",Fn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Up(n,t){return nn(n,"POST","/v1/accounts:delete",t)}async function no(n,t){return nn(n,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Is(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Bp(n,t=!1){const e=Tt(n),r=await e.getIdToken(t),s=C1(r);Q(s&&s.exp&&s.auth_time&&s.iat,e.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Is(Va(s.auth_time)),issuedAtTime:Is(Va(s.iat)),expirationTime:Is(Va(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Va(n){return Number(n)*1e3}function C1(n){const[t,e,r]=n.split(".");if(t===void 0||e===void 0||r===void 0)return ji("JWT malformed, contained fewer than 3 sections"),null;try{const s=Kh(e);return s?JSON.parse(s):(ji("Failed to decode base64 JWT payload"),null)}catch(s){return ji("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Yu(n){const t=C1(n);return Q(t,"internal-error"),Q(typeof t.exp<"u","internal-error"),Q(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cr(n,t,e=!1){if(e)return t;try{return await t}catch(r){throw r instanceof Be&&$p(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function $p({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=Is(this.lastLoginAt),this.creationTime=Is(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ro(n){var m;const t=n.auth,e=await n.getIdToken(),r=await Cr(n,no(t,{idToken:e}));Q(r==null?void 0:r.users.length,t,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(m=s.providerUserInfo)!=null&&m.length?c2(s.providerUserInfo):[],o=jp(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),h=c?u:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Ja(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,p)}async function Hp(n){const t=Tt(n);await ro(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function jp(n,t){return[...n.filter(r=>!t.some(s=>s.providerId===r.providerId)),...t]}function c2(n){return n.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gp(n,t){const e=await o2(n,{},async()=>{const r=Zs({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await a2(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&ti(n.emulatorConfig.host)&&(u.credentials="include"),i2.fetch()(o,u)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function zp(n,t){return nn(n,"POST","/v2/accounts:revokeToken",Fn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){Q(t.idToken,"internal-error"),Q(typeof t.idToken<"u","internal-error"),Q(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Yu(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){Q(t.length!==0,"internal-error");const e=Yu(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:r,refreshToken:s,expiresIn:i}=await Gp(t,e);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(t,e,r){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,e){const{refreshToken:r,accessToken:s,expirationTime:i}=e,o=new Ir;return r&&(Q(typeof r=="string","internal-error",{appName:t}),o.refreshToken=r),s&&(Q(typeof s=="string","internal-error",{appName:t}),o.accessToken=s),i&&(Q(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Ir,this.toJSON())}_performRefresh(){return qe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(n,t){Q(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class Ie{constructor({uid:t,auth:e,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new qp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ja(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const e=await Cr(this,this.stsTokenManager.getToken(this.auth,t));return Q(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return Bp(this,t)}reload(){return Hp(this)}_assign(t){this!==t&&(Q(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Ie({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),e&&await ro(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ue(this.auth.app))return Promise.reject(We(this.auth));const t=await this.getIdToken();return await Cr(this,Up(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const r=e.displayName??void 0,s=e.email??void 0,i=e.phoneNumber??void 0,o=e.photoURL??void 0,c=e.tenantId??void 0,u=e._redirectEventId??void 0,h=e.createdAt??void 0,p=e.lastLoginAt??void 0,{uid:m,emailVerified:T,isAnonymous:P,providerData:O,stsTokenManager:M}=e;Q(m&&M,t,"internal-error");const $=Ir.fromJSON(this.name,M);Q(typeof m=="string",t,"internal-error"),hn(r,t.name),hn(s,t.name),Q(typeof T=="boolean",t,"internal-error"),Q(typeof P=="boolean",t,"internal-error"),hn(i,t.name),hn(o,t.name),hn(c,t.name),hn(u,t.name),hn(h,t.name),hn(p,t.name);const Z=new Ie({uid:m,auth:t,email:s,emailVerified:T,displayName:r,isAnonymous:P,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:$,createdAt:h,lastLoginAt:p});return O&&Array.isArray(O)&&(Z.providerData=O.map(ut=>({...ut}))),u&&(Z._redirectEventId=u),Z}static async _fromIdTokenResponse(t,e,r=!1){const s=new Ir;s.updateFromServerResponse(e);const i=new Ie({uid:e.localId,auth:t,stsTokenManager:s,isAnonymous:r});return await ro(i),i}static async _fromGetAccountInfoResponse(t,e,r){const s=e.users[0];Q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?c2(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Ir;c.updateFromIdToken(r);const u=new Ie({uid:s.localId,auth:t,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ja(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu=new Map;function He(n){Ze(n instanceof Function,"Expected a class definition");let t=Qu.get(n);return t?(Ze(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,Qu.set(n,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u2{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}u2.type="NONE";const Xu=u2;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(n,t,e){return`firebase:${n}:${t}:${e}`}class Ar{constructor(t,e,r){this.persistence=t,this.auth=e,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Gi(this.userKey,s.apiKey,i),this.fullPersistenceKey=Gi("persistence",s.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await no(this.auth,{idToken:t}).catch(()=>{});return e?Ie._fromGetAccountInfoResponse(this.auth,e,t):null}return Ie._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,r="authUser"){if(!e.length)return new Ar(He(Xu),t,r);const s=(await Promise.all(e.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||He(Xu);const o=Gi(r,t.config.apiKey,t.name);let c=null;for(const h of e)try{const p=await h._get(o);if(p){let m;if(typeof p=="string"){const T=await no(t,{idToken:p}).catch(()=>{});if(!T)break;m=await Ie._fromGetAccountInfoResponse(t,T,p)}else m=Ie._fromJSON(t,p);h!==i&&(c=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Ar(i,t,r):(i=u[0],c&&await i._set(o,c.toJSON()),await Promise.all(e.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Ar(i,t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ju(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(d2(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(l2(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(g2(t))return"Blackberry";if(m2(t))return"Webos";if(h2(t))return"Safari";if((t.includes("chrome/")||f2(t))&&!t.includes("edge/"))return"Chrome";if(p2(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(e);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function l2(n=Wt()){return/firefox\//i.test(n)}function h2(n=Wt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function f2(n=Wt()){return/crios\//i.test(n)}function d2(n=Wt()){return/iemobile/i.test(n)}function p2(n=Wt()){return/android/i.test(n)}function g2(n=Wt()){return/blackberry/i.test(n)}function m2(n=Wt()){return/webos/i.test(n)}function P1(n=Wt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Wp(n=Wt()){var t;return P1(n)&&!!((t=window.navigator)!=null&&t.standalone)}function Kp(){return s0()&&document.documentMode===10}function _2(n=Wt()){return P1(n)||p2(n)||m2(n)||g2(n)||/windows phone/i.test(n)||d2(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y2(n,t=[]){let e;switch(n){case"Browser":e=Ju(Wt());break;case"Worker":e=`${Ju(Wt())}-${n}`;break;default:e=n}const r=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${Ur}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const r=i=>new Promise((o,c)=>{try{const u=t(i);o(u)}catch(u){c(u)}});r.onAbort=e,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const r of this.queue)await r(t),r.onAbort&&e.push(r.onAbort)}catch(r){e.reverse();for(const s of e)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qp(n,t={}){return nn(n,"GET","/v2/passwordPolicy",Fn(n,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xp=6;class Jp{constructor(t){var r;const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??Xp,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=t.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(e.meetsMinPasswordLength=t.length>=r),s&&(e.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let r;for(let s=0;s<t.length;s++)r=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(e,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,e,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(t,e,r,s){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Zu(this),this.idTokenSubscription=new Zu(this),this.beforeStateQueue=new Yp(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=s2,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=He(e)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Ar.create(this,t),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await no(this,{idToken:t}),r=await Ie._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(ue(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let r=e,s=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(t);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await ro(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=Op()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(ue(this.app))return Promise.reject(We(this));const e=t?Tt(t):null;return e&&Q(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&Q(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return ue(this.app)?Promise.reject(We(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return ue(this.app)?Promise.reject(We(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(He(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await Qp(this),e=new Jp(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new ur("auth","Firebase",t())}onAuthStateChanged(t,e,r){return this.registerStateListener(this.authStateSubscription,t,e,r)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,r){return this.registerStateListener(this.idTokenSubscription,t,e,r)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(r.tenantId=this.tenantId),await zp(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,e){const r=await this.getOrInitRedirectPersistenceManager(e);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&He(t)||this._popupRedirectResolver;Q(e,this,"argument-error"),this.redirectPersistenceManager=await Ar.create(this,[He(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,r;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)==null?void 0:e._redirectEventId)===t?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((e=this.currentUser)==null?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,r,s){if(this._deleted)return()=>{};const i=typeof e=="function"?e:e.next.bind(e);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof e=="function"){const u=t.addObserver(e,r,s);return()=>{o=!0,u()}}else{const u=t.addObserver(e);return()=>{o=!0,u()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=y2(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());e&&(t["X-Firebase-Client"]=e);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(ue(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:e.getToken());return t!=null&&t.error&&Cp(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Un(n){return Tt(n)}class Zu{constructor(t){this.auth=t,this.observer=null,this.addObserver=f0(e=>this.observer=e)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let So={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function t7(n){So=n}function E2(n){return So.loadJS(n)}function e7(){return So.recaptchaEnterpriseScript}function n7(){return So.gapiScript}function r7(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class s7{constructor(){this.enterprise=new i7}ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}class i7{ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}const o7="recaptcha-enterprise",w2="NO_RECAPTCHA",tl="onFirebaseAuthREInstanceReady";class dn{constructor(t){this.type=o7,this.auth=Un(t)}async verify(t="verify",e=!1){async function r(i){if(!e){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{Fp(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new Mp(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{c(u)})})}function s(i,o,c){const u=window.grecaptcha;Ku(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:t}).then(h=>{o(h)}).catch(()=>{o(w2)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new s7().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(async c=>{if(!e&&Ku(window.grecaptcha)&&dn.scriptInjectionDeferred)await dn.scriptInjectionDeferred.promise,s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=e7();u.length!==0&&(u+=c+`&onload=${tl}`),dn.scriptInjectionDeferred=new Xh,window[tl]=()=>{var h;(h=dn.scriptInjectionDeferred)==null||h.resolve()},E2(u).then(()=>{var h;return(h=dn.scriptInjectionDeferred)==null?void 0:h.promise}).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}dn.scriptInjectionDeferred=null;async function el(n,t,e,r=!1,s=!1){const i=new dn(n);let o;if(s)o=w2;else try{o=await i.verify(e)}catch{o=await i.verify(e,!0)}const c={...t};if(e==="mfaSmsEnrollment"||e==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Za(n,t,e,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await el(n,t,e,e==="getOobCode");return r(n,o)}else return r(n,t).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${e} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await el(n,t,e,e==="getOobCode");return r(n,c)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a7(n,t){const e=ei(n,"auth");if(e.isInitialized()){const s=e.getImmediate(),i=e.getOptions();if(Xe(i,t??{}))return s;ye(s,"already-initialized")}return e.initialize({options:t})}function c7(n,t){const e=(t==null?void 0:t.persistence)||[],r=(Array.isArray(e)?e:[e]).map(He);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function u7(n,t,e){const r=Un(n);Q(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!1,i=T2(t),{host:o,port:c}=l7(t),u=c===null?"":`:${c}`,h={url:`${i}//${o}${u}/`},p=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Q(Xe(h,r.config.emulator)&&Xe(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,ti(o)?Jh(`${i}//${o}${u}`):h7()}function T2(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function l7(n){const t=T2(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const r=e[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:nl(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:nl(o)}}}function nl(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function h7(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b1{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return qe("not implemented")}_getIdTokenResponse(t){return qe("not implemented")}_linkToIdToken(t,e){return qe("not implemented")}_getReauthenticationResolver(t){return qe("not implemented")}}async function f7(n,t){return nn(n,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function d7(n,t){return ri(n,"POST","/v1/accounts:signInWithPassword",Fn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function p7(n,t){return ri(n,"POST","/v1/accounts:signInWithEmailLink",Fn(n,t))}async function g7(n,t){return ri(n,"POST","/v1/accounts:signInWithEmailLink",Fn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms extends b1{constructor(t,e,r,s=null){super("password",r),this._email=t,this._password=e,this._tenantId=s}static _fromEmailAndPassword(t,e){return new Ms(t,e,"password")}static _fromEmailAndCode(t,e,r=null){return new Ms(t,e,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t;if(e!=null&&e.email&&(e!=null&&e.password)){if(e.signInMethod==="password")return this._fromEmailAndPassword(e.email,e.password);if(e.signInMethod==="emailLink")return this._fromEmailAndCode(e.email,e.password,e.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const e={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(t,e,"signInWithPassword",d7);case"emailLink":return p7(t,{email:this._email,oobCode:this._password});default:ye(t,"internal-error")}}async _linkToIdToken(t,e){switch(this.signInMethod){case"password":const r={idToken:e,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(t,r,"signUpPassword",f7);case"emailLink":return g7(t,{idToken:e,email:this._email,oobCode:this._password});default:ye(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vr(n,t){return ri(n,"POST","/v1/accounts:signInWithIdp",Fn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m7="http://localhost";class nr extends b1{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new nr(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):ye("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:s,...i}=e;if(!r||!s)return null;const o=new nr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const e=this.buildRequest();return vr(t,e)}_linkToIdToken(t,e){const r=this.buildRequest();return r.idToken=e,vr(t,r)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,vr(t,e)}buildRequest(){const t={requestUri:m7,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=Zs(e)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _7(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function y7(n){const t=_s(ys(n)).link,e=t?_s(ys(t)).deep_link_id:null,r=_s(ys(n)).deep_link_id;return(r?_s(ys(r)).link:null)||r||e||t||n}class N1{constructor(t){const e=_s(ys(t)),r=e.apiKey??null,s=e.oobCode??null,i=_7(e.mode??null);Q(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=e.continueUrl??null,this.languageCode=e.lang??null,this.tenantId=e.tenantId??null}static parseLink(t){const e=y7(t);try{return new N1(e)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(){this.providerId=Br.PROVIDER_ID}static credential(t,e){return Ms._fromEmailAndPassword(t,e)}static credentialWithLink(t,e){const r=N1.parseLink(e);return Q(r,"argument-error"),Ms._fromEmailAndCode(t,r.code,r.tenantId)}}Br.PROVIDER_ID="password";Br.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Br.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O1{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si extends O1{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn extends si{constructor(){super("facebook.com")}static credential(t){return nr._fromParams({providerId:pn.PROVIDER_ID,signInMethod:pn.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return pn.credentialFromTaggedObject(t)}static credentialFromError(t){return pn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return pn.credential(t.oauthAccessToken)}catch{return null}}}pn.FACEBOOK_SIGN_IN_METHOD="facebook.com";pn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn extends si{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return nr._fromParams({providerId:gn.PROVIDER_ID,signInMethod:gn.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return gn.credentialFromTaggedObject(t)}static credentialFromError(t){return gn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:r}=t;if(!e&&!r)return null;try{return gn.credential(e,r)}catch{return null}}}gn.GOOGLE_SIGN_IN_METHOD="google.com";gn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn extends si{constructor(){super("github.com")}static credential(t){return nr._fromParams({providerId:mn.PROVIDER_ID,signInMethod:mn.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return mn.credentialFromTaggedObject(t)}static credentialFromError(t){return mn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return mn.credential(t.oauthAccessToken)}catch{return null}}}mn.GITHUB_SIGN_IN_METHOD="github.com";mn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends si{constructor(){super("twitter.com")}static credential(t,e){return nr._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return _n.credentialFromTaggedObject(t)}static credentialFromError(t){return _n.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:r}=t;if(!e||!r)return null;try{return _n.credential(e,r)}catch{return null}}}_n.TWITTER_SIGN_IN_METHOD="twitter.com";_n.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function E7(n,t){return ri(n,"POST","/v1/accounts:signUp",Fn(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,r,s=!1){const i=await Ie._fromIdTokenResponse(t,r,s),o=rl(r);return new rr({user:i,providerId:o,_tokenResponse:r,operationType:e})}static async _forOperation(t,e,r){await t._updateTokensIfNecessary(r,!0);const s=rl(r);return new rr({user:t,providerId:s,_tokenResponse:r,operationType:e})}}function rl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so extends Be{constructor(t,e,r,s){super(e.code,e.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,so.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,e,r,s){return new so(t,e,r,s)}}function I2(n,t,e,r){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?so._fromErrorAndOperation(n,i,t,r):i})}async function w7(n,t,e=!1){const r=await Cr(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return rr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function T7(n,t,e=!1){const{auth:r}=n;if(ue(r.app))return Promise.reject(We(r));const s="reauthenticate";try{const i=await Cr(n,I2(r,s,t,n),e);Q(i.idToken,r,"internal-error");const o=C1(i.idToken);Q(o,r,"internal-error");const{sub:c}=o;return Q(n.uid===c,r,"user-mismatch"),rr._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ye(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function A2(n,t,e=!1){if(ue(n.app))return Promise.reject(We(n));const r="signIn",s=await I2(n,r,t),i=await rr._fromIdTokenResponse(n,r,s);return e||await n._updateCurrentUser(i.user),i}async function I7(n,t){return A2(Un(n),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function v2(n){const t=Un(n);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function S_(n,t,e){if(ue(n.app))return Promise.reject(We(n));const r=Un(n),o=await Za(r,{returnSecureToken:!0,email:t,password:e,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",E7).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&v2(n),u}),c=await rr._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function C_(n,t,e){return ue(n.app)?Promise.reject(We(n)):I7(Tt(n),Br.credential(t,e)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&v2(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function A7(n,t){return nn(n,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function P_(n,{displayName:t,photoURL:e}){if(t===void 0&&e===void 0)return;const r=Tt(n),i={idToken:await r.getIdToken(),displayName:t,photoUrl:e,returnSecureToken:!0},o=await Cr(r,A7(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function v7(n,t,e,r){return Tt(n).onIdTokenChanged(t,e,r)}function R7(n,t,e){return Tt(n).beforeAuthStateChanged(t,e)}function b_(n,t,e,r){return Tt(n).onAuthStateChanged(t,e,r)}const io="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R2{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(io,"1"),this.storage.removeItem(io),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S7=1e3,C7=10;class S2 extends R2{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=_2(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const r=this.storage.getItem(e),s=this.localCache[e];r!==s&&t(e,s,r)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=t.key;e?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!e&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Kp()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,C7):s()}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:r}),!0)})},S7)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}S2.type="LOCAL";const P7=S2;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C2 extends R2{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}C2.type="SESSION";const P2=C2;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b7(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(s=>s.isListeningto(t));if(e)return e;const r=new Co(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:r,eventType:s,data:i}=e.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;e.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(e.origin,i)),u=await b7(c);e.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Co.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D1(n="",t=10){let e="";for(let r=0;r<t;r++)e+=Math.floor(Math.random()*10);return n+e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N7{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,u)=>{const h=D1("",20);s.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const T=m;if(T.data.eventId===h)switch(T.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(T.data.response);break;default:clearTimeout(p),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:h,data:e},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(){return window}function O7(n){Oe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b2(){return typeof Oe().WorkerGlobalScope<"u"&&typeof Oe().importScripts=="function"}async function D7(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function k7(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function V7(){return b2()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N2="firebaseLocalStorageDb",x7=1,oo="firebaseLocalStorage",O2="fbase_key";class ii{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function Po(n,t){return n.transaction([oo],t?"readwrite":"readonly").objectStore(oo)}function L7(){const n=indexedDB.deleteDatabase(N2);return new ii(n).toPromise()}function D2(){const n=indexedDB.open(N2,x7);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(oo,{keyPath:O2})}catch(s){e(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(oo)?t(r):(r.close(),await L7(),t(await D2()))})})}async function sl(n,t,e){const r=Po(n,!0).put({[O2]:t,value:e});return new ii(r).toPromise()}async function M7(n,t){const e=Po(n,!1).get(t),r=await new ii(e).toPromise();return r===void 0?null:r.value}function il(n,t){const e=Po(n,!0).delete(t);return new ii(e).toPromise()}const F7=800,U7=3;class k2{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=D2(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(t){let e=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(e++>U7)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return b2()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Co._getInstance(V7()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var e,r;if(this.activeServiceWorker=await D7(),!this.activeServiceWorker)return;this.sender=new N7(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(e=t[0])!=null&&e.fulfilled&&(r=t[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||k7()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async t=>{await sl(t,io,"1"),await il(t,io)}),!0):!1}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(r=>sl(r,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(r=>M7(r,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>il(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const i=Po(s,!1).getAll();return new ii(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],r=new Set;if(t.length!==0)for(const{fbase_key:s,value:i}of t)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),e.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),e.push(s));return e}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),F7)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}k2.type="LOCAL";const B7=k2;new ni(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V2(n,t){return t?He(t):(Q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k1 extends b1{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return vr(t,this._buildIdpRequest())}_linkToIdToken(t,e){return vr(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return vr(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function $7(n){return A2(n.auth,new k1(n),n.bypassAuthState)}function q7(n){const{auth:t,user:e}=n;return Q(e,t,"internal-error"),T7(e,new k1(n),n.bypassAuthState)}async function H7(n){const{auth:t,user:e}=n;return Q(e,t,"internal-error"),w7(e,new k1(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x2{constructor(t,e,r,s,i=!1){this.auth=t,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=t;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:e,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return $7;case"linkViaPopup":case"linkViaRedirect":return H7;case"reauthViaPopup":case"reauthViaRedirect":return q7;default:ye(this.auth,"internal-error")}}resolve(t){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j7=new ni(2e3,1e4);async function N_(n,t,e){if(ue(n.app))return Promise.reject(Ae(n,"operation-not-supported-in-this-environment"));const r=Un(n);Pp(n,t,O1);const s=V2(r,e);return new Qn(r,"signInViaPopup",t,s).executeNotNull()}class Qn extends x2{constructor(t,e,r,s,i){super(t,e,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Qn.currentPopupAction&&Qn.currentPopupAction.cancel(),Qn.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return Q(t,this.auth,"internal-error"),t}async onExecution(){Ze(this.filter.length===1,"Popup operations only handle one event");const t=D1();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(Ae(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(Ae(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Qn.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,r;if((r=(e=this.authWindow)==null?void 0:e.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ae(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,j7.get())};t()}}Qn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G7="pendingRedirect",zi=new Map;class z7 extends x2{constructor(t,e,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,r),this.eventId=null}async execute(){let t=zi.get(this.auth._key());if(!t){try{const r=await W7(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(e){t=()=>Promise.reject(e)}zi.set(this.auth._key(),t)}return this.bypassAuthState||zi.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function W7(n,t){const e=Q7(t),r=Y7(n);if(!await r._isAvailable())return!1;const s=await r._get(e)==="true";return await r._remove(e),s}function K7(n,t){zi.set(n._key(),t)}function Y7(n){return He(n._redirectPersistence)}function Q7(n){return Gi(G7,n.config.apiKey,n.name)}async function X7(n,t,e=!1){if(ue(n.app))return Promise.reject(We(n));const r=Un(n),s=V2(r,t),o=await new z7(r,s,e).execute();return o&&!e&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J7=600*1e3;class Z7{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(e=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!t4(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var r;if(t.error&&!L2(t)){const s=((r=t.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";e.onError(Ae(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const r=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=J7&&this.cachedEventUids.clear(),this.cachedEventUids.has(ol(t))}saveEventToCache(t){this.cachedEventUids.add(ol(t)),this.lastProcessedEventTime=Date.now()}}function ol(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function L2({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function t4(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return L2(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e4(n,t={}){return nn(n,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n4=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,r4=/^https?/;async function s4(n){if(n.config.emulator)return;const{authorizedDomains:t}=await e4(n);for(const e of t)try{if(i4(e))return}catch{}ye(n,"unauthorized-domain")}function i4(n){const t=Xa(),{protocol:e,hostname:r}=new URL(t);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&o.hostname===r}if(!r4.test(e))return!1;if(n4.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o4=new ni(3e4,6e4);function al(){const n=Oe().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function a4(n){return new Promise((t,e)=>{var s,i,o;function r(){al(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{al(),e(Ae(n,"network-request-failed"))},timeout:o4.get()})}if((i=(s=Oe().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((o=Oe().gapi)!=null&&o.load)r();else{const c=r7("iframefcb");return Oe()[c]=()=>{gapi.load?r():e(Ae(n,"network-request-failed"))},E2(`${n7()}?onload=${c}`).catch(u=>e(u))}}).catch(t=>{throw Wi=null,t})}let Wi=null;function c4(n){return Wi=Wi||a4(n),Wi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u4=new ni(5e3,15e3),l4="__/auth/iframe",h4="emulator/auth/iframe",f4={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},d4=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function p4(n){const t=n.config;Q(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?S1(t,h4):`https://${n.config.authDomain}/${l4}`,r={apiKey:t.apiKey,appName:n.name,v:Ur},s=d4.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${e}?${Zs(r).slice(1)}`}async function g4(n){const t=await c4(n),e=Oe().gapi;return Q(e,n,"internal-error"),t.open({where:document.body,url:p4(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:f4,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Ae(n,"network-request-failed"),c=Oe().setTimeout(()=>{i(o)},u4.get());function u(){Oe().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m4={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},_4=500,y4=600,E4="_blank",w4="http://localhost";class cl{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function T4(n,t,e,r=_4,s=y4){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...m4,width:r.toString(),height:s.toString(),top:i,left:o},h=Wt().toLowerCase();e&&(c=f2(h)?E4:e),l2(h)&&(t=t||w4,u.scrollbars="yes");const p=Object.entries(u).reduce((T,[P,O])=>`${T}${P}=${O},`,"");if(Wp(h)&&c!=="_self")return I4(t||"",c),new cl(null);const m=window.open(t||"",c,p);Q(m,n,"popup-blocked");try{m.focus()}catch{}return new cl(m)}function I4(n,t){const e=document.createElement("a");e.href=n,e.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A4="__/auth/handler",v4="emulator/auth/handler",R4=encodeURIComponent("fac");async function ul(n,t,e,r,s,i){Q(n.config.authDomain,n,"auth-domain-config-required"),Q(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:r,v:Ur,eventId:s};if(t instanceof O1){t.setDefaultLanguage(n.languageCode),o.providerId=t.providerId||"",h0(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(t instanceof si){const p=t.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const u=await n._getAppCheckToken(),h=u?`#${R4}=${encodeURIComponent(u)}`:"";return`${S4(n)}?${Zs(c).slice(1)}${h}`}function S4({config:n}){return n.emulator?S1(n,v4):`https://${n.authDomain}/${A4}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa="webStorageSupport";class C4{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=P2,this._completeRedirectFn=X7,this._overrideRedirectResult=K7}async _openPopup(t,e,r,s){var o;Ze((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await ul(t,e,r,Xa(),s);return T4(t,i,D1())}async _openRedirect(t,e,r,s){await this._originValidation(t);const i=await ul(t,e,r,Xa(),s);return O7(i),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:s,promise:i}=this.eventManagers[e];return s?Promise.resolve(s):(Ze(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(t);return this.eventManagers[e]={promise:r},r.catch(()=>{delete this.eventManagers[e]}),r}async initAndGetManager(t){const e=await g4(t),r=new Z7(t);return e.register("authEvent",s=>(Q(s==null?void 0:s.authEvent,t,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=e,r}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(xa,{type:xa},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[xa];i!==void 0&&e(!!i),ye(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=s4(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return _2()||h2()||P1()}}const P4=C4;var ll="@firebase/auth",hl="1.13.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b4{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N4(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function O4(n){Ve(new ve("auth",(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:y2(n)},h=new Zp(r,s,i,u);return c7(h,e),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider("auth-internal").initialize()})),Ve(new ve("auth-internal",t=>{const e=Un(t.getProvider("auth").getImmediate());return(r=>new b4(r))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),_e(ll,hl,N4(n)),_e(ll,hl,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D4=300,k4=Qh("authIdTokenMaxAge")||D4;let fl=null;const V4=n=>async t=>{const e=t&&await t.getIdTokenResult(),r=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(r&&r>k4)return;const s=e==null?void 0:e.token;fl!==s&&(fl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function O_(n=dp()){const t=ei(n,"auth");if(t.isInitialized())return t.getImmediate();const e=a7(n,{popupRedirectResolver:P4,persistence:[B7,P7,P2]}),r=Qh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=V4(i.toString());R7(e,o,()=>o(e.currentUser)),v7(e,c=>o(c))}}const s=Jd("auth");return s&&u7(e,`http://${s}`),e}function x4(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}t7({loadJS(n){return new Promise((t,e)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=t,r.onerror=s=>{const i=Ae("internal-error");i.customData=s,e(i)},r.type="text/javascript",r.charset="UTF-8",x4().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});O4("Browser");var dl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var In,M2;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(v,y){function w(){}w.prototype=y.prototype,v.F=y.prototype,v.prototype=new w,v.prototype.constructor=v,v.D=function(R,A,C){for(var E=Array(arguments.length-2),Zt=2;Zt<arguments.length;Zt++)E[Zt-2]=arguments[Zt];return y.prototype[A].apply(R,E)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,y,w){w||(w=0);const R=Array(16);if(typeof y=="string")for(var A=0;A<16;++A)R[A]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(A=0;A<16;++A)R[A]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=v.g[0],w=v.g[1],A=v.g[2];let C=v.g[3],E;E=y+(C^w&(A^C))+R[0]+3614090360&4294967295,y=w+(E<<7&4294967295|E>>>25),E=C+(A^y&(w^A))+R[1]+3905402710&4294967295,C=y+(E<<12&4294967295|E>>>20),E=A+(w^C&(y^w))+R[2]+606105819&4294967295,A=C+(E<<17&4294967295|E>>>15),E=w+(y^A&(C^y))+R[3]+3250441966&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(C^w&(A^C))+R[4]+4118548399&4294967295,y=w+(E<<7&4294967295|E>>>25),E=C+(A^y&(w^A))+R[5]+1200080426&4294967295,C=y+(E<<12&4294967295|E>>>20),E=A+(w^C&(y^w))+R[6]+2821735955&4294967295,A=C+(E<<17&4294967295|E>>>15),E=w+(y^A&(C^y))+R[7]+4249261313&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(C^w&(A^C))+R[8]+1770035416&4294967295,y=w+(E<<7&4294967295|E>>>25),E=C+(A^y&(w^A))+R[9]+2336552879&4294967295,C=y+(E<<12&4294967295|E>>>20),E=A+(w^C&(y^w))+R[10]+4294925233&4294967295,A=C+(E<<17&4294967295|E>>>15),E=w+(y^A&(C^y))+R[11]+2304563134&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(C^w&(A^C))+R[12]+1804603682&4294967295,y=w+(E<<7&4294967295|E>>>25),E=C+(A^y&(w^A))+R[13]+4254626195&4294967295,C=y+(E<<12&4294967295|E>>>20),E=A+(w^C&(y^w))+R[14]+2792965006&4294967295,A=C+(E<<17&4294967295|E>>>15),E=w+(y^A&(C^y))+R[15]+1236535329&4294967295,w=A+(E<<22&4294967295|E>>>10),E=y+(A^C&(w^A))+R[1]+4129170786&4294967295,y=w+(E<<5&4294967295|E>>>27),E=C+(w^A&(y^w))+R[6]+3225465664&4294967295,C=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(C^y))+R[11]+643717713&4294967295,A=C+(E<<14&4294967295|E>>>18),E=w+(C^y&(A^C))+R[0]+3921069994&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(A^C&(w^A))+R[5]+3593408605&4294967295,y=w+(E<<5&4294967295|E>>>27),E=C+(w^A&(y^w))+R[10]+38016083&4294967295,C=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(C^y))+R[15]+3634488961&4294967295,A=C+(E<<14&4294967295|E>>>18),E=w+(C^y&(A^C))+R[4]+3889429448&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(A^C&(w^A))+R[9]+568446438&4294967295,y=w+(E<<5&4294967295|E>>>27),E=C+(w^A&(y^w))+R[14]+3275163606&4294967295,C=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(C^y))+R[3]+4107603335&4294967295,A=C+(E<<14&4294967295|E>>>18),E=w+(C^y&(A^C))+R[8]+1163531501&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(A^C&(w^A))+R[13]+2850285829&4294967295,y=w+(E<<5&4294967295|E>>>27),E=C+(w^A&(y^w))+R[2]+4243563512&4294967295,C=y+(E<<9&4294967295|E>>>23),E=A+(y^w&(C^y))+R[7]+1735328473&4294967295,A=C+(E<<14&4294967295|E>>>18),E=w+(C^y&(A^C))+R[12]+2368359562&4294967295,w=A+(E<<20&4294967295|E>>>12),E=y+(w^A^C)+R[5]+4294588738&4294967295,y=w+(E<<4&4294967295|E>>>28),E=C+(y^w^A)+R[8]+2272392833&4294967295,C=y+(E<<11&4294967295|E>>>21),E=A+(C^y^w)+R[11]+1839030562&4294967295,A=C+(E<<16&4294967295|E>>>16),E=w+(A^C^y)+R[14]+4259657740&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(w^A^C)+R[1]+2763975236&4294967295,y=w+(E<<4&4294967295|E>>>28),E=C+(y^w^A)+R[4]+1272893353&4294967295,C=y+(E<<11&4294967295|E>>>21),E=A+(C^y^w)+R[7]+4139469664&4294967295,A=C+(E<<16&4294967295|E>>>16),E=w+(A^C^y)+R[10]+3200236656&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(w^A^C)+R[13]+681279174&4294967295,y=w+(E<<4&4294967295|E>>>28),E=C+(y^w^A)+R[0]+3936430074&4294967295,C=y+(E<<11&4294967295|E>>>21),E=A+(C^y^w)+R[3]+3572445317&4294967295,A=C+(E<<16&4294967295|E>>>16),E=w+(A^C^y)+R[6]+76029189&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(w^A^C)+R[9]+3654602809&4294967295,y=w+(E<<4&4294967295|E>>>28),E=C+(y^w^A)+R[12]+3873151461&4294967295,C=y+(E<<11&4294967295|E>>>21),E=A+(C^y^w)+R[15]+530742520&4294967295,A=C+(E<<16&4294967295|E>>>16),E=w+(A^C^y)+R[2]+3299628645&4294967295,w=A+(E<<23&4294967295|E>>>9),E=y+(A^(w|~C))+R[0]+4096336452&4294967295,y=w+(E<<6&4294967295|E>>>26),E=C+(w^(y|~A))+R[7]+1126891415&4294967295,C=y+(E<<10&4294967295|E>>>22),E=A+(y^(C|~w))+R[14]+2878612391&4294967295,A=C+(E<<15&4294967295|E>>>17),E=w+(C^(A|~y))+R[5]+4237533241&4294967295,w=A+(E<<21&4294967295|E>>>11),E=y+(A^(w|~C))+R[12]+1700485571&4294967295,y=w+(E<<6&4294967295|E>>>26),E=C+(w^(y|~A))+R[3]+2399980690&4294967295,C=y+(E<<10&4294967295|E>>>22),E=A+(y^(C|~w))+R[10]+4293915773&4294967295,A=C+(E<<15&4294967295|E>>>17),E=w+(C^(A|~y))+R[1]+2240044497&4294967295,w=A+(E<<21&4294967295|E>>>11),E=y+(A^(w|~C))+R[8]+1873313359&4294967295,y=w+(E<<6&4294967295|E>>>26),E=C+(w^(y|~A))+R[15]+4264355552&4294967295,C=y+(E<<10&4294967295|E>>>22),E=A+(y^(C|~w))+R[6]+2734768916&4294967295,A=C+(E<<15&4294967295|E>>>17),E=w+(C^(A|~y))+R[13]+1309151649&4294967295,w=A+(E<<21&4294967295|E>>>11),E=y+(A^(w|~C))+R[4]+4149444226&4294967295,y=w+(E<<6&4294967295|E>>>26),E=C+(w^(y|~A))+R[11]+3174756917&4294967295,C=y+(E<<10&4294967295|E>>>22),E=A+(y^(C|~w))+R[2]+718787259&4294967295,A=C+(E<<15&4294967295|E>>>17),E=w+(C^(A|~y))+R[9]+3951481745&4294967295,v.g[0]=v.g[0]+y&4294967295,v.g[1]=v.g[1]+(A+(E<<21&4294967295|E>>>11))&4294967295,v.g[2]=v.g[2]+A&4294967295,v.g[3]=v.g[3]+C&4294967295}r.prototype.v=function(v,y){y===void 0&&(y=v.length);const w=y-this.blockSize,R=this.C;let A=this.h,C=0;for(;C<y;){if(A==0)for(;C<=w;)s(this,v,C),C+=this.blockSize;if(typeof v=="string"){for(;C<y;)if(R[A++]=v.charCodeAt(C++),A==this.blockSize){s(this,R),A=0;break}}else for(;C<y;)if(R[A++]=v[C++],A==this.blockSize){s(this,R),A=0;break}}this.h=A,this.o+=y},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var y=1;y<v.length-8;++y)v[y]=0;y=this.o*8;for(var w=v.length-8;w<v.length;++w)v[w]=y&255,y/=256;for(this.v(v),v=Array(16),y=0,w=0;w<4;++w)for(let R=0;R<32;R+=8)v[y++]=this.g[w]>>>R&255;return v};function i(v,y){var w=c;return Object.prototype.hasOwnProperty.call(w,v)?w[v]:w[v]=y(v)}function o(v,y){this.h=y;const w=[];let R=!0;for(let A=v.length-1;A>=0;A--){const C=v[A]|0;R&&C==y||(w[A]=C,R=!1)}this.g=w}var c={};function u(v){return-128<=v&&v<128?i(v,function(y){return new o([y|0],y<0?-1:0)}):new o([v|0],v<0?-1:0)}function h(v){if(isNaN(v)||!isFinite(v))return m;if(v<0)return $(h(-v));const y=[];let w=1;for(let R=0;v>=w;R++)y[R]=v/w|0,w*=4294967296;return new o(y,0)}function p(v,y){if(v.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(v.charAt(0)=="-")return $(p(v.substring(1),y));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=h(Math.pow(y,8));let R=m;for(let C=0;C<v.length;C+=8){var A=Math.min(8,v.length-C);const E=parseInt(v.substring(C,C+A),y);A<8?(A=h(Math.pow(y,A)),R=R.j(A).add(h(E))):(R=R.j(w),R=R.add(h(E)))}return R}var m=u(0),T=u(1),P=u(16777216);n=o.prototype,n.m=function(){if(M(this))return-$(this).m();let v=0,y=1;for(let w=0;w<this.g.length;w++){const R=this.i(w);v+=(R>=0?R:4294967296+R)*y,y*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(O(this))return"0";if(M(this))return"-"+$(this).toString(v);const y=h(Math.pow(v,6));var w=this;let R="";for(;;){const A=me(w,y).g;w=Z(w,A.j(y));let C=((w.g.length>0?w.g[0]:w.h)>>>0).toString(v);if(w=A,O(w))return C+R;for(;C.length<6;)C="0"+C;R=C+R}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function O(v){if(v.h!=0)return!1;for(let y=0;y<v.g.length;y++)if(v.g[y]!=0)return!1;return!0}function M(v){return v.h==-1}n.l=function(v){return v=Z(this,v),M(v)?-1:O(v)?0:1};function $(v){const y=v.g.length,w=[];for(let R=0;R<y;R++)w[R]=~v.g[R];return new o(w,~v.h).add(T)}n.abs=function(){return M(this)?$(this):this},n.add=function(v){const y=Math.max(this.g.length,v.g.length),w=[];let R=0;for(let A=0;A<=y;A++){let C=R+(this.i(A)&65535)+(v.i(A)&65535),E=(C>>>16)+(this.i(A)>>>16)+(v.i(A)>>>16);R=E>>>16,C&=65535,E&=65535,w[A]=E<<16|C}return new o(w,w[w.length-1]&-2147483648?-1:0)};function Z(v,y){return v.add($(y))}n.j=function(v){if(O(this)||O(v))return m;if(M(this))return M(v)?$(this).j($(v)):$($(this).j(v));if(M(v))return $(this.j($(v)));if(this.l(P)<0&&v.l(P)<0)return h(this.m()*v.m());const y=this.g.length+v.g.length,w=[];for(var R=0;R<2*y;R++)w[R]=0;for(R=0;R<this.g.length;R++)for(let A=0;A<v.g.length;A++){const C=this.i(R)>>>16,E=this.i(R)&65535,Zt=v.i(A)>>>16,qn=v.i(A)&65535;w[2*R+2*A]+=E*qn,ut(w,2*R+2*A),w[2*R+2*A+1]+=C*qn,ut(w,2*R+2*A+1),w[2*R+2*A+1]+=E*Zt,ut(w,2*R+2*A+1),w[2*R+2*A+2]+=C*Zt,ut(w,2*R+2*A+2)}for(v=0;v<y;v++)w[v]=w[2*v+1]<<16|w[2*v];for(v=y;v<2*y;v++)w[v]=0;return new o(w,0)};function ut(v,y){for(;(v[y]&65535)!=v[y];)v[y+1]+=v[y]>>>16,v[y]&=65535,y++}function Et(v,y){this.g=v,this.h=y}function me(v,y){if(O(y))throw Error("division by zero");if(O(v))return new Et(m,m);if(M(v))return y=me($(v),y),new Et($(y.g),$(y.h));if(M(y))return y=me(v,$(y)),new Et($(y.g),y.h);if(v.g.length>30){if(M(v)||M(y))throw Error("slowDivide_ only works with positive integers.");for(var w=T,R=y;R.l(v)<=0;)w=Bt(w),R=Bt(R);var A=$t(w,1),C=$t(R,1);for(R=$t(R,2),w=$t(w,2);!O(R);){var E=C.add(R);E.l(v)<=0&&(A=A.add(w),C=E),R=$t(R,1),w=$t(w,1)}return y=Z(v,A.j(y)),new Et(A,y)}for(A=m;v.l(y)>=0;){for(w=Math.max(1,Math.floor(v.m()/y.m())),R=Math.ceil(Math.log(w)/Math.LN2),R=R<=48?1:Math.pow(2,R-48),C=h(w),E=C.j(y);M(E)||E.l(v)>0;)w-=R,C=h(w),E=C.j(y);O(C)&&(C=T),A=A.add(C),v=Z(v,E)}return new Et(A,v)}n.B=function(v){return me(this,v).h},n.and=function(v){const y=Math.max(this.g.length,v.g.length),w=[];for(let R=0;R<y;R++)w[R]=this.i(R)&v.i(R);return new o(w,this.h&v.h)},n.or=function(v){const y=Math.max(this.g.length,v.g.length),w=[];for(let R=0;R<y;R++)w[R]=this.i(R)|v.i(R);return new o(w,this.h|v.h)},n.xor=function(v){const y=Math.max(this.g.length,v.g.length),w=[];for(let R=0;R<y;R++)w[R]=this.i(R)^v.i(R);return new o(w,this.h^v.h)};function Bt(v){const y=v.g.length+1,w=[];for(let R=0;R<y;R++)w[R]=v.i(R)<<1|v.i(R-1)>>>31;return new o(w,v.h)}function $t(v,y){const w=y>>5;y%=32;const R=v.g.length-w,A=[];for(let C=0;C<R;C++)A[C]=y>0?v.i(C+w)>>>y|v.i(C+w+1)<<32-y:v.i(C+w);return new o(A,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,M2=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,In=o}).apply(typeof dl<"u"?dl:typeof self<"u"?self:typeof window<"u"?window:{});var Li=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var F2,Es,U2,Ki,t1,B2,$2,q2;(function(){var n,t=Object.defineProperty;function e(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Li=="object"&&Li];for(var l=0;l<a.length;++l){var f=a[l];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=e(this);function s(a,l){if(l)t:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var S=a[g];if(!(S in f))break t;f=f[S]}a=a[a.length-1],g=f[a],l=l(g),l!=g&&l!=null&&t(f,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var f=[],g;for(g in l)Object.prototype.hasOwnProperty.call(l,g)&&f.push([g,l[g]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function u(a,l,f){return a.call.apply(a.bind,arguments)}function h(a,l,f){return h=u,h.apply(null,arguments)}function p(a,l){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function m(a,l){function f(){}f.prototype=l.prototype,a.Z=l.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(g,S,N){for(var U=Array(arguments.length-2),nt=2;nt<arguments.length;nt++)U[nt-2]=arguments[nt];return l.prototype[S].apply(g,U)}}var T=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function P(a){const l=a.length;if(l>0){const f=Array(l);for(let g=0;g<l;g++)f[g]=a[g];return f}return[]}function O(a,l){for(let g=1;g<arguments.length;g++){const S=arguments[g];var f=typeof S;if(f=f!="object"?f:S?Array.isArray(S)?"array":f:"null",f=="array"||f=="object"&&typeof S.length=="number"){f=a.length||0;const N=S.length||0;a.length=f+N;for(let U=0;U<N;U++)a[f+U]=S[U]}else a.push(S)}}class M{constructor(l,f){this.i=l,this.j=f,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function $(a){o.setTimeout(()=>{throw a},0)}function Z(){var a=v;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class ut{constructor(){this.h=this.g=null}add(l,f){const g=Et.get();g.set(l,f),this.h?this.h.next=g:this.g=g,this.h=g}}var Et=new M(()=>new me,a=>a.reset());class me{constructor(){this.next=this.g=this.h=null}set(l,f){this.h=l,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Bt,$t=!1,v=new ut,y=()=>{const a=Promise.resolve(void 0);Bt=()=>{a.then(w)}};function w(){for(var a;a=Z();){try{a.h.call(a.g)}catch(f){$(f)}var l=Et;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}$t=!1}function R(){this.u=this.u,this.C=this.C}R.prototype.u=!1,R.prototype.dispose=function(){this.u||(this.u=!0,this.N())},R.prototype[Symbol.dispose]=function(){this.dispose()},R.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var C=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,l),o.removeEventListener("test",f,l)}catch{}return a})();function E(a){return/^[\s\xa0]*$/.test(a)}function Zt(a,l){A.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}m(Zt,A),Zt.prototype.init=function(a,l){const f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(f=="mouseover"?l=a.fromElement:f=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Zt.Z.h.call(this)},Zt.prototype.h=function(){Zt.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var qn="closure_listenable_"+(Math.random()*1e6|0),ld=0;function hd(a,l,f,g,S){this.listener=a,this.proxy=null,this.src=l,this.type=f,this.capture=!!g,this.ha=S,this.key=++ld,this.da=this.fa=!1}function wi(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ti(a,l,f){for(const g in a)l.call(f,a[g],g,a)}function fd(a,l){for(const f in a)l.call(void 0,a[f],f,a)}function Lc(a){const l={};for(const f in a)l[f]=a[f];return l}const Mc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Fc(a,l){let f,g;for(let S=1;S<arguments.length;S++){g=arguments[S];for(f in g)a[f]=g[f];for(let N=0;N<Mc.length;N++)f=Mc[N],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function Ii(a){this.src=a,this.g={},this.h=0}Ii.prototype.add=function(a,l,f,g,S){const N=a.toString();a=this.g[N],a||(a=this.g[N]=[],this.h++);const U=oa(a,l,g,S);return U>-1?(l=a[U],f||(l.fa=!1)):(l=new hd(l,this.src,N,!!g,S),l.fa=f,a.push(l)),l};function ia(a,l){const f=l.type;if(f in a.g){var g=a.g[f],S=Array.prototype.indexOf.call(g,l,void 0),N;(N=S>=0)&&Array.prototype.splice.call(g,S,1),N&&(wi(l),a.g[f].length==0&&(delete a.g[f],a.h--))}}function oa(a,l,f,g){for(let S=0;S<a.length;++S){const N=a[S];if(!N.da&&N.listener==l&&N.capture==!!f&&N.ha==g)return S}return-1}var aa="closure_lm_"+(Math.random()*1e6|0),ca={};function Uc(a,l,f,g,S){if(Array.isArray(l)){for(let N=0;N<l.length;N++)Uc(a,l[N],f,g,S);return null}return f=qc(f),a&&a[qn]?a.J(l,f,c(g)?!!g.capture:!1,S):dd(a,l,f,!1,g,S)}function dd(a,l,f,g,S,N){if(!l)throw Error("Invalid event type");const U=c(S)?!!S.capture:!!S;let nt=la(a);if(nt||(a[aa]=nt=new Ii(a)),f=nt.add(l,f,g,U,N),f.proxy)return f;if(g=pd(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)C||(S=U),S===void 0&&(S=!1),a.addEventListener(l.toString(),g,S);else if(a.attachEvent)a.attachEvent($c(l.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function pd(){function a(f){return l.call(a.src,a.listener,f)}const l=gd;return a}function Bc(a,l,f,g,S){if(Array.isArray(l))for(var N=0;N<l.length;N++)Bc(a,l[N],f,g,S);else g=c(g)?!!g.capture:!!g,f=qc(f),a&&a[qn]?(a=a.i,N=String(l).toString(),N in a.g&&(l=a.g[N],f=oa(l,f,g,S),f>-1&&(wi(l[f]),Array.prototype.splice.call(l,f,1),l.length==0&&(delete a.g[N],a.h--)))):a&&(a=la(a))&&(l=a.g[l.toString()],a=-1,l&&(a=oa(l,f,g,S)),(f=a>-1?l[a]:null)&&ua(f))}function ua(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[qn])ia(l.i,a);else{var f=a.type,g=a.proxy;l.removeEventListener?l.removeEventListener(f,g,a.capture):l.detachEvent?l.detachEvent($c(f),g):l.addListener&&l.removeListener&&l.removeListener(g),(f=la(l))?(ia(f,a),f.h==0&&(f.src=null,l[aa]=null)):wi(a)}}}function $c(a){return a in ca?ca[a]:ca[a]="on"+a}function gd(a,l){if(a.da)a=!0;else{l=new Zt(l,this);const f=a.listener,g=a.ha||a.src;a.fa&&ua(a),a=f.call(g,l)}return a}function la(a){return a=a[aa],a instanceof Ii?a:null}var ha="__closure_events_fn_"+(Math.random()*1e9>>>0);function qc(a){return typeof a=="function"?a:(a[ha]||(a[ha]=function(l){return a.handleEvent(l)}),a[ha])}function qt(){R.call(this),this.i=new Ii(this),this.M=this,this.G=null}m(qt,R),qt.prototype[qn]=!0,qt.prototype.removeEventListener=function(a,l,f,g){Bc(this,a,l,f,g)};function Yt(a,l){var f,g=a.G;if(g)for(f=[];g;g=g.G)f.push(g);if(a=a.M,g=l.type||l,typeof l=="string")l=new A(l,a);else if(l instanceof A)l.target=l.target||a;else{var S=l;l=new A(g,a),Fc(l,S)}S=!0;let N,U;if(f)for(U=f.length-1;U>=0;U--)N=l.g=f[U],S=Ai(N,g,!0,l)&&S;if(N=l.g=a,S=Ai(N,g,!0,l)&&S,S=Ai(N,g,!1,l)&&S,f)for(U=0;U<f.length;U++)N=l.g=f[U],S=Ai(N,g,!1,l)&&S}qt.prototype.N=function(){if(qt.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const f=a.g[l];for(let g=0;g<f.length;g++)wi(f[g]);delete a.g[l],a.h--}}this.G=null},qt.prototype.J=function(a,l,f,g){return this.i.add(String(a),l,!1,f,g)},qt.prototype.K=function(a,l,f,g){return this.i.add(String(a),l,!0,f,g)};function Ai(a,l,f,g){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let S=!0;for(let N=0;N<l.length;++N){const U=l[N];if(U&&!U.da&&U.capture==f){const nt=U.listener,Ot=U.ha||U.src;U.fa&&ia(a.i,U),S=nt.call(Ot,g)!==!1&&S}}return S&&!g.defaultPrevented}function md(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Hc(a){a.g=md(()=>{a.g=null,a.i&&(a.i=!1,Hc(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class _d extends R{constructor(l,f){super(),this.m=l,this.l=f,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Hc(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Zr(a){R.call(this),this.h=a,this.g={}}m(Zr,R);var jc=[];function Gc(a){Ti(a.g,function(l,f){this.g.hasOwnProperty(f)&&ua(l)},a),a.g={}}Zr.prototype.N=function(){Zr.Z.N.call(this),Gc(this)},Zr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var fa=o.JSON.stringify,yd=o.JSON.parse,Ed=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function zc(){}function Wc(){}var ts={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function da(){A.call(this,"d")}m(da,A);function pa(){A.call(this,"c")}m(pa,A);var Hn={},Kc=null;function vi(){return Kc=Kc||new qt}Hn.Ia="serverreachability";function Yc(a){A.call(this,Hn.Ia,a)}m(Yc,A);function es(a){const l=vi();Yt(l,new Yc(l))}Hn.STAT_EVENT="statevent";function Qc(a,l){A.call(this,Hn.STAT_EVENT,a),this.stat=l}m(Qc,A);function Qt(a){const l=vi();Yt(l,new Qc(l,a))}Hn.Ja="timingevent";function Xc(a,l){A.call(this,Hn.Ja,a),this.size=l}m(Xc,A);function ns(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function rs(){this.g=!0}rs.prototype.ua=function(){this.g=!1};function wd(a,l,f,g,S,N){a.info(function(){if(a.g)if(N){var U="",nt=N.split("&");for(let ht=0;ht<nt.length;ht++){var Ot=nt[ht].split("=");if(Ot.length>1){const Vt=Ot[0];Ot=Ot[1];const Ce=Vt.split("_");U=Ce.length>=2&&Ce[1]=="type"?U+(Vt+"="+Ot+"&"):U+(Vt+"=redacted&")}}}else U=null;else U=N;return"XMLHTTP REQ ("+g+") [attempt "+S+"]: "+l+`
`+f+`
`+U})}function Td(a,l,f,g,S,N,U){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+S+"]: "+l+`
`+f+`
`+N+" "+U})}function pr(a,l,f,g){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Ad(a,f)+(g?" "+g:"")})}function Id(a,l){a.info(function(){return"TIMEOUT: "+l})}rs.prototype.info=function(){};function Ad(a,l){if(!a.g)return l;if(!l)return null;try{const N=JSON.parse(l);if(N){for(a=0;a<N.length;a++)if(Array.isArray(N[a])){var f=N[a];if(!(f.length<2)){var g=f[1];if(Array.isArray(g)&&!(g.length<1)){var S=g[0];if(S!="noop"&&S!="stop"&&S!="close")for(let U=1;U<g.length;U++)g[U]=""}}}}return fa(N)}catch{return l}}var Ri={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Jc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Zc;function ga(){}m(ga,zc),ga.prototype.g=function(){return new XMLHttpRequest},Zc=new ga;function ss(a){return encodeURIComponent(String(a))}function vd(a){var l=1;a=a.split(":");const f=[];for(;l>0&&a.length;)f.push(a.shift()),l--;return a.length&&f.push(a.join(":")),f}function sn(a,l,f,g){this.j=a,this.i=l,this.l=f,this.S=g||1,this.V=new Zr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new tu}function tu(){this.i=null,this.g="",this.h=!1}var eu={},ma={};function _a(a,l,f){a.M=1,a.A=Ci(Se(l)),a.u=f,a.R=!0,nu(a,null)}function nu(a,l){a.F=Date.now(),Si(a),a.B=Se(a.A);var f=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),gu(f.i,"t",g),a.C=0,f=a.j.L,a.h=new tu,a.g=ku(a.j,f?l:null,!a.u),a.P>0&&(a.O=new _d(h(a.Y,a,a.g),a.P)),l=a.V,f=a.g,g=a.ba;var S="readystatechange";Array.isArray(S)||(S&&(jc[0]=S.toString()),S=jc);for(let N=0;N<S.length;N++){const U=Uc(f,S[N],g||l.handleEvent,!1,l.h||l);if(!U)break;l.g[U.key]=U}l=a.J?Lc(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),es(),wd(a.i,a.v,a.B,a.l,a.S,a.u)}sn.prototype.ba=function(a){a=a.target;const l=this.O;l&&cn(a)==3?l.j():this.Y(a)},sn.prototype.Y=function(a){try{if(a==this.g)t:{const nt=cn(this.g),Ot=this.g.ya(),ht=this.g.ca();if(!(nt<3)&&(nt!=3||this.g&&(this.h.h||this.g.la()||Iu(this.g)))){this.K||nt!=4||Ot==7||(Ot==8||ht<=0?es(3):es(2)),ya(this);var l=this.g.ca();this.X=l;var f=Rd(this);if(this.o=l==200,Td(this.i,this.v,this.B,this.l,this.S,nt,l),this.o){if(this.U&&!this.L){e:{if(this.g){var g,S=this.g;if((g=S.g?S.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(g)){var N=g;break e}}N=null}if(a=N)pr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ea(this,a);else{this.o=!1,this.m=3,Qt(12),jn(this),is(this);break t}}if(this.R){a=!0;let Vt;for(;!this.K&&this.C<f.length;)if(Vt=Sd(this,f),Vt==ma){nt==4&&(this.m=4,Qt(14),a=!1),pr(this.i,this.l,null,"[Incomplete Response]");break}else if(Vt==eu){this.m=4,Qt(15),pr(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else pr(this.i,this.l,Vt,null),Ea(this,Vt);if(ru(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),nt!=4||f.length!=0||this.h.h||(this.m=1,Qt(16),a=!1),this.o=this.o&&a,!a)pr(this.i,this.l,f,"[Invalid Chunked Response]"),jn(this),is(this);else if(f.length>0&&!this.W){this.W=!0;var U=this.j;U.g==this&&U.aa&&!U.P&&(U.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),Ca(U),U.P=!0,Qt(11))}}else pr(this.i,this.l,f,null),Ea(this,f);nt==4&&jn(this),this.o&&!this.K&&(nt==4?bu(this.j,this):(this.o=!1,Si(this)))}else Bd(this.g),l==400&&f.indexOf("Unknown SID")>0?(this.m=3,Qt(12)):(this.m=0,Qt(13)),jn(this),is(this)}}}catch{}finally{}};function Rd(a){if(!ru(a))return a.g.la();const l=Iu(a.g);if(l==="")return"";let f="";const g=l.length,S=cn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return jn(a),is(a),"";a.h.i=new o.TextDecoder}for(let N=0;N<g;N++)a.h.h=!0,f+=a.h.i.decode(l[N],{stream:!(S&&N==g-1)});return l.length=0,a.h.g+=f,a.C=0,a.h.g}function ru(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Sd(a,l){var f=a.C,g=l.indexOf(`
`,f);return g==-1?ma:(f=Number(l.substring(f,g)),isNaN(f)?eu:(g+=1,g+f>l.length?ma:(l=l.slice(g,g+f),a.C=g+f,l)))}sn.prototype.cancel=function(){this.K=!0,jn(this)};function Si(a){a.T=Date.now()+a.H,su(a,a.H)}function su(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=ns(h(a.aa,a),l)}function ya(a){a.D&&(o.clearTimeout(a.D),a.D=null)}sn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Id(this.i,this.B),this.M!=2&&(es(),Qt(17)),jn(this),this.m=2,is(this)):su(this,this.T-a)};function is(a){a.j.I==0||a.K||bu(a.j,a)}function jn(a){ya(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Gc(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function Ea(a,l){try{var f=a.j;if(f.I!=0&&(f.g==a||wa(f.h,a))){if(!a.L&&wa(f.h,a)&&f.I==3){try{var g=f.Ba.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var S=g;if(S[0]==0){t:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)Di(f),Ni(f);else break t;Sa(f),Qt(18)}}else f.xa=S[1],0<f.xa-f.K&&S[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=ns(h(f.Va,f),6e3));au(f.h)<=1&&f.ta&&(f.ta=void 0)}else zn(f,11)}else if((a.L||f.g==a)&&Di(f),!E(l))for(S=f.Ba.g.parse(l),l=0;l<S.length;l++){let ht=S[l];const Vt=ht[0];if(!(Vt<=f.K))if(f.K=Vt,ht=ht[1],f.I==2)if(ht[0]=="c"){f.M=ht[1],f.ba=ht[2];const Ce=ht[3];Ce!=null&&(f.ka=Ce,f.j.info("VER="+f.ka));const Wn=ht[4];Wn!=null&&(f.za=Wn,f.j.info("SVER="+f.za));const un=ht[5];un!=null&&typeof un=="number"&&un>0&&(g=1.5*un,f.O=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const ln=a.g;if(ln){const Vi=ln.g?ln.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Vi){var N=g.h;N.g||Vi.indexOf("spdy")==-1&&Vi.indexOf("quic")==-1&&Vi.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(Ta(N,N.h),N.h=null))}if(g.G){const Pa=ln.g?ln.g.getResponseHeader("X-HTTP-Session-Id"):null;Pa&&(g.wa=Pa,dt(g.J,g.G,Pa))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),g=f;var U=a;if(g.na=Du(g,g.L?g.ba:null,g.W),U.L){cu(g.h,U);var nt=U,Ot=g.O;Ot&&(nt.H=Ot),nt.D&&(ya(nt),Si(nt)),g.g=U}else Cu(g);f.i.length>0&&Oi(f)}else ht[0]!="stop"&&ht[0]!="close"||zn(f,7);else f.I==3&&(ht[0]=="stop"||ht[0]=="close"?ht[0]=="stop"?zn(f,7):Ra(f):ht[0]!="noop"&&f.l&&f.l.qa(ht),f.A=0)}}es(4)}catch{}}var Cd=class{constructor(a,l){this.g=a,this.map=l}};function iu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ou(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function au(a){return a.h?1:a.g?a.g.size:0}function wa(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Ta(a,l){a.g?a.g.add(l):a.h=l}function cu(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}iu.prototype.cancel=function(){if(this.i=uu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function uu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const f of a.g.values())l=l.concat(f.G);return l}return P(a.i)}var lu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Pd(a,l){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const g=a[f].indexOf("=");let S,N=null;g>=0?(S=a[f].substring(0,g),N=a[f].substring(g+1)):S=a[f],l(S,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function on(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof on?(this.l=a.l,os(this,a.j),this.o=a.o,this.g=a.g,as(this,a.u),this.h=a.h,Ia(this,mu(a.i)),this.m=a.m):a&&(l=String(a).match(lu))?(this.l=!1,os(this,l[1]||"",!0),this.o=cs(l[2]||""),this.g=cs(l[3]||"",!0),as(this,l[4]),this.h=cs(l[5]||"",!0),Ia(this,l[6]||"",!0),this.m=cs(l[7]||"")):(this.l=!1,this.i=new ls(null,this.l))}on.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(us(l,hu,!0),":");var f=this.g;return(f||l=="file")&&(a.push("//"),(l=this.o)&&a.push(us(l,hu,!0),"@"),a.push(ss(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(us(f,f.charAt(0)=="/"?Od:Nd,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",us(f,kd)),a.join("")},on.prototype.resolve=function(a){const l=Se(this);let f=!!a.j;f?os(l,a.j):f=!!a.o,f?l.o=a.o:f=!!a.g,f?l.g=a.g:f=a.u!=null;var g=a.h;if(f)as(l,a.u);else if(f=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var S=l.h.lastIndexOf("/");S!=-1&&(g=l.h.slice(0,S+1)+g)}if(S=g,S==".."||S==".")g="";else if(S.indexOf("./")!=-1||S.indexOf("/.")!=-1){g=S.lastIndexOf("/",0)==0,S=S.split("/");const N=[];for(let U=0;U<S.length;){const nt=S[U++];nt=="."?g&&U==S.length&&N.push(""):nt==".."?((N.length>1||N.length==1&&N[0]!="")&&N.pop(),g&&U==S.length&&N.push("")):(N.push(nt),g=!0)}g=N.join("/")}else g=S}return f?l.h=g:f=a.i.toString()!=="",f?Ia(l,mu(a.i)):f=!!a.m,f&&(l.m=a.m),l};function Se(a){return new on(a)}function os(a,l,f){a.j=f?cs(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function as(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function Ia(a,l,f){l instanceof ls?(a.i=l,Vd(a.i,a.l)):(f||(l=us(l,Dd)),a.i=new ls(l,a.l))}function dt(a,l,f){a.i.set(l,f)}function Ci(a){return dt(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function cs(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function us(a,l,f){return typeof a=="string"?(a=encodeURI(a).replace(l,bd),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function bd(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var hu=/[#\/\?@]/g,Nd=/[#\?:]/g,Od=/[#\?]/g,Dd=/[#\?@]/g,kd=/#/g;function ls(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function Gn(a){a.g||(a.g=new Map,a.h=0,a.i&&Pd(a.i,function(l,f){a.add(decodeURIComponent(l.replace(/\+/g," ")),f)}))}n=ls.prototype,n.add=function(a,l){Gn(this),this.i=null,a=gr(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(l),this.h+=1,this};function fu(a,l){Gn(a),l=gr(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function du(a,l){return Gn(a),l=gr(a,l),a.g.has(l)}n.forEach=function(a,l){Gn(this),this.g.forEach(function(f,g){f.forEach(function(S){a.call(l,S,g,this)},this)},this)};function pu(a,l){Gn(a);let f=[];if(typeof l=="string")du(a,l)&&(f=f.concat(a.g.get(gr(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)f=f.concat(a[l]);return f}n.set=function(a,l){return Gn(this),this.i=null,a=gr(this,a),du(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=pu(this,a),a.length>0?String(a[0]):l):l};function gu(a,l,f){fu(a,l),f.length>0&&(a.i=null,a.g.set(gr(a,l),P(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let g=0;g<l.length;g++){var f=l[g];const S=ss(f);f=pu(this,f);for(let N=0;N<f.length;N++){let U=S;f[N]!==""&&(U+="="+ss(f[N])),a.push(U)}}return this.i=a.join("&")};function mu(a){const l=new ls;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function gr(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Vd(a,l){l&&!a.j&&(Gn(a),a.i=null,a.g.forEach(function(f,g){const S=g.toLowerCase();g!=S&&(fu(this,g),gu(this,S,f))},a)),a.j=l}function xd(a,l){const f=new rs;if(o.Image){const g=new Image;g.onload=p(an,f,"TestLoadImage: loaded",!0,l,g),g.onerror=p(an,f,"TestLoadImage: error",!1,l,g),g.onabort=p(an,f,"TestLoadImage: abort",!1,l,g),g.ontimeout=p(an,f,"TestLoadImage: timeout",!1,l,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else l(!1)}function Ld(a,l){const f=new rs,g=new AbortController,S=setTimeout(()=>{g.abort(),an(f,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:g.signal}).then(N=>{clearTimeout(S),N.ok?an(f,"TestPingServer: ok",!0,l):an(f,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(S),an(f,"TestPingServer: error",!1,l)})}function an(a,l,f,g,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),g(f)}catch{}}function Md(){this.g=new Ed}function Aa(a){this.i=a.Sb||null,this.h=a.ab||!1}m(Aa,zc),Aa.prototype.g=function(){return new Pi(this.i,this.h)};function Pi(a,l){qt.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Pi,qt),n=Pi.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,fs(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,hs(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,fs(this)),this.g&&(this.readyState=3,fs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;_u(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function _u(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?hs(this):fs(this),this.readyState==3&&_u(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,hs(this))},n.Na=function(a){this.g&&(this.response=a,hs(this))},n.ga=function(){this.g&&hs(this)};function hs(a){a.readyState=4,a.l=null,a.j=null,a.B=null,fs(a)}n.setRequestHeader=function(a,l){this.A.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var f=l.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=l.next();return a.join(`\r
`)};function fs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Pi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function yu(a){let l="";return Ti(a,function(f,g){l+=g,l+=":",l+=f,l+=`\r
`}),l}function va(a,l,f){t:{for(g in f){var g=!1;break t}g=!0}g||(f=yu(f),typeof a=="string"?f!=null&&ss(f):dt(a,l,f))}function wt(a){qt.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(wt,qt);var Fd=/^https?$/i,Ud=["POST","PUT"];n=wt.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,l,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Zc.g(),this.g.onreadystatechange=T(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(N){Eu(this,N);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var S in g)f.set(S,g[S]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const N of g.keys())f.set(N,g.get(N));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(N=>N.toLowerCase()=="content-type"),S=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Ud,l,void 0)>=0)||g||S||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,U]of f)this.g.setRequestHeader(N,U);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(N){Eu(this,N)}};function Eu(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,wu(a),bi(a)}function wu(a){a.A||(a.A=!0,Yt(a,"complete"),Yt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Yt(this,"complete"),Yt(this,"abort"),bi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),bi(this,!0)),wt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Tu(this):this.Xa())},n.Xa=function(){Tu(this)};function Tu(a){if(a.h&&typeof i<"u"){if(a.v&&cn(a)==4)setTimeout(a.Ca.bind(a),0);else if(Yt(a,"readystatechange"),cn(a)==4){a.h=!1;try{const N=a.ca();t:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var f;if(!(f=l)){var g;if(g=N===0){let U=String(a.D).match(lu)[1]||null;!U&&o.self&&o.self.location&&(U=o.self.location.protocol.slice(0,-1)),g=!Fd.test(U?U.toLowerCase():"")}f=g}if(f)Yt(a,"complete"),Yt(a,"success");else{a.o=6;try{var S=cn(a)>2?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.ca()+"]",wu(a)}}finally{bi(a)}}}}function bi(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,l||Yt(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function cn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return cn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),yd(l)}};function Iu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Bd(a){const l={};a=(a.g&&cn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(E(a[g]))continue;var f=vd(a[g]);const S=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const N=l[S]||[];l[S]=N,N.push(f)}fd(l,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function ds(a,l,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||l}function Au(a){this.za=0,this.i=[],this.j=new rs,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=ds("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=ds("baseRetryDelayMs",5e3,a),this.Za=ds("retryDelaySeedMs",1e4,a),this.Ta=ds("forwardChannelMaxRetries",2,a),this.va=ds("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new iu(a&&a.concurrentRequestLimit),this.Ba=new Md,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Au.prototype,n.ka=8,n.I=1,n.connect=function(a,l,f,g){Qt(0),this.W=a,this.H=l||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.J=Du(this,null,this.W),Oi(this)};function Ra(a){if(vu(a),a.I==3){var l=a.V++,f=Se(a.J);if(dt(f,"SID",a.M),dt(f,"RID",l),dt(f,"TYPE","terminate"),ps(a,f),l=new sn(a,a.j,l),l.M=2,l.A=Ci(Se(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=l.A,f=!0),f||(l.g=ku(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Si(l)}Ou(a)}function Ni(a){a.g&&(Ca(a),a.g.cancel(),a.g=null)}function vu(a){Ni(a),a.v&&(o.clearTimeout(a.v),a.v=null),Di(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Oi(a){if(!ou(a.h)&&!a.m){a.m=!0;var l=a.Ea;Bt||y(),$t||(Bt(),$t=!0),v.add(l,a),a.D=0}}function $d(a,l){return au(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=ns(h(a.Ea,a,l),Nu(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const S=new sn(this,this.j,a);let N=this.o;if(this.U&&(N?(N=Lc(N),Fc(N,this.U)):N=this.U),this.u!==null||this.R||(S.J=N,N=null),this.S)t:{for(var l=0,f=0;f<this.i.length;f++){e:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(l+=g,l>4096){l=f;break t}if(l===4096||f===this.i.length-1){l=f+1;break t}}l=1e3}else l=1e3;l=Su(this,S,l),f=Se(this.J),dt(f,"RID",a),dt(f,"CVER",22),this.G&&dt(f,"X-HTTP-Session-Id",this.G),ps(this,f),N&&(this.R?l="headers="+ss(yu(N))+"&"+l:this.u&&va(f,this.u,N)),Ta(this.h,S),this.Ra&&dt(f,"TYPE","init"),this.S?(dt(f,"$req",l),dt(f,"SID","null"),S.U=!0,_a(S,f,null)):_a(S,f,l),this.I=2}}else this.I==3&&(a?Ru(this,a):this.i.length==0||ou(this.h)||Ru(this))};function Ru(a,l){var f;l?f=l.l:f=a.V++;const g=Se(a.J);dt(g,"SID",a.M),dt(g,"RID",f),dt(g,"AID",a.K),ps(a,g),a.u&&a.o&&va(g,a.u,a.o),f=new sn(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),l&&(a.i=l.G.concat(a.i)),l=Su(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Ta(a.h,f),_a(f,g,l)}function ps(a,l){a.H&&Ti(a.H,function(f,g){dt(l,g,f)}),a.l&&Ti({},function(f,g){dt(l,g,f)})}function Su(a,l,f){f=Math.min(a.i.length,f);const g=a.l?h(a.l.Ka,a.l,a):null;t:{var S=a.i;let nt=-1;for(;;){const Ot=["count="+f];nt==-1?f>0?(nt=S[0].g,Ot.push("ofs="+nt)):nt=0:Ot.push("ofs="+nt);let ht=!0;for(let Vt=0;Vt<f;Vt++){var N=S[Vt].g;const Ce=S[Vt].map;if(N-=nt,N<0)nt=Math.max(0,S[Vt].g-100),ht=!1;else try{N="req"+N+"_"||"";try{var U=Ce instanceof Map?Ce:Object.entries(Ce);for(const[Wn,un]of U){let ln=un;c(un)&&(ln=fa(un)),Ot.push(N+Wn+"="+encodeURIComponent(ln))}}catch(Wn){throw Ot.push(N+"type="+encodeURIComponent("_badmap")),Wn}}catch{g&&g(Ce)}}if(ht){U=Ot.join("&");break t}}U=void 0}return a=a.i.splice(0,f),l.G=a,U}function Cu(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;Bt||y(),$t||(Bt(),$t=!0),v.add(l,a),a.A=0}}function Sa(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=ns(h(a.Da,a),Nu(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Pu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=ns(h(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Qt(10),Ni(this),Pu(this))};function Ca(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Pu(a){a.g=new sn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=Se(a.na);dt(l,"RID","rpc"),dt(l,"SID",a.M),dt(l,"AID",a.K),dt(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&dt(l,"TO",a.ia),dt(l,"TYPE","xmlhttp"),ps(a,l),a.u&&a.o&&va(l,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=Ci(Se(l)),f.u=null,f.R=!0,nu(f,a)}n.Va=function(){this.C!=null&&(this.C=null,Ni(this),Sa(this),Qt(19))};function Di(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function bu(a,l){var f=null;if(a.g==l){Di(a),Ca(a),a.g=null;var g=2}else if(wa(a.h,l))f=l.G,cu(a.h,l),g=1;else return;if(a.I!=0){if(l.o)if(g==1){f=l.u?l.u.length:0,l=Date.now()-l.F;var S=a.D;g=vi(),Yt(g,new Xc(g,f)),Oi(a)}else Cu(a);else if(S=l.m,S==3||S==0&&l.X>0||!(g==1&&$d(a,l)||g==2&&Sa(a)))switch(f&&f.length>0&&(l=a.h,l.i=l.i.concat(f)),S){case 1:zn(a,5);break;case 4:zn(a,10);break;case 3:zn(a,6);break;default:zn(a,2)}}}function Nu(a,l){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*l}function zn(a,l){if(a.j.info("Error code "+l),l==2){var f=h(a.bb,a),g=a.Ua;const S=!g;g=new on(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||os(g,"https"),Ci(g),S?xd(g.toString(),f):Ld(g.toString(),f)}else Qt(2);a.I=0,a.l&&a.l.pa(l),Ou(a),vu(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Qt(2)):(this.j.info("Failed to ping google.com"),Qt(1))};function Ou(a){if(a.I=0,a.ja=[],a.l){const l=uu(a.h);(l.length!=0||a.i.length!=0)&&(O(a.ja,l),O(a.ja,a.i),a.h.i.length=0,P(a.i),a.i.length=0),a.l.oa()}}function Du(a,l,f){var g=f instanceof on?Se(f):new on(f);if(g.g!="")l&&(g.g=l+"."+g.g),as(g,g.u);else{var S=o.location;g=S.protocol,l=l?l+"."+S.hostname:S.hostname,S=+S.port;const N=new on(null);g&&os(N,g),l&&(N.g=l),S&&as(N,S),f&&(N.h=f),g=N}return f=a.G,l=a.wa,f&&l&&dt(g,f,l),dt(g,"VER",a.ka),ps(a,g),g}function ku(a,l,f){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new wt(new Aa({ab:f})):new wt(a.ma),l.Fa(a.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Vu(){}n=Vu.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function ki(){}ki.prototype.g=function(a,l){return new ae(a,l)};function ae(a,l){qt.call(this),this.g=new Au(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!E(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!E(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new mr(this)}m(ae,qt),ae.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ae.prototype.close=function(){Ra(this.g)},ae.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=fa(a),a=f);l.i.push(new Cd(l.Ya++,a)),l.I==3&&Oi(l)},ae.prototype.N=function(){this.g.l=null,delete this.j,Ra(this.g),delete this.g,ae.Z.N.call(this)};function xu(a){da.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){t:{for(const f in l){a=f;break t}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}m(xu,da);function Lu(){pa.call(this),this.status=1}m(Lu,pa);function mr(a){this.g=a}m(mr,Vu),mr.prototype.ra=function(){Yt(this.g,"a")},mr.prototype.qa=function(a){Yt(this.g,new xu(a))},mr.prototype.pa=function(a){Yt(this.g,new Lu)},mr.prototype.oa=function(){Yt(this.g,"b")},ki.prototype.createWebChannel=ki.prototype.g,ae.prototype.send=ae.prototype.o,ae.prototype.open=ae.prototype.m,ae.prototype.close=ae.prototype.close,q2=function(){return new ki},$2=function(){return vi()},B2=Hn,t1={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ri.NO_ERROR=0,Ri.TIMEOUT=8,Ri.HTTP_ERROR=6,Ki=Ri,Jc.COMPLETE="complete",U2=Jc,Wc.EventType=ts,ts.OPEN="a",ts.CLOSE="b",ts.ERROR="c",ts.MESSAGE="d",qt.prototype.listen=qt.prototype.J,Es=Wc,wt.prototype.listenOnce=wt.prototype.K,wt.prototype.getLastError=wt.prototype.Ha,wt.prototype.getLastErrorCode=wt.prototype.ya,wt.prototype.getStatus=wt.prototype.ca,wt.prototype.getResponseJson=wt.prototype.La,wt.prototype.getResponseText=wt.prototype.la,wt.prototype.send=wt.prototype.ea,wt.prototype.setWithCredentials=wt.prototype.Fa,F2=wt}).apply(typeof Li<"u"?Li:typeof self<"u"?self:typeof window<"u"?window:{});/*!
 * re2js
 * RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
 *
 * @version v0.4.3
 * @author Alexey Vasiliev
 * @homepage https://github.com/le0pard/re2js#readme
 * @repository github:le0pard/re2js
 * @license MIT
 */const mt=class mt{};_(mt,"FOLD_CASE",1),_(mt,"LITERAL",2),_(mt,"CLASS_NL",4),_(mt,"DOT_NL",8),_(mt,"ONE_LINE",16),_(mt,"NON_GREEDY",32),_(mt,"PERL_X",64),_(mt,"UNICODE_GROUPS",128),_(mt,"WAS_DOLLAR",256),_(mt,"MATCH_NL",mt.CLASS_NL|mt.DOT_NL),_(mt,"PERL",mt.CLASS_NL|mt.ONE_LINE|mt.PERL_X|mt.UNICODE_GROUPS),_(mt,"POSIX",0),_(mt,"UNANCHORED",0),_(mt,"ANCHOR_START",1),_(mt,"ANCHOR_BOTH",2);let q=mt;class b{static toUpperCase(t){const e=String.fromCodePoint(t).toUpperCase();if(e.length>1)return t;const r=String.fromCodePoint(e.codePointAt(0)).toLowerCase();return r.length>1||r.codePointAt(0)!==t?t:e.codePointAt(0)}static toLowerCase(t){const e=String.fromCodePoint(t).toLowerCase();if(e.length>1)return t;const r=String.fromCodePoint(e.codePointAt(0)).toUpperCase();return r.length>1||r.codePointAt(0)!==t?t:e.codePointAt(0)}}_(b,"CODES",new Map([["\x07",7],["\b",8],["	",9],[`
`,10],["\v",11],["\f",12],["\r",13],[" ",32],['"',34],["$",36],["&",38],["(",40],[")",41],["*",42],["+",43],["-",45],[".",46],["0",48],["1",49],["2",50],["3",51],["4",52],["5",53],["6",54],["7",55],["8",56],["9",57],[":",58],["<",60],[">",62],["?",63],["A",65],["B",66],["C",67],["F",70],["P",80],["Q",81],["U",85],["Z",90],["[",91],["\\",92],["]",93],["^",94],["_",95],["a",97],["b",98],["f",102],["i",105],["m",109],["n",110],["r",114],["s",115],["t",116],["v",118],["x",120],["z",122],["{",123],["|",124],["}",125]]));const d=class d{};_(d,"CASE_ORBIT",new Map([[75,107],[107,8490],[8490,75],[83,115],[115,383],[383,83],[181,924],[924,956],[956,181],[197,229],[229,8491],[8491,197],[452,453],[453,454],[454,452],[455,456],[456,457],[457,455],[458,459],[459,460],[460,458],[497,498],[498,499],[499,497],[837,921],[921,953],[953,8126],[8126,837],[914,946],[946,976],[976,914],[917,949],[949,1013],[1013,917],[920,952],[952,977],[977,1012],[1012,920],[922,954],[954,1008],[1008,922],[928,960],[960,982],[982,928],[929,961],[961,1009],[1009,929],[931,962],[962,963],[963,931],[934,966],[966,981],[981,934],[937,969],[969,8486],[8486,937],[1042,1074],[1074,7296],[7296,1042],[1044,1076],[1076,7297],[7297,1044],[1054,1086],[1086,7298],[7298,1054],[1057,1089],[1089,7299],[7299,1057],[1058,1090],[1090,7300],[7300,7301],[7301,1058],[1066,1098],[1098,7302],[7302,1066],[1122,1123],[1123,7303],[7303,1122],[7304,42570],[42570,42571],[42571,7304],[7776,7777],[7777,7835],[7835,7776],[223,7838],[7838,223],[8064,8072],[8072,8064],[8065,8073],[8073,8065],[8066,8074],[8074,8066],[8067,8075],[8075,8067],[8068,8076],[8076,8068],[8069,8077],[8077,8069],[8070,8078],[8078,8070],[8071,8079],[8079,8071],[8080,8088],[8088,8080],[8081,8089],[8089,8081],[8082,8090],[8090,8082],[8083,8091],[8091,8083],[8084,8092],[8092,8084],[8085,8093],[8093,8085],[8086,8094],[8094,8086],[8087,8095],[8095,8087],[8096,8104],[8104,8096],[8097,8105],[8105,8097],[8098,8106],[8106,8098],[8099,8107],[8107,8099],[8100,8108],[8108,8100],[8101,8109],[8109,8101],[8102,8110],[8110,8102],[8103,8111],[8111,8103],[8115,8124],[8124,8115],[8131,8140],[8140,8131],[912,8147],[8147,912],[944,8163],[8163,944],[8179,8188],[8188,8179],[64261,64262],[64262,64261],[66560,66600],[66600,66560],[66561,66601],[66601,66561],[66562,66602],[66602,66562],[66563,66603],[66603,66563],[66564,66604],[66604,66564],[66565,66605],[66605,66565],[66566,66606],[66606,66566],[66567,66607],[66607,66567],[66568,66608],[66608,66568],[66569,66609],[66609,66569],[66570,66610],[66610,66570],[66571,66611],[66611,66571],[66572,66612],[66612,66572],[66573,66613],[66613,66573],[66574,66614],[66614,66574],[66575,66615],[66615,66575],[66576,66616],[66616,66576],[66577,66617],[66617,66577],[66578,66618],[66618,66578],[66579,66619],[66619,66579],[66580,66620],[66620,66580],[66581,66621],[66621,66581],[66582,66622],[66622,66582],[66583,66623],[66623,66583],[66584,66624],[66624,66584],[66585,66625],[66625,66585],[66586,66626],[66626,66586],[66587,66627],[66627,66587],[66588,66628],[66628,66588],[66589,66629],[66629,66589],[66590,66630],[66630,66590],[66591,66631],[66631,66591],[66592,66632],[66632,66592],[66593,66633],[66633,66593],[66594,66634],[66634,66594],[66595,66635],[66635,66595],[66596,66636],[66636,66596],[66597,66637],[66637,66597],[66598,66638],[66638,66598],[66599,66639],[66639,66599],[66736,66776],[66776,66736],[66737,66777],[66777,66737],[66738,66778],[66778,66738],[66739,66779],[66779,66739],[66740,66780],[66780,66740],[66741,66781],[66781,66741],[66742,66782],[66782,66742],[66743,66783],[66783,66743],[66744,66784],[66784,66744],[66745,66785],[66785,66745],[66746,66786],[66786,66746],[66747,66787],[66787,66747],[66748,66788],[66788,66748],[66749,66789],[66789,66749],[66750,66790],[66790,66750],[66751,66791],[66791,66751],[66752,66792],[66792,66752],[66753,66793],[66793,66753],[66754,66794],[66794,66754],[66755,66795],[66795,66755],[66756,66796],[66796,66756],[66757,66797],[66797,66757],[66758,66798],[66798,66758],[66759,66799],[66799,66759],[66760,66800],[66800,66760],[66761,66801],[66801,66761],[66762,66802],[66802,66762],[66763,66803],[66803,66763],[66764,66804],[66804,66764],[66765,66805],[66805,66765],[66766,66806],[66806,66766],[66767,66807],[66807,66767],[66768,66808],[66808,66768],[66769,66809],[66809,66769],[66770,66810],[66810,66770],[66771,66811],[66811,66771],[66928,66967],[66967,66928],[66929,66968],[66968,66929],[66930,66969],[66969,66930],[66931,66970],[66970,66931],[66932,66971],[66971,66932],[66933,66972],[66972,66933],[66934,66973],[66973,66934],[66935,66974],[66974,66935],[66936,66975],[66975,66936],[66937,66976],[66976,66937],[66938,66977],[66977,66938],[66940,66979],[66979,66940],[66941,66980],[66980,66941],[66942,66981],[66981,66942],[66943,66982],[66982,66943],[66944,66983],[66983,66944],[66945,66984],[66984,66945],[66946,66985],[66985,66946],[66947,66986],[66986,66947],[66948,66987],[66987,66948],[66949,66988],[66988,66949],[66950,66989],[66989,66950],[66951,66990],[66990,66951],[66952,66991],[66991,66952],[66953,66992],[66992,66953],[66954,66993],[66993,66954],[66956,66995],[66995,66956],[66957,66996],[66996,66957],[66958,66997],[66997,66958],[66959,66998],[66998,66959],[66960,66999],[66999,66960],[66961,67e3],[67e3,66961],[66962,67001],[67001,66962],[66964,67003],[67003,66964],[66965,67004],[67004,66965],[68736,68800],[68800,68736],[68737,68801],[68801,68737],[68738,68802],[68802,68738],[68739,68803],[68803,68739],[68740,68804],[68804,68740],[68741,68805],[68805,68741],[68742,68806],[68806,68742],[68743,68807],[68807,68743],[68744,68808],[68808,68744],[68745,68809],[68809,68745],[68746,68810],[68810,68746],[68747,68811],[68811,68747],[68748,68812],[68812,68748],[68749,68813],[68813,68749],[68750,68814],[68814,68750],[68751,68815],[68815,68751],[68752,68816],[68816,68752],[68753,68817],[68817,68753],[68754,68818],[68818,68754],[68755,68819],[68819,68755],[68756,68820],[68820,68756],[68757,68821],[68821,68757],[68758,68822],[68822,68758],[68759,68823],[68823,68759],[68760,68824],[68824,68760],[68761,68825],[68825,68761],[68762,68826],[68826,68762],[68763,68827],[68827,68763],[68764,68828],[68828,68764],[68765,68829],[68829,68765],[68766,68830],[68830,68766],[68767,68831],[68831,68767],[68768,68832],[68832,68768],[68769,68833],[68833,68769],[68770,68834],[68834,68770],[68771,68835],[68835,68771],[68772,68836],[68836,68772],[68773,68837],[68837,68773],[68774,68838],[68838,68774],[68775,68839],[68839,68775],[68776,68840],[68840,68776],[68777,68841],[68841,68777],[68778,68842],[68842,68778],[68779,68843],[68843,68779],[68780,68844],[68844,68780],[68781,68845],[68845,68781],[68782,68846],[68846,68782],[68783,68847],[68847,68783],[68784,68848],[68848,68784],[68785,68849],[68849,68785],[68786,68850],[68850,68786],[71840,71872],[71872,71840],[71841,71873],[71873,71841],[71842,71874],[71874,71842],[71843,71875],[71875,71843],[71844,71876],[71876,71844],[71845,71877],[71877,71845],[71846,71878],[71878,71846],[71847,71879],[71879,71847],[71848,71880],[71880,71848],[71849,71881],[71881,71849],[71850,71882],[71882,71850],[71851,71883],[71883,71851],[71852,71884],[71884,71852],[71853,71885],[71885,71853],[71854,71886],[71886,71854],[71855,71887],[71887,71855],[71856,71888],[71888,71856],[71857,71889],[71889,71857],[71858,71890],[71890,71858],[71859,71891],[71891,71859],[71860,71892],[71892,71860],[71861,71893],[71893,71861],[71862,71894],[71894,71862],[71863,71895],[71895,71863],[71864,71896],[71896,71864],[71865,71897],[71897,71865],[71866,71898],[71898,71866],[71867,71899],[71899,71867],[71868,71900],[71900,71868],[71869,71901],[71901,71869],[71870,71902],[71902,71870],[71871,71903],[71903,71871],[93760,93792],[93792,93760],[93761,93793],[93793,93761],[93762,93794],[93794,93762],[93763,93795],[93795,93763],[93764,93796],[93796,93764],[93765,93797],[93797,93765],[93766,93798],[93798,93766],[93767,93799],[93799,93767],[93768,93800],[93800,93768],[93769,93801],[93801,93769],[93770,93802],[93802,93770],[93771,93803],[93803,93771],[93772,93804],[93804,93772],[93773,93805],[93805,93773],[93774,93806],[93806,93774],[93775,93807],[93807,93775],[93776,93808],[93808,93776],[93777,93809],[93809,93777],[93778,93810],[93810,93778],[93779,93811],[93811,93779],[93780,93812],[93812,93780],[93781,93813],[93813,93781],[93782,93814],[93814,93782],[93783,93815],[93815,93783],[93784,93816],[93816,93784],[93785,93817],[93817,93785],[93786,93818],[93818,93786],[93787,93819],[93819,93787],[93788,93820],[93820,93788],[93789,93821],[93821,93789],[93790,93822],[93822,93790],[93791,93823],[93823,93791],[125184,125218],[125218,125184],[125185,125219],[125219,125185],[125186,125220],[125220,125186],[125187,125221],[125221,125187],[125188,125222],[125222,125188],[125189,125223],[125223,125189],[125190,125224],[125224,125190],[125191,125225],[125225,125191],[125192,125226],[125226,125192],[125193,125227],[125227,125193],[125194,125228],[125228,125194],[125195,125229],[125229,125195],[125196,125230],[125230,125196],[125197,125231],[125231,125197],[125198,125232],[125232,125198],[125199,125233],[125233,125199],[125200,125234],[125234,125200],[125201,125235],[125235,125201],[125202,125236],[125236,125202],[125203,125237],[125237,125203],[125204,125238],[125238,125204],[125205,125239],[125239,125205],[125206,125240],[125240,125206],[125207,125241],[125241,125207],[125208,125242],[125242,125208],[125209,125243],[125243,125209],[125210,125244],[125244,125210],[125211,125245],[125245,125211],[125212,125246],[125246,125212],[125213,125247],[125247,125213],[125214,125248],[125248,125214],[125215,125249],[125249,125215],[125216,125250],[125250,125216],[125217,125251],[125251,125217]])),_(d,"C",[[0,31,1],[127,159,1],[173,888,715],[889,896,7],[897,899,1],[907,909,2],[930,1328,398],[1367,1368,1],[1419,1420,1],[1424,1480,56],[1481,1487,1],[1515,1518,1],[1525,1541,1],[1564,1757,193],[1806,1807,1],[1867,1868,1],[1970,1983,1],[2043,2044,1],[2094,2095,1],[2111,2140,29],[2141,2143,2],[2155,2159,1],[2191,2199,1],[2274,2436,162],[2445,2446,1],[2449,2450,1],[2473,2481,8],[2483,2485,1],[2490,2491,1],[2501,2502,1],[2505,2506,1],[2511,2518,1],[2520,2523,1],[2526,2532,6],[2533,2559,26],[2560,2564,4],[2571,2574,1],[2577,2578,1],[2601,2609,8],[2612,2618,3],[2619,2621,2],[2627,2630,1],[2633,2634,1],[2638,2640,1],[2642,2648,1],[2653,2655,2],[2656,2661,1],[2679,2688,1],[2692,2702,10],[2706,2729,23],[2737,2740,3],[2746,2747,1],[2758,2766,4],[2767,2769,2],[2770,2783,1],[2788,2789,1],[2802,2808,1],[2816,2820,4],[2829,2830,1],[2833,2834,1],[2857,2865,8],[2868,2874,6],[2875,2885,10],[2886,2889,3],[2890,2894,4],[2895,2900,1],[2904,2907,1],[2910,2916,6],[2917,2936,19],[2937,2945,1],[2948,2955,7],[2956,2957,1],[2961,2966,5],[2967,2968,1],[2971,2973,2],[2976,2978,1],[2981,2983,1],[2987,2989,1],[3002,3005,1],[3011,3013,1],[3017,3022,5],[3023,3025,2],[3026,3030,1],[3032,3045,1],[3067,3071,1],[3085,3089,4],[3113,3130,17],[3131,3141,10],[3145,3150,5],[3151,3156,1],[3159,3163,4],[3164,3166,2],[3167,3172,5],[3173,3184,11],[3185,3190,1],[3213,3217,4],[3241,3252,11],[3258,3259,1],[3269,3273,4],[3278,3284,1],[3287,3292,1],[3295,3300,5],[3301,3312,11],[3316,3327,1],[3341,3345,4],[3397,3401,4],[3408,3411,1],[3428,3429,1],[3456,3460,4],[3479,3481,1],[3506,3516,10],[3518,3519,1],[3527,3529,1],[3531,3534,1],[3541,3543,2],[3552,3557,1],[3568,3569,1],[3573,3584,1],[3643,3646,1],[3676,3712,1],[3715,3717,2],[3723,3748,25],[3750,3774,24],[3775,3781,6],[3783,3791,8],[3802,3803,1],[3808,3839,1],[3912,3949,37],[3950,3952,1],[3992,4029,37],[4045,4059,14],[4060,4095,1],[4294,4296,2],[4297,4300,1],[4302,4303,1],[4681,4686,5],[4687,4695,8],[4697,4702,5],[4703,4745,42],[4750,4751,1],[4785,4790,5],[4791,4799,8],[4801,4806,5],[4807,4823,16],[4881,4886,5],[4887,4955,68],[4956,4989,33],[4990,4991,1],[5018,5023,1],[5110,5111,1],[5118,5119,1],[5789,5791,1],[5881,5887,1],[5910,5918,1],[5943,5951,1],[5972,5983,1],[5997,6001,4],[6004,6015,1],[6110,6111,1],[6122,6127,1],[6138,6143,1],[6158,6170,12],[6171,6175,1],[6265,6271,1],[6315,6319,1],[6390,6399,1],[6431,6444,13],[6445,6447,1],[6460,6463,1],[6465,6467,1],[6510,6511,1],[6517,6527,1],[6572,6575,1],[6602,6607,1],[6619,6621,1],[6684,6685,1],[6751,6781,30],[6782,6794,12],[6795,6799,1],[6810,6815,1],[6830,6831,1],[6863,6911,1],[6989,6991,1],[7039,7156,117],[7157,7163,1],[7224,7226,1],[7242,7244,1],[7305,7311,1],[7355,7356,1],[7368,7375,1],[7419,7423,1],[7958,7959,1],[7966,7967,1],[8006,8007,1],[8014,8015,1],[8024,8030,2],[8062,8063,1],[8117,8133,16],[8148,8149,1],[8156,8176,20],[8177,8181,4],[8191,8203,12],[8204,8207,1],[8234,8238,1],[8288,8303,1],[8306,8307,1],[8335,8349,14],[8350,8351,1],[8385,8399,1],[8433,8447,1],[8588,8591,1],[9255,9279,1],[9291,9311,1],[11124,11125,1],[11158,11508,350],[11509,11512,1],[11558,11560,2],[11561,11564,1],[11566,11567,1],[11624,11630,1],[11633,11646,1],[11671,11679,1],[11687,11743,8],[11870,11903,1],[11930,12020,90],[12021,12031,1],[12246,12271,1],[12352,12439,87],[12440,12544,104],[12545,12548,1],[12592,12687,95],[12772,12782,1],[12831,42125,29294],[42126,42127,1],[42183,42191,1],[42540,42559,1],[42744,42751,1],[42955,42959,1],[42962,42964,2],[42970,42993,1],[43053,43055,1],[43066,43071,1],[43128,43135,1],[43206,43213,1],[43226,43231,1],[43348,43358,1],[43389,43391,1],[43470,43482,12],[43483,43485,1],[43519,43575,56],[43576,43583,1],[43598,43599,1],[43610,43611,1],[43715,43738,1],[43767,43776,1],[43783,43784,1],[43791,43792,1],[43799,43807,1],[43815,43823,8],[43884,43887,1],[44014,44015,1],[44026,44031,1],[55204,55215,1],[55239,55242,1],[55292,63743,1],[64110,64111,1],[64218,64255,1],[64263,64274,1],[64280,64284,1],[64311,64317,6],[64319,64325,3],[64451,64466,1],[64912,64913,1],[64968,64974,1],[64976,65007,1],[65050,65055,1],[65107,65127,20],[65132,65135,1],[65141,65277,136],[65278,65280,1],[65471,65473,1],[65480,65481,1],[65488,65489,1],[65496,65497,1],[65501,65503,1],[65511,65519,8],[65520,65531,1],[65534,65535,1],[65548,65575,27],[65595,65598,3],[65614,65615,1],[65630,65663,1],[65787,65791,1],[65795,65798,1],[65844,65846,1],[65935,65949,14],[65950,65951,1],[65953,65999,1],[66046,66175,1],[66205,66207,1],[66257,66271,1],[66300,66303,1],[66340,66348,1],[66379,66383,1],[66427,66431,1],[66462,66500,38],[66501,66503,1],[66518,66559,1],[66718,66719,1],[66730,66735,1],[66772,66775,1],[66812,66815,1],[66856,66863,1],[66916,66926,1],[66939,66955,16],[66963,66966,3],[66978,66994,16],[67002,67005,3],[67006,67071,1],[67383,67391,1],[67414,67423,1],[67432,67455,1],[67462,67505,43],[67515,67583,1],[67590,67591,1],[67593,67638,45],[67641,67643,1],[67645,67646,1],[67670,67743,73],[67744,67750,1],[67760,67807,1],[67827,67830,3],[67831,67834,1],[67868,67870,1],[67898,67902,1],[67904,67967,1],[68024,68027,1],[68048,68049,1],[68100,68103,3],[68104,68107,1],[68116,68120,4],[68150,68151,1],[68155,68158,1],[68169,68175,1],[68185,68191,1],[68256,68287,1],[68327,68330,1],[68343,68351,1],[68406,68408,1],[68438,68439,1],[68467,68471,1],[68498,68504,1],[68509,68520,1],[68528,68607,1],[68681,68735,1],[68787,68799,1],[68851,68857,1],[68904,68911,1],[68922,69215,1],[69247,69290,43],[69294,69295,1],[69298,69372,1],[69416,69423,1],[69466,69487,1],[69514,69551,1],[69580,69599,1],[69623,69631,1],[69710,69713,1],[69750,69758,1],[69821,69827,6],[69828,69839,1],[69865,69871,1],[69882,69887,1],[69941,69960,19],[69961,69967,1],[70007,70015,1],[70112,70133,21],[70134,70143,1],[70162,70210,48],[70211,70271,1],[70279,70281,2],[70286,70302,16],[70314,70319,1],[70379,70383,1],[70394,70399,1],[70404,70413,9],[70414,70417,3],[70418,70441,23],[70449,70452,3],[70458,70469,11],[70470,70473,3],[70474,70478,4],[70479,70481,2],[70482,70486,1],[70488,70492,1],[70500,70501,1],[70509,70511,1],[70517,70655,1],[70748,70754,6],[70755,70783,1],[70856,70863,1],[70874,71039,1],[71094,71095,1],[71134,71167,1],[71237,71247,1],[71258,71263,1],[71277,71295,1],[71354,71359,1],[71370,71423,1],[71451,71452,1],[71468,71471,1],[71495,71679,1],[71740,71839,1],[71923,71934,1],[71943,71944,1],[71946,71947,1],[71956,71959,3],[71990,71993,3],[71994,72007,13],[72008,72015,1],[72026,72095,1],[72104,72105,1],[72152,72153,1],[72165,72191,1],[72264,72271,1],[72355,72367,1],[72441,72447,1],[72458,72703,1],[72713,72759,46],[72774,72783,1],[72813,72815,1],[72848,72849,1],[72872,72887,15],[72888,72959,1],[72967,72970,3],[73015,73017,1],[73019,73022,3],[73032,73039,1],[73050,73055,1],[73062,73065,3],[73103,73106,3],[73113,73119,1],[73130,73439,1],[73465,73471,1],[73489,73531,42],[73532,73533,1],[73562,73647,1],[73649,73663,1],[73714,73726,1],[74650,74751,1],[74863,74869,6],[74870,74879,1],[75076,77711,1],[77811,77823,1],[78896,78911,1],[78934,82943,1],[83527,92159,1],[92729,92735,1],[92767,92778,11],[92779,92781,1],[92863,92874,11],[92875,92879,1],[92910,92911,1],[92918,92927,1],[92998,93007,1],[93018,93026,8],[93048,93052,1],[93072,93759,1],[93851,93951,1],[94027,94030,1],[94088,94094,1],[94112,94175,1],[94181,94191,1],[94194,94207,1],[100344,100351,1],[101590,101631,1],[101641,110575,1],[110580,110588,8],[110591,110883,292],[110884,110897,1],[110899,110927,1],[110931,110932,1],[110934,110947,1],[110952,110959,1],[111356,113663,1],[113771,113775,1],[113789,113791,1],[113801,113807,1],[113818,113819,1],[113824,118527,1],[118574,118575,1],[118599,118607,1],[118724,118783,1],[119030,119039,1],[119079,119080,1],[119155,119162,1],[119275,119295,1],[119366,119487,1],[119508,119519,1],[119540,119551,1],[119639,119647,1],[119673,119807,1],[119893,119965,72],[119968,119969,1],[119971,119972,1],[119975,119976,1],[119981,119994,13],[119996,120004,8],[120070,120075,5],[120076,120085,9],[120093,120122,29],[120127,120133,6],[120135,120137,1],[120145,120486,341],[120487,120780,293],[120781,121484,703],[121485,121498,1],[121504,121520,16],[121521,122623,1],[122655,122660,1],[122667,122879,1],[122887,122905,18],[122906,122914,8],[122917,122923,6],[122924,122927,1],[122990,123022,1],[123024,123135,1],[123181,123183,1],[123198,123199,1],[123210,123213,1],[123216,123535,1],[123567,123583,1],[123642,123646,1],[123648,124111,1],[124154,124895,1],[124903,124908,5],[124911,124927,16],[125125,125126,1],[125143,125183,1],[125260,125263,1],[125274,125277,1],[125280,126064,1],[126133,126208,1],[126270,126463,1],[126468,126496,28],[126499,126501,2],[126502,126504,2],[126515,126520,5],[126522,126524,2],[126525,126529,1],[126531,126534,1],[126536,126540,2],[126544,126547,3],[126549,126550,1],[126552,126560,2],[126563,126565,2],[126566,126571,5],[126579,126589,5],[126591,126602,11],[126620,126624,1],[126628,126634,6],[126652,126703,1],[126706,126975,1],[127020,127023,1],[127124,127135,1],[127151,127152,1],[127168,127184,16],[127222,127231,1],[127406,127461,1],[127491,127503,1],[127548,127551,1],[127561,127567,1],[127570,127583,1],[127590,127743,1],[128728,128731,1],[128749,128751,1],[128765,128767,1],[128887,128890,1],[128986,128991,1],[129004,129007,1],[129009,129023,1],[129036,129039,1],[129096,129103,1],[129114,129119,1],[129160,129167,1],[129198,129199,1],[129202,129279,1],[129620,129631,1],[129646,129647,1],[129661,129663,1],[129673,129679,1],[129726,129734,8],[129735,129741,1],[129756,129759,1],[129769,129775,1],[129785,129791,1],[129939,129995,56],[129996,130031,1],[130042,131071,1],[173792,173823,1],[177978,177983,1],[178206,178207,1],[183970,183983,1],[191457,191471,1],[192094,194559,1],[195102,196607,1],[201547,201551,1],[205744,917759,1],[918e3,1114111,1]]),_(d,"Cc",[[0,31,1],[127,159,1]]),_(d,"Cf",[[173,1536,1363],[1537,1541,1],[1564,1757,193],[1807,2192,385],[2193,2274,81],[6158,8203,2045],[8204,8207,1],[8234,8238,1],[8288,8292,1],[8294,8303,1],[65279,65529,250],[65530,65531,1],[69821,69837,16],[78896,78911,1],[113824,113827,1],[119155,119162,1],[917505,917536,31],[917537,917631,1]]),_(d,"Co",[[57344,63743,1],[983040,1048573,1],[1048576,1114109,1]]),_(d,"Cs",[[55296,57343,1]]),_(d,"L",[[65,90,1],[97,122,1],[170,181,11],[186,192,6],[193,214,1],[216,246,1],[248,705,1],[710,721,1],[736,740,1],[748,750,2],[880,884,1],[886,887,1],[890,893,1],[895,902,7],[904,906,1],[908,910,2],[911,929,1],[931,1013,1],[1015,1153,1],[1162,1327,1],[1329,1366,1],[1369,1376,7],[1377,1416,1],[1488,1514,1],[1519,1522,1],[1568,1610,1],[1646,1647,1],[1649,1747,1],[1749,1765,16],[1766,1774,8],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2036,2037,1],[2042,2048,6],[2049,2069,1],[2074,2084,10],[2088,2112,24],[2113,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2249,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2417,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3654,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3782,3804,22],[3805,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4256,18],[4257,4293,1],[4295,4301,6],[4304,4346,1],[4348,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5024,5109,1],[5112,5117,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6103,6108,5],[6176,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6823,6917,94],[6918,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7293,1],[7296,7304,1],[7312,7354,1],[7357,7359,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,7424,6],[7425,7615,1],[7680,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8124,1],[8126,8130,4],[8131,8132,1],[8134,8140,1],[8144,8147,1],[8150,8155,1],[8160,8172,1],[8178,8180,1],[8182,8188,1],[8305,8319,14],[8336,8348,1],[8450,8455,5],[8458,8467,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8495,8505,1],[8508,8511,1],[8517,8521,1],[8526,8579,53],[8580,11264,2684],[11265,11492,1],[11499,11502,1],[11506,11507,1],[11520,11557,1],[11559,11565,6],[11568,11623,1],[11631,11648,17],[11649,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[11823,12293,470],[12294,12337,43],[12338,12341,1],[12347,12348,1],[12353,12438,1],[12445,12447,1],[12449,12538,1],[12540,12543,1],[12549,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,42124,1],[42192,42237,1],[42240,42508,1],[42512,42527,1],[42538,42539,1],[42560,42606,1],[42623,42653,1],[42656,42725,1],[42775,42783,1],[42786,42888,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43471,43488,17],[43489,43492,1],[43494,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43741,1],[43744,43754,1],[43762,43764,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43824,43866,1],[43868,43881,1],[43888,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64256,64262,1],[64275,64279,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65313,65338,1],[65345,65370,1],[65382,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66560,66717,1],[66736,66771,1],[66776,66811,1],[66816,66855,1],[66864,66915,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68736,68786,1],[68800,68850,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71840,71903,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[92992,92995,1],[93027,93047,1],[93053,93071,1],[93760,93823,1],[93952,94026,1],[94032,94099,67],[94100,94111,1],[94176,94177,1],[94179,94208,29],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120512,1],[120514,120538,1],[120540,120570,1],[120572,120596,1],[120598,120628,1],[120630,120654,1],[120656,120686,1],[120688,120712,1],[120714,120744,1],[120746,120770,1],[120772,120779,1],[122624,122654,1],[122661,122666,1],[122928,122989,1],[123136,123180,1],[123191,123197,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124139,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[125184,125251,1],[125259,126464,1205],[126465,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),_(d,"foldL",[[837,837,1]]),_(d,"Ll",[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,311,2],[312,328,2],[329,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[397,402,5],[405,409,4],[410,411,1],[414,417,3],[419,421,2],[424,426,2],[427,429,2],[432,436,4],[438,441,3],[442,445,3],[446,447,1],[454,460,3],[462,476,2],[477,495,2],[496,499,3],[501,505,4],[507,563,2],[564,569,1],[572,575,3],[576,578,2],[583,591,2],[592,659,1],[661,687,1],[881,883,2],[887,891,4],[892,893,1],[912,940,28],[941,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1020,1072,52],[1073,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1376,1416,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7424,7467,1],[7531,7543,1],[7545,7578,1],[7681,7829,2],[7830,7837,1],[7839,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8016,8023,1],[8032,8039,1],[8048,8061,1],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8112,8116,1],[8118,8119,1],[8126,8130,4],[8131,8132,1],[8134,8135,1],[8144,8147,1],[8150,8151,1],[8160,8167,1],[8178,8180,1],[8182,8183,1],[8458,8462,4],[8463,8467,4],[8495,8505,5],[8508,8509,1],[8518,8521,1],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11377,11379,2],[11380,11382,2],[11383,11387,1],[11393,11491,2],[11492,11500,8],[11502,11507,5],[11520,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42800,42801,1],[42803,42865,2],[42866,42872,1],[42874,42876,2],[42879,42887,2],[42892,42894,2],[42897,42899,2],[42900,42901,1],[42903,42921,2],[42927,42933,6],[42935,42947,2],[42952,42954,2],[42961,42969,2],[42998,43002,4],[43824,43866,1],[43872,43880,1],[43888,43967,1],[64256,64262,1],[64275,64279,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[119834,119859,1],[119886,119892,1],[119894,119911,1],[119938,119963,1],[119990,119993,1],[119995,119997,2],[119998,120003,1],[120005,120015,1],[120042,120067,1],[120094,120119,1],[120146,120171,1],[120198,120223,1],[120250,120275,1],[120302,120327,1],[120354,120379,1],[120406,120431,1],[120458,120485,1],[120514,120538,1],[120540,120545,1],[120572,120596,1],[120598,120603,1],[120630,120654,1],[120656,120661,1],[120688,120712,1],[120714,120719,1],[120746,120770,1],[120772,120777,1],[120779,122624,1845],[122625,122633,1],[122635,122654,1],[122661,122666,1],[125218,125251,1]]),_(d,"foldLl",[[65,90,1],[192,214,1],[216,222,1],[256,302,2],[306,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,453,1],[455,456,1],[458,459,1],[461,475,2],[478,494,2],[497,498,1],[500,502,2],[503,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[837,880,43],[882,886,4],[895,902,7],[904,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,984,9],[986,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8072,8079,1],[8088,8095,1],[8104,8111,1],[8120,8124,1],[8136,8140,1],[8152,8155,1],[8168,8172,1],[8184,8188,1],[8486,8490,4],[8491,8498,7],[8579,11264,2685],[11265,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[125184,125217,1]]),_(d,"Lm",[[688,705,1],[710,721,1],[736,740,1],[748,750,2],[884,890,6],[1369,1600,231],[1765,1766,1],[2036,2037,1],[2042,2074,32],[2084,2088,4],[2249,2417,168],[3654,3782,128],[4348,6103,1755],[6211,6823,612],[7288,7293,1],[7468,7530,1],[7544,7579,35],[7580,7615,1],[8305,8319,14],[8336,8348,1],[11388,11389,1],[11631,11823,192],[12293,12337,44],[12338,12341,1],[12347,12445,98],[12446,12540,94],[12541,12542,1],[40981,42232,1251],[42233,42237,1],[42508,42623,115],[42652,42653,1],[42775,42783,1],[42864,42888,24],[42994,42996,1],[43e3,43001,1],[43471,43494,23],[43632,43741,109],[43763,43764,1],[43868,43871,1],[43881,65392,21511],[65438,65439,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[92992,92995,1],[94099,94111,1],[94176,94177,1],[94179,110576,16397],[110577,110579,1],[110581,110587,1],[110589,110590,1],[122928,122989,1],[123191,123197,1],[124139,125259,1120]]),_(d,"Lo",[[170,186,16],[443,448,5],[449,451,1],[660,1488,828],[1489,1514,1],[1519,1522,1],[1568,1599,1],[1601,1610,1],[1646,1647,1],[1649,1747,1],[1749,1774,25],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2048,2069,1],[2112,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2248,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2418,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3653,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3804,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4352,114],[4353,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6108,6176,68],[6177,6210,1],[6212,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6917,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7287,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,8501,1083],[8502,8504,1],[11568,11623,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[12294,12348,54],[12353,12438,1],[12447,12449,2],[12450,12538,1],[12543,12549,6],[12550,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,40980,1],[40982,42124,1],[42192,42231,1],[42240,42507,1],[42512,42527,1],[42538,42539,1],[42606,42656,50],[42657,42725,1],[42895,42999,104],[43003,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43488,43492,1],[43495,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43631,1],[43633,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43740,1],[43744,43754,1],[43762,43777,15],[43778,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43968,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65382,65391,1],[65393,65437,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66640,66717,1],[66816,66855,1],[66864,66915,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[93027,93047,1],[93053,93071,1],[93952,94026,1],[94032,94208,176],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[122634,123136,502],[123137,123180,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124138,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),_(d,"Lt",[[453,459,3],[498,8072,7574],[8073,8079,1],[8088,8095,1],[8104,8111,1],[8124,8140,16],[8188,8188,1]]),_(d,"foldLt",[[452,454,2],[455,457,2],[458,460,2],[497,499,2],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8115,8131,16],[8179,8179,1]]),_(d,"Lu",[[65,90,1],[192,214,1],[216,222,1],[256,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,461,3],[463,475,2],[478,494,2],[497,500,3],[502,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[880,882,2],[886,895,9],[902,904,2],[905,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,978,3],[979,980,1],[984,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8120,8123,1],[8136,8139,1],[8152,8155,1],[8168,8172,1],[8184,8187,1],[8450,8455,5],[8459,8461,1],[8464,8466,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8496,8499,1],[8510,8511,1],[8517,8579,62],[11264,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[119808,119833,1],[119860,119885,1],[119912,119937,1],[119964,119966,2],[119967,119973,3],[119974,119977,3],[119978,119980,1],[119982,119989,1],[120016,120041,1],[120068,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120120,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120172,120197,1],[120224,120249,1],[120276,120301,1],[120328,120353,1],[120380,120405,1],[120432,120457,1],[120488,120512,1],[120546,120570,1],[120604,120628,1],[120662,120686,1],[120720,120744,1],[120778,125184,4406],[125185,125217,1]]),_(d,"Upper",d.Lu),_(d,"foldLu",[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,303,2],[307,311,2],[314,328,2],[331,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[402,405,3],[409,410,1],[414,417,3],[419,421,2],[424,429,5],[432,436,4],[438,441,3],[445,447,2],[453,454,1],[456,457,1],[459,460,1],[462,476,2],[477,495,2],[498,499,1],[501,505,4],[507,543,2],[547,563,2],[572,575,3],[576,578,2],[583,591,2],[592,596,1],[598,599,1],[601,603,2],[604,608,4],[609,613,2],[614,616,2],[617,620,1],[623,625,2],[626,629,3],[637,640,3],[642,643,1],[647,652,1],[658,669,11],[670,837,167],[881,883,2],[887,891,4],[892,893,1],[940,943,1],[945,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1072,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1377,1414,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7545,7549,4],[7566,7681,115],[7683,7829,2],[7835,7841,6],[7843,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8017,8023,2],[8032,8039,1],[8048,8061,1],[8112,8113,1],[8126,8144,18],[8145,8160,15],[8161,8165,4],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11379,11382,3],[11393,11491,2],[11500,11502,2],[11507,11520,13],[11521,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42803,42863,2],[42874,42876,2],[42879,42887,2],[42892,42897,5],[42899,42900,1],[42903,42921,2],[42933,42947,2],[42952,42954,2],[42961,42967,6],[42969,42998,29],[43859,43888,29],[43889,43967,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[125218,125251,1]]),_(d,"M",[[768,879,1],[1155,1161,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2307,1],[2362,2364,1],[2366,2383,1],[2385,2391,1],[2402,2403,1],[2433,2435,1],[2492,2494,2],[2495,2500,1],[2503,2504,1],[2507,2509,1],[2519,2530,11],[2531,2558,27],[2561,2563,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2672,31],[2673,2677,4],[2689,2691,1],[2748,2750,2],[2751,2757,1],[2759,2761,1],[2763,2765,1],[2786,2787,1],[2810,2815,1],[2817,2819,1],[2876,2878,2],[2879,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2914,2915,1],[2946,3006,60],[3007,3010,1],[3014,3016,1],[3018,3021,1],[3031,3072,41],[3073,3076,1],[3132,3134,2],[3135,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3203,1],[3260,3262,2],[3263,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3298,3299,1],[3315,3328,13],[3329,3331,1],[3387,3388,1],[3390,3396,1],[3398,3400,1],[3402,3405,1],[3415,3426,11],[3427,3457,30],[3458,3459,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3570,3571,1],[3633,3636,3],[3637,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3902,3903,1],[3953,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4139,101],[4140,4158,1],[4182,4185,1],[4190,4192,1],[4194,4196,1],[4199,4205,1],[4209,4212,1],[4226,4237,1],[4239,4250,11],[4251,4253,1],[4957,4959,1],[5906,5909,1],[5938,5940,1],[5970,5971,1],[6002,6003,1],[6068,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6443,1],[6448,6459,1],[6679,6683,1],[6741,6750,1],[6752,6780,1],[6783,6832,49],[6833,6862,1],[6912,6916,1],[6964,6980,1],[7019,7027,1],[7040,7042,1],[7073,7085,1],[7142,7155,1],[7204,7223,1],[7376,7378,1],[7380,7400,1],[7405,7412,7],[7415,7417,1],[7616,7679,1],[8400,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12335,1],[12441,12442,1],[42607,42610,1],[42612,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43043,24],[43044,43047,1],[43052,43136,84],[43137,43188,51],[43189,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43347,1],[43392,43395,1],[43443,43456,1],[43493,43561,68],[43562,43574,1],[43587,43596,9],[43597,43643,46],[43644,43645,1],[43696,43698,2],[43699,43700,1],[43703,43704,1],[43710,43711,1],[43713,43755,42],[43756,43759,1],[43765,43766,1],[44003,44010,1],[44012,44013,1],[64286,65024,738],[65025,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69632,69634,1],[69688,69702,1],[69744,69747,3],[69748,69759,11],[69760,69762,1],[69808,69818,1],[69826,69888,62],[69889,69890,1],[69927,69940,1],[69957,69958,1],[70003,70016,13],[70017,70018,1],[70067,70080,1],[70089,70092,1],[70094,70095,1],[70188,70199,1],[70206,70209,3],[70367,70378,1],[70400,70403,1],[70459,70460,1],[70462,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70502,3],[70503,70508,1],[70512,70516,1],[70709,70726,1],[70750,70832,82],[70833,70851,1],[71087,71093,1],[71096,71104,1],[71132,71133,1],[71216,71232,1],[71339,71351,1],[71453,71467,1],[71724,71738,1],[71984,71989,1],[71991,71992,1],[71995,71998,1],[72e3,72002,2],[72003,72145,142],[72146,72151,1],[72154,72160,1],[72164,72193,29],[72194,72202,1],[72243,72249,1],[72251,72254,1],[72263,72273,10],[72274,72283,1],[72330,72345,1],[72751,72758,1],[72760,72767,1],[72850,72871,1],[72873,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73098,67],[73099,73102,1],[73104,73105,1],[73107,73111,1],[73459,73462,1],[73472,73473,1],[73475,73524,49],[73525,73530,1],[73534,73538,1],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94033,2],[94034,94087,1],[94095,94098,1],[94180,94192,12],[94193,113821,19628],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119141,119145,1],[119149,119154,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]]),_(d,"foldM",[[921,953,32],[8126,8126,1]]),_(d,"Mc",[[2307,2363,56],[2366,2368,1],[2377,2380,1],[2382,2383,1],[2434,2435,1],[2494,2496,1],[2503,2504,1],[2507,2508,1],[2519,2563,44],[2622,2624,1],[2691,2750,59],[2751,2752,1],[2761,2763,2],[2764,2818,54],[2819,2878,59],[2880,2887,7],[2888,2891,3],[2892,2903,11],[3006,3007,1],[3009,3010,1],[3014,3016,1],[3018,3020,1],[3031,3073,42],[3074,3075,1],[3137,3140,1],[3202,3203,1],[3262,3264,2],[3265,3268,1],[3271,3272,1],[3274,3275,1],[3285,3286,1],[3315,3330,15],[3331,3390,59],[3391,3392,1],[3398,3400,1],[3402,3404,1],[3415,3458,43],[3459,3535,76],[3536,3537,1],[3544,3551,1],[3570,3571,1],[3902,3903,1],[3967,4139,172],[4140,4145,5],[4152,4155,3],[4156,4182,26],[4183,4194,11],[4195,4196,1],[4199,4205,1],[4227,4228,1],[4231,4236,1],[4239,4250,11],[4251,4252,1],[5909,5940,31],[6070,6078,8],[6079,6085,1],[6087,6088,1],[6435,6438,1],[6441,6443,1],[6448,6449,1],[6451,6456,1],[6681,6682,1],[6741,6743,2],[6753,6755,2],[6756,6765,9],[6766,6770,1],[6916,6965,49],[6971,6973,2],[6974,6977,1],[6979,6980,1],[7042,7073,31],[7078,7079,1],[7082,7143,61],[7146,7148,1],[7150,7154,4],[7155,7204,49],[7205,7211,1],[7220,7221,1],[7393,7415,22],[12334,12335,1],[43043,43044,1],[43047,43136,89],[43137,43188,51],[43189,43203,1],[43346,43347,1],[43395,43444,49],[43445,43450,5],[43451,43454,3],[43455,43456,1],[43567,43568,1],[43571,43572,1],[43597,43643,46],[43645,43755,110],[43758,43759,1],[43765,44003,238],[44004,44006,2],[44007,44009,2],[44010,44012,2],[69632,69634,2],[69762,69808,46],[69809,69810,1],[69815,69816,1],[69932,69957,25],[69958,70018,60],[70067,70069,1],[70079,70080,1],[70094,70188,94],[70189,70190,1],[70194,70195,1],[70197,70368,171],[70369,70370,1],[70402,70403,1],[70462,70463,1],[70465,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70709,210],[70710,70711,1],[70720,70721,1],[70725,70832,107],[70833,70834,1],[70841,70843,2],[70844,70846,1],[70849,71087,238],[71088,71089,1],[71096,71099,1],[71102,71216,114],[71217,71218,1],[71227,71228,1],[71230,71340,110],[71342,71343,1],[71350,71456,106],[71457,71462,5],[71724,71726,1],[71736,71984,248],[71985,71989,1],[71991,71992,1],[71997,72e3,3],[72002,72145,143],[72146,72147,1],[72156,72159,1],[72164,72249,85],[72279,72280,1],[72343,72751,408],[72766,72873,107],[72881,72884,3],[73098,73102,1],[73107,73108,1],[73110,73461,351],[73462,73475,13],[73524,73525,1],[73534,73535,1],[73537,94033,20496],[94034,94087,1],[94192,94193,1],[119141,119142,1],[119149,119154,1]]),_(d,"Me",[[1160,1161,1],[6846,8413,1567],[8414,8416,1],[8418,8420,1],[42608,42610,1]]),_(d,"Mn",[[768,879,1],[1155,1159,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2306,1],[2362,2364,2],[2369,2376,1],[2381,2385,4],[2386,2391,1],[2402,2403,1],[2433,2492,59],[2497,2500,1],[2509,2530,21],[2531,2558,27],[2561,2562,1],[2620,2625,5],[2626,2631,5],[2632,2635,3],[2636,2637,1],[2641,2672,31],[2673,2677,4],[2689,2690,1],[2748,2753,5],[2754,2757,1],[2759,2760,1],[2765,2786,21],[2787,2810,23],[2811,2815,1],[2817,2876,59],[2879,2881,2],[2882,2884,1],[2893,2901,8],[2902,2914,12],[2915,2946,31],[3008,3021,13],[3072,3076,4],[3132,3134,2],[3135,3136,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3260,59],[3263,3270,7],[3276,3277,1],[3298,3299,1],[3328,3329,1],[3387,3388,1],[3393,3396,1],[3405,3426,21],[3427,3457,30],[3530,3538,8],[3539,3540,1],[3542,3633,91],[3636,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3953,3966,1],[3968,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4141,103],[4142,4144,1],[4146,4151,1],[4153,4154,1],[4157,4158,1],[4184,4185,1],[4190,4192,1],[4209,4212,1],[4226,4229,3],[4230,4237,7],[4253,4957,704],[4958,4959,1],[5906,5908,1],[5938,5939,1],[5970,5971,1],[6002,6003,1],[6068,6069,1],[6071,6077,1],[6086,6089,3],[6090,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6434,1],[6439,6440,1],[6450,6457,7],[6458,6459,1],[6679,6680,1],[6683,6742,59],[6744,6750,1],[6752,6754,2],[6757,6764,1],[6771,6780,1],[6783,6832,49],[6833,6845,1],[6847,6862,1],[6912,6915,1],[6964,6966,2],[6967,6970,1],[6972,6978,6],[7019,7027,1],[7040,7041,1],[7074,7077,1],[7080,7081,1],[7083,7085,1],[7142,7144,2],[7145,7149,4],[7151,7153,1],[7212,7219,1],[7222,7223,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8400,8412,1],[8417,8421,4],[8422,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12333,1],[12441,12442,1],[42607,42612,5],[42613,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43045,26],[43046,43052,6],[43204,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43345,1],[43392,43394,1],[43443,43446,3],[43447,43449,1],[43452,43453,1],[43493,43561,68],[43562,43566,1],[43569,43570,1],[43573,43574,1],[43587,43596,9],[43644,43696,52],[43698,43700,1],[43703,43704,1],[43710,43711,1],[43713,43756,43],[43757,43766,9],[44005,44008,3],[44013,64286,20273],[65024,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69633,69688,55],[69689,69702,1],[69744,69747,3],[69748,69759,11],[69760,69761,1],[69811,69814,1],[69817,69818,1],[69826,69888,62],[69889,69890,1],[69927,69931,1],[69933,69940,1],[70003,70016,13],[70017,70070,53],[70071,70078,1],[70089,70092,1],[70095,70191,96],[70192,70193,1],[70196,70198,2],[70199,70206,7],[70209,70367,158],[70371,70378,1],[70400,70401,1],[70459,70460,1],[70464,70502,38],[70503,70508,1],[70512,70516,1],[70712,70719,1],[70722,70724,1],[70726,70750,24],[70835,70840,1],[70842,70847,5],[70848,70850,2],[70851,71090,239],[71091,71093,1],[71100,71101,1],[71103,71104,1],[71132,71133,1],[71219,71226,1],[71229,71231,2],[71232,71339,107],[71341,71344,3],[71345,71349,1],[71351,71453,102],[71454,71455,1],[71458,71461,1],[71463,71467,1],[71727,71735,1],[71737,71738,1],[71995,71996,1],[71998,72003,5],[72148,72151,1],[72154,72155,1],[72160,72193,33],[72194,72202,1],[72243,72248,1],[72251,72254,1],[72263,72273,10],[72274,72278,1],[72281,72283,1],[72330,72342,1],[72344,72345,1],[72752,72758,1],[72760,72765,1],[72767,72850,83],[72851,72871,1],[72874,72880,1],[72882,72883,1],[72885,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73104,73],[73105,73109,4],[73111,73459,348],[73460,73472,12],[73473,73526,53],[73527,73530,1],[73536,73538,2],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94095,64],[94096,94098,1],[94180,113821,19641],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]]),_(d,"foldMn",[[921,953,32],[8126,8126,1]]),_(d,"N",[[48,57,1],[178,179,1],[185,188,3],[189,190,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2548,2553,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[2930,2935,1],[3046,3058,1],[3174,3183,1],[3192,3198,1],[3302,3311,1],[3416,3422,1],[3430,3448,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3891,1],[4160,4169,1],[4240,4249,1],[4969,4988,1],[5870,5872,1],[6112,6121,1],[6128,6137,1],[6160,6169,1],[6470,6479,1],[6608,6618,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[8304,8308,4],[8309,8313,1],[8320,8329,1],[8528,8578,1],[8581,8585,1],[9312,9371,1],[9450,9471,1],[10102,10131,1],[11517,12295,778],[12321,12329,1],[12344,12346,1],[12690,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[42528,42537,1],[42726,42735,1],[43056,43061,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[65799,65843,1],[65856,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[66369,66378,9],[66513,66517,1],[66720,66729,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[68912,68921,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70113,70132,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71483,1],[71904,71922,1],[72016,72025,1],[72784,72812,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[73664,73684,1],[74752,74862,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125127,125135,1],[125264,125273,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1],[130032,130041,1]]),_(d,"Nd",[[48,57,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[3046,3055,1],[3174,3183,1],[3302,3311,1],[3430,3439,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3881,1],[4160,4169,1],[4240,4249,1],[6112,6121,1],[6160,6169,1],[6470,6479,1],[6608,6617,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[42528,42537,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[66720,66729,1],[68912,68921,1],[69734,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71481,1],[71904,71913,1],[72016,72025,1],[72784,72793,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125264,125273,1],[130032,130041,1]]),_(d,"Nl",[[5870,5872,1],[8544,8578,1],[8581,8584,1],[12295,12321,26],[12322,12329,1],[12344,12346,1],[42726,42735,1],[65856,65908,1],[66369,66378,9],[66513,66517,1],[74752,74862,1]]),_(d,"No",[[178,179,1],[185,188,3],[189,190,1],[2548,2553,1],[2930,2935,1],[3056,3058,1],[3192,3198,1],[3416,3422,1],[3440,3448,1],[3882,3891,1],[4969,4988,1],[6128,6137,1],[6618,8304,1686],[8308,8313,1],[8320,8329,1],[8528,8543,1],[8585,9312,727],[9313,9371,1],[9450,9471,1],[10102,10131,1],[11517,12690,1173],[12691,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[43056,43061,1],[65799,65843,1],[65909,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69733,1],[70113,70132,1],[71482,71483,1],[71914,71922,1],[72794,72812,1],[73664,73684,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[125127,125135,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1]]),_(d,"P",[[33,35,1],[37,42,1],[44,47,1],[58,59,1],[63,64,1],[91,93,1],[95,123,28],[125,161,36],[167,171,4],[182,183,1],[187,191,4],[894,903,9],[1370,1375,1],[1417,1418,1],[1470,1472,2],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3898,38],[3899,3901,1],[3973,4048,75],[4049,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5120,5742,622],[5787,5788,1],[5867,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8208,829],[8209,8231,1],[8240,8259,1],[8261,8273,1],[8275,8286,1],[8317,8318,1],[8333,8334,1],[8968,8971,1],[9001,9002,1],[10088,10101,1],[10181,10182,1],[10214,10223,1],[10627,10648,1],[10712,10715,1],[10748,10749,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11822,1],[11824,11855,1],[11858,11869,1],[12289,12291,1],[12296,12305,1],[12308,12319,1],[12336,12349,13],[12448,12539,91],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,64830,20819],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65121,1],[65123,65128,5],[65130,65131,1],[65281,65283,1],[65285,65290,1],[65292,65295,1],[65306,65307,1],[65311,65312,1],[65339,65341,1],[65343,65371,28],[65373,65375,2],[65376,65381,1],[65792,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69293,69461,168],[69462,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]]),_(d,"Pc",[[95,8255,8160],[8256,8276,20],[65075,65076,1],[65101,65103,1],[65343,65343,1]]),_(d,"Pd",[[45,1418,1373],[1470,5120,3650],[6150,8208,2058],[8209,8213,1],[11799,11802,3],[11834,11835,1],[11840,11869,29],[12316,12336,20],[12448,65073,52625],[65074,65112,38],[65123,65293,170],[69293,69293,1]]),_(d,"Pe",[[41,93,52],[125,3899,3774],[3901,5788,1887],[8262,8318,56],[8334,8969,635],[8971,9002,31],[10089,10101,2],[10182,10215,33],[10217,10223,2],[10628,10648,2],[10713,10715,2],[10749,11811,1062],[11813,11817,2],[11862,11868,2],[12297,12305,2],[12309,12315,2],[12318,12319,1],[64830,65048,218],[65078,65092,2],[65096,65114,18],[65116,65118,2],[65289,65341,52],[65373,65379,3]]),_(d,"Pf",[[187,8217,8030],[8221,8250,29],[11779,11781,2],[11786,11789,3],[11805,11809,4]]),_(d,"Pi",[[171,8216,8045],[8219,8220,1],[8223,8249,26],[11778,11780,2],[11785,11788,3],[11804,11808,4]]),_(d,"Po",[[33,35,1],[37,39,1],[42,46,2],[47,58,11],[59,63,4],[64,92,28],[161,167,6],[182,183,1],[191,894,703],[903,1370,467],[1371,1375,1],[1417,1472,55],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3973,113],[4048,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5742,5867,125],[5868,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6149,1],[6151,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8214,835],[8215,8224,9],[8225,8231,1],[8240,8248,1],[8251,8254,1],[8257,8259,1],[8263,8273,1],[8275,8277,2],[8278,8286,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11782,5],[11783,11784,1],[11787,11790,3],[11791,11798,1],[11800,11801,1],[11803,11806,3],[11807,11818,11],[11819,11822,1],[11824,11833,1],[11836,11839,1],[11841,11843,2],[11844,11855,1],[11858,11860,1],[12289,12291,1],[12349,12539,190],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,65040,21029],[65041,65046,1],[65049,65072,23],[65093,65094,1],[65097,65100,1],[65104,65106,1],[65108,65111,1],[65119,65121,1],[65128,65130,2],[65131,65281,150],[65282,65283,1],[65285,65287,1],[65290,65294,2],[65295,65306,11],[65307,65311,4],[65312,65340,28],[65377,65380,3],[65381,65792,411],[65793,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69461,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]]),_(d,"Ps",[[40,91,51],[123,3898,3775],[3900,5787,1887],[8218,8222,4],[8261,8317,56],[8333,8968,635],[8970,9001,31],[10088,10100,2],[10181,10214,33],[10216,10222,2],[10627,10647,2],[10712,10714,2],[10748,11810,1062],[11812,11816,2],[11842,11861,19],[11863,11867,2],[12296,12304,2],[12308,12314,2],[12317,64831,52514],[65047,65077,30],[65079,65091,2],[65095,65113,18],[65115,65117,2],[65288,65339,51],[65371,65375,4],[65378,65378,1]]),_(d,"S",[[36,43,7],[60,62,1],[94,96,2],[124,126,2],[162,166,1],[168,169,1],[172,174,2],[175,177,1],[180,184,4],[215,247,32],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,1014,113],[1154,1421,267],[1422,1423,1],[1542,1544,1],[1547,1550,3],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2046,2047,1],[2184,2546,362],[2547,2554,7],[2555,2801,246],[2928,3059,131],[3060,3066,1],[3199,3407,208],[3449,3647,198],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6107,366],[6464,6622,158],[6623,6655,1],[7009,7018,1],[7028,7036,1],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8352,8384,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8472,1],[8478,8483,1],[8485,8489,2],[8494,8506,12],[8507,8512,5],[8513,8516,1],[8522,8525,1],[8527,8586,59],[8587,8592,5],[8593,8967,1],[8972,9e3,1],[9003,9254,1],[9280,9290,1],[9372,9449,1],[9472,10087,1],[10132,10180,1],[10183,10213,1],[10224,10626,1],[10649,10711,1],[10716,10747,1],[10750,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12443,12444,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43048,43051,1],[43062,43065,1],[43639,43641,1],[43867,43882,15],[43883,64297,20414],[64434,64450,1],[64832,64847,1],[64975,65020,45],[65021,65023,1],[65122,65124,2],[65125,65126,1],[65129,65284,155],[65291,65308,17],[65309,65310,1],[65342,65344,2],[65372,65374,2],[65504,65510,1],[65512,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,123647,432],[126124,126128,4],[126254,126704,450],[126705,126976,271],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]]),_(d,"Sc",[[36,162,126],[163,165,1],[1423,1547,124],[2046,2047,1],[2546,2547,1],[2555,2801,246],[3065,3647,582],[6107,8352,2245],[8353,8384,1],[43064,65020,21956],[65129,65284,155],[65504,65505,1],[65509,65510,1],[73693,73696,1],[123647,126128,2481]]),_(d,"Sk",[[94,96,2],[168,175,7],[180,184,4],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,2184,1283],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[12443,12444,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43867,43882,15],[43883,64434,20551],[64435,64450,1],[65342,65344,2],[65507,127995,62488],[127996,127999,1]]),_(d,"Sm",[[43,60,17],[61,62,1],[124,126,2],[172,177,5],[215,247,32],[1014,1542,528],[1543,1544,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8472,8512,40],[8513,8516,1],[8523,8592,69],[8593,8596,1],[8602,8603,1],[8608,8614,3],[8622,8654,32],[8655,8658,3],[8660,8692,32],[8693,8959,1],[8992,8993,1],[9084,9115,31],[9116,9139,1],[9180,9185,1],[9655,9665,10],[9720,9727,1],[9839,10176,337],[10177,10180,1],[10183,10213,1],[10224,10239,1],[10496,10626,1],[10649,10711,1],[10716,10747,1],[10750,11007,1],[11056,11076,1],[11079,11084,1],[64297,65122,825],[65124,65126,1],[65291,65308,17],[65309,65310,1],[65372,65374,2],[65506,65513,7],[65514,65516,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[126704,126705,1]]),_(d,"So",[[166,169,3],[174,176,2],[1154,1421,267],[1422,1550,128],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2554,2928,374],[3059,3064,1],[3066,3199,133],[3407,3449,42],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6464,723],[6622,6655,1],[7009,7018,1],[7028,7036,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8478,7],[8479,8483,1],[8485,8489,2],[8494,8506,12],[8507,8522,15],[8524,8525,1],[8527,8586,59],[8587,8597,10],[8598,8601,1],[8604,8607,1],[8609,8610,1],[8612,8613,1],[8615,8621,1],[8623,8653,1],[8656,8657,1],[8659,8661,2],[8662,8691,1],[8960,8967,1],[8972,8991,1],[8994,9e3,1],[9003,9083,1],[9085,9114,1],[9140,9179,1],[9186,9254,1],[9280,9290,1],[9372,9449,1],[9472,9654,1],[9656,9664,1],[9666,9719,1],[9728,9838,1],[9840,10087,1],[10132,10175,1],[10240,10495,1],[11008,11055,1],[11077,11078,1],[11085,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[43048,43051,1],[43062,43063,1],[43065,43639,574],[43640,43641,1],[64832,64847,1],[64975,65021,46],[65022,65023,1],[65508,65512,4],[65517,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73692,1],[73697,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,126124,2909],[126254,126976,722],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,127994,1],[128e3,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]]),_(d,"Z",[[32,160,128],[5760,8192,2432],[8193,8202,1],[8232,8233,1],[8239,8287,48],[12288,12288,1]]),_(d,"Zl",[[8232,8232,1]]),_(d,"Zp",[[8233,8233,1]]),_(d,"Zs",[[32,160,128],[5760,8192,2432],[8193,8202,1],[8239,8287,48],[12288,12288,1]]),_(d,"Adlam",[[125184,125259,1],[125264,125273,1],[125278,125279,1]]),_(d,"Ahom",[[71424,71450,1],[71453,71467,1],[71472,71494,1]]),_(d,"Anatolian_Hieroglyphs",[[82944,83526,1]]),_(d,"Arabic",[[1536,1540,1],[1542,1547,1],[1549,1562,1],[1564,1566,1],[1568,1599,1],[1601,1610,1],[1622,1647,1],[1649,1756,1],[1758,1791,1],[1872,1919,1],[2160,2190,1],[2192,2193,1],[2200,2273,1],[2275,2303,1],[64336,64450,1],[64467,64829,1],[64832,64911,1],[64914,64967,1],[64975,65008,33],[65009,65023,1],[65136,65140,1],[65142,65276,1],[69216,69246,1],[69373,69375,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[126704,126705,1]]),_(d,"Armenian",[[1329,1366,1],[1369,1418,1],[1421,1423,1],[64275,64279,1]]),_(d,"Avestan",[[68352,68405,1],[68409,68415,1]]),_(d,"Balinese",[[6912,6988,1],[6992,7038,1]]),_(d,"Bamum",[[42656,42743,1],[92160,92728,1]]),_(d,"Bassa_Vah",[[92880,92909,1],[92912,92917,1]]),_(d,"Batak",[[7104,7155,1],[7164,7167,1]]),_(d,"Bengali",[[2432,2435,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2492,2500,1],[2503,2504,1],[2507,2510,1],[2519,2524,5],[2525,2527,2],[2528,2531,1],[2534,2558,1]]),_(d,"Bhaiksuki",[[72704,72712,1],[72714,72758,1],[72760,72773,1],[72784,72812,1]]),_(d,"Bopomofo",[[746,747,1],[12549,12591,1],[12704,12735,1]]),_(d,"Brahmi",[[69632,69709,1],[69714,69749,1],[69759,69759,1]]),_(d,"Braille",[[10240,10495,1]]),_(d,"Buginese",[[6656,6683,1],[6686,6687,1]]),_(d,"Buhid",[[5952,5971,1]]),_(d,"Canadian_Aboriginal",[[5120,5759,1],[6320,6389,1],[72368,72383,1]]),_(d,"Carian",[[66208,66256,1]]),_(d,"Caucasian_Albanian",[[66864,66915,1],[66927,66927,1]]),_(d,"Chakma",[[69888,69940,1],[69942,69959,1]]),_(d,"Cham",[[43520,43574,1],[43584,43597,1],[43600,43609,1],[43612,43615,1]]),_(d,"Cherokee",[[5024,5109,1],[5112,5117,1],[43888,43967,1]]),_(d,"Chorasmian",[[69552,69579,1]]),_(d,"Common",[[0,64,1],[91,96,1],[123,169,1],[171,185,1],[187,191,1],[215,247,32],[697,735,1],[741,745,1],[748,767,1],[884,894,10],[901,903,2],[1541,1548,7],[1563,1567,4],[1600,1757,157],[2274,2404,130],[2405,3647,1242],[4053,4056,1],[4347,5867,1520],[5868,5869,1],[5941,5942,1],[6146,6147,1],[6149,7379,1230],[7393,7401,8],[7402,7404,1],[7406,7411,1],[7413,7415,1],[7418,8192,774],[8193,8203,1],[8206,8292,1],[8294,8304,1],[8308,8318,1],[8320,8334,1],[8352,8384,1],[8448,8485,1],[8487,8489,1],[8492,8497,1],[8499,8525,1],[8527,8543,1],[8585,8587,1],[8592,9254,1],[9280,9290,1],[9312,10239,1],[10496,11123,1],[11126,11157,1],[11159,11263,1],[11776,11869,1],[12272,12292,1],[12294,12296,2],[12297,12320,1],[12336,12343,1],[12348,12351,1],[12443,12444,1],[12448,12539,91],[12540,12688,148],[12689,12703,1],[12736,12771,1],[12783,12832,49],[12833,12895,1],[12927,13007,1],[13055,13144,89],[13145,13311,1],[19904,19967,1],[42752,42785,1],[42888,42890,1],[43056,43065,1],[43310,43471,161],[43867,43882,15],[43883,64830,20947],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65126,1],[65128,65131,1],[65279,65281,2],[65282,65312,1],[65339,65344,1],[65371,65381,1],[65392,65438,46],[65439,65504,65],[65505,65510,1],[65512,65518,1],[65529,65533,1],[65792,65794,1],[65799,65843,1],[65847,65855,1],[65936,65948,1],[66e3,66044,1],[66273,66299,1],[113824,113827,1],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119142,1],[119146,119162,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119488,119507,1],[119520,119539,1],[119552,119638,1],[119648,119672,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120779,1],[120782,120831,1],[126065,126132,1],[126209,126269,1],[126976,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127232,127405,1],[127462,127487,1],[127489,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1],[130032,130041,1],[917505,917536,31],[917537,917631,1]]),_(d,"foldCommon",[[924,956,32]]),_(d,"Coptic",[[994,1007,1],[11392,11507,1],[11513,11519,1]]),_(d,"Cuneiform",[[73728,74649,1],[74752,74862,1],[74864,74868,1],[74880,75075,1]]),_(d,"Cypriot",[[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3]]),_(d,"Cypro_Minoan",[[77712,77810,1]]),_(d,"Cyrillic",[[1024,1156,1],[1159,1327,1],[7296,7304,1],[7467,7544,77],[11744,11775,1],[42560,42655,1],[65070,65071,1],[122928,122989,1],[123023,123023,1]]),_(d,"Deseret",[[66560,66639,1]]),_(d,"Devanagari",[[2304,2384,1],[2389,2403,1],[2406,2431,1],[43232,43263,1],[72448,72457,1]]),_(d,"Dives_Akuru",[[71936,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71989,1],[71991,71992,1],[71995,72006,1],[72016,72025,1]]),_(d,"Dogra",[[71680,71739,1]]),_(d,"Duployan",[[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[113820,113823,1]]),_(d,"Egyptian_Hieroglyphs",[[77824,78933,1]]),_(d,"Elbasan",[[66816,66855,1]]),_(d,"Elymaic",[[69600,69622,1]]),_(d,"Ethiopic",[[4608,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4957,4988,1],[4992,5017,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1]]),_(d,"Georgian",[[4256,4293,1],[4295,4301,6],[4304,4346,1],[4348,4351,1],[7312,7354,1],[7357,7359,1],[11520,11557,1],[11559,11565,6]]),_(d,"Glagolitic",[[11264,11359,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1]]),_(d,"Gothic",[[66352,66378,1]]),_(d,"Grantha",[[70400,70403,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70460,70468,1],[70471,70472,1],[70475,70477,1],[70480,70487,7],[70493,70499,1],[70502,70508,1],[70512,70516,1]]),_(d,"Greek",[[880,883,1],[885,887,1],[890,893,1],[895,900,5],[902,904,2],[905,906,1],[908,910,2],[911,929,1],[931,993,1],[1008,1023,1],[7462,7466,1],[7517,7521,1],[7526,7530,1],[7615,7936,321],[7937,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8132,1],[8134,8147,1],[8150,8155,1],[8157,8175,1],[8178,8180,1],[8182,8190,1],[8486,43877,35391],[65856,65934,1],[65952,119296,53344],[119297,119365,1]]),_(d,"foldGreek",[[181,837,656]]),_(d,"Gujarati",[[2689,2691,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2748,2757,1],[2759,2761,1],[2763,2765,1],[2768,2784,16],[2785,2787,1],[2790,2801,1],[2809,2815,1]]),_(d,"Gunjala_Gondi",[[73056,73061,1],[73063,73064,1],[73066,73102,1],[73104,73105,1],[73107,73112,1],[73120,73129,1]]),_(d,"Gurmukhi",[[2561,2563,1],[2565,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2649,8],[2650,2652,1],[2654,2662,8],[2663,2678,1]]),_(d,"Han",[[11904,11929,1],[11931,12019,1],[12032,12245,1],[12293,12295,2],[12321,12329,1],[12344,12347,1],[13312,19903,1],[19968,40959,1],[63744,64109,1],[64112,64217,1],[94178,94179,1],[94192,94193,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),_(d,"Hangul",[[4352,4607,1],[12334,12335,1],[12593,12686,1],[12800,12830,1],[12896,12926,1],[43360,43388,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1]]),_(d,"Hanifi_Rohingya",[[68864,68903,1],[68912,68921,1]]),_(d,"Hanunoo",[[5920,5940,1]]),_(d,"Hatran",[[67808,67826,1],[67828,67829,1],[67835,67839,1]]),_(d,"Hebrew",[[1425,1479,1],[1488,1514,1],[1519,1524,1],[64285,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64335,1]]),_(d,"Hiragana",[[12353,12438,1],[12445,12447,1],[110593,110879,1],[110898,110928,30],[110929,110930,1],[127488,127488,1]]),_(d,"Imperial_Aramaic",[[67648,67669,1],[67671,67679,1]]),_(d,"Inherited",[[768,879,1],[1157,1158,1],[1611,1621,1],[1648,2385,737],[2386,2388,1],[6832,6862,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8204,8205,1],[8400,8432,1],[12330,12333,1],[12441,12442,1],[65024,65039,1],[65056,65069,1],[66045,66272,227],[70459,118528,48069],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[917760,917999,1]]),_(d,"foldInherited",[[921,953,32],[8126,8126,1]]),_(d,"Inscriptional_Pahlavi",[[68448,68466,1],[68472,68479,1]]),_(d,"Inscriptional_Parthian",[[68416,68437,1],[68440,68447,1]]),_(d,"Javanese",[[43392,43469,1],[43472,43481,1],[43486,43487,1]]),_(d,"Kaithi",[[69760,69826,1],[69837,69837,1]]),_(d,"Kannada",[[3200,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3260,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3293,3294,1],[3296,3299,1],[3302,3311,1],[3313,3315,1]]),_(d,"Katakana",[[12449,12538,1],[12541,12543,1],[12784,12799,1],[13008,13054,1],[13056,13143,1],[65382,65391,1],[65393,65437,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110880,288],[110881,110882,1],[110933,110948,15],[110949,110951,1]]),_(d,"Kawi",[[73472,73488,1],[73490,73530,1],[73534,73561,1]]),_(d,"Kayah_Li",[[43264,43309,1],[43311,43311,1]]),_(d,"Kharoshthi",[[68096,68099,1],[68101,68102,1],[68108,68115,1],[68117,68119,1],[68121,68149,1],[68152,68154,1],[68159,68168,1],[68176,68184,1]]),_(d,"Khitan_Small_Script",[[94180,101120,6940],[101121,101589,1]]),_(d,"Khmer",[[6016,6109,1],[6112,6121,1],[6128,6137,1],[6624,6655,1]]),_(d,"Khojki",[[70144,70161,1],[70163,70209,1]]),_(d,"Khudawadi",[[70320,70378,1],[70384,70393,1]]),_(d,"Lao",[[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3773,1],[3776,3780,1],[3782,3784,2],[3785,3790,1],[3792,3801,1],[3804,3807,1]]),_(d,"Latin",[[65,90,1],[97,122,1],[170,186,16],[192,214,1],[216,246,1],[248,696,1],[736,740,1],[7424,7461,1],[7468,7516,1],[7522,7525,1],[7531,7543,1],[7545,7614,1],[7680,7935,1],[8305,8319,14],[8336,8348,1],[8490,8491,1],[8498,8526,28],[8544,8584,1],[11360,11391,1],[42786,42887,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43007,1],[43824,43866,1],[43868,43876,1],[43878,43881,1],[64256,64262,1],[65313,65338,1],[65345,65370,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[122624,122654,1],[122661,122666,1]]),_(d,"Lepcha",[[7168,7223,1],[7227,7241,1],[7245,7247,1]]),_(d,"Limbu",[[6400,6430,1],[6432,6443,1],[6448,6459,1],[6464,6468,4],[6469,6479,1]]),_(d,"Linear_A",[[67072,67382,1],[67392,67413,1],[67424,67431,1]]),_(d,"Linear_B",[[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1]]),_(d,"Lisu",[[42192,42239,1],[73648,73648,1]]),_(d,"Lycian",[[66176,66204,1]]),_(d,"Lydian",[[67872,67897,1],[67903,67903,1]]),_(d,"Mahajani",[[69968,70006,1]]),_(d,"Makasar",[[73440,73464,1]]),_(d,"Malayalam",[[3328,3340,1],[3342,3344,1],[3346,3396,1],[3398,3400,1],[3402,3407,1],[3412,3427,1],[3430,3455,1]]),_(d,"Mandaic",[[2112,2139,1],[2142,2142,1]]),_(d,"Manichaean",[[68288,68326,1],[68331,68342,1]]),_(d,"Marchen",[[72816,72847,1],[72850,72871,1],[72873,72886,1]]),_(d,"Masaram_Gondi",[[72960,72966,1],[72968,72969,1],[72971,73014,1],[73018,73020,2],[73021,73023,2],[73024,73031,1],[73040,73049,1]]),_(d,"Medefaidrin",[[93760,93850,1]]),_(d,"Meetei_Mayek",[[43744,43766,1],[43968,44013,1],[44016,44025,1]]),_(d,"Mende_Kikakui",[[124928,125124,1],[125127,125142,1]]),_(d,"Meroitic_Cursive",[[68e3,68023,1],[68028,68047,1],[68050,68095,1]]),_(d,"Meroitic_Hieroglyphs",[[67968,67999,1]]),_(d,"Miao",[[93952,94026,1],[94031,94087,1],[94095,94111,1]]),_(d,"Modi",[[71168,71236,1],[71248,71257,1]]),_(d,"Mongolian",[[6144,6145,1],[6148,6150,2],[6151,6169,1],[6176,6264,1],[6272,6314,1],[71264,71276,1]]),_(d,"Mro",[[92736,92766,1],[92768,92777,1],[92782,92783,1]]),_(d,"Multani",[[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70313,1]]),_(d,"Myanmar",[[4096,4255,1],[43488,43518,1],[43616,43647,1]]),_(d,"Nabataean",[[67712,67742,1],[67751,67759,1]]),_(d,"Nag_Mundari",[[124112,124153,1]]),_(d,"Nandinagari",[[72096,72103,1],[72106,72151,1],[72154,72164,1]]),_(d,"New_Tai_Lue",[[6528,6571,1],[6576,6601,1],[6608,6618,1],[6622,6623,1]]),_(d,"Newa",[[70656,70747,1],[70749,70753,1]]),_(d,"Nko",[[1984,2042,1],[2045,2047,1]]),_(d,"Nushu",[[94177,110960,16783],[110961,111355,1]]),_(d,"Nyiakeng_Puachue_Hmong",[[123136,123180,1],[123184,123197,1],[123200,123209,1],[123214,123215,1]]),_(d,"Ogham",[[5760,5788,1]]),_(d,"Ol_Chiki",[[7248,7295,1]]),_(d,"Old_Hungarian",[[68736,68786,1],[68800,68850,1],[68858,68863,1]]),_(d,"Old_Italic",[[66304,66339,1],[66349,66351,1]]),_(d,"Old_North_Arabian",[[68224,68255,1]]),_(d,"Old_Permic",[[66384,66426,1]]),_(d,"Old_Persian",[[66464,66499,1],[66504,66517,1]]),_(d,"Old_Sogdian",[[69376,69415,1]]),_(d,"Old_South_Arabian",[[68192,68223,1]]),_(d,"Old_Turkic",[[68608,68680,1]]),_(d,"Old_Uyghur",[[69488,69513,1]]),_(d,"Oriya",[[2817,2819,1],[2821,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2876,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2908,2909,1],[2911,2915,1],[2918,2935,1]]),_(d,"Osage",[[66736,66771,1],[66776,66811,1]]),_(d,"Osmanya",[[66688,66717,1],[66720,66729,1]]),_(d,"Pahawh_Hmong",[[92928,92997,1],[93008,93017,1],[93019,93025,1],[93027,93047,1],[93053,93071,1]]),_(d,"Palmyrene",[[67680,67711,1]]),_(d,"Pau_Cin_Hau",[[72384,72440,1]]),_(d,"Phags_Pa",[[43072,43127,1]]),_(d,"Phoenician",[[67840,67867,1],[67871,67871,1]]),_(d,"Psalter_Pahlavi",[[68480,68497,1],[68505,68508,1],[68521,68527,1]]),_(d,"Rejang",[[43312,43347,1],[43359,43359,1]]),_(d,"Runic",[[5792,5866,1],[5870,5880,1]]),_(d,"Samaritan",[[2048,2093,1],[2096,2110,1]]),_(d,"Saurashtra",[[43136,43205,1],[43214,43225,1]]),_(d,"Sharada",[[70016,70111,1]]),_(d,"Shavian",[[66640,66687,1]]),_(d,"Siddham",[[71040,71093,1],[71096,71133,1]]),_(d,"SignWriting",[[120832,121483,1],[121499,121503,1],[121505,121519,1]]),_(d,"Sinhala",[[3457,3459,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3558,3567,1],[3570,3572,1],[70113,70132,1]]),_(d,"Sogdian",[[69424,69465,1]]),_(d,"Sora_Sompeng",[[69840,69864,1],[69872,69881,1]]),_(d,"Soyombo",[[72272,72354,1]]),_(d,"Sundanese",[[7040,7103,1],[7360,7367,1]]),_(d,"Syloti_Nagri",[[43008,43052,1]]),_(d,"Syriac",[[1792,1805,1],[1807,1866,1],[1869,1871,1],[2144,2154,1]]),_(d,"Tagalog",[[5888,5909,1],[5919,5919,1]]),_(d,"Tagbanwa",[[5984,5996,1],[5998,6e3,1],[6002,6003,1]]),_(d,"Tai_Le",[[6480,6509,1],[6512,6516,1]]),_(d,"Tai_Tham",[[6688,6750,1],[6752,6780,1],[6783,6793,1],[6800,6809,1],[6816,6829,1]]),_(d,"Tai_Viet",[[43648,43714,1],[43739,43743,1]]),_(d,"Takri",[[71296,71353,1],[71360,71369,1]]),_(d,"Tamil",[[2946,2947,1],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3006,3010,1],[3014,3016,1],[3018,3021,1],[3024,3031,7],[3046,3066,1],[73664,73713,1],[73727,73727,1]]),_(d,"Tangsa",[[92784,92862,1],[92864,92873,1]]),_(d,"Tangut",[[94176,94208,32],[94209,100343,1],[100352,101119,1],[101632,101640,1]]),_(d,"Telugu",[[3072,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3132,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3160,3162,1],[3165,3168,3],[3169,3171,1],[3174,3183,1],[3191,3199,1]]),_(d,"Thaana",[[1920,1969,1]]),_(d,"Thai",[[3585,3642,1],[3648,3675,1]]),_(d,"Tibetan",[[3840,3911,1],[3913,3948,1],[3953,3991,1],[3993,4028,1],[4030,4044,1],[4046,4052,1],[4057,4058,1]]),_(d,"Tifinagh",[[11568,11623,1],[11631,11632,1],[11647,11647,1]]),_(d,"Tirhuta",[[70784,70855,1],[70864,70873,1]]),_(d,"Toto",[[123536,123566,1]]),_(d,"Ugaritic",[[66432,66461,1],[66463,66463,1]]),_(d,"Vai",[[42240,42539,1]]),_(d,"Vithkuqi",[[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1]]),_(d,"Wancho",[[123584,123641,1],[123647,123647,1]]),_(d,"Warang_Citi",[[71840,71922,1],[71935,71935,1]]),_(d,"Yezidi",[[69248,69289,1],[69291,69293,1],[69296,69297,1]]),_(d,"Yi",[[40960,42124,1],[42128,42182,1]]),_(d,"Zanabazar_Square",[[72192,72263,1]]),_(d,"CATEGORIES",new Map([["C",d.C],["Cc",d.Cc],["Cf",d.Cf],["Co",d.Co],["Cs",d.Cs],["L",d.L],["Ll",d.Ll],["Lm",d.Lm],["Lo",d.Lo],["Lt",d.Lt],["Lu",d.Lu],["M",d.M],["Mc",d.Mc],["Me",d.Me],["Mn",d.Mn],["N",d.N],["Nd",d.Nd],["Nl",d.Nl],["No",d.No],["P",d.P],["Pc",d.Pc],["Pd",d.Pd],["Pe",d.Pe],["Pf",d.Pf],["Pi",d.Pi],["Po",d.Po],["Ps",d.Ps],["S",d.S],["Sc",d.Sc],["Sk",d.Sk],["Sm",d.Sm],["So",d.So],["Z",d.Z],["Zl",d.Zl],["Zp",d.Zp],["Zs",d.Zs]])),_(d,"SCRIPTS",new Map([["Adlam",d.Adlam],["Ahom",d.Ahom],["Anatolian_Hieroglyphs",d.Anatolian_Hieroglyphs],["Arabic",d.Arabic],["Armenian",d.Armenian],["Avestan",d.Avestan],["Balinese",d.Balinese],["Bamum",d.Bamum],["Bassa_Vah",d.Bassa_Vah],["Batak",d.Batak],["Bengali",d.Bengali],["Bhaiksuki",d.Bhaiksuki],["Bopomofo",d.Bopomofo],["Brahmi",d.Brahmi],["Braille",d.Braille],["Buginese",d.Buginese],["Buhid",d.Buhid],["Canadian_Aboriginal",d.Canadian_Aboriginal],["Carian",d.Carian],["Caucasian_Albanian",d.Caucasian_Albanian],["Chakma",d.Chakma],["Cham",d.Cham],["Cherokee",d.Cherokee],["Chorasmian",d.Chorasmian],["Common",d.Common],["Coptic",d.Coptic],["Cuneiform",d.Cuneiform],["Cypriot",d.Cypriot],["Cypro_Minoan",d.Cypro_Minoan],["Cyrillic",d.Cyrillic],["Deseret",d.Deseret],["Devanagari",d.Devanagari],["Dives_Akuru",d.Dives_Akuru],["Dogra",d.Dogra],["Duployan",d.Duployan],["Egyptian_Hieroglyphs",d.Egyptian_Hieroglyphs],["Elbasan",d.Elbasan],["Elymaic",d.Elymaic],["Ethiopic",d.Ethiopic],["Georgian",d.Georgian],["Glagolitic",d.Glagolitic],["Gothic",d.Gothic],["Grantha",d.Grantha],["Greek",d.Greek],["Gujarati",d.Gujarati],["Gunjala_Gondi",d.Gunjala_Gondi],["Gurmukhi",d.Gurmukhi],["Han",d.Han],["Hangul",d.Hangul],["Hanifi_Rohingya",d.Hanifi_Rohingya],["Hanunoo",d.Hanunoo],["Hatran",d.Hatran],["Hebrew",d.Hebrew],["Hiragana",d.Hiragana],["Imperial_Aramaic",d.Imperial_Aramaic],["Inherited",d.Inherited],["Inscriptional_Pahlavi",d.Inscriptional_Pahlavi],["Inscriptional_Parthian",d.Inscriptional_Parthian],["Javanese",d.Javanese],["Kaithi",d.Kaithi],["Kannada",d.Kannada],["Katakana",d.Katakana],["Kawi",d.Kawi],["Kayah_Li",d.Kayah_Li],["Kharoshthi",d.Kharoshthi],["Khitan_Small_Script",d.Khitan_Small_Script],["Khmer",d.Khmer],["Khojki",d.Khojki],["Khudawadi",d.Khudawadi],["Lao",d.Lao],["Latin",d.Latin],["Lepcha",d.Lepcha],["Limbu",d.Limbu],["Linear_A",d.Linear_A],["Linear_B",d.Linear_B],["Lisu",d.Lisu],["Lycian",d.Lycian],["Lydian",d.Lydian],["Mahajani",d.Mahajani],["Makasar",d.Makasar],["Malayalam",d.Malayalam],["Mandaic",d.Mandaic],["Manichaean",d.Manichaean],["Marchen",d.Marchen],["Masaram_Gondi",d.Masaram_Gondi],["Medefaidrin",d.Medefaidrin],["Meetei_Mayek",d.Meetei_Mayek],["Mende_Kikakui",d.Mende_Kikakui],["Meroitic_Cursive",d.Meroitic_Cursive],["Meroitic_Hieroglyphs",d.Meroitic_Hieroglyphs],["Miao",d.Miao],["Modi",d.Modi],["Mongolian",d.Mongolian],["Mro",d.Mro],["Multani",d.Multani],["Myanmar",d.Myanmar],["Nabataean",d.Nabataean],["Nag_Mundari",d.Nag_Mundari],["Nandinagari",d.Nandinagari],["New_Tai_Lue",d.New_Tai_Lue],["Newa",d.Newa],["Nko",d.Nko],["Nushu",d.Nushu],["Nyiakeng_Puachue_Hmong",d.Nyiakeng_Puachue_Hmong],["Ogham",d.Ogham],["Ol_Chiki",d.Ol_Chiki],["Old_Hungarian",d.Old_Hungarian],["Old_Italic",d.Old_Italic],["Old_North_Arabian",d.Old_North_Arabian],["Old_Permic",d.Old_Permic],["Old_Persian",d.Old_Persian],["Old_Sogdian",d.Old_Sogdian],["Old_South_Arabian",d.Old_South_Arabian],["Old_Turkic",d.Old_Turkic],["Old_Uyghur",d.Old_Uyghur],["Oriya",d.Oriya],["Osage",d.Osage],["Osmanya",d.Osmanya],["Pahawh_Hmong",d.Pahawh_Hmong],["Palmyrene",d.Palmyrene],["Pau_Cin_Hau",d.Pau_Cin_Hau],["Phags_Pa",d.Phags_Pa],["Phoenician",d.Phoenician],["Psalter_Pahlavi",d.Psalter_Pahlavi],["Rejang",d.Rejang],["Runic",d.Runic],["Samaritan",d.Samaritan],["Saurashtra",d.Saurashtra],["Sharada",d.Sharada],["Shavian",d.Shavian],["Siddham",d.Siddham],["SignWriting",d.SignWriting],["Sinhala",d.Sinhala],["Sogdian",d.Sogdian],["Sora_Sompeng",d.Sora_Sompeng],["Soyombo",d.Soyombo],["Sundanese",d.Sundanese],["Syloti_Nagri",d.Syloti_Nagri],["Syriac",d.Syriac],["Tagalog",d.Tagalog],["Tagbanwa",d.Tagbanwa],["Tai_Le",d.Tai_Le],["Tai_Tham",d.Tai_Tham],["Tai_Viet",d.Tai_Viet],["Takri",d.Takri],["Tamil",d.Tamil],["Tangsa",d.Tangsa],["Tangut",d.Tangut],["Telugu",d.Telugu],["Thaana",d.Thaana],["Thai",d.Thai],["Tibetan",d.Tibetan],["Tifinagh",d.Tifinagh],["Tirhuta",d.Tirhuta],["Toto",d.Toto],["Ugaritic",d.Ugaritic],["Vai",d.Vai],["Vithkuqi",d.Vithkuqi],["Wancho",d.Wancho],["Warang_Citi",d.Warang_Citi],["Yezidi",d.Yezidi],["Yi",d.Yi],["Zanabazar_Square",d.Zanabazar_Square]])),_(d,"FOLD_CATEGORIES",new Map([["L",d.foldL],["Ll",d.foldLl],["Lt",d.foldLt],["Lu",d.foldLu],["M",d.foldM],["Mn",d.foldMn]])),_(d,"FOLD_SCRIPT",new Map([["Common",d.foldCommon],["Greek",d.foldGreek],["Inherited",d.foldInherited]]));let jt=d;class X{static is32(t,e){let r=0,s=t.length;for(;r<s;){let i=r+Math.floor((s-r)/2),o=t[i];if(o[0]<=e&&e<=o[1])return(e-o[0])%o[2]===0;e<o[0]?s=i:r=i+1}return!1}static is(t,e){if(e<=this.MAX_LATIN1){for(let r of t)if(!(e>r[1]))return e<r[0]?!1:(e-r[0])%r[2]===0;return!1}return t.length>0&&e>=t[0][0]&&this.is32(t,e)}static isUpper(t){if(t<=this.MAX_LATIN1){const e=String.fromCodePoint(t);return e.toUpperCase()===e&&e.toLowerCase()!==e}return this.is(jt.Upper,t)}static isPrint(t){return t<=this.MAX_LATIN1?t>=32&&t<127||t>=161&&t!==173:this.is(jt.L,t)||this.is(jt.M,t)||this.is(jt.N,t)||this.is(jt.P,t)||this.is(jt.S,t)}static simpleFold(t){if(jt.CASE_ORBIT.has(t))return jt.CASE_ORBIT.get(t);const e=b.toLowerCase(t);return e!==t?e:b.toUpperCase(t)}static equalsIgnoreCase(t,e){if(t<0||e<0||t===e)return!0;if(t<=this.MAX_ASCII&&e<=this.MAX_ASCII)return b.CODES.get("A")<=t&&t<=b.CODES.get("Z")&&(t|=32),b.CODES.get("A")<=e&&e<=b.CODES.get("Z")&&(e|=32),t===e;for(let r=this.simpleFold(t);r!==t;r=this.simpleFold(r))if(r===e)return!0;return!1}}_(X,"MAX_RUNE",1114111),_(X,"MAX_ASCII",127),_(X,"MAX_LATIN1",255),_(X,"MAX_BMP",65535),_(X,"MIN_FOLD",65),_(X,"MAX_FOLD",125251);class tt{static emptyInts(){return[]}static isalnum(t){return b.CODES.get("0")<=t&&t<=b.CODES.get("9")||b.CODES.get("a")<=t&&t<=b.CODES.get("z")||b.CODES.get("A")<=t&&t<=b.CODES.get("Z")}static unhex(t){return b.CODES.get("0")<=t&&t<=b.CODES.get("9")?t-b.CODES.get("0"):b.CODES.get("a")<=t&&t<=b.CODES.get("f")?t-b.CODES.get("a")+10:b.CODES.get("A")<=t&&t<=b.CODES.get("F")?t-b.CODES.get("A")+10:-1}static escapeRune(t){let e="";if(X.isPrint(t))this.METACHARACTERS.indexOf(String.fromCodePoint(t))>=0&&(e+="\\"),e+=String.fromCodePoint(t);else switch(t){case b.CODES.get('"'):e+='\\"';break;case b.CODES.get("\\"):e+="\\\\";break;case b.CODES.get("	"):e+="\\t";break;case b.CODES.get(`
`):e+="\\n";break;case b.CODES.get("\r"):e+="\\r";break;case b.CODES.get("\b"):e+="\\b";break;case b.CODES.get("\f"):e+="\\f";break;default:{let r=t.toString(16);t<256?(e+="\\x",r.length===1&&(e+="0"),e+=r):e+=`\\x{${r}}`;break}}return e}static stringToRunes(t){return String(t).split("").map(e=>e.codePointAt(0))}static runeToString(t){return String.fromCodePoint(t)}static isWordRune(t){return b.CODES.get("a")<=t&&t<=b.CODES.get("z")||b.CODES.get("A")<=t&&t<=b.CODES.get("Z")||b.CODES.get("0")<=t&&t<=b.CODES.get("9")||t===b.CODES.get("_")}static emptyOpContext(t,e){let r=0;return t<0&&(r|=this.EMPTY_BEGIN_TEXT|this.EMPTY_BEGIN_LINE),t===b.CODES.get(`
`)&&(r|=this.EMPTY_BEGIN_LINE),e<0&&(r|=this.EMPTY_END_TEXT|this.EMPTY_END_LINE),e===b.CODES.get(`
`)&&(r|=this.EMPTY_END_LINE),this.isWordRune(t)!==this.isWordRune(e)?r|=this.EMPTY_WORD_BOUNDARY:r|=this.EMPTY_NO_WORD_BOUNDARY,r}static quoteMeta(t){return t.split("").map(e=>this.METACHARACTERS.indexOf(e)>=0?`\\${e}`:e).join("")}static charCount(t){return t>X.MAX_BMP?2:1}static stringToUtf8ByteArray(t){if(globalThis.TextEncoder)return Array.from(new TextEncoder().encode(t));{let e=[],r=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[r++]=i:i<2048?(e[r++]=i>>6|192,e[r++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[r++]=i>>18|240,e[r++]=i>>12&63|128,e[r++]=i>>6&63|128,e[r++]=i&63|128):(e[r++]=i>>12|224,e[r++]=i>>6&63|128,e[r++]=i&63|128)}return e}}static utf8ByteArrayToString(t){if(globalThis.TextDecoder)return new TextDecoder("utf-8").decode(new Uint8Array(t));{let e=[],r=0,s=0;for(;r<t.length;){let i=t[r++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){let o=t[r++];e[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=t[r++],c=t[r++],u=t[r++],h=((i&7)<<18|(o&63)<<12|(c&63)<<6|u&63)-65536;e[s++]=String.fromCharCode(55296+(h>>10)),e[s++]=String.fromCharCode(56320+(h&1023))}else{let o=t[r++],c=t[r++];e[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|c&63)}}return e.join("")}}}_(tt,"METACHARACTERS","\\.+*?()|[]{}^$"),_(tt,"EMPTY_BEGIN_LINE",1),_(tt,"EMPTY_END_LINE",2),_(tt,"EMPTY_BEGIN_TEXT",4),_(tt,"EMPTY_END_TEXT",8),_(tt,"EMPTY_WORD_BOUNDARY",16),_(tt,"EMPTY_NO_WORD_BOUNDARY",32),_(tt,"EMPTY_ALL",-1);const H2=(n=[],t=0)=>{const e={};for(let r=0;r<n.length;r++){const s=n[r],i=t+r;e[s]=i,e[i]=s}return Object.freeze(e)},Vs=class Vs{getEncoding(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===Vs.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===Vs.Encoding.UTF_16}};_(Vs,"Encoding",H2(["UTF_16","UTF_8"]));let Cn=Vs;class pl extends Cn{constructor(t=null){super(),this.bytes=t}getEncoding(){return Cn.Encoding.UTF_8}asCharSequence(){return tt.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}}class L4 extends Cn{constructor(t=null){super(),this.charSequence=t}getEncoding(){return Cn.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return this.charSequence.toString().split("").map(t=>t.codePointAt(0))}length(){return this.charSequence.length}}class ao{static utf16(t){return new L4(t)}static utf8(t){return Array.isArray(t)?new pl(t):new pl(tt.stringToUtf8ByteArray(t))}}class bo extends Error{constructor(t){super(t),this.name="RE2JSException"}}class It extends bo{constructor(t,e=null){let r=`error parsing regexp: ${t}`;e&&(r+=`: \`${e}\``),super(r),this.name="RE2JSSyntaxException",this.message=r,this.error=t,this.input=e}getDescription(){return this.error}getPattern(){return this.input}}class M4 extends bo{constructor(t){super(t),this.name="RE2JSCompileException"}}class $e extends bo{constructor(t){super(t),this.name="RE2JSGroupException"}}class F4 extends bo{constructor(t){super(t),this.name="RE2JSFlagsException"}}class U4{static quoteReplacement(t){return t.indexOf("\\")<0&&t.indexOf("$")<0?t:t.split("").map(e=>{const r=e.codePointAt(0);return r===b.CODES["\\"]||r===b.CODES.$?`\\${e}`:e}).join("")}constructor(t,e){if(t===null)throw new Error("pattern is null");this.patternInput=t;const r=this.patternInput.re2();this.patternGroupCount=r.numberOfCapturingGroups(),this.groups=[],this.namedGroups=r.namedGroups,e instanceof Cn?this.resetMatcherInput(e):Array.isArray(e)?this.resetMatcherInput(ao.utf8(e)):this.resetMatcherInput(ao.utf16(e))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(t){if(t===null)throw new Error("input is null");return this.matcherInput=t,this.reset(),this}start(t=0){if(typeof t=="string"){const e=this.namedGroups[t];if(!Number.isFinite(e))throw new $e(`group '${t}' not found`);t=e}return this.loadGroup(t),this.groups[2*t]}end(t=0){if(typeof t=="string"){const e=this.namedGroups[t];if(!Number.isFinite(e))throw new $e(`group '${t}' not found`);t=e}return this.loadGroup(t),this.groups[2*t+1]}group(t=0){if(typeof t=="string"){const s=this.namedGroups[t];if(!Number.isFinite(s))throw new $e(`group '${t}' not found`);t=s}const e=this.start(t),r=this.end(t);return e<0&&r<0?null:this.substring(e,r)}groupCount(){return this.patternGroupCount}loadGroup(t){if(t<0||t>this.patternGroupCount)throw new $e(`Group index out of bounds: ${t}`);if(!this.hasMatch)throw new $e("perhaps no match attempted");if(t===0||this.hasGroups)return;let e=this.groups[1]+1;e>this.matcherInputLength&&(e=this.matcherInputLength);const r=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],e,this.anchorFlag,1+this.patternGroupCount);if(!r[0])throw new $e("inconsistency in matching group data");this.groups=r[1],this.hasGroups=!0}matches(){return this.genMatch(0,q.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,q.ANCHOR_START)}find(t=null){if(t!==null){if(t<0||t>this.matcherInputLength)throw new $e(`start index out of bounds: ${t}`);return this.reset(),this.genMatch(t,0)}return t=0,this.hasMatch&&(t=this.groups[1],this.groups[0]===this.groups[1]&&t++),this.genMatch(t,q.UNANCHORED)}genMatch(t,e){const r=this.patternInput.re2().matchMachineInput(this.matcherInput,t,this.matcherInputLength,e,1);return r[0]?(this.groups=r[1],this.hasMatch=!0,this.hasGroups=!1,this.anchorFlag=e,!0):!1}substring(t,e){return this.matcherInput.isUTF8Encoding()?tt.utf8ByteArrayToString(this.matcherInput.asBytes().slice(t,e)):this.matcherInput.asCharSequence().substring(t,e).toString()}inputLength(){return this.matcherInputLength}appendReplacement(t,e=!1){let r="";const s=this.start(),i=this.end();return this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i,r+=e?this.appendReplacementInternalPerl(t):this.appendReplacementInternal(t),r}appendReplacementInternal(t){let e="",r=0;const s=t.length;for(let i=0;i<s-1;i++){if(t.codePointAt(i)===b.CODES.get("\\")){r<i&&(e+=t.substring(r,i)),i++,r=i;continue}if(t.codePointAt(i)===b.CODES.get("$")){let o=t.codePointAt(i+1);if(b.CODES.get("0")<=o&&o<=b.CODES.get("9")){let c=o-b.CODES.get("0");for(r<i&&(e+=t.substring(r,i)),i+=2;i<s&&(o=t.codePointAt(i),!(o<b.CODES.get("0")||o>b.CODES.get("9")||c*10+o-b.CODES.get("0")>this.patternGroupCount));i++)c=c*10+o-b.CODES.get("0");if(c>this.patternGroupCount)throw new $e(`n > number of groups: ${c}`);const u=this.group(c);u!==null&&(e+=u),r=i,i--;continue}else if(o===b.CODES.get("{")){r<i&&(e+=t.substring(r,i)),i++;let c=i+1;for(;c<t.length&&t.codePointAt(c)!==b.CODES.get("}")&&t.codePointAt(c)!==b.CODES.get(" ");)c++;if(c===t.length||t.codePointAt(c)!==b.CODES.get("}"))throw new $e("named capture group is missing trailing '}'");const u=t.substring(i+1,c);e+=this.group(u),r=c+1}}}return r<s&&(e+=t.substring(r,s)),e}appendReplacementInternalPerl(t){let e="",r=0;const s=t.length;for(let i=0;i<s-1;i++)if(t.codePointAt(i)===b.CODES.get("$")){let o=t.codePointAt(i+1);if(b.CODES.get("$")===o){r<i&&(e+=t.substring(r,i)),e+="$",i++,r=i+1;continue}else if(b.CODES.get("&")===o){r<i&&(e+=t.substring(r,i));const c=this.group(0);c!==null?e+=c:e+="$&",i++,r=i+1;continue}else if(b.CODES.get("1")<=o&&o<=b.CODES.get("9")){let c=o-b.CODES.get("0");for(r<i&&(e+=t.substring(r,i)),i+=2;i<s&&(o=t.codePointAt(i),!(o<b.CODES.get("0")||o>b.CODES.get("9")||c*10+o-b.CODES.get("0")>this.patternGroupCount));i++)c=c*10+o-b.CODES.get("0");if(c>this.patternGroupCount){e+=`$${c}`,r=i,i--;continue}const u=this.group(c);u!==null&&(e+=u),r=i,i--;continue}else if(o===b.CODES.get("<")){r<i&&(e+=t.substring(r,i)),i++;let c=i+1;for(;c<t.length&&t.codePointAt(c)!==b.CODES.get(">")&&t.codePointAt(c)!==b.CODES.get(" ");)c++;if(c===t.length||t.codePointAt(c)!==b.CODES.get(">")){e+=t.substring(i-1,c+1),r=c+1;continue}const u=t.substring(i+1,c);Object.prototype.hasOwnProperty.call(this.namedGroups,u)?e+=this.group(u):e+=`$<${u}>`,r=c+1}}return r<s&&(e+=t.substring(r,s)),e}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(t,e=!1){return this.replace(t,!0,e)}replaceFirst(t,e=!1){return this.replace(t,!1,e)}replace(t,e=!0,r=!1){let s="";for(this.reset();this.find()&&(s+=this.appendReplacement(t,r),!!e););return s+=this.appendTail(),s}}class yn{static EOF(){return-8}canCheckPrefix(){return!0}endPos(){return this.end}}class B4 extends yn{constructor(t,e=0,r=t.length){super(),this.bytes=t,this.start=e,this.end=r}step(t){if(t+=this.start,t>=this.end)return yn.EOF();let e=this.bytes[t++]&255;return(e&128)===0?e<<3|1:(e&224)===192?(e=e&31,t>=this.end?yn.EOF():(e=e<<6|this.bytes[t++]&63,e<<3|2)):(e&240)===224?(e=e&15,t+1>=this.end?yn.EOF():(e=e<<6|this.bytes[t++]&63,e=e<<6|this.bytes[t++]&63,e<<3|3)):(e=e&7,t+2>=this.end?yn.EOF():(e=e<<6|this.bytes[t++]&63,e=e<<6|this.bytes[t++]&63,e=e<<6|this.bytes[t++]&63,e<<3|4))}index(t,e){e+=this.start;const r=this.indexOf(this.bytes,t.prefixUTF8,e);return r<0?r:r-e}context(t){t+=this.start;let e=-1;if(t>this.start&&t<=this.end){let s=t-1;if(e=this.bytes[s--],e>=128){let i=t-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start),e=this.step(s)>>3}}const r=t<this.end?this.step(t)>>3:-1;return tt.emptyOpContext(e,r)}indexOf(t,e,r=0){let s=e.length;if(s===0)return-1;let i=t.length;for(let o=r;o<=i-s;o++)for(let c=0;c<s&&t[o+c]===e[c];c++)if(c===s-1)return o;return-1}}class $4 extends yn{constructor(t,e=0,r=t.length){super(),this.charSequence=t,this.start=e,this.end=r}step(t){if(t+=this.start,t<this.end){const e=this.charSequence.codePointAt(t);return e<<3|tt.charCount(e)}else return yn.EOF()}index(t,e){e+=this.start;const r=this.charSequence.indexOf(t.prefix,e);return r<0?r:r-e}context(t){t+=this.start;const e=t>0&&t<=this.charSequence.length?this.charSequence.codePointAt(t-1):-1,r=t<this.charSequence.length?this.charSequence.codePointAt(t):-1;return tt.emptyOpContext(e,r)}}class At{static fromUTF8(t,e=0,r=t.length){return new B4(t,e,r)}static fromUTF16(t,e=0,r=t.length){return new $4(t,e,r)}}const K=class K{static isPseudoOp(t){return t>=K.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(t){return t===b.CODES.get("-")?"\\":""}static fromRegexp(t){const e=new K(t.op);return e.flags=t.flags,e.subs=t.subs,e.runes=t.runes,e.cap=t.cap,e.min=t.min,e.max=t.max,e.name=t.name,e.namedGroups=t.namedGroups,e}constructor(t){this.op=t,this.flags=0,this.subs=K.emptySubs(),this.runes=null,this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups={}}reinit(){this.flags=0,this.subs=K.emptySubs(),this.runes=null,this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups={}}toString(){return this.appendTo()}appendTo(){let t="";switch(this.op){case K.Op.NO_MATCH:t+="[^\\x00-\\x{10FFFF}]";break;case K.Op.EMPTY_MATCH:t+="(?:)";break;case K.Op.STAR:case K.Op.PLUS:case K.Op.QUEST:case K.Op.REPEAT:{const e=this.subs[0];switch(e.op>K.Op.CAPTURE||e.op===K.Op.LITERAL&&e.runes.length>1?t+=`(?:${e.appendTo()})`:t+=e.appendTo(),this.op){case K.Op.STAR:t+="*";break;case K.Op.PLUS:t+="+";break;case K.Op.QUEST:t+="?";break;case K.Op.REPEAT:t+=`{${this.min}`,this.min!==this.max&&(t+=",",this.max>=0&&(t+=this.max)),t+="}";break}(this.flags&q.NON_GREEDY)!==0&&(t+="?");break}case K.Op.CONCAT:{for(let e of this.subs)e.op===K.Op.ALTERNATE?t+=`(?:${e.appendTo()})`:t+=e.appendTo();break}case K.Op.ALTERNATE:{let e="";for(let r of this.subs)t+=e,e="|",t+=r.appendTo();break}case K.Op.LITERAL:(this.flags&q.FOLD_CASE)!==0&&(t+="(?i:");for(let e of this.runes)t+=tt.escapeRune(e);(this.flags&q.FOLD_CASE)!==0&&(t+=")");break;case K.Op.ANY_CHAR_NOT_NL:t+="(?-s:.)";break;case K.Op.ANY_CHAR:t+="(?s:.)";break;case K.Op.CAPTURE:this.name===null||this.name.length===0?t+="(":t+=`(?P<${this.name}>`,this.subs[0].op!==K.Op.EMPTY_MATCH&&(t+=this.subs[0].appendTo()),t+=")";break;case K.Op.BEGIN_TEXT:t+="\\A";break;case K.Op.END_TEXT:(this.flags&q.WAS_DOLLAR)!==0?t+="(?-m:$)":t+="\\z";break;case K.Op.BEGIN_LINE:t+="^";break;case K.Op.END_LINE:t+="$";break;case K.Op.WORD_BOUNDARY:t+="\\b";break;case K.Op.NO_WORD_BOUNDARY:t+="\\B";break;case K.Op.CHAR_CLASS:if(this.runes.length%2!==0){t+="[invalid char class]";break}if(t+="[",this.runes.length===0)t+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===X.MAX_RUNE){t+="^";for(let e=1;e<this.runes.length-1;e+=2){const r=this.runes[e]+1,s=this.runes[e+1]-1;t+=K.quoteIfHyphen(r),t+=tt.escapeRune(r),r!==s&&(t+="-",t+=K.quoteIfHyphen(s),t+=tt.escapeRune(s))}}else for(let e=0;e<this.runes.length;e+=2){const r=this.runes[e],s=this.runes[e+1];t+=K.quoteIfHyphen(r),t+=tt.escapeRune(r),r!==s&&(t+="-",t+=K.quoteIfHyphen(s),t+=tt.escapeRune(s))}t+="]";break;default:t+=this.op;break}return t}maxCap(){let t=0;if(this.op===K.Op.CAPTURE&&(t=this.cap),this.subs!==null)for(let e of this.subs){const r=e.maxCap();t<r&&(t=r)}return t}equals(t){if(!(t!==null&&t instanceof K)||this.op!==t.op)return!1;switch(this.op){case K.Op.END_TEXT:{if((this.flags&q.WAS_DOLLAR)!==(t.flags&q.WAS_DOLLAR))return!1;break}case K.Op.LITERAL:case K.Op.CHAR_CLASS:{if(this.runes===null&&t.runes===null)break;if(this.runes===null||t.runes===null||this.runes.length!==t.runes.length)return!1;for(let e=0;e<this.runes.length;e++)if(this.runes[e]!==t.runes[e])return!1;break}case K.Op.ALTERNATE:case K.Op.CONCAT:{if(this.subs.length!==t.subs.length)return!1;for(let e=0;e<this.subs.length;++e)if(!this.subs[e].equals(t.subs[e]))return!1;break}case K.Op.STAR:case K.Op.PLUS:case K.Op.QUEST:{if((this.flags&q.NON_GREEDY)!==(t.flags&q.NON_GREEDY)||!this.subs[0].equals(t.subs[0]))return!1;break}case K.Op.REPEAT:{if((this.flags&q.NON_GREEDY)!==(t.flags&q.NON_GREEDY)||this.min!==t.min||this.max!==t.max||!this.subs[0].equals(t.subs[0]))return!1;break}case K.Op.CAPTURE:{if(this.cap!==t.cap||(this.name===null?t.name!==null:this.name!==t.name)||!this.subs[0].equals(t.subs[0]))return!1;break}}return!0}};_(K,"Op",H2(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","LEFT_PAREN","VERTICAL_BAR"]));let k=K;const lt=class lt{static isRuneOp(t){return lt.RUNE<=t&&t<=lt.RUNE_ANY_NOT_NL}static escapeRunes(t){let e='"';for(let r of t)e+=tt.escapeRune(r);return e+='"',e}constructor(t){this.op=t,this.out=0,this.arg=0,this.runes=null}matchRune(t){if(this.runes.length===1){const s=this.runes[0];return(this.arg&q.FOLD_CASE)!==0?X.equalsIgnoreCase(s,t):t===s}for(let s=0;s<this.runes.length&&s<=8;s+=2){if(t<this.runes[s])return!1;if(t<=this.runes[s+1])return!0}let e=0,r=this.runes.length/2|0;for(;e<r;){const s=e+((r-e)/2|0);if(this.runes[2*s]<=t){if(t<=this.runes[2*s+1])return!0;e=s+1}else r=s}return!1}toString(){switch(this.op){case lt.ALT:return`alt -> ${this.out}, ${this.arg}`;case lt.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case lt.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case lt.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case lt.MATCH:return"match";case lt.FAIL:return"fail";case lt.NOP:return`nop -> ${this.out}`;case lt.RUNE:return this.runes===null?"rune <null>":["rune ",lt.escapeRunes(this.runes),(this.arg&q.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case lt.RUNE1:return`rune1 ${lt.escapeRunes(this.runes)} -> ${this.out}`;case lt.RUNE_ANY:return`any -> ${this.out}`;case lt.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}};_(lt,"ALT",1),_(lt,"ALT_MATCH",2),_(lt,"CAPTURE",3),_(lt,"EMPTY_WIDTH",4),_(lt,"FAIL",5),_(lt,"MATCH",6),_(lt,"NOP",7),_(lt,"RUNE",8),_(lt,"RUNE1",9),_(lt,"RUNE_ANY",10),_(lt,"RUNE_ANY_NOT_NL",11);let et=lt;class q4{constructor(){this.inst=[],this.start=0,this.numCap=2}getInst(t){return this.inst[t]}numInst(){return this.inst.length}addInst(t){this.inst.push(new et(t))}skipNop(t){let e=this.inst[t];for(;e.op===et.NOP||e.op===et.CAPTURE;)e=this.inst[t],t=e.out;return e}prefix(){let t="",e=this.skipNop(this.start);if(!et.isRuneOp(e.op)||e.runes.length!==1)return[e.op===et.MATCH,t];for(;et.isRuneOp(e.op)&&e.runes.length===1&&(e.arg&q.FOLD_CASE)===0;)t+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===et.MATCH,t]}startCond(){let t=0,e=this.start;t:for(;;){const r=this.inst[e];switch(r.op){case et.EMPTY_WIDTH:t|=r.arg;break;case et.FAIL:return-1;case et.CAPTURE:case et.NOP:break;default:break t}e=r.out}return t}next(t){const e=this.inst[t>>1];return(t&1)===0?e.out:e.arg}patch(t,e){for(;t!==0;){const r=this.inst[t>>1];(t&1)===0?(t=r.out,r.out=e):(t=r.arg,r.arg=e)}}append(t,e){if(t===0)return e;if(e===0)return t;let r=t;for(;;){const i=this.next(r);if(i===0)break;r=i}const s=this.inst[r>>1];return(r&1)===0?s.out=e:s.arg=e,t}toString(){let t="";for(let e=0;e<this.inst.length;e++){const r=t.length;t+=e,e===this.start&&(t+="*"),t+="        ".substring(t.length-r),t+=this.inst[e],t+=`
`}return t}}class Mi{constructor(t=0,e=0,r=!1){this.i=t,this.out=e,this.nullable=r}}class As{static ANY_RUNE_NOT_NL(){return[0,b.CODES.get(`
`)-1,b.CODES.get(`
`)+1,X.MAX_RUNE]}static ANY_RUNE(){return[0,X.MAX_RUNE]}static compileRegexp(t){const e=new As,r=e.compile(t);return e.prog.patch(r.out,e.newInst(et.MATCH).i),e.prog.start=r.i,e.prog}constructor(){this.prog=new q4,this.newInst(et.FAIL)}newInst(t){return this.prog.addInst(t),new Mi(this.prog.numInst()-1,0,!0)}nop(){const t=this.newInst(et.NOP);return t.out=t.i<<1,t}fail(){return new Mi}cap(t){const e=this.newInst(et.CAPTURE);return e.out=e.i<<1,this.prog.getInst(e.i).arg=t,this.prog.numCap<t+1&&(this.prog.numCap=t+1),e}cat(t,e){return t.i===0||e.i===0?this.fail():(this.prog.patch(t.out,e.i),new Mi(t.i,e.out,t.nullable&&e.nullable))}alt(t,e){if(t.i===0)return e;if(e.i===0)return t;const r=this.newInst(et.ALT),s=this.prog.getInst(r.i);return s.out=t.i,s.arg=e.i,r.out=this.prog.append(t.out,e.out),r.nullable=t.nullable||e.nullable,r}loop(t,e){const r=this.newInst(et.ALT),s=this.prog.getInst(r.i);return e?(s.arg=t.i,r.out=r.i<<1):(s.out=t.i,r.out=r.i<<1|1),this.prog.patch(t.out,r.i),r}quest(t,e){const r=this.newInst(et.ALT),s=this.prog.getInst(r.i);return e?(s.arg=t.i,r.out=r.i<<1):(s.out=t.i,r.out=r.i<<1|1),r.out=this.prog.append(r.out,t.out),r}star(t,e){return t.nullable?this.quest(this.plus(t,e),e):this.loop(t,e)}plus(t,e){return new Mi(t.i,this.loop(t,e).out,t.nullable)}empty(t){const e=this.newInst(et.EMPTY_WIDTH);return this.prog.getInst(e.i).arg=t,e.out=e.i<<1,e}rune(t,e){const r=this.newInst(et.RUNE);r.nullable=!1;const s=this.prog.getInst(r.i);return s.runes=t,e&=q.FOLD_CASE,(t.length!==1||X.simpleFold(t[0])===t[0])&&(e&=-2),s.arg=e,r.out=r.i<<1,(e&q.FOLD_CASE)===0&&t.length===1||t.length===2&&t[0]===t[1]?s.op=et.RUNE1:t.length===2&&t[0]===0&&t[1]===X.MAX_RUNE?s.op=et.RUNE_ANY:t.length===4&&t[0]===0&&t[1]===b.CODES.get(`
`)-1&&t[2]===b.CODES.get(`
`)+1&&t[3]===X.MAX_RUNE&&(s.op=et.RUNE_ANY_NOT_NL),r}compile(t){switch(t.op){case k.Op.NO_MATCH:return this.fail();case k.Op.EMPTY_MATCH:return this.nop();case k.Op.LITERAL:if(t.runes.length===0)return this.nop();{let e=null;for(let r of t.runes){const s=this.rune([r],t.flags);e=e===null?s:this.cat(e,s)}return e}case k.Op.CHAR_CLASS:return this.rune(t.runes,t.flags);case k.Op.ANY_CHAR_NOT_NL:return this.rune(As.ANY_RUNE_NOT_NL(),0);case k.Op.ANY_CHAR:return this.rune(As.ANY_RUNE(),0);case k.Op.BEGIN_LINE:return this.empty(tt.EMPTY_BEGIN_LINE);case k.Op.END_LINE:return this.empty(tt.EMPTY_END_LINE);case k.Op.BEGIN_TEXT:return this.empty(tt.EMPTY_BEGIN_TEXT);case k.Op.END_TEXT:return this.empty(tt.EMPTY_END_TEXT);case k.Op.WORD_BOUNDARY:return this.empty(tt.EMPTY_WORD_BOUNDARY);case k.Op.NO_WORD_BOUNDARY:return this.empty(tt.EMPTY_NO_WORD_BOUNDARY);case k.Op.CAPTURE:{const e=this.cap(t.cap<<1),r=this.compile(t.subs[0]),s=this.cap(t.cap<<1|1);return this.cat(this.cat(e,r),s)}case k.Op.STAR:return this.star(this.compile(t.subs[0]),(t.flags&q.NON_GREEDY)!==0);case k.Op.PLUS:return this.plus(this.compile(t.subs[0]),(t.flags&q.NON_GREEDY)!==0);case k.Op.QUEST:return this.quest(this.compile(t.subs[0]),(t.flags&q.NON_GREEDY)!==0);case k.Op.CONCAT:{if(t.subs.length===0)return this.nop();{let e=null;for(let r of t.subs){const s=this.compile(r);e=e===null?s:this.cat(e,s)}return e}}case k.Op.ALTERNATE:{if(t.subs.length===0)return this.nop();{let e=null;for(let r of t.subs){const s=this.compile(r);e=e===null?s:this.alt(e,s)}return e}}default:throw new M4("regexp: unhandled case in compile")}}}class we{static simplify(t){if(t===null)return null;switch(t.op){case k.Op.CAPTURE:case k.Op.CONCAT:case k.Op.ALTERNATE:{let e=t;for(let r=0;r<t.subs.length;r++){const s=t.subs[r],i=we.simplify(s);e===t&&i!==s&&(e=k.fromRegexp(t),e.runes=null,e.subs=t.subs.slice(0,t.subs.length)),e!==t&&(e.subs[r]=i)}return e}case k.Op.STAR:case k.Op.PLUS:case k.Op.QUEST:{const e=we.simplify(t.subs[0]);return we.simplify1(t.op,t.flags,e,t)}case k.Op.REPEAT:{if(t.min===0&&t.max===0)return new k(k.Op.EMPTY_MATCH);const e=we.simplify(t.subs[0]);if(t.max===-1){if(t.min===0)return we.simplify1(k.Op.STAR,t.flags,e,null);if(t.min===1)return we.simplify1(k.Op.PLUS,t.flags,e,null);const s=new k(k.Op.CONCAT),i=[];for(let o=0;o<t.min-1;o++)i.push(e);return i.push(we.simplify1(k.Op.PLUS,t.flags,e,null)),s.subs=i.slice(0),s}if(t.min===1&&t.max===1)return e;let r=null;if(t.min>0){r=[];for(let s=0;s<t.min;s++)r.push(e)}if(t.max>t.min){let s=we.simplify1(k.Op.QUEST,t.flags,e,null);for(let i=t.min+1;i<t.max;i++){const o=new k(k.Op.CONCAT);o.subs=[e,s],s=we.simplify1(k.Op.QUEST,t.flags,o,null)}if(r===null)return s;r.push(s)}if(r!==null){const s=new k(k.Op.CONCAT);return s.subs=r.slice(0),s}return new k(k.Op.NO_MATCH)}}return t}static simplify1(t,e,r,s){return r.op===k.Op.EMPTY_MATCH||t===r.op&&(e&q.NON_GREEDY)===(r.flags&q.NON_GREEDY)?r:(s!==null&&s.op===t&&(s.flags&q.NON_GREEDY)===(e&q.NON_GREEDY)&&r===s.subs[0]||(s=new k(t),s.flags=e,s.subs=[r]),s)}}class at{constructor(t,e){this.sign=t,this.cls=e}}const gl=[48,57],ml=[9,10,12,13,32,32],_l=[48,57,65,90,95,95,97,122],yl=new Map([["\\d",new at(1,gl)],["\\D",new at(-1,gl)],["\\s",new at(1,ml)],["\\S",new at(-1,ml)],["\\w",new at(1,_l)],["\\W",new at(-1,_l)]]),El=[48,57,65,90,97,122],wl=[65,90,97,122],Tl=[0,127],Il=[9,9,32,32],Al=[0,31,127,127],vl=[48,57],Rl=[33,126],Sl=[97,122],Cl=[32,126],Pl=[33,47,58,64,91,96,123,126],bl=[9,13,32,32],Nl=[65,90],Ol=[48,57,65,90,95,95,97,122],Dl=[48,57,65,70,97,102],kl=new Map([["[:alnum:]",new at(1,El)],["[:^alnum:]",new at(-1,El)],["[:alpha:]",new at(1,wl)],["[:^alpha:]",new at(-1,wl)],["[:ascii:]",new at(1,Tl)],["[:^ascii:]",new at(-1,Tl)],["[:blank:]",new at(1,Il)],["[:^blank:]",new at(-1,Il)],["[:cntrl:]",new at(1,Al)],["[:^cntrl:]",new at(-1,Al)],["[:digit:]",new at(1,vl)],["[:^digit:]",new at(-1,vl)],["[:graph:]",new at(1,Rl)],["[:^graph:]",new at(-1,Rl)],["[:lower:]",new at(1,Sl)],["[:^lower:]",new at(-1,Sl)],["[:print:]",new at(1,Cl)],["[:^print:]",new at(-1,Cl)],["[:punct:]",new at(1,Pl)],["[:^punct:]",new at(-1,Pl)],["[:space:]",new at(1,bl)],["[:^space:]",new at(-1,bl)],["[:upper:]",new at(1,Nl)],["[:^upper:]",new at(-1,Nl)],["[:word:]",new at(1,Ol)],["[:^word:]",new at(-1,Ol)],["[:xdigit:]",new at(1,Dl)],["[:^xdigit:]",new at(-1,Dl)]]);class Gt{static charClassToString(t,e){let r="[";for(let s=0;s<e;s+=2){s>0&&(r+=" ");const i=t[s],o=t[s+1];i===o?r+=`0x${i.toString(16)}`:r+=`0x${i.toString(16)}-0x${o.toString(16)}`}return r+="]",r}static cmp(t,e,r,s){const i=t[e]-r;return i!==0?i:s-t[e+1]}static qsortIntPair(t,e,r){const s=((e+r)/2|0)&-2,i=t[s],o=t[s+1];let c=e,u=r;for(;c<=u;){for(;c<r&&Gt.cmp(t,c,i,o)<0;)c+=2;for(;u>e&&Gt.cmp(t,u,i,o)>0;)u-=2;if(c<=u){if(c!==u){let h=t[c];t[c]=t[u],t[u]=h,h=t[c+1],t[c+1]=t[u+1],t[u+1]=h}c+=2,u-=2}}e<u&&Gt.qsortIntPair(t,e,u),c<r&&Gt.qsortIntPair(t,c,r)}constructor(t=tt.emptyInts()){this.r=t,this.len=t.length}toArray(){return this.len===this.r.length?this.r:this.r.slice(0,this.len)}cleanClass(){if(this.len<4)return this;Gt.qsortIntPair(this.r,0,this.len-2);let t=2;for(let e=2;e<this.len;e+=2){const r=this.r[e],s=this.r[e+1];if(r<=this.r[t-1]+1){s>this.r[t-1]&&(this.r[t-1]=s);continue}this.r[t]=r,this.r[t+1]=s,t+=2}return this.len=t,this}appendLiteral(t,e){return(e&q.FOLD_CASE)!==0?this.appendFoldedRange(t,t):this.appendRange(t,t)}appendRange(t,e){if(this.len>0){for(let r=2;r<=4;r+=2)if(this.len>=r){const s=this.r[this.len-r],i=this.r[this.len-r+1];if(t<=i+1&&s<=e+1)return t<s&&(this.r[this.len-r]=t),e>i&&(this.r[this.len-r+1]=e),this}}return this.r[this.len++]=t,this.r[this.len++]=e,this}appendFoldedRange(t,e){if(t<=X.MIN_FOLD&&e>=X.MAX_FOLD)return this.appendRange(t,e);if(e<X.MIN_FOLD||t>X.MAX_FOLD)return this.appendRange(t,e);t<X.MIN_FOLD&&(this.appendRange(t,X.MIN_FOLD-1),t=X.MIN_FOLD),e>X.MAX_FOLD&&(this.appendRange(X.MAX_FOLD+1,e),e=X.MAX_FOLD);for(let r=t;r<=e;r++){this.appendRange(r,r);for(let s=X.simpleFold(r);s!==r;s=X.simpleFold(s))this.appendRange(s,s)}return this}appendClass(t){for(let e=0;e<t.length;e+=2)this.appendRange(t[e],t[e+1]);return this}appendFoldedClass(t){for(let e=0;e<t.length;e+=2)this.appendFoldedRange(t[e],t[e+1]);return this}appendNegatedClass(t){let e=0;for(let r=0;r<t.length;r+=2){const s=t[r],i=t[r+1];e<=s-1&&this.appendRange(e,s-1),e=i+1}return e<=X.MAX_RUNE&&this.appendRange(e,X.MAX_RUNE),this}appendTable(t){for(let e of t){const r=e[0],s=e[1],i=e[2];if(i===1){this.appendRange(r,s);continue}for(let o=r;o<=s;o+=i)this.appendRange(o,o)}return this}appendNegatedTable(t){let e=0;for(let r of t){const s=r[0],i=r[1],o=r[2];if(o===1){e<=s-1&&this.appendRange(e,s-1),e=i+1;continue}for(let c=s;c<=i;c+=o)e<=c-1&&this.appendRange(e,c-1),e=c+1}return e<=X.MAX_RUNE&&this.appendRange(e,X.MAX_RUNE),this}appendTableWithSign(t,e){return e<0?this.appendNegatedTable(t):this.appendTable(t)}negateClass(){let t=0,e=0;for(let r=0;r<this.len;r+=2){const s=this.r[r],i=this.r[r+1];t<=s-1&&(this.r[e]=t,this.r[e+1]=s-1,e+=2),t=i+1}return this.len=e,t<=X.MAX_RUNE&&(this.r[this.len++]=t,this.r[this.len++]=X.MAX_RUNE),this}appendClassWithSign(t,e){return e<0?this.appendNegatedClass(t):this.appendClass(t)}appendGroup(t,e){let r=t.cls;return e&&(r=new Gt().appendFoldedClass(r).cleanClass().toArray()),this.appendClassWithSign(r,t.sign)}toString(){return Gt.charClassToString(this.r,this.len)}}class vs{static of(t,e){return new vs(t,e)}constructor(t,e){this.first=t,this.second=e}}class H4{constructor(t){this.str=t,this.position=0}pos(){return this.position}rewindTo(t){this.position=t}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(t){this.position+=t}skipString(t){this.position+=t.length}pop(){const t=this.str.codePointAt(this.position);return this.position+=tt.charCount(t),t}lookingAt(t){return this.rest().startsWith(t)}rest(){return this.str.substring(this.position)}from(t){return this.str.substring(t,this.position)}toString(){return this.rest()}}const j=class j{static ANY_TABLE(){return[[0,X.MAX_RUNE,1]]}static unicodeTable(t){return t==="Any"?vs.of(j.ANY_TABLE(),j.ANY_TABLE()):jt.CATEGORIES.has(t)?vs.of(jt.CATEGORIES.get(t),jt.FOLD_CATEGORIES.get(t)):jt.SCRIPTS.has(t)?vs.of(jt.SCRIPTS.get(t),jt.FOLD_SCRIPT.get(t)):null}static minFoldRune(t){if(t<X.MIN_FOLD||t>X.MAX_FOLD)return t;let e=t;const r=t;for(t=X.simpleFold(t);t!==r;t=X.simpleFold(t))e>t&&(e=t);return e}static leadingRegexp(t){if(t.op===k.Op.EMPTY_MATCH)return null;if(t.op===k.Op.CONCAT&&t.subs.length>0){const e=t.subs[0];return e.op===k.Op.EMPTY_MATCH?null:e}return t}static literalRegexp(t,e){const r=new k(k.Op.LITERAL);return r.flags=e,r.runes=tt.stringToRunes(t),r}static parse(t,e){return new j(t,e).parseInternal()}static parseRepeat(t){const e=t.pos();if(!t.more()||!t.lookingAt("{"))return-1;t.skip(1);const r=j.parseInt(t);if(r===-1||!t.more())return-1;let s;if(!t.lookingAt(","))s=r;else{if(t.skip(1),!t.more())return-1;if(t.lookingAt("}"))s=-1;else if((s=j.parseInt(t))===-1)return-1}if(!t.more()||!t.lookingAt("}"))return-1;if(t.skip(1),r<0||r>1e3||s===-2||s>1e3||s>=0&&r>s)throw new It(j.ERR_INVALID_REPEAT_SIZE,t.from(e));return r<<16|s&X.MAX_BMP}static isValidCaptureName(t){if(t.length===0)return!1;for(let e=0;e<t.length;e++){const r=t.codePointAt(e);if(r!==b.CODES.get("_")&&!tt.isalnum(r))return!1}return!0}static parseInt(t){const e=t.pos();for(;t.more()&&t.peek()>=b.CODES.get("0")&&t.peek()<=b.CODES.get("9");)t.skip(1);const r=t.from(e);return r.length===0||r.length>1&&r.codePointAt(0)===b.CODES.get("0")?-1:r.length>8?-2:parseFloat(r,10)}static isCharClass(t){return t.op===k.Op.LITERAL&&t.runes.length===1||t.op===k.Op.CHAR_CLASS||t.op===k.Op.ANY_CHAR_NOT_NL||t.op===k.Op.ANY_CHAR}static matchRune(t,e){switch(t.op){case k.Op.LITERAL:return t.runes.length===1&&t.runes[0]===e;case k.Op.CHAR_CLASS:for(let r=0;r<t.runes.length;r+=2)if(t.runes[r]<=e&&e<=t.runes[r+1])return!0;return!1;case k.Op.ANY_CHAR_NOT_NL:return e!==b.CODES.get(`
`);case k.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(t,e){switch(t.op){case k.Op.ANY_CHAR:break;case k.Op.ANY_CHAR_NOT_NL:j.matchRune(e,b.CODES.get(`
`))&&(t.op=k.Op.ANY_CHAR);break;case k.Op.CHAR_CLASS:e.op===k.Op.LITERAL?t.runes=new Gt(t.runes).appendLiteral(e.runes[0],e.flags).toArray():t.runes=new Gt(t.runes).appendClass(e.runes).toArray();break;case k.Op.LITERAL:if(e.runes[0]===t.runes[0]&&e.flags===t.flags)break;t.op=k.Op.CHAR_CLASS,t.runes=new Gt().appendLiteral(t.runes[0],t.flags).appendLiteral(e.runes[0],e.flags).toArray();break}}static parseEscape(t){const e=t.pos();if(t.skip(1),!t.more())throw new It(j.ERR_TRAILING_BACKSLASH);let r=t.pop();t:switch(r){case b.CODES.get("1"):case b.CODES.get("2"):case b.CODES.get("3"):case b.CODES.get("4"):case b.CODES.get("5"):case b.CODES.get("6"):case b.CODES.get("7"):if(!t.more()||t.peek()<b.CODES.get("0")||t.peek()>b.CODES.get("7"))break;case b.CODES.get("0"):{let s=r-b.CODES.get("0");for(let i=1;i<3&&!(!t.more()||t.peek()<b.CODES.get("0")||t.peek()>b.CODES.get("7"));i++)s=s*8+t.peek()-b.CODES.get("0"),t.skip(1);return s}case b.CODES.get("x"):{if(!t.more())break;if(r=t.pop(),r===b.CODES.get("{")){let o=0,c=0;for(;;){if(!t.more())break t;if(r=t.pop(),r===b.CODES.get("}"))break;const u=tt.unhex(r);if(u<0||(c=c*16+u,c>X.MAX_RUNE))break t;o++}if(o===0)break t;return c}const s=tt.unhex(r);if(!t.more())break;r=t.pop();const i=tt.unhex(r);if(s<0||i<0)break;return s*16+i}case b.CODES.get("a"):return b.CODES.get("\x07");case b.CODES.get("f"):return b.CODES.get("\f");case b.CODES.get("n"):return b.CODES.get(`
`);case b.CODES.get("r"):return b.CODES.get("\r");case b.CODES.get("t"):return b.CODES.get("	");case b.CODES.get("v"):return b.CODES.get("\v");default:if(!tt.isalnum(r))return r;break}throw new It(j.ERR_INVALID_ESCAPE,t.from(e))}static parseClassChar(t,e){if(!t.more())throw new It(j.ERR_MISSING_BRACKET,t.from(e));return t.lookingAt("\\")?j.parseEscape(t):t.pop()}static concatRunes(t,e){return[...t,...e]}constructor(t,e=0){this.wholeRegexp=t,this.flags=e,this.numCap=0,this.namedGroups={},this.stack=[],this.free=null}newRegexp(t){let e=this.free;return e!==null&&e.subs!==null&&e.subs.length>0?(this.free=e.subs[0],e.reinit(),e.op=t):e=new k(t),e}reuse(t){t.subs!==null&&t.subs.length>0&&(t.subs[0]=this.free),this.free=t}pop(){return this.stack.pop()}popToPseudo(){const t=this.stack.length;let e=t;for(;e>0&&!k.isPseudoOp(this.stack[e-1].op);)e--;const r=this.stack.slice(e,t);return this.stack=this.stack.slice(0,e),r}push(t){if(t.op===k.Op.CHAR_CLASS&&t.runes.length===2&&t.runes[0]===t.runes[1]){if(this.maybeConcat(t.runes[0],this.flags&-2))return null;t.op=k.Op.LITERAL,t.runes=[t.runes[0]],t.flags=this.flags&-2}else if(t.op===k.Op.CHAR_CLASS&&t.runes.length===4&&t.runes[0]===t.runes[1]&&t.runes[2]===t.runes[3]&&X.simpleFold(t.runes[0])===t.runes[2]&&X.simpleFold(t.runes[2])===t.runes[0]||t.op===k.Op.CHAR_CLASS&&t.runes.length===2&&t.runes[0]+1===t.runes[1]&&X.simpleFold(t.runes[0])===t.runes[1]&&X.simpleFold(t.runes[1])===t.runes[0]){if(this.maybeConcat(t.runes[0],this.flags|q.FOLD_CASE))return null;t.op=k.Op.LITERAL,t.runes=[t.runes[0]],t.flags=this.flags|q.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(t),t}maybeConcat(t,e){const r=this.stack.length;if(r<2)return!1;const s=this.stack[r-1],i=this.stack[r-2];return s.op!==k.Op.LITERAL||i.op!==k.Op.LITERAL||(s.flags&q.FOLD_CASE)!==(i.flags&q.FOLD_CASE)?!1:(i.runes=j.concatRunes(i.runes,s.runes),t>=0?(s.runes=[t],s.flags=e,!0):(this.pop(),this.reuse(s),!1))}newLiteral(t,e){const r=this.newRegexp(k.Op.LITERAL);return r.flags=e,(e&q.FOLD_CASE)!==0&&(t=j.minFoldRune(t)),r.runes=[t],r}literal(t){this.push(this.newLiteral(t,this.flags))}op(t){const e=this.newRegexp(t);return e.flags=this.flags,this.push(e)}repeat(t,e,r,s,i,o){let c=this.flags;if((c&q.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),c^=q.NON_GREEDY),o!==-1))throw new It(j.ERR_INVALID_REPEAT_OP,i.from(o));const u=this.stack.length;if(u===0)throw new It(j.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const h=this.stack[u-1];if(k.isPseudoOp(h.op))throw new It(j.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const p=this.newRegexp(t);p.min=e,p.max=r,p.flags=c,p.subs=[h],this.stack[u-1]=p}concat(){this.maybeConcat(-1,0);const t=this.popToPseudo();return t.length===0?this.push(this.newRegexp(k.Op.EMPTY_MATCH)):this.push(this.collapse(t,k.Op.CONCAT))}alternate(){const t=this.popToPseudo();return t.length>0&&this.cleanAlt(t[t.length-1]),t.length===0?this.push(this.newRegexp(k.Op.NO_MATCH)):this.push(this.collapse(t,k.Op.ALTERNATE))}cleanAlt(t){t.op===k.Op.CHAR_CLASS&&(t.runes=new Gt(t.runes).cleanClass().toArray(),t.runes.length===2&&t.runes[0]===0&&t.runes[1]===X.MAX_RUNE?(t.runes=null,t.op=k.Op.ANY_CHAR):t.runes.length===4&&t.runes[0]===0&&t.runes[1]===b.CODES.get(`
`)-1&&t.runes[2]===b.CODES.get(`
`)+1&&t.runes[3]===X.MAX_RUNE&&(t.runes=null,t.op=k.Op.ANY_CHAR_NOT_NL))}collapse(t,e){if(t.length===1)return t[0];let r=0;for(let c of t)r+=c.op===e?c.subs.length:1;let s=new Array(r).fill(null),i=0;for(let c of t)c.op===e?(s.splice(i,c.subs.length,...c.subs),i+=c.subs.length,this.reuse(c)):s[i++]=c;let o=this.newRegexp(e);if(o.subs=s,e===k.Op.ALTERNATE&&(o.subs=this.factor(o.subs),o.subs.length===1)){const c=o;o=o.subs[0],this.reuse(c)}return o}factor(t){if(t.length<2)return t;let e=0,r=t.length,s=0,i=null,o=0,c=0,u=0;for(let p=0;p<=r;p++){let m=null,T=0,P=0;if(p<r){let O=t[e+p];if(O.op===k.Op.CONCAT&&O.subs.length>0&&(O=O.subs[0]),O.op===k.Op.LITERAL&&(m=O.runes,T=O.runes.length,P=O.flags&q.FOLD_CASE),P===c){let M=0;for(;M<o&&M<T&&i[M]===m[M];)M++;if(M>0){o=M;continue}}}if(p!==u)if(p===u+1)t[s++]=t[e+u];else{const O=this.newRegexp(k.Op.LITERAL);O.flags=c,O.runes=i.slice(0,o);for(let Z=u;Z<p;Z++)t[e+Z]=this.removeLeadingString(t[e+Z],o);const M=this.collapse(t.slice(e+u,e+p),k.Op.ALTERNATE),$=this.newRegexp(k.Op.CONCAT);$.subs=[O,M],t[s++]=$}u=p,i=m,o=T,c=P}r=s,e=0,u=0,s=0;let h=null;for(let p=0;p<=r;p++){let m=null;if(!(p<r&&(m=j.leadingRegexp(t[e+p]),h!==null&&h.equals(m)&&(j.isCharClass(h)||h.op===k.Op.REPEAT&&h.min===h.max&&j.isCharClass(h.subs[0]))))){if(p!==u)if(p===u+1)t[s++]=t[e+u];else{const T=h;for(let M=u;M<p;M++){const $=M!==u;t[e+M]=this.removeLeadingRegexp(t[e+M],$)}const P=this.collapse(t.slice(e+u,e+p),k.Op.ALTERNATE),O=this.newRegexp(k.Op.CONCAT);O.subs=[T,P],t[s++]=O}u=p,h=m}}r=s,e=0,u=0,s=0;for(let p=0;p<=r;p++)if(!(p<r&&j.isCharClass(t[e+p]))){if(p!==u)if(p===u+1)t[s++]=t[e+u];else{let m=u;for(let P=u+1;P<p;P++){const O=t[e+m],M=t[e+P];(O.op<M.op||O.op===M.op&&(O.runes!==null?O.runes.length:0)<(M.runes!==null?M.runes.length:0))&&(m=P)}const T=t[e+u];t[e+u]=t[e+m],t[e+m]=T;for(let P=u+1;P<p;P++)j.mergeCharClass(t[e+u],t[e+P]),this.reuse(t[e+P]);this.cleanAlt(t[e+u]),t[s++]=t[e+u]}p<r&&(t[s++]=t[e+p]),u=p+1}r=s,e=0,u=0,s=0;for(let p=0;p<r;++p)p+1<r&&t[e+p].op===k.Op.EMPTY_MATCH&&t[e+p+1].op===k.Op.EMPTY_MATCH||(t[s++]=t[e+p]);return r=s,e=0,t.slice(e,r)}removeLeadingString(t,e){if(t.op===k.Op.CONCAT&&t.subs.length>0){const r=this.removeLeadingString(t.subs[0],e);if(t.subs[0]=r,r.op===k.Op.EMPTY_MATCH)switch(this.reuse(r),t.subs.length){case 0:case 1:t.op=k.Op.EMPTY_MATCH,t.subs=null;break;case 2:{const s=t;t=t.subs[1],this.reuse(s);break}default:t.subs=t.subs.slice(1,t.subs.length);break}return t}return t.op===k.Op.LITERAL&&(t.runes=t.runes.slice(e,t.runes.length),t.runes.length===0&&(t.op=k.Op.EMPTY_MATCH)),t}removeLeadingRegexp(t,e){if(t.op===k.Op.CONCAT&&t.subs.length>0){switch(e&&this.reuse(t.subs[0]),t.subs=t.subs.slice(1,t.subs.length),t.subs.length){case 0:{t.op=k.Op.EMPTY_MATCH,t.subs=k.emptySubs();break}case 1:{const r=t;t=t.subs[0],this.reuse(r);break}}return t}return e&&this.reuse(t),this.newRegexp(k.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&q.LITERAL)!==0)return j.literalRegexp(this.wholeRegexp,this.flags);let t=-1,e=-1,r=-1;const s=new H4(this.wholeRegexp);for(;s.more();){let o=-1;t:switch(s.peek()){case b.CODES.get("("):if((this.flags&q.PERL_X)!==0&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(k.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case b.CODES.get("|"):this.parseVerticalBar(),s.skip(1);break;case b.CODES.get(")"):this.parseRightParen(),s.skip(1);break;case b.CODES.get("^"):(this.flags&q.ONE_LINE)!==0?this.op(k.Op.BEGIN_TEXT):this.op(k.Op.BEGIN_LINE),s.skip(1);break;case b.CODES.get("$"):(this.flags&q.ONE_LINE)!==0?this.op(k.Op.END_TEXT).flags|=q.WAS_DOLLAR:this.op(k.Op.END_LINE),s.skip(1);break;case b.CODES.get("."):(this.flags&q.DOT_NL)!==0?this.op(k.Op.ANY_CHAR):this.op(k.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case b.CODES.get("["):this.parseClass(s);break;case b.CODES.get("*"):case b.CODES.get("+"):case b.CODES.get("?"):{o=s.pos();let c=null;switch(s.pop()){case b.CODES.get("*"):c=k.Op.STAR;break;case b.CODES.get("+"):c=k.Op.PLUS;break;case b.CODES.get("?"):c=k.Op.QUEST;break}this.repeat(c,e,r,o,s,t);break}case b.CODES.get("{"):{o=s.pos();const c=j.parseRepeat(s);if(c<0){s.rewindTo(o),this.literal(s.pop());break}e=c>>16,r=(c&X.MAX_BMP)<<16>>16,this.repeat(k.Op.REPEAT,e,r,o,s,t);break}case b.CODES.get("\\"):{const c=s.pos();if(s.skip(1),(this.flags&q.PERL_X)!==0&&s.more())switch(s.pop()){case b.CODES.get("A"):this.op(k.Op.BEGIN_TEXT);break t;case b.CODES.get("b"):this.op(k.Op.WORD_BOUNDARY);break t;case b.CODES.get("B"):this.op(k.Op.NO_WORD_BOUNDARY);break t;case b.CODES.get("C"):throw new It(j.ERR_INVALID_ESCAPE,"\\C");case b.CODES.get("Q"):{let m=s.rest();const T=m.indexOf("\\E");T>=0&&(m=m.substring(0,T)),s.skipString(m),s.skipString("\\E");let P=0;for(;P<m.length;){const O=m.codePointAt(P);this.literal(O),P+=tt.charCount(O)}break t}case b.CODES.get("z"):this.op(k.Op.END_TEXT);break t;default:s.rewindTo(c);break}const u=this.newRegexp(k.Op.CHAR_CLASS);if(u.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){const p=new Gt;if(this.parseUnicodeClass(s,p)){u.runes=p.toArray(),this.push(u);break t}}const h=new Gt;if(this.parsePerlClassEscape(s,h)){u.runes=h.toArray(),this.push(u);break t}s.rewindTo(c),this.reuse(u),this.literal(j.parseEscape(s));break}default:this.literal(s.pop());break}t=o}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new It(j.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(t){const e=t.pos(),r=t.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){const c=r.charAt(2)==="P"?4:3,u=r.indexOf(">");if(u<0)throw new It(j.ERR_INVALID_NAMED_CAPTURE,r);const h=r.substring(c,u);if(t.skipString(h),t.skip(c+1),!j.isValidCaptureName(h))throw new It(j.ERR_INVALID_NAMED_CAPTURE,r.substring(0,u+1));const p=this.op(k.Op.LEFT_PAREN);if(p.cap=++this.numCap,this.namedGroups[h])throw new It(j.ERR_DUPLICATE_NAMED_CAPTURE,h);this.namedGroups[h]=this.numCap,p.name=h;return}t.skip(2);let s=this.flags,i=1,o=!1;t:for(;t.more();){const c=t.pop();switch(c){case b.CODES.get("i"):s|=q.FOLD_CASE,o=!0;break;case b.CODES.get("m"):s&=-17,o=!0;break;case b.CODES.get("s"):s|=q.DOT_NL,o=!0;break;case b.CODES.get("U"):s|=q.NON_GREEDY,o=!0;break;case b.CODES.get("-"):if(i<0)break t;i=-1,s=~s,o=!1;break;case b.CODES.get(":"):case b.CODES.get(")"):if(i<0){if(!o)break t;s=~s}c===b.CODES.get(":")&&this.op(k.Op.LEFT_PAREN),this.flags=s;return;default:break t}}throw new It(j.ERR_INVALID_PERL_OP,t.from(e))}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(k.Op.VERTICAL_BAR)}swapVerticalBar(){const t=this.stack.length;if(t>=3&&this.stack[t-2].op===k.Op.VERTICAL_BAR&&j.isCharClass(this.stack[t-1])&&j.isCharClass(this.stack[t-3])){let e=this.stack[t-1],r=this.stack[t-3];if(e.op>r.op){const s=r;r=e,e=s,this.stack[t-3]=r}return j.mergeCharClass(r,e),this.reuse(e),this.pop(),!0}if(t>=2){const e=this.stack[t-1],r=this.stack[t-2];if(r.op===k.Op.VERTICAL_BAR)return t>=3&&this.cleanAlt(this.stack[t-3]),this.stack[t-2]=e,this.stack[t-1]=r,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new It(j.ERR_INTERNAL_ERROR,"stack underflow");const e=this.pop(),r=this.pop();if(r.op!==k.Op.LEFT_PAREN)throw new It(j.ERR_MISSING_PAREN,this.wholeRegexp);this.flags=r.flags,r.cap===0?this.push(e):(r.op=k.Op.CAPTURE,r.subs=[e],this.push(r))}parsePerlClassEscape(t,e){const r=t.pos();if((this.flags&q.PERL_X)===0||!t.more()||t.pop()!==b.CODES.get("\\")||!t.more())return!1;t.pop();const s=t.from(r),i=yl.has(s)?yl.get(s):null;return i===null?!1:(e.appendGroup(i,(this.flags&q.FOLD_CASE)!==0),!0)}parseNamedClass(t,e){const r=t.rest(),s=r.indexOf(":]");if(s<0)return!1;const i=r.substring(0,s+2);t.skipString(i);const o=kl.has(i)?kl.get(i):null;if(o===null)throw new It(j.ERR_INVALID_CHAR_RANGE,i);return e.appendGroup(o,(this.flags&q.FOLD_CASE)!==0),!0}parseUnicodeClass(t,e){const r=t.pos();if((this.flags&q.UNICODE_GROUPS)===0||!t.lookingAt("\\p")&&!t.lookingAt("\\P"))return!1;t.skip(1);let s=1,i=t.pop();if(i===b.CODES.get("P")&&(s=-1),!t.more())throw t.rewindTo(r),new It(j.ERR_INVALID_CHAR_RANGE,t.rest());i=t.pop();let o;if(i!==b.CODES.get("{"))o=tt.runeToString(i);else{const p=t.rest(),m=p.indexOf("}");if(m<0)throw t.rewindTo(r),new It(j.ERR_INVALID_CHAR_RANGE,t.rest());o=p.substring(0,m),t.skipString(o),t.skip(1)}o.length!==0&&o.codePointAt(0)===b.CODES.get("^")&&(s=0-s,o=o.substring(1));const c=j.unicodeTable(o);if(c===null)throw new It(j.ERR_INVALID_CHAR_RANGE,t.from(r));const u=c.first,h=c.second;if((this.flags&q.FOLD_CASE)===0||h===null)e.appendTableWithSign(u,s);else{const p=new Gt().appendTable(u).appendTable(h).cleanClass().toArray();e.appendClassWithSign(p,s)}return!0}parseClass(t){const e=t.pos();t.skip(1);const r=this.newRegexp(k.Op.CHAR_CLASS);r.flags=this.flags;const s=new Gt;let i=1;t.more()&&t.lookingAt("^")&&(i=-1,t.skip(1),(this.flags&q.CLASS_NL)===0&&s.appendRange(b.CODES.get(`
`),b.CODES.get(`
`)));let o=!0;for(;!t.more()||t.peek()!==b.CODES.get("]")||o;){if(t.more()&&t.lookingAt("-")&&(this.flags&q.PERL_X)===0&&!o){const p=t.rest();if(p==="-"||!p.startsWith("-]"))throw t.rewindTo(e),new It(j.ERR_INVALID_CHAR_RANGE,t.rest())}o=!1;const c=t.pos();if(t.lookingAt("[:")){if(this.parseNamedClass(t,s))continue;t.rewindTo(c)}if(this.parseUnicodeClass(t,s)||this.parsePerlClassEscape(t,s))continue;t.rewindTo(c);const u=j.parseClassChar(t,e);let h=u;if(t.more()&&t.lookingAt("-")){if(t.skip(1),t.more()&&t.lookingAt("]"))t.skip(-1);else if(h=j.parseClassChar(t,e),h<u)throw new It(j.ERR_INVALID_CHAR_RANGE,t.from(c))}(this.flags&q.FOLD_CASE)===0?s.appendRange(u,h):s.appendFoldedRange(u,h)}t.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}};_(j,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),_(j,"ERR_INVALID_CHAR_RANGE","invalid character class range"),_(j,"ERR_INVALID_ESCAPE","invalid escape sequence"),_(j,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),_(j,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),_(j,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),_(j,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),_(j,"ERR_MISSING_BRACKET","missing closing ]"),_(j,"ERR_MISSING_PAREN","missing closing )"),_(j,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),_(j,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),_(j,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name");let e1=j;class j4{constructor(){this.inst=null,this.cap=[]}}class Vl{constructor(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}contains(t){const e=this.sparse[t];return e<this.size&&this.densePcs[e]===t}isEmpty(){return this.size===0}add(t){const e=this.size++;return this.sparse[t]=e,this.denseThreads[e]=null,this.densePcs[e]=t,e}clear(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}toString(){let t="{";for(let e=0;e<this.size;e++)e!==0&&(t+=", "),t+=this.densePcs[e];return t+="}",t}}class Rr{static fromRE2(t){const e=new Rr;return e.prog=t.prog,e.re2=t,e.q0=new Vl(e.prog.numInst()),e.q1=new Vl(e.prog.numInst()),e.pool=[],e.poolSize=0,e.matched=!1,e.matchcap=Array(e.prog.numCap<2?2:e.prog.numCap).fill(0),e.ncap=0,e}static fromMachine(t){const e=new Rr;return e.re2=t.re2,e.prog=t.prog,e.q0=t.q0,e.q1=t.q1,e.pool=t.pool,e.poolSize=t.poolSize,e.matched=t.matched,e.matchcap=t.matchcap,e.ncap=t.ncap,e}init(t){this.ncap=t,t>this.matchcap.length?this.initNewCap(t):this.resetCap(t)}resetCap(t){for(let e=0;e<this.poolSize;e++){const r=this.pool[e];r.cap=Array(t).fill(0)}}initNewCap(t){for(let e=0;e<this.poolSize;e++){const r=this.pool[e];r.cap=Array(t).fill(0)}this.matchcap=Array(t).fill(0)}submatches(){return this.ncap===0?tt.emptyInts():this.matchcap.slice(0,this.ncap)}alloc(t){let e;return this.poolSize>0?(this.poolSize--,e=this.pool[this.poolSize]):e=new j4,e.inst=t,e}freeQueue(t,e=0){const r=t.size-e,s=this.poolSize+r;this.pool.length<s&&(this.pool=this.pool.slice(0,Math.max(this.pool.length*2,s)));for(let i=e;i<t.size;i++){const o=t.denseThreads[i];o!==null&&(this.pool[this.poolSize]=o,this.poolSize++)}t.clear()}freeThread(t){this.pool.length<=this.poolSize&&(this.pool=this.pool.slice(0,this.pool.length*2)),this.pool[this.poolSize]=t,this.poolSize++}match(t,e,r){const s=this.re2.cond;if(s===tt.EMPTY_ALL||(r===q.ANCHOR_START||r===q.ANCHOR_BOTH)&&e!==0)return!1;this.matched=!1,this.matchcap=Array(this.prog.numCap).fill(-1);let i=this.q0,o=this.q1,c=t.step(e),u=c>>3,h=c&7,p=-1,m=0;c!==yn.EOF()&&(c=t.step(e+h),p=c>>3,m=c&7);let T;for(e===0?T=tt.emptyOpContext(-1,u):T=t.context(e);;){if(i.isEmpty()){if((s&tt.EMPTY_BEGIN_TEXT)!==0&&e!==0||this.matched)break;if(this.re2.prefix.length!==0&&p!==this.re2.prefixRune&&t.canCheckPrefix()){const M=t.index(this.re2,e);if(M<0)break;e+=M,c=t.step(e),u=c>>3,h=c&7,c=t.step(e+h),p=c>>3,m=c&7}}!this.matched&&(e===0||r===q.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=e),this.add(i,this.prog.start,e,this.matchcap,T,null));const P=e+h;if(T=t.context(P),this.step(i,o,e,P,u,T,r,e===t.endPos()),h===0||this.ncap===0&&this.matched)break;e+=h,u=p,h=m,u!==-1&&(c=t.step(e+h),p=c>>3,m=c&7);const O=i;i=o,o=O}return this.freeQueue(o),this.matched}step(t,e,r,s,i,o,c,u){const h=this.re2.longest;for(let p=0;p<t.size;p++){let m=t.denseThreads[p];if(m===null)continue;if(h&&this.matched&&this.ncap>0&&this.matchcap[0]<m.cap[0]){this.freeThread(m);continue}const T=m.inst;let P=!1;switch(T.op){case et.MATCH:if(c===q.ANCHOR_BOTH&&!u)break;this.ncap>0&&(!h||!this.matched||this.matchcap[1]<r)&&(m.cap[1]=r,this.matchcap=m.cap.slice(0,this.ncap)),h||this.freeQueue(t,p+1),this.matched=!0;break;case et.RUNE:P=T.matchRune(i);break;case et.RUNE1:P=i===T.runes[0];break;case et.RUNE_ANY:P=!0;break;case et.RUNE_ANY_NOT_NL:P=i!==b.CODES.get(`
`);break;default:throw new Error("bad inst")}P&&(m=this.add(e,T.out,s,m.cap,o,m)),m!==null&&(this.freeThread(m),t.denseThreads[p]=null)}t.clear()}add(t,e,r,s,i,o){if(e===0||t.contains(e))return o;const c=t.add(e),u=this.prog.inst[e];switch(u.op){case et.FAIL:break;case et.ALT:case et.ALT_MATCH:o=this.add(t,u.out,r,s,i,o),o=this.add(t,u.arg,r,s,i,o);break;case et.EMPTY_WIDTH:(u.arg&~i)===0&&(o=this.add(t,u.out,r,s,i,o));break;case et.NOP:o=this.add(t,u.out,r,s,i,o);break;case et.CAPTURE:if(u.arg<this.ncap){const h=s[u.arg];s[u.arg]=r,this.add(t,u.out,r,s,i,null),s[u.arg]=h}else o=this.add(t,u.out,r,s,i,o);break;case et.MATCH:case et.RUNE:case et.RUNE1:case et.RUNE_ANY:case et.RUNE_ANY_NOT_NL:o===null?o=this.alloc(u):o.inst=u,this.ncap>0&&o.cap!==s&&(o.cap=s.slice(0,this.ncap)),t.denseThreads[c]=o,o=null;break;default:throw new Error("unhandled")}return o}}class G4{constructor(t){this.value=t}get(){return this.value}set(t){this.value=t}compareAndSet(t,e){return this.value===t?(this.value=e,!0):!1}}class fn{static initTest(t){const e=fn.compile(t),r=new fn(e.expr,e.prog,e.numSubexp,e.longest);return r.cond=e.cond,r.prefix=e.prefix,r.prefixUTF8=e.prefixUTF8,r.prefixComplete=e.prefixComplete,r.prefixRune=e.prefixRune,r}static compile(t){return fn.compileImpl(t,q.PERL,!1)}static compilePOSIX(t){return fn.compileImpl(t,q.POSIX,!0)}static compileImpl(t,e,r){let s=e1.parse(t,e);const i=s.maxCap();s=we.simplify(s);const o=As.compileRegexp(s),c=new fn(t,o,i,r),[u,h]=o.prefix();return c.prefixComplete=u,c.prefix=h,c.prefixUTF8=tt.stringToUtf8ByteArray(c.prefix),c.prefix.length>0&&(c.prefixRune=c.prefix.codePointAt(0)),c.namedGroups=s.namedGroups,c}static match(t,e){return fn.compile(t).match(e)}constructor(t,e,r=0,s=0){this.expr=t,this.prog=e,this.numSubexp=r,this.longest=s,this.cond=e.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.pooled=new G4}numberOfCapturingGroups(){return this.numSubexp}get(){let t;do t=this.pooled.get();while(t&&!this.pooled.compareAndSet(t,t.next));return t}reset(){this.pooled.set(null)}put(t,e){let r=this.pooled.get();do r=this.pooled.get(),!e&&r&&(t=Rr.fromMachine(t),e=!0),t.next!==r&&(t.next=r);while(!this.pooled.compareAndSet(r,t))}toString(){return this.expr}doExecute(t,e,r,s){let i=this.get(),o=!1;i?i.next!==null&&(i=Rr.fromMachine(i),o=!0):(i=Rr.fromRE2(this),o=!0),i.init(s);const c=i.match(t,e,r)?i.submatches():null;return this.put(i,o),c}match(t){return this.doExecute(At.fromUTF16(t),0,q.UNANCHORED,0)!==null}matchWithGroup(t,e,r,s,i){return t instanceof Cn||(t=ao.utf16(t)),this.matchMachineInput(t,e,r,s,i)}matchMachineInput(t,e,r,s,i){if(e>r)return[!1,null];const o=t.isUTF16Encoding()?At.fromUTF16(t.asCharSequence(),0,r):At.fromUTF8(t.asBytes(),0,r),c=this.doExecute(o,e,s,2*i);return c===null?[!1,null]:[!0,c]}matchUTF8(t){return this.doExecute(At.fromUTF8(t),0,q.UNANCHORED,0)!==null}replaceAll(t,e){return this.replaceAllFunc(t,()=>e,2*t.length+1)}replaceFirst(t,e){return this.replaceAllFunc(t,()=>e,1)}replaceAllFunc(t,e,r){let s=0,i=0,o="";const c=At.fromUTF16(t);let u=0;for(;i<=t.length;){const h=this.doExecute(c,i,q.UNANCHORED,2);if(h===null||h.length===0)break;o+=t.substring(s,h[0]),(h[1]>s||h[0]===0)&&(o+=e(t.substring(h[0],h[1])),u++),s=h[1];const p=c.step(i)&7;if(i+p>h[1]?i+=p:i+1>h[1]?i++:i=h[1],u>=r)break}return o+=t.substring(s),o}pad(t){if(t===null)return null;let e=(1+this.numSubexp)*2;if(t.length<e){let r=new Array(e).fill(-1);for(let s=0;s<t.length;s++)r[s]=t[s];t=r}return t}allMatches(t,e,r=s=>s){let s=[];const i=t.endPos();e<0&&(e=i+1);let o=0,c=0,u=-1;for(;c<e&&o<=i;){const h=this.doExecute(t,o,q.UNANCHORED,this.prog.numCap);if(h===null||h.length===0)break;let p=!0;if(h[1]===o){h[0]===u&&(p=!1);const m=t.step(o);m<0?o=i+1:o+=m&7}else o=h[1];u=h[1],p&&(s.push(r(this.pad(h))),c++)}return s}findUTF8(t){const e=this.doExecute(At.fromUTF8(t),0,q.UNANCHORED,2);return e===null?null:t.slice(e[0],e[1])}findUTF8Index(t){const e=this.doExecute(At.fromUTF8(t),0,q.UNANCHORED,2);return e===null?null:e.slice(0,2)}find(t){const e=this.doExecute(At.fromUTF16(t),0,q.UNANCHORED,2);return e===null?"":t.substring(e[0],e[1])}findIndex(t){return this.doExecute(At.fromUTF16(t),0,q.UNANCHORED,2)}findUTF8Submatch(t){const e=this.doExecute(At.fromUTF8(t),0,q.UNANCHORED,this.prog.numCap);if(e===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<e.length&&e[2*s]>=0&&(r[s]=t.slice(e[2*s],e[2*s+1]));return r}findUTF8SubmatchIndex(t){return this.pad(this.doExecute(At.fromUTF8(t),0,q.UNANCHORED,this.prog.numCap))}findSubmatch(t){const e=this.doExecute(At.fromUTF16(t),0,q.UNANCHORED,this.prog.numCap);if(e===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<e.length&&e[2*s]>=0&&(r[s]=t.substring(e[2*s],e[2*s+1]));return r}findSubmatchIndex(t){return this.pad(this.doExecute(At.fromUTF16(t),0,q.UNANCHORED,this.prog.numCap))}findAllUTF8(t,e){const r=this.allMatches(At.fromUTF8(t),e,s=>t.slice(s[0],s[1]));return r.length===0?null:r}findAllUTF8Index(t,e){const r=this.allMatches(At.fromUTF8(t),e,s=>s.slice(0,2));return r.length===0?null:r}findAll(t,e){const r=this.allMatches(At.fromUTF16(t),e,s=>t.substring(s[0],s[1]));return r.length===0?null:r}findAllIndex(t,e){const r=this.allMatches(At.fromUTF16(t),e,s=>s.slice(0,2));return r.length===0?null:r}findAllUTF8Submatch(t,e){const r=this.allMatches(At.fromUTF8(t),e,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=t.slice(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllUTF8SubmatchIndex(t,e){const r=this.allMatches(At.fromUTF8(t),e);return r.length===0?null:r}findAllSubmatch(t,e){const r=this.allMatches(At.fromUTF16(t),e,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=t.substring(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllSubmatchIndex(t,e){const r=this.allMatches(At.fromUTF16(t),e);return r.length===0?null:r}}const Xt=class Xt{static quote(t){return tt.quoteMeta(t)}static compile(t,e=0){let r=t;if((e&Xt.CASE_INSENSITIVE)!==0&&(r=`(?i)${r}`),(e&Xt.DOTALL)!==0&&(r=`(?s)${r}`),(e&Xt.MULTILINE)!==0&&(r=`(?m)${r}`),(e&-32)!==0)throw new F4("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH");let s=q.PERL;(e&Xt.DISABLE_UNICODE_GROUPS)!==0&&(s&=-129);const i=new Xt(t,e);return i.re2Input=fn.compileImpl(r,s,(e&Xt.LONGEST_MATCH)!==0),i}static matches(t,e){return Xt.compile(t).matcher(e).matches()}static initTest(t,e,r){if(t==null)throw new Error("pattern is null");if(r==null)throw new Error("re2 is null");const s=new Xt(t,e);return s.re2Input=r,s}constructor(t,e){this.patternInput=t,this.flagsInput=e}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(t){return this.matcher(t).matches()}matcher(t){return Array.isArray(t)&&(t=ao.utf8(t)),new U4(this,t)}split(t,e=0){const r=this.matcher(t),s=[];let i=0,o=0;for(;r.find();){if(o===0&&r.end()===0){o=r.end();continue}if(e>0&&s.length===e-1)break;if(o===r.start()){if(e===0){i+=1,o=r.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.start())),o=r.end()}if(e===0&&o!==r.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.inputLength()))}return(e!==0||s.length===0)&&s.push(r.substring(o,r.inputLength())),s}toString(){return this.patternInput}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(t){return this===t?!0:t===null||this.constructor!==t.constructor?!1:this.flagsInput===t.flagsInput&&this.patternInput===t.patternInput}};_(Xt,"CASE_INSENSITIVE",1),_(Xt,"DOTALL",2),_(Xt,"MULTILINE",4),_(Xt,"DISABLE_UNICODE_GROUPS",8),_(Xt,"LONGEST_MATCH",16);let Fs=Xt;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}te.UNAUTHENTICATED=new te(null),te.GOOGLE_CREDENTIALS=new te("google-credentials-uid"),te.FIRST_PARTY=new te("first-party-uid"),te.MOCK_USER=new te("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $r="12.15.0";function z4(n){$r=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr=new I1("@firebase/firestore");function _r(){return sr.logLevel}function B(n,...t){if(sr.logLevel<=it.DEBUG){const e=t.map(V1);sr.debug(`Firestore (${$r}): ${n}`,...e)}}function tn(n,...t){if(sr.logLevel<=it.ERROR){const e=t.map(V1);sr.error(`Firestore (${$r}): ${n}`,...e)}}function xe(n,...t){if(sr.logLevel<=it.WARN){const e=t.map(V1);sr.warn(`Firestore (${$r}): ${n}`,...e)}}function V1(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,j2(n,r,e)}function j2(n,t,e){let r=`FIRESTORE (${$r}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw tn(r),new Error(r)}function H(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||j2(t,s,r)}function J(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class F extends Be{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W4{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class K4{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(te.UNAUTHENTICATED)))}shutdown(){}}class Y4{constructor(t){this.t=t,this.currentUser=te.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,e(u)):Promise.resolve();let i=new Ke;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ke,t.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const u=i;t.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{B("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(B("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ke)}}),0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(B("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string",31837,{l:r}),new W4(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string",2055,{h:t}),new te(t)}}class Q4{constructor(t,e,r){this.T=t,this.P=e,this.R=r,this.type="FirstParty",this.user=te.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const t=this.A();return t&&this.I.set("Authorization",t),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class X4{constructor(t,e,r){this.T=t,this.P=e,this.R=r}getToken(){return Promise.resolve(new Q4(this.T,this.P,this.R))}start(t,e){t.enqueueRetryable((()=>e(te.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class xl{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class J4{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ue(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){H(this.o===void 0,3512);const r=i=>{i.error!=null&&B("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,B("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{B("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):B("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new xl(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(H(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new xl(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z4(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x1{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Z4(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<e&&(r+=t.charAt(s[i]%62))}return r}}function st(n,t){return n<t?-1:n>t?1:0}function n1(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),i=t.charAt(r);if(s!==i)return La(s)===La(i)?st(s,i):La(s)?1:-1}return st(n.length,t.length)}const t3=55296,e3=57343;function La(n){const t=n.charCodeAt(0);return t>=t3&&t<=e3}function Pr(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const be="__name__";class Pe{constructor(t,e,r){e===void 0?e=0:e>t.length&&G(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&G(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Pe.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Pe?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const i=Pe.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return st(t.length,e.length)}static compareSegments(t,e){const r=Pe.isNumericId(t),s=Pe.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Pe.extractNumericId(t).compare(Pe.extractNumericId(e)):n1(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return In.fromString(t.substring(4,t.length-2))}}class ct extends Pe{construct(t,e,r){return new ct(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new F(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new ct(e)}static emptyPath(){return new ct([])}}const n3=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Dt extends Pe{construct(t,e,r){return new Dt(t,e,r)}static isValidIdentifier(t){return n3.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Dt.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===be}static keyField(){return new Dt([be])}static fromServerFormat(t){const e=[];let r="",s=0;const i=()=>{if(r.length===0)throw new F(V.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let o=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new F(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const u=t[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new F(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=u,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new F(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Dt(e)}static emptyPath(){return new Dt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(t){this.path=t}static fromPath(t){return new z(ct.fromString(t))}static fromName(t){return new z(ct.fromString(t).popFirst(5))}static empty(){return new z(ct.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&ct.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return ct.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new z(new ct(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G2(n,t,e){if(!e)throw new F(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function r3(n,t,e,r){if(t===!0&&r===!0)throw new F(V.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Ll(n){if(!z.isDocumentKey(n))throw new F(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ml(n){if(z.isDocumentKey(n))throw new F(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function oi(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function No(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":G(12329,{type:typeof n})}function de(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new F(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=No(n);throw new F(V.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(n,t){const e={typeString:n};return t&&(e.value=t),e}function ai(n,t){if(!oi(n))throw new F(V.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){e=`Expected '${r}' field to equal '${i.value}'`;break}}if(e)throw new F(V.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl=-62135596800,Ul=1e6;class pt{static now(){return pt.fromMillis(Date.now())}static fromDate(t){return pt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Ul);return new pt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new F(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new F(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Fl)throw new F(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new F(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ul}_compareTo(t){return this.seconds===t.seconds?st(this.nanoseconds,t.nanoseconds):st(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:pt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(ai(t,pt._jsonSchema))return new pt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Fl;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}pt._jsonSchemaVersion="firestore/timestamp/1.0",pt._jsonSchema={type:Ct("string",pt._jsonSchemaVersion),seconds:Ct("number"),nanoseconds:Ct("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{static fromTimestamp(t){return new Y(t)}static min(){return new Y(new pt(0,0))}static max(){return new Y(new pt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us=-1;function s3(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=Y.fromTimestamp(r===1e9?new pt(e+1,0):new pt(e,r));return new Pn(s,z.empty(),t)}function i3(n){return new Pn(n.readTime,n.key,Us)}class Pn{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Pn(Y.min(),z.empty(),Us)}static max(){return new Pn(Y.max(),z.empty(),Us)}}function o3(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=z.comparator(n.documentKey,t.documentKey),e!==0?e:st(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a3="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class c3{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qr(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==a3)throw n;B("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new x(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof x?e:x.resolve(e)}catch(e){return x.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):x.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):x.reject(e)}static resolve(t){return new x(((e,r)=>{e(t)}))}static reject(t){return new x(((e,r)=>{r(t)}))}static waitFor(t){return new x(((e,r)=>{let s=0,i=0,o=!1;t.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&e()}),(u=>r(u)))})),o=!0,i===s&&e()}))}static or(t){let e=x.resolve(!1);for(const r of t)e=e.next((s=>s?x.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,i)=>{r.push(e.call(this,s,i))})),this.waitFor(r)}static mapArray(t,e){return new x(((r,s)=>{const i=t.length,o=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;e(t[h]).next((p=>{o[h]=p,++c,c===i&&r(o)}),(p=>s(p)))}}))}static doWhile(t,e){return new x(((r,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):r()};i()}))}}function u3(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Hr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Oo.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L1=-1;function ci(n){return n==null}function Bs(n){return n===0&&1/n==-1/0}function l3(n){return typeof n=="number"&&Number.isInteger(n)&&!Bs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function h3(n){return typeof n=="string"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z2="";function f3(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Bl(t)),t=d3(n.get(e),t);return Bl(t)}function d3(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":e+="";break;case z2:e+="";break;default:e+=i}}return e}function Bl(n){return n+z2+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t,e){this.comparator=t,this.root=e||Ft.EMPTY}insert(t,e){return new gt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Ft.BLACK,null,null))}remove(t){return new gt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Ft.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Fi(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Fi(this.root,t,this.comparator,!1)}getReverseIterator(){return new Fi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Fi(this.root,t,this.comparator,!0)}}class Fi{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?r(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Ft{constructor(t,e,r,s,i){this.key=t,this.value=e,this.color=r??Ft.RED,this.left=s??Ft.EMPTY,this.right=i??Ft.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,i){return new Ft(t??this.key,e??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,r),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ft.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Ft.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Ft.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Ft.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw G(27949);return t+(this.isRed()?0:1)}}Ft.EMPTY=null,Ft.RED=!0,Ft.BLACK=!1;Ft.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(t,e,r,s,i){return this}insert(t,e,r){return new Ft(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this.comparator=t,this.data=new gt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new $l(this.data.getIterator())}getIteratorFrom(t){return new $l(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof Pt)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Pt(this.comparator);return e.data=t,e}}class $l{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(t){this.fields=t,t.sort(Dt.comparator)}static empty(){return new he([])}unionWith(t){let e=new Pt(Dt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new he(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Pr(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function co(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Bn(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function p3(n,t){const e=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.push(t(n[r],r,n));return e}function W2(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K2 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new K2("Invalid base64 string: "+i):i}})(t);return new bt(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(t);return new bt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return st(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}bt.EMPTY_BYTE_STRING=new bt("");const g3=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function bn(n){if(H(!!n,39018),typeof n=="string"){let t=0;const e=g3.exec(n);if(H(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:_t(n.seconds),nanos:_t(n.nanos)}}function _t(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Nn(n){return typeof n=="string"?bt.fromBase64String(n):bt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y2="server_timestamp",Q2="__type__",X2="__previous_value__",J2="__local_write_time__";function Do(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Q2])==null?void 0:r.stringValue)===Y2}function ui(n){const t=n.mapValue.fields[X2];return Do(t)?ui(t):t}function br(n){const t=bn(n.mapValue.fields[J2].timestampValue);return new pt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m3{constructor(t,e,r,s,i,o,c,u,h,p,m){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=p,this.apiKey=m}}const r1="(default)";class $s{constructor(t,e){this.projectId=t,this.database=e||r1}static empty(){return new $s("","")}get isDefaultDatabase(){return this.database===r1}isEqual(t){return t instanceof $s&&t.projectId===this.projectId&&t.database===this.database}}function _3(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new F(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new $s(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z2="__type__",y3="__max__",Ui={mapValue:{}},t6="__vector__",qs="value",Nr={nullValue:"NULL_VALUE"},se={booleanValue:!0},Mt={booleanValue:!1};function Nt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Do(n)?4:E3(n)?9007199254740991:uo(n)?10:11:G(28295,{value:n})}function Ee(n,t,e){if(n===t)return!0;const r=Nt(n);if(r!==Nt(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return br(n).isEqual(br(t));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const c=bn(i.timestampValue),u=bn(o.timestampValue);return c.seconds===u.seconds&&c.nanos===u.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(i,o){return Nn(i.bytesValue).isEqual(Nn(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(i,o){return _t(i.geoPointValue.latitude)===_t(o.geoPointValue.latitude)&&_t(i.geoPointValue.longitude)===_t(o.geoPointValue.longitude)})(n,t);case 2:return(function(i,o,c){if("integerValue"in i&&"integerValue"in o)return _t(i.integerValue)===_t(o.integerValue);let u,h;if("doubleValue"in i&&"doubleValue"in o)u=_t(i.doubleValue),h=_t(o.doubleValue);else{if(!(c!=null&&c.Ee))return!1;u=_t(i.integerValue??i.doubleValue),h=_t(o.integerValue??o.doubleValue)}return u===h?!!(c!=null&&c.he)||Bs(u)===Bs(h):!!(c===void 0||c.Te)&&isNaN(u)&&isNaN(h)})(n,t,e);case 9:return Pr(n.arrayValue.values||[],t.arrayValue.values||[],((s,i)=>Ee(s,i,e)));case 10:case 11:return(function(i,o,c){const u=i.mapValue.fields||{},h=o.mapValue.fields||{};if(co(u)!==co(h))return!1;for(const p in u)if(u.hasOwnProperty(p)&&(h[p]===void 0||!Ee(u[p],h[p],c)))return!1;return!0})(n,t,e);default:return G(52216,{left:n})}}function Hs(n,t){return(n.values||[]).find((e=>Ee(e,t)))!==void 0}function ie(n,t){if(n===t)return 0;const e=Nt(n),r=Nt(t);if(e!==r)return st(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return st(n.booleanValue,t.booleanValue);case 2:return(function(i,o){const c=_t(i.integerValue||i.doubleValue),u=_t(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,t);case 3:return ql(n.timestampValue,t.timestampValue);case 4:return ql(br(n),br(t));case 5:return n1(n.stringValue,t.stringValue);case 6:return(function(i,o){const c=Nn(i),u=Nn(o);return c.compareTo(u)})(n.bytesValue,t.bytesValue);case 7:return(function(i,o){const c=i.split("/"),u=o.split("/");for(let h=0;h<c.length&&h<u.length;h++){const p=st(c[h],u[h]);if(p!==0)return p}return st(c.length,u.length)})(n.referenceValue,t.referenceValue);case 8:return(function(i,o){const c=st(_t(i.latitude),_t(o.latitude));return c!==0?c:st(_t(i.longitude),_t(o.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Hl(n.arrayValue,t.arrayValue);case 10:return(function(i,o){var T,P,O,M;const c=i.fields||{},u=o.fields||{},h=(T=c[qs])==null?void 0:T.arrayValue,p=(P=u[qs])==null?void 0:P.arrayValue,m=st(((O=h==null?void 0:h.values)==null?void 0:O.length)||0,((M=p==null?void 0:p.values)==null?void 0:M.length)||0);return m!==0?m:Hl(h,p)})(n.mapValue,t.mapValue);case 11:return(function(i,o){if(i===Ui.mapValue&&o===Ui.mapValue)return 0;if(i===Ui.mapValue)return 1;if(o===Ui.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=o.fields||{},p=Object.keys(h);u.sort(),p.sort();for(let m=0;m<u.length&&m<p.length;++m){const T=n1(u[m],p[m]);if(T!==0)return T;const P=ie(c[u[m]],h[p[m]]);if(P!==0)return P}return st(u.length,p.length)})(n.mapValue,t.mapValue);default:throw G(23264,{Pe:e})}}function ql(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return st(n,t);const e=bn(n),r=bn(t),s=st(e.seconds,r.seconds);return s!==0?s:st(e.nanos,r.nanos)}function Hl(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const i=ie(e[s],r[s]);if(i!==void 0&&i!==0)return i}return st(e.length,r.length)}function Or(n){return s1(n)}function s1(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=bn(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return Nn(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return z.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const i of e.values||[])s?s=!1:r+=",",r+=s1(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${s1(e.fields[o])}`;return s+"}"})(n.mapValue):G(61005,{value:n})}function Yi(n){switch(Nt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=ui(n);return t?16+Yi(t):16;case 5:return 2*n.stringValue.length;case 6:return Nn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Yi(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Bn(r.fields,((i,o)=>{s+=i.length+Yi(o)})),s})(n.mapValue);default:throw G(13486,{value:n})}}function jl(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Ne(n){return!!n&&"integerValue"in n}function Xn(n){return!!n&&"doubleValue"in n}function On(n){return Ne(n)||Xn(n)}function Dr(n){return!!n&&"arrayValue"in n}function fe(n){return!!n&&"nullValue"in n}function oe(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Zn(n){return!!n&&"mapValue"in n}function uo(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Z2])==null?void 0:r.stringValue)===t6}function i1(n){var t,e;return(e=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[qs])==null?void 0:e.arrayValue}function Rs(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return Bn(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=Rs(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Rs(n.arrayValue.values[e]);return t}return{...n}}function E3(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===y3}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(t){this.value=t}static empty(){return new zt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Zn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Rs(e)}setAll(t){let e=Dt.emptyPath(),r={},s=[];t.forEach(((o,c)=>{if(!e.isImmediateParentOf(c)){const u=this.getFieldsMap(e);this.applyChanges(u,r,s),r={},s=[],e=c.popLast()}o?r[c.lastSegment()]=Rs(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,r,s)}delete(t){const e=this.field(t.popLast());Zn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ee(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Zn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){Bn(e,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new zt(Rs(this.value))}}function e6(n){const t=[];return Bn(n.fields,((e,r)=>{const s=new Dt([e]);if(Zn(r)){const i=e6(r.mapValue).fields;if(i.length===0)t.push(s);else for(const o of i)t.push(s.child(o))}else t.push(s)})),new he(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ko(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Bs(t)?"-0":t}}function M1(n){return{integerValue:""+n}}function Vo(n,t,e){return Number.isInteger(t)&&(e!=null&&e.preferIntegers)||l3(t)?M1(t):ko(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(){this._=void 0}}function w3(n,t,e){return n instanceof js?(function(s,i){const o={fields:{[Q2]:{stringValue:Y2},[J2]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Do(i)&&(i=ui(i)),i&&(o.fields[X2]=i),{mapValue:o}})(e,t):n instanceof kr?r6(n,t):n instanceof Vr?s6(n,t):n instanceof xr?(function(s,i){const o=n6(s,i),c=fo(o)+fo(s.Re);return Ne(o)&&Ne(s.Re)?M1(c):ko(s.serializer,c)})(n,t):n instanceof lo?(function(s,i){return Gl(s,i,Math.min)})(n,t):n instanceof ho?(function(s,i){return Gl(s,i,Math.max)})(n,t):void 0}function T3(n,t,e){return n instanceof kr?r6(n,t):n instanceof Vr?s6(n,t):e}function n6(n,t){return n instanceof xr?On(t)?t:{integerValue:0}:null}class js extends xo{}class kr extends xo{constructor(t){super(),this.elements=t}}function r6(n,t){const e=i6(t);for(const r of n.elements)e.some((s=>Ee(s,r)))||e.push(r);return{arrayValue:{values:e}}}class Vr extends xo{constructor(t){super(),this.elements=t}}function s6(n,t){let e=i6(t);for(const r of n.elements)e=e.filter((s=>!Ee(s,r)));return{arrayValue:{values:e}}}class F1 extends xo{constructor(t,e){super(),this.serializer=t,this.Re=e}}class xr extends F1{}class lo extends F1{}class ho extends F1{}function Gl(n,t,e){if(!On(t))return n.Re;const r=e(fo(t),fo(n.Re));return Ne(t)&&Ne(n.Re)?M1(r):ko(n.serializer,r)}function fo(n){return _t(n.integerValue||n.doubleValue)}function i6(n){return Dr(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(t,e){this.field=t,this.transform=e}}function I3(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof kr&&s instanceof kr||r instanceof Vr&&s instanceof Vr?Pr(r.elements,s.elements,Ee):r instanceof xr&&s instanceof xr||r instanceof lo&&s instanceof lo||r instanceof ho&&s instanceof ho?Ee(r.Re,s.Re):r instanceof js&&s instanceof js})(n.transform,t.transform)}class A3{constructor(t,e){this.version=t,this.transformResults=e}}class Rt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Rt}static exists(t){return new Rt(void 0,t)}static updateTime(t){return new Rt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Qi(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Mo{}function o6(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new hi(n.key,Rt.none()):new li(n.key,n.data,Rt.none());{const e=n.data,r=zt.empty();let s=new Pt(Dt.comparator);for(let i of t.fields)if(!s.has(i)){let o=e.field(i);o===null&&i.length>1&&(i=i.popLast(),o=e.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new $n(n.key,r,new he(s.toArray()),Rt.none())}}function v3(n,t,e){n instanceof li?(function(s,i,o){const c=s.value.clone(),u=Wl(s.fieldTransforms,i,o.transformResults);c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,t,e):n instanceof $n?(function(s,i,o){if(!Qi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=Wl(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(a6(s)),u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,t,e):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,t,e)}function Ss(n,t,e,r){return n instanceof li?(function(i,o,c,u){if(!Qi(i.precondition,o))return c;const h=i.value.clone(),p=Kl(i.fieldTransforms,u,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,t,e,r):n instanceof $n?(function(i,o,c,u){if(!Qi(i.precondition,o))return c;const h=Kl(i.fieldTransforms,u,o),p=o.data;return p.setAll(a6(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,t,e,r):(function(i,o,c){return Qi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,t,e)}function R3(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),i=n6(r.transform,s||null);i!=null&&(e===null&&(e=zt.empty()),e.set(r.field,i))}return e||null}function zl(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Pr(r,s,((i,o)=>I3(i,o)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class li extends Mo{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class $n extends Mo{constructor(t,e,r,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function a6(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function Wl(n,t,e){const r=new Map;H(n.length===e.length,32656,{Ie:e.length,Ae:n.length});for(let s=0;s<e.length;s++){const i=n[s],o=i.transform,c=t.data.field(i.field);r.set(i.field,T3(o,c,e[s]))}return r}function Kl(n,t,e){const r=new Map;for(const s of n){const i=s.transform,o=e.data.field(s.field);r.set(s.field,w3(i,o,t))}return r}class hi extends Mo{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class c6 extends Mo{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(t,e){this.position=t,this.inclusive=e}}function Yl(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const i=t[s],o=n.position[s];if(i.field.isKeyField()?r=z.comparator(z.fromName(o.referenceValue),e.key):r=ie(o,e.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ql(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ee(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u6{}class St extends u6{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new C3(t,e,r):e==="array-contains"?new N3(t,r):e==="in"?new O3(t,r):e==="not-in"?new D3(t,r):e==="array-contains-any"?new k3(t,r):new St(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new P3(t,r):new b3(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(ie(e,this.value)):e!==null&&Nt(this.value)===Nt(e)&&this.matchesComparison(ie(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Re extends u6{constructor(t,e){super(),this.filters=t,this.op=e,this.Ve=null}static create(t,e){return new Re(t,e)}matches(t){return l6(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Ve!==null||(this.Ve=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function l6(n){return n.op==="and"}function h6(n){return S3(n)&&l6(n)}function S3(n){for(const t of n.filters)if(t instanceof Re)return!1;return!0}function o1(n){if(n instanceof St)return n.field.canonicalString()+n.op.toString()+Or(n.value);if(h6(n))return n.filters.map((t=>o1(t))).join(",");{const t=n.filters.map((e=>o1(e))).join(",");return`${n.op}(${t})`}}function f6(n,t){return n instanceof St?(function(r,s){return s instanceof St&&r.op===s.op&&r.field.isEqual(s.field)&&Ee(r.value,s.value)})(n,t):n instanceof Re?(function(r,s){return s instanceof Re&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&f6(o,s.filters[c])),!0):!1})(n,t):void G(19439)}function d6(n){return n instanceof St?(function(e){return`${e.field.canonicalString()} ${e.op} ${Or(e.value)}`})(n):n instanceof Re?(function(e){return e.op.toString()+" {"+e.getFilters().map(d6).join(" ,")+"}"})(n):"Filter"}class C3 extends St{constructor(t,e,r){super(t,e,r),this.key=z.fromName(r.referenceValue)}matches(t){const e=z.comparator(t.key,this.key);return this.matchesComparison(e)}}class P3 extends St{constructor(t,e){super(t,"in",e),this.keys=p6("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class b3 extends St{constructor(t,e){super(t,"not-in",e),this.keys=p6("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function p6(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>z.fromName(r.referenceValue)))}class N3 extends St{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Dr(e)&&Hs(e.arrayValue,this.value)}}class O3 extends St{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Hs(this.value.arrayValue,e)}}class D3 extends St{constructor(t,e){super(t,"not-in",e)}matches(t){if(Hs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Hs(this.value.arrayValue,e)}}class k3 extends St{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Dr(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>Hs(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(t,e="asc"){this.field=t,this.dir=e}}function V3(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t,e,r,s,i,o,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(t){return new Lt(t,0,Y.min(),Y.min(),Y.min(),zt.empty(),0)}static newFoundDocument(t,e,r,s){return new Lt(t,1,e,Y.min(),r,s,0)}static newNoDocument(t,e){return new Lt(t,2,e,Y.min(),Y.min(),zt.empty(),0)}static newUnknownDocument(t,e){return new Lt(t,3,e,Y.min(),Y.min(),zt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=zt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=zt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Lt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Lt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x3{constructor(t,e=null,r=[],s=[],i=null,o=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.de=null}}function Xl(n,t=null,e=[],r=[],s=null,i=null,o=null){return new x3(n,t,e,r,s,i,o)}function g6(n){const t=J(n);if(t.de===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>o1(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),ci(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>Or(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>Or(r))).join(",")),t.de=e}return t.de}function m6(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!V3(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!f6(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Ql(n.startAt,t.startAt)&&Ql(n.endAt,t.endAt)}function Yn(n){return!!n.isCorePipeline}function _6(n){return!!n.path&&z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(t,e=null,r=[],s=[],i=null,o="F",c=null,u=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=u,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function L3(n,t,e,r,s,i,o,c){return new jr(n,t,e,r,s,i,o,c)}function U1(n){return new jr(n)}function Jl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function M3(n){return z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function y6(n){return n.collectionGroup!==null}function Cs(n){const t=J(n);if(t.fe===null){t.fe=[];const e=new Set;for(const i of t.explicitOrderBy)t.fe.push(i),e.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Pt(Dt.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.fe.push(new Gs(i,r))})),e.has(Dt.keyField().canonicalString())||t.fe.push(new Gs(Dt.keyField(),r))}return t.fe}function De(n){const t=J(n);return t.me||(t.me=F3(t,Cs(n))),t.me}function F3(n,t){if(n.limitType==="F")return Xl(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Gs(s.field,i)}));const e=n.endAt?new po(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new po(n.startAt.position,n.startAt.inclusive):null;return Xl(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function a1(n,t){const e=n.filters.concat([t]);return new jr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function U3(n,t){const e=n.explicitOrderBy.concat([t]);return new jr(n.path,n.collectionGroup,e,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function go(n,t,e){return new jr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function B3(n,t){return m6(De(n),De(t))&&n.limitType===t.limitType}function Ps(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>d6(s))).join(", ")}]`),ci(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>Or(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>Or(s))).join(",")),`Target(${r})`})(De(n))}; limitType=${n.limitType})`}function Fo(n,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):z.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,t)&&(function(r,s){for(const i of Cs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(o,c,u){const h=Yl(o,c,u);return o.inclusive?h<=0:h<0})(r.startAt,Cs(r),s)||r.endAt&&!(function(o,c,u){const h=Yl(o,c,u);return o.inclusive?h>=0:h>0})(r.endAt,Cs(r),s))})(n,t)}function B1(n){return(t,e)=>{let r=!1;for(const s of Cs(n)){const i=$3(s,t,e);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function $3(n,t,e){const r=n.field.isKeyField()?z.comparator(t.key,e.key):(function(i,o,c){const u=o.data.field(i),h=c.data.field(i);return u!==null&&h!==null?ie(u,h):G(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return G(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q3{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vt,ot;function E6(n){switch(n){case V.OK:return G(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return G(15467,{code:n})}}function w6(n){if(n===void 0)return tn("GRPC error has no .code"),V.UNKNOWN;switch(n){case vt.OK:return V.OK;case vt.CANCELLED:return V.CANCELLED;case vt.UNKNOWN:return V.UNKNOWN;case vt.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case vt.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case vt.INTERNAL:return V.INTERNAL;case vt.UNAVAILABLE:return V.UNAVAILABLE;case vt.UNAUTHENTICATED:return V.UNAUTHENTICATED;case vt.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case vt.NOT_FOUND:return V.NOT_FOUND;case vt.ALREADY_EXISTS:return V.ALREADY_EXISTS;case vt.PERMISSION_DENIED:return V.PERMISSION_DENIED;case vt.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case vt.ABORTED:return V.ABORTED;case vt.OUT_OF_RANGE:return V.OUT_OF_RANGE;case vt.UNIMPLEMENTED:return V.UNIMPLEMENTED;case vt.DATA_LOSS:return V.DATA_LOSS;default:return G(39323,{code:n})}}(ot=vt||(vt={}))[ot.OK=0]="OK",ot[ot.CANCELLED=1]="CANCELLED",ot[ot.UNKNOWN=2]="UNKNOWN",ot[ot.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ot[ot.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ot[ot.NOT_FOUND=5]="NOT_FOUND",ot[ot.ALREADY_EXISTS=6]="ALREADY_EXISTS",ot[ot.PERMISSION_DENIED=7]="PERMISSION_DENIED",ot[ot.UNAUTHENTICATED=16]="UNAUTHENTICATED",ot[ot.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ot[ot.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ot[ot.ABORTED=10]="ABORTED",ot[ot.OUT_OF_RANGE=11]="OUT_OF_RANGE",ot[ot.UNIMPLEMENTED=12]="UNIMPLEMENTED",ot[ot.INTERNAL=13]="INTERNAL",ot[ot.UNAVAILABLE=14]="UNAVAILABLE",ot[ot.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Bn(this.inner,((e,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return W2(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H3=new gt(z.comparator);function ne(){return H3}const T6=new gt(z.comparator);function yr(...n){let t=T6;for(const e of n)t=t.insert(e.key,e);return t}function I6(n){let t=T6;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function En(){return bs()}function A6(){return bs()}function bs(){return new lr((n=>n.toString()),((n,t)=>n.isEqual(t)))}const j3=new gt(z.comparator),G3=new Pt(z.comparator);function rt(...n){let t=G3;for(const e of n)t=t.add(e);return t}const z3=new Pt(st);function W3(){return z3}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K3(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y3=new In([4294967295,4294967295],0);function Zl(n){const t=K3().encode(n),e=new M2;return e.update(t),new Uint8Array(e.digest())}function th(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new In([e,r],0),new In([s,i],0)]}class $1{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new ws(`Invalid padding: ${e}`);if(r<0)throw new ws(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new ws(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new ws(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.ye=In.fromNumber(this.ge)}we(t,e,r){let s=t.add(e.multiply(In.fromNumber(r)));return s.compare(Y3)===1&&(s=new In([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Zl(t),[r,s]=th(e);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);if(!this.be(o))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new $1(i,s,e);return r.forEach((c=>o.insert(c))),o}insert(t){if(this.ge===0)return;const e=Zl(t),[r,s]=th(e);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);this.ve(o)}}ve(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class ws extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(t,e,r,s,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,di.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new fi(Y.min(),s,new gt(st),ne(),ne(),rt())}}class di{constructor(t,e,r,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new di(r,e,rt(),rt(),rt())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(t,e,r,s){this.Se=t,this.removedTargetIds=e,this.key=r,this.De=s}}class v6{constructor(t,e){this.targetId=t,this.xe=e}}class R6{constructor(t,e,r=bt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class eh{constructor(t){this.targetId=t,this.Ce=0,this.Fe=nh(),this.Oe=bt.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return this.Ce!==0}get Be(){return this.Ne}Ue(t){t.approximateByteSize()>0&&(this.Ne=!0,this.Oe=t)}ke(){let t=rt(),e=rt(),r=rt();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:G(38017,{changeType:i})}})),new di(this.Oe,this.Me,t,e,r)}qe(){this.Ne=!1,this.Fe=nh()}$e(t,e){this.Ne=!0,this.Fe=this.Fe.insert(t,e)}Ke(t){this.Ne=!0,this.Fe=this.Fe.remove(t)}We(){this.Ce+=1}Qe(){this.Ce-=1,H(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const gs="WatchChangeAggregator";class Q3{constructor(t){this.ze=t,this.je=new Map,this.He=ne(),this.Je=Bi(),this.Ye=ne(),this.Ze=Bi(),this.Xe=new gt(st)}et(t){for(const e of t.Se)t.De&&t.De.isFoundDocument()?this.tt(e,t.De):this.nt(e,t.key,t.De);for(const e of t.removedTargetIds)this.nt(e,t.key,t.De)}rt(t){this.forEachTarget(t,(e=>{const r=this.je.get(e);if(r)switch(t.state){case 0:this.it(e)&&r.Ue(t.resumeToken);break;case 1:r.Qe(),r.Le||r.qe(),r.Ue(t.resumeToken);break;case 2:r.Qe(),r.Le||this.removeTarget(e);break;case 3:this.it(e)&&(r.Ge(),r.Ue(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),r.Ue(t.resumeToken));break;default:G(56790,{state:t.state})}else B(gs,`handleTargetChange received targetChange for untracked target ID (${e}) with state (${t.state})`)}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach(((r,s)=>{this.it(s)&&e(s)}))}_t(t){var e;return Yn(t)?t.getPipelineSourceType()==="documents"&&((e=t.getPipelineDocuments())==null?void 0:e.length)===1:_6(t)}ot(t){const e=t.targetId,r=t.xe.count,s=this.ut(e);if(s){const i=s.target;if(this._t(i))if(r===0){const o=new z(Yn(i)?ct.fromString(i.getPipelineDocuments()[0]):i.path);this.nt(e,o,Lt.newNoDocument(o,Y.min()))}else H(r===1,20013,"Single document existence filter with count: "+r);else{const o=this.ct(e);if(o!==r){const c=this.lt(t),u=c?this.Et(c,t,o):1;if(u!==0){this.st(e);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(e,h)}}}}}lt(t){const e=t.xe.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=e;let o,c;try{o=Nn(r).toUint8Array()}catch(u){if(u instanceof K2)return xe("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new $1(o,s,i)}catch(u){return xe(u instanceof ws?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}Et(t,e,r){return e.xe.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.ze.getRemoteKeysForTarget(e);let s=0;return r.forEach((i=>{const o=this.ze.Tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(c)||(this.nt(e,i,null),s++)})),s}Rt(t){const e=new Map;this.je.forEach(((i,o)=>{const c=this.ut(o);if(c){if(i.current&&this._t(c.target)){const u=Yn(c.target)?ct.fromString(c.target.getPipelineDocuments()[0]):c.target.path,h=new z(u);this.It(h).has(o)||this.At(o,h)||this.nt(o,h,Lt.newNoDocument(h,t))}i.Be&&(e.set(o,i.ke()),i.qe())}}));let r=rt();this.Ze.forEach(((i,o)=>{let c=!0;o.forEachWhile((u=>{const h=this.ut(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.He.forEach(((i,o)=>o.setReadTime(t))),this.Ye.forEach(((i,o)=>o.setReadTime(t)));const s=new fi(t,e,this.Xe,this.He,this.Ye,r);return this.He=ne(),this.Je=Bi(),this.Ye=ne(),this.Ze=Bi(),this.Xe=new gt(st),s}tt(t,e){const r=this.je.get(t);if(!r||!this.it(t))return void B(gs,`addDocumentToTarget received document for unknown inactive target (${t})`);const s=this.At(t,e.key)?2:0;r.$e(e.key,s),Yn(this.ut(t).target)&&this.ut(t).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(e.key,e):this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.Ze=this.Ze.insert(e.key,this.Vt(e.key).add(t))}nt(t,e,r){const s=this.je.get(t);s&&this.it(t)?(this.At(t,e)?s.$e(e,1):s.Ke(e),this.Ze=this.Ze.insert(e,this.Vt(e).delete(t)),this.Ze=this.Ze.insert(e,this.Vt(e).add(t)),r&&(Yn(this.ut(t).target)&&this.ut(t).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(e,r):this.He=this.He.insert(e,r))):B(gs,`removeDocumentFromTarget received document for unknown or inactive target (${t})`)}removeTarget(t){this.je.delete(t)}ct(t){const e=this.je.get(t);if(!e)return 0;const r=e.ke();return this.ze.getRemoteKeysForTarget(t).size+r.addedDocuments.size-r.removedDocuments.size}We(t){let e=this.je.get(t);e||(B(gs,`recordPendingTargetRequest set up tracking for target ID ${t}`),e=new eh(t),this.je.set(t,e)),e.We()}Vt(t){let e=this.Ze.get(t);return e||(e=new Pt(st),this.Ze=this.Ze.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new Pt(st),this.Je=this.Je.insert(t,e)),e}it(t){const e=this.ut(t)!==null;return e||B(gs,"Detected inactive target",t),e}ut(t){const e=this.je.get(t);return e===void 0||e.Le?null:this.ze.dt(t)}st(t){this.je.set(t,new eh(t)),this.ze.getRemoteKeysForTarget(t).forEach((e=>{this.nt(t,e,null)}))}At(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Bi(){return new gt(z.comparator)}function nh(){return new gt(z.comparator)}const X3={asc:"ASCENDING",desc:"DESCENDING"},J3={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Z3={and:"AND",or:"OR"};class t9{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function c1(n,t){return n.useProto3Json||ci(t)?t:{value:t}}function mo(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function q1(n){const t=bn(n);return new pt(t.seconds,t.nanos)}function S6(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Ji(n,t){return mo(n,t.toTimestamp())}function pe(n){return H(!!n,49232),Y.fromTimestamp(q1(n))}function H1(n,t){return u1(n,t).canonicalString()}function u1(n,t){const e=(function(s){return new ct(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function C6(n){const t=ct.fromString(n);return H(k6(t),10190,{key:t.toString()}),t}function zs(n,t){return H1(n.databaseId,t.path)}function Ns(n,t){const e=C6(t);if(e.get(1)!==n.databaseId.projectId)throw new F(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new F(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new z(b6(e))}function P6(n,t){return H1(n.databaseId,t)}function e9(n){const t=C6(n);return t.length===4?ct.emptyPath():b6(t)}function l1(n){return new ct(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function b6(n){return H(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function rh(n,t,e){return{name:zs(n,t),fields:e.value.mapValue.fields}}function n9(n,t){return"found"in t?(function(r,s){H(!!s.found,43571),s.found.name,s.found.updateTime;const i=Ns(r,s.found.name),o=pe(s.found.updateTime),c=s.found.createTime?pe(s.found.createTime):Y.min(),u=new zt({mapValue:{fields:s.found.fields}});return Lt.newFoundDocument(i,o,c,u)})(n,t):"missing"in t?(function(r,s){H(!!s.missing,3894),H(!!s.readTime,22933);const i=Ns(r,s.missing),o=pe(s.readTime);return Lt.newNoDocument(i,o)})(n,t):G(7234,{result:t})}function r9(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:G(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,p){return h.useProto3Json?(H(p===void 0||typeof p=="string",58123),bt.fromBase64String(p||"")):(H(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),bt.fromUint8Array(p||new Uint8Array))})(n,t.targetChange.resumeToken),o=t.targetChange.cause,c=o&&(function(h){const p=h.code===void 0?V.UNKNOWN:w6(h.code);return new F(p,h.message||"")})(o);e=new R6(r,s,i,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ns(n,r.document.name),i=pe(r.document.updateTime),o=r.document.createTime?pe(r.document.createTime):Y.min(),c=new zt({mapValue:{fields:r.document.fields}}),u=Lt.newFoundDocument(s,i,o,c),h=r.targetIds||[],p=r.removedTargetIds||[];e=new Xi(h,p,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Ns(n,r.document),i=r.readTime?pe(r.readTime):Y.min(),o=Lt.newNoDocument(s,i),c=r.removedTargetIds||[];e=new Xi([],c,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Ns(n,r.document),i=r.removedTargetIds||[];e=new Xi([],i,s,null)}else{if(!("filter"in t))return G(11601,{ft:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new q3(s,i),c=r.targetId;e=new v6(c,o)}}return e}function N6(n,t){let e;if(t instanceof li)e={update:rh(n,t.key,t.value)};else if(t instanceof hi)e={delete:zs(n,t.key)};else if(t instanceof $n)e={update:rh(n,t.key,t.data),updateMask:d9(t.fieldMask)};else{if(!(t instanceof c6))return G(16599,{gt:t.type});e={verify:zs(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof js)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof kr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Vr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof xr)return{fieldPath:o.field.canonicalString(),increment:c.Re};if(c instanceof lo)return{fieldPath:o.field.canonicalString(),minimum:c.Re};if(c instanceof ho)return{fieldPath:o.field.canonicalString(),maximum:c.Re};throw G(20930,{transform:o.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Ji(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:G(27497)})(n,t.precondition)),e}function s9(n,t){return n&&n.length>0?(H(t!==void 0,14353),n.map((e=>(function(s,i){let o=s.updateTime?pe(s.updateTime):pe(i);return o.isEqual(Y.min())&&(o=pe(i)),new A3(o,s.transformResults||[])})(e,t)))):[]}function i9(n,t){return{documents:[P6(n,t.path)]}}function o9(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=P6(n,s);const i=(function(h){if(h.length!==0)return D6(Re.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((p=>(function(T){return{field:Er(T.field),direction:l9(T.dir)}})(p)))})(t.orderBy);o&&(e.structuredQuery.orderBy=o);const c=c1(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{yt:e,parent:s}}function a9(n){let t=e9(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){H(r===1,65062);const p=e.from[0];p.allDescendants?s=p.collectionId:t=t.child(p.collectionId)}let i=[];e.where&&(i=(function(m){const T=O6(m);return T instanceof Re&&h6(T)?T.getFilters():[T]})(e.where));let o=[];e.orderBy&&(o=(function(m){return m.map((T=>(function(O){return new Gs(wr(O.field),(function($){switch($){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(O.direction))})(T)))})(e.orderBy));let c=null;e.limit&&(c=(function(m){let T;return T=typeof m=="object"?m.value:m,ci(T)?null:T})(e.limit));let u=null;e.startAt&&(u=(function(m){const T=!!m.before,P=m.values||[];return new po(P,T)})(e.startAt));let h=null;return e.endAt&&(h=(function(m){const T=!m.before,P=m.values||[];return new po(P,T)})(e.endAt)),L3(t,s,o,i,c,"F",u,h)}function c9(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function u9(n,t){return{structuredPipeline:{pipeline:{stages:t.stages.map((e=>e._toProto(n)))}}}}function O6(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=wr(e.unaryFilter.field);return St.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=wr(e.unaryFilter.field);return St.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=wr(e.unaryFilter.field);return St.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=wr(e.unaryFilter.field);return St.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}})(n):n.fieldFilter!==void 0?(function(e){return St.create(wr(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return Re.create(e.compositeFilter.filters.map((r=>O6(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return G(1026)}})(e.compositeFilter.op))})(n):G(30097,{filter:n})}function l9(n){return X3[n]}function h9(n){return J3[n]}function f9(n){return Z3[n]}function Er(n){return{fieldPath:n.canonicalString()}}function wr(n){return Dt.fromServerFormat(n.fieldPath)}function D6(n){return n instanceof St?(function(e){if(e.op==="=="){if(oe(e.value))return{unaryFilter:{field:Er(e.field),op:"IS_NAN"}};if(fe(e.value))return{unaryFilter:{field:Er(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(oe(e.value))return{unaryFilter:{field:Er(e.field),op:"IS_NOT_NAN"}};if(fe(e.value))return{unaryFilter:{field:Er(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Er(e.field),op:h9(e.op),value:e.value}}})(n):n instanceof Re?(function(e){const r=e.getFilters().map((s=>D6(s)));return r.length===1?r[0]:{compositeFilter:{op:f9(e.op),filters:r}}})(n):G(54877,{filter:n})}function d9(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function k6(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function V6(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function Ws(n,t){const e={fields:{}};return t.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);e.fields[s]=r._toProto(n)})),{mapValue:e}}function x6(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uo(n){return new t9(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(t){this._byteString=t}static fromBase64String(t){try{return new le(bt.fromBase64String(t))}catch(e){throw new F(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new le(bt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:le._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(ai(t,le._jsonSchema))return le.fromBase64String(t.bytes)}}le._jsonSchemaVersion="firestore/bytes/1.0",le._jsonSchema={type:Ct("string",le._jsonSchemaVersion),bytes:Ct("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new F(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Dt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function p9(){return new Gr(be)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new F(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new F(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return st(this._lat,t._lat)||st(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ke._jsonSchemaVersion}}static fromJSON(t){if(ai(t,ke._jsonSchema))return new ke(t.latitude,t.longitude)}}function L6(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ke._jsonSchemaVersion="firestore/geoPoint/1.0",ke._jsonSchema={type:Ct("string",ke._jsonSchemaVersion),latitude:Ct("number"),longitude:Ct("number")};class g9{bt(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh="ConnectivityMonitor";class ih{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(t){this.Ct.push(t)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){B(sh,"Network connectivity changed: AVAILABLE");for(const t of this.Ct)t(0)}xt(){B(sh,"Network connectivity changed: UNAVAILABLE");for(const t of this.Ct)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $i=null;function h1(){return $i===null?$i=(function(){return 268435456+Math.round(2147483648*Math.random())})():$i++,"0x"+$i.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma="RestConnection",m9={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class _9{get Ot(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Mt=e+"://"+t.host,this.Nt=`projects/${r}/databases/${s}`,this.Lt=this.databaseId.database===r1?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Bt(t,e,r,s,i){const o=h1(),c=this.Ut(t,e.toUriEncodedString());B(Ma,`Sending RPC '${t}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(u,s,i);const{host:h}=new URL(c),p=ti(h);return this.qt(t,c,u,r,p).then((m=>(B(Ma,`Received RPC '${t}' ${o}: `,m),m)),(m=>{throw xe(Ma,`RPC '${t}' ${o} failed with error: `,m,"url: ",c,"request:",r),m}))}$t(t,e,r,s,i,o){return this.Bt(t,e,r,s,i)}kt(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+$r})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),r&&r.headers.forEach(((s,i)=>t[i]=s))}Ut(t,e){const r=m9[t];let s=`${this.Mt}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y9{constructor(t){this.Kt=t.Kt,this.Wt=t.Wt}Qt(t){this.Gt=t}zt(t){this.jt=t}Ht(t){this.Jt=t}onMessage(t){this.Yt=t}close(){this.Wt()}send(t){this.Kt(t)}Zt(){this.Gt()}Xt(){this.jt()}en(t){this.Jt(t)}tn(t){this.Yt(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht="WebChannelConnection",ms=(n,t,e)=>{n.listen(t,(r=>{try{e(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Sr extends _9{constructor(t){super(t),this.nn=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static rn(){if(!Sr.sn){const t=$2();ms(t,B2.STAT_EVENT,(e=>{e.stat===t1.PROXY?B(Ht,"STAT_EVENT: detected buffering proxy"):e.stat===t1.NOPROXY&&B(Ht,"STAT_EVENT: detected no buffering proxy")})),Sr.sn=!0}}qt(t,e,r,s,i){const o=h1();return new Promise(((c,u)=>{const h=new F2;h.setWithCredentials(!0),h.listenOnce(U2.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Ki.NO_ERROR:const m=h.getResponseJson();B(Ht,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(m)),c(m);break;case Ki.TIMEOUT:B(Ht,`RPC '${t}' ${o} timed out`),u(new F(V.DEADLINE_EXCEEDED,"Request time out"));break;case Ki.HTTP_ERROR:const T=h.getStatus();if(B(Ht,`RPC '${t}' ${o} failed with status:`,T,"response text:",h.getResponseText()),T>0){let P=h.getResponseJson();Array.isArray(P)&&(P=P[0]);const O=P==null?void 0:P.error;if(O&&O.status&&O.message){const M=(function(Z){const ut=Z.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(ut)>=0?ut:V.UNKNOWN})(O.status);u(new F(M,O.message))}else u(new F(V.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new F(V.UNAVAILABLE,"Connection failed."));break;default:G(9055,{_n:t,streamId:o,an:h.getLastErrorCode(),un:h.getLastError()})}}finally{B(Ht,`RPC '${t}' ${o} completed.`)}}));const p=JSON.stringify(s);B(Ht,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",p,r,15)}))}cn(t,e,r){const s=h1(),i=[this.Mt,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.kt(c.initMessageHeaders,e,r),c.encodeInitMessageHeaders=!0;const h=i.join("");B(Ht,`Creating RPC '${t}' stream ${s}: ${h}`,c);const p=o.createWebChannel(h,c);this.En(p);let m=!1,T=!1;const P=new y9({Kt:O=>{T?B(Ht,`Not sending because RPC '${t}' stream ${s} is closed:`,O):(m||(B(Ht,`Opening RPC '${t}' stream ${s} transport.`),p.open(),m=!0),B(Ht,`RPC '${t}' stream ${s} sending:`,O),p.send(O))},Wt:()=>p.close()});return ms(p,Es.EventType.OPEN,(()=>{T||(B(Ht,`RPC '${t}' stream ${s} transport opened.`),P.Zt())})),ms(p,Es.EventType.CLOSE,(()=>{T||(T=!0,B(Ht,`RPC '${t}' stream ${s} transport closed`),P.en(),this.hn(p))})),ms(p,Es.EventType.ERROR,(O=>{T||(T=!0,xe(Ht,`RPC '${t}' stream ${s} transport errored. Name:`,O.name,"Message:",O.message),P.en(new F(V.UNAVAILABLE,"The operation could not be completed")))})),ms(p,Es.EventType.MESSAGE,(O=>{var M;if(!T){const $=O.data[0];H(!!$,16349);const Z=$,ut=(Z==null?void 0:Z.error)||((M=Z[0])==null?void 0:M.error);if(ut){B(Ht,`RPC '${t}' stream ${s} received error:`,ut);const Et=ut.status;let me=(function(v){const y=vt[v];if(y!==void 0)return w6(y)})(Et),Bt=ut.message;Et==="NOT_FOUND"&&Bt.includes("database")&&Bt.includes("does not exist")&&Bt.includes(this.databaseId.database)&&xe(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),me===void 0&&(me=V.INTERNAL,Bt="Unknown error status: "+Et+" with message "+ut.message),T=!0,P.en(new F(me,Bt)),p.close()}else B(Ht,`RPC '${t}' stream ${s} received:`,$),P.tn($)}})),Sr.rn(),setTimeout((()=>{P.Xt()}),0),P}terminate(){this.nn.forEach((t=>t.close())),this.nn=[]}En(t){this.nn.push(t)}hn(t){this.nn=this.nn.filter((e=>e===t))}kt(t,e,r){super.kt(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return q2()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E9(n){return new Sr(n)}Sr.sn=!1;class j1{constructor(t,e,r=1e3,s=1.5,i=6e4){this.Tn=t,this.timerId=e,this.Pn=r,this.Rn=s,this.In=i,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(t){this.cancel();const e=Math.floor(this.An+this.pn()),r=Math.max(0,Date.now()-this.dn),s=Math.max(0,e-r);s>0&&B("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.An} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,s,(()=>(this.dn=Date.now(),t()))),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){this.Vn!==null&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){this.Vn!==null&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh="PersistentStream";class M6{constructor(t,e,r,s,i,o,c,u){this.Tn=t,this.yn=r,this.wn=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new j1(t,e)}Cn(){return this.state===1||this.state===5||this.Fn()}Fn(){return this.state===2||this.state===3}start(){this.Dn=0,this.state!==4?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&this.vn===null&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,(()=>this.Ln())))}Bn(t){this.Un(),this.stream.send(t)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(t,e){this.Un(),this.kn(),this.xn.cancel(),this.bn++,t!==4?this.xn.reset():e&&e.code===V.RESOURCE_EXHAUSTED?(tn(e.toString()),tn("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qn(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ht(e)}qn(){}auth(){this.state=1;const t=this.$n(this.bn),e=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.bn===e&&this.Kn(r,s)}),(r=>{t((()=>{const s=new F(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Wn(s)}))}))}Kn(t,e){const r=this.$n(this.bn);this.stream=this.Qn(t,e),this.stream.Qt((()=>{r((()=>this.listener.Qt()))})),this.stream.zt((()=>{r((()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,(()=>(this.Fn()&&(this.state=3),Promise.resolve()))),this.listener.zt())))})),this.stream.Ht((s=>{r((()=>this.Wn(s)))})),this.stream.onMessage((s=>{r((()=>++this.Dn==1?this.Gn(s):this.onNext(s)))}))}On(){this.state=5,this.xn.mn((async()=>{this.state=0,this.start()}))}Wn(t){return B(oh,`close with error: ${t}`),this.stream=null,this.close(4,t)}$n(t){return e=>{this.Tn.enqueueAndForget((()=>this.bn===t?e():(B(oh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class w9 extends M6{constructor(t,e,r,s,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}Qn(t,e){return this.connection.cn("Listen",t,e)}Gn(t){return this.onNext(t)}onNext(t){this.xn.reset();const e=r9(this.serializer,t),r=(function(i){if(!("targetChange"in i))return Y.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?Y.min():o.readTime?pe(o.readTime):Y.min()})(t);return this.listener.zn(e,r)}jn(t){const e={};e.database=l1(this.serializer),e.addTarget=(function(i,o){let c;const u=o.target;if(c=Yn(u)?{pipelineQuery:u9(i,u)}:_6(u)?{documents:i9(i,u)}:{query:o9(i,u).yt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=S6(i,o.resumeToken);const h=c1(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(Y.min())>0){c.readTime=mo(i,o.snapshotVersion.toTimestamp());const h=c1(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,t);const r=c9(this.serializer,t);r&&(e.labels=r),this.Bn(e)}Hn(t){const e={};e.database=l1(this.serializer),e.removeTarget=t,this.Bn(e)}}class T9 extends M6{constructor(t,e,r,s,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(t,e){return this.connection.cn("Write",t,e)}Gn(t){return H(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0,55816),this.listener.Zn()}onNext(t){H(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.xn.reset();const e=s9(t.writeResults,t.commitTime),r=pe(t.commitTime);return this.listener.Xn(r,e)}er(){const t={};t.database=l1(this.serializer),this.Bn(t)}Yn(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>N6(this.serializer,r)))};this.Bn(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I9{}class A9 extends I9{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.tr=!1}nr(){if(this.tr)throw new F(V.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(t,e,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Bt(t,u1(e,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new F(V.UNKNOWN,i.toString())}))}$t(t,e,r,s,i){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.$t(t,u1(e,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new F(V.UNKNOWN,o.toString())}))}terminate(){this.tr=!0,this.connection.terminate()}}function v9(n,t,e,r){return new A9(n,t,e,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R9="ComponentProvider",ah=new Map;function S9(n,t,e,r,s){return new m3(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,L6(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},F6=41943040;class ee{static withCacheSize(t){return new ee(t,ee.DEFAULT_COLLECTION_PERCENTILE,ee.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}ee.DEFAULT_COLLECTION_PERCENTILE=10,ee.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ee.DEFAULT=new ee(F6,ee.DEFAULT_COLLECTION_PERCENTILE,ee.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ee.DISABLED=new ee(-1,0,0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh="LruGarbageCollector",U6=1048576;function lh([n,t],[e,r]){const s=st(n,e);return s===0?st(t,r):s}class C9{constructor(t){this.rr=t,this.buffer=new Pt(lh),this.ir=0}sr(){return++this.ir}_r(t){const e=[t,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();lh(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class P9{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return this.ar!==null}ur(t){B(uh,`Garbage collection scheduled in ${t}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Hr(e)?B(uh,"Ignoring IndexedDB error during garbage collection: ",e):await qr(e)}await this.ur(3e5)}))}}class b9{constructor(t,e){this.cr=t,this.params=e}calculateTargetCount(t,e){return this.cr.lr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return x.resolve(Oo.ce);const r=new C9(e);return this.cr.forEachTarget(t,(s=>r._r(s.sequenceNumber))).next((()=>this.cr.Er(t,(s=>r._r(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.cr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.cr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(B("LruGarbageCollector","Garbage collection skipped; disabled"),x.resolve(ch)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(B("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ch):this.hr(t,e)))}getCacheSize(t){return this.cr.getCacheSize(t)}hr(t,e){let r,s,i,o,c,u,h;const p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(B("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(t,s)))).next((m=>(r=m,c=Date.now(),this.removeTargets(t,r,e)))).next((m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(t,r)))).next((m=>(h=Date.now(),_r()<=it.DEBUG&&B("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-p}ms`),x.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function N9(n,t){return new b9(n,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O9="firestore.googleapis.com",hh=!0;class fh{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new F(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=O9,this.ssl=hh}else this.host=t.host,this.ssl=t.ssl??hh;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=F6;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<U6)throw new F(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}r3("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=L6(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new F(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new F(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new F(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class G1{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new fh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new F(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new fh(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new K4;switch(r.type){case"firstParty":return new X4(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new F(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=ah.get(e);r&&(B(R9,"Removing Datastore"),ah.delete(e),r.terminate())})(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new rn(this.firestore,t,this._query)}}class yt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new An(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new yt(this.firestore,t,this._key)}toJSON(){return{type:yt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(ai(e,yt._jsonSchema))return new yt(t,r||null,new z(ct.fromString(e.referencePath)))}}yt._jsonSchemaVersion="firestore/documentReference/1.0",yt._jsonSchema={type:Ct("string",yt._jsonSchemaVersion),referencePath:Ct("string")};class An extends rn{constructor(t,e,r){super(t,e,U1(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new yt(this.firestore,null,new z(t))}withConverter(t){return new An(this.firestore,t,this._path)}}function k_(n,t,...e){if(n=Tt(n),G2("collection","path",t),n instanceof G1){const r=ct.fromString(t,...e);return Ml(r),new An(n,null,r)}{if(!(n instanceof yt||n instanceof An))throw new F(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ct.fromString(t,...e));return Ml(r),new An(n.firestore,null,r)}}function D9(n,t,...e){if(n=Tt(n),arguments.length===1&&(t=x1.newId()),G2("doc","path",t),n instanceof G1){const r=ct.fromString(t,...e);return Ll(r),new yt(n,null,new z(r))}{if(!(n instanceof yt||n instanceof An))throw new F(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ct.fromString(t,...e));return Ll(r),new yt(n.firestore,n instanceof An?n.converter:null,new z(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:re._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(ai(t,re._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new re(t.vectorValues);throw new F(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}re._jsonSchemaVersion="firestore/vectorValue/1.0",re._jsonSchema={type:Ct("string",re._jsonSchemaVersion),vectorValues:Ct("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k9=/^__.*__$/;class V9{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new $n(t,this.data,this.fieldMask,e,this.fieldTransforms):new li(t,this.data,e,this.fieldTransforms)}}class B6{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new $n(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function $6(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{dataSource:n})}}class Bo{constructor(t,e,r,s,i,o){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(t){return new Bo({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePathSegment(t),r}childContextForFieldPath(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePath(),r}childContextForArray(t){return this.contextWith({path:void 0,arrayElement:!0})}createError(t){return _o(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}validatePath(){if(this.path)for(let t=0;t<this.path.length;t++)this.validatePathSegment(this.path.get(t))}validatePathSegment(t){if(t.length===0)throw this.createError("Document fields must not be empty");if($6(this.dataSource)&&k9.test(t))throw this.createError('Document fields cannot begin and end with "__"')}}class x9{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Uo(t)}createContext(t,e,r,s=!1){return new Bo({dataSource:t,methodName:e,targetDoc:r,path:Dt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function zr(n){const t=n._freezeSettings(),e=Uo(n._databaseId);return new x9(n._databaseId,!!t.ignoreUndefinedProperties,e)}function $o(n,t,e,r,s,i={}){const o=n.createContext(i.merge||i.mergeFields?2:0,t,e,s);J1("Data must be an object, but it was:",o,r);const c=H6(r,o);let u,h;if(i.merge)u=new he(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const T=Dn(t,m,e);if(!o.contains(T))throw new F(V.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);z6(p,T)||p.push(T)}u=new he(p),h=o.fieldTransforms.filter((m=>u.covers(m.field)))}else u=null,h=o.fieldTransforms;return new V9(new zt(c),u,h)}class pi extends hr{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.createError(`${this._methodName}() can only appear at the top level of your update data`):t.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof pi}}function q6(n,t,e){return new Bo({dataSource:3,targetDoc:t.settings.targetDoc,methodName:n._methodName,arrayElement:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class z1 extends hr{_toFieldTransform(t){return new Lo(t.path,new js)}isEqual(t){return t instanceof z1}}class W1 extends hr{constructor(t,e){super(t),this.Tr=e}_toFieldTransform(t){const e=q6(this,t,!0),r=this.Tr.map((i=>Le(i,e))),s=new kr(r);return new Lo(t.path,s)}isEqual(t){return t instanceof W1&&Xe(this.Tr,t.Tr)}}class K1 extends hr{constructor(t,e){super(t),this.Tr=e}_toFieldTransform(t){const e=q6(this,t,!0),r=this.Tr.map((i=>Le(i,e))),s=new Vr(r);return new Lo(t.path,s)}isEqual(t){return t instanceof K1&&Xe(this.Tr,t.Tr)}}class Y1 extends hr{constructor(t,e){super(t),this.Pr=e}_toFieldTransform(t){const e=new xr(t.serializer,Vo(t.serializer,this.Pr));return new Lo(t.path,e)}isEqual(t){return t instanceof Y1&&(this.Pr===t.Pr||Number.isNaN(this.Pr)&&Number.isNaN(t.Pr))}}function Q1(n,t,e,r){const s=n.createContext(1,t,e);J1("Data must be an object, but it was:",s,r);const i=[],o=zt.empty();Bn(r,((u,h)=>{const p=G6(t,u,e);h=Tt(h);const m=s.childContextForFieldPath(p);if(h instanceof pi)i.push(p);else{const T=Le(h,m);T!=null&&(i.push(p),o.set(p,T))}}));const c=new he(i);return new B6(o,c,s.fieldTransforms)}function X1(n,t,e,r,s,i){const o=n.createContext(1,t,e),c=[Dn(t,r,e)],u=[s];if(i.length%2!=0)throw new F(V.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<i.length;T+=2)c.push(Dn(t,i[T])),u.push(i[T+1]);const h=[],p=zt.empty();for(let T=c.length-1;T>=0;--T)if(!z6(h,c[T])){const P=c[T];let O=u[T];O=Tt(O);const M=o.childContextForFieldPath(P);if(O instanceof pi)h.push(P);else{const $=Le(O,M);$!=null&&(h.push(P),p.set(P,$))}}const m=new he(h);return new B6(p,m,o.fieldTransforms)}function L9(n,t,e,r=!1){return Le(e,n.createContext(r?4:3,t))}function Le(n,t,e){if(j6(n=Tt(n)))return J1("Unsupported field value:",t,n),H6(n,t);if(n instanceof hr)return(function(s,i){if(!$6(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.createError("Nested arrays are not supported");return(function(s,i){const o=[];let c=0;for(const u of s){let h=Le(u,i.childContextForArray(c));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),c++}return{arrayValue:{values:o}}})(n,t)}return(function(s,i,o){if((s=Tt(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Vo(i.serializer,s,o);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const c=pt.fromDate(s);return{timestampValue:mo(i.serializer,c)}}if(s instanceof pt){const c=new pt(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:mo(i.serializer,c)}}if(s instanceof ke)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof le)return{bytesValue:S6(i.serializer,s._byteString)};if(s instanceof yt){const c=i.databaseId,u=s.firestore._databaseId;if(!u.isEqual(c))throw i.createError(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:H1(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof re)return(function(u,h){const p=u instanceof re?u.toArray():u;return{mapValue:{fields:{[Z2]:{stringValue:t6},[qs]:{arrayValue:{values:p.map((T=>{if(typeof T!="number")throw h.createError("VectorValues must only contain numeric values.");return ko(h.serializer,T)}))}}}}}})(s,i);if(V6(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${No(s)}`)})(n,t,e)}function H6(n,t){const e={};return W2(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Bn(n,((r,s)=>{const i=Le(s,t.childContextForField(r));i!=null&&(e[r]=i)})),{mapValue:{fields:e}}}function j6(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof pt||n instanceof ke||n instanceof le||n instanceof yt||n instanceof hr||n instanceof re||V6(n))}function J1(n,t,e){if(!j6(e)||!oi(e)){const r=No(e);throw r==="an object"?t.createError(n+" a custom object"):t.createError(n+" "+r)}}function Dn(n,t,e){if((t=Tt(t))instanceof Gr)return t._internalPath;if(typeof t=="string")return G6(n,t);throw _o("Field path arguments must be of type string or ",n,!1,void 0,e)}const M9=new RegExp("[~\\*/\\[\\]]");function G6(n,t,e){if(t.search(M9)>=0)throw _o(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Gr(...t.split("."))._internalPath}catch{throw _o(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function _o(n,t,e,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new F(V.INVALID_ARGUMENT,c+n+u)}function z6(n,t){return n.some((e=>e.isEqual(t)))}function W6(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(t){this.optionDefinitions=t}_getKnownOptions(t,e){const r=zt.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in t){const o=t[s];let c;i.nestedOptions&&oi(o)?c={mapValue:{fields:new Kt(i.nestedOptions).getOptionsProto(e,o)}}:o&&(c=Le(o,e)??void 0),c&&r.set(Dt.fromServerFormat(i.serverName),c)}}return r}getOptionsProto(t,e,r){const s=this._getKnownOptions(e,t);if(r){const i=new Map(p3(r,((o,c)=>[Dt.fromServerFormat(c),o!==void 0?Le(o,t):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F9(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(e){return typeof e=="object"&&e!==null&&"seconds"in e&&(e.seconds===null||typeof e.seconds=="number"||typeof e.seconds=="string")&&"nanos"in e&&(e.nanos===null||typeof e.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(e){return typeof e=="object"&&e!==null&&"latitude"in e&&(e.latitude===null||typeof e.latitude=="number")&&"longitude"in e&&(e.longitude===null||typeof e.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("values"in e)||e.values!==null&&!Array.isArray(e.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("fields"in e)||e.fields!==null&&!oi(e.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("name"in e)||e.name!==null&&typeof e.name!="string"||!("args"in e)||e.args!==null&&!Array.isArray(e.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("stages"in e)||e.stages!==null&&!Array.isArray(e.stages))})(n.pipelineValue)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V_(){return new pi("deleteField")}function x_(){return new z1("serverTimestamp")}function L_(...n){return new W1("arrayUnion",n)}function M_(...n){return new K1("arrayRemove",n)}function F_(n){return new Y1("increment",n)}function U9(n){return new re(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(n){let t;return n instanceof fr?n:(t=oi(n)?j9(n):n instanceof Array?G9(n):K6(n,void 0),t)}function Fa(n){if(n instanceof fr)return n;if(n instanceof re)return Ks(n);if(Array.isArray(n))return Ks(U9(n));throw new Error("Unsupported value: "+typeof n)}function Z1(n){return h3(n)?Zi(n):L(n)}class fr{constructor(){this._protoValueType="ProtoValue"}add(t){return new D("add",[this,L(t)],"add")}asBoolean(){if(this instanceof kn)return this;if(this instanceof Kr)return new Q6(this);if(this instanceof Wr)return new H9(this);if(this instanceof D)return new Y6(this);throw new F("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(t){return new D("subtract",[this,L(t)],"subtract")}multiply(t){return new D("multiply",[this,L(t)],"multiply")}divide(t){return new D("divide",[this,L(t)],"divide")}mod(t){return new D("mod",[this,L(t)],"mod")}equal(t){return new D("equal",[this,L(t)],"equal").asBoolean()}notEqual(t){return new D("not_equal",[this,L(t)],"notEqual").asBoolean()}lessThan(t){return new D("less_than",[this,L(t)],"lessThan").asBoolean()}lessThanOrEqual(t){return new D("less_than_or_equal",[this,L(t)],"lessThanOrEqual").asBoolean()}greaterThan(t){return new D("greater_than",[this,L(t)],"greaterThan").asBoolean()}greaterThanOrEqual(t){return new D("greater_than_or_equal",[this,L(t)],"greaterThanOrEqual").asBoolean()}arrayConcat(t,...e){const r=[t,...e].map((s=>L(s)));return new D("array_concat",[this,...r],"arrayConcat")}arrayContains(t){return new D("array_contains",[this,L(t)],"arrayContains").asBoolean()}arrayContainsAll(t){const e=Array.isArray(t)?new Ts(t.map(L),"arrayContainsAll"):t;return new D("array_contains_all",[this,e],"arrayContainsAll").asBoolean()}arrayContainsAny(t){const e=Array.isArray(t)?new Ts(t.map(L),"arrayContainsAny"):t;return new D("array_contains_any",[this,e],"arrayContainsAny").asBoolean()}arrayReverse(){return new D("array_reverse",[this])}arrayLength(){return new D("array_length",[this],"arrayLength")}equalAny(t){const e=Array.isArray(t)?new Ts(t.map(L),"equalAny"):t;return new D("equal_any",[this,e],"equalAny").asBoolean()}notEqualAny(t){const e=Array.isArray(t)?new Ts(t.map(L),"notEqualAny"):t;return new D("not_equal_any",[this,e],"notEqualAny").asBoolean()}exists(){return new D("exists",[this],"exists").asBoolean()}charLength(){return new D("char_length",[this],"charLength")}like(t){return new D("like",[this,L(t)],"like").asBoolean()}regexContains(t){return new D("regex_contains",[this,L(t)],"regexContains").asBoolean()}regexFind(t){return new D("regex_find",[this,L(t)],"regexFind")}regexFindAll(t){return new D("regex_find_all",[this,L(t)],"regexFindAll")}regexMatch(t){return new D("regex_match",[this,L(t)],"regexMatch").asBoolean()}stringContains(t){return new D("string_contains",[this,L(t)],"stringContains").asBoolean()}startsWith(t){return new D("starts_with",[this,L(t)],"startsWith").asBoolean()}endsWith(t){return new D("ends_with",[this,L(t)],"endsWith").asBoolean()}toLower(){return new D("to_lower",[this],"toLower")}toUpper(){return new D("to_upper",[this],"toUpper")}trim(t){const e=[this];return t&&e.push(L(t)),new D("trim",e,"trim")}ltrim(t){const e=[this];return t&&e.push(L(t)),new D("ltrim",e,"ltrim")}rtrim(t){const e=[this];return t&&e.push(L(t)),new D("rtrim",e,"rtrim")}type(){return new D("type",[this])}isType(t){return new D("is_type",[this,Ks(t)],"isType").asBoolean()}stringConcat(t,...e){const r=[t,...e].map(L);return new D("string_concat",[this,...r],"stringConcat")}stringIndexOf(t){return new D("string_index_of",[this,L(t)],"stringIndexOf")}stringRepeat(t){return new D("string_repeat",[this,L(t)],"stringRepeat")}stringReplaceAll(t,e){return new D("string_replace_all",[this,L(t),L(e)],"stringReplaceAll")}stringReplaceOne(t,e){return new D("string_replace_one",[this,L(t),L(e)],"stringReplaceOne")}concat(t,...e){const r=[t,...e].map(L);return new D("concat",[this,...r],"concat")}reverse(){return new D("reverse",[this],"reverse")}arrayFilter(t,e){return new D("array_filter",[this,L(t),e],"arrayFilter")}arrayTransform(t,e){return new D("array_transform",[this,L(t),e],"arrayTransform")}arrayTransformWithIndex(t,e,r){return new D("array_transform",[this,L(t),L(e),r],"arrayTransformWithIndex")}arraySlice(t,e){const r=[this,L(t)];return e!==void 0&&r.push(L(e)),new D("array_slice",r,"arraySlice")}arrayFirst(){return new D("array_first",[this],"arrayFirst")}arrayFirstN(t){return new D("array_first_n",[this,L(t)],"arrayFirstN")}arrayLast(){return new D("array_last",[this],"arrayLast")}arrayLastN(t){return new D("array_last_n",[this,L(t)],"arrayLastN")}arrayMaximum(){return new D("maximum",[this],"arrayMaximum")}arrayMaximumN(t){return new D("maximum_n",[this,L(t)],"arrayMaximumN")}arrayMinimum(){return new D("minimum",[this],"arrayMinimum")}arrayMinimumN(t){return new D("minimum_n",[this,L(t)],"arrayMinimumN")}arrayIndexOf(t){return new D("array_index_of",[this,L(t),L("first")],"arrayIndexOf")}arrayLastIndexOf(t){return new D("array_index_of",[this,L(t),L("last")],"arrayLastIndexOf")}arrayIndexOfAll(t){return new D("array_index_of_all",[this,L(t)],"arrayIndexOfAll")}byteLength(){return new D("byte_length",[this],"byteLength")}ceil(){return new D("ceil",[this])}floor(){return new D("floor",[this])}abs(){return new D("abs",[this])}exp(){return new D("exp",[this])}mapGet(t){return new D("map_get",[this,Ks(t)],"mapGet")}mapSet(t,e,...r){const s=[this,L(t),L(e),...r.map(L)];return new D("map_set",s,"mapSet")}mapKeys(){return new D("map_keys",[this],"mapKeys")}mapValues(){return new D("map_values",[this],"mapValues")}mapEntries(){return new D("map_entries",[this],"mapEntries")}getField(t){return new D("get_field",[this,L(t)],"get_field")}count(){return ce._create("count",[this],"count")}sum(){return ce._create("sum",[this],"sum")}average(){return ce._create("average",[this],"average")}minimum(){return ce._create("minimum",[this],"minimum")}maximum(){return ce._create("maximum",[this],"maximum")}first(){return ce._create("first",[this],"first")}last(){return ce._create("last",[this],"last")}arrayAgg(){return ce._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return ce._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return ce._create("count_distinct",[this],"countDistinct")}logicalMaximum(t,...e){const r=[t,...e];return new D("maximum",[this,...r.map(L)],"logicalMaximum")}logicalMinimum(t,...e){const r=[t,...e];return new D("minimum",[this,...r.map(L)],"minimum")}vectorLength(){return new D("vector_length",[this],"vectorLength")}cosineDistance(t){return new D("cosine_distance",[this,Fa(t)],"cosineDistance")}dotProduct(t){return new D("dot_product",[this,Fa(t)],"dotProduct")}euclideanDistance(t){return new D("euclidean_distance",[this,Fa(t)],"euclideanDistance")}unixMicrosToTimestamp(){return new D("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new D("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new D("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new D("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new D("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new D("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(t,e){return new D("timestamp_add",[this,L(t),L(e)],"timestampAdd")}timestampSubtract(t,e){return new D("timestamp_subtract",[this,L(t),L(e)],"timestampSubtract")}timestampDiff(t,e){return new D("timestamp_diff",[this,Z1(t),L(e)],"timestampDiff")}timestampExtract(t,e){const r=[this,L(t)];return e&&r.push(L(e)),new D("timestamp_extract",r,"timestampExtract")}documentId(){return new D("document_id",[this],"documentId")}parent(){return new D("parent",[this],"parent")}substring(t,e){const r=L(t);return new D("substring",e===void 0?[this,r]:[this,r,L(e)],"substring")}arrayGet(t){return new D("array_get",[this,L(t)],"arrayGet")}isError(){return new D("is_error",[this],"isError").asBoolean()}ifError(t){const e=new D("if_error",[this,L(t)],"ifError");return t instanceof kn?e.asBoolean():e}isAbsent(){return new D("is_absent",[this],"isAbsent").asBoolean()}mapRemove(t){return new D("map_remove",[this,L(t)],"mapRemove")}mapMerge(t,...e){const r=L(t),s=e.map(L);return new D("map_merge",[this,r,...s],"mapMerge")}pow(t){return new D("pow",[this,L(t)])}trunc(t){return t===void 0?new D("trunc",[this]):new D("trunc",[this,L(t)],"trunc")}round(t){return t===void 0?new D("round",[this]):new D("round",[this,L(t)],"round")}collectionId(){return new D("collection_id",[this])}length(){return new D("length",[this])}ln(){return new D("ln",[this])}sqrt(){return new D("sqrt",[this])}stringReverse(){return new D("string_reverse",[this])}ifAbsent(t){return new D("if_absent",[this,L(t)],"ifAbsent")}ifNull(t){return new D("if_null",[this,L(t)],"ifNull")}coalesce(t,...e){return new D("coalesce",[this,L(t),...e.map(L)],"coalesce")}join(t){return new D("join",[this,L(t)],"join")}log10(){return new D("log10",[this])}arraySum(){return new D("sum",[this])}split(t){return new D("split",[this,L(t)])}timestampTruncate(t,e){const r=[this,L(t)];return e&&r.push(L(e)),new D("timestamp_trunc",r)}ascending(){return z9(this)}descending(){return W9(this)}as(t){return new $9(this,t,"as")}}class ce{constructor(t,e){this.name=t,this.params=e,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(t,e,r){const s=new ce(t,e);return s._methodName=r,s}as(t){return new B9(this,t,"as")}_toProto(t){return{functionValue:{name:this.name,args:this.params.map((e=>e._toProto(t)))}}}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,this.params.forEach((e=>e._readUserData(t)))}}class B9{constructor(t,e,r){this.aggregate=t,this.alias=e,this._methodName=r}_readUserData(t){this.aggregate._readUserData(t)}}class $9{constructor(t,e,r){this.expr=t,this.alias=e,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(t){this.expr._readUserData(t)}}class Ts extends fr{constructor(t,e){super(),this.Rr=t,this._methodName=e,this.expressionType="ListOfExpressions"}_toProto(t){return{arrayValue:{values:this.Rr.map((e=>e._toProto(t)))}}}_readUserData(t){this.Rr.forEach((e=>e._readUserData(t)))}}class Wr extends fr{constructor(t,e){super(),this.fieldPath=t,this._methodName=e,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(t){return new D("geo_distance",[this,L(t)],"geoDistance")}_toProto(t){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(t){}}function Zi(n){return q9(n,"field")}function q9(n,t){return new Wr(typeof n=="string"?be===n?p9()._internalPath:Dn("field",n):n._internalPath,t)}class Kr extends fr{constructor(t,e){super(),this.value=t,this._methodName=e,this.expressionType="Constant"}static _fromProto(t){const e=new Kr(t,void 0);return e._protoValue=t,e}_toProto(t){return H(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,F9(this._protoValue)||(this._protoValue=Le(this.value,t))}}function Ks(n,t){return K6(n,"constant")}function K6(n,t){const e=new Kr(n,t);return typeof n=="boolean"?new Q6(e):e}class D extends fr{constructor(t,e,r,s){super(),this.name=t,this.params=e,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Kt({})}_toProto(t){const e={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(t)))}};return this._optionsProto&&(e.functionValue.options=this._optionsProto),e}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,this.params.forEach((e=>e._readUserData(t))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(t,this._options))}}class kn extends fr{get _methodName(){return this._expr._methodName}countIf(){return ce._create("count_if",[this],"countIf")}not(){return new D("not",[this],"not").asBoolean()}conditional(t,e){return new D("conditional",[this,t,e],"conditional")}ifError(t){const e=L(t),r=new D("if_error",[this,e],"ifError");return e instanceof kn?r.asBoolean():r}_toProto(t){return this._expr._toProto(t)}_readUserData(t){this._expr._readUserData(t)}}class Y6 extends kn{constructor(t){super(),this._expr=t,this.expressionType="Function"}}class Q6 extends kn{constructor(t){super(),this._expr=t,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class H9 extends kn{constructor(t){super(),this._expr=t,this.expressionType="Field"}}function j9(n,t){const e=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];e.push(Ks(r)),e.push(L(s))}return new D("map",e,"map")}function G9(n){return(function(e,r){return new D("array",e.map((s=>L(s))),r)})(n,"array")}function z9(n){return new X6(Z1(n),"ascending","ascending")}function W9(n){return new X6(Z1(n),"descending","descending")}class X6{constructor(t,e,r){this.expr=t,this.direction=e,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(t){return{mapValue:{fields:{direction:x6(this.direction),expression:this.expr._toProto(t)}}}}_readUserData(t){this.expr._readUserData(t)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(t){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=t}_readUserData(t){this.optionsProto=this._optionsUtil.getOptionsProto(t,this.knownOptions,this.rawOptions)}_toProto(t){return{name:this._name,options:this.optionsProto}}}class J6 extends ge{get _name(){return"add_fields"}get _optionsUtil(){return new Kt({})}constructor(t,e){super(e),this.fields=t}_toProto(t){return{...super._toProto(t),args:[Ws(t,this.fields)]}}_readUserData(t){super._readUserData(t),Vn(this.fields,t)}}class Z6 extends ge{get _name(){return"aggregate"}get _optionsUtil(){return new Kt({})}constructor(t,e,r){super(r),this.groups=t,this.accumulators=e}_toProto(t){return{...super._toProto(t),args:[Ws(t,this.accumulators),Ws(t,this.groups)]}}_readUserData(t){super._readUserData(t),Vn(this.groups,t),Vn(this.accumulators,t)}}class tf extends ge{get _name(){return"distinct"}get _optionsUtil(){return new Kt({})}constructor(t,e){super(e),this.groups=t}_toProto(t){return{...super._toProto(t),args:[Ws(t,this.groups)]}}_readUserData(t){super._readUserData(t),Vn(this.groups,t)}}class qo extends ge{get _name(){return"collection"}get _optionsUtil(){return new Kt({forceIndex:{serverName:"force_index"}})}constructor(t,e){super(e),this.Vr=t.startsWith("/")?t:"/"+t}_toProto(t){return{...super._toProto(t),args:[{referenceValue:this.Vr}]}}_readUserData(t){super._readUserData(t)}}class Ho extends ge{get _name(){return"collection_group"}get _optionsUtil(){return new Kt({forceIndex:{serverName:"force_index"}})}constructor(t,e){super(e),this.collectionId=t}_toProto(t){return{...super._toProto(t),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(t){super._readUserData(t)}}class tc extends ge{get _name(){return"database"}get _optionsUtil(){return new Kt({})}_toProto(t){return{...super._toProto(t)}}_readUserData(t){super._readUserData(t)}}class ec extends ge{get _name(){return"documents"}get _optionsUtil(){return new Kt({})}constructor(t,e){if(super(e),!t||t.length===0)throw new F(V.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=t.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new F(V.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=r,this.mr=s}_toProto(t){return{...super._toProto(t),args:this.dr.map((e=>({referenceValue:e})))}}_readUserData(t){super._readUserData(t)}}class jo extends ge{get _name(){return"where"}get _optionsUtil(){return new Kt({})}constructor(t,e){super(e),this.condition=t}_toProto(t){return{...super._toProto(t),args:[this.condition._toProto(t)]}}_readUserData(t){super._readUserData(t),Vn(this.condition,t)}}class ir extends ge{get _name(){return"limit"}get _optionsUtil(){return new Kt({})}constructor(t,e){H(!isNaN(t)&&t!==1/0&&t!==-1/0,34860),super(e),this.limit=t}_toProto(t){return{...super._toProto(t),args:[Vo(t,this.limit)]}}}class dh extends ge{get _name(){return"offset"}get _optionsUtil(){return new Kt({})}constructor(t,e){super(e),this.offset=t}_toProto(t){return{...super._toProto(t),args:[Vo(t,this.offset)]}}}class K9 extends ge{get _name(){return"select"}get _optionsUtil(){return new Kt({})}constructor(t,e){super(e),this.selections=t}_toProto(t){return{...super._toProto(t),args:[Ws(t,this.selections)]}}_readUserData(t){super._readUserData(t),Vn(this.selections,t)}}class je extends ge{get _name(){return"sort"}get _optionsUtil(){return new Kt({})}constructor(t,e){super(e),this.orderings=t}_toProto(t){return{...super._toProto(t),args:this.orderings.map((e=>e._toProto(t)))}}_readUserData(t){super._readUserData(t),Vn(this.orderings,t)}}class nc extends ge{get _name(){return"replace_with"}get _optionsUtil(){return new Kt({})}constructor(t,e){super(e),this.map=t}_toProto(t){return{...super._toProto(t),args:[this.map._toProto(t),x6(nc.pr)]}}_readUserData(t){super._readUserData(t),Vn(this.map,t)}}nc.pr="full_replace";function Vn(n,t){return W6(n)?n._readUserData(t):Array.isArray(n)?n.forEach((e=>e._readUserData(t))):n instanceof Map?n.forEach((e=>e._readUserData(t))):Object.values(n).forEach((e=>e._readUserData(t))),n}// Copyright 2024 Google LLC* @license
class Jt{constructor(t,e,r){this.serializer=t,this.stages=e,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return Go(this)}getPipelineCollectionGroup(){return rc(this)}getPipelineCollectionId(){return Y9(this)}getPipelineDocuments(){return f1(this)}getPipelineFlavor(){return(function(e){let r="exact";return e.stages.forEach(((s,i)=>{s._name!==tf.name&&s._name!==Z6.name||(r="keyless"),s._name===K9.name&&r==="exact"&&(r="augmented"),s._name===J6.name&&i<e.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return vn(this)}}function vn(n){const t=n.stages[0];return t instanceof qo||t instanceof Ho||t instanceof tc||t instanceof ec?t._name:"unknown"}function Go(n){if(vn(n)==="collection")return n.stages[0].Vr}function rc(n){if(vn(n)==="collection_group")return n.stages[0].collectionId}function Y9(n){switch(vn(n)){case"collection":return ct.fromString(Go(n)).lastSegment();case"collection_group":return rc(n);default:return}}function f1(n){if(vn(n)==="documents")return n.stages[0].dr}class Os{constructor(t,e,r,s){this._db=t,this.userDataReader=e,this._userDataWriter=r,this.stages=s}wr(t,e){const r=this.userDataReader.createContext(3,t);return W6(e)?e._readUserData(r):Array.isArray(e)?e.forEach((s=>s._readUserData(r))):e.forEach((s=>s._readUserData(r))),e}where(t){const e=this.stages.map((r=>r));return this.wr("where",t),e.push(new jo(t,{})),new Os(this._db,this.userDataReader,this._userDataWriter,e)}limit(t){const e=this.stages.map((r=>r));return e.push(new ir(t,{})),new Os(this._db,this.userDataReader,this._userDataWriter,e)}sort(t,...e){const r=this.stages.map((s=>s));return"orderings"in t?r.push(new je(this.wr("sort",t.orderings),{})):r.push(new je(this.wr("sort",[t,...e]),{})),new Os(this._db,this.userDataReader,this._userDataWriter,r)}br(t){return{pipeline:{stages:this.stages.map((e=>e._toProto(t)))}}}}// Copyright 2024 Google LLC* @license
class I{constructor(t,e){this.type=t,this.value=e}static vr(){return new I("ERROR",void 0)}static Sr(){return new I("UNSET",void 0)}static Dr(){return new I("NULL",Nr)}static newValue(t){return fe(t)?new I("NULL",Nr):(function(r){return!!r&&"booleanValue"in r})(t)?new I("BOOLEAN",t):Ne(t)?new I("INT",t):Xn(t)?new I("DOUBLE",t):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(t)?new I("TIMESTAMP",t):(function(r){return!!r&&"stringValue"in r})(t)?new I("STRING",t):(function(r){return!!r&&"bytesValue"in r})(t)?new I("BYTES",t):t.referenceValue?new I("REFERENCE",t):t.geoPointValue?new I("GEO_POINT",t):Dr(t)?new I("ARRAY",t):uo(t)?new I("VECTOR",t):Zn(t)?new I("MAP",t):new I("ERROR",void 0)}Cr(){return this.type==="ERROR"||this.type==="UNSET"}Fr(){return this.type==="NULL"}}function Ds(n){if(!n.Cr())return n.value}function ef(n){return n instanceof kn?n._expr:n}function W(n){if((n=ef(n))instanceof Wr)return new Q9(n);if(n instanceof Kr)return new X9(n);if(n instanceof Ts)return new J9(n);if(n instanceof D){if(n.name==="add")return new eg(n);if(n.name==="subtract")return new ng(n);if(n.name==="multiply")return new rg(n);if(n.name==="divide")return new sg(n);if(n.name==="mod")return new ig(n);if(n.name==="and")return new og(n);if(n.name==="equal")return new yg(n);if(n.name==="not_equal")return new Eg(n);if(n.name==="less_than")return new wg(n);if(n.name==="less_than_or_equal")return new Tg(n);if(n.name==="greater_than")return new Ig(n);if(n.name==="greater_than_or_equal")return new Ag(n);if(n.name==="array_concat")return new vg(n);if(n.name==="array_reverse")return new Rg(n);if(n.name==="array_contains")return new Sg(n);if(n.name==="array_contains_all")return new Cg(n);if(n.name==="array_contains_any")return new Pg(n);if(n.name==="array_length")return new bg(n);if(n.name==="array_element")return new Ng(n);if(n.name==="equal_any")return new nf(n);if(n.name==="not_equal_any")return new cg(n);if(n.name==="is_nan")return new ug(n);if(n.name==="is_not_nan")return new lg(n);if(n.name==="is_null")return new hg(n);if(n.name==="is_not_null")return new fg(n);if(n.name==="is_error")return new dg(n);if(n.name==="exists")return new pg(n);if(n.name==="not")return new zo(n);if(n.name==="or")return new ag(n);if(n.name==="xor")return new sc(n);if(n.name==="conditional")return new gg(n);if(n.name==="maximum")return new mg(n);if(n.name==="minimum")return new _g(n);if(n.name==="reverse")return new Og(n);if(n.name==="replace_first")return new Dg(n);if(n.name==="replace_all")return new kg(n);if(n.name==="char_length")return new Vg(n);if(n.name==="byte_length")return new xg(n);if(n.name==="like")return new Lg(n);if(n.name==="regex_contains")return new Mg(n);if(n.name==="regex_match")return new Fg(n);if(n.name==="string_contains")return new Ug(n);if(n.name==="starts_with")return new Bg(n);if(n.name==="ends_with")return new $g(n);if(n.name==="to_lower")return new qg(n);if(n.name==="to_upper")return new Hg(n);if(n.name==="trim")return new jg(n);if(n.name==="string_concat")return new Gg(n);if(n.name==="map_get")return new zg(n);if(n.name==="cosine_distance")return new Wg(n);if(n.name==="dot_product")return new Kg(n);if(n.name==="euclidean_distance")return new Yg(n);if(n.name==="vector_length")return new Qg(n);if(n.name==="unix_micros_to_timestamp")return new em(n);if(n.name==="timestamp_to_unix_micros")return new sm(n);if(n.name==="unix_millis_to_timestamp")return new nm(n);if(n.name==="timestamp_to_unix_millis")return new im(n);if(n.name==="unix_seconds_to_timestamp")return new rm(n);if(n.name==="timestamp_to_unix_seconds")return new om(n);if(n.name==="timestamp_add")return new am(n);if(n.name==="timestamp_subtract")return new cm(n)}throw new Error(`Unknown Expr : ${n}`)}class Q9{constructor(t){this.expr=t}evaluate(t,e){if(this.expr.fieldName===be)return I.newValue({referenceValue:zs(t.serializer,e.key)});if(this.expr.fieldName==="__update_time__")return I.newValue({timestampValue:Ji(t.serializer,e.version)});if(this.expr.fieldName==="__create_time__")return I.newValue({timestampValue:Ji(t.serializer,e.createTime)});const r=e.data.field(this.expr._fieldPath);return r?Do(r)?I.newValue((function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:Ji(i.serializer,Y.fromTimestamp(br(o)))};if(i.serverTimestampBehavior==="previous"){const c=ui(o);if(c)return c}return{nullValue:"NULL_VALUE"}})(t,r)):I.newValue(r):I.Sr()}}class X9{constructor(t){this.expr=t}evaluate(t,e){return I.newValue(this.expr._getValue())}}class J9{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.Rr.map((s=>W(s).evaluate(t,e)));return r.some((s=>s.Cr()))?I.vr():I.newValue({arrayValue:{values:r.map((s=>s.value))}})}}function Ut(n){return Xn(n)?Number(n.doubleValue):Number(n.integerValue)}function Me(n){return BigInt(n.integerValue)}const Z9=BigInt("0x7fffffffffffffff"),tg=-BigInt("0x8000000000000000");class gi{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length>=2,24778);const r=W(this.expr.params[0]).evaluate(t,e),s=W(this.expr.params[1]).evaluate(t,e);let i=this.Or(r,s);for(const o of this.expr.params.slice(2)){const c=W(o).evaluate(t,e);i=this.Or(i,c)}return i}Or(t,e){if(t.Cr()||e.Cr())return I.vr();if(t.Fr()||e.Fr())return I.Dr();const r=t.value,s=e.value;if(!Xn(r)&&!Ne(r)||!Xn(s)&&!Ne(s))return I.vr();if(Xn(r)||Xn(s)){const i=this.Mr(r,s);return i?I.newValue(i):I.vr()}if(Ne(r)&&Ne(s)){const i=this.Nr(r,s);return i===void 0?I.vr():typeof i=="number"?I.newValue({doubleValue:i}):i<tg||i>Z9?I.vr():I.newValue({integerValue:`${i}`})}return I.vr()}}function en(n,t){return Nt(n)!==Nt(t)?"TYPE_MISMATCH":oe(n)||oe(t)?"NOT_EQ":fe(n)&&fe(t)?"EQ":fe(n)||fe(t)?"NULL":Dr(n)&&Dr(t)?(function(r,s){var o,c,u;if(((o=r.values)==null?void 0:o.length)!==((c=s.values)==null?void 0:c.length))return"NOT_EQ";let i=!1;for(let h=0;h<(((u=r.values)==null?void 0:u.length)??0);h++){const p=r.values[h],m=s.values[h];switch(en(p,m)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:G(44609,{Lr:p,Br:m})}}return i?"NULL":"EQ"})(n.arrayValue,t.arrayValue):uo(n)&&uo(t)||Zn(n)&&Zn(t)?(function(r,s){const i=r.fields||{},o=s.fields||{};if(co(i)!==co(o))return"NOT_EQ";let c=!1;for(const u in i)if(i.hasOwnProperty(u)){if(o[u]===void 0)return"NOT_EQ";switch(en(i[u],o[u])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"})(n.mapValue,t.mapValue):(function(r,s){return Ee(r,s,{Te:!1,Ee:!0,he:!0})})(n,t)?"EQ":"NOT_EQ"}class eg extends gi{Nr(t,e){return Me(t)+Me(e)}Mr(t,e){return{doubleValue:Ut(t)+Ut(e)}}}class ng extends gi{constructor(t){super(t),this.expr=t}Nr(t,e){return Me(t)-Me(e)}Mr(t,e){return{doubleValue:Ut(t)-Ut(e)}}}class rg extends gi{constructor(t){super(t),this.expr=t}Nr(t,e){return Me(t)*Me(e)}Mr(t,e){return{doubleValue:Ut(t)*Ut(e)}}}class sg extends gi{constructor(t){super(t),this.expr=t}Nr(t,e){const r=Me(e);if(r!==BigInt(0))return Me(t)/r}Mr(t,e){const r=Ut(e);return r===0?{doubleValue:Bs(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Ut(t)/r}}}class ig extends gi{constructor(t){super(t),this.expr=t}Nr(t,e){const r=Me(e);if(r!==BigInt(0))return Me(t)%r}Mr(t,e){const r=Ut(e);if(r!==0)return{doubleValue:Ut(t)%r}}}class og{constructor(t){this.expr=t}evaluate(t,e){var i;let r=!1,s=!1;for(const o of this.expr.params){const c=W(o).evaluate(t,e);switch(c.type){case"BOOLEAN":if(!((i=c.value)!=null&&i.booleanValue))return I.newValue(Mt);break;case"NULL":s=!0;break;default:r=!0}}return r?I.vr():s?I.Dr():I.newValue(se)}}class zo{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===1,9634);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BOOLEAN":return I.newValue({booleanValue:!((s=r.value)!=null&&s.booleanValue)});case"NULL":return I.Dr();default:return I.vr()}}}class ag{constructor(t){this.expr=t}evaluate(t,e){var i;let r=!1,s=!1;for(const o of this.expr.params){const c=W(o).evaluate(t,e);switch(c.type){case"BOOLEAN":if((i=c.value)!=null&&i.booleanValue)return I.newValue(se);break;case"NULL":s=!0;break;default:r=!0}}return r?I.vr():s?I.Dr():I.newValue(Mt)}}class sc{constructor(t){this.expr=t}evaluate(t,e){var i;let r=!1,s=!1;for(const o of this.expr.params){const c=W(o).evaluate(t,e);switch(c.type){case"BOOLEAN":r=sc.xor(r,!!((i=c.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return I.vr()}}return s?I.Dr():I.newValue({booleanValue:r})}static xor(t,e){return(t||e)&&!(t&&e)}}class nf{constructor(t){this.expr=t}evaluate(t,e){var o,c;H(this.expr.params.length===2,55094);let r=!1;const s=W(this.expr.params[0]).evaluate(t,e);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return I.vr()}const i=W(this.expr.params[1]).evaluate(t,e);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();for(const u of((c=(o=i.value)==null?void 0:o.arrayValue)==null?void 0:c.values)??[])switch(fe(s.value)&&fe(u)?"EQ":en(s.value,u)){case"EQ":return I.newValue(se);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:G(44608,{value:s.value,candidate:u})}return r?I.Dr():I.newValue(Mt)}}class cg{constructor(t){this.expr=t}evaluate(t,e){return new zo(new D("not",[new D("equal_any",this.expr.params)])).evaluate(t,e)}}class ug{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,23322);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"INT":return I.newValue(Mt);case"DOUBLE":return I.newValue({booleanValue:isNaN(Ut(r.value))});case"NULL":return I.Dr();default:return I.vr()}}}class lg{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===1,50406),new zo(new D("not",[new D("is_nan",this.expr.params)])).evaluate(t,e)}}class hg{constructor(t){this.expr=t}evaluate(t,e){switch(H(this.expr.params.length===1,23123),W(this.expr.params[0]).evaluate(t,e).type){case"NULL":return I.newValue(se);case"UNSET":case"ERROR":return I.vr();default:return I.newValue(Mt)}}}class fg{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===1,23167),new zo(new D("not",[new D("is_null",this.expr.params)])).evaluate(t,e)}}class dg{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===1,5228),W(this.expr.params[0]).evaluate(t,e).type==="ERROR"?I.newValue(se):I.newValue(Mt)}}class pg{constructor(t){this.expr=t}evaluate(t,e){switch(H(this.expr.params.length===1,6877),W(this.expr.params[0]).evaluate(t,e).type){case"ERROR":return I.vr();case"UNSET":return I.newValue(Mt);default:return I.newValue(se)}}}class gg{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===3,11706);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BOOLEAN":return(s=r.value)!=null&&s.booleanValue?W(this.expr.params[1]).evaluate(t,e):W(this.expr.params[2]).evaluate(t,e);case"NULL":return W(this.expr.params[2]).evaluate(t,e);default:return I.vr()}}}class mg{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((i=>W(i).evaluate(t,e)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||ie(i.value,s.value)>0?i:s}return s===void 0?I.Dr():s}}class _g{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((i=>W(i).evaluate(t,e)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||ie(i.value,s.value)<0?i:s}return s===void 0?I.Dr():s}}class Yr{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"ERROR":case"UNSET":return I.vr()}const s=W(this.expr.params[1]).evaluate(t,e);switch(s.type){case"ERROR":case"UNSET":return I.vr()}return this.Ur(r,s)}}class yg extends Yr{constructor(t){super(t),this.expr=t}Ur(t,e){if(t.Fr()&&e.Fr())return I.newValue(se);if(t.Fr()||e.Fr()||oe(t.value)||oe(e.value)||Nt(t.value)!==Nt(e.value))return I.newValue(Mt);switch(en(t.value,e.value)){case"EQ":return I.newValue(se);case"NOT_EQ":return I.newValue(Mt);case"NULL":return I.Dr();default:G(44615,{left:t,right:e})}}}class Eg extends Yr{constructor(t){super(t),this.expr=t}Ur(t,e){switch(en(t.value,e.value)){case"EQ":return I.newValue(Mt);case"NOT_EQ":case"TYPE_MISMATCH":return I.newValue(se);case"NULL":return I.Dr();default:G(44614,{left:t,right:e})}}}class wg extends Yr{constructor(t){super(t),this.expr=t}Ur(t,e){return Nt(t.value)!==Nt(e.value)||oe(t.value)||oe(e.value)?I.newValue(Mt):I.newValue({booleanValue:ie(t.value,e.value)<0})}}class Tg extends Yr{constructor(t){super(t),this.expr=t}Ur(t,e){return Nt(t.value)!==Nt(e.value)||oe(t.value)||oe(e.value)?I.newValue(Mt):en(t.value,e.value)==="EQ"?I.newValue(se):I.newValue({booleanValue:ie(t.value,e.value)<0})}}class Ig extends Yr{constructor(t){super(t),this.expr=t}Ur(t,e){return Nt(t.value)!==Nt(e.value)||oe(t.value)||oe(e.value)?I.newValue(Mt):I.newValue({booleanValue:ie(t.value,e.value)>0})}}class Ag extends Yr{constructor(t){super(t),this.expr=t}Ur(t,e){return Nt(t.value)!==Nt(e.value)||oe(t.value)||oe(e.value)?I.newValue(Mt):en(t.value,e.value)==="EQ"?I.newValue(se):I.newValue({booleanValue:ie(t.value,e.value)>0})}}class vg{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class Rg{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===1,216);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"ARRAY":{const i=((s=r.value.arrayValue)==null?void 0:s.values)??[];return I.newValue({arrayValue:{values:[...i].reverse()}})}default:return I.vr()}}}class Sg{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===2,52884),new nf(new D("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(t,e)}}class Cg{constructor(t){this.expr=t}evaluate(t,e){var u,h,p,m;H(this.expr.params.length===2,1392);let r=!1;const s=W(this.expr.params[0]).evaluate(t,e);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}const i=W(this.expr.params[1]).evaluate(t,e);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const o=((h=(u=i.value)==null?void 0:u.arrayValue)==null?void 0:h.values)??[],c=((m=(p=s.value)==null?void 0:p.arrayValue)==null?void 0:m.values)??[];for(const T of o){let P=!1;r=!1;for(const O of c){switch(fe(T)&&fe(O)?"EQ":en(T,O)){case"EQ":P=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:G(44613,{value:O,search:T})}if(P)break}if(!P)return I.newValue(Mt)}return I.newValue(se)}}class Pg{constructor(t){this.expr=t}evaluate(t,e){var u,h,p,m;H(this.expr.params.length===2,2680);let r=!1;const s=W(this.expr.params[0]).evaluate(t,e);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}const i=W(this.expr.params[1]).evaluate(t,e);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const o=((h=(u=i.value)==null?void 0:u.arrayValue)==null?void 0:h.values)??[],c=((m=(p=s.value)==null?void 0:p.arrayValue)==null?void 0:m.values)??[];for(const T of c)for(const P of o)switch(fe(T)&&fe(P)?"EQ":en(T,P)){case"EQ":return I.newValue(se);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:G(44608,{value:T,search:P})}return r?I.Dr():I.newValue(Mt)}}class bg{constructor(t){this.expr=t}evaluate(t,e){var s,i,o;H(this.expr.params.length===1,38605);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"ARRAY":return I.newValue({integerValue:`${((o=(i=(s=r.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:o.length)??0}`});default:return I.vr()}}}class Ng{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class Og{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,1508);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"BYTES":{const o=(s=r.value)==null?void 0:s.bytesValue;if(typeof o=="string"){const c=bt.fromBase64String(o).toUint8Array();return c.reverse(),I.newValue({bytesValue:bt.fromUint8Array(c).toBase64()})}return I.newValue({bytesValue:new Uint8Array(o).reverse()})}case"STRING":{const o=(i=r.value)==null?void 0:i.stringValue,c=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(o),u=Array.from(c,(h=>h.segment)).reverse();return I.newValue({stringValue:u.join("")})}default:return I.vr()}}}class Dg{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class kg{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class Vg{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,19400);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"STRING":{const s=(function(o){let c=0;for(let u=0;u<o.length;u++){const h=o.codePointAt(u);if(h===void 0)return;if(h<=65535)if(h>=55296&&h<=57343)if(h<=56319){const p=o.codePointAt(u+1);p!==void 0&&p>=56320&&p<=57343?(c+=1,u++):c+=1}else c+=1;else c+=1;else{if(!(h<=1114111))return;c+=1,u++}}return c})(r.value.stringValue);return s===void 0?I.vr():I.newValue({integerValue:s})}default:return I.vr()}}}class xg{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,8486);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BYTES":{const o=(s=r.value)==null?void 0:s.bytesValue;return typeof o=="string"?I.newValue({integerValue:bt.fromBase64String(o).toUint8Array().length}):I.newValue({integerValue:new Uint8Array(o).length})}case"STRING":{const o=(function(u){let h=0;for(let p=0;p<u.length;p++){const m=u.codePointAt(p);if(m===void 0)return;if(m>=55296&&m<=57343){if(!(m<=56319))return;{const T=u.codePointAt(p+1);if(T===void 0||!(T>=56320&&T<=57343))return;h+=4,p++}}else if(m<=127)h+=1;else if(m<=2047)h+=2;else if(m<=65535)h+=3;else{if(!(m<=1114111))return;h+=4,p++}}return h})((i=r.value)==null?void 0:i.stringValue);return o===void 0?I.vr():I.newValue({integerValue:o})}case"NULL":return I.Dr();default:return I.vr()}}}class Qr{constructor(t){this.expr=t}evaluate(t,e){var o,c;H(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=W(this.expr.params[0]).evaluate(t,e);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return I.vr()}const i=W(this.expr.params[1]).evaluate(t,e);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return I.vr()}return r?I.Dr():this.kr((o=s.value)==null?void 0:o.stringValue,(c=i.value)==null?void 0:c.stringValue)}}class Lg extends Qr{kr(t,e){try{const r=(function(o){let c="";for(let u=0;u<o.length;u++){const h=o.charAt(u);switch(h){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+h;break;default:c+=h}}return"^"+c+"$"})(e),s=Fs.compile(r);return I.newValue({booleanValue:s.matches(t)})}catch(r){return xe(`Invalid LIKE pattern converted to regex: ${e}, returning error. Error: ${r}`),I.vr()}}}class Mg extends Qr{kr(t,e){try{const r=Fs.compile(e);return I.newValue({booleanValue:r.matcher(t).find()})}catch{return xe(`Invalid regex pattern found in regex_contains: ${e}, returning error`),I.vr()}}}class Fg extends Qr{kr(t,e){try{return I.newValue({booleanValue:Fs.compile(e).matches(t)})}catch{return xe(`Invalid regex pattern found in regex_match: ${e}, returning error`),I.vr()}}}class Ug extends Qr{kr(t,e){return I.newValue({booleanValue:t.includes(e)})}}class Bg extends Qr{kr(t,e){return I.newValue({booleanValue:t.startsWith(e)})}}class $g extends Qr{kr(t,e){return I.newValue({booleanValue:t.endsWith(e)})}}class qg{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,29079);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return I.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return I.Dr();default:return I.vr()}}}class Hg{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,60487);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return I.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return I.Dr();default:return I.vr()}}}class jg{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,28544);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return I.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return I.Dr();default:return I.vr()}}}class Gg{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((o=>W(o).evaluate(t,e)));let s="",i=!1;for(const o of r)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return I.vr()}return i?I.Dr():I.newValue({stringValue:s})}}class zg{constructor(t){this.expr=t}evaluate(t,e){var o,c,u,h;H(this.expr.params.length===2,4483);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"UNSET":return I.Sr();case"MAP":break;default:return I.vr()}const s=W(this.expr.params[1]).evaluate(t,e);if(s.type!=="STRING")return I.vr();const i=(h=(c=(o=r.value)==null?void 0:o.mapValue)==null?void 0:c.fields)==null?void 0:h[(u=s.value)==null?void 0:u.stringValue];return i===void 0?I.Sr():I.newValue(i)}}class ic{constructor(t){this.expr=t}evaluate(t,e){var h,p;H(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=W(this.expr.params[0]).evaluate(t,e);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return I.vr()}const i=W(this.expr.params[1]).evaluate(t,e);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const o=i1(s.value),c=i1(i.value);if(o===void 0||c===void 0||((h=o.values)==null?void 0:h.length)!==((p=c.values)==null?void 0:p.length))return I.vr();const u=this.qr(o,c);return u===void 0||isNaN(u)?I.vr():I.newValue({doubleValue:u})}}class Wg extends ic{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return;let i=0,o=0,c=0;for(let h=0;h<r.length;h++){if(!On(r[h])||!On(s[h]))return;const p=Ut(r[h]),m=Ut(s[h]);i+=p*m,o+=p*p,c+=m*m}const u=Math.sqrt(o)*Math.sqrt(c);if(u!==0)return 1-Math.max(-1,Math.min(1,i/u))}}class Kg extends ic{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!On(r[o])||!On(s[o]))return;i+=Ut(r[o])*Ut(s[o])}return i}}class Yg extends ic{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!On(r[o])||!On(s[o]))return;const c=Ut(r[o]),u=Ut(s[o]);i+=Math.pow(c-u,2)}return Math.sqrt(i)}}class Qg{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===1,39044);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"VECTOR":{const i=i1(r.value);return I.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return I.Dr();default:return I.vr()}}}const Ys=BigInt(-62135596800),Qs=BigInt(253402300799),yo=BigInt(1e3),Rn=BigInt(1e6),Xg=Ys*yo,Jg=Qs*yo+BigInt(999),Zg=Ys*Rn,tm=Qs*Rn+BigInt(999999);function oc(n){return n>=Zg&&n<=tm}function rf(n){return n>=Ys&&n<=Qs}function Xs(n,t){const e=BigInt(n);return!(e<Ys||e>Qs)&&!(t<0||t>=1e9)&&(e!==Ys||t===0)&&!(e===Qs&&t>999999999)}function sf(n,t){return t<0?{seconds:n-1,nanos:t+1e9}:{seconds:n,nanos:t}}function ac(n){return BigInt(n.seconds)*Rn+BigInt(Math.trunc(n.nanoseconds/1e3))}class cc{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return I.Dr();default:return I.vr()}}}class em extends cc{toTimestamp(t){if(!oc(t))return I.vr();let e=Number(t/Rn),r=Number(t%Rn*BigInt(1e3));const s=sf(e,r);return e=s.seconds,r=s.nanos,Xs(e,r)?I.newValue({timestampValue:{seconds:e,nanos:r}}):I.vr()}}class nm extends cc{toTimestamp(t){if(!(function(o){return o>=Xg&&o<=Jg})(t))return I.vr();let e=Number(t/yo),r=Number(t%yo*BigInt(1e6));const s=sf(e,r);return e=s.seconds,r=s.nanos,Xs(e,r)?I.newValue({timestampValue:{seconds:e,nanos:r}}):I.vr()}}class rm extends cc{toTimestamp(t){if(!rf(t))return I.vr();const e=Number(t);return I.newValue({timestampValue:{seconds:e,nanos:0}})}}class uc{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=W(this.expr.params[0]).evaluate(t,e);switch(r.type){case"TIMESTAMP":break;case"NULL":return I.Dr();default:return I.vr()}const s=q1(r.value.timestampValue);return Xs(s.seconds,s.nanoseconds)?this.$r(s):I.vr()}}class sm extends uc{$r(t){const e=ac(t);return oc(e)?I.newValue({integerValue:`${e.toString()}`}):I.vr()}}class im extends uc{$r(t){const e=ac(t),r=e/BigInt(1e3),s=e%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?I.newValue({integerValue:r.toString()}):I.newValue({integerValue:(r-BigInt(1)).toString()})}}class om extends uc{$r(t){const e=BigInt(t.seconds);return rf(e)?I.newValue({integerValue:e.toString()}):I.vr()}}class of{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=W(this.expr.params[0]).evaluate(t,e);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return I.vr()}const i=W(this.expr.params[1]).evaluate(t,e);let o;switch(i.type){case"STRING":if(o=(function(ut){switch(ut){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),o===void 0)return I.vr();break;case"NULL":r=!0;break;default:return I.vr()}const c=W(this.expr.params[2]).evaluate(t,e);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const u=BigInt(c.value.integerValue);let h;try{switch(o){case"microsecond":h=u;break;case"millisecond":h=u*BigInt(1e3);break;case"second":h=u*BigInt(1e6);break;case"minute":h=u*BigInt(6e7);break;case"hour":h=u*BigInt(36e8);break;case"day":h=u*BigInt(864e8);break;default:return I.vr()}if(o!=="microsecond"&&u!==BigInt(0)&&h/u!==BigInt(this.Kr(o)))return I.vr()}catch(Z){return xe(`Error during timestamp arithmetic: ${Z}`),I.vr()}const p=q1(s.value.timestampValue);if(!Xs(p.seconds,p.nanoseconds))return I.vr();const m=ac(p),T=this.Wr(m,h);if(!oc(T))return I.vr();const P=Number(T/Rn),O=T%Rn,M=Number((O<0?O+Rn:O)*BigInt(1e3)),$=O<0?P-1:P;return Xs($,M)?I.newValue({timestampValue:{seconds:$,nanos:M}}):I.vr()}Kr(t){switch(t){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class am extends of{Wr(t,e){return t+e}}class cm extends of{Wr(t,e){return t-e}}function Js(n){if((n=ef(n))instanceof Wr)return`fld(${n.fieldName})`;if(n instanceof Kr)return`cst(${(function(e){return e===null?"null":typeof e=="number"?e.toString():typeof e=="string"?`"${e}"`:e instanceof yt?`ref(${e.path})`:e instanceof re?`vec(${JSON.stringify(e)})`:JSON.stringify(e)})(n.value)})`;if(n instanceof D)return`fn(${n.name},[${n.params.map(Js).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.Rr.map(Js).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function um(n){if(n instanceof J6)return`${n._name}(${qi(n.fields)})`;if(n instanceof Z6){let t=`${n._name}(${qi(n.accumulators)})`;return n.groups.size>0&&(t+=`grouping(${qi(n.groups)})`),t}if(n instanceof tf)return`${n._name}(${qi(n.groups)})`;if(n instanceof qo)return`${n._name}(${n.Vr})`;if(n instanceof Ho)return`${n._name}(${n.collectionId})`;if(n instanceof tc)return`${n._name}()`;if(n instanceof ec)return`${n._name}(${n.dr.sort()})`;if(n instanceof jo)return`${n._name}(${Js(n.condition)})`;if(n instanceof ir)return`${n._name}(${n.limit})`;if(n instanceof je)return`${n._name}(${(function(e){return e.map((r=>`${Js(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function qi(n){return`${Array.from(n.entries()).sort().map((([t,e])=>`${t}=${Js(e)}`)).join(",")}`}function Ye(n){return n.stages.map((t=>um(t))).join("|")}function af(n,t){return Ye(n)===Ye(t)}function kt(n){return n instanceof Jt}function ph(n){return kt(n)?Ye(n):Ps(n)}function cf(n){return kt(n)?Ye(n):(function(e){return`${g6(De(e))}|lt:${e.limitType}`})(n)}function Wo(n,t){return n instanceof Jt&&t instanceof Jt?af(n,t):!(n instanceof Jt&&!(t instanceof Jt)||!(n instanceof Jt)&&t instanceof Jt)&&B3(n,t)}function uf(n){return Yn(n)?Ye(n):g6(n)}function lf(n,t){return n instanceof Jt&&t instanceof Jt?af(n,t):!(n instanceof Jt&&!(t instanceof Jt)||!(n instanceof Jt)&&t instanceof Jt)&&m6(n,t)}function lm(n,t){const e=(function(s){let i=!1;const o=[];for(const c of s)if(c instanceof je)if(i=!0,c.orderings.some((u=>u.expr instanceof Wr&&u.expr.fieldName===be)))o.push(c);else{const u=c.orderings.map((h=>h));u.push(Zi(be).ascending()),o.push(new je(u,{}))}else c instanceof ir&&(i||(o.push(new je([Zi(be).ascending()],{})),i=!0)),o.push(c);return i||o.push(new je([Zi(be).ascending()],{})),o})(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");e.forEach((s=>s._readUserData(r)))}return new Jt(n.userDataReader.serializer,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&v3(i,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Ss(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Ss(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=A6();return this.mutations.forEach((s=>{const i=t.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=e.has(s.key)?null:c;const u=o6(o,c);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(Y.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),rt())}isEqual(t){return this.batchId===t.batchId&&Pr(this.mutations,t.mutations,((e,r)=>zl(e,r)))&&Pr(this.baseMutations,t.baseMutations,((e,r)=>zl(e,r)))}}class lc{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){H(t.mutations.length===r.length,58842,{Qr:t.mutations.length,Gr:r.length});let s=(function(){return j3})();const i=t.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new lc(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(t,e,r,s,i=Y.min(),o=Y.min(),c=bt.EMPTY_BYTE_STRING,u=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(t){return new Ge(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Ge(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Ge(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Ge(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(t){this.zr=t}}function pm(n){const t=a9({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?go(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(){this.Hi=new mm}addToCollectionParentIndex(t,e){return this.Hi.add(e),x.resolve()}getCollectionParents(t,e){return x.resolve(this.Hi.getEntries(e))}addFieldIndex(t,e){return x.resolve()}deleteFieldIndex(t,e){return x.resolve()}deleteAllFieldIndexes(t){return x.resolve()}createTargetIndexes(t,e){return x.resolve()}getDocumentsMatchingTarget(t,e){return x.resolve(null)}getIndexType(t,e){return x.resolve(0)}getFieldIndexes(t,e){return x.resolve([])}getNextCollectionGroupToUpdate(t){return x.resolve(null)}getMinOffset(t,e){return x.resolve(Pn.min())}getMinOffsetFromCollectionGroup(t,e){return x.resolve(Pn.min())}updateCollectionGroup(t,e,r){return x.resolve()}updateIndexEntries(t,e){return x.resolve()}}class mm{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new Pt(ct.comparator),i=!s.has(r);return this.index[e]=s.add(r),i}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new Pt(ct.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(t){this.Ds=t}next(){return this.Ds+=2,this.Ds}static xs(){return new xn(0)}static Cs(){return new xn(-1)}}// Copyright 2024 Google LLC* @license
function hf(n,t){var r;let e=t;for(const s of n.stages)e=ym({serializer:n.serializer,serverTimestampBehavior:(r=n.listenOptions)==null?void 0:r.serverTimestampBehavior},s,e);return e}function Ko(n,t){return hf(n,[t]).length>0}function _m(n,t){return kt(n)?Ko(n,t):Fo(n,t)}function ym(n,t,e){if(t instanceof qo)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===i.Vr))})(0,t,e);if(t instanceof jo)return(function(s,i,o){return o.filter((c=>{const u=Ds(W(i.condition).evaluate(s,c));return u!==void 0&&Ee(u,se)}))})(n,t,e);if(t instanceof Ho)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===i.collectionId))})(0,t,e);if(t instanceof tc)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()))})(0,0,e);if(t instanceof ec)return(function(s,i,o){return o.filter((c=>c.isFoundDocument()&&i.mr.has(c.key.path.toStringWithLeadingSlash())))})(0,t,e);if(t instanceof ir)return(function(s,i,o){return o.slice(0,i.limit)})(0,t,e);if(t instanceof je)return(function(s,i,o){const c=i.orderings.map((u=>({ks:W(u.expr),direction:u.direction})));return[...o].sort(((u,h)=>{for(const{ks:p,direction:m}of c){const T=Ds(p.evaluate(s,u)),P=Ds(p.evaluate(s,h)),O=ie(T??Nr,P??Nr);if(O!==0)return m==="ascending"?O:-O}return 0}))})(n,t,e);throw new Error(`Unknown stage: ${t._name}`)}function d1(n){const t=(function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof je)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(e,r)=>{for(const s of t){const i=Ds(W(s.expr).evaluate({serializer:n.serializer},e)),o=Ds(W(s.expr).evaluate({serializer:n.serializer},r)),c=ie(i||Nr,o||Nr);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function Ua(n){for(let t=n.stages.length-1;t>=0;t--){const e=n.stages[t];if(e instanceof ir)return{limit:e.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{constructor(){this.changes=new lr((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Lt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?x.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&Ss(r.mutation,s,he.empty(),pt.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,rt()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=rt()){const s=En();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((i=>{let o=yr();return i.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(t,e){const r=En();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,rt())))}populateOverlays(t,e,r){const s=[];return r.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((o,c)=>{e.set(o,c)}))}))}computeViews(t,e,r,s){let i=ne();const o=bs(),c=(function(){return bs()})();return e.forEach(((u,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof $n)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),Ss(p.mutation,h,p.mutation.getFieldMask(),pt.now())):o.set(h.key,he.empty())})),this.recalculateAndSaveOverlays(t,i).next((u=>(u.forEach(((h,p)=>o.set(h,p))),e.forEach(((h,p)=>c.set(h,new wm(p,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(t,e){const r=bs();let s=new gt(((o,c)=>o-c)),i=rt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((o=>{for(const c of o)c.keys().forEach((u=>{const h=e.get(u);if(h===null)return;let p=r.get(u)||he.empty();p=c.applyToLocalView(h,p),r.set(u,p);const m=(s.get(c.batchId)||rt()).add(u);s=s.insert(c.batchId,m)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,p=u.value,m=A6();p.forEach((T=>{if(!i.has(T)){const P=o6(e.get(T),r.get(T));P!==null&&m.set(T,P),i=i.add(T)}})),o.push(this.documentOverlayCache.saveOverlays(t,h,m))}return x.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return kt(e)?this.getDocumentsMatchingPipeline(t,e,r,s):M3(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):y6(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-i.size):x.resolve(En());let c=Us,u=i;return o.next((h=>x.forEach(h,((p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(p)?x.resolve():this.remoteDocumentCache.getEntry(t,p).next((T=>{u=u.insert(p,T)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,u,h,rt()))).next((p=>({batchId:c,changes:I6(p)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new z(e)).next((r=>{let s=yr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const i=e.collectionGroup;let o=yr();return this.indexManager.getCollectionParents(t,i).next((c=>x.forEach(c,(u=>{const h=(function(m,T){return new jr(T,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(e,u.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,r,s).next((p=>{p.forEach(((m,T)=>{o=o.insert(m,T)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s)))).next((o=>this.retrieveMatchingLocalDocuments(i,o,(c=>Fo(e,c)))))}getDocumentsMatchingPipeline(t,e,r,s){if(vn(e)==="collection_group"){const i=rc(e);let o=yr();return this.indexManager.getCollectionParents(t,i).next((c=>x.forEach(c,(u=>{const h=(function(m,T){const P=m.stages.map((O=>O instanceof Ho?new qo(T.canonicalString(),{}):O));return new Jt(m.serializer,P)})(e,u.child(i));return this.getDocumentsMatchingPipeline(t,h,r,s).next((p=>{p.forEach(((m,T)=>{o=o.insert(m,T)}))}))})).next((()=>o))))}{let i;return this.getOverlaysForPipeline(t,e,r.largestBatchId).next((o=>{switch(i=o,vn(e)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s);case"documents":let c=rt();for(const u of f1(e))c=c.add(z.fromPath(u));return this.remoteDocumentCache.getEntries(t,c);case"database":return this.remoteDocumentCache.getAllEntries(t);default:throw new F("invalid-argument",`Invalid pipeline source to execute offline: ${Ye(e)}`)}})).next((o=>this.retrieveMatchingLocalDocuments(i,o,(c=>Ko(e,c)))))}}retrieveMatchingLocalDocuments(t,e,r){t.forEach(((i,o)=>{const c=o.getKey();e.get(c)===null&&(e=e.insert(c,Lt.newInvalidDocument(c)))}));let s=yr();return e.forEach(((i,o)=>{const c=t.get(i);c!==void 0&&Ss(c.mutation,o,he.empty(),pt.now()),r(o)&&(s=s.insert(i,o))})),s}getOverlaysForPipeline(t,e,r){switch(vn(e)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(t,ct.fromString(Go(e)),r);case"collection_group":throw new F("invalid-argument",`Unexpected collection group pipeline: ${Ye(e)}`);case"documents":return this.documentOverlayCache.getOverlays(t,f1(e).map((s=>z.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(t,r);default:throw new F("invalid-argument",`Failed to get overlays for pipeline: ${Ye(e)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Im{constructor(t){this.serializer=t,this.Hs=new Map,this.Js=new Map}getBundleMetadata(t,e){return x.resolve(this.Hs.get(e))}saveBundleMetadata(t,e){return this.Hs.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:pe(s.createTime)}})(e)),x.resolve()}getNamedQuery(t,e){return x.resolve(this.Js.get(e))}saveNamedQuery(t,e){return this.Js.set(e.name,(function(s){return{name:s.name,query:pm(s.bundledQuery),readTime:pe(s.readTime)}})(e)),x.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(){this.overlays=new gt(z.comparator),this.Ys=new Map}getOverlay(t,e){return x.resolve(this.overlays.get(e))}getOverlays(t,e){const r=En();return x.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(t,e){const r=En();return this.overlays.forEach(((s,i)=>{i.largestBatchId>e&&r.set(s,i)})),x.resolve(r)}saveOverlays(t,e,r){return r.forEach(((s,i)=>{this.Hr(t,e,i)})),x.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Ys.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ys.delete(r)),x.resolve()}getOverlaysForCollection(t,e,r){const s=En(),i=e.length+1,o=new z(e.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return x.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let i=new gt(((h,p)=>h-p));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=En(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const c=En(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,p)=>c.set(h,p))),!(c.size()>=s)););return x.resolve(c)}Hr(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ys.get(s.largestBatchId).delete(r.key);this.Ys.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new fm(e,r));let i=this.Ys.get(e);i===void 0&&(i=rt(),this.Ys.set(e,i)),this.Ys.set(e,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(){this.sessionToken=bt.EMPTY_BYTE_STRING}getSessionToken(t){return x.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,x.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(){this.Zs=new Pt(xt.Xs),this.e_=new Pt(xt.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(t,e){const r=new xt(t,e);this.Zs=this.Zs.add(r),this.e_=this.e_.add(r)}n_(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.r_(new xt(t,e))}i_(t,e){t.forEach((r=>this.removeReference(r,e)))}s_(t){const e=new z(new ct([])),r=new xt(e,t),s=new xt(e,t+1),i=[];return this.e_.forEachInRange([r,s],(o=>{this.r_(o),i.push(o.key)})),i}__(){this.Zs.forEach((t=>this.r_(t)))}r_(t){this.Zs=this.Zs.delete(t),this.e_=this.e_.delete(t)}o_(t){const e=new z(new ct([])),r=new xt(e,t),s=new xt(e,t+1);let i=rt();return this.e_.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(t){const e=new xt(t,0),r=this.Zs.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class xt{constructor(t,e){this.key=t,this.a_=e}static Xs(t,e){return z.comparator(t.key,e.key)||st(t.a_,e.a_)}static t_(t,e){return st(t.a_,e.a_)||z.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.gs=1,this.u_=new Pt(xt.Xs)}checkEmpty(t){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const i=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new hm(i,e,r,s);this.mutationQueue.push(o);for(const c of s)this.u_=this.u_.add(new xt(c.key,i)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return x.resolve(o)}lookupMutationBatch(t,e){return x.resolve(this.c_(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.l_(r),i=s<0?0:s;return x.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?L1:this.gs-1)}getAllMutationBatches(t){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new xt(e,0),s=new xt(e,Number.POSITIVE_INFINITY),i=[];return this.u_.forEachInRange([r,s],(o=>{const c=this.c_(o.a_);i.push(c)})),x.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new Pt(st);return e.forEach((s=>{const i=new xt(s,0),o=new xt(s,Number.POSITIVE_INFINITY);this.u_.forEachInRange([i,o],(c=>{r=r.add(c.a_)}))})),x.resolve(this.E_(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let i=r;z.isDocumentKey(i)||(i=i.child(""));const o=new xt(new z(i),0);let c=new Pt(st);return this.u_.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.a_)),!0)}),o),x.resolve(this.E_(c))}E_(t){const e=[];return t.forEach((r=>{const s=this.c_(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){H(this.h_(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.u_;return x.forEach(e.mutations,(s=>{const i=new xt(s.key,e.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.u_=r}))}bs(t){}containsKey(t,e){const r=new xt(e,0),s=this.u_.firstAfterOrEqual(r);return x.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,x.resolve()}h_(t,e){return this.l_(t)}l_(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}c_(t){const e=this.l_(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(t){this.T_=t,this.docs=(function(){return new gt(z.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.T_(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return x.resolve(r?r.document.mutableCopy():Lt.newInvalidDocument(e))}getEntries(t,e){let r=ne();return e.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Lt.newInvalidDocument(s))})),x.resolve(r)}getAllEntries(t){let e=ne();return this.docs.forEach(((r,s)=>{e=e.insert(r,s.document)})),x.resolve(e)}getDocumentsMatchingQuery(t,e,r,s){let i,o;kt(e)?(i=ct.fromString(Go(e)),o=p=>Ko(e,p)):(i=e.path,o=p=>Fo(e,p));let c=ne();const u=new z(i.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:p,value:{document:m}}=h.getNext();if(!i.isPrefixOf(p.path))break;p.path.length>i.length+1||o3(i3(m),r)<=0||(s.has(m.key)||o(m))&&(c=c.insert(m.key,m.mutableCopy()))}return x.resolve(c)}getAllFromCollectionGroup(t,e,r,s){G(9500)}P_(t,e){return x.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new Cm(this)}getSize(t){return x.resolve(this.size)}}class Cm extends Em{constructor(t){super(),this.zs=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.zs.addEntry(t,s)):this.zs.removeEntry(r)})),x.waitFor(e)}getFromCache(t,e){return this.zs.getEntry(t,e)}getAllFromCache(t,e){return this.zs.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(t){this.persistence=t,this.R_=new lr((e=>uf(e)),lf),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.I_=0,this.A_=new hc,this.targetCount=0,this.V_=xn.xs()}forEachTarget(t,e){return this.R_.forEach(((r,s)=>e(s))),x.resolve()}getLastRemoteSnapshotVersion(t){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return x.resolve(this.I_)}allocateTargetId(t){return this.highestTargetId=this.V_.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.I_&&(this.I_=e),x.resolve()}Ms(t){this.R_.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.V_=new xn(e),this.highestTargetId=e),t.sequenceNumber>this.I_&&(this.I_=t.sequenceNumber)}addTargetData(t,e){return this.Ms(e),this.targetCount+=1,x.resolve()}updateTargetData(t,e){return this.Ms(e),x.resolve()}removeTargetData(t,e){return this.R_.delete(e.target),this.A_.s_(e.targetId),this.targetCount-=1,x.resolve()}removeTargets(t,e,r){let s=0;const i=[];return this.R_.forEach(((o,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.R_.delete(o),i.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)})),x.waitFor(i).next((()=>s))}getTargetCount(t){return x.resolve(this.targetCount)}getTargetData(t,e){const r=this.R_.get(e)||null;return x.resolve(r)}addMatchingKeys(t,e,r){return this.A_.n_(e,r),x.resolve()}removeMatchingKeys(t,e,r){this.A_.i_(e,r);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((o=>{i.push(s.markPotentiallyOrphaned(t,o))})),x.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.A_.s_(e),x.resolve()}getMatchingKeysForTargetId(t,e){const r=this.A_.o_(e);return x.resolve(r)}containsKey(t,e){return x.resolve(this.A_.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(t,e){this.d_={},this.overlays={},this.f_=new Oo(0),this.m_=!1,this.m_=!0,this.p_=new vm,this.referenceDelegate=t(this),this.g_=new Pm(this),this.indexManager=new gm,this.remoteDocumentCache=(function(s){return new Sm(s)})((r=>this.referenceDelegate.y_(r))),this.serializer=new dm(e),this.w_=new Im(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Am,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.d_[t.toKey()];return r||(r=new Rm(e,this.referenceDelegate),this.d_[t.toKey()]=r),r}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(t,e,r){B("MemoryPersistence","Starting transaction:",t);const s=new bm(this.f_.next());return this.referenceDelegate.b_(),r(s).next((i=>this.referenceDelegate.v_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}S_(t,e){return x.or(Object.values(this.d_).map((r=>()=>r.containsKey(t,e))))}}class bm extends c3{constructor(t){super(),this.currentSequenceNumber=t}}class fc{constructor(t){this.persistence=t,this.D_=new hc,this.x_=null}static C_(t){return new fc(t)}get F_(){if(this.x_)return this.x_;throw G(60996)}addReference(t,e,r){return this.D_.addReference(r,e),this.F_.delete(r.toString()),x.resolve()}removeReference(t,e,r){return this.D_.removeReference(r,e),this.F_.add(r.toString()),x.resolve()}markPotentiallyOrphaned(t,e){return this.F_.add(e.toString()),x.resolve()}removeTarget(t,e){this.D_.s_(e.targetId).forEach((s=>this.F_.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.F_.add(i.toString())))})).next((()=>r.removeTargetData(t,e)))}b_(){this.x_=new Set}v_(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.F_,(r=>{const s=z.fromPath(r);return this.O_(t,s).next((i=>{i||e.removeEntry(s,Y.min())}))})).next((()=>(this.x_=null,e.apply(t))))}updateLimboDocument(t,e){return this.O_(t,e).next((r=>{r?this.F_.delete(e.toString()):this.F_.add(e.toString())}))}y_(t){return 0}O_(t,e){return x.or([()=>x.resolve(this.D_.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.S_(t,e)])}}class Eo{constructor(t,e){this.persistence=t,this.M_=new lr((r=>f3(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=N9(this,e)}static C_(t,e){return new Eo(t,e)}b_(){}v_(t){return x.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}lr(t){const e=this.Ls(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}Ls(t){let e=0;return this.Er(t,(r=>{e++})).next((()=>e))}Er(t,e){return x.forEach(this.M_,((r,s)=>this.Us(t,r,s).next((i=>i?x.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.P_(t,(o=>this.Us(t,o,e).next((c=>{c||(r++,i.removeEntry(o,Y.min()))})))).next((()=>i.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.M_.set(e,t.currentSequenceNumber),x.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.M_.set(r,t.currentSequenceNumber),x.resolve()}removeReference(t,e,r){return this.M_.set(r,t.currentSequenceNumber),x.resolve()}updateLimboDocument(t,e){return this.M_.set(e,t.currentSequenceNumber),x.resolve()}y_(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Yi(t.data.value)),e}Us(t,e,r){return x.or([()=>this.persistence.S_(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.M_.get(e);return x.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.wo=r,this.bo=s}static vo(t,e){let r=rt(),s=rt();for(const i of e.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new dc(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nm(n,t){return z.comparator(n.key,t.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=(function(){return i0()?8:u3(Wt())>0?6:4})()}initialize(t,e){this.Fo=t,this.indexManager=e,this.So=!0}getDocumentsMatchingQuery(t,e,r,s){const i={result:null};return this.Oo(t,e).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.Mo(t,e,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new Om;return this.No(t,e,o).next((c=>{if(i.result=c,this.Do)return this.Lo(t,e,o,c.size)}))})).next((()=>i.result))}Lo(t,e,r,s){return kt(e)?x.resolve():r.documentReadCount<this.xo?(_r()<=it.DEBUG&&B("QueryEngine","SDK will not create cache indexes for query:",Ps(e),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),x.resolve()):(_r()<=it.DEBUG&&B("QueryEngine","Query:",Ps(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Co*s?(_r()<=it.DEBUG&&B("QueryEngine","The SDK decides to create cache indexes for query:",Ps(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,De(e))):x.resolve())}Oo(t,e){if(kt(e))return x.resolve(null);let r=e;if(Jl(r))return x.resolve(null);let s=De(r);return this.indexManager.getIndexType(t,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=go(r,null,"F"),s=De(r)),this.indexManager.getDocumentsMatchingTarget(t,s).next((o=>{const c=rt(...o);return this.Fo.getDocuments(t,c).next((u=>this.indexManager.getMinOffset(t,s).next((h=>{const p=this.Bo(r,u);return this.Uo(r,p,c,h.readTime)?this.Oo(t,go(r,null,"F")):this.ko(t,p,r,h)}))))})))))}Mo(t,e,r,s){return(kt(e)?(function(o){for(const c of o.stages){if(c instanceof ir||c instanceof dh)return!1;if(c instanceof jo){if(c.condition instanceof Y6&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof Wr&&c.condition._expr.params[0].fieldName===be)continue;return!1}}return!0})(e):Jl(e))||s.isEqual(Y.min())?x.resolve(null):this.Fo.getDocuments(t,r).next((i=>{const o=this.Bo(e,i);return this.Uo(e,o,r,s)?x.resolve(null):(_r()<=it.DEBUG&&B("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ph(e)),this.ko(t,o,e,s3(s,Us)).next((c=>c)))}))}Bo(t,e){let r,s;return kt(t)?(r=new Pt(Nm),s=i=>Ko(t,i)):(r=new Pt(B1(t)),s=i=>Fo(t,i)),e.forEach(((i,o)=>{s(o)&&(r=r.add(o))})),r}Uo(t,e,r,s){if(kt(t))return(function(c){return c.stages.some((u=>u instanceof ir||u instanceof dh))})(t);if(t.limit===null)return!1;if(r.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}No(t,e,r){return _r()<=it.DEBUG&&B("QueryEngine","Using full collection scan to execute query:",ph(e)),this.Fo.getDocumentsMatchingQuery(t,e,Pn.min(),r)}ko(t,e,r,s){return this.Fo.getDocumentsMatchingQuery(t,r,s).next((i=>(e.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pc="LocalStore",km=3e8;class Vm{constructor(t,e,r,s){this.persistence=t,this.qo=e,this.serializer=s,this.$o=new gt(st),this.Ko=new lr((i=>uf(i)),lf),this.Wo=new Map,this.Qo=t.getRemoteDocumentCache(),this.g_=t.getTargetCache(),this.w_=t.getBundleCache(),this.Go(r)}Go(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Tm(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.$o)))}}function xm(n,t,e,r){return new Vm(n,t,e,r)}async function df(n,t){const e=J(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,e.Go(t),e.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let u=rt();for(const h of s){o.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}for(const h of i){c.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}return e.localDocuments.getDocuments(r,u).next((h=>({zo:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function Lm(n,t){const e=J(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=e.Qo.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,p){const m=h.batch,T=m.keys();let P=x.resolve();return T.forEach((O=>{P=P.next((()=>p.getEntry(u,O))).next((M=>{const $=h.docVersions.get(O);H($!==null,48541),M.version.compareTo($)<0&&(m.applyToRemoteDocument(M,h),M.isValidDocument()&&(M.setReadTime(h.commitVersion),p.addEntry(M)))}))})),P.next((()=>c.mutationQueue.removeMutationBatch(u,m)))})(e,r,t,i).next((()=>i.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=rt();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function pf(n){const t=J(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.g_.getLastRemoteSnapshotVersion(e)))}function Mm(n,t){const e=J(n),r=t.snapshotVersion;let s=e.$o;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=e.Qo.newChangeBuffer({trackRemovals:!0});s=e.$o;const c=[];t.targetChanges.forEach(((p,m)=>{const T=s.get(m);if(!T)return;c.push(e.g_.removeMatchingKeys(i,p.removedDocuments,m).next((()=>e.g_.addMatchingKeys(i,p.addedDocuments,m))));let P=T.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(m)!==null?P=P.withResumeToken(bt.EMPTY_BYTE_STRING,Y.min()).withLastLimboFreeSnapshotVersion(Y.min()):p.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(p.resumeToken,r)),s=s.insert(m,P),(function(M,$,Z){return M.resumeToken.approximateByteSize()===0||$.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=km?!0:Z.addedDocuments.size+Z.modifiedDocuments.size+Z.removedDocuments.size>0})(T,P,p)&&c.push(e.g_.updateTargetData(i,P))}));let u=ne(),h=rt();if(t.documentUpdates.forEach((p=>{t.resolvedLimboDocuments.has(p)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(i,p))})),c.push(Fm(i,o,t.documentUpdates).next((p=>{u=p.jo,h=p.Ho}))),!r.isEqual(Y.min())){const p=e.g_.getLastRemoteSnapshotVersion(i).next((m=>e.g_.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(p)}return x.waitFor(c).next((()=>o.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(e.$o=s,i)))}function Fm(n,t,e){let r=rt(),s=rt();return e.forEach((i=>r=r.add(i))),t.getEntries(n,r).next((i=>{let o=ne();return e.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(Y.min())?(t.removeEntry(c,u.readTime),o=o.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(u),o=o.insert(c,u)):B(pc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{jo:o,Ho:s}}))}function Um(n,t){const e=J(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=L1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function Bm(n,t){const e=J(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.g_.getTargetData(r,t).next((i=>i?(s=i,x.resolve(s)):e.g_.allocateTargetId(r).next((o=>(s=new Ge(t,o,"TargetPurposeListen",r.currentSequenceNumber),e.g_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.$o.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.$o=e.$o.insert(r.targetId,r),e.Ko.set(t,r.targetId)),r}))}async function p1(n,t,e){const r=J(n),s=r.$o.get(t),i=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Hr(o))throw o;B(pc,`Failed to update sequence numbers for target ${t}: ${o}`)}r.$o=r.$o.remove(t),r.Ko.delete(s.target)}function gh(n,t,e){const r=J(n);let s=Y.min(),i=rt();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,h,p){const m=J(u),T=m.Ko.get(p);return T!==void 0?x.resolve(m.$o.get(T)):m.g_.getTargetData(h,p)})(r,o,kt(t)?t:De(t)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(o,c.targetId).next((u=>{i=u}))})).next((()=>r.qo.getDocumentsMatchingQuery(o,t,e?s:Y.min(),e?i:rt()))).next((c=>($m(r,c),{documents:c,Jo:i})))))}function $m(n,t){t.forEach(((e,r)=>{const s=r.key.getCollectionGroup(),i=n.Wo.get(s)||Y.min();r.readTime.compareTo(i)>0&&n.Wo.set(s,r.readTime)}))}class mh{constructor(){this.activeTargetIds=W3()}na(t){this.activeTargetIds=this.activeTargetIds.add(t)}ra(t){this.activeTargetIds=this.activeTargetIds.delete(t)}ta(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class qm{constructor(){this.Ua=new mh,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Ua.na(t),this.ka[t]||"not-current"}updateQueryState(t,e,r){this.ka[t]=e}removeLocalQueryTarget(t){this.Ua.ra(t)}isLocalQueryTarget(t){return this.Ua.activeTargetIds.has(t)}clearQueryState(t){delete this.ka[t]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(t){return this.Ua.activeTargetIds.has(t)}start(){return this.Ua=new mh,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}function Ba(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){this.qa===0&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve()))))}za(t){this.state==="Online"?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Qa("Offline")))}set(t){this.ja(),this.qa=0,t==="Online"&&(this.Ka=!1),this.Qa(t)}Qa(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Ga(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(tn(e),this.Ka=!1):B("OnlineStateTracker",e)}ja(){this.$a!==null&&(this.$a.cancel(),this.$a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe="RemoteStore";class jm{constructor(t,e,r,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new xn(1e3),this.eu=new xn(1001),this.tu=new Set,this.nu=[],this.ru=i,this.ru.bt((o=>{r.enqueueAndForget((async()=>{dr(this)&&(B(Fe,"Restarting streams for network reachability change."),await(async function(u){const h=J(u);h.tu.add(4),await mi(h),h.iu.set("Unknown"),h.tu.delete(4),await Yo(h)})(this))}))})),this.iu=new Hm(r,s)}}async function Yo(n){if(dr(n))for(const t of n.nu)await t(!0)}async function mi(n){for(const t of n.nu)await t(!1)}function g1(n,t){return n.Ya.get(t)||void 0}function gf(n,t){const e=J(n),r=g1(e,t.targetId);if(r!==void 0&&e.Ja.has(r))return;const s=(function(c,u){const h=g1(c,u);h!==void 0&&c.Za.delete(h);const p=(function(T,P){return P%2!=0?T.eu.next():T.Xa.next()})(c,u);return c.Ya.set(u,p),c.Za.set(p,u),p})(e,t.targetId);B(Fe,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const i=new Ge(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ja.set(s,i),yc(e)?_c(e):Xr(e).Fn()&&mc(e,i)}function gc(n,t){const e=J(n),r=Xr(e),s=g1(e,t);B(Fe,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),e.Ja.delete(s),e.Ya.delete(t),e.Za.delete(s),r.Fn()&&mf(e,s),e.Ja.size===0&&(r.Fn()?r.Nn():dr(e)&&e.iu.set("Unknown"))}function mc(n,t){if(n.su.We(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(Y.min())>0){const e=n.Za.get(t.targetId);if(e===void 0)return void B(Fe,"SDK target ID not found for remote ID: "+t.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(e).size;t=t.withExpectedCount(r)}Xr(n).jn(t)}function mf(n,t){n.su.We(t),Xr(n).Hn(t)}function _c(n){n.su=new Q3({getRemoteKeysForTarget:t=>{const e=n.Za.get(t);return e!==void 0?n.remoteSyncer.getRemoteKeysForTarget(e):rt()},dt:t=>n.Ja.get(t)||null,Tt:()=>n.datastore.serializer.databaseId}),Xr(n).start(),n.iu.Wa()}function yc(n){return dr(n)&&!Xr(n).Cn()&&n.Ja.size>0}function dr(n){return J(n).tu.size===0}function _f(n){n.su=void 0}async function Gm(n){n.iu.set("Online")}async function zm(n){n.Ja.forEach(((t,e)=>{mc(n,t)}))}async function Wm(n,t){_f(n),yc(n)?(n.iu.za(t),_c(n)):n.iu.set("Unknown")}async function Km(n,t,e){if(n.iu.set("Online"),t instanceof R6&&t.state===2&&t.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds){if(s.Ja.has(c)){const u=s.Za.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,o),s.Ya.delete(u),s.Za.delete(c)),s.Ja.delete(c)}s.su.removeTarget(c)}})(n,t)}catch(r){B(Fe,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await wo(n,r)}else if(t instanceof Xi?n.su.et(t):t instanceof v6?n.su.ot(t):n.su.rt(t),!e.isEqual(Y.min()))try{const r=await pf(n.localStore);e.compareTo(r)>=0&&await(function(i,o){const c=i.su.Rt(o);c.targetChanges.forEach(((h,p)=>{if(h.resumeToken.approximateByteSize()>0){const m=i.Ja.get(p);m&&i.Ja.set(p,m.withResumeToken(h.resumeToken,o))}})),c.targetMismatches.forEach(((h,p)=>{const m=i.Ja.get(h);if(!m)return;i.Ja.set(h,m.withResumeToken(bt.EMPTY_BYTE_STRING,m.snapshotVersion)),mf(i,h);const T=new Ge(m.target,h,p,m.sequenceNumber);mc(i,T)}));const u=(function(p,m){const T=new Map;m.targetChanges.forEach(((O,M)=>{const $=p.Za.get(M);$!==void 0&&T.set($,O)}));let P=new gt(st);return m.targetMismatches.forEach(((O,M)=>{const $=p.Za.get(O);$!==void 0&&(P=P.insert($,M))})),new fi(m.snapshotVersion,T,P,m.documentUpdates,m.augmentedDocumentUpdates,m.resolvedLimboDocuments)})(i,c);return i.remoteSyncer.applyRemoteEvent(u)})(n,e)}catch(r){B(Fe,"Failed to raise snapshot:",r),await wo(n,r)}}async function wo(n,t,e){if(!Hr(t))throw t;n.tu.add(1),await mi(n),n.iu.set("Offline"),e||(e=()=>pf(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{B(Fe,"Retrying IndexedDB access"),await e(),n.tu.delete(1),await Yo(n)}))}function yf(n,t){return t().catch((e=>wo(n,e,t)))}async function Qo(n){const t=J(n),e=Ln(t);let r=t.Ha.length>0?t.Ha[t.Ha.length-1].batchId:L1;for(;Ym(t);)try{const s=await Um(t.localStore,r);if(s===null){t.Ha.length===0&&e.Nn();break}r=s.batchId,Qm(t,s)}catch(s){await wo(t,s)}Ef(t)&&wf(t)}function Ym(n){return dr(n)&&n.Ha.length<10}function Qm(n,t){n.Ha.push(t);const e=Ln(n);e.Fn()&&e.Jn&&e.Yn(t.mutations)}function Ef(n){return dr(n)&&!Ln(n).Cn()&&n.Ha.length>0}function wf(n){Ln(n).start()}async function Xm(n){Ln(n).er()}async function Jm(n){const t=Ln(n);for(const e of n.Ha)t.Yn(e.mutations)}async function Zm(n,t,e){const r=n.Ha.shift(),s=lc.from(r,t,e);await yf(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Qo(n)}async function t8(n,t){t&&Ln(n).Jn&&await(async function(r,s){if((function(o){return E6(o)&&o!==V.ABORTED})(s.code)){const i=r.Ha.shift();Ln(r).Mn(),await yf(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Qo(r)}})(n,t),Ef(n)&&wf(n)}async function _h(n,t){const e=J(n);e.asyncQueue.verifyOperationInProgress(),B(Fe,"RemoteStore received new credentials");const r=dr(e);e.tu.add(3),await mi(e),r&&e.iu.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.tu.delete(3),await Yo(e)}async function e8(n,t){const e=J(n);t?(e.tu.delete(2),await Yo(e)):t||(e.tu.add(2),await mi(e),e.iu.set("Unknown"))}function Xr(n){return n._u||(n._u=(function(e,r,s){const i=J(e);return i.nr(),new w9(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:Gm.bind(null,n),zt:zm.bind(null,n),Ht:Wm.bind(null,n),zn:Km.bind(null,n)}),n.nu.push((async t=>{t?(n._u.Mn(),yc(n)?_c(n):n.iu.set("Unknown")):(await n._u.stop(),_f(n))}))),n._u}function Ln(n){return n.ou||(n.ou=(function(e,r,s){const i=J(e);return i.nr(),new T9(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:()=>Promise.resolve(),zt:Xm.bind(null,n),Ht:t8.bind(null,n),Zn:Jm.bind(null,n),Xn:Zm.bind(null,n)}),n.nu.push((async t=>{t?(n.ou.Mn(),await Qo(n)):(await n.ou.stop(),n.Ha.length>0&&(B(Fe,`Stopping write stream with ${n.Ha.length} pending writes`),n.Ha=[]))}))),n.ou}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(t,e,r,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ke,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,i){const o=Date.now()+r,c=new Ec(t,e,o,s,i);return c.start(r),c}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wc(n,t){if(tn("AsyncQueue",`${t}: ${n}`),Hr(n))return new F(V.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{static emptySet(t){return new tr(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||z.comparator(e.key,r.key):(e,r)=>z.comparator(e.key,r.key),this.keyedMap=yr(),this.sortedSet=new gt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof tr)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new tr;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(){this.au=new gt(z.comparator)}track(t){const e=t.doc.key,r=this.au.get(e);r?t.type!==0&&r.type===3?this.au=this.au.insert(e,t):t.type===3&&r.type!==1?this.au=this.au.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.au=this.au.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.au=this.au.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.au=this.au.remove(e):t.type===1&&r.type===2?this.au=this.au.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.au=this.au.insert(e,{type:2,doc:t.doc}):G(63341,{ft:t,uu:r}):this.au=this.au.insert(e,t)}cu(){const t=[];return this.au.inorderTraversal(((e,r)=>{t.push(r)})),t}}class Lr{constructor(t,e,r,s,i,o,c,u,h){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(t,e,r,s,i){const o=[];return e.forEach((c=>{o.push({type:0,doc:c})})),new Lr(t,e,tr.emptySet(e),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Wo(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n8{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some((t=>t.Tu()))}}class r8{constructor(){this.queries=Eh(),this.onlineState="Unknown",this.Pu=new Set}terminate(){(function(e,r){const s=J(e),i=s.queries;s.queries=Eh(),i.forEach(((o,c)=>{for(const u of c.Eu)u.onError(r)}))})(this,new F(V.ABORTED,"Firestore shutting down"))}}function Eh(){return new lr((n=>cf(n)),Wo)}async function Tf(n,t){const e=J(n);let r=3;const s=t.query;let i=e.queries.get(s);i?!i.hu()&&t.Tu()&&(r=2):(i=new n8,r=t.Tu()?0:1);try{switch(r){case 0:i.lu=await e.onListen(s,!0);break;case 1:i.lu=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(o){const c=wc(o,`Initialization of query '${kt(t.query)?Ye(t.query):Ps(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,i),i.Eu.push(t),t.Ru(e.onlineState),i.lu&&t.Iu(i.lu)&&Tc(e)}async function If(n,t){const e=J(n),r=t.query;let s=3;const i=e.queries.get(r);if(i){const o=i.Eu.indexOf(t);o>=0&&(i.Eu.splice(o,1),i.Eu.length===0?s=t.Tu()?0:1:!i.hu()&&t.Tu()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function s8(n,t){const e=J(n);let r=!1;for(const s of t){const i=s.query,o=e.queries.get(i);if(o){for(const c of o.Eu)c.Iu(s)&&(r=!0);o.lu=s}}r&&Tc(e)}function i8(n,t,e){const r=J(n),s=r.queries.get(t);if(s)for(const i of s.Eu)i.onError(e);r.queries.delete(t)}function Tc(n){n.Pu.forEach((t=>{t.next()}))}var m1;(function(n){n.Default="default",n.Cache="cache"})(m1||(m1={}));class Af{constructor(t,e,r){this.query=t,this.Au=e,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=r||{}}Iu(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Lr(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Vu?this.fu(t)&&(this.Au.next(t),e=!0):this.mu(t,this.onlineState)&&(this.pu(t),e=!0),this.du=t,e}onError(t){this.Au.error(t)}Ru(t){this.onlineState=t;let e=!1;return this.du&&!this.Vu&&this.mu(this.du,t)&&(this.pu(this.du),e=!0),e}mu(t,e){if(!t.fromCache||!this.Tu())return!0;const r=e!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}fu(t){if(t.docChanges.length>0)return!0;const e=this.du&&this.du.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}pu(t){t=Lr.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Vu=!0,this.Au.next(t)}Tu(){return this.options.source!==m1.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(t){this.key=t}}class Rf{constructor(t){this.key=t}}class o8{constructor(t,e){this.query=t,this.Ou=e,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=rt(),this.mutatedKeys=rt(),this.Lu=kt(t)?d1(t):B1(t),this.Bu=new tr(this.Lu)}get Uu(){return this.Ou}ku(t,e){const r=e?e.qu:new yh,s=e?e.Bu:this.Bu;let i=e?e.mutatedKeys:this.mutatedKeys,o=s,c=!1;const[u,h]=this.$u(this.query,s);t.inorderTraversal(((m,T)=>{const P=s.get(m),O=_m(this.query,T)?T:null,M=!!P&&this.mutatedKeys.has(P.key),$=!!O&&(O.hasLocalMutations||this.mutatedKeys.has(O.key)&&O.hasCommittedMutations);let Z=!1;P&&O?P.data.isEqual(O.data)?M!==$&&(r.track({type:3,doc:O}),Z=!0):this.Ku(P,O)||(r.track({type:2,doc:O}),Z=!0,(u&&this.Lu(O,u)>0||h&&this.Lu(O,h)<0)&&(c=!0)):!P&&O?(r.track({type:0,doc:O}),Z=!0):P&&!O&&(r.track({type:1,doc:P}),Z=!0,(u||h)&&(c=!0)),Z&&(O?(o=o.add(O),i=$?i.add(m):i.delete(m)):(o=o.delete(m),i=i.delete(m)))}));const p=this.Wu(this.query);if(p)if(kt(this.query)){const m=[];o.forEach((O=>m.push(O)));const T=hf(this.query,m);let P=new tr(d1(this.query));for(const O of T)P=P.add(O);o.forEach((O=>{P.has(O.key)||(i=i.delete(O.key),r.track({type:1,doc:O}))})),o=P}else{const m=this.Qu(this.query);for(;o.size>p;){const T=m==="F"?o.last():o.first();o=o.delete(T.key),i=i.delete(T.key),r.track({type:1,doc:T})}}return{Bu:o,qu:r,Uo:c,mutatedKeys:i}}Wu(t){var e;return kt(t)?(e=Ua(t))==null?void 0:e.limit:t.limit||void 0}Qu(t){if(kt(t)){const e=Ua(t);return e&&e.limit<0?"L":"F"}return t.limitType}$u(t,e){var r;if(kt(t)){const s=(r=Ua(t))==null?void 0:r.limit;return[e.size===s?e.last():null,null]}return[t.limitType==="F"&&e.size===this.Wu(this.query)?e.last():null,t.limitType==="L"&&e.size===this.Wu(this.query)?e.first():null]}Ku(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const i=this.Bu;this.Bu=t.Bu,this.mutatedKeys=t.mutatedKeys;const o=t.qu.cu();o.sort(((p,m)=>(function(P,O){const M=$=>{switch($){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{ft:$})}};return M(P)-M(O)})(p.type,m.type)||this.Lu(p.doc,m.doc))),this.Gu(r),s=s??!1;const c=e&&!s?this.zu():[],u=this.Nu.size===0&&this.current&&!s?1:0,h=u!==this.Mu;return this.Mu=u,o.length!==0||h?{snapshot:new Lr(this.query,t.Bu,i,o,t.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),ju:c}:{ju:c}}Ru(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new yh,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(t){return!this.Ou.has(t)&&!!this.Bu.has(t)&&!this.Bu.get(t).hasLocalMutations}Gu(t){t&&(t.addedDocuments.forEach((e=>this.Ou=this.Ou.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ou=this.Ou.delete(e))),this.current=t.current)}zu(){if(!this.current)return[];const t=this.Nu;this.Nu=rt(),this.Bu.forEach((r=>{this.Hu(r.key)&&(this.Nu=this.Nu.add(r.key))}));const e=[];return t.forEach((r=>{this.Nu.has(r)||e.push(new Rf(r))})),this.Nu.forEach((r=>{t.has(r)||e.push(new vf(r))})),e}Ju(t){this.Ou=t.Jo,this.Nu=rt();const e=this.ku(t.documents);return this.applyChanges(e,!0)}Yu(){return Lr.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,this.Mu===0,this.hasCachedResults)}}const Ic="SyncEngine";class a8{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class c8{constructor(t){this.key=t,this.Zu=!1}}class u8{constructor(t,e,r,s,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Xu={},this.ec=new lr((c=>cf(c)),Wo),this.tc=new Map,this.nc=new Set,this.rc=new gt(z.comparator),this.sc=new Map,this._c=new hc,this.oc={},this.ac=new Map,this.uc=xn.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return this.cc===!0}}async function l8(n,t,e=!0){const r=Of(n);let s;const i=r.ec.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await Sf(r,t,e,!0),s}async function h8(n,t){const e=Of(n);await Sf(e,t,!0,!1)}async function Sf(n,t,e,r){const s=await Bm(n.localStore,kt(t)?t:De(t)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,e);let c;return r&&(c=await f8(n,t,i,o==="current",s.resumeToken)),n.isPrimaryClient&&e&&gf(n.remoteStore,s),c}async function f8(n,t,e,r,s){n.lc=(m,T,P)=>(async function(M,$,Z,ut){let Et=$.view.ku(Z);Et.Uo&&(Et=await gh(M.localStore,$.query,!1).then((({documents:v})=>$.view.ku(v,Et))));const me=ut&&ut.targetChanges.get($.targetId),Bt=ut&&ut.targetMismatches.get($.targetId)!=null,$t=$.view.applyChanges(Et,M.isPrimaryClient,me,Bt);return Th(M,$.targetId,$t.ju),$t.snapshot})(n,m,T,P);const i=await gh(n.localStore,t,!0),o=new o8(t,i.Jo),c=o.ku(i.documents),u=di.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,u);Th(n,e,h.ju);const p=new a8(t,e,o);return n.ec.set(t,p),n.tc.has(e)?n.tc.get(e).push(t):n.tc.set(e,[t]),h.snapshot}async function d8(n,t,e){const r=J(n),s=r.ec.get(t),i=r.tc.get(s.targetId);if(i.length>1)return r.tc.set(s.targetId,i.filter((o=>!Wo(o,t)))),void r.ec.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await p1(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&gc(r.remoteStore,s.targetId),_1(r,s.targetId)})).catch(qr)):(_1(r,s.targetId),await p1(r.localStore,s.targetId,!0))}async function p8(n,t){const e=J(n),r=e.ec.get(t),s=e.tc.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),gc(e.remoteStore,r.targetId))}async function g8(n,t,e){const r=I8(n);try{const s=await(function(o,c){const u=J(o),h=pt.now(),p=c.reduce(((P,O)=>P.add(O.key)),rt());let m,T;return u.persistence.runTransaction("Locally write mutations","readwrite",(P=>{let O=ne(),M=rt();return u.Qo.getEntries(P,p).next(($=>{O=$,O.forEach(((Z,ut)=>{ut.isValidDocument()||(M=M.add(Z))}))})).next((()=>u.localDocuments.getOverlayedDocuments(P,O))).next(($=>{m=$;const Z=[];for(const ut of c){const Et=R3(ut,m.get(ut.key).overlayedDocument);Et!=null&&Z.push(new $n(ut.key,Et,e6(Et.value.mapValue),Rt.exists(!0)))}return u.mutationQueue.addMutationBatch(P,h,Z,c)})).next(($=>{T=$;const Z=$.applyToLocalDocumentSet(m,M);return u.documentOverlayCache.saveOverlays(P,$.batchId,Z)}))})).then((()=>({batchId:T.batchId,changes:I6(m)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,u){let h=o.oc[o.currentUser.toKey()];h||(h=new gt(st)),h=h.insert(c,u),o.oc[o.currentUser.toKey()]=h})(r,s.batchId,e),await _i(r,s.changes),await Qo(r.remoteStore)}catch(s){const i=wc(s,"Failed to persist write");e.reject(i)}}async function Cf(n,t){const e=J(n);try{const r=await Mm(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const o=e.sc.get(i);o&&(H(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Zu=!0:s.modifiedDocuments.size>0?H(o.Zu,14607):s.removedDocuments.size>0&&(H(o.Zu,42227),o.Zu=!1))})),await _i(e,r,t)}catch(r){await qr(r)}}function wh(n,t,e){const r=J(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.ec.forEach(((i,o)=>{const c=o.view.Ru(t);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const u=J(o);u.onlineState=c;let h=!1;u.queries.forEach(((p,m)=>{for(const T of m.Eu)T.Ru(c)&&(h=!0)})),h&&Tc(u)})(r.eventManager,t),s.length&&r.Xu.zn(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function m8(n,t,e){const r=J(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.sc.get(t),i=s&&s.key;if(i){let o=new gt(z.comparator);o=o.insert(i,Lt.newNoDocument(i,Y.min()));const c=rt().add(i),u=new fi(Y.min(),new Map,new gt(st),o,ne(),c);await Cf(r,u),r.rc=r.rc.remove(i),r.sc.delete(t),Ac(r)}else await p1(r.localStore,t,!1).then((()=>_1(r,t,e))).catch(qr)}async function _8(n,t){const e=J(n),r=t.batch.batchId;try{const s=await Lm(e.localStore,t);bf(e,r,null),Pf(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await _i(e,s)}catch(s){await qr(s)}}async function y8(n,t,e){const r=J(n);try{const s=await(function(o,c){const u=J(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let p;return u.mutationQueue.lookupMutationBatch(h,c).next((m=>(H(m!==null,37113),p=m.keys(),u.mutationQueue.removeMutationBatch(h,m)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,p,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p))).next((()=>u.localDocuments.getDocuments(h,p)))}))})(r.localStore,t);bf(r,t,e),Pf(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await _i(r,s)}catch(s){await qr(s)}}function Pf(n,t){(n.ac.get(t)||[]).forEach((e=>{e.resolve()})),n.ac.delete(t)}function bf(n,t,e){const r=J(n);let s=r.oc[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),r.oc[r.currentUser.toKey()]=s}}function _1(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.tc.get(t))n.ec.delete(r),e&&n.Xu.Ec(r,e);n.tc.delete(t),n.isPrimaryClient&&n._c.s_(t).forEach((r=>{n._c.containsKey(r)||Nf(n,r)}))}function Nf(n,t){n.nc.delete(t.path.canonicalString());const e=n.rc.get(t);e!==null&&(gc(n.remoteStore,e),n.rc=n.rc.remove(t),n.sc.delete(e),Ac(n))}function Th(n,t,e){for(const r of e)r instanceof vf?(n._c.addReference(r.key,t),E8(n,r)):r instanceof Rf?(B(Ic,"Document no longer in limbo: "+r.key),n._c.removeReference(r.key,t),n._c.containsKey(r.key)||Nf(n,r.key)):G(19791,{hc:r})}function E8(n,t){const e=t.key,r=e.path.canonicalString();n.rc.get(e)||n.nc.has(r)||(B(Ic,"New document in limbo: "+e),n.nc.add(r),Ac(n))}function Ac(n){for(;n.nc.size>0&&n.rc.size<n.maxConcurrentLimboResolutions;){const t=n.nc.values().next().value;n.nc.delete(t);const e=new z(ct.fromString(t)),r=n.uc.next();n.sc.set(r,new c8(e)),n.rc=n.rc.insert(e,r),gf(n.remoteStore,new Ge(De(U1(e.path)),r,"TargetPurposeLimboResolution",Oo.ce))}}async function _i(n,t,e){const r=J(n),s=[],i=[],o=[];r.ec.isEmpty()||(r.ec.forEach(((c,u)=>{o.push(r.lc(u,t,e).then((h=>{var p;if((h||e)&&r.isPrimaryClient){const m=h?!h.fromCache:(p=e==null?void 0:e.targetChanges.get(u.targetId))==null?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){s.push(h);const m=dc.vo(u.targetId,h);i.push(m)}})))})),await Promise.all(o),r.Xu.zn(s),await(async function(u,h){const p=J(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>x.forEach(h,(T=>x.forEach(T.wo,(P=>p.persistence.referenceDelegate.addReference(m,T.targetId,P))).next((()=>x.forEach(T.bo,(P=>p.persistence.referenceDelegate.removeReference(m,T.targetId,P)))))))))}catch(m){if(!Hr(m))throw m;B(pc,"Failed to update sequence numbers: "+m)}for(const m of h){const T=m.targetId;if(!m.fromCache){const P=p.$o.get(T),O=P.snapshotVersion,M=P.withLastLimboFreeSnapshotVersion(O);p.$o=p.$o.insert(T,M)}}})(r.localStore,i))}async function w8(n,t){const e=J(n);if(!e.currentUser.isEqual(t)){B(Ic,"User change. New user:",t.toKey());const r=await df(e.localStore,t);e.currentUser=t,(function(i,o){i.ac.forEach((c=>{c.forEach((u=>{u.reject(new F(V.CANCELLED,o))}))})),i.ac.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await _i(e,r.zo)}}function T8(n,t){const e=J(n),r=e.sc.get(t);if(r&&r.Zu)return rt().add(r.key);{let s=rt();const i=e.tc.get(t);if(!i)return s;for(const o of i??[]){const c=e.ec.get(o);s=s.unionWith(c.view.Uu)}return s}}function Of(n){const t=J(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Cf.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=T8.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=m8.bind(null,t),t.Xu.zn=s8.bind(null,t.eventManager),t.Xu.Ec=i8.bind(null,t.eventManager),t}function I8(n){const t=J(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=_8.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=y8.bind(null,t),t}class To{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Uo(t.databaseInfo.databaseId),this.sharedClientState=this.Rc(t),this.persistence=this.Ic(t),await this.persistence.start(),this.localStore=this.Ac(t),this.gcScheduler=this.Vc(t,this.localStore),this.indexBackfillerScheduler=this.dc(t,this.localStore)}Vc(t,e){return null}dc(t,e){return null}Ac(t){return xm(this.persistence,new Dm,t.initialUser,this.serializer)}Ic(t){return new ff(fc.C_,this.serializer)}Rc(t){return new qm}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}To.provider={build:()=>new To};class A8 extends To{constructor(t){super(),this.cacheSizeBytes=t}Vc(t,e){H(this.persistence.referenceDelegate instanceof Eo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new P9(r,t.asyncQueue,e)}Ic(t){const e=this.cacheSizeBytes!==void 0?ee.withCacheSize(this.cacheSizeBytes):ee.DEFAULT;return new ff((r=>Eo.C_(r,e)),this.serializer)}}class y1{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>wh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=w8.bind(null,this.syncEngine),await e8(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new r8})()}createDatastore(t){const e=Uo(t.databaseInfo.databaseId),r=E9(t.databaseInfo);return v9(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,i,o,c){return new jm(r,s,i,o,c)})(this.localStore,this.datastore,t.asyncQueue,(e=>wh(this.syncEngine,e,0)),(function(){return ih.C()?new ih:new g9})())}createSyncEngine(t,e){return(function(s,i,o,c,u,h,p){const m=new u8(s,i,o,c,u,h);return p&&(m.cc=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const i=J(s);B(Fe,"RemoteStore shutting down."),i.tu.add(5),await mi(i),i.ru.shutdown(),i.iu.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}y1.provider={build:()=>new y1};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.mc(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.mc(this.observer.error,t):tn("Uncaught Error in snapshot listener:",t.toString()))}gc(){this.muted=!0}mc(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let v8=class{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new F(V.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await(async function(s,i){const o=J(s),c={documents:i.map((m=>zs(o.serializer,m)))},u=await o.$t("BatchGetDocuments",o.serializer.databaseId,ct.emptyPath(),c,i.length),h=new Map;u.forEach((m=>{const T=n9(o.serializer,m);h.set(T.key.toString(),T)}));const p=[];return i.forEach((m=>{const T=h.get(m.toString());H(!!T,55234,{key:m}),p.push(T)})),p})(this.datastore,t);return e.forEach((r=>this.recordVersion(r))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new hi(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((e,r)=>{const s=z.fromPath(r);this.mutations.push(new c6(s,this.precondition(s)))})),await(async function(r,s){const i=J(r),o={writes:s.map((c=>N6(i.serializer,c)))};await i.Bt("Commit",i.serializer.databaseId,ct.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw G(50498,{Oc:t.constructor.name});e=Y.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!e.isEqual(r))throw new F(V.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(Y.min())?Rt.exists(!1):Rt.updateTime(e):Rt.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(Y.min()))throw new F(V.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Rt.updateTime(e)}return Rt.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R8{constructor(t,e,r,s,i){this.asyncQueue=t,this.datastore=e,this.options=r,this.updateFunction=s,this.deferred=i,this.Mc=r.maxAttempts,this.xn=new j1(this.asyncQueue,"transaction_retry")}Nc(){this.Mc-=1,this.Lc()}Lc(){this.xn.mn((async()=>{const t=new v8(this.datastore),e=this.Bc(t);e&&e.then((r=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(r)})).catch((s=>{this.Uc(s)}))))})).catch((r=>{this.Uc(r)}))}))}Bc(t){try{const e=this.updateFunction(t);return!ci(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Uc(t){this.Mc>0&&this.kc(t)?(this.Mc-=1,this.asyncQueue.enqueueAndForget((()=>(this.Lc(),Promise.resolve())))):this.deferred.reject(t)}kc(t){if((t==null?void 0:t.name)==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!E6(e)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn="FirestoreClient";class S8{constructor(t,e,r,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=te.UNAUTHENTICATED,this.clientId=x1.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{B(Mn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(B(Mn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ke;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=wc(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function $a(n,t){n.asyncQueue.verifyOperationInProgress(),B(Mn,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await df(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function Ih(n,t){n.asyncQueue.verifyOperationInProgress();const e=await C8(n);B(Mn,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>_h(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>_h(t.remoteStore,s))),n._onlineComponents=t}async function C8(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){B(Mn,"Using user provided OfflineComponentProvider");try{await $a(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;xe("Error using user provided cache. Falling back to memory cache: "+e),await $a(n,new To)}}else B(Mn,"Using default OfflineComponentProvider"),await $a(n,new A8(void 0));return n._offlineComponents}async function vc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(B(Mn,"Using user provided OnlineComponentProvider"),await Ih(n,n._uninitializedComponentsProvider._online)):(B(Mn,"Using default OnlineComponentProvider"),await Ih(n,new y1))),n._onlineComponents}function P8(n){return vc(n).then((t=>t.syncEngine))}function b8(n){return vc(n).then((t=>t.datastore))}async function E1(n){const t=await vc(n),e=t.eventManager;return e.onListen=l8.bind(null,t.syncEngine),e.onUnlisten=d8.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=h8.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=p8.bind(null,t.syncEngine),e}function N8(n,t,e,r){const s=new Df(r),i=new Af(t,s,e);return n.asyncQueue.enqueueAndForget((async()=>Tf(await E1(n),i))),()=>{s.gc(),n.asyncQueue.enqueueAndForget((async()=>If(await E1(n),i)))}}function O8(n,t,e={}){const r=new Ke;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,u,h){const p=new Df({next:T=>{p.gc(),o.enqueueAndForget((()=>If(i,m))),T.fromCache&&u.source==="server"?h.reject(new F(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(T)},error:T=>h.reject(T)}),m=new Af(c instanceof Os?lm(c):c,p,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return Tf(i,m)})(await E1(n),n.asyncQueue,t,e,r))),r.promise}function D8(n,t){const e=new Ke;return n.asyncQueue.enqueueAndForget((async()=>g8(await P8(n),t,e))),e.promise}function k8(n,t,e){const r=new Ke;return n.asyncQueue.enqueueAndForget((async()=>{const s=await b8(n);new R8(n.asyncQueue,s,e,t,r).Nc()})),r.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah="AsyncQueue";class vh{constructor(t=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new j1(this,"async_queue_retry"),this.jc=()=>{const r=Ba();r&&B(Ah,"Visibility state changed to "+r.visibilityState),this.xn.gn()},this.Hc=t;const e=Ba();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Jc(),this.Yc(t)}enterRestrictedMode(t){if(!this.$c){this.$c=!0,this.Gc=t||!1;const e=Ba();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.jc)}}enqueue(t){if(this.Jc(),this.$c)return new Promise((()=>{}));const e=new Ke;return this.Yc((()=>this.$c&&this.Gc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.qc.push(t),this.Zc())))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(t){if(!Hr(t))throw t;B(Ah,"Operation failed with retryable error: "+t)}this.qc.length>0&&this.xn.mn((()=>this.Zc()))}}Yc(t){const e=this.Hc.then((()=>(this.Qc=!0,t().catch((r=>{throw this.Wc=r,this.Qc=!1,tn("INTERNAL UNHANDLED ERROR: ",Rh(r)),r})).then((r=>(this.Qc=!1,r))))));return this.Hc=e,e}enqueueAfterDelay(t,e,r){this.Jc(),this.zc.indexOf(t)>-1&&(e=0);const s=Ec.createAndSchedule(this,t,e,r,(i=>this.Xc(i)));return this.Kc.push(s),s}Jc(){this.Wc&&G(47125,{el:Rh(this.Wc)})}verifyOperationInProgress(){}async tl(){let t;do t=this.Hc,await t;while(t!==this.Hc)}nl(t){for(const e of this.Kc)if(e.timerId===t)return!0;return!1}rl(t){return this.tl().then((()=>{this.Kc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.Kc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.tl()}))}il(t){this.zc.push(t)}Xc(t){const e=this.Kc.indexOf(t);this.Kc.splice(e,1)}}function Rh(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Ue extends G1{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new vh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new vh(t),this._firestoreClient=void 0,await t}}}function B_(n,t,e){const r=ei(n,"firestore");if(r.isInitialized(e)){const s=r.getImmediate({identifier:e}),i=r.getOptions(e);if(Xe(i,t))return s;throw new F(V.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new F(V.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<U6)throw new F(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&ti(t.host)&&Jh(t.host),r.initialize({options:t,instanceIdentifier:e})}function yi(n){if(n._terminated)throw new F(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||V8(n),n._firestoreClient}function V8(n){var r,s,i,o;const t=n._freezeSettings(),e=S9(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((o=t.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new S8(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{convertValue(t,e="none"){switch(Nt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return _t(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Nn(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw G(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Bn(t,((s,i)=>{r[s]=this.convertValue(i,e)})),r}convertVectorValue(t){var r,s,i;const e=(i=(s=(r=t.fields)==null?void 0:r[qs].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>_t(o.doubleValue)));return new re(e)}convertGeoPoint(t){return new ke(_t(t.latitude),_t(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=ui(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(br(t));default:return null}}convertTimestamp(t){const e=bn(t);return new pt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=ct.fromString(t);H(k6(r),9688,{name:t});const s=new $s(r.get(1),r.get(3)),i=new z(r.popFirst(5));return s.isEqual(e)||tn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo extends kf{constructor(t){super(),this.firestore=t}convertBytes(t){return new le(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new yt(this.firestore,null,e)}}const Sh="@firebase/firestore",Ch="4.16.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ph(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(t,e,r,s,i){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new yt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new x8(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Dn("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class x8 extends Io{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new F(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Rc{}class Sc extends Rc{}function $_(n,t,...e){let r=[];t instanceof Rc&&r.push(t),r=r.concat(e),(function(i){const o=i.filter((u=>u instanceof Cc)).length,c=i.filter((u=>u instanceof Jo)).length;if(o>1||o>0&&c>0)throw new F(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Jo extends Sc{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Jo(t,e,r)}_apply(t){const e=this._parse(t);return xf(t._query,e),new rn(t.firestore,t.converter,a1(t._query,e))}_parse(t){const e=zr(t.firestore);return(function(i,o,c,u,h,p,m){let T;if(h.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new F(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Nh(m,p);const O=[];for(const M of m)O.push(bh(u,i,M));T={arrayValue:{values:O}}}else T=bh(u,i,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Nh(m,p),T=L9(c,o,m,p==="in"||p==="not-in");return St.create(h,p,T)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function q_(n,t,e){const r=t,s=Dn("where",n);return Jo._create(s,r,e)}class Cc extends Rc{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Cc(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:Re.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const u of c)xf(o,u),o=a1(o,u)})(t._query,e),new rn(t.firestore,t.converter,a1(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Pc extends Sc{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Pc(t,e)}_apply(t){const e=(function(s,i,o){if(s.startAt!==null)throw new F(V.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new F(V.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Gs(i,o)})(t._query,this._field,this._direction);return new rn(t.firestore,t.converter,U3(t._query,e))}}function H_(n,t="asc"){const e=t,r=Dn("orderBy",n);return Pc._create(r,e)}class bc extends Sc{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new bc(t,e,r)}_apply(t){return new rn(t.firestore,t.converter,go(t._query,this._limit,this._limitType))}}function j_(n){return bc._create("limit",n,"F")}function bh(n,t,e){if(typeof(e=Tt(e))=="string"){if(e==="")throw new F(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!y6(t)&&e.indexOf("/")!==-1)throw new F(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(ct.fromString(e));if(!z.isDocumentKey(r))throw new F(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return jl(n,new z(r))}if(e instanceof yt)return jl(n,e._key);throw new F(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${No(e)}.`)}function Nh(n,t){if(!Array.isArray(n)||n.length===0)throw new F(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function xf(n,t){const e=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new F(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new F(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function Zo(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class L8 extends kf{constructor(t){super(),this.firestore=t}convertBytes(t){return new le(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new yt(this.firestore,null,e)}}class Tr{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Sn extends Io{constructor(t,e,r,s,i,o){super(t,e,r,s,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new to(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Dn("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Sn._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Sn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Sn._jsonSchema={type:Ct("string",Sn._jsonSchemaVersion),bundleSource:Ct("string","DocumentSnapshot"),bundleName:Ct("string"),bundle:Ct("string")};class to extends Sn{data(t={}){return super.data(t)}}class er{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Tr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new to(this._firestore,this._userDataWriter,r.key,r,new Tr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new F(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{kt(s._snapshot.query)?d1(s._snapshot.query):B1(s.query._query);const u=new to(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Tr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new to(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Tr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),p=o.indexOf(c.doc.key)),{type:M8(c.type),doc:u,oldIndex:h,newIndex:p}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=er._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=x1.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function M8(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */er._jsonSchemaVersion="firestore/querySnapshot/1.0",er._jsonSchema={type:Ct("string",er._jsonSchemaVersion),bundleSource:Ct("string","QuerySnapshot"),bundleName:Ct("string"),bundle:Ct("string")};const F8={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U8{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=zr(t)}set(t,e,r){this._verifyNotCommitted();const s=wn(t,this._firestore),i=Zo(s.converter,e,r),o=$o(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,Rt.none())),this}update(t,e,r,...s){this._verifyNotCommitted();const i=wn(t,this._firestore);let o;return o=typeof(e=Tt(e))=="string"||e instanceof Gr?X1(this._dataReader,"WriteBatch.update",i._key,e,r,s):Q1(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(o.toMutation(i._key,Rt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=wn(t,this._firestore);return this._mutations=this._mutations.concat(new hi(e._key,Rt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new F(V.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function wn(n,t){if((n=Tt(n)).firestore!==t)throw new F(V.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B8{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=zr(t)}get(t){const e=wn(t,this._firestore),r=new L8(this._firestore);return this._transaction.lookup([e._key]).then((s=>{if(!s||s.length!==1)return G(24041);const i=s[0];if(i.isFoundDocument())return new Io(this._firestore,r,i.key,i,e.converter);if(i.isNoDocument())return new Io(this._firestore,r,e._key,null,e.converter);throw G(18433,{doc:i})}))}set(t,e,r){const s=wn(t,this._firestore),i=Zo(s.converter,e,r),o=$o(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(t,e,r,...s){const i=wn(t,this._firestore);let o;return o=typeof(e=Tt(e))=="string"||e instanceof Gr?X1(this._dataReader,"Transaction.update",i._key,e,r,s):Q1(this._dataReader,"Transaction.update",i._key,e),this._transaction.update(i._key,o),this}delete(t){const e=wn(t,this._firestore);return this._transaction.delete(e._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $8 extends B8{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=wn(t,this._firestore),r=new Xo(this._firestore);return super.get(t).then((s=>new Sn(this._firestore,r,e._key,s._document,new Tr(!1,!1),e.converter)))}}function G_(n,t,e){n=de(n,Ue);const r={...F8,...e};(function(o){if(o.maxAttempts<1)throw new F(V.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=yi(n);return k8(s,(i=>t(new $8(n,i))),r)}function z_(n){n=de(n,rn);const t=de(n.firestore,Ue),e=yi(t),r=new Xo(t);return Vf(n._query),O8(e,n._query).then((s=>new er(t,r,n,s)))}function W_(n,t,e){n=de(n,yt);const r=de(n.firestore,Ue),s=Zo(n.converter,t,e),i=zr(r);return Ei(r,[$o(i,"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Rt.none())])}function K_(n,t,e,...r){n=de(n,yt);const s=de(n.firestore,Ue),i=zr(s);let o;return o=typeof(t=Tt(t))=="string"||t instanceof Gr?X1(i,"updateDoc",n._key,t,e,r):Q1(i,"updateDoc",n._key,t),Ei(s,[o.toMutation(n._key,Rt.exists(!0))])}function Y_(n){return Ei(de(n.firestore,Ue),[new hi(n._key,Rt.none())])}function Q_(n,t){const e=de(n.firestore,Ue),r=D9(n),s=Zo(n.converter,t),i=zr(n.firestore);return Ei(e,[$o(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Rt.exists(!1))]).then((()=>r))}function X_(n,...t){var h,p,m;n=Tt(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||Ph(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Ph(t[r])){const T=t[r];t[r]=(h=T.next)==null?void 0:h.bind(T),t[r+1]=(p=T.error)==null?void 0:p.bind(T),t[r+2]=(m=T.complete)==null?void 0:m.bind(T)}let i,o,c;if(n instanceof yt)o=de(n.firestore,Ue),c=U1(n._key.path),i={next:T=>{t[r]&&t[r](q8(o,n,T))},error:t[r+1],complete:t[r+2]};else{const T=de(n,rn);o=de(T.firestore,Ue),c=T._query;const P=new Xo(o);i={next:O=>{t[r]&&t[r](new er(o,P,T,O))},error:t[r+1],complete:t[r+2]},Vf(n._query)}const u=yi(o);return N8(u,c,s,i)}function Ei(n,t){const e=yi(n);return D8(e,t)}function q8(n,t,e){const r=e.docs.get(t._key),s=new Xo(n);return new Sn(n,s,t._key,r,new Tr(e.hasPendingWrites,e.fromCache),t.converter)}function J_(n){return n=de(n,Ue),yi(n),new U8(n,(t=>Ei(n,t)))}(function(t,e=!0){z4(Ur),Ve(new ve("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new Ue(new Y4(r.getProvider("auth-internal")),new J4(o,r.getProvider("app-check-internal")),_3(o,s),o);return i={useFetchStreams:e,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),_e(Sh,Ch,t),_e(Sh,Ch,"esm2020")})();const Lf="@firebase/installations",Nc="0.6.22";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mf=1e4,Ff=`w:${Nc}`,Uf="FIS_v2",H8="https://firebaseinstallations.googleapis.com/v1",j8=3600*1e3,G8="installations",z8="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W8={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},or=new ur(G8,z8,W8);function Bf(n){return n instanceof Be&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f({projectId:n}){return`${H8}/projects/${n}/installations`}function qf(n){return{token:n.token,requestStatus:2,expiresIn:Y8(n.expiresIn),creationTime:Date.now()}}async function Hf(n,t){const r=(await t.json()).error;return or.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function jf({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function K8(n,{refreshToken:t}){const e=jf(n);return e.append("Authorization",Q8(t)),e}async function Gf(n){const t=await n();return t.status>=500&&t.status<600?n():t}function Y8(n){return Number(n.replace("s","000"))}function Q8(n){return`${Uf} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X8({appConfig:n,heartbeatServiceProvider:t},{fid:e}){const r=$f(n),s=jf(n),i=t.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={fid:e,authVersion:Uf,appId:n.appId,sdkVersion:Ff},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await Gf(()=>fetch(r,c));if(u.ok){const h=await u.json();return{fid:h.fid||e,registrationStatus:2,refreshToken:h.refreshToken,authToken:qf(h.authToken)}}else throw await Hf("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(n){return new Promise(t=>{setTimeout(t,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J8(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z8=/^[cdef][\w-]{21}$/,w1="";function t5(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const e=e5(n);return Z8.test(e)?e:w1}catch{return w1}}function e5(n){return J8(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jr(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=new Map;function Wf(n,t){const e=Jr(n);Kf(e,t),s5(e,t)}function n5(n,t){Yf();const e=Jr(n);let r=Mr.get(e);r||(r=new Set,Mr.set(e,r)),r.add(t)}function r5(n,t){const e=Jr(n),r=Mr.get(e);r&&(r.delete(t),r.size===0&&Mr.delete(e),Qf())}function Kf(n,t){const e=Mr.get(n);if(e)for(const r of e)r(t)}function s5(n,t){const e=Yf();e&&e.postMessage({key:n,fid:t}),Qf()}let Jn=null;function Yf(){return!Jn&&"BroadcastChannel"in self&&(Jn=new BroadcastChannel("[Firebase] FID Change"),Jn.onmessage=n=>{Kf(n.data.key,n.data.fid)}),Jn}function Qf(){Mr.size===0&&Jn&&(Jn.close(),Jn=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i5="firebase-installations-database",o5=1,ar="firebase-installations-store";let qa=null;function Oc(){return qa||(qa=Ro(i5,o5,{upgrade:(n,t)=>{switch(t){case 0:n.createObjectStore(ar)}}})),qa}async function Ao(n,t){const e=Jr(n),s=(await Oc()).transaction(ar,"readwrite"),i=s.objectStore(ar),o=await i.get(e);return await i.put(t,e),await s.done,(!o||o.fid!==t.fid)&&Wf(n,t.fid),t}async function Xf(n){const t=Jr(n),r=(await Oc()).transaction(ar,"readwrite");await r.objectStore(ar).delete(t),await r.done}async function ta(n,t){const e=Jr(n),s=(await Oc()).transaction(ar,"readwrite"),i=s.objectStore(ar),o=await i.get(e),c=t(o);return c===void 0?await i.delete(e):await i.put(c,e),await s.done,c&&(!o||o.fid!==c.fid)&&Wf(n,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dc(n){let t;const e=await ta(n.appConfig,r=>{const s=a5(r),i=c5(n,s);return t=i.registrationPromise,i.installationEntry});return e.fid===w1?{installationEntry:await t}:{installationEntry:e,registrationPromise:t}}function a5(n){const t=n||{fid:t5(),registrationStatus:0};return Jf(t)}function c5(n,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(or.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const e={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=u5(n,e);return{installationEntry:e,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:l5(n)}:{installationEntry:t}}async function u5(n,t){try{const e=await X8(n,t);return Ao(n.appConfig,e)}catch(e){throw Bf(e)&&e.customData.serverCode===409?await Xf(n.appConfig):await Ao(n.appConfig,{fid:t.fid,registrationStatus:0}),e}}async function l5(n){let t=await Oh(n.appConfig);for(;t.registrationStatus===1;)await zf(100),t=await Oh(n.appConfig);if(t.registrationStatus===0){const{installationEntry:e,registrationPromise:r}=await Dc(n);return r||e}return t}function Oh(n){return ta(n,t=>{if(!t)throw or.create("installation-not-found");return Jf(t)})}function Jf(n){return h5(n)?{fid:n.fid,registrationStatus:0}:n}function h5(n){return n.registrationStatus===1&&n.registrationTime+Mf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function f5({appConfig:n,heartbeatServiceProvider:t},e){const r=d5(n,e),s=K8(n,e),i=t.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={installation:{sdkVersion:Ff,appId:n.appId}},c={method:"POST",headers:s,body:JSON.stringify(o)},u=await Gf(()=>fetch(r,c));if(u.ok){const h=await u.json();return qf(h)}else throw await Hf("Generate Auth Token",u)}function d5(n,{fid:t}){return`${$f(n)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kc(n,t=!1){let e;const r=await ta(n.appConfig,i=>{if(!Zf(i))throw or.create("not-registered");const o=i.authToken;if(!t&&m5(o))return i;if(o.requestStatus===1)return e=p5(n,t),i;{if(!navigator.onLine)throw or.create("app-offline");const c=y5(i);return e=g5(n,c),c}});return e?await e:r.authToken}async function p5(n,t){let e=await Dh(n.appConfig);for(;e.authToken.requestStatus===1;)await zf(100),e=await Dh(n.appConfig);const r=e.authToken;return r.requestStatus===0?kc(n,t):r}function Dh(n){return ta(n,t=>{if(!Zf(t))throw or.create("not-registered");const e=t.authToken;return E5(e)?{...t,authToken:{requestStatus:0}}:t})}async function g5(n,t){try{const e=await f5(n,t),r={...t,authToken:e};return await Ao(n.appConfig,r),e}catch(e){if(Bf(e)&&(e.customData.serverCode===401||e.customData.serverCode===404))await Xf(n.appConfig);else{const r={...t,authToken:{requestStatus:0}};await Ao(n.appConfig,r)}throw e}}function Zf(n){return n!==void 0&&n.registrationStatus===2}function m5(n){return n.requestStatus===2&&!_5(n)}function _5(n){const t=Date.now();return t<n.creationTime||n.creationTime+n.expiresIn<t+j8}function y5(n){const t={requestStatus:1,requestTime:Date.now()};return{...n,authToken:t}}function E5(n){return n.requestStatus===1&&n.requestTime+Mf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function w5(n){const t=n,{installationEntry:e,registrationPromise:r}=await Dc(t);return r?r.catch(console.error):kc(t).catch(console.error),e.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function T5(n,t=!1){const e=n;return await I5(e),(await kc(e,t)).token}async function I5(n){const{registrationPromise:t}=await Dc(n);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A5(n,t){const{appConfig:e}=n;return n5(e,t),()=>{r5(e,t)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v5(n){if(!n||!n.options)throw Ha("App Configuration");if(!n.name)throw Ha("App Name");const t=["projectId","apiKey","appId"];for(const e of t)if(!n.options[e])throw Ha(e);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Ha(n){return or.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td="installations",R5="installations-internal",S5=n=>{const t=n.getProvider("app").getImmediate(),e=v5(t),r=ei(t,"heartbeat");return{app:t,appConfig:e,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},C5=n=>{const t=n.getProvider("app").getImmediate(),e=ei(t,td).getImmediate();return{getId:()=>w5(e),getToken:s=>T5(e,s)}};function P5(){Ve(new ve(td,S5,"PUBLIC")),Ve(new ve(R5,C5,"PRIVATE"))}P5();_e(Lf,Nc);_e(Lf,Nc,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b5="/firebase-messaging-sw.js",N5="/firebase-cloud-messaging-push-scope",ed="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",O5="https://fcmregistrations.googleapis.com/v1",nd="google.c.a.c_id",D5="google.c.a.c_l",k5="google.c.a.ts",V5="google.c.a.e",kh=1e4;var Vh;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Vh||(Vh={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var Fr;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked",n.FID_REGISTERED="fid-registered"})(Fr||(Fr={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(n){const t=new Uint8Array(n);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function rd(n){const t="=".repeat((4-n.length%4)%4),e=(n+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(e),s=new Uint8Array(r.length);for(let i=0;i<r.length;++i)s[i]=r.charCodeAt(i);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="fcm_token_details_db",x5=5,xh="fcm_token_object_Store";async function L5(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(i=>i.name).includes(ja))return null;let t=null;return(await Ro(ja,x5,{upgrade:async(r,s,i,o)=>{if(s<2||!r.objectStoreNames.contains(xh))return;const c=o.objectStore(xh),u=await c.index("fcmSenderId").get(n);if(await c.clear(),!!u){if(s===2){const h=u;if(!h.auth||!h.p256dh||!h.endpoint)return;t={token:h.fcmToken,createTime:h.createTime??Date.now(),subscriptionOptions:{auth:h.auth,p256dh:h.p256dh,endpoint:h.endpoint,swScope:h.swScope,vapidKey:typeof h.vapidKey=="string"?h.vapidKey:Te(h.vapidKey)}}}else if(s===3){const h=u;t={token:h.fcmToken,createTime:h.createTime,subscriptionOptions:{auth:Te(h.auth),p256dh:Te(h.p256dh),endpoint:h.endpoint,swScope:h.swScope,vapidKey:Te(h.vapidKey)}}}else if(s===4){const h=u;t={token:h.fcmToken,createTime:h.createTime,subscriptionOptions:{auth:Te(h.auth),p256dh:Te(h.p256dh),endpoint:h.endpoint,swScope:h.swScope,vapidKey:Te(h.vapidKey)}}}}}})).close(),await Hi(ja),await Hi("fcm_vapid_details_db"),await Hi("undefined"),M5(t)?t:null}function M5(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:t}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F5={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","fid-registration-failed":"A problem occurred while creating an FCM registration via FID: {$errorInfo}","fid-unregister-failed":"A problem occurred while unregistering the FCM registration via FID: {$errorInfo}","fid-registration-idb-schema-unavailable":"Unable to read or persist FID registration metadata because the messaging IndexedDB schema is unavailable (for example, the database could not be upgraded to the latest version).","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.","invalid-on-registered-handler":"No onRegistered callback handler was provided or registered. Implement onRegistered() before register()."},ft=new ur("messaging","Messaging",F5);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh="firebase-messaging-database",Mh=2,cr="firebase-messaging-store",Qe="firebase-messaging-fid-registration-store",U5={openDB:Ro,deleteDB:Hi};let Fh=U5,ks=null;function B5(n,t,e){switch(t){case 0:if(n.createObjectStore(cr),e===1)break;case 1:e===2&&n.createObjectStore(Qe)}}function Uh(n){return{upgrade:(t,e)=>{B5(t,e,n)},blocked:()=>{},blocking:(t,e,r)=>{var s;ks=null,(s=r.target)==null||s.close()},terminated:()=>{ks=null}}}function ea(){return ks||(ks=Fh.openDB(Lh,Mh,Uh(2)).catch(()=>Fh.openDB(Lh,Mh-1,Uh(1)))),ks}function sd(n,t){return n.objectStoreNames.contains(t)}function id(n){if(!sd(n,Qe))throw ft.create("fid-registration-idb-schema-unavailable")}async function $5(n){const t=na(n),r=await(await ea()).transaction(cr).objectStore(cr).get(t);if(r)return r;{const s=await L5(n.appConfig.senderId);if(s)return await Vc(n,s),s}}async function Vc(n,t){const e=na(n),r=await ea(),s=[cr],i=sd(r,Qe);i&&s.push(Qe);const o=r.transaction(s,"readwrite");return await o.objectStore(cr).put(t,e),i&&await o.objectStore(Qe).delete(e),await o.done,t}async function od(n){const t=na(n),e=await ea();return id(e),await e.transaction(Qe).objectStore(Qe).get(t)}async function q5(n,t){const e=na(n),r=await ea();id(r);const s=r.transaction([cr,Qe],"readwrite");return await s.objectStore(Qe).put(t,e),await s.objectStore(cr).delete(e),await s.done,t}function na({appConfig:n}){return n.appId}const Bh="@firebase/messaging",T1="0.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H5=3,j5=1e3;async function G5(n,t){const e=await sa(n),r=xc(t,n.appConfig.appName,!1),s={method:"POST",headers:e,body:JSON.stringify(r)};let i;try{i=await(await fetch(ra(n.appConfig),s)).json()}catch(o){throw ft.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw ft.create("token-subscribe-failed",{errorInfo:o})}if(!i.token)throw ft.create("token-subscribe-no-token");return i.token}async function z5(n,t){var u;const e=await sa(n),r=xc(t,n.appConfig.appName,!0),s={method:"POST",headers:e,body:JSON.stringify(r)};let i;try{i=await X5(()=>fetch(ra(n.appConfig),s),H5,j5)}catch(h){throw ft.create("fid-registration-failed",{errorInfo:h==null?void 0:h.toString()})}if(i.ok)return{responseFid:await W5(i)};let o;try{o=await i.json()}catch{throw ft.create("fid-registration-failed",{errorInfo:i.statusText})}const c=((u=o.error)==null?void 0:u.message)??i.statusText;throw ft.create("fid-registration-failed",{errorInfo:c})}async function W5(n){const t=await n.text();if(!t.trim())throw ft.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is empty"});let e;try{e=JSON.parse(t)}catch{throw ft.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is not valid JSON"})}const r=e.name;if(typeof r!="string"||r.length===0)throw ft.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response did not include a non-empty name"});return K5(r)}const $h="/registrations/";function K5(n){const t=n.indexOf($h);if(t!==-1){const e=n.slice(t+$h.length);if(e.length>0)return e}throw ft.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response name is not a valid registration resource name"})}async function Y5(n,t){const e=await sa(n),r=xc(t.subscriptionOptions,n.appConfig.appName,!1),s={method:"PATCH",headers:e,body:JSON.stringify(r)};let i;try{i=await(await fetch(`${ra(n.appConfig)}/${t.token}`,s)).json()}catch(o){throw ft.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw ft.create("token-update-failed",{errorInfo:o})}if(!i.token)throw ft.create("token-update-no-token");return i.token}async function Q5(n,t){const r={method:"DELETE",headers:await sa(n)};try{const i=await(await fetch(`${ra(n.appConfig)}/${t}`,r)).json();if(i.error){const o=i.error.message;throw ft.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw ft.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}async function X5(n,t,e){let r;for(let s=0;s<t;s++)try{return await n()}catch(i){if(r=i,s<t-1){const o=e*Math.pow(2,s);await new Promise(c=>setTimeout(c,o))}}throw r}function ra({projectId:n}){return`${O5}/projects/${n}/registrations`}async function sa({appConfig:n,installations:t}){const e=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${e}`})}function J5(n,t){var e,r;try{if(/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(n))return new URL(n).host}catch{}try{if(typeof self<"u"&&((e=self.location)!=null&&e.href))return new URL(n,self.location.origin).host}catch{}return typeof self<"u"&&((r=self.location)!=null&&r.host)?self.location.host:t}function xc({p256dh:n,auth:t,endpoint:e,vapidKey:r,swScope:s},i,o){const c={web:{origin:J5(s,i),endpoint:e,auth:t,p256dh:n}};return o&&(c.fcm_sdk_version=T1),r!==ed&&(c.web.applicationPubKey=r),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z5=10080*60*1e3;async function t_(n){const t=await n_(n.swRegistration,n.vapidKey),e={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:t.endpoint,auth:Te(t.getKey("auth")),p256dh:Te(t.getKey("p256dh"))},r=await $5(n.firebaseDependencies);if(r){if(r_(r.subscriptionOptions,e))return Date.now()>=r.createTime+Z5?e_(n,{token:r.token,createTime:Date.now(),subscriptionOptions:e}):r.token;try{await Q5(n.firebaseDependencies,r.token)}catch(s){console.warn(s)}return qh(n.firebaseDependencies,e)}else return qh(n.firebaseDependencies,e)}async function e_(n,t){try{const e=await Y5(n.firebaseDependencies,t),r={...t,token:e,createTime:Date.now()};return await Vc(n.firebaseDependencies,r),e}catch(e){throw e}}async function qh(n,t){const r={token:await G5(n,t),createTime:Date.now(),subscriptionOptions:t};return await Vc(n,r),r.token}async function n_(n,t){const e=await n.pushManager.getSubscription();return e||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:rd(t)})}function r_(n,t){const e=t.vapidKey===n.vapidKey,r=t.endpoint===n.endpoint,s=t.auth===n.auth,i=t.p256dh===n.p256dh;return e&&r&&s&&i}function s_(n,t){const e=n.onRegisteredHandler;e&&(typeof e=="function"?e(t):e.next(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function i_(n){try{n.swRegistration=await navigator.serviceWorker.register(b5,{scope:N5}),n.swRegistration.update().catch(()=>{}),await o_(n.swRegistration)}catch(t){throw ft.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}async function o_(n){return new Promise((t,e)=>{const r=setTimeout(()=>e(new Error(`Service worker not registered after ${kh} ms`)),kh),s=n.installing||n.waiting;n.active?(clearTimeout(r),t()):s?s.onstatechange=i=>{var o;((o=i.target)==null?void 0:o.state)==="activated"&&(s.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),e(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ad(n,t){if(!t&&!n.swRegistration&&await i_(n),!(!t&&n.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw ft.create("invalid-sw-registration");n.swRegistration=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cd(n,t){t?n.vapidKey=t:n.vapidKey||(n.vapidKey=ed)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh=3;async function a_(n,t){const e=await c_(n.swRegistration,n.vapidKey),r={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:Te(e.getKey("auth")),p256dh:Te(e.getKey("p256dh"))},s=n.firebaseDependencies.installations;for(let i=0;i<Hh;i++){const{responseFid:o}=await z5(n.firebaseDependencies,r);if(o===t)return;i<Hh-1&&await s.getToken(!0)}throw ft.create("fid-registration-failed",{errorInfo:"CreateRegistration response FID does not match Firebase Installation ID"})}async function c_(n,t){const e=await n.pushManager.getSubscription();return e||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:rd(t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_=10080*60*1e3;async function ud(n,t){if(!navigator)throw ft.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ft.create("permission-blocked");if(!n.onRegisteredHandler)throw ft.create("invalid-on-registered-handler");await cd(n,t==null?void 0:t.vapidKey),await ad(n,t==null?void 0:t.serviceWorkerRegistration);const e=n._registerNotifyChain.catch(()=>{});return n._registerNotifyChain=e.then(async()=>{const r=await n.firebaseDependencies.installations.getId(),s=await od(n.firebaseDependencies),i=Date.now();if((!s||s.fid!==r||i>=s.lastRegisterTime+u_)&&(await a_(n,r),await q5(n.firebaseDependencies,{fid:r,lastRegisterTime:i,vapidKey:n.vapidKey})),!n.onRegisteredHandler)throw ft.create("invalid-on-registered-handler");s_(n,r)}),n._registerNotifyChain}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l_(n,t){return A5(t,()=>{(async()=>!n.onRegisteredHandler||!await od(n.firebaseDependencies)||await ud(n).catch(()=>{}))()})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jh(n){const t={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return h_(t,n),f_(t,n),d_(t,n),t}function h_(n,t){if(!t.notification)return;n.notification={};const e=t.notification.title;e&&(n.notification.title=e);const r=t.notification.body;r&&(n.notification.body=r);const s=t.notification.image;s&&(n.notification.image=s);const i=t.notification.icon;i&&(n.notification.icon=i)}function f_(n,t){t.data&&(n.data=t.data)}function d_(n,t){var s,i,o,c;if(!t.fcmOptions&&!((s=t.notification)!=null&&s.click_action))return;n.fcmOptions={};const e=((i=t.fcmOptions)==null?void 0:i.link)??((o=t.notification)==null?void 0:o.click_action);e&&(n.fcmOptions.link=e);const r=(c=t.fcmOptions)==null?void 0:c.analytics_label;r&&(n.fcmOptions.analyticsLabel=r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p_(n){return typeof n=="object"&&!!n&&nd in n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(n){if(!n||!n.options)throw Ga("App Configuration Object");if(!n.name)throw Ga("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:e}=n;for(const r of t)if(!e[r])throw Ga(r);return{appName:n.name,projectId:e.projectId,apiKey:e.apiKey,appId:e.appId,senderId:e.messagingSenderId}}function Ga(n){return ft.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m_{constructor(t,e,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.onRegisteredHandler=null,this.onUnregisteredHandler=null,this._registerNotifyChain=Promise.resolve(),this._fidChangeUnsubscribe=null,this.logEvents=[],this.logQueue={state:"stopped"};const s=g_(t);this.firebaseDependencies={app:t,appConfig:s,installations:e,analyticsProvider:r}}_delete(){return this._fidChangeUnsubscribe&&(this._fidChangeUnsubscribe(),this._fidChangeUnsubscribe=null),this.logQueue.state==="scheduled"&&clearTimeout(this.logQueue.timerId),this.logQueue={state:"stopped"},Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function __(n,t){if(!navigator)throw ft.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ft.create("permission-blocked");return await cd(n,t==null?void 0:t.vapidKey),await ad(n,t==null?void 0:t.serviceWorkerRegistration),t_(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function y_(n,t,e){const r=E_(t);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:e[nd],message_name:e[D5],message_time:e[k5],message_device_time:Math.floor(Date.now()/1e3)})}function E_(n){switch(n){case Fr.NOTIFICATION_CLICKED:return"notification_open";case Fr.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function w_(n,t){const e=t.data;if(!e.isFirebaseMessaging)return;if(n.onMessageHandler&&e.messageType===Fr.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(jh(e)):n.onMessageHandler.next(jh(e))),n.onRegisteredHandler&&e.messageType===Fr.FID_REGISTERED){const s=e.fid;typeof n.onRegisteredHandler=="function"?n.onRegisteredHandler(s):n.onRegisteredHandler.next(s)}const r=e.data;p_(r)&&r[V5]==="1"&&await y_(n,e.messageType,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T_=n=>{const t=new m_(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>w_(t,e)),t._fidChangeUnsubscribe=l_(t,n.getProvider("installations").getImmediate()),t},I_=n=>{const t=n.getProvider("messaging").getImmediate();return{getToken:r=>__(t,r),register:r=>ud(t,r)}};function A_(){Ve(new ve("messaging",T_,"PUBLIC")),Ve(new ve("messaging-internal",I_,"PRIVATE")),_e(Bh,T1),_e(Bh,T1,"esm2020")}A_();export{x_ as A,J_ as B,V_ as C,gn as G,dp as a,O_ as b,B_ as c,S_ as d,D9 as e,C_ as f,R_ as g,N_ as h,fp as i,k_ as j,X_ as k,j_ as l,b_ as m,K_ as n,H_ as o,L_ as p,$_ as q,G_ as r,W_ as s,z_ as t,P_ as u,Y_ as v,q_ as w,M_ as x,Q_ as y,F_ as z};
