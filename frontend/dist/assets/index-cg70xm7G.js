(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Zo(t,e){const n=new Set(t.split(","));return e?s=>n.has(s.toLowerCase()):s=>n.has(s)}const pe={},jn=[],it=()=>{},yf=()=>!1,Xi=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),el=t=>t.startsWith("onUpdate:"),ke=Object.assign,tl=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},bf=Object.prototype.hasOwnProperty,J=(t,e)=>bf.call(t,e),V=Array.isArray,Kn=t=>Zi(t)==="[object Map]",du=t=>Zi(t)==="[object Set]",K=t=>typeof t=="function",Ce=t=>typeof t=="string",ls=t=>typeof t=="symbol",ye=t=>t!==null&&typeof t=="object",fu=t=>(ye(t)||K(t))&&K(t.then)&&K(t.catch),pu=Object.prototype.toString,Zi=t=>pu.call(t),wf=t=>Zi(t).slice(8,-1),_u=t=>Zi(t)==="[object Object]",nl=t=>Ce(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,bi=Zo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),er=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Ef=/-(\w)/g,Nt=er(t=>t.replace(Ef,(e,n)=>n?n.toUpperCase():"")),Cf=/\B([A-Z])/g,as=er(t=>t.replace(Cf,"-$1").toLowerCase()),tr=er(t=>t.charAt(0).toUpperCase()+t.slice(1)),Fr=er(t=>t?`on${tr(t)}`:""),rn=(t,e)=>!Object.is(t,e),wi=(t,e)=>{for(let n=0;n<t.length;n++)t[n](e)},Ni=(t,e,n)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,value:n})},oo=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let ga;const gu=()=>ga||(ga=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function sl(t){if(V(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],i=Ce(s)?Rf(s):sl(s);if(i)for(const r in i)e[r]=i[r]}return e}else if(Ce(t)||ye(t))return t}const Sf=/;(?![^(]*\))/g,If=/:([^]+)/,Tf=/\/\*[^]*?\*\//g;function Rf(t){const e={};return t.replace(Tf,"").split(Sf).forEach(n=>{if(n){const s=n.split(If);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function il(t){let e="";if(Ce(t))e=t;else if(V(t))for(let n=0;n<t.length;n++){const s=il(t[n]);s&&(e+=s+" ")}else if(ye(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Nf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Pf=Zo(Nf);function mu(t){return!!t||t===""}const _t=t=>Ce(t)?t:t==null?"":V(t)||ye(t)&&(t.toString===pu||!K(t.toString))?JSON.stringify(t,vu,2):String(t),vu=(t,e)=>e&&e.__v_isRef?vu(t,e.value):Kn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,i],r)=>(n[$r(s,r)+" =>"]=i,n),{})}:du(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>$r(n))}:ls(e)?$r(e):ye(e)&&!V(e)&&!_u(e)?String(e):e,$r=(t,e="")=>{var n;return ls(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ht;class yu{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ht,!e&&ht&&(this.index=(ht.scopes||(ht.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const n=ht;try{return ht=this,e()}finally{ht=n}}}on(){ht=this}off(){ht=this.parent}stop(e){if(this._active){let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.scopes)for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this._active=!1}}}function xf(t){return new yu(t)}function Af(t,e=ht){e&&e.active&&e.effects.push(t)}function kf(){return ht}let En;class rl{constructor(e,n,s,i){this.fn=e,this.trigger=n,this.scheduler=s,this.active=!0,this.deps=[],this._dirtyLevel=2,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,Af(this,i)}get dirty(){if(this._dirtyLevel===1){An();for(let e=0;e<this._depsLength;e++){const n=this.deps[e];if(n.computed&&(Of(n.computed),this._dirtyLevel>=2))break}this._dirtyLevel<2&&(this._dirtyLevel=0),kn()}return this._dirtyLevel>=2}set dirty(e){this._dirtyLevel=e?2:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=Jt,n=En;try{return Jt=!0,En=this,this._runnings++,ma(this),this.fn()}finally{va(this),this._runnings--,En=n,Jt=e}}stop(){var e;this.active&&(ma(this),va(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function Of(t){return t.value}function ma(t){t._trackId++,t._depsLength=0}function va(t){if(t.deps&&t.deps.length>t._depsLength){for(let e=t._depsLength;e<t.deps.length;e++)bu(t.deps[e],t);t.deps.length=t._depsLength}}function bu(t,e){const n=t.get(e);n!==void 0&&e._trackId!==n&&(t.delete(e),t.size===0&&t.cleanup())}let Jt=!0,lo=0;const wu=[];function An(){wu.push(Jt),Jt=!1}function kn(){const t=wu.pop();Jt=t===void 0?!0:t}function ol(){lo++}function ll(){for(lo--;!lo&&ao.length;)ao.shift()()}function Eu(t,e,n){if(e.get(t)!==t._trackId){e.set(t,t._trackId);const s=t.deps[t._depsLength];s!==e?(s&&bu(s,t),t.deps[t._depsLength++]=e):t._depsLength++}}const ao=[];function Cu(t,e,n){ol();for(const s of t.keys())if(s._dirtyLevel<e&&t.get(s)===s._trackId){const i=s._dirtyLevel;s._dirtyLevel=e,i===0&&(s._shouldSchedule=!0,s.trigger())}Su(t),ll()}function Su(t){for(const e of t.keys())e.scheduler&&e._shouldSchedule&&(!e._runnings||e.allowRecurse)&&t.get(e)===e._trackId&&(e._shouldSchedule=!1,ao.push(e.scheduler))}const Iu=(t,e)=>{const n=new Map;return n.cleanup=t,n.computed=e,n},co=new WeakMap,Cn=Symbol(""),uo=Symbol("");function qe(t,e,n){if(Jt&&En){let s=co.get(t);s||co.set(t,s=new Map);let i=s.get(n);i||s.set(n,i=Iu(()=>s.delete(n))),Eu(En,i)}}function Dt(t,e,n,s,i,r){const o=co.get(t);if(!o)return;let l=[];if(e==="clear")l=[...o.values()];else if(n==="length"&&V(t)){const a=Number(s);o.forEach((c,u)=>{(u==="length"||!ls(u)&&u>=a)&&l.push(c)})}else switch(n!==void 0&&l.push(o.get(n)),e){case"add":V(t)?nl(n)&&l.push(o.get("length")):(l.push(o.get(Cn)),Kn(t)&&l.push(o.get(uo)));break;case"delete":V(t)||(l.push(o.get(Cn)),Kn(t)&&l.push(o.get(uo)));break;case"set":Kn(t)&&l.push(o.get(Cn));break}ol();for(const a of l)a&&Cu(a,2);ll()}const Df=Zo("__proto__,__v_isRef,__isVue"),Tu=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(ls)),ya=Mf();function Mf(){const t={};return["includes","indexOf","lastIndexOf"].forEach(e=>{t[e]=function(...n){const s=ee(this);for(let r=0,o=this.length;r<o;r++)qe(s,"get",r+"");const i=s[e](...n);return i===-1||i===!1?s[e](...n.map(ee)):i}}),["push","pop","shift","unshift","splice"].forEach(e=>{t[e]=function(...n){An(),ol();const s=ee(this)[e].apply(this,n);return ll(),kn(),s}}),t}function Lf(t){const e=ee(this);return qe(e,"has",t),e.hasOwnProperty(t)}class Ru{constructor(e=!1,n=!1){this._isReadonly=e,this._shallow=n}get(e,n,s){const i=this._isReadonly,r=this._shallow;if(n==="__v_isReactive")return!i;if(n==="__v_isReadonly")return i;if(n==="__v_isShallow")return r;if(n==="__v_raw")return s===(i?r?Qf:Au:r?xu:Pu).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=V(e);if(!i){if(o&&J(ya,n))return Reflect.get(ya,n,s);if(n==="hasOwnProperty")return Lf}const l=Reflect.get(e,n,s);return(ls(n)?Tu.has(n):Df(n))||(i||qe(e,"get",n),r)?l:Qe(l)?o&&nl(n)?l:l.value:ye(l)?i?Ou(l):sr(l):l}}class Nu extends Ru{constructor(e=!1){super(!1,e)}set(e,n,s,i){let r=e[n];if(!this._shallow){const a=Jn(r);if(!Pi(s)&&!Jn(s)&&(r=ee(r),s=ee(s)),!V(e)&&Qe(r)&&!Qe(s))return a?!1:(r.value=s,!0)}const o=V(e)&&nl(n)?Number(n)<e.length:J(e,n),l=Reflect.set(e,n,s,i);return e===ee(i)&&(o?rn(s,r)&&Dt(e,"set",n,s):Dt(e,"add",n,s)),l}deleteProperty(e,n){const s=J(e,n);e[n];const i=Reflect.deleteProperty(e,n);return i&&s&&Dt(e,"delete",n,void 0),i}has(e,n){const s=Reflect.has(e,n);return(!ls(n)||!Tu.has(n))&&qe(e,"has",n),s}ownKeys(e){return qe(e,"iterate",V(e)?"length":Cn),Reflect.ownKeys(e)}}class Ff extends Ru{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const $f=new Nu,Bf=new Ff,Wf=new Nu(!0),al=t=>t,nr=t=>Reflect.getPrototypeOf(t);function di(t,e,n=!1,s=!1){t=t.__v_raw;const i=ee(t),r=ee(e);n||(rn(e,r)&&qe(i,"get",e),qe(i,"get",r));const{has:o}=nr(i),l=s?al:n?dl:Os;if(o.call(i,e))return l(t.get(e));if(o.call(i,r))return l(t.get(r));t!==i&&t.get(e)}function fi(t,e=!1){const n=this.__v_raw,s=ee(n),i=ee(t);return e||(rn(t,i)&&qe(s,"has",t),qe(s,"has",i)),t===i?n.has(t):n.has(t)||n.has(i)}function pi(t,e=!1){return t=t.__v_raw,!e&&qe(ee(t),"iterate",Cn),Reflect.get(t,"size",t)}function ba(t){t=ee(t);const e=ee(this);return nr(e).has.call(e,t)||(e.add(t),Dt(e,"add",t,t)),this}function wa(t,e){e=ee(e);const n=ee(this),{has:s,get:i}=nr(n);let r=s.call(n,t);r||(t=ee(t),r=s.call(n,t));const o=i.call(n,t);return n.set(t,e),r?rn(e,o)&&Dt(n,"set",t,e):Dt(n,"add",t,e),this}function Ea(t){const e=ee(this),{has:n,get:s}=nr(e);let i=n.call(e,t);i||(t=ee(t),i=n.call(e,t)),s&&s.call(e,t);const r=e.delete(t);return i&&Dt(e,"delete",t,void 0),r}function Ca(){const t=ee(this),e=t.size!==0,n=t.clear();return e&&Dt(t,"clear",void 0,void 0),n}function _i(t,e){return function(s,i){const r=this,o=r.__v_raw,l=ee(o),a=e?al:t?dl:Os;return!t&&qe(l,"iterate",Cn),o.forEach((c,u)=>s.call(i,a(c),a(u),r))}}function gi(t,e,n){return function(...s){const i=this.__v_raw,r=ee(i),o=Kn(r),l=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,c=i[t](...s),u=n?al:e?dl:Os;return!e&&qe(r,"iterate",a?uo:Cn),{next(){const{value:h,done:d}=c.next();return d?{value:h,done:d}:{value:l?[u(h[0]),u(h[1])]:u(h),done:d}},[Symbol.iterator](){return this}}}}function Ht(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Uf(){const t={get(r){return di(this,r)},get size(){return pi(this)},has:fi,add:ba,set:wa,delete:Ea,clear:Ca,forEach:_i(!1,!1)},e={get(r){return di(this,r,!1,!0)},get size(){return pi(this)},has:fi,add:ba,set:wa,delete:Ea,clear:Ca,forEach:_i(!1,!0)},n={get(r){return di(this,r,!0)},get size(){return pi(this,!0)},has(r){return fi.call(this,r,!0)},add:Ht("add"),set:Ht("set"),delete:Ht("delete"),clear:Ht("clear"),forEach:_i(!0,!1)},s={get(r){return di(this,r,!0,!0)},get size(){return pi(this,!0)},has(r){return fi.call(this,r,!0)},add:Ht("add"),set:Ht("set"),delete:Ht("delete"),clear:Ht("clear"),forEach:_i(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=gi(r,!1,!1),n[r]=gi(r,!0,!1),e[r]=gi(r,!1,!0),s[r]=gi(r,!0,!0)}),[t,n,e,s]}const[Vf,Hf,jf,Kf]=Uf();function cl(t,e){const n=e?t?Kf:jf:t?Hf:Vf;return(s,i,r)=>i==="__v_isReactive"?!t:i==="__v_isReadonly"?t:i==="__v_raw"?s:Reflect.get(J(n,i)&&i in s?n:s,i,r)}const zf={get:cl(!1,!1)},Gf={get:cl(!1,!0)},qf={get:cl(!0,!1)},Pu=new WeakMap,xu=new WeakMap,Au=new WeakMap,Qf=new WeakMap;function Yf(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Jf(t){return t.__v_skip||!Object.isExtensible(t)?0:Yf(wf(t))}function sr(t){return Jn(t)?t:ul(t,!1,$f,zf,Pu)}function ku(t){return ul(t,!1,Wf,Gf,xu)}function Ou(t){return ul(t,!0,Bf,qf,Au)}function ul(t,e,n,s,i){if(!ye(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const r=i.get(t);if(r)return r;const o=Jf(t);if(o===0)return t;const l=new Proxy(t,o===2?s:n);return i.set(t,l),l}function zn(t){return Jn(t)?zn(t.__v_raw):!!(t&&t.__v_isReactive)}function Jn(t){return!!(t&&t.__v_isReadonly)}function Pi(t){return!!(t&&t.__v_isShallow)}function Du(t){return zn(t)||Jn(t)}function ee(t){const e=t&&t.__v_raw;return e?ee(e):t}function hl(t){return Ni(t,"__v_skip",!0),t}const Os=t=>ye(t)?sr(t):t,dl=t=>ye(t)?Ou(t):t;class Mu{constructor(e,n,s,i){this._setter=n,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new rl(()=>e(this._value),()=>Ei(this,1),()=>this.dep&&Su(this.dep)),this.effect.computed=this,this.effect.active=this._cacheable=!i,this.__v_isReadonly=s}get value(){const e=ee(this);return(!e._cacheable||e.effect.dirty)&&rn(e._value,e._value=e.effect.run())&&Ei(e,2),Lu(e),e.effect._dirtyLevel>=1&&Ei(e,1),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function Xf(t,e,n=!1){let s,i;const r=K(t);return r?(s=t,i=it):(s=t.get,i=t.set),new Mu(s,i,r||!i,n)}function Lu(t){Jt&&En&&(t=ee(t),Eu(En,t.dep||(t.dep=Iu(()=>t.dep=void 0,t instanceof Mu?t:void 0))))}function Ei(t,e=2,n){t=ee(t);const s=t.dep;s&&Cu(s,e)}function Qe(t){return!!(t&&t.__v_isRef===!0)}function cs(t){return Fu(t,!1)}function Zf(t){return Fu(t,!0)}function Fu(t,e){return Qe(t)?t:new ep(t,e)}class ep{constructor(e,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?e:ee(e),this._value=n?e:Os(e)}get value(){return Lu(this),this._value}set value(e){const n=this.__v_isShallow||Pi(e)||Jn(e);e=n?e:ee(e),rn(e,this._rawValue)&&(this._rawValue=e,this._value=n?e:Os(e),Ei(this,2))}}function Gn(t){return Qe(t)?t.value:t}const tp={get:(t,e,n)=>Gn(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const i=t[e];return Qe(i)&&!Qe(n)?(i.value=n,!0):Reflect.set(t,e,n,s)}};function $u(t){return zn(t)?t:new Proxy(t,tp)}/**
* @vue/runtime-core v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Xt(t,e,n,s){let i;try{i=s?t(...s):t()}catch(r){ir(r,e,n)}return i}function gt(t,e,n,s){if(K(t)){const r=Xt(t,e,n,s);return r&&fu(r)&&r.catch(o=>{ir(o,e,n)}),r}const i=[];for(let r=0;r<t.length;r++)i.push(gt(t[r],e,n,s));return i}function ir(t,e,n,s=!0){const i=e?e.vnode:null;if(e){let r=e.parent;const o=e.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){const c=r.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](t,o,l)===!1)return}r=r.parent}const a=e.appContext.config.errorHandler;if(a){Xt(a,null,10,[t,o,l]);return}}np(t,n,i,s)}function np(t,e,n,s=!0){console.error(t)}let Ds=!1,ho=!1;const De=[];let Tt=0;const qn=[];let Kt=null,yn=0;const Bu=Promise.resolve();let fl=null;function Wu(t){const e=fl||Bu;return t?e.then(this?t.bind(this):t):e}function sp(t){let e=Tt+1,n=De.length;for(;e<n;){const s=e+n>>>1,i=De[s],r=Ms(i);r<t||r===t&&i.pre?e=s+1:n=s}return e}function pl(t){(!De.length||!De.includes(t,Ds&&t.allowRecurse?Tt+1:Tt))&&(t.id==null?De.push(t):De.splice(sp(t.id),0,t),Uu())}function Uu(){!Ds&&!ho&&(ho=!0,fl=Bu.then(Hu))}function ip(t){const e=De.indexOf(t);e>Tt&&De.splice(e,1)}function rp(t){V(t)?qn.push(...t):(!Kt||!Kt.includes(t,t.allowRecurse?yn+1:yn))&&qn.push(t),Uu()}function Sa(t,e,n=Ds?Tt+1:0){for(;n<De.length;n++){const s=De[n];if(s&&s.pre){if(t&&s.id!==t.uid)continue;De.splice(n,1),n--,s()}}}function Vu(t){if(qn.length){const e=[...new Set(qn)].sort((n,s)=>Ms(n)-Ms(s));if(qn.length=0,Kt){Kt.push(...e);return}for(Kt=e,yn=0;yn<Kt.length;yn++)Kt[yn]();Kt=null,yn=0}}const Ms=t=>t.id==null?1/0:t.id,op=(t,e)=>{const n=Ms(t)-Ms(e);if(n===0){if(t.pre&&!e.pre)return-1;if(e.pre&&!t.pre)return 1}return n};function Hu(t){ho=!1,Ds=!0,De.sort(op);try{for(Tt=0;Tt<De.length;Tt++){const e=De[Tt];e&&e.active!==!1&&Xt(e,null,14)}}finally{Tt=0,De.length=0,Vu(),Ds=!1,fl=null,(De.length||qn.length)&&Hu()}}function lp(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||pe;let i=n;const r=e.startsWith("update:"),o=r&&e.slice(7);if(o&&o in s){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:h,trim:d}=s[u]||pe;d&&(i=n.map(_=>Ce(_)?_.trim():_)),h&&(i=n.map(oo))}let l,a=s[l=Fr(e)]||s[l=Fr(Nt(e))];!a&&r&&(a=s[l=Fr(as(e))]),a&&gt(a,t,6,i);const c=s[l+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,gt(c,t,6,i)}}function ju(t,e,n=!1){const s=e.emitsCache,i=s.get(t);if(i!==void 0)return i;const r=t.emits;let o={},l=!1;if(!K(t)){const a=c=>{const u=ju(c,e,!0);u&&(l=!0,ke(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!r&&!l?(ye(t)&&s.set(t,null),null):(V(r)?r.forEach(a=>o[a]=null):ke(o,r),ye(t)&&s.set(t,o),o)}function rr(t,e){return!t||!Xi(e)?!1:(e=e.slice(2).replace(/Once$/,""),J(t,e[0].toLowerCase()+e.slice(1))||J(t,as(e))||J(t,e))}let Ke=null,or=null;function xi(t){const e=Ke;return Ke=t,or=t&&t.type.__scopeId||null,e}function _l(t){or=t}function gl(){or=null}function j(t,e=Ke,n){if(!e||t._n)return t;const s=(...i)=>{s._d&&Ma(-1);const r=xi(e);let o;try{o=t(...i)}finally{xi(r),s._d&&Ma(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function Br(t){const{type:e,vnode:n,proxy:s,withProxy:i,props:r,propsOptions:[o],slots:l,attrs:a,emit:c,render:u,renderCache:h,data:d,setupState:_,ctx:m,inheritAttrs:T}=t;let x,O;const W=xi(t);try{if(n.shapeFlag&4){const X=i||s,we=X;x=It(u.call(we,X,h,r,_,d,m)),O=a}else{const X=e;x=It(X.length>1?X(r,{attrs:a,slots:l,emit:c}):X(r,null)),O=e.props?a:ap(a)}}catch(X){Ts.length=0,ir(X,t,1),x=D(In)}let U=x;if(O&&T!==!1){const X=Object.keys(O),{shapeFlag:we}=U;X.length&&we&7&&(o&&X.some(el)&&(O=cp(O,o)),U=Xn(U,O))}return n.dirs&&(U=Xn(U),U.dirs=U.dirs?U.dirs.concat(n.dirs):n.dirs),n.transition&&(U.transition=n.transition),x=U,xi(W),x}const ap=t=>{let e;for(const n in t)(n==="class"||n==="style"||Xi(n))&&((e||(e={}))[n]=t[n]);return e},cp=(t,e)=>{const n={};for(const s in t)(!el(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function up(t,e,n){const{props:s,children:i,component:r}=t,{props:o,children:l,patchFlag:a}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return s?Ia(s,o,c):!!o;if(a&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(o[d]!==s[d]&&!rr(c,d))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Ia(s,o,c):!0:!!o;return!1}function Ia(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(e[r]!==t[r]&&!rr(n,r))return!0}return!1}function hp({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const Ku="components";function de(t,e){return fp(Ku,t,!0,e)||t}const dp=Symbol.for("v-ndc");function fp(t,e,n=!0,s=!1){const i=Ke||Me;if(i){const r=i.type;if(t===Ku){const l=o_(r,!1);if(l&&(l===e||l===Nt(e)||l===tr(Nt(e))))return r}const o=Ta(i[t]||r[t],e)||Ta(i.appContext[t],e);return!o&&s?r:o}}function Ta(t,e){return t&&(t[e]||t[Nt(e)]||t[tr(Nt(e))])}const pp=t=>t.__isSuspense;function _p(t,e){e&&e.pendingBranch?V(t)?e.effects.push(...t):e.effects.push(t):rp(t)}const gp=Symbol.for("v-scx"),mp=()=>Mt(gp),mi={};function Ci(t,e,n){return zu(t,e,n)}function zu(t,e,{immediate:n,deep:s,flush:i,once:r,onTrack:o,onTrigger:l}=pe){if(e&&r){const z=e;e=(...Fe)=>{z(...Fe),we()}}const a=Me,c=z=>s===!0?z:bn(z,s===!1?1:void 0);let u,h=!1,d=!1;if(Qe(t)?(u=()=>t.value,h=Pi(t)):zn(t)?(u=()=>c(t),h=!0):V(t)?(d=!0,h=t.some(z=>zn(z)||Pi(z)),u=()=>t.map(z=>{if(Qe(z))return z.value;if(zn(z))return c(z);if(K(z))return Xt(z,a,2)})):K(t)?e?u=()=>Xt(t,a,2):u=()=>(_&&_(),gt(t,a,3,[m])):u=it,e&&s){const z=u;u=()=>bn(z())}let _,m=z=>{_=U.onStop=()=>{Xt(z,a,4),_=U.onStop=void 0}},T;if(ur)if(m=it,e?n&&gt(e,a,3,[u(),d?[]:void 0,m]):u(),i==="sync"){const z=mp();T=z.__watcherHandles||(z.__watcherHandles=[])}else return it;let x=d?new Array(t.length).fill(mi):mi;const O=()=>{if(!(!U.active||!U.dirty))if(e){const z=U.run();(s||h||(d?z.some((Fe,nt)=>rn(Fe,x[nt])):rn(z,x)))&&(_&&_(),gt(e,a,3,[z,x===mi?void 0:d&&x[0]===mi?[]:x,m]),x=z)}else U.run()};O.allowRecurse=!!e;let W;i==="sync"?W=O:i==="post"?W=()=>Ve(O,a&&a.suspense):(O.pre=!0,a&&(O.id=a.uid),W=()=>pl(O));const U=new rl(u,it,W),X=kf(),we=()=>{U.stop(),X&&tl(X.effects,U)};return e?n?O():x=U.run():i==="post"?Ve(U.run.bind(U),a&&a.suspense):U.run(),T&&T.push(we),we}function vp(t,e,n){const s=this.proxy,i=Ce(t)?t.includes(".")?Gu(s,t):()=>s[t]:t.bind(s,s);let r;K(e)?r=e:(r=e.handler,n=e);const o=ei(this),l=zu(i,r.bind(s),n);return o(),l}function Gu(t,e){const n=e.split(".");return()=>{let s=t;for(let i=0;i<n.length&&s;i++)s=s[n[i]];return s}}function bn(t,e,n=0,s){if(!ye(t)||t.__v_skip)return t;if(e&&e>0){if(n>=e)return t;n++}if(s=s||new Set,s.has(t))return t;if(s.add(t),Qe(t))bn(t.value,e,n,s);else if(V(t))for(let i=0;i<t.length;i++)bn(t[i],e,n,s);else if(du(t)||Kn(t))t.forEach(i=>{bn(i,e,n,s)});else if(_u(t))for(const i in t)bn(t[i],e,n,s);return t}function ml(t,e){if(Ke===null)return t;const n=hr(Ke)||Ke.proxy,s=t.dirs||(t.dirs=[]);for(let i=0;i<e.length;i++){let[r,o,l,a=pe]=e[i];r&&(K(r)&&(r={mounted:r,updated:r}),r.deep&&bn(o),s.push({dir:r,instance:n,value:o,oldValue:void 0,arg:l,modifiers:a}))}return t}function _n(t,e,n,s){const i=t.dirs,r=e&&e.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let a=l.dir[s];a&&(An(),gt(a,n,8,[t.el,l,t,e]),kn())}}/*! #__NO_SIDE_EFFECTS__ */function qu(t,e){return K(t)?ke({name:t.name},e,{setup:t}):t}const Si=t=>!!t.type.__asyncLoader,Qu=t=>t.type.__isKeepAlive;function yp(t,e){Yu(t,"a",e)}function bp(t,e){Yu(t,"da",e)}function Yu(t,e,n=Me){const s=t.__wdc||(t.__wdc=()=>{let i=n;for(;i;){if(i.isDeactivated)return;i=i.parent}return t()});if(lr(e,s,n),n){let i=n.parent;for(;i&&i.parent;)Qu(i.parent.vnode)&&wp(s,e,n,i),i=i.parent}}function wp(t,e,n,s){const i=lr(e,t,s,!0);Ju(()=>{tl(s[e],i)},n)}function lr(t,e,n=Me,s=!1){if(n){const i=n[t]||(n[t]=[]),r=e.__weh||(e.__weh=(...o)=>{if(n.isUnmounted)return;An();const l=ei(n),a=gt(e,n,t,o);return l(),kn(),a});return s?i.unshift(r):i.push(r),r}}const Wt=t=>(e,n=Me)=>(!ur||t==="sp")&&lr(t,(...s)=>e(...s),n),Ep=Wt("bm"),Cp=Wt("m"),Sp=Wt("bu"),Ip=Wt("u"),Tp=Wt("bum"),Ju=Wt("um"),Rp=Wt("sp"),Np=Wt("rtg"),Pp=Wt("rtc");function xp(t,e=Me){lr("ec",t,e)}function Ls(t,e,n,s){let i;const r=n&&n[s];if(V(t)||Ce(t)){i=new Array(t.length);for(let o=0,l=t.length;o<l;o++)i[o]=e(t[o],o,void 0,r&&r[o])}else if(typeof t=="number"){i=new Array(t);for(let o=0;o<t;o++)i[o]=e(o+1,o,void 0,r&&r[o])}else if(ye(t))if(t[Symbol.iterator])i=Array.from(t,(o,l)=>e(o,l,void 0,r&&r[l]));else{const o=Object.keys(t);i=new Array(o.length);for(let l=0,a=o.length;l<a;l++){const c=o[l];i[l]=e(t[c],c,l,r&&r[l])}}else i=[];return n&&(n[s]=i),i}const fo=t=>t?hh(t)?hr(t)||t.proxy:fo(t.parent):null,Is=ke(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>fo(t.parent),$root:t=>fo(t.root),$emit:t=>t.emit,$options:t=>vl(t),$forceUpdate:t=>t.f||(t.f=()=>{t.effect.dirty=!0,pl(t.update)}),$nextTick:t=>t.n||(t.n=Wu.bind(t.proxy)),$watch:t=>vp.bind(t)}),Wr=(t,e)=>t!==pe&&!t.__isScriptSetup&&J(t,e),Ap={get({_:t},e){const{ctx:n,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:a}=t;let c;if(e[0]!=="$"){const _=o[e];if(_!==void 0)switch(_){case 1:return s[e];case 2:return i[e];case 4:return n[e];case 3:return r[e]}else{if(Wr(s,e))return o[e]=1,s[e];if(i!==pe&&J(i,e))return o[e]=2,i[e];if((c=t.propsOptions[0])&&J(c,e))return o[e]=3,r[e];if(n!==pe&&J(n,e))return o[e]=4,n[e];po&&(o[e]=0)}}const u=Is[e];let h,d;if(u)return e==="$attrs"&&qe(t,"get",e),u(t);if((h=l.__cssModules)&&(h=h[e]))return h;if(n!==pe&&J(n,e))return o[e]=4,n[e];if(d=a.config.globalProperties,J(d,e))return d[e]},set({_:t},e,n){const{data:s,setupState:i,ctx:r}=t;return Wr(i,e)?(i[e]=n,!0):s!==pe&&J(s,e)?(s[e]=n,!0):J(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(r[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:i,propsOptions:r}},o){let l;return!!n[o]||t!==pe&&J(t,o)||Wr(e,o)||(l=r[0])&&J(l,o)||J(s,o)||J(Is,o)||J(i.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:J(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Ra(t){return V(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let po=!0;function kp(t){const e=vl(t),n=t.proxy,s=t.ctx;po=!1,e.beforeCreate&&Na(e.beforeCreate,t,"bc");const{data:i,computed:r,methods:o,watch:l,provide:a,inject:c,created:u,beforeMount:h,mounted:d,beforeUpdate:_,updated:m,activated:T,deactivated:x,beforeDestroy:O,beforeUnmount:W,destroyed:U,unmounted:X,render:we,renderTracked:z,renderTriggered:Fe,errorCaptured:nt,serverPrefetch:Ln,expose:bt,inheritAttrs:Ut,components:pn,directives:wt,filters:gs}=e;if(c&&Op(c,s,null),o)for(const oe in o){const te=o[oe];K(te)&&(s[oe]=te.bind(n))}if(i){const oe=i.call(n,n);ye(oe)&&(t.data=sr(oe))}if(po=!0,r)for(const oe in r){const te=r[oe],At=K(te)?te.bind(n,n):K(te.get)?te.get.bind(n,n):it,Vt=!K(te)&&K(te.set)?te.set.bind(n):it,Et=dt({get:At,set:Vt});Object.defineProperty(s,oe,{enumerable:!0,configurable:!0,get:()=>Et.value,set:Ue=>Et.value=Ue})}if(l)for(const oe in l)Xu(l[oe],s,n,oe);if(a){const oe=K(a)?a.call(n):a;Reflect.ownKeys(oe).forEach(te=>{Ii(te,oe[te])})}u&&Na(u,t,"c");function Se(oe,te){V(te)?te.forEach(At=>oe(At.bind(n))):te&&oe(te.bind(n))}if(Se(Ep,h),Se(Cp,d),Se(Sp,_),Se(Ip,m),Se(yp,T),Se(bp,x),Se(xp,nt),Se(Pp,z),Se(Np,Fe),Se(Tp,W),Se(Ju,X),Se(Rp,Ln),V(bt))if(bt.length){const oe=t.exposed||(t.exposed={});bt.forEach(te=>{Object.defineProperty(oe,te,{get:()=>n[te],set:At=>n[te]=At})})}else t.exposed||(t.exposed={});we&&t.render===it&&(t.render=we),Ut!=null&&(t.inheritAttrs=Ut),pn&&(t.components=pn),wt&&(t.directives=wt)}function Op(t,e,n=it){V(t)&&(t=_o(t));for(const s in t){const i=t[s];let r;ye(i)?"default"in i?r=Mt(i.from||s,i.default,!0):r=Mt(i.from||s):r=Mt(i),Qe(r)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[s]=r}}function Na(t,e,n){gt(V(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Xu(t,e,n,s){const i=s.includes(".")?Gu(n,s):()=>n[s];if(Ce(t)){const r=e[t];K(r)&&Ci(i,r)}else if(K(t))Ci(i,t.bind(n));else if(ye(t))if(V(t))t.forEach(r=>Xu(r,e,n,s));else{const r=K(t.handler)?t.handler.bind(n):e[t.handler];K(r)&&Ci(i,r,t)}}function vl(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=t.appContext,l=r.get(e);let a;return l?a=l:!i.length&&!n&&!s?a=e:(a={},i.length&&i.forEach(c=>Ai(a,c,o,!0)),Ai(a,e,o)),ye(e)&&r.set(e,a),a}function Ai(t,e,n,s=!1){const{mixins:i,extends:r}=e;r&&Ai(t,r,n,!0),i&&i.forEach(o=>Ai(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const l=Dp[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const Dp={data:Pa,props:xa,emits:xa,methods:Ss,computed:Ss,beforeCreate:$e,created:$e,beforeMount:$e,mounted:$e,beforeUpdate:$e,updated:$e,beforeDestroy:$e,beforeUnmount:$e,destroyed:$e,unmounted:$e,activated:$e,deactivated:$e,errorCaptured:$e,serverPrefetch:$e,components:Ss,directives:Ss,watch:Lp,provide:Pa,inject:Mp};function Pa(t,e){return e?t?function(){return ke(K(t)?t.call(this,this):t,K(e)?e.call(this,this):e)}:e:t}function Mp(t,e){return Ss(_o(t),_o(e))}function _o(t){if(V(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function $e(t,e){return t?[...new Set([].concat(t,e))]:e}function Ss(t,e){return t?ke(Object.create(null),t,e):e}function xa(t,e){return t?V(t)&&V(e)?[...new Set([...t,...e])]:ke(Object.create(null),Ra(t),Ra(e??{})):e}function Lp(t,e){if(!t)return e;if(!e)return t;const n=ke(Object.create(null),t);for(const s in e)n[s]=$e(t[s],e[s]);return n}function Zu(){return{app:null,config:{isNativeTag:yf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Fp=0;function $p(t,e){return function(s,i=null){K(s)||(s=ke({},s)),i!=null&&!ye(i)&&(i=null);const r=Zu(),o=new WeakSet;let l=!1;const a=r.app={_uid:Fp++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:a_,get config(){return r.config},set config(c){},use(c,...u){return o.has(c)||(c&&K(c.install)?(o.add(c),c.install(a,...u)):K(c)&&(o.add(c),c(a,...u))),a},mixin(c){return r.mixins.includes(c)||r.mixins.push(c),a},component(c,u){return u?(r.components[c]=u,a):r.components[c]},directive(c,u){return u?(r.directives[c]=u,a):r.directives[c]},mount(c,u,h){if(!l){const d=D(s,i);return d.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),u&&e?e(d,c):t(d,c,h),l=!0,a._container=c,c.__vue_app__=a,hr(d.component)||d.component.proxy}},unmount(){l&&(t(null,a._container),delete a._container.__vue_app__)},provide(c,u){return r.provides[c]=u,a},runWithContext(c){ki=a;try{return c()}finally{ki=null}}};return a}}let ki=null;function Ii(t,e){if(Me){let n=Me.provides;const s=Me.parent&&Me.parent.provides;s===n&&(n=Me.provides=Object.create(s)),n[t]=e}}function Mt(t,e,n=!1){const s=Me||Ke;if(s||ki){const i=s?s.parent==null?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:ki._context.provides;if(i&&t in i)return i[t];if(arguments.length>1)return n&&K(e)?e.call(s&&s.proxy):e}}function Bp(t,e,n,s=!1){const i={},r={};Ni(r,cr,1),t.propsDefaults=Object.create(null),eh(t,e,i,r);for(const o in t.propsOptions[0])o in i||(i[o]=void 0);n?t.props=s?i:ku(i):t.type.props?t.props=i:t.props=r,t.attrs=r}function Wp(t,e,n,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=t,l=ee(i),[a]=t.propsOptions;let c=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(rr(t.emitsOptions,d))continue;const _=e[d];if(a)if(J(r,d))_!==r[d]&&(r[d]=_,c=!0);else{const m=Nt(d);i[m]=go(a,l,m,_,t,!1)}else _!==r[d]&&(r[d]=_,c=!0)}}}else{eh(t,e,i,r)&&(c=!0);let u;for(const h in l)(!e||!J(e,h)&&((u=as(h))===h||!J(e,u)))&&(a?n&&(n[h]!==void 0||n[u]!==void 0)&&(i[h]=go(a,l,h,void 0,t,!0)):delete i[h]);if(r!==l)for(const h in r)(!e||!J(e,h))&&(delete r[h],c=!0)}c&&Dt(t,"set","$attrs")}function eh(t,e,n,s){const[i,r]=t.propsOptions;let o=!1,l;if(e)for(let a in e){if(bi(a))continue;const c=e[a];let u;i&&J(i,u=Nt(a))?!r||!r.includes(u)?n[u]=c:(l||(l={}))[u]=c:rr(t.emitsOptions,a)||(!(a in s)||c!==s[a])&&(s[a]=c,o=!0)}if(r){const a=ee(n),c=l||pe;for(let u=0;u<r.length;u++){const h=r[u];n[h]=go(i,a,h,c[h],t,!J(c,h))}}return o}function go(t,e,n,s,i,r){const o=t[n];if(o!=null){const l=J(o,"default");if(l&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&K(a)){const{propsDefaults:c}=i;if(n in c)s=c[n];else{const u=ei(i);s=c[n]=a.call(null,e),u()}}else s=a}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===as(n))&&(s=!0))}return s}function th(t,e,n=!1){const s=e.propsCache,i=s.get(t);if(i)return i;const r=t.props,o={},l=[];let a=!1;if(!K(t)){const u=h=>{a=!0;const[d,_]=th(h,e,!0);ke(o,d),_&&l.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!r&&!a)return ye(t)&&s.set(t,jn),jn;if(V(r))for(let u=0;u<r.length;u++){const h=Nt(r[u]);Aa(h)&&(o[h]=pe)}else if(r)for(const u in r){const h=Nt(u);if(Aa(h)){const d=r[u],_=o[h]=V(d)||K(d)?{type:d}:ke({},d);if(_){const m=Da(Boolean,_.type),T=Da(String,_.type);_[0]=m>-1,_[1]=T<0||m<T,(m>-1||J(_,"default"))&&l.push(h)}}}const c=[o,l];return ye(t)&&s.set(t,c),c}function Aa(t){return t[0]!=="$"}function ka(t){const e=t&&t.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:t===null?"null":""}function Oa(t,e){return ka(t)===ka(e)}function Da(t,e){return V(e)?e.findIndex(n=>Oa(n,t)):K(e)&&Oa(e,t)?0:-1}const nh=t=>t[0]==="_"||t==="$stable",yl=t=>V(t)?t.map(It):[It(t)],Up=(t,e,n)=>{if(e._n)return e;const s=j((...i)=>yl(e(...i)),n);return s._c=!1,s},sh=(t,e,n)=>{const s=t._ctx;for(const i in t){if(nh(i))continue;const r=t[i];if(K(r))e[i]=Up(i,r,s);else if(r!=null){const o=yl(r);e[i]=()=>o}}},ih=(t,e)=>{const n=yl(e);t.slots.default=()=>n},Vp=(t,e)=>{if(t.vnode.shapeFlag&32){const n=e._;n?(t.slots=ee(e),Ni(e,"_",n)):sh(e,t.slots={})}else t.slots={},e&&ih(t,e);Ni(t.slots,cr,1)},Hp=(t,e,n)=>{const{vnode:s,slots:i}=t;let r=!0,o=pe;if(s.shapeFlag&32){const l=e._;l?n&&l===1?r=!1:(ke(i,e),!n&&l===1&&delete i._):(r=!e.$stable,sh(e,i)),o=e}else e&&(ih(t,e),o={default:1});if(r)for(const l in i)!nh(l)&&o[l]==null&&delete i[l]};function mo(t,e,n,s,i=!1){if(V(t)){t.forEach((d,_)=>mo(d,e&&(V(e)?e[_]:e),n,s,i));return}if(Si(s)&&!i)return;const r=s.shapeFlag&4?hr(s.component)||s.component.proxy:s.el,o=i?null:r,{i:l,r:a}=t,c=e&&e.r,u=l.refs===pe?l.refs={}:l.refs,h=l.setupState;if(c!=null&&c!==a&&(Ce(c)?(u[c]=null,J(h,c)&&(h[c]=null)):Qe(c)&&(c.value=null)),K(a))Xt(a,l,12,[o,u]);else{const d=Ce(a),_=Qe(a),m=t.f;if(d||_){const T=()=>{if(m){const x=d?J(h,a)?h[a]:u[a]:a.value;i?V(x)&&tl(x,r):V(x)?x.includes(r)||x.push(r):d?(u[a]=[r],J(h,a)&&(h[a]=u[a])):(a.value=[r],t.k&&(u[t.k]=a.value))}else d?(u[a]=o,J(h,a)&&(h[a]=o)):_&&(a.value=o,t.k&&(u[t.k]=o))};i||m?T():(T.id=-1,Ve(T,n))}}}const Ve=_p;function jp(t){return Kp(t)}function Kp(t,e){const n=gu();n.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:a,setText:c,setElementText:u,parentNode:h,nextSibling:d,setScopeId:_=it,insertStaticContent:m}=t,T=(f,p,g,b=null,v=null,I=null,P=void 0,S=null,R=!!p.dynamicChildren)=>{if(f===p)return;f&&!vs(f,p)&&(b=y(f),Ue(f,v,I,!0),f=null),p.patchFlag===-2&&(R=!1,p.dynamicChildren=null);const{type:E,ref:k,shapeFlag:F}=p;switch(E){case ar:x(f,p,g,b);break;case In:O(f,p,g,b);break;case Ti:f==null&&W(p,g,b,P);break;case He:pn(f,p,g,b,v,I,P,S,R);break;default:F&1?we(f,p,g,b,v,I,P,S,R):F&6?wt(f,p,g,b,v,I,P,S,R):(F&64||F&128)&&E.process(f,p,g,b,v,I,P,S,R,M)}k!=null&&v&&mo(k,f&&f.ref,I,p||f,!p)},x=(f,p,g,b)=>{if(f==null)s(p.el=l(p.children),g,b);else{const v=p.el=f.el;p.children!==f.children&&c(v,p.children)}},O=(f,p,g,b)=>{f==null?s(p.el=a(p.children||""),g,b):p.el=f.el},W=(f,p,g,b)=>{[f.el,f.anchor]=m(f.children,p,g,b,f.el,f.anchor)},U=({el:f,anchor:p},g,b)=>{let v;for(;f&&f!==p;)v=d(f),s(f,g,b),f=v;s(p,g,b)},X=({el:f,anchor:p})=>{let g;for(;f&&f!==p;)g=d(f),i(f),f=g;i(p)},we=(f,p,g,b,v,I,P,S,R)=>{p.type==="svg"?P="svg":p.type==="math"&&(P="mathml"),f==null?z(p,g,b,v,I,P,S,R):Ln(f,p,v,I,P,S,R)},z=(f,p,g,b,v,I,P,S)=>{let R,E;const{props:k,shapeFlag:F,transition:L,dirs:H}=f;if(R=f.el=o(f.type,I,k&&k.is,k),F&8?u(R,f.children):F&16&&nt(f.children,R,null,b,v,Ur(f,I),P,S),H&&_n(f,null,b,"created"),Fe(R,f,f.scopeId,P,b),k){for(const le in k)le!=="value"&&!bi(le)&&r(R,le,null,k[le],I,f.children,b,v,Oe);"value"in k&&r(R,"value",null,k.value,I),(E=k.onVnodeBeforeMount)&&St(E,b,f)}H&&_n(f,null,b,"beforeMount");const Y=zp(v,L);Y&&L.beforeEnter(R),s(R,p,g),((E=k&&k.onVnodeMounted)||Y||H)&&Ve(()=>{E&&St(E,b,f),Y&&L.enter(R),H&&_n(f,null,b,"mounted")},v)},Fe=(f,p,g,b,v)=>{if(g&&_(f,g),b)for(let I=0;I<b.length;I++)_(f,b[I]);if(v){let I=v.subTree;if(p===I){const P=v.vnode;Fe(f,P,P.scopeId,P.slotScopeIds,v.parent)}}},nt=(f,p,g,b,v,I,P,S,R=0)=>{for(let E=R;E<f.length;E++){const k=f[E]=S?zt(f[E]):It(f[E]);T(null,k,p,g,b,v,I,P,S)}},Ln=(f,p,g,b,v,I,P)=>{const S=p.el=f.el;let{patchFlag:R,dynamicChildren:E,dirs:k}=p;R|=f.patchFlag&16;const F=f.props||pe,L=p.props||pe;let H;if(g&&gn(g,!1),(H=L.onVnodeBeforeUpdate)&&St(H,g,p,f),k&&_n(p,f,g,"beforeUpdate"),g&&gn(g,!0),E?bt(f.dynamicChildren,E,S,g,b,Ur(p,v),I):P||te(f,p,S,null,g,b,Ur(p,v),I,!1),R>0){if(R&16)Ut(S,p,F,L,g,b,v);else if(R&2&&F.class!==L.class&&r(S,"class",null,L.class,v),R&4&&r(S,"style",F.style,L.style,v),R&8){const Y=p.dynamicProps;for(let le=0;le<Y.length;le++){const me=Y[le],Ie=F[me],ct=L[me];(ct!==Ie||me==="value")&&r(S,me,Ie,ct,v,f.children,g,b,Oe)}}R&1&&f.children!==p.children&&u(S,p.children)}else!P&&E==null&&Ut(S,p,F,L,g,b,v);((H=L.onVnodeUpdated)||k)&&Ve(()=>{H&&St(H,g,p,f),k&&_n(p,f,g,"updated")},b)},bt=(f,p,g,b,v,I,P)=>{for(let S=0;S<p.length;S++){const R=f[S],E=p[S],k=R.el&&(R.type===He||!vs(R,E)||R.shapeFlag&70)?h(R.el):g;T(R,E,k,null,b,v,I,P,!0)}},Ut=(f,p,g,b,v,I,P)=>{if(g!==b){if(g!==pe)for(const S in g)!bi(S)&&!(S in b)&&r(f,S,g[S],null,P,p.children,v,I,Oe);for(const S in b){if(bi(S))continue;const R=b[S],E=g[S];R!==E&&S!=="value"&&r(f,S,E,R,P,p.children,v,I,Oe)}"value"in b&&r(f,"value",g.value,b.value,P)}},pn=(f,p,g,b,v,I,P,S,R)=>{const E=p.el=f?f.el:l(""),k=p.anchor=f?f.anchor:l("");let{patchFlag:F,dynamicChildren:L,slotScopeIds:H}=p;H&&(S=S?S.concat(H):H),f==null?(s(E,g,b),s(k,g,b),nt(p.children||[],g,k,v,I,P,S,R)):F>0&&F&64&&L&&f.dynamicChildren?(bt(f.dynamicChildren,L,g,v,I,P,S),(p.key!=null||v&&p===v.subTree)&&rh(f,p,!0)):te(f,p,g,k,v,I,P,S,R)},wt=(f,p,g,b,v,I,P,S,R)=>{p.slotScopeIds=S,f==null?p.shapeFlag&512?v.ctx.activate(p,g,b,P,R):gs(p,g,b,v,I,P,R):Fn(f,p,R)},gs=(f,p,g,b,v,I,P)=>{const S=f.component=t_(f,b,v);if(Qu(f)&&(S.ctx.renderer=M),n_(S),S.asyncDep){if(v&&v.registerDep(S,Se),!f.el){const R=S.subTree=D(In);O(null,R,p,g)}}else Se(S,f,p,g,v,I,P)},Fn=(f,p,g)=>{const b=p.component=f.component;if(up(f,p,g))if(b.asyncDep&&!b.asyncResolved){oe(b,p,g);return}else b.next=p,ip(b.update),b.effect.dirty=!0,b.update();else p.el=f.el,b.vnode=p},Se=(f,p,g,b,v,I,P)=>{const S=()=>{if(f.isMounted){let{next:k,bu:F,u:L,parent:H,vnode:Y}=f;{const Wn=oh(f);if(Wn){k&&(k.el=Y.el,oe(f,k,P)),Wn.asyncDep.then(()=>{f.isUnmounted||S()});return}}let le=k,me;gn(f,!1),k?(k.el=Y.el,oe(f,k,P)):k=Y,F&&wi(F),(me=k.props&&k.props.onVnodeBeforeUpdate)&&St(me,H,k,Y),gn(f,!0);const Ie=Br(f),ct=f.subTree;f.subTree=Ie,T(ct,Ie,h(ct.el),y(ct),f,v,I),k.el=Ie.el,le===null&&hp(f,Ie.el),L&&Ve(L,v),(me=k.props&&k.props.onVnodeUpdated)&&Ve(()=>St(me,H,k,Y),v)}else{let k;const{el:F,props:L}=p,{bm:H,m:Y,parent:le}=f,me=Si(p);if(gn(f,!1),H&&wi(H),!me&&(k=L&&L.onVnodeBeforeMount)&&St(k,le,p),gn(f,!0),F&&ge){const Ie=()=>{f.subTree=Br(f),ge(F,f.subTree,f,v,null)};me?p.type.__asyncLoader().then(()=>!f.isUnmounted&&Ie()):Ie()}else{const Ie=f.subTree=Br(f);T(null,Ie,g,b,f,v,I),p.el=Ie.el}if(Y&&Ve(Y,v),!me&&(k=L&&L.onVnodeMounted)){const Ie=p;Ve(()=>St(k,le,Ie),v)}(p.shapeFlag&256||le&&Si(le.vnode)&&le.vnode.shapeFlag&256)&&f.a&&Ve(f.a,v),f.isMounted=!0,p=g=b=null}},R=f.effect=new rl(S,it,()=>pl(E),f.scope),E=f.update=()=>{R.dirty&&R.run()};E.id=f.uid,gn(f,!0),E()},oe=(f,p,g)=>{p.component=f;const b=f.vnode.props;f.vnode=p,f.next=null,Wp(f,p.props,b,g),Hp(f,p.children,g),An(),Sa(f),kn()},te=(f,p,g,b,v,I,P,S,R=!1)=>{const E=f&&f.children,k=f?f.shapeFlag:0,F=p.children,{patchFlag:L,shapeFlag:H}=p;if(L>0){if(L&128){Vt(E,F,g,b,v,I,P,S,R);return}else if(L&256){At(E,F,g,b,v,I,P,S,R);return}}H&8?(k&16&&Oe(E,v,I),F!==E&&u(g,F)):k&16?H&16?Vt(E,F,g,b,v,I,P,S,R):Oe(E,v,I,!0):(k&8&&u(g,""),H&16&&nt(F,g,b,v,I,P,S,R))},At=(f,p,g,b,v,I,P,S,R)=>{f=f||jn,p=p||jn;const E=f.length,k=p.length,F=Math.min(E,k);let L;for(L=0;L<F;L++){const H=p[L]=R?zt(p[L]):It(p[L]);T(f[L],H,g,null,v,I,P,S,R)}E>k?Oe(f,v,I,!0,!1,F):nt(p,g,b,v,I,P,S,R,F)},Vt=(f,p,g,b,v,I,P,S,R)=>{let E=0;const k=p.length;let F=f.length-1,L=k-1;for(;E<=F&&E<=L;){const H=f[E],Y=p[E]=R?zt(p[E]):It(p[E]);if(vs(H,Y))T(H,Y,g,null,v,I,P,S,R);else break;E++}for(;E<=F&&E<=L;){const H=f[F],Y=p[L]=R?zt(p[L]):It(p[L]);if(vs(H,Y))T(H,Y,g,null,v,I,P,S,R);else break;F--,L--}if(E>F){if(E<=L){const H=L+1,Y=H<k?p[H].el:b;for(;E<=L;)T(null,p[E]=R?zt(p[E]):It(p[E]),g,Y,v,I,P,S,R),E++}}else if(E>L)for(;E<=F;)Ue(f[E],v,I,!0),E++;else{const H=E,Y=E,le=new Map;for(E=Y;E<=L;E++){const Je=p[E]=R?zt(p[E]):It(p[E]);Je.key!=null&&le.set(Je.key,E)}let me,Ie=0;const ct=L-Y+1;let Wn=!1,fa=0;const ms=new Array(ct);for(E=0;E<ct;E++)ms[E]=0;for(E=H;E<=F;E++){const Je=f[E];if(Ie>=ct){Ue(Je,v,I,!0);continue}let Ct;if(Je.key!=null)Ct=le.get(Je.key);else for(me=Y;me<=L;me++)if(ms[me-Y]===0&&vs(Je,p[me])){Ct=me;break}Ct===void 0?Ue(Je,v,I,!0):(ms[Ct-Y]=E+1,Ct>=fa?fa=Ct:Wn=!0,T(Je,p[Ct],g,null,v,I,P,S,R),Ie++)}const pa=Wn?Gp(ms):jn;for(me=pa.length-1,E=ct-1;E>=0;E--){const Je=Y+E,Ct=p[Je],_a=Je+1<k?p[Je+1].el:b;ms[E]===0?T(null,Ct,g,_a,v,I,P,S,R):Wn&&(me<0||E!==pa[me]?Et(Ct,g,_a,2):me--)}}},Et=(f,p,g,b,v=null)=>{const{el:I,type:P,transition:S,children:R,shapeFlag:E}=f;if(E&6){Et(f.component.subTree,p,g,b);return}if(E&128){f.suspense.move(p,g,b);return}if(E&64){P.move(f,p,g,M);return}if(P===He){s(I,p,g);for(let F=0;F<R.length;F++)Et(R[F],p,g,b);s(f.anchor,p,g);return}if(P===Ti){U(f,p,g);return}if(b!==2&&E&1&&S)if(b===0)S.beforeEnter(I),s(I,p,g),Ve(()=>S.enter(I),v);else{const{leave:F,delayLeave:L,afterLeave:H}=S,Y=()=>s(I,p,g),le=()=>{F(I,()=>{Y(),H&&H()})};L?L(I,Y,le):le()}else s(I,p,g)},Ue=(f,p,g,b=!1,v=!1)=>{const{type:I,props:P,ref:S,children:R,dynamicChildren:E,shapeFlag:k,patchFlag:F,dirs:L}=f;if(S!=null&&mo(S,null,g,f,!0),k&256){p.ctx.deactivate(f);return}const H=k&1&&L,Y=!Si(f);let le;if(Y&&(le=P&&P.onVnodeBeforeUnmount)&&St(le,p,f),k&6)hi(f.component,g,b);else{if(k&128){f.suspense.unmount(g,b);return}H&&_n(f,null,p,"beforeUnmount"),k&64?f.type.remove(f,p,g,v,M,b):E&&(I!==He||F>0&&F&64)?Oe(E,p,g,!1,!0):(I===He&&F&384||!v&&k&16)&&Oe(R,p,g),b&&$n(f)}(Y&&(le=P&&P.onVnodeUnmounted)||H)&&Ve(()=>{le&&St(le,p,f),H&&_n(f,null,p,"unmounted")},g)},$n=f=>{const{type:p,el:g,anchor:b,transition:v}=f;if(p===He){Bn(g,b);return}if(p===Ti){X(f);return}const I=()=>{i(g),v&&!v.persisted&&v.afterLeave&&v.afterLeave()};if(f.shapeFlag&1&&v&&!v.persisted){const{leave:P,delayLeave:S}=v,R=()=>P(g,I);S?S(f.el,I,R):R()}else I()},Bn=(f,p)=>{let g;for(;f!==p;)g=d(f),i(f),f=g;i(p)},hi=(f,p,g)=>{const{bum:b,scope:v,update:I,subTree:P,um:S}=f;b&&wi(b),v.stop(),I&&(I.active=!1,Ue(P,f,p,g)),S&&Ve(S,p),Ve(()=>{f.isUnmounted=!0},p),p&&p.pendingBranch&&!p.isUnmounted&&f.asyncDep&&!f.asyncResolved&&f.suspenseId===p.pendingId&&(p.deps--,p.deps===0&&p.resolve())},Oe=(f,p,g,b=!1,v=!1,I=0)=>{for(let P=I;P<f.length;P++)Ue(f[P],p,g,b,v)},y=f=>f.shapeFlag&6?y(f.component.subTree):f.shapeFlag&128?f.suspense.next():d(f.anchor||f.el);let A=!1;const N=(f,p,g)=>{f==null?p._vnode&&Ue(p._vnode,null,null,!0):T(p._vnode||null,f,p,null,null,null,g),A||(A=!0,Sa(),Vu(),A=!1),p._vnode=f},M={p:T,um:Ue,m:Et,r:$n,mt:gs,mc:nt,pc:te,pbc:bt,n:y,o:t};let ne,ge;return e&&([ne,ge]=e(M)),{render:N,hydrate:ne,createApp:$p(N,ne)}}function Ur({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function gn({effect:t,update:e},n){t.allowRecurse=e.allowRecurse=n}function zp(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function rh(t,e,n=!1){const s=t.children,i=e.children;if(V(s)&&V(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=zt(i[r]),l.el=o.el),n||rh(o,l)),l.type===ar&&(l.el=o.el)}}function Gp(t){const e=t.slice(),n=[0];let s,i,r,o,l;const a=t.length;for(s=0;s<a;s++){const c=t[s];if(c!==0){if(i=n[n.length-1],t[i]<c){e[s]=i,n.push(s);continue}for(r=0,o=n.length-1;r<o;)l=r+o>>1,t[n[l]]<c?r=l+1:o=l;c<t[n[r]]&&(r>0&&(e[s]=n[r-1]),n[r]=s)}}for(r=n.length,o=n[r-1];r-- >0;)n[r]=o,o=e[o];return n}function oh(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:oh(e)}const qp=t=>t.__isTeleport,He=Symbol.for("v-fgt"),ar=Symbol.for("v-txt"),In=Symbol.for("v-cmt"),Ti=Symbol.for("v-stc"),Ts=[];let ft=null;function se(t=!1){Ts.push(ft=t?null:[])}function Qp(){Ts.pop(),ft=Ts[Ts.length-1]||null}let Fs=1;function Ma(t){Fs+=t}function lh(t){return t.dynamicChildren=Fs>0?ft||jn:null,Qp(),Fs>0&&ft&&ft.push(t),t}function _e(t,e,n,s,i,r){return lh(w(t,e,n,s,i,r,!0))}function $s(t,e,n,s,i){return lh(D(t,e,n,s,i,!0))}function vo(t){return t?t.__v_isVNode===!0:!1}function vs(t,e){return t.type===e.type&&t.key===e.key}const cr="__vInternal",ah=({key:t})=>t??null,Ri=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ce(t)||Qe(t)||K(t)?{i:Ke,r:t,k:e,f:!!n}:t:null);function w(t,e=null,n=null,s=0,i=null,r=t===He?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&ah(e),ref:e&&Ri(e),scopeId:or,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Ke};return l?(bl(a,n),r&128&&t.normalize(a)):n&&(a.shapeFlag|=Ce(n)?8:16),Fs>0&&!o&&ft&&(a.patchFlag>0||r&6)&&a.patchFlag!==32&&ft.push(a),a}const D=Yp;function Yp(t,e=null,n=null,s=0,i=null,r=!1){if((!t||t===dp)&&(t=In),vo(t)){const l=Xn(t,e,!0);return n&&bl(l,n),Fs>0&&!r&&ft&&(l.shapeFlag&6?ft[ft.indexOf(t)]=l:ft.push(l)),l.patchFlag|=-2,l}if(l_(t)&&(t=t.__vccOpts),e){e=Jp(e);let{class:l,style:a}=e;l&&!Ce(l)&&(e.class=il(l)),ye(a)&&(Du(a)&&!V(a)&&(a=ke({},a)),e.style=sl(a))}const o=Ce(t)?1:pp(t)?128:qp(t)?64:ye(t)?4:K(t)?2:0;return w(t,e,n,s,i,o,r,!0)}function Jp(t){return t?Du(t)||cr in t?ke({},t):t:null}function Xn(t,e,n=!1){const{props:s,ref:i,patchFlag:r,children:o}=t,l=e?Xp(s||{},e):s;return{__v_isVNode:!0,__v_skip:!0,type:t.type,props:l,key:l&&ah(l),ref:e&&e.ref?n&&i?V(i)?i.concat(Ri(e)):[i,Ri(e)]:Ri(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==He?r===-1?16:r|16:r,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:t.transition,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Xn(t.ssContent),ssFallback:t.ssFallback&&Xn(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce}}function ae(t=" ",e=0){return D(ar,null,t,e)}function ch(t,e){const n=D(Ti,null,t);return n.staticCount=e,n}function uh(t="",e=!1){return e?(se(),$s(In,null,t)):D(In,null,t)}function It(t){return t==null||typeof t=="boolean"?D(In):V(t)?D(He,null,t.slice()):typeof t=="object"?zt(t):D(ar,null,String(t))}function zt(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Xn(t)}function bl(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(V(e))n=16;else if(typeof e=="object")if(s&65){const i=e.default;i&&(i._c&&(i._d=!1),bl(t,i()),i._c&&(i._d=!0));return}else{n=32;const i=e._;!i&&!(cr in e)?e._ctx=Ke:i===3&&Ke&&(Ke.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else K(e)?(e={default:e,_ctx:Ke},n=32):(e=String(e),s&64?(n=16,e=[ae(e)]):n=8);t.children=e,t.shapeFlag|=n}function Xp(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const i in s)if(i==="class")e.class!==s.class&&(e.class=il([e.class,s.class]));else if(i==="style")e.style=sl([e.style,s.style]);else if(Xi(i)){const r=e[i],o=s[i];o&&r!==o&&!(V(r)&&r.includes(o))&&(e[i]=r?[].concat(r,o):o)}else i!==""&&(e[i]=s[i])}return e}function St(t,e,n,s=null){gt(t,e,7,[n,s])}const Zp=Zu();let e_=0;function t_(t,e,n){const s=t.type,i=(e?e.appContext:t.appContext)||Zp,r={uid:e_++,vnode:t,type:s,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,scope:new yu(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:th(s,i),emitsOptions:ju(s,i),emit:null,emitted:null,propsDefaults:pe,inheritAttrs:s.inheritAttrs,ctx:pe,data:pe,props:pe,attrs:pe,slots:pe,refs:pe,setupState:pe,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=lp.bind(null,r),t.ce&&t.ce(r),r}let Me=null,Oi,yo;{const t=gu(),e=(n,s)=>{let i;return(i=t[n])||(i=t[n]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};Oi=e("__VUE_INSTANCE_SETTERS__",n=>Me=n),yo=e("__VUE_SSR_SETTERS__",n=>ur=n)}const ei=t=>{const e=Me;return Oi(t),t.scope.on(),()=>{t.scope.off(),Oi(e)}},La=()=>{Me&&Me.scope.off(),Oi(null)};function hh(t){return t.vnode.shapeFlag&4}let ur=!1;function n_(t,e=!1){e&&yo(e);const{props:n,children:s}=t.vnode,i=hh(t);Bp(t,n,i,e),Vp(t,s);const r=i?s_(t,e):void 0;return e&&yo(!1),r}function s_(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=hl(new Proxy(t.ctx,Ap));const{setup:s}=n;if(s){const i=t.setupContext=s.length>1?r_(t):null,r=ei(t);An();const o=Xt(s,t,0,[t.props,i]);if(kn(),r(),fu(o)){if(o.then(La,La),e)return o.then(l=>{Fa(t,l,e)}).catch(l=>{ir(l,t,0)});t.asyncDep=o}else Fa(t,o,e)}else dh(t,e)}function Fa(t,e,n){K(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:ye(e)&&(t.setupState=$u(e)),dh(t,n)}let $a;function dh(t,e,n){const s=t.type;if(!t.render){if(!e&&$a&&!s.render){const i=s.template||vl(t).template;if(i){const{isCustomElement:r,compilerOptions:o}=t.appContext.config,{delimiters:l,compilerOptions:a}=s,c=ke(ke({isCustomElement:r,delimiters:l},o),a);s.render=$a(i,c)}}t.render=s.render||it}{const i=ei(t);An();try{kp(t)}finally{kn(),i()}}}function i_(t){return t.attrsProxy||(t.attrsProxy=new Proxy(t.attrs,{get(e,n){return qe(t,"get","$attrs"),e[n]}}))}function r_(t){const e=n=>{t.exposed=n||{}};return{get attrs(){return i_(t)},slots:t.slots,emit:t.emit,expose:e}}function hr(t){if(t.exposed)return t.exposeProxy||(t.exposeProxy=new Proxy($u(hl(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Is)return Is[n](t)},has(e,n){return n in e||n in Is}}))}function o_(t,e=!0){return K(t)?t.displayName||t.name:t.name||e&&t.__name}function l_(t){return K(t)&&"__vccOpts"in t}const dt=(t,e)=>Xf(t,e,ur);function fh(t,e,n){const s=arguments.length;return s===2?ye(e)&&!V(e)?vo(e)?D(t,null,[e]):D(t,e):D(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&vo(n)&&(n=[n]),D(t,e,n))}const a_="3.4.15";/**
* @vue/runtime-dom v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const c_="http://www.w3.org/2000/svg",u_="http://www.w3.org/1998/Math/MathML",Gt=typeof document<"u"?document:null,Ba=Gt&&Gt.createElement("template"),h_={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const i=e==="svg"?Gt.createElementNS(c_,t):e==="mathml"?Gt.createElementNS(u_,t):Gt.createElement(t,n?{is:n}:void 0);return t==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:t=>Gt.createTextNode(t),createComment:t=>Gt.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>Gt.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,i,r){const o=n?n.previousSibling:e.lastChild;if(i&&(i===r||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),n),!(i===r||!(i=i.nextSibling)););else{Ba.innerHTML=s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t;const l=Ba.content;if(s==="svg"||s==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},d_=Symbol("_vtc");function f_(t,e,n){const s=t[d_];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const p_=Symbol("_vod"),__=Symbol("");function g_(t,e,n){const s=t.style,i=s.display,r=Ce(n);if(n&&!r){if(e&&!Ce(e))for(const o in e)n[o]==null&&bo(s,o,"");for(const o in n)bo(s,o,n[o])}else if(r){if(e!==n){const o=s[__];o&&(n+=";"+o),s.cssText=n}}else e&&t.removeAttribute("style");p_ in t&&(s.display=i)}const Wa=/\s*!important$/;function bo(t,e,n){if(V(n))n.forEach(s=>bo(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=m_(t,e);Wa.test(n)?t.setProperty(as(s),n.replace(Wa,""),"important"):t[s]=n}}const Ua=["Webkit","Moz","ms"],Vr={};function m_(t,e){const n=Vr[e];if(n)return n;let s=Nt(e);if(s!=="filter"&&s in t)return Vr[e]=s;s=tr(s);for(let i=0;i<Ua.length;i++){const r=Ua[i]+s;if(r in t)return Vr[e]=r}return e}const Va="http://www.w3.org/1999/xlink";function v_(t,e,n,s,i){if(s&&e.startsWith("xlink:"))n==null?t.removeAttributeNS(Va,e.slice(6,e.length)):t.setAttributeNS(Va,e,n);else{const r=Pf(e);n==null||r&&!mu(n)?t.removeAttribute(e):t.setAttribute(e,r?"":n)}}function y_(t,e,n,s,i,r,o){if(e==="innerHTML"||e==="textContent"){s&&o(s,i,r),t[e]=n??"";return}const l=t.tagName;if(e==="value"&&l!=="PROGRESS"&&!l.includes("-")){t._value=n;const c=l==="OPTION"?t.getAttribute("value"):t.value,u=n??"";c!==u&&(t.value=u),n==null&&t.removeAttribute(e);return}let a=!1;if(n===""||n==null){const c=typeof t[e];c==="boolean"?n=mu(n):n==null&&c==="string"?(n="",a=!0):c==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(e)}function Vn(t,e,n,s){t.addEventListener(e,n,s)}function b_(t,e,n,s){t.removeEventListener(e,n,s)}const Ha=Symbol("_vei");function w_(t,e,n,s,i=null){const r=t[Ha]||(t[Ha]={}),o=r[e];if(s&&o)o.value=s;else{const[l,a]=E_(e);if(s){const c=r[e]=I_(s,i);Vn(t,l,c,a)}else o&&(b_(t,l,o,a),r[e]=void 0)}}const ja=/(?:Once|Passive|Capture)$/;function E_(t){let e;if(ja.test(t)){e={};let s;for(;s=t.match(ja);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):as(t.slice(2)),e]}let Hr=0;const C_=Promise.resolve(),S_=()=>Hr||(C_.then(()=>Hr=0),Hr=Date.now());function I_(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;gt(T_(s,n.value),e,5,[s])};return n.value=t,n.attached=S_(),n}function T_(t,e){if(V(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>i=>!i._stopped&&s&&s(i))}else return e}const Ka=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,R_=(t,e,n,s,i,r,o,l,a)=>{const c=i==="svg";e==="class"?f_(t,s,c):e==="style"?g_(t,n,s):Xi(e)?el(e)||w_(t,e,n,s,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):N_(t,e,s,c))?y_(t,e,s,r,o,l,a):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),v_(t,e,s,c))};function N_(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Ka(e)&&K(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=t.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Ka(e)&&Ce(n)?!1:e in t}const za=t=>{const e=t.props["onUpdate:modelValue"]||!1;return V(e)?n=>wi(e,n):e};function P_(t){t.target.composing=!0}function Ga(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const jr=Symbol("_assign"),wl={created(t,{modifiers:{lazy:e,trim:n,number:s}},i){t[jr]=za(i);const r=s||i.props&&i.props.type==="number";Vn(t,e?"change":"input",o=>{if(o.target.composing)return;let l=t.value;n&&(l=l.trim()),r&&(l=oo(l)),t[jr](l)}),n&&Vn(t,"change",()=>{t.value=t.value.trim()}),e||(Vn(t,"compositionstart",P_),Vn(t,"compositionend",Ga),Vn(t,"change",Ga))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,modifiers:{lazy:n,trim:s,number:i}},r){if(t[jr]=za(r),t.composing)return;const o=i||t.type==="number"?oo(t.value):t.value,l=e??"";o!==l&&(document.activeElement===t&&t.type!=="range"&&(n||s&&t.value.trim()===l)||(t.value=l))}},x_=["ctrl","shift","alt","meta"],A_={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>x_.some(n=>t[`${n}Key`]&&!e.includes(n))},Di=(t,e)=>{const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(i,...r)=>{for(let o=0;o<e.length;o++){const l=A_[e[o]];if(l&&l(i,e))return}return t(i,...r)})},k_=ke({patchProp:R_},h_);let qa;function O_(){return qa||(qa=jp(k_))}const D_=(...t)=>{const e=O_().createApp(...t),{mount:n}=e;return e.mount=s=>{const i=L_(s);if(!i)return;const r=e._component;!K(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.innerHTML="";const o=n(i,!1,M_(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function M_(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function L_(t){return Ce(t)?document.querySelector(t):t}var F_=!1;/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const $_=Symbol();var Qa;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Qa||(Qa={}));function B_(){const t=xf(!0),e=t.run(()=>cs({}));let n=[],s=[];const i=hl({install(r){i._a=r,r.provide($_,i),r.config.globalProperties.$pinia=i,s.forEach(o=>n.push(o)),s=[]},use(r){return!this._a&&!F_?s.push(r):n.push(r),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return i}const W_="modulepreload",U_=function(t){return"/"+t},Ya={},V_=function(e,n,s){let i=Promise.resolve();if(n&&n.length>0){const r=document.getElementsByTagName("link");i=Promise.all(n.map(o=>{if(o=U_(o),o in Ya)return;Ya[o]=!0;const l=o.endsWith(".css"),a=l?'[rel="stylesheet"]':"";if(!!s)for(let h=r.length-1;h>=0;h--){const d=r[h];if(d.href===o&&(!l||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${a}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":W_,l||(u.as="script",u.crossOrigin=""),u.href=o,document.head.appendChild(u),l)return new Promise((h,d)=>{u.addEventListener("load",h),u.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${o}`)))})}))}return i.then(()=>e()).catch(r=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=r,window.dispatchEvent(o),!o.defaultPrevented)throw r})};function ph(t={}){const{immediate:e=!1,onNeedRefresh:n,onOfflineReady:s,onRegistered:i,onRegisteredSW:r,onRegisterError:o}=t;let l,a,c;const u=async(d=!0)=>{await a,await(c==null?void 0:c())};async function h(){if("serviceWorker"in navigator){if(l=await V_(()=>import("./workbox-window.prod.es5-prqDwDSL.js"),__vite__mapDeps([])).then(({Workbox:d})=>new d("/sw.js",{scope:"/",type:"classic"})).catch(d=>{o==null||o(d)}),!l)return;c=async()=>{await(l==null?void 0:l.messageSkipWaiting())};{let d=!1;const _=()=>{d=!0,l==null||l.addEventListener("controlling",m=>{m.isUpdate&&window.location.reload()}),n==null||n()};l.addEventListener("installed",m=>{typeof m.isUpdate>"u"?typeof m.isExternal<"u"?m.isExternal?_():!d&&(s==null||s()):m.isExternal?window.location.reload():!d&&(s==null||s()):m.isUpdate||s==null||s()}),l.addEventListener("waiting",_),l.addEventListener("externalwaiting",_)}l.register({immediate:e}).then(d=>{r?r("/sw.js",d):i==null||i(d)}).catch(d=>{o==null||o(d)})}}return a=h(),u}const We=(t,e)=>{const n=t.__vccOpts||t;for(const[s,i]of e)n[s]=i;return n},H_={data(){return{searchQuery:"",friends:[{id:1,name:"김철수",age:25},{id:2,name:"김영희",age:30},{id:3,name:"김싸피",age:28}],selectedFriend:null}},computed:{filteredFriends(){return this.friends.filter(t=>t.name.toLowerCase().includes(this.searchQuery.toLowerCase()))}},methods:{showProfile(t){this.selectedFriend=t},resetSelectedFriend(){this.selectedFriend=null},startChat(t){console.log("채팅 시작:",t.name)}}},j_={class:"friend-list container mt-5"},K_={class:"mb-3"},z_={class:"list-group"},G_=["onClick"],q_=["onClick"],Q_=["src"],Y_={class:"buttons"},J_=["onClick"],X_=["onClick"],Z_={class:"modal-background"},eg={class:"modal-dialog modal-dialog-centered",role:"document"},tg={class:"modal-content"},ng={class:"modal-header"},sg=w("h5",{class:"modal-title"},"친구 프로필",-1),ig=w("span",null,"×",-1),rg=[ig],og={class:"modal-body"},lg=w("strong",null,"이름:",-1),ag=w("strong",null,"나이:",-1);function cg(t,e,n,s,i,r){return se(),_e("div",j_,[w("div",K_,[ml(w("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>i.searchQuery=o),type:"text",class:"form-control",placeholder:"친구 검색"},null,512),[[wl,i.searchQuery]])]),w("ul",z_,[(se(!0),_e(He,null,Ls(r.filteredFriends,o=>(se(),_e("li",{key:o.id,class:"list-group-item list-group-item-action bg-info text-white d-flex justify-content-between align-items-center",onClick:l=>r.showProfile(o)},[w("div",{class:"friend-item",onClick:l=>r.showProfile(o)},[w("img",{src:o.profilePicture,alt:"프로필 이미지",class:"profile-image mr-2"},null,8,Q_),w("span",null,_t(o.name),1)],8,q_),w("div",Y_,[w("button",{class:"btn btn-secondary btn-sm",onClick:Di(l=>r.showProfile(o),["stop"])},"프로필 보기",8,J_),w("button",{class:"btn btn-primary btn-sm",onClick:Di(l=>r.startChat(o),["stop"])},"채팅",8,X_)])],8,G_))),128))]),i.selectedFriend?(se(),_e("div",{key:0,class:"modal fade show",tabindex:"-1",role:"dialog",onClick:e[2]||(e[2]=(...o)=>r.resetSelectedFriend&&r.resetSelectedFriend(...o))},[w("div",Z_,[w("div",eg,[w("div",tg,[w("div",ng,[sg,w("button",{type:"button",class:"close","data-dismiss":"modal",onClick:e[1]||(e[1]=(...o)=>r.resetSelectedFriend&&r.resetSelectedFriend(...o))},rg)]),w("div",og,[w("p",null,[lg,ae(" "+_t(i.selectedFriend.name),1)]),w("p",null,[ag,ae(" "+_t(i.selectedFriend.age),1)])])])])])])):uh("",!0)])}const El=We(H_,[["render",cg]]),ug={data(){return{notifications:[{id:1,message:"새로운 알림 1"},{id:2,message:"새로운 알림 2"}]}}},hg=t=>(_l("data-v-552222d2"),t=t(),gl(),t),dg={class:"notifications"},fg=hg(()=>w("h3",null,"알림 리스트",-1));function pg(t,e,n,s,i,r){return se(),_e("div",dg,[fg,w("ul",null,[(se(!0),_e(He,null,Ls(i.notifications,o=>(se(),_e("li",{key:o.id},_t(o.message),1))),128))])])}const _g=We(ug,[["render",pg],["__scopeId","data-v-552222d2"]]),gg={name:"Sidebar",components:{Friend:El,Notifications:_g}},lt=t=>(_l("data-v-e502d182"),t=t(),gl(),t),mg={class:"navbar bg-body-tertiary fixed-top"},vg={class:"container-fluid d-flex justify-content-between align-items-center"},yg=lt(()=>w("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasNavbar","aria-controls":"offcanvasNavbar","aria-label":"Toggle navigation"},[w("span",{class:"navbar-toggler-icon"})],-1)),bg=lt(()=>w("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasNotifications","aria-controls":"offcanvasNotifications"}," 알림 ",-1)),wg={class:"offcanvas offcanvas-start",tabindex:"-1",id:"offcanvasNavbar","aria-labelledby":"offcanvasNavbarLabel","data-bs-toggle":"offcanvas"},Eg=lt(()=>w("div",{class:"offcanvas-header"},[w("h5",{class:"offcanvas-title",id:"offcanvasNavbarLabel"},"메뉴 전체보기"),w("button",{type:"button",class:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"})],-1)),Cg={class:"offcanvas-body"},Sg=lt(()=>w("span",{class:"emoji"},"🎯",-1)),Ig=lt(()=>w("span",{class:"emoji"},"📅",-1)),Tg=lt(()=>w("span",{class:"emoji"},"🤝",-1)),Rg=lt(()=>w("span",{class:"emoji"},"📋",-1)),Ng=lt(()=>w("span",{class:"emoji"},"👫",-1)),Pg=lt(()=>w("span",{class:"emoji"},"🔄",-1)),xg=lt(()=>w("span",{class:"emoji"},"🔊",-1)),Ag=lt(()=>w("span",{class:"emoji"},"👤",-1)),kg={class:"offcanvas offcanvas-end",tabindex:"-1",id:"offcanvasNotifications","aria-labelledby":"offcanvasNotificationsLabel","data-bs-toggle":"offcanvas"},Og=lt(()=>w("div",{class:"offcanvas-header"},[w("h5",{class:"offcanvas-title",id:"offcanvasNotificationsLabel"},"알림"),w("button",{type:"button",class:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"})],-1)),Dg={class:"offcanvas-body"};function Mg(t,e,n,s,i,r){const o=de("router-link"),l=de("notifications");return se(),_e("div",null,[w("nav",mg,[w("div",vg,[yg,D(o,{to:"/",class:"navbar-brand mx-auto"},{default:j(()=>[ae("Todak Todak")]),_:1}),bg,w("div",wg,[Eg,w("div",Cg,[D(o,{to:"/goal",class:"nav-link"},{default:j(()=>[Sg,ae(" 목표 만들기")]),_:1}),D(o,{to:"/calendar",class:"nav-link"},{default:j(()=>[Ig,ae(" 캘린더")]),_:1}),D(o,{to:"/meeting",class:"nav-link"},{default:j(()=>[Tg,ae(" 모임")]),_:1}),D(o,{to:"/board",class:"nav-link"},{default:j(()=>[Rg,ae(" 게시판")]),_:1}),D(o,{to:"/Friend",class:"nav-link"},{default:j(()=>[Ng,ae(" 친구")]),_:1}),D(o,{to:"/habit",class:"nav-link"},{default:j(()=>[Pg,ae(" 습관")]),_:1}),D(o,{to:"/voice",class:"nav-link"},{default:j(()=>[xg,ae(" 음성")]),_:1}),D(o,{to:"/mypage",class:"nav-link"},{default:j(()=>[Ag,ae(" 마이페이지")]),_:1})])])])]),w("div",kg,[Og,w("div",Dg,[D(l)])])])}const Lg=We(gg,[["render",Mg],["__scopeId","data-v-e502d182"]]),Fg={};function $g(t,e){return se(),_e("div")}const Bg=We(Fg,[["render",$g]]);let Wg=new Date;console.log(Wg);const Ug={name:"App"},Vg={id:"app"},Hg=w("div",{class:"top-bar"},[w("div",{class:"quote"},'"행복은 우연이 아니라 선택이다"'),w("div",null,"짐 론")],-1),jg={class:"todo-section"},Kg={class:"todo-date"},zg=ch('<div class="todo-items"><div class="todo-item"><label for="todo1">할 일 추가하기</label><input type="checkbox" id="todo1"></div><div class="todo-item"><label for="todo2">쇼핑 가기</label><input type="checkbox" id="todo2"></div></div>',1),Gg={class:"todo-section"},qg={class:"todo-date"},Qg=ch('<div class="todo-items"><div class="todo-item"><label for="todo1">약먹기</label><input type="checkbox" id="todo1"></div><div class="todo-item"><label for="todo2">박먹기</label><input type="checkbox" id="todo2"></div></div>',1);function Yg(t,e,n,s,i,r){const o=de("Sidebar");return se(),_e("div",Vg,[D(o),Hg,w("div",jg,[w("div",Kg,[w("span",null,_t(t.today),1)]),zg]),w("div",Gg,[w("div",qg,[w("span",null,_t(t.today),1)]),Qg])])}const wo=We(Ug,[["render",Yg]]),Jg={};function Xg(t,e){return se(),_e("div")}const _h=We(Jg,[["render",Xg]]),Zg={};function em(t,e){return se(),_e("div")}const gh=We(Zg,[["render",em]]);/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const Hn=typeof window<"u";function tm(t){return t.__esModule||t[Symbol.toStringTag]==="Module"}const re=Object.assign;function Kr(t,e){const n={};for(const s in e){const i=e[s];n[s]=vt(i)?i.map(t):t(i)}return n}const Rs=()=>{},vt=Array.isArray,nm=/\/$/,sm=t=>t.replace(nm,"");function zr(t,e,n="/"){let s,i={},r="",o="";const l=e.indexOf("#");let a=e.indexOf("?");return l<a&&l>=0&&(a=-1),a>-1&&(s=e.slice(0,a),r=e.slice(a+1,l>-1?l:e.length),i=t(r)),l>-1&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=lm(s??e,n),{fullPath:s+(r&&"?")+r+o,path:s,query:i,hash:o}}function im(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Ja(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function rm(t,e,n){const s=e.matched.length-1,i=n.matched.length-1;return s>-1&&s===i&&Zn(e.matched[s],n.matched[i])&&mh(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function Zn(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function mh(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!om(t[n],e[n]))return!1;return!0}function om(t,e){return vt(t)?Xa(t,e):vt(e)?Xa(e,t):t===e}function Xa(t,e){return vt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function lm(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),i=s[s.length-1];(i===".."||i===".")&&s.push("");let r=n.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")r>1&&r--;else break;return n.slice(0,r).join("/")+"/"+s.slice(o-(o===s.length?1:0)).join("/")}var Bs;(function(t){t.pop="pop",t.push="push"})(Bs||(Bs={}));var Ns;(function(t){t.back="back",t.forward="forward",t.unknown=""})(Ns||(Ns={}));function am(t){if(!t)if(Hn){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),sm(t)}const cm=/^[^#]+#/;function um(t,e){return t.replace(cm,"#")+e}function hm(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const dr=()=>({left:window.pageXOffset,top:window.pageYOffset});function dm(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),i=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;e=hm(i,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.pageXOffset,e.top!=null?e.top:window.pageYOffset)}function Za(t,e){return(history.state?history.state.position-e:-1)+t}const Eo=new Map;function fm(t,e){Eo.set(t,e)}function pm(t){const e=Eo.get(t);return Eo.delete(t),e}let _m=()=>location.protocol+"//"+location.host;function vh(t,e){const{pathname:n,search:s,hash:i}=e,r=t.indexOf("#");if(r>-1){let l=i.includes(t.slice(r))?t.slice(r).length:1,a=i.slice(l);return a[0]!=="/"&&(a="/"+a),Ja(a,"")}return Ja(n,t)+s+i}function gm(t,e,n,s){let i=[],r=[],o=null;const l=({state:d})=>{const _=vh(t,location),m=n.value,T=e.value;let x=0;if(d){if(n.value=_,e.value=d,o&&o===m){o=null;return}x=T?d.position-T.position:0}else s(_);i.forEach(O=>{O(n.value,m,{delta:x,type:Bs.pop,direction:x?x>0?Ns.forward:Ns.back:Ns.unknown})})};function a(){o=n.value}function c(d){i.push(d);const _=()=>{const m=i.indexOf(d);m>-1&&i.splice(m,1)};return r.push(_),_}function u(){const{history:d}=window;d.state&&d.replaceState(re({},d.state,{scroll:dr()}),"")}function h(){for(const d of r)d();r=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:a,listen:c,destroy:h}}function ec(t,e,n,s=!1,i=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:i?dr():null}}function mm(t){const{history:e,location:n}=window,s={value:vh(t,n)},i={value:e.state};i.value||r(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(a,c,u){const h=t.indexOf("#"),d=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+a:_m()+t+a;try{e[u?"replaceState":"pushState"](c,"",d),i.value=c}catch(_){console.error(_),n[u?"replace":"assign"](d)}}function o(a,c){const u=re({},e.state,ec(i.value.back,a,i.value.forward,!0),c,{position:i.value.position});r(a,u,!0),s.value=a}function l(a,c){const u=re({},i.value,e.state,{forward:a,scroll:dr()});r(u.current,u,!0);const h=re({},ec(s.value,a,null),{position:u.position+1},c);r(a,h,!1),s.value=a}return{location:s,state:i,push:l,replace:o}}function vm(t){t=am(t);const e=mm(t),n=gm(t,e.state,e.location,e.replace);function s(r,o=!0){o||n.pauseListeners(),history.go(r)}const i=re({location:"",base:t,go:s,createHref:um.bind(null,t)},e,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function ym(t){return typeof t=="string"||t&&typeof t=="object"}function yh(t){return typeof t=="string"||typeof t=="symbol"}const jt={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},bh=Symbol("");var tc;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(tc||(tc={}));function es(t,e){return re(new Error,{type:t,[bh]:!0},e)}function kt(t,e){return t instanceof Error&&bh in t&&(e==null||!!(t.type&e))}const nc="[^/]+?",bm={sensitive:!1,strict:!1,start:!0,end:!0},wm=/[.+*?^${}()[\]/\\]/g;function Em(t,e){const n=re({},bm,e),s=[];let i=n.start?"^":"";const r=[];for(const c of t){const u=c.length?[]:[90];n.strict&&!c.length&&(i+="/");for(let h=0;h<c.length;h++){const d=c[h];let _=40+(n.sensitive?.25:0);if(d.type===0)h||(i+="/"),i+=d.value.replace(wm,"\\$&"),_+=40;else if(d.type===1){const{value:m,repeatable:T,optional:x,regexp:O}=d;r.push({name:m,repeatable:T,optional:x});const W=O||nc;if(W!==nc){_+=10;try{new RegExp(`(${W})`)}catch(X){throw new Error(`Invalid custom RegExp for param "${m}" (${W}): `+X.message)}}let U=T?`((?:${W})(?:/(?:${W}))*)`:`(${W})`;h||(U=x&&c.length<2?`(?:/${U})`:"/"+U),x&&(U+="?"),i+=U,_+=20,x&&(_+=-8),T&&(_+=-20),W===".*"&&(_+=-50)}u.push(_)}s.push(u)}if(n.strict&&n.end){const c=s.length-1;s[c][s[c].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function l(c){const u=c.match(o),h={};if(!u)return null;for(let d=1;d<u.length;d++){const _=u[d]||"",m=r[d-1];h[m.name]=_&&m.repeatable?_.split("/"):_}return h}function a(c){let u="",h=!1;for(const d of t){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const _ of d)if(_.type===0)u+=_.value;else if(_.type===1){const{value:m,repeatable:T,optional:x}=_,O=m in c?c[m]:"";if(vt(O)&&!T)throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);const W=vt(O)?O.join("/"):O;if(!W)if(x)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${m}"`);u+=W}}return u||"/"}return{re:o,score:s,keys:r,parse:l,stringify:a}}function Cm(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===80?-1:1:t.length>e.length?e.length===1&&e[0]===80?1:-1:0}function Sm(t,e){let n=0;const s=t.score,i=e.score;for(;n<s.length&&n<i.length;){const r=Cm(s[n],i[n]);if(r)return r;n++}if(Math.abs(i.length-s.length)===1){if(sc(s))return 1;if(sc(i))return-1}return i.length-s.length}function sc(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const Im={type:0,value:""},Tm=/[a-zA-Z0-9_]/;function Rm(t){if(!t)return[[]];if(t==="/")return[[Im]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(_){throw new Error(`ERR (${n})/"${c}": ${_}`)}let n=0,s=n;const i=[];let r;function o(){r&&i.push(r),r=[]}let l=0,a,c="",u="";function h(){c&&(n===0?r.push({type:0,value:c}):n===1||n===2||n===3?(r.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:1,value:c,regexp:u,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),c="")}function d(){c+=a}for(;l<t.length;){if(a=t[l++],a==="\\"&&n!==2){s=n,n=4;continue}switch(n){case 0:a==="/"?(c&&h(),o()):a===":"?(h(),n=1):d();break;case 4:d(),n=s;break;case 1:a==="("?n=2:Tm.test(a)?d():(h(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&l--);break;case 2:a===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+a:n=3:u+=a;break;case 3:h(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&l--,u="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${c}"`),h(),o(),i}function Nm(t,e,n){const s=Em(Rm(t.path),n),i=re(s,{record:t,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function Pm(t,e){const n=[],s=new Map;e=oc({strict:!1,end:!0,sensitive:!1},e);function i(u){return s.get(u)}function r(u,h,d){const _=!d,m=xm(u);m.aliasOf=d&&d.record;const T=oc(e,u),x=[m];if("alias"in u){const U=typeof u.alias=="string"?[u.alias]:u.alias;for(const X of U)x.push(re({},m,{components:d?d.record.components:m.components,path:X,aliasOf:d?d.record:m}))}let O,W;for(const U of x){const{path:X}=U;if(h&&X[0]!=="/"){const we=h.record.path,z=we[we.length-1]==="/"?"":"/";U.path=h.record.path+(X&&z+X)}if(O=Nm(U,h,T),d?d.alias.push(O):(W=W||O,W!==O&&W.alias.push(O),_&&u.name&&!rc(O)&&o(u.name)),m.children){const we=m.children;for(let z=0;z<we.length;z++)r(we[z],O,d&&d.children[z])}d=d||O,(O.record.components&&Object.keys(O.record.components).length||O.record.name||O.record.redirect)&&a(O)}return W?()=>{o(W)}:Rs}function o(u){if(yh(u)){const h=s.get(u);h&&(s.delete(u),n.splice(n.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=n.indexOf(u);h>-1&&(n.splice(h,1),u.record.name&&s.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function l(){return n}function a(u){let h=0;for(;h<n.length&&Sm(u,n[h])>=0&&(u.record.path!==n[h].record.path||!wh(u,n[h]));)h++;n.splice(h,0,u),u.record.name&&!rc(u)&&s.set(u.record.name,u)}function c(u,h){let d,_={},m,T;if("name"in u&&u.name){if(d=s.get(u.name),!d)throw es(1,{location:u});T=d.record.name,_=re(ic(h.params,d.keys.filter(W=>!W.optional).map(W=>W.name)),u.params&&ic(u.params,d.keys.map(W=>W.name))),m=d.stringify(_)}else if("path"in u)m=u.path,d=n.find(W=>W.re.test(m)),d&&(_=d.parse(m),T=d.record.name);else{if(d=h.name?s.get(h.name):n.find(W=>W.re.test(h.path)),!d)throw es(1,{location:u,currentLocation:h});T=d.record.name,_=re({},h.params,u.params),m=d.stringify(_)}const x=[];let O=d;for(;O;)x.unshift(O.record),O=O.parent;return{name:T,path:m,params:_,matched:x,meta:km(x)}}return t.forEach(u=>r(u)),{addRoute:r,resolve:c,removeRoute:o,getRoutes:l,getRecordMatcher:i}}function ic(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function xm(t){return{path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:void 0,beforeEnter:t.beforeEnter,props:Am(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}}}function Am(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function rc(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function km(t){return t.reduce((e,n)=>re(e,n.meta),{})}function oc(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}function wh(t,e){return e.children.some(n=>n===t||wh(t,n))}const Eh=/#/g,Om=/&/g,Dm=/\//g,Mm=/=/g,Lm=/\?/g,Ch=/\+/g,Fm=/%5B/g,$m=/%5D/g,Sh=/%5E/g,Bm=/%60/g,Ih=/%7B/g,Wm=/%7C/g,Th=/%7D/g,Um=/%20/g;function Cl(t){return encodeURI(""+t).replace(Wm,"|").replace(Fm,"[").replace($m,"]")}function Vm(t){return Cl(t).replace(Ih,"{").replace(Th,"}").replace(Sh,"^")}function Co(t){return Cl(t).replace(Ch,"%2B").replace(Um,"+").replace(Eh,"%23").replace(Om,"%26").replace(Bm,"`").replace(Ih,"{").replace(Th,"}").replace(Sh,"^")}function Hm(t){return Co(t).replace(Mm,"%3D")}function jm(t){return Cl(t).replace(Eh,"%23").replace(Lm,"%3F")}function Km(t){return t==null?"":jm(t).replace(Dm,"%2F")}function Mi(t){try{return decodeURIComponent(""+t)}catch{}return""+t}function zm(t){const e={};if(t===""||t==="?")return e;const s=(t[0]==="?"?t.slice(1):t).split("&");for(let i=0;i<s.length;++i){const r=s[i].replace(Ch," "),o=r.indexOf("="),l=Mi(o<0?r:r.slice(0,o)),a=o<0?null:Mi(r.slice(o+1));if(l in e){let c=e[l];vt(c)||(c=e[l]=[c]),c.push(a)}else e[l]=a}return e}function lc(t){let e="";for(let n in t){const s=t[n];if(n=Hm(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(vt(s)?s.map(r=>r&&Co(r)):[s&&Co(s)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+n,r!=null&&(e+="="+r))})}return e}function Gm(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=vt(s)?s.map(i=>i==null?null:""+i):s==null?s:""+s)}return e}const qm=Symbol(""),ac=Symbol(""),Sl=Symbol(""),Rh=Symbol(""),So=Symbol("");function ys(){let t=[];function e(s){return t.push(s),()=>{const i=t.indexOf(s);i>-1&&t.splice(i,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function qt(t,e,n,s,i){const r=s&&(s.enterCallbacks[i]=s.enterCallbacks[i]||[]);return()=>new Promise((o,l)=>{const a=h=>{h===!1?l(es(4,{from:n,to:e})):h instanceof Error?l(h):ym(h)?l(es(2,{from:e,to:h})):(r&&s.enterCallbacks[i]===r&&typeof h=="function"&&r.push(h),o())},c=t.call(s&&s.instances[i],e,n,a);let u=Promise.resolve(c);t.length<3&&(u=u.then(a)),u.catch(h=>l(h))})}function Gr(t,e,n,s){const i=[];for(const r of t)for(const o in r.components){let l=r.components[o];if(!(e!=="beforeRouteEnter"&&!r.instances[o]))if(Qm(l)){const c=(l.__vccOpts||l)[e];c&&i.push(qt(c,n,s,r,o))}else{let a=l();i.push(()=>a.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${r.path}"`));const u=tm(c)?c.default:c;r.components[o]=u;const d=(u.__vccOpts||u)[e];return d&&qt(d,n,s,r,o)()}))}}return i}function Qm(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function cc(t){const e=Mt(Sl),n=Mt(Rh),s=dt(()=>e.resolve(Gn(t.to))),i=dt(()=>{const{matched:a}=s.value,{length:c}=a,u=a[c-1],h=n.matched;if(!u||!h.length)return-1;const d=h.findIndex(Zn.bind(null,u));if(d>-1)return d;const _=uc(a[c-2]);return c>1&&uc(u)===_&&h[h.length-1].path!==_?h.findIndex(Zn.bind(null,a[c-2])):d}),r=dt(()=>i.value>-1&&Xm(n.params,s.value.params)),o=dt(()=>i.value>-1&&i.value===n.matched.length-1&&mh(n.params,s.value.params));function l(a={}){return Jm(a)?e[Gn(t.replace)?"replace":"push"](Gn(t.to)).catch(Rs):Promise.resolve()}return{route:s,href:dt(()=>s.value.href),isActive:r,isExactActive:o,navigate:l}}const Ym=qu({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:cc,setup(t,{slots:e}){const n=sr(cc(t)),{options:s}=Mt(Sl),i=dt(()=>({[hc(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[hc(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const r=e.default&&e.default(n);return t.custom?r:fh("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},r)}}}),Nh=Ym;function Jm(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function Xm(t,e){for(const n in e){const s=e[n],i=t[n];if(typeof s=="string"){if(s!==i)return!1}else if(!vt(i)||i.length!==s.length||s.some((r,o)=>r!==i[o]))return!1}return!0}function uc(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const hc=(t,e,n)=>t??e??n,Zm=qu({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=Mt(So),i=dt(()=>t.route||s.value),r=Mt(ac,0),o=dt(()=>{let c=Gn(r);const{matched:u}=i.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),l=dt(()=>i.value.matched[o.value]);Ii(ac,dt(()=>o.value+1)),Ii(qm,l),Ii(So,i);const a=cs();return Ci(()=>[a.value,l.value,t.name],([c,u,h],[d,_,m])=>{u&&(u.instances[h]=c,_&&_!==u&&c&&c===d&&(u.leaveGuards.size||(u.leaveGuards=_.leaveGuards),u.updateGuards.size||(u.updateGuards=_.updateGuards))),c&&u&&(!_||!Zn(u,_)||!d)&&(u.enterCallbacks[h]||[]).forEach(T=>T(c))},{flush:"post"}),()=>{const c=i.value,u=t.name,h=l.value,d=h&&h.components[u];if(!d)return dc(n.default,{Component:d,route:c});const _=h.props[u],m=_?_===!0?c.params:typeof _=="function"?_(c):_:null,x=fh(d,re({},m,e,{onVnodeUnmounted:O=>{O.component.isUnmounted&&(h.instances[u]=null)},ref:a}));return dc(n.default,{Component:x,route:c})||x}}});function dc(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const Ph=Zm;function ev(t){const e=Pm(t.routes,t),n=t.parseQuery||zm,s=t.stringifyQuery||lc,i=t.history,r=ys(),o=ys(),l=ys(),a=Zf(jt);let c=jt;Hn&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Kr.bind(null,y=>""+y),h=Kr.bind(null,Km),d=Kr.bind(null,Mi);function _(y,A){let N,M;return yh(y)?(N=e.getRecordMatcher(y),M=A):M=y,e.addRoute(M,N)}function m(y){const A=e.getRecordMatcher(y);A&&e.removeRoute(A)}function T(){return e.getRoutes().map(y=>y.record)}function x(y){return!!e.getRecordMatcher(y)}function O(y,A){if(A=re({},A||a.value),typeof y=="string"){const p=zr(n,y,A.path),g=e.resolve({path:p.path},A),b=i.createHref(p.fullPath);return re(p,g,{params:d(g.params),hash:Mi(p.hash),redirectedFrom:void 0,href:b})}let N;if("path"in y)N=re({},y,{path:zr(n,y.path,A.path).path});else{const p=re({},y.params);for(const g in p)p[g]==null&&delete p[g];N=re({},y,{params:h(p)}),A.params=h(A.params)}const M=e.resolve(N,A),ne=y.hash||"";M.params=u(d(M.params));const ge=im(s,re({},y,{hash:Vm(ne),path:M.path})),f=i.createHref(ge);return re({fullPath:ge,hash:ne,query:s===lc?Gm(y.query):y.query||{}},M,{redirectedFrom:void 0,href:f})}function W(y){return typeof y=="string"?zr(n,y,a.value.path):re({},y)}function U(y,A){if(c!==y)return es(8,{from:A,to:y})}function X(y){return Fe(y)}function we(y){return X(re(W(y),{replace:!0}))}function z(y){const A=y.matched[y.matched.length-1];if(A&&A.redirect){const{redirect:N}=A;let M=typeof N=="function"?N(y):N;return typeof M=="string"&&(M=M.includes("?")||M.includes("#")?M=W(M):{path:M},M.params={}),re({query:y.query,hash:y.hash,params:"path"in M?{}:y.params},M)}}function Fe(y,A){const N=c=O(y),M=a.value,ne=y.state,ge=y.force,f=y.replace===!0,p=z(N);if(p)return Fe(re(W(p),{state:typeof p=="object"?re({},ne,p.state):ne,force:ge,replace:f}),A||N);const g=N;g.redirectedFrom=A;let b;return!ge&&rm(s,M,N)&&(b=es(16,{to:g,from:M}),Et(M,M,!0,!1)),(b?Promise.resolve(b):bt(g,M)).catch(v=>kt(v)?kt(v,2)?v:Vt(v):te(v,g,M)).then(v=>{if(v){if(kt(v,2))return Fe(re({replace:f},W(v.to),{state:typeof v.to=="object"?re({},ne,v.to.state):ne,force:ge}),A||g)}else v=pn(g,M,!0,f,ne);return Ut(g,M,v),v})}function nt(y,A){const N=U(y,A);return N?Promise.reject(N):Promise.resolve()}function Ln(y){const A=Bn.values().next().value;return A&&typeof A.runWithContext=="function"?A.runWithContext(y):y()}function bt(y,A){let N;const[M,ne,ge]=tv(y,A);N=Gr(M.reverse(),"beforeRouteLeave",y,A);for(const p of M)p.leaveGuards.forEach(g=>{N.push(qt(g,y,A))});const f=nt.bind(null,y,A);return N.push(f),Oe(N).then(()=>{N=[];for(const p of r.list())N.push(qt(p,y,A));return N.push(f),Oe(N)}).then(()=>{N=Gr(ne,"beforeRouteUpdate",y,A);for(const p of ne)p.updateGuards.forEach(g=>{N.push(qt(g,y,A))});return N.push(f),Oe(N)}).then(()=>{N=[];for(const p of ge)if(p.beforeEnter)if(vt(p.beforeEnter))for(const g of p.beforeEnter)N.push(qt(g,y,A));else N.push(qt(p.beforeEnter,y,A));return N.push(f),Oe(N)}).then(()=>(y.matched.forEach(p=>p.enterCallbacks={}),N=Gr(ge,"beforeRouteEnter",y,A),N.push(f),Oe(N))).then(()=>{N=[];for(const p of o.list())N.push(qt(p,y,A));return N.push(f),Oe(N)}).catch(p=>kt(p,8)?p:Promise.reject(p))}function Ut(y,A,N){l.list().forEach(M=>Ln(()=>M(y,A,N)))}function pn(y,A,N,M,ne){const ge=U(y,A);if(ge)return ge;const f=A===jt,p=Hn?history.state:{};N&&(M||f?i.replace(y.fullPath,re({scroll:f&&p&&p.scroll},ne)):i.push(y.fullPath,ne)),a.value=y,Et(y,A,N,f),Vt()}let wt;function gs(){wt||(wt=i.listen((y,A,N)=>{if(!hi.listening)return;const M=O(y),ne=z(M);if(ne){Fe(re(ne,{replace:!0}),M).catch(Rs);return}c=M;const ge=a.value;Hn&&fm(Za(ge.fullPath,N.delta),dr()),bt(M,ge).catch(f=>kt(f,12)?f:kt(f,2)?(Fe(f.to,M).then(p=>{kt(p,20)&&!N.delta&&N.type===Bs.pop&&i.go(-1,!1)}).catch(Rs),Promise.reject()):(N.delta&&i.go(-N.delta,!1),te(f,M,ge))).then(f=>{f=f||pn(M,ge,!1),f&&(N.delta&&!kt(f,8)?i.go(-N.delta,!1):N.type===Bs.pop&&kt(f,20)&&i.go(-1,!1)),Ut(M,ge,f)}).catch(Rs)}))}let Fn=ys(),Se=ys(),oe;function te(y,A,N){Vt(y);const M=Se.list();return M.length?M.forEach(ne=>ne(y,A,N)):console.error(y),Promise.reject(y)}function At(){return oe&&a.value!==jt?Promise.resolve():new Promise((y,A)=>{Fn.add([y,A])})}function Vt(y){return oe||(oe=!y,gs(),Fn.list().forEach(([A,N])=>y?N(y):A()),Fn.reset()),y}function Et(y,A,N,M){const{scrollBehavior:ne}=t;if(!Hn||!ne)return Promise.resolve();const ge=!N&&pm(Za(y.fullPath,0))||(M||!N)&&history.state&&history.state.scroll||null;return Wu().then(()=>ne(y,A,ge)).then(f=>f&&dm(f)).catch(f=>te(f,y,A))}const Ue=y=>i.go(y);let $n;const Bn=new Set,hi={currentRoute:a,listening:!0,addRoute:_,removeRoute:m,hasRoute:x,getRoutes:T,resolve:O,options:t,push:X,replace:we,go:Ue,back:()=>Ue(-1),forward:()=>Ue(1),beforeEach:r.add,beforeResolve:o.add,afterEach:l.add,onError:Se.add,isReady:At,install(y){const A=this;y.component("RouterLink",Nh),y.component("RouterView",Ph),y.config.globalProperties.$router=A,Object.defineProperty(y.config.globalProperties,"$route",{enumerable:!0,get:()=>Gn(a)}),Hn&&!$n&&a.value===jt&&($n=!0,X(i.location).catch(ne=>{}));const N={};for(const ne in jt)Object.defineProperty(N,ne,{get:()=>a.value[ne],enumerable:!0});y.provide(Sl,A),y.provide(Rh,ku(N)),y.provide(So,a);const M=y.unmount;Bn.add(y),y.unmount=function(){Bn.delete(y),Bn.size<1&&(c=jt,wt&&wt(),wt=null,a.value=jt,$n=!1,oe=!1),M()}}};function Oe(y){return y.reduce((A,N)=>A.then(()=>Ln(N)),Promise.resolve())}return hi}function tv(t,e){const n=[],s=[],i=[],r=Math.max(e.matched.length,t.matched.length);for(let o=0;o<r;o++){const l=e.matched[o];l&&(t.matched.find(c=>Zn(c,l))?s.push(l):n.push(l));const a=t.matched[o];a&&(e.matched.find(c=>Zn(c,a))||i.push(a))}return[n,s,i]}const nv={name:"App",data(){return{is_modal_valid:!1}},components:{Sidebar:Lg,TodoList:Bg,Main:wo,Calendar:_h,Friend:El,MyPage:gh,RouterView:Ph,RouterLink:Nh},methods:{closeModal(){this.is_modal_valid=!1}}},sv={id:"app"},iv={class:"bottom-nav"};function rv(t,e,n,s,i,r){const o=de("Sidebar"),l=de("RouterLink"),a=de("RouterView");return se(),_e("div",sv,[D(o),w("div",iv,[D(l,{to:"/Main"},{default:j(()=>[ae("Home")]),_:1}),D(l,{to:"/Calendar"},{default:j(()=>[ae("Calendar")]),_:1}),D(l,{to:"/Friend"},{default:j(()=>[ae("Friends")]),_:1}),D(l,{to:"/Meeting"},{default:j(()=>[ae("Meeting")]),_:1}),D(l,{to:"/mypage"},{default:j(()=>[ae("MyPage")]),_:1})]),D(a)])}const ov=We(nv,[["render",rv]]),lv={};function av(t,e){return se(),_e("div")}const cv=We(lv,[["render",av]]),uv={data(){return{newRoom:{title:""}}},methods:{createRoom(){this.$emit("create",this.newRoom)}}},fr=t=>(_l("data-v-f4305c61"),t=t(),gl(),t),hv={class:"modal-dialog"},dv={class:"modal-content"},fv={class:"modal-header"},pv=fr(()=>w("h5",{class:"modal-title"},"모임 방 추가",-1)),_v=fr(()=>w("span",{"aria-hidden":"true"},"×",-1)),gv=[_v],mv={class:"modal-body"},vv={class:"form-group"},yv=fr(()=>w("label",{for:"roomTitle"},"방 제목:",-1)),bv=fr(()=>w("button",{type:"submit",class:"btn btn-primary"},"추가",-1));function wv(t,e,n,s,i,r){return se(),_e("div",{class:"modal",onClick:e[3]||(e[3]=Di(o=>t.$emit("close"),["self"]))},[w("div",hv,[w("div",dv,[w("div",fv,[pv,w("button",{type:"button",class:"close",onClick:e[0]||(e[0]=o=>t.$emit("close"))},gv)]),w("div",mv,[w("form",{onSubmit:e[2]||(e[2]=Di((...o)=>r.createRoom&&r.createRoom(...o),["prevent"]))},[w("div",vv,[yv,ml(w("input",{"onUpdate:modelValue":e[1]||(e[1]=o=>i.newRoom.title=o),type:"text",class:"form-control",id:"roomTitle",required:""},null,512),[[wl,i.newRoom.title]])]),bv],32)])])])])}const Ev=We(uv,[["render",wv],["__scopeId","data-v-f4305c61"]]),Cv={components:{CreateRoomModal:Ev},data(){return{rooms:[{id:1,title:"모임 방 1",currentMembers:5,creationTime:new Date},{id:2,title:"모임 방 2",currentMembers:3,creationTime:new Date}],newRoom:{title:""},showModal:!1,searchKeyword:""}},computed:{filteredRooms(){const t=this.searchKeyword.toLowerCase();return this.rooms.filter(e=>e.title.toLowerCase().includes(t))}},methods:{showCreateRoomModal(){this.showModal=!0},closeCreateRoomModal(){this.showModal=!1},createRoom(){this.rooms.push({id:this.rooms.length+1,title:this.newRoom.title,currentMembers:0,creationTime:new Date}),this.newRoom.title="",this.closeCreateRoomModal()}}},Sv={class:"container mt-5"},Iv={class:"form-group"},Tv={key:0},Rv={key:1},Nv=w("p",null,"검색 결과가 없습니다.",-1),Pv=[Nv];function xv(t,e,n,s,i,r){const o=de("RoomCard"),l=de("CreateRoomModal");return se(),_e("div",Sv,[w("div",Iv,[ml(w("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>i.searchKeyword=a),type:"text",class:"form-control",placeholder:"모임 방 검색"},null,512),[[wl,i.searchKeyword]])]),r.filteredRooms.length>0?(se(),_e("div",Tv,[(se(!0),_e(He,null,Ls(r.filteredRooms,a=>(se(),$s(o,{key:a.id,room:a},null,8,["room"]))),128))])):(se(),_e("div",Rv,Pv)),w("button",{class:"btn btn-primary mt-3",onClick:e[1]||(e[1]=(...a)=>r.showCreateRoomModal&&r.showCreateRoomModal(...a))},"모임 방 추가"),i.showModal?(se(),$s(l,{key:2,onClose:r.closeCreateRoomModal,onCreate:r.createRoom},null,8,["onClose","onCreate"])):uh("",!0)])}const Av=We(Cv,[["render",xv]]),xh=cs([]),Ah=cs([]);for(let t=1;t<=15;t++)xh.value.push({id:`usable-${t}`,name:"학습된 음성 "+t}),Ah.value.push({id:`training-${t}`,name:"훈련 중 "+t});const kv={name:"App",components:{},data(){return{usable:xh,training:Ah}}},Ov={id:"app"},Dv={class:"word-voice-edit"},Mv=w("p",{class:"voice-title"},"음성 선택",-1),Lv={class:"voice-box"},Fv={class:"material-switch"},$v=["id"],Bv=["for"],Wv=w("br",null,null,-1),Uv=w("p",{class:"voice-title"},"학습 중인 음성",-1),Vv={class:"voice-box"},Hv={class:"material-switch"},jv=["id"],Kv=["for"];function zv(t,e,n,s,i,r){const o=de("router-link");return se(),_e("div",Ov,[w("p",Dv,[ae("편집 "),D(o,{to:{name:"VoiceTrainer"},style:{"font-size":"40px"}},{default:j(()=>[ae("+")]),_:1})]),Mv,w("div",Lv,[w("dl",null,[(se(!0),_e(He,null,Ls(i.usable,l=>(se(),_e("div",{key:l.id,class:"voice"},[w("dt",null,_t(l.name),1),w("dd",null,[w("div",Fv,[w("input",{id:`switch-${l.id}`,name:"s`switch-${voice.id}`",type:"checkbox"},null,8,$v),w("label",{for:`switch-${l.id}`,class:"default-color"},null,8,Bv)])])]))),128))])]),Wv,Uv,w("div",Vv,[w("dl",null,[(se(!0),_e(He,null,Ls(i.training,l=>(se(),_e("div",{key:l.id,class:"voice"},[w("dt",null,_t(l.name),1),w("dd",null,[w("div",Hv,[w("input",{id:`switch-${l.id}`,name:"s`switch-${voice.id}`",type:"checkbox"},null,8,jv),w("label",{for:`switch-${l.id}`,class:"default-color"},null,8,Kv)])])]))),128))])])])}const Gv=We(kv,[["render",zv]]);let qv=cs([{id:1,name:"안녕하세요. 좋은 아침입니다."},{id:2,name:"안녕하세요. 좋은 점심입니다."},{id:3,name:"안녕하세요. 좋은 저녁입니다."}]),Qv=cs(1);const Yv={name:"App",data(){return{sentences:qv,currentSentenceId:Qv}},computed:{currentSentence(){return this.sentences[this.currentSentenceId]}},methods:{prevSentence(){this.currentSentenceId>0&&this.currentSentenceId--},nextSentence(){this.currentSentenceId<this.sentences.length-1&&this.currentSentenceId++}}},Jv={id:"app"},Xv={class:"voice-title"},Zv={class:"sentence-box"},ey={class:"buttons"},ty=["disabled"],ny=["disabled"],sy=w("p",null,"다음 문장을 소리내어 읽으세요.",-1),iy={p:""},ry=w("br",null,null,-1),oy=w("p",{class:"voice-title"},"학습 중인 음성",-1),ly=w("div",{class:"voice-box"},null,-1);function ay(t,e,n,s,i,r){return se(),_e("div",Jv,[w("p",Xv,[ae("음성 학습 "),w("button",{onClick:e[0]||(e[0]=o=>t.$router.back())},"back")]),w("div",Zv,[w("div",ey,[w("button",{onClick:e[1]||(e[1]=(...o)=>r.prevSentence&&r.prevSentence(...o)),disabled:t.currentSentenceIndex===0},"<",8,ty),w("button",{onClick:e[2]||(e[2]=(...o)=>r.nextSentence&&r.nextSentence(...o)),disabled:t.currentSentenceIndex===i.sentences.length-1},">",8,ny)]),sy,w("p",null,_t(r.currentSentence.name),1),w("p",iy,_t(r.currentSentence.id)+" / "+_t(i.sentences.length),1)]),ry,oy,ly])}const cy=We(Yv,[["render",ay]]);var fc={};/**
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
 */const kh={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const C=function(t,e){if(!t)throw us(e)},us=function(t){return new Error("Firebase Database ("+kh.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const Oh=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},uy=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],l=t[n++],a=((i&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(a>>10)),e[s++]=String.fromCharCode(56320+(a&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Il={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,l=o?t[i+1]:0,a=i+2<t.length,c=a?t[i+2]:0,u=r>>2,h=(r&3)<<4|l>>4;let d=(l&15)<<2|c>>6,_=c&63;a||(_=64,o||(d=64)),s.push(n[u],n[h],n[d],n[_])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Oh(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):uy(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||l==null||c==null||h==null)throw new hy;const d=r<<2|l>>4;if(s.push(d),c!==64){const _=l<<4&240|c>>2;if(s.push(_),h!==64){const m=c<<6&192|h;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class hy extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Dh=function(t){const e=Oh(t);return Il.encodeByteArray(e,!0)},Li=function(t){return Dh(t).replace(/\./g,"")},Io=function(t){try{return Il.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function dy(t){return Ws(void 0,t)}function Ws(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!fy(n)||(t[n]=Ws(t[n],e[n]));return t}function fy(t){return t!=="__proto__"}/**
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
 */function py(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const _y=()=>py().__FIREBASE_DEFAULTS__,gy=()=>{if(typeof process>"u"||typeof fc>"u")return;const t=fc.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},my=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Io(t[1]);return e&&JSON.parse(e)},vy=()=>{try{return _y()||gy()||my()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Mh=()=>{var t;return(t=vy())===null||t===void 0?void 0:t.config};/**
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
 */class je{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function yy(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Li(JSON.stringify(n)),Li(JSON.stringify(o)),""].join(".")}/**
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
 */function by(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Lh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(by())}function wy(){return typeof self=="object"&&self.self===self}function Ey(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Fh(){return kh.NODE_ADMIN===!0}function Cy(){try{return typeof indexedDB=="object"}catch{return!1}}function Sy(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}/**
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
 */const Iy="FirebaseError";class hs extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Iy,Object.setPrototypeOf(this,hs.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,pr.prototype.create)}}class pr{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?Ty(r,s):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new hs(i,l,s)}}function Ty(t,e){return t.replace(Ry,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const Ry=/\{\$([^}]+)}/g;/**
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
 */function Us(t){return JSON.parse(t)}function Ee(t){return JSON.stringify(t)}/**
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
 */const $h=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=Us(Io(r[0])||""),n=Us(Io(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},Ny=function(t){const e=$h(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Py=function(t){const e=$h(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Ze(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Tn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function To(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Fi(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function Ro(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(pc(r)&&pc(o)){if(!Ro(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function pc(t){return t!==null&&typeof t=="object"}/**
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
 */function xy(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class Ay{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)s[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const d=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],l=this.chain_[3],a=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=l^r&(o^l),u=1518500249):(c=r^o^l,u=1859775393):h<60?(c=r&o|l&(r|o),u=2400959708):(c=r^o^l,u=3395469782);const d=(i<<5|i>>>27)+c+a+u+s[h]&4294967295;a=l,l=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+a&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function ky(t,e){const n=new Oy(t,e);return n.subscribe.bind(n)}class Oy{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let i;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");Dy(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:s},i.next===void 0&&(i.next=qr),i.error===void 0&&(i.error=qr),i.complete===void 0&&(i.complete=qr);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Dy(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function qr(){}/**
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
 */const B=function(t,e,n,s){let i;if(s<e?i="at least "+e:s>n&&(i=n===0?"none":"no more than "+n),i){const r=t+" failed: Was called with "+s+(s===1?" argument.":" arguments.")+" Expects "+i+".";throw new Error(r)}};function Ge(t,e){return`${t} failed: ${e} argument `}function Re(t,e,n,s){if(!(s&&!n)&&typeof n!="function")throw new Error(Ge(t,e)+"must be a valid function.")}function _c(t,e,n,s){if(!(s&&!n)&&(typeof n!="object"||n===null))throw new Error(Ge(t,e)+"must be a valid context object.")}/**
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
 */const My=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,C(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},_r=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function tt(t){return t&&t._delegate?t._delegate:t}class $t{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const mn="[DEFAULT]";/**
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
 */class No{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new je;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fy(e))try{this.getOrInitializeService({instanceIdentifier:mn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=mn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=mn){return this.instances.has(e)}getOptions(e=mn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);s===l&&o.resolve(i)}return i}onInit(e,n){var s;const i=this.normalizeInstanceIdentifier(n),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ly(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=mn){return this.component?this.component.multipleInstances?e:mn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ly(t){return t===mn?void 0:t}function Fy(t){return t.instantiationMode==="EAGER"}/**
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
 */class Bh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new No(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */const Tl=[];var ce;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ce||(ce={}));const Wh={debug:ce.DEBUG,verbose:ce.VERBOSE,info:ce.INFO,warn:ce.WARN,error:ce.ERROR,silent:ce.SILENT},$y=ce.INFO,By={[ce.DEBUG]:"log",[ce.VERBOSE]:"log",[ce.INFO]:"info",[ce.WARN]:"warn",[ce.ERROR]:"error"},Wy=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=By[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class gr{constructor(e){this.name=e,this._logLevel=$y,this._logHandler=Wy,this._userLogHandler=null,Tl.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Wh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ce.DEBUG,...e),this._logHandler(this,ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ce.VERBOSE,...e),this._logHandler(this,ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ce.INFO,...e),this._logHandler(this,ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ce.WARN,...e),this._logHandler(this,ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ce.ERROR,...e),this._logHandler(this,ce.ERROR,...e)}}function Uy(t){Tl.forEach(e=>{e.setLogLevel(t)})}function Vy(t,e){for(const n of Tl){let s=null;e&&e.level&&(s=Wh[e.level]),t===null?n.userLogHandler=null:n.userLogHandler=(i,r,...o)=>{const l=o.map(a=>{if(a==null)return null;if(typeof a=="string")return a;if(typeof a=="number"||typeof a=="boolean")return a.toString();if(a instanceof Error)return a.message;try{return JSON.stringify(a)}catch{return null}}).filter(a=>a).join(" ");r>=(s??i.logLevel)&&t({level:ce[r].toLowerCase(),message:l,args:o,type:i.name})}}}const Hy=(t,e)=>e.some(n=>t instanceof n);let gc,mc;function jy(){return gc||(gc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ky(){return mc||(mc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Uh=new WeakMap,Po=new WeakMap,Vh=new WeakMap,Qr=new WeakMap,Rl=new WeakMap;function zy(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Zt(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Uh.set(n,t)}).catch(()=>{}),Rl.set(e,t),e}function Gy(t){if(Po.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Po.set(t,e)}let xo={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Po.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Vh.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Zt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function qy(t){xo=t(xo)}function Qy(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Yr(this),e,...n);return Vh.set(s,e.sort?e.sort():[e]),Zt(s)}:Ky().includes(t)?function(...e){return t.apply(Yr(this),e),Zt(Uh.get(this))}:function(...e){return Zt(t.apply(Yr(this),e))}}function Yy(t){return typeof t=="function"?Qy(t):(t instanceof IDBTransaction&&Gy(t),Hy(t,jy())?new Proxy(t,xo):t)}function Zt(t){if(t instanceof IDBRequest)return zy(t);if(Qr.has(t))return Qr.get(t);const e=Yy(t);return e!==t&&(Qr.set(t,e),Rl.set(e,t)),e}const Yr=t=>Rl.get(t);function Jy(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),l=Zt(o);return s&&o.addEventListener("upgradeneeded",a=>{s(Zt(o.result),a.oldVersion,a.newVersion,Zt(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{r&&a.addEventListener("close",()=>r()),i&&a.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const Xy=["get","getKey","getAll","getAllKeys","count"],Zy=["put","add","delete","clear"],Jr=new Map;function vc(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Jr.get(e))return Jr.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=Zy.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Xy.includes(n)))return;const r=async function(o,...l){const a=this.transaction(o,i?"readwrite":"readonly");let c=a.store;return s&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&a.done]))[0]};return Jr.set(e,r),r}qy(t=>({...t,get:(e,n,s)=>vc(e,n)||t.get(e,n,s),has:(e,n)=>!!vc(e,n)||t.has(e,n)}));/**
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
 */class eb{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(tb(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function tb(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ao="@firebase/app",yc="0.9.26";/**
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
 */const Rn=new gr("@firebase/app"),nb="@firebase/app-compat",sb="@firebase/analytics-compat",ib="@firebase/analytics",rb="@firebase/app-check-compat",ob="@firebase/app-check",lb="@firebase/auth",ab="@firebase/auth-compat",cb="@firebase/database",ub="@firebase/database-compat",hb="@firebase/functions",db="@firebase/functions-compat",fb="@firebase/installations",pb="@firebase/installations-compat",_b="@firebase/messaging",gb="@firebase/messaging-compat",mb="@firebase/performance",vb="@firebase/performance-compat",yb="@firebase/remote-config",bb="@firebase/remote-config-compat",wb="@firebase/storage",Eb="@firebase/storage-compat",Cb="@firebase/firestore",Sb="@firebase/firestore-compat",Ib="firebase",Tb="10.7.2";/**
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
 */const on="[DEFAULT]",Rb={[Ao]:"fire-core",[nb]:"fire-core-compat",[ib]:"fire-analytics",[sb]:"fire-analytics-compat",[ob]:"fire-app-check",[rb]:"fire-app-check-compat",[lb]:"fire-auth",[ab]:"fire-auth-compat",[cb]:"fire-rtdb",[ub]:"fire-rtdb-compat",[hb]:"fire-fn",[db]:"fire-fn-compat",[fb]:"fire-iid",[pb]:"fire-iid-compat",[_b]:"fire-fcm",[gb]:"fire-fcm-compat",[mb]:"fire-perf",[vb]:"fire-perf-compat",[yb]:"fire-rc",[bb]:"fire-rc-compat",[wb]:"fire-gcs",[Eb]:"fire-gcs-compat",[Cb]:"fire-fst",[Sb]:"fire-fst-compat","fire-js":"fire-js",[Ib]:"fire-js-all"};/**
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
 */const ln=new Map,Vs=new Map;function $i(t,e){try{t.container.addComponent(e)}catch(n){Rn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Hh(t,e){t.container.addOrOverwriteComponent(e)}function ts(t){const e=t.name;if(Vs.has(e))return Rn.debug(`There were multiple attempts to register component ${e}.`),!1;Vs.set(e,t);for(const n of ln.values())$i(n,t);return!0}function jh(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Nb(t,e,n=on){jh(t,e).clearInstance(n)}function Pb(){Vs.clear()}/**
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
 */const xb={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Lt=new pr("app","Firebase",xb);/**
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
 */let Ab=class{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new $t("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Lt.create("app-deleted",{appName:this._name})}};/**
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
 */const Nl=Tb;function Pl(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:on,automaticDataCollectionEnabled:!1},e),i=s.name;if(typeof i!="string"||!i)throw Lt.create("bad-app-name",{appName:String(i)});if(n||(n=Mh()),!n)throw Lt.create("no-options");const r=ln.get(i);if(r){if(Ro(n,r.options)&&Ro(s,r.config))return r;throw Lt.create("duplicate-app",{appName:i})}const o=new Bh(i);for(const a of Vs.values())o.addComponent(a);const l=new Ab(n,s,o);return ln.set(i,l),l}function kb(t=on){const e=ln.get(t);if(!e&&t===on&&Mh())return Pl();if(!e)throw Lt.create("no-app",{appName:t});return e}function Ob(){return Array.from(ln.values())}async function Kh(t){const e=t.name;ln.has(e)&&(ln.delete(e),await Promise.all(t.container.getProviders().map(n=>n.delete())),t.isDeleted=!0)}function en(t,e,n){var s;let i=(s=Rb[t])!==null&&s!==void 0?s:t;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const l=[`Unable to register library "${i}" with version "${e}":`];r&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rn.warn(l.join(" "));return}ts(new $t(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}function zh(t,e){if(t!==null&&typeof t!="function")throw Lt.create("invalid-log-argument");Vy(t,e)}function Gh(t){Uy(t)}/**
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
 */const Db="firebase-heartbeat-database",Mb=1,Hs="firebase-heartbeat-store";let Xr=null;function qh(){return Xr||(Xr=Jy(Db,Mb,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Hs)}catch(n){console.warn(n)}}}}).catch(t=>{throw Lt.create("idb-open",{originalErrorMessage:t.message})})),Xr}async function Lb(t){try{return await(await qh()).transaction(Hs).objectStore(Hs).get(Qh(t))}catch(e){if(e instanceof hs)Rn.warn(e.message);else{const n=Lt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Rn.warn(n.message)}}}async function bc(t,e){try{const s=(await qh()).transaction(Hs,"readwrite");await s.objectStore(Hs).put(e,Qh(t)),await s.done}catch(n){if(n instanceof hs)Rn.warn(n.message);else{const s=Lt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Rn.warn(s.message)}}}function Qh(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Fb=1024,$b=30*24*60*60*1e3;class Bb{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ub(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=wc();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=$b}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=wc(),{heartbeatsToSend:s,unsentEntries:i}=Wb(this._heartbeatsCache.heartbeats),r=Li(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function wc(){return new Date().toISOString().substring(0,10)}function Wb(t,e=Fb){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Ec(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ec(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Ub{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Cy()?Sy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Lb(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return bc(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return bc(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ec(t){return Li(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function Vb(t){ts(new $t("platform-logger",e=>new eb(e),"PRIVATE")),ts(new $t("heartbeat",e=>new Bb(e),"PRIVATE")),en(Ao,yc,t),en(Ao,yc,"esm2017"),en("fire-js","")}Vb("");const Hb=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:hs,SDK_VERSION:Nl,_DEFAULT_ENTRY_NAME:on,_addComponent:$i,_addOrOverwriteComponent:Hh,_apps:ln,_clearComponents:Pb,_components:Vs,_getProvider:jh,_registerComponent:ts,_removeServiceInstance:Nb,deleteApp:Kh,getApp:kb,getApps:Ob,initializeApp:Pl,onLog:zh,registerVersion:en,setLogLevel:Gh},Symbol.toStringTag,{value:"Module"}));/**
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
 */class jb{constructor(e,n){this._delegate=e,this.firebase=n,$i(e,new $t("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),Kh(this._delegate)))}_getService(e,n=on){var s;this._delegate.checkDestroyed();const i=this._delegate.container.getProvider(e);return!i.isInitialized()&&((s=i.getComponent())===null||s===void 0?void 0:s.instantiationMode)==="EXPLICIT"&&i.initialize(),i.getImmediate({identifier:n})}_removeServiceInstance(e,n=on){this._delegate.container.getProvider(e).clearInstance(n)}_addComponent(e){$i(this._delegate,e)}_addOrOverwriteComponent(e){Hh(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
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
 */const Kb={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},Cc=new pr("app-compat","Firebase",Kb);/**
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
 */function zb(t){const e={},n={__esModule:!0,initializeApp:r,app:i,registerVersion:en,setLogLevel:Gh,onLog:zh,apps:null,SDK_VERSION:Nl,INTERNAL:{registerComponent:l,removeApp:s,useAsService:a,modularAPIs:Hb}};n.default=n,Object.defineProperty(n,"apps",{get:o});function s(c){delete e[c]}function i(c){if(c=c||on,!Ze(e,c))throw Cc.create("no-app",{appName:c});return e[c]}i.App=t;function r(c,u={}){const h=Pl(c,u);if(Ze(e,h.name))return e[h.name];const d=new t(h,n);return e[h.name]=d,d}function o(){return Object.keys(e).map(c=>e[c])}function l(c){const u=c.name,h=u.replace("-compat","");if(ts(c)&&c.type==="PUBLIC"){const d=(_=i())=>{if(typeof _[h]!="function")throw Cc.create("invalid-app-argument",{appName:u});return _[h]()};c.serviceProps!==void 0&&Ws(d,c.serviceProps),n[h]=d,t.prototype[h]=function(..._){return this._getService.bind(this,u).apply(this,c.multipleInstances?_:[])}}return c.type==="PUBLIC"?n[h]:null}function a(c,u){return u==="serverAuth"?null:u}return n}/**
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
 */function Yh(){const t=zb(jb);t.INTERNAL=Object.assign(Object.assign({},t.INTERNAL),{createFirebaseNamespace:Yh,extendNamespace:e,createSubscribe:ky,ErrorFactory:pr,deepExtend:Ws});function e(n){Ws(t,n)}return t}const Gb=Yh();/**
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
 */const Sc=new gr("@firebase/app-compat"),qb="@firebase/app-compat",Qb="0.2.26";/**
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
 */function Yb(t){en(qb,Qb,t)}/**
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
 */if(wy()&&self.firebase!==void 0){Sc.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);const t=self.firebase.SDK_VERSION;t&&t.indexOf("LITE")>=0&&Sc.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `)}const xl=Gb;Yb();var Jb="firebase",Xb="10.7.2";/**
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
 */xl.registerVersion(Jb,Xb,"app-compat");var Ic={};const Tc="@firebase/database",Rc="1.0.2";/**
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
 */let Jh="";function Xh(t){Jh=t}/**
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
 */class Zb{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ee(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Us(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class ew{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Ze(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const Zh=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Zb(e)}}catch{}return new ew},wn=Zh("localStorage"),ko=Zh("sessionStorage");/**
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
 */const Qn=new gr("@firebase/database"),ed=function(){let t=1;return function(){return t++}}(),td=function(t){const e=My(t),n=new Ay;n.update(e);const s=n.digest();return Il.encodeByteArray(s)},ti=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=ti.apply(null,s):typeof s=="object"?e+=Ee(s):e+=s,e+=" "}return e};let Sn=null,Nc=!0;const nd=function(t,e){C(!e||t===!0||t===!1,"Can't turn on custom loggers persistently."),t===!0?(Qn.logLevel=ce.VERBOSE,Sn=Qn.log.bind(Qn),e&&ko.set("logging_enabled",!0)):typeof t=="function"?Sn=t:(Sn=null,ko.remove("logging_enabled"))},Pe=function(...t){if(Nc===!0&&(Nc=!1,Sn===null&&ko.get("logging_enabled")===!0&&nd(!0)),Sn){const e=ti.apply(null,t);Sn(e)}},ni=function(t){return function(...e){Pe(t,...e)}},Oo=function(...t){const e="FIREBASE INTERNAL ERROR: "+ti(...t);Qn.error(e)},Pt=function(...t){const e=`FIREBASE FATAL ERROR: ${ti(...t)}`;throw Qn.error(e),new Error(e)},Le=function(...t){const e="FIREBASE WARNING: "+ti(...t);Qn.warn(e)},tw=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Le("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},mr=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},nw=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},an="[MIN_NAME]",Bt="[MAX_NAME]",On=function(t,e){if(t===e)return 0;if(t===an||e===Bt)return-1;if(e===an||t===Bt)return 1;{const n=Pc(t),s=Pc(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},sw=function(t,e){return t===e?0:t<e?-1:1},bs=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Ee(e))},Al=function(t){if(typeof t!="object"||t===null)return Ee(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=Ee(e[s]),n+=":",n+=Al(t[e[s]]);return n+="}",n},sd=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function xe(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const id=function(t){C(!mr(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,l,a;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=l+s,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const c=[];for(a=n;a;a-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(a=0;a<64;a+=8){let d=parseInt(u.substr(a,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},iw=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},rw=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function ow(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const lw=new RegExp("^-?(0*)\\d{1,10}$"),aw=-2147483648,cw=2147483647,Pc=function(t){if(lw.test(t)){const e=Number(t);if(e>=aw&&e<=cw)return e}return null},ds=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Le("Exception was thrown by user callback.",n),e},Math.floor(0))}},uw=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ps=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class hw{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(s=>this.appCheck=s)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){Le(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class dw{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Pe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Le(e)}}class Yn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Yn.OWNER="owner";/**
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
 */const kl="5",rd="v",od="s",ld="r",ad="f",cd=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ud="ls",hd="p",Do="ac",dd="websocket",fd="long_polling";/**
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
 */class pd{constructor(e,n,s,i,r=!1,o="",l=!1,a=!1){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=wn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&wn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function fw(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function _d(t,e,n){C(typeof e=="string","typeof type must == string"),C(typeof n=="object","typeof params must == object");let s;if(e===dd)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===fd)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);fw(t)&&(n.ns=t.namespace);const i=[];return xe(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class pw{constructor(){this.counters_={}}incrementCounter(e,n=1){Ze(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return dy(this.counters_)}}/**
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
 */const Zr={},eo={};function Ol(t){const e=t.toString();return Zr[e]||(Zr[e]=new pw),Zr[e]}function _w(t,e){const n=t.toString();return eo[n]||(eo[n]=e()),eo[n]}/**
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
 */class gw{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&ds(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const xc="start",mw="close",vw="pLPCommand",yw="pRTLPCB",gd="id",md="pw",vd="ser",bw="cb",ww="seg",Ew="ts",Cw="d",Sw="dframe",yd=1870,bd=30,Iw=yd-bd,Tw=25e3,Rw=3e4;class Qt{constructor(e,n,s,i,r,o,l){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ni(e),this.stats_=Ol(n),this.urlFn=a=>(this.appCheckToken&&(a[Do]=this.appCheckToken),_d(n,fd,a))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new gw(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Rw)),nw(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Dl((...r)=>{const[o,l,a,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===xc)this.id=l,this.password=a;else if(o===mw)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const s={};s[xc]="t",s[vd]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[bw]=this.scriptTagHolder.uniqueCallbackIdentifier),s[rd]=kl,this.transportSessionId&&(s[od]=this.transportSessionId),this.lastSessionId&&(s[ud]=this.lastSessionId),this.applicationId&&(s[hd]=this.applicationId),this.appCheckToken&&(s[Do]=this.appCheckToken),typeof location<"u"&&location.hostname&&cd.test(location.hostname)&&(s[ld]=ad);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Qt.forceAllow_=!0}static forceDisallow(){Qt.forceDisallow_=!0}static isAvailable(){return Qt.forceAllow_?!0:!Qt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!iw()&&!rw()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Ee(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Dh(n),i=sd(s,Iw);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[Sw]="t",s[gd]=e,s[md]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Ee(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Dl{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ed(),window[vw+this.uniqueCallbackIdentifier]=e,window[yw+this.uniqueCallbackIdentifier]=n,this.myIFrame=Dl.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Pe("frame writing exception"),l.stack&&Pe(l.stack),Pe(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Pe("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[gd]=this.myID,e[md]=this.myPW,e[vd]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+bd+s.length<=yd;){const o=this.pendingSegs.shift();s=s+"&"+ww+i+"="+o.seg+"&"+Ew+i+"="+o.ts+"&"+Cw+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(Tw)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{Pe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const Nw=16384,Pw=45e3;let Bi=null;typeof MozWebSocket<"u"?Bi=MozWebSocket:typeof WebSocket<"u"&&(Bi=WebSocket);class st{constructor(e,n,s,i,r,o,l){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ni(this.connId),this.stats_=Ol(n),this.connURL=st.connectionURL_(n,o,l,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[rd]=kl,typeof location<"u"&&location.hostname&&cd.test(location.hostname)&&(o[ld]=ad),n&&(o[od]=n),s&&(o[ud]=s),i&&(o[Do]=i),r&&(o[hd]=r),_d(e,dd,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,wn.set("previous_websocket_failure",!0);try{let s;Fh(),this.mySock=new Bi(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){st.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Bi!==null&&!st.forceDisallow_}static previouslyFailed(){return wn.isInMemoryStorage||wn.get("previous_websocket_failure")===!0}markConnectionHealthy(){wn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Us(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(C(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=Ee(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=sd(n,Nw);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Pw))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}st.responsesRequiredToBeHealthy=2;st.healthyTimeout=3e4;/**
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
 */class ns{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Qt,st]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=st&&st.isAvailable();let s=n&&!st.previouslyFailed();if(e.webSocketOnly&&(n||Le("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[st];else{const i=this.transports_=[];for(const r of ns.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);ns.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ns.globalTransportInitialized_=!1;/**
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
 */const xw=6e4,Aw=5e3,kw=10*1024,Ow=100*1024,to="t",Ac="d",Dw="s",kc="r",Mw="e",Oc="o",Dc="a",Mc="n",Lc="p",Lw="h";class Fw{constructor(e,n,s,i,r,o,l,a,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ni("c:"+this.id+":"),this.transportManager_=new ns(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Ps(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Ow?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>kw?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(to in e){const n=e[to];n===Dc?this.upgradeIfSecondaryHealthy_():n===kc?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Oc&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=bs("t",e),s=bs("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Lc,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Dc,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Mc,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=bs("t",e),s=bs("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=bs(to,e);if(Ac in e){const s=e[Ac];if(n===Lw){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===Mc){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Dw?this.onConnectionShutdown_(s):n===kc?this.onReset_(s):n===Mw?Oo("Server Error: "+s):n===Oc?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Oo("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),kl!==s&&Le("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),Ps(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(xw))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ps(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Aw))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Lc,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(wn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class wd{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class Ed{constructor(e){this.allowedEvents_=e,this.listeners_={},C(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){C(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class Wi extends Ed{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Lh()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Wi}getInitialEvent(e){return C(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Fc=32,$c=768;class ie{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function Z(){return new ie("")}function G(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function cn(t){return t.pieces_.length-t.pieceNum_}function ue(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new ie(t.pieces_,e)}function Ml(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function $w(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function js(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Cd(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new ie(e,0)}function ve(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof ie)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new ie(n,0)}function q(t){return t.pieceNum_>=t.pieces_.length}function Be(t,e){const n=G(t),s=G(e);if(n===null)return e;if(n===s)return Be(ue(t),ue(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Bw(t,e){const n=js(t,0),s=js(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=On(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function Ll(t,e){if(cn(t)!==cn(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function rt(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(cn(t)>cn(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class Ww{constructor(e,n){this.errorPrefix_=n,this.parts_=js(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=_r(this.parts_[s]);Sd(this)}}function Uw(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=_r(e),Sd(t)}function Vw(t){const e=t.parts_.pop();t.byteLength_-=_r(e),t.parts_.length>0&&(t.byteLength_-=1)}function Sd(t){if(t.byteLength_>$c)throw new Error(t.errorPrefix_+"has a key path longer than "+$c+" bytes ("+t.byteLength_+").");if(t.parts_.length>Fc)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Fc+") or object contains a cycle "+vn(t))}function vn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class Fl extends Ed{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}static getInstance(){return new Fl}getInitialEvent(e){return C(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const ws=1e3,Hw=60*5*1e3,Bc=30*1e3,jw=1.3,Kw=3e4,zw="server_kill",Wc=3;class Ft extends wd{constructor(e,n,s,i,r,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=Ft.nextPersistentConnectionId_++,this.log_=ni("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ws,this.maxReconnectDelay_=Hw,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a&&!Fh())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Fl.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Wi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(Ee(r)),C(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new je,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),C(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),C(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const a=l.d,c=l.s;Ft.warnOnListenWarnings_(a,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,a))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Ze(e,"w")){const s=Tn(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Le(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Py(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Bc)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Ny(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),C(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ee(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Oo("Unrecognized action received from server: "+Ee(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){C(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ws,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ws,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Kw&&(this.reconnectDelay_=ws),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*jw)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Ft.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,s())},c=function(h){C(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(h)};this.realtime_={close:a,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Pe("getToken() completed but was canceled"):(Pe("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,l=new Fw(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,_=>{Le(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(zw)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&Le(h),a())}}}interrupt(e){Pe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Pe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],To(this.interruptReasons_)&&(this.reconnectDelay_=ws,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>Al(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new ie(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){Pe("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Wc&&(this.reconnectDelay_=Bc,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Pe("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Wc&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Jh.replace(/\./g,"-")]=1,Lh()?e["framework.cordova"]=1:Ey()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Wi.getInstance().currentlyOnline();return To(this.interruptReasons_)&&e}}Ft.nextPersistentConnectionId_=0;Ft.nextConnectionId_=0;/**
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
 */class Q{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new Q(e,n)}}/**
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
 */class vr{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new Q(an,e),i=new Q(an,n);return this.compare(s,i)!==0}minPost(){return Q.MIN}}/**
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
 */let vi;class Id extends vr{static get __EMPTY_NODE(){return vi}static set __EMPTY_NODE(e){vi=e}compare(e,n){return On(e.name,n.name)}isDefinedOn(e){throw us("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return Q.MIN}maxPost(){return new Q(Bt,vi)}makePost(e,n){return C(typeof e=="string","KeyIndex indexValue must always be a string."),new Q(e,vi)}toString(){return".key"}}const Rt=new Id;/**
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
 */class yi{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ne{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??Ne.RED,this.left=i??ze.EMPTY_NODE,this.right=r??ze.EMPTY_NODE}copy(e,n,s,i,r){return new Ne(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return ze.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return ze.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ne.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ne.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ne.RED=!0;Ne.BLACK=!1;class Gw{copy(e,n,s,i,r){return this}insert(e,n,s){return new Ne(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ze{constructor(e,n=ze.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ze(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Ne.BLACK,null,null))}remove(e){return new ze(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ne.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new yi(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new yi(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new yi(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new yi(this.root_,null,this.comparator_,!0,e)}}ze.EMPTY_NODE=new Gw;/**
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
 */function qw(t,e){return On(t.name,e.name)}function $l(t,e){return On(t,e)}/**
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
 */let Mo;function Qw(t){Mo=t}const Td=function(t){return typeof t=="number"?"number:"+id(t):"string:"+t},Rd=function(t){if(t.isLeafNode()){const e=t.val();C(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ze(e,".sv"),"Priority must be a string or number.")}else C(t===Mo||t.isEmpty(),"priority of unexpected type.");C(t===Mo||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Uc;class Te{constructor(e,n=Te.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,C(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Rd(this.priorityNode_)}static set __childrenNodeConstructor(e){Uc=e}static get __childrenNodeConstructor(){return Uc}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Te(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Te.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return q(e)?this:G(e)===".priority"?this.priorityNode_:Te.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Te.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=G(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(C(s!==".priority"||cn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,Te.__childrenNodeConstructor.EMPTY_NODE.updateChild(ue(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Td(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=id(this.value_):e+=this.value_,this.lazyHash_=td(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Te.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Te.__childrenNodeConstructor?-1:(C(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=Te.VALUE_TYPE_ORDER.indexOf(n),r=Te.VALUE_TYPE_ORDER.indexOf(s);return C(i>=0,"Unknown leaf type: "+n),C(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Te.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Nd,Pd;function Yw(t){Nd=t}function Jw(t){Pd=t}class Xw extends vr{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?On(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return Q.MIN}maxPost(){return new Q(Bt,new Te("[PRIORITY-POST]",Pd))}makePost(e,n){const s=Nd(e);return new Q(n,new Te("[PRIORITY-POST]",s))}toString(){return".priority"}}const fe=new Xw;/**
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
 */const Zw=Math.log(2);class eE{constructor(e){const n=r=>parseInt(Math.log(r)/Zw,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ui=function(t,e,n,s){t.sort(e);const i=function(a,c){const u=c-a;let h,d;if(u===0)return null;if(u===1)return h=t[a],d=n?n(h):h,new Ne(d,h.node,Ne.BLACK,null,null);{const _=parseInt(u/2,10)+a,m=i(a,_),T=i(_+1,c);return h=t[_],d=n?n(h):h,new Ne(d,h.node,Ne.BLACK,m,T)}},r=function(a){let c=null,u=null,h=t.length;const d=function(m,T){const x=h-m,O=h;h-=m;const W=i(x+1,O),U=t[x],X=n?n(U):U;_(new Ne(X,U.node,T,null,W))},_=function(m){c?(c.left=m,c=m):(u=m,c=m)};for(let m=0;m<a.count;++m){const T=a.nextBitIsOne(),x=Math.pow(2,a.count-(m+1));T?d(x,Ne.BLACK):(d(x,Ne.BLACK),d(x,Ne.RED))}return u},o=new eE(t.length),l=r(o);return new ze(s||e,l)};/**
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
 */let no;const Un={};class Ot{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return C(Un&&fe,"ChildrenNode.ts has not been loaded"),no=no||new Ot({".priority":Un},{".priority":fe}),no}get(e){const n=Tn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ze?n:null}hasIndex(e){return Ze(this.indexSet_,e.toString())}addIndex(e,n){C(e!==Rt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator(Q.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let l;i?l=Ui(s,e.getCompare()):l=Un;const a=e.toString(),c=Object.assign({},this.indexSet_);c[a]=e;const u=Object.assign({},this.indexes_);return u[a]=l,new Ot(u,c)}addToIndexes(e,n){const s=Fi(this.indexes_,(i,r)=>{const o=Tn(this.indexSet_,r);if(C(o,"Missing index implementation for "+r),i===Un)if(o.isDefinedOn(e.node)){const l=[],a=n.getIterator(Q.Wrap);let c=a.getNext();for(;c;)c.name!==e.name&&l.push(c),c=a.getNext();return l.push(e),Ui(l,o.getCompare())}else return Un;else{const l=n.get(e.name);let a=i;return l&&(a=a.remove(new Q(e.name,l))),a.insert(e,e.node)}});return new Ot(s,this.indexSet_)}removeFromIndexes(e,n){const s=Fi(this.indexes_,i=>{if(i===Un)return i;{const r=n.get(e.name);return r?i.remove(new Q(e.name,r)):i}});return new Ot(s,this.indexSet_)}}/**
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
 */let Es;class ${constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Rd(this.priorityNode_),this.children_.isEmpty()&&C(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Es||(Es=new $(new ze($l),null,Ot.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Es}updatePriority(e){return this.children_.isEmpty()?this:new $(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Es:n}}getChild(e){const n=G(e);return n===null?this:this.getImmediateChild(n).getChild(ue(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(C(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new Q(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?Es:this.priorityNode_;return new $(i,o,r)}}updateChild(e,n){const s=G(e);if(s===null)return n;{C(G(e)!==".priority"||cn(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(ue(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(fe,(o,l)=>{n[o]=l.val(e),s++,r&&$.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Td(this.getPriority().val())+":"),this.forEachChild(fe,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":td(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new Q(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new Q(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new Q(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,Q.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,Q.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===si?-1:0}withIndex(e){if(e===Rt||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new $(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Rt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(fe),i=n.getIterator(fe);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Rt?null:this.indexMap_.get(e.toString())}}$.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class tE extends ${constructor(){super(new ze($l),$.EMPTY_NODE,Ot.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return $.EMPTY_NODE}isEmpty(){return!1}}const si=new tE;Object.defineProperties(Q,{MIN:{value:new Q(an,$.EMPTY_NODE)},MAX:{value:new Q(Bt,si)}});Id.__EMPTY_NODE=$.EMPTY_NODE;Te.__childrenNodeConstructor=$;Qw(si);Jw(si);/**
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
 */const nE=!0;function be(t,e=null){if(t===null)return $.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),C(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Te(n,be(e))}if(!(t instanceof Array)&&nE){const n=[];let s=!1;if(xe(t,(o,l)=>{if(o.substring(0,1)!=="."){const a=be(l);a.isEmpty()||(s=s||!a.getPriority().isEmpty(),n.push(new Q(o,a)))}}),n.length===0)return $.EMPTY_NODE;const r=Ui(n,qw,o=>o.name,$l);if(s){const o=Ui(n,fe.getCompare());return new $(r,be(e),new Ot({".priority":o},{".priority":fe}))}else return new $(r,be(e),Ot.Default)}else{let n=$.EMPTY_NODE;return xe(t,(s,i)=>{if(Ze(t,s)&&s.substring(0,1)!=="."){const r=be(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(be(e))}}Yw(be);/**
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
 */class Bl extends vr{constructor(e){super(),this.indexPath_=e,C(!q(e)&&G(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?On(e.name,n.name):r}makePost(e,n){const s=be(e),i=$.EMPTY_NODE.updateChild(this.indexPath_,s);return new Q(n,i)}maxPost(){const e=$.EMPTY_NODE.updateChild(this.indexPath_,si);return new Q(Bt,e)}toString(){return js(this.indexPath_,0).join("/")}}/**
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
 */class sE extends vr{compare(e,n){const s=e.node.compareTo(n.node);return s===0?On(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return Q.MIN}maxPost(){return Q.MAX}makePost(e,n){const s=be(e);return new Q(n,s)}toString(){return".value"}}const Wl=new sE;/**
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
 */function xd(t){return{type:"value",snapshotNode:t}}function ss(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ks(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function zs(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function iE(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class Ul{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){C(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(i).equals(s.getChild(i))&&l.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Ks(n,l)):C(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(ss(n,s)):o.trackChildChange(zs(n,s,l))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(fe,(i,r)=>{n.hasChild(i)||s.trackChildChange(Ks(i,r))}),n.isLeafNode()||n.forEachChild(fe,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(zs(i,r,o))}else s.trackChildChange(ss(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?$.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Gs{constructor(e){this.indexedFilter_=new Ul(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Gs.getStartPost_(e),this.endPost_=Gs.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new Q(n,s))||(s=$.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=$.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority($.EMPTY_NODE);const r=this;return n.forEachChild(fe,(o,l)=>{r.matches(new Q(o,l))||(i=i.updateImmediateChild(o,$.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class rE{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Gs(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new Q(n,s))||(s=$.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=$.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=$.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority($.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,$.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,_)=>h(_,d)}else o=this.index_.getCompare();const l=e;C(l.numChildren()===this.limit_,"");const a=new Q(n,s),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),u=this.rangedFilter_.matches(a);if(l.hasChild(n)){const h=l.getImmediateChild(n);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===n||l.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const _=d==null?1:o(d,a);if(u&&!s.isEmpty()&&_>=0)return r!=null&&r.trackChildChange(zs(n,s,h)),l.updateImmediateChild(n,s);{r!=null&&r.trackChildChange(Ks(n,h));const T=l.updateImmediateChild(n,$.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(ss(d.name,d.node)),T.updateImmediateChild(d.name,d.node)):T}}else return s.isEmpty()?e:u&&o(c,a)>=0?(r!=null&&(r.trackChildChange(Ks(c.name,c.node)),r.trackChildChange(ss(n,s))),l.updateImmediateChild(n,s).updateImmediateChild(c.name,$.EMPTY_NODE)):e}}/**
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
 */class yr{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=fe}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return C(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return C(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:an}hasEnd(){return this.endSet_}getIndexEndValue(){return C(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return C(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Bt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return C(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===fe}copy(){const e=new yr;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function oE(t){return t.loadsAllData()?new Ul(t.getIndex()):t.hasLimit()?new rE(t):new Gs(t)}function lE(t,e){const n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="l",n}function aE(t,e){const n=t.copy();return n.limitSet_=!0,n.limit_=e,n.viewFrom_="r",n}function Lo(t,e,n){const s=t.copy();return s.startSet_=!0,e===void 0&&(e=null),s.indexStartValue_=e,n!=null?(s.startNameSet_=!0,s.indexStartName_=n):(s.startNameSet_=!1,s.indexStartName_=""),s}function cE(t,e,n){let s;return t.index_===Rt||n?s=Lo(t,e,n):s=Lo(t,e,Bt),s.startAfterSet_=!0,s}function Fo(t,e,n){const s=t.copy();return s.endSet_=!0,e===void 0&&(e=null),s.indexEndValue_=e,n!==void 0?(s.endNameSet_=!0,s.indexEndName_=n):(s.endNameSet_=!1,s.indexEndName_=""),s}function uE(t,e,n){let s;return t.index_===Rt||n?s=Fo(t,e,n):s=Fo(t,e,an),s.endBeforeSet_=!0,s}function br(t,e){const n=t.copy();return n.index_=e,n}function Vc(t){const e={};if(t.isDefault())return e;let n;if(t.index_===fe?n="$priority":t.index_===Wl?n="$value":t.index_===Rt?n="$key":(C(t.index_ instanceof Bl,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Ee(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=Ee(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+Ee(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=Ee(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+Ee(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Hc(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==fe&&(e.i=t.index_.toString()),e}/**
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
 */class Vi extends wd{constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=ni("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(C(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Vi.getListenId_(e,s),l={};this.listens_[o]=l;const a=Vc(e._queryParams);this.restRequest_(r+".json",a,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),Tn(this.listens_,o)===l){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,n){const s=Vi.getListenId_(e,n);delete this.listens_[s]}get(e){const n=Vc(e._queryParams),s=e._path.toString(),i=new je;return this.restRequest_(s+".json",n,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(s,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+xy(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(s&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=Us(l.responseText)}catch{Le("Failed to parse JSON response for "+o+": "+l.responseText)}s(null,a)}else l.status!==401&&l.status!==404&&Le("Got unsuccessful REST response for "+o+" Status: "+l.status),s(l.status);s=null}},l.open("GET",o,!0),l.send()})}}/**
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
 */class hE{constructor(){this.rootNode_=$.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function Hi(){return{value:null,children:new Map}}function fs(t,e,n){if(q(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=G(e);t.children.has(s)||t.children.set(s,Hi());const i=t.children.get(s);e=ue(e),fs(i,e,n)}}function $o(t,e){if(q(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(fe,(s,i)=>{fs(t,new ie(s),i)}),$o(t,e)}}else if(t.children.size>0){const n=G(e);return e=ue(e),t.children.has(n)&&$o(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function Bo(t,e,n){t.value!==null?n(e,t.value):dE(t,(s,i)=>{const r=new ie(e.toString()+"/"+s);Bo(i,r,n)})}function dE(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
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
 */class fE{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&xe(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
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
 */const jc=10*1e3,pE=30*1e3,_E=5*60*1e3;class gE{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new fE(e);const s=jc+(pE-jc)*Math.random();Ps(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;xe(e,(i,r)=>{r>0&&Ze(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),Ps(this.reportStats_.bind(this),Math.floor(Math.random()*2*_E))}}/**
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
 */var pt;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(pt||(pt={}));function Vl(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Hl(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function jl(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class ji{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=pt.ACK_USER_WRITE,this.source=Vl()}operationForChild(e){if(q(this.path)){if(this.affectedTree.value!=null)return C(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new ie(e));return new ji(Z(),n,this.revert)}}else return C(G(this.path)===e,"operationForChild called for unrelated child."),new ji(ue(this.path),this.affectedTree,this.revert)}}/**
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
 */class qs{constructor(e,n){this.source=e,this.path=n,this.type=pt.LISTEN_COMPLETE}operationForChild(e){return q(this.path)?new qs(this.source,Z()):new qs(this.source,ue(this.path))}}/**
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
 */class Nn{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=pt.OVERWRITE}operationForChild(e){return q(this.path)?new Nn(this.source,Z(),this.snap.getImmediateChild(e)):new Nn(this.source,ue(this.path),this.snap)}}/**
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
 */class is{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=pt.MERGE}operationForChild(e){if(q(this.path)){const n=this.children.subtree(new ie(e));return n.isEmpty()?null:n.value?new Nn(this.source,Z(),n.value):new is(this.source,Z(),n)}else return C(G(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new is(this.source,ue(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class un{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(q(e))return this.isFullyInitialized()&&!this.filtered_;const n=G(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class mE{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function vE(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(iE(o.childName,o.snapshotNode))}),Cs(t,i,"child_removed",e,s,n),Cs(t,i,"child_added",e,s,n),Cs(t,i,"child_moved",r,s,n),Cs(t,i,"child_changed",e,s,n),Cs(t,i,"value",e,s,n),i}function Cs(t,e,n,s,i,r){const o=s.filter(l=>l.type===n);o.sort((l,a)=>bE(t,l,a)),o.forEach(l=>{const a=yE(t,l,r);i.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(a,t.query_))})})}function yE(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function bE(t,e,n){if(e.childName==null||n.childName==null)throw us("Should only compare child_ events.");const s=new Q(e.childName,e.snapshotNode),i=new Q(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
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
 */function wr(t,e){return{eventCache:t,serverCache:e}}function xs(t,e,n,s){return wr(new un(e,n,s),t.serverCache)}function Ad(t,e,n,s){return wr(t.eventCache,new un(e,n,s))}function Ki(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Pn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let so;const wE=()=>(so||(so=new ze(sw)),so);class he{constructor(e,n=wE()){this.value=e,this.children=n}static fromObject(e){let n=new he(null);return xe(e,(s,i)=>{n=n.set(new ie(s),i)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:Z(),value:this.value};if(q(e))return null;{const s=G(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(ue(e),n);return r!=null?{path:ve(new ie(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(q(e))return this;{const n=G(e),s=this.children.get(n);return s!==null?s.subtree(ue(e)):new he(null)}}set(e,n){if(q(e))return new he(n,this.children);{const s=G(e),r=(this.children.get(s)||new he(null)).set(ue(e),n),o=this.children.insert(s,r);return new he(this.value,o)}}remove(e){if(q(e))return this.children.isEmpty()?new he(null):new he(null,this.children);{const n=G(e),s=this.children.get(n);if(s){const i=s.remove(ue(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new he(null):new he(this.value,r)}else return this}}get(e){if(q(e))return this.value;{const n=G(e),s=this.children.get(n);return s?s.get(ue(e)):null}}setTree(e,n){if(q(e))return n;{const s=G(e),r=(this.children.get(s)||new he(null)).setTree(ue(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new he(this.value,o)}}fold(e){return this.fold_(Z(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(ve(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,Z(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(q(e))return null;{const r=G(e),o=this.children.get(r);return o?o.findOnPath_(ue(e),ve(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,Z(),n)}foreachOnPath_(e,n,s){if(q(e))return this;{this.value&&s(n,this.value);const i=G(e),r=this.children.get(i);return r?r.foreachOnPath_(ue(e),ve(n,i),s):new he(null)}}foreach(e){this.foreach_(Z(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(ve(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
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
 */class mt{constructor(e){this.writeTree_=e}static empty(){return new mt(new he(null))}}function As(t,e,n){if(q(e))return new mt(new he(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=Be(i,e);return r=r.updateChild(o,n),new mt(t.writeTree_.set(i,r))}else{const i=new he(n),r=t.writeTree_.setTree(e,i);return new mt(r)}}}function Wo(t,e,n){let s=t;return xe(n,(i,r)=>{s=As(s,ve(e,i),r)}),s}function Kc(t,e){if(q(e))return mt.empty();{const n=t.writeTree_.setTree(e,new he(null));return new mt(n)}}function Uo(t,e){return Dn(t,e)!=null}function Dn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Be(n.path,e)):null}function zc(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(fe,(s,i)=>{e.push(new Q(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new Q(s,i.value))}),e}function tn(t,e){if(q(e))return t;{const n=Dn(t,e);return n!=null?new mt(new he(n)):new mt(t.writeTree_.subtree(e))}}function Vo(t){return t.writeTree_.isEmpty()}function rs(t,e){return kd(Z(),t.writeTree_,e)}function kd(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(C(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=kd(ve(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(ve(t,".priority"),s)),n}}/**
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
 */function Er(t,e){return Ld(e,t)}function EE(t,e,n,s,i){C(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=As(t.visibleWrites,e,n)),t.lastWriteId=s}function CE(t,e,n,s){C(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Wo(t.visibleWrites,e,n),t.lastWriteId=s}function SE(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function IE(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);C(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&TE(l,s.path)?i=!1:rt(s.path,l.path)&&(r=!0)),o--}if(i){if(r)return RE(t),!0;if(s.snap)t.visibleWrites=Kc(t.visibleWrites,s.path);else{const l=s.children;xe(l,a=>{t.visibleWrites=Kc(t.visibleWrites,ve(s.path,a))})}return!0}else return!1}function TE(t,e){if(t.snap)return rt(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&rt(ve(t.path,n),e))return!0;return!1}function RE(t){t.visibleWrites=Od(t.allWrites,NE,Z()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function NE(t){return t.visible}function Od(t,e,n){let s=mt.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let l;if(r.snap)rt(n,o)?(l=Be(n,o),s=As(s,l,r.snap)):rt(o,n)&&(l=Be(o,n),s=As(s,Z(),r.snap.getChild(l)));else if(r.children){if(rt(n,o))l=Be(n,o),s=Wo(s,l,r.children);else if(rt(o,n))if(l=Be(o,n),q(l))s=Wo(s,Z(),r.children);else{const a=Tn(r.children,G(l));if(a){const c=a.getChild(ue(l));s=As(s,Z(),c)}}}else throw us("WriteRecord should have .snap or .children")}}return s}function Dd(t,e,n,s,i){if(!s&&!i){const r=Dn(t.visibleWrites,e);if(r!=null)return r;{const o=tn(t.visibleWrites,e);if(Vo(o))return n;if(n==null&&!Uo(o,Z()))return null;{const l=n||$.EMPTY_NODE;return rs(o,l)}}}else{const r=tn(t.visibleWrites,e);if(!i&&Vo(r))return n;if(!i&&n==null&&!Uo(r,Z()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(rt(c.path,e)||rt(e,c.path))},l=Od(t.allWrites,o,e),a=n||$.EMPTY_NODE;return rs(l,a)}}}function PE(t,e,n){let s=$.EMPTY_NODE;const i=Dn(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(fe,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=tn(t.visibleWrites,e);return n.forEachChild(fe,(o,l)=>{const a=rs(tn(r,new ie(o)),l);s=s.updateImmediateChild(o,a)}),zc(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=tn(t.visibleWrites,e);return zc(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function xE(t,e,n,s,i){C(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=ve(e,n);if(Uo(t.visibleWrites,r))return null;{const o=tn(t.visibleWrites,r);return Vo(o)?i.getChild(n):rs(o,i.getChild(n))}}function AE(t,e,n,s){const i=ve(e,n),r=Dn(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=tn(t.visibleWrites,i);return rs(o,s.getNode().getImmediateChild(n))}else return null}function kE(t,e){return Dn(t.visibleWrites,e)}function OE(t,e,n,s,i,r,o){let l;const a=tn(t.visibleWrites,e),c=Dn(a,Z());if(c!=null)l=c;else if(n!=null)l=rs(a,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const u=[],h=o.getCompare(),d=r?l.getReverseIteratorFrom(s,o):l.getIteratorFrom(s,o);let _=d.getNext();for(;_&&u.length<i;)h(_,s)!==0&&u.push(_),_=d.getNext();return u}else return[]}function DE(){return{visibleWrites:mt.empty(),allWrites:[],lastWriteId:-1}}function zi(t,e,n,s){return Dd(t.writeTree,t.treePath,e,n,s)}function Kl(t,e){return PE(t.writeTree,t.treePath,e)}function Gc(t,e,n,s){return xE(t.writeTree,t.treePath,e,n,s)}function Gi(t,e){return kE(t.writeTree,ve(t.treePath,e))}function ME(t,e,n,s,i,r){return OE(t.writeTree,t.treePath,e,n,s,i,r)}function zl(t,e,n){return AE(t.writeTree,t.treePath,e,n)}function Md(t,e){return Ld(ve(t.treePath,e),t.writeTree)}function Ld(t,e){return{treePath:t,writeTree:e}}/**
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
 */class LE{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;C(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),C(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,zs(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,Ks(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,ss(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,zs(s,e.snapshotNode,i.oldSnap));else throw us("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class FE{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Fd=new FE;class Gl{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new un(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return zl(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Pn(this.viewCache_),r=ME(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function $E(t){return{filter:t}}function BE(t,e){C(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),C(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function WE(t,e,n,s,i){const r=new LE;let o,l;if(n.type===pt.OVERWRITE){const c=n;c.source.fromUser?o=Ho(t,e,c.path,c.snap,s,i,r):(C(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!q(c.path),o=qi(t,e,c.path,c.snap,s,i,l,r))}else if(n.type===pt.MERGE){const c=n;c.source.fromUser?o=VE(t,e,c.path,c.children,s,i,r):(C(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=jo(t,e,c.path,c.children,s,i,l,r))}else if(n.type===pt.ACK_USER_WRITE){const c=n;c.revert?o=KE(t,e,c.path,s,i,r):o=HE(t,e,c.path,c.affectedTree,s,i,r)}else if(n.type===pt.LISTEN_COMPLETE)o=jE(t,e,n.path,s,r);else throw us("Unknown operation type: "+n.type);const a=r.getChanges();return UE(e,o,a),{viewCache:o,changes:a}}function UE(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Ki(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(xd(Ki(e)))}}function $d(t,e,n,s,i,r){const o=e.eventCache;if(Gi(s,n)!=null)return e;{let l,a;if(q(n))if(C(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Pn(e),u=c instanceof $?c:$.EMPTY_NODE,h=Kl(s,u);l=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=zi(s,Pn(e));l=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=G(n);if(c===".priority"){C(cn(n)===1,"Can't have a priority with additional path components");const u=o.getNode();a=e.serverCache.getNode();const h=Gc(s,n,u,a);h!=null?l=t.filter.updatePriority(u,h):l=o.getNode()}else{const u=ue(n);let h;if(o.isCompleteForChild(c)){a=e.serverCache.getNode();const d=Gc(s,n,o.getNode(),a);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=zl(s,c,e.serverCache);h!=null?l=t.filter.updateChild(o.getNode(),c,h,u,i,r):l=o.getNode()}}return xs(e,l,o.isFullyInitialized()||q(n),t.filter.filtersNodes())}}function qi(t,e,n,s,i,r,o,l){const a=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(q(n))c=u.updateFullNode(a.getNode(),s,null);else if(u.filtersNodes()&&!a.isFiltered()){const _=a.getNode().updateChild(n,s);c=u.updateFullNode(a.getNode(),_,null)}else{const _=G(n);if(!a.isCompleteForPath(n)&&cn(n)>1)return e;const m=ue(n),x=a.getNode().getImmediateChild(_).updateChild(m,s);_===".priority"?c=u.updatePriority(a.getNode(),x):c=u.updateChild(a.getNode(),_,x,m,Fd,null)}const h=Ad(e,c,a.isFullyInitialized()||q(n),u.filtersNodes()),d=new Gl(i,h,r);return $d(t,h,n,i,d,l)}function Ho(t,e,n,s,i,r,o){const l=e.eventCache;let a,c;const u=new Gl(i,e,r);if(q(n))c=t.filter.updateFullNode(e.eventCache.getNode(),s,o),a=xs(e,c,!0,t.filter.filtersNodes());else{const h=G(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),s),a=xs(e,c,l.isFullyInitialized(),l.isFiltered());else{const d=ue(n),_=l.getNode().getImmediateChild(h);let m;if(q(d))m=s;else{const T=u.getCompleteChild(h);T!=null?Ml(d)===".priority"&&T.getChild(Cd(d)).isEmpty()?m=T:m=T.updateChild(d,s):m=$.EMPTY_NODE}if(_.equals(m))a=e;else{const T=t.filter.updateChild(l.getNode(),h,m,d,u,o);a=xs(e,T,l.isFullyInitialized(),t.filter.filtersNodes())}}}return a}function qc(t,e){return t.eventCache.isCompleteForChild(e)}function VE(t,e,n,s,i,r,o){let l=e;return s.foreach((a,c)=>{const u=ve(n,a);qc(e,G(u))&&(l=Ho(t,l,u,c,i,r,o))}),s.foreach((a,c)=>{const u=ve(n,a);qc(e,G(u))||(l=Ho(t,l,u,c,i,r,o))}),l}function Qc(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function jo(t,e,n,s,i,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,c;q(n)?c=s:c=new he(null).setTree(n,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const _=e.serverCache.getNode().getImmediateChild(h),m=Qc(t,_,d);a=qi(t,a,new ie(h),m,i,r,o,l)}}),c.children.inorderTraversal((h,d)=>{const _=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!_){const m=e.serverCache.getNode().getImmediateChild(h),T=Qc(t,m,d);a=qi(t,a,new ie(h),T,i,r,o,l)}}),a}function HE(t,e,n,s,i,r,o){if(Gi(i,n)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(s.value!=null){if(q(n)&&a.isFullyInitialized()||a.isCompleteForPath(n))return qi(t,e,n,a.getNode().getChild(n),i,r,l,o);if(q(n)){let c=new he(null);return a.getNode().forEachChild(Rt,(u,h)=>{c=c.set(new ie(u),h)}),jo(t,e,n,c,i,r,l,o)}else return e}else{let c=new he(null);return s.foreach((u,h)=>{const d=ve(n,u);a.isCompleteForPath(d)&&(c=c.set(u,a.getNode().getChild(d)))}),jo(t,e,n,c,i,r,l,o)}}function jE(t,e,n,s,i){const r=e.serverCache,o=Ad(e,r.getNode(),r.isFullyInitialized()||q(n),r.isFiltered());return $d(t,o,n,s,Fd,i)}function KE(t,e,n,s,i,r){let o;if(Gi(s,n)!=null)return e;{const l=new Gl(s,e,i),a=e.eventCache.getNode();let c;if(q(n)||G(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=zi(s,Pn(e));else{const h=e.serverCache.getNode();C(h instanceof $,"serverChildren would be complete if leaf node"),u=Kl(s,h)}u=u,c=t.filter.updateFullNode(a,u,r)}else{const u=G(n);let h=zl(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=a.getImmediateChild(u)),h!=null?c=t.filter.updateChild(a,u,h,ue(n),l,r):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(a,u,$.EMPTY_NODE,ue(n),l,r):c=a,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=zi(s,Pn(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Gi(s,Z())!=null,xs(e,c,o,t.filter.filtersNodes())}}/**
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
 */class zE{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Ul(s.getIndex()),r=oE(s);this.processor_=$E(r);const o=n.serverCache,l=n.eventCache,a=i.updateFullNode($.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode($.EMPTY_NODE,l.getNode(),null),u=new un(a,o.isFullyInitialized(),i.filtersNodes()),h=new un(c,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=wr(h,u),this.eventGenerator_=new mE(this.query_)}get query(){return this.query_}}function GE(t){return t.viewCache_.serverCache.getNode()}function qE(t){return Ki(t.viewCache_)}function QE(t,e){const n=Pn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!q(e)&&!n.getImmediateChild(G(e)).isEmpty())?n.getChild(e):null}function Yc(t){return t.eventRegistrations_.length===0}function YE(t,e){t.eventRegistrations_.push(e)}function Jc(t,e,n){const s=[];if(n){C(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function Xc(t,e,n,s){e.type===pt.MERGE&&e.source.queryId!==null&&(C(Pn(t.viewCache_),"We should always have a full cache before handling merges"),C(Ki(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=WE(t.processor_,i,e,n,s);return BE(t.processor_,r.viewCache),C(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Bd(t,r.changes,r.viewCache.eventCache.getNode(),null)}function JE(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(fe,(r,o)=>{s.push(ss(r,o))}),n.isFullyInitialized()&&s.push(xd(n.getNode())),Bd(t,s,n.getNode(),e)}function Bd(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return vE(t.eventGenerator_,e,n,i)}/**
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
 */let Qi;class Wd{constructor(){this.views=new Map}}function XE(t){C(!Qi,"__referenceConstructor has already been defined"),Qi=t}function ZE(){return C(Qi,"Reference.ts has not been loaded"),Qi}function eC(t){return t.views.size===0}function ql(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return C(r!=null,"SyncTree gave us an op for an invalid query."),Xc(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(Xc(o,e,n,s));return r}}function Ud(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let l=zi(n,i?s:null),a=!1;l?a=!0:s instanceof $?(l=Kl(n,s),a=!1):(l=$.EMPTY_NODE,a=!1);const c=wr(new un(l,a,!1),new un(s,i,!1));return new zE(e,c)}return o}function tC(t,e,n,s,i,r){const o=Ud(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),YE(o,n),JE(o,n)}function nC(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const l=hn(t);if(i==="default")for(const[a,c]of t.views.entries())o=o.concat(Jc(c,n,s)),Yc(c)&&(t.views.delete(a),c.query._queryParams.loadsAllData()||r.push(c.query));else{const a=t.views.get(i);a&&(o=o.concat(Jc(a,n,s)),Yc(a)&&(t.views.delete(i),a.query._queryParams.loadsAllData()||r.push(a.query)))}return l&&!hn(t)&&r.push(new(ZE())(e._repo,e._path)),{removed:r,events:o}}function Vd(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function nn(t,e){let n=null;for(const s of t.views.values())n=n||QE(s,e);return n}function Hd(t,e){if(e._queryParams.loadsAllData())return Cr(t);{const s=e._queryIdentifier;return t.views.get(s)}}function jd(t,e){return Hd(t,e)!=null}function hn(t){return Cr(t)!=null}function Cr(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Yi;function sC(t){C(!Yi,"__referenceConstructor has already been defined"),Yi=t}function iC(){return C(Yi,"Reference.ts has not been loaded"),Yi}let rC=1;class Zc{constructor(e){this.listenProvider_=e,this.syncPointTree_=new he(null),this.pendingWriteTree_=DE(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ql(t,e,n,s,i){return EE(t.pendingWriteTree_,e,n,s,i),i?ps(t,new Nn(Vl(),e,n)):[]}function oC(t,e,n,s){CE(t.pendingWriteTree_,e,n,s);const i=he.fromObject(n);return ps(t,new is(Vl(),e,i))}function Yt(t,e,n=!1){const s=SE(t.pendingWriteTree_,e);if(IE(t.pendingWriteTree_,e)){let r=new he(null);return s.snap!=null?r=r.set(Z(),!0):xe(s.children,o=>{r=r.set(new ie(o),!0)}),ps(t,new ji(s.path,r,n))}else return[]}function ii(t,e,n){return ps(t,new Nn(Hl(),e,n))}function lC(t,e,n){const s=he.fromObject(n);return ps(t,new is(Hl(),e,s))}function aC(t,e){return ps(t,new qs(Hl(),e))}function cC(t,e,n){const s=Yl(t,n);if(s){const i=Jl(s),r=i.path,o=i.queryId,l=Be(r,e),a=new qs(jl(o),l);return Xl(t,r,a)}else return[]}function Ji(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||jd(o,e))){const a=nC(o,e,n,s);eC(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=a.removed;if(l=a.events,!i){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(d,_)=>hn(_));if(u&&!h){const d=t.syncPointTree_.subtree(r);if(!d.isEmpty()){const _=dC(d);for(let m=0;m<_.length;++m){const T=_[m],x=T.query,O=qd(t,T);t.listenProvider_.startListening(ks(x),Qs(t,x),O.hashFn,O.onComplete)}}}!h&&c.length>0&&!s&&(u?t.listenProvider_.stopListening(ks(e),null):c.forEach(d=>{const _=t.queryToTagMap.get(Ir(d));t.listenProvider_.stopListening(ks(d),_)}))}fC(t,c)}return l}function Kd(t,e,n,s){const i=Yl(t,s);if(i!=null){const r=Jl(i),o=r.path,l=r.queryId,a=Be(o,e),c=new Nn(jl(l),a,n);return Xl(t,o,c)}else return[]}function uC(t,e,n,s){const i=Yl(t,s);if(i){const r=Jl(i),o=r.path,l=r.queryId,a=Be(o,e),c=he.fromObject(n),u=new is(jl(l),a,c);return Xl(t,o,u)}else return[]}function Ko(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(d,_)=>{const m=Be(d,i);r=r||nn(_,m),o=o||hn(_)});let l=t.syncPointTree_.get(i);l?(o=o||hn(l),r=r||nn(l,Z())):(l=new Wd,t.syncPointTree_=t.syncPointTree_.set(i,l));let a;r!=null?a=!0:(a=!1,r=$.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((_,m)=>{const T=nn(m,Z());T&&(r=r.updateImmediateChild(_,T))}));const c=jd(l,e);if(!c&&!e._queryParams.loadsAllData()){const d=Ir(e);C(!t.queryToTagMap.has(d),"View does not exist, but we have a tag");const _=pC();t.queryToTagMap.set(d,_),t.tagToQueryMap.set(_,d)}const u=Er(t.pendingWriteTree_,i);let h=tC(l,e,n,u,r,a);if(!c&&!o&&!s){const d=Hd(l,e);h=h.concat(_C(t,e,d))}return h}function Sr(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,l)=>{const a=Be(o,e),c=nn(l,a);if(c)return c});return Dd(i,e,r,n,!0)}function hC(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(c,u)=>{const h=Be(c,n);s=s||nn(u,h)});let i=t.syncPointTree_.get(n);i?s=s||nn(i,Z()):(i=new Wd,t.syncPointTree_=t.syncPointTree_.set(n,i));const r=s!=null,o=r?new un(s,!0,!1):null,l=Er(t.pendingWriteTree_,e._path),a=Ud(i,e,l,r?o.getNode():$.EMPTY_NODE,r);return qE(a)}function ps(t,e){return zd(e,t.syncPointTree_,null,Er(t.pendingWriteTree_,Z()))}function zd(t,e,n,s){if(q(t.path))return Gd(t,e,n,s);{const i=e.get(Z());n==null&&i!=null&&(n=nn(i,Z()));let r=[];const o=G(t.path),l=t.operationForChild(o),a=e.children.get(o);if(a&&l){const c=n?n.getImmediateChild(o):null,u=Md(s,o);r=r.concat(zd(l,a,c,u))}return i&&(r=r.concat(ql(i,t,s,n))),r}}function Gd(t,e,n,s){const i=e.get(Z());n==null&&i!=null&&(n=nn(i,Z()));let r=[];return e.children.inorderTraversal((o,l)=>{const a=n?n.getImmediateChild(o):null,c=Md(s,o),u=t.operationForChild(o);u&&(r=r.concat(Gd(u,l,a,c)))}),i&&(r=r.concat(ql(i,t,s,n))),r}function qd(t,e){const n=e.query,s=Qs(t,n);return{hashFn:()=>(GE(e)||$.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?cC(t,n._path,s):aC(t,n._path);{const r=ow(i,n);return Ji(t,n,null,r)}}}}function Qs(t,e){const n=Ir(e);return t.queryToTagMap.get(n)}function Ir(t){return t._path.toString()+"$"+t._queryIdentifier}function Yl(t,e){return t.tagToQueryMap.get(e)}function Jl(t){const e=t.indexOf("$");return C(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new ie(t.substr(0,e))}}function Xl(t,e,n){const s=t.syncPointTree_.get(e);C(s,"Missing sync point for query tag that we're tracking");const i=Er(t.pendingWriteTree_,e);return ql(s,n,i,null)}function dC(t){return t.fold((e,n,s)=>{if(n&&hn(n))return[Cr(n)];{let i=[];return n&&(i=Vd(n)),xe(s,(r,o)=>{i=i.concat(o)}),i}})}function ks(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(iC())(t._repo,t._path):t}function fC(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=Ir(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function pC(){return rC++}function _C(t,e,n){const s=e._path,i=Qs(t,e),r=qd(t,n),o=t.listenProvider_.startListening(ks(e),i,r.hashFn,r.onComplete),l=t.syncPointTree_.subtree(s);if(i)C(!hn(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((c,u,h)=>{if(!q(c)&&u&&hn(u))return[Cr(u).query];{let d=[];return u&&(d=d.concat(Vd(u).map(_=>_.query))),xe(h,(_,m)=>{d=d.concat(m)}),d}});for(let c=0;c<a.length;++c){const u=a[c];t.listenProvider_.stopListening(ks(u),Qs(t,u))}}return o}/**
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
 */class Zl{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Zl(n)}node(){return this.node_}}class ea{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ve(this.path_,e);return new ea(this.syncTree_,n)}node(){return Sr(this.syncTree_,this.path_)}}const gC=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},eu=function(t,e,n){if(!t||typeof t!="object")return t;if(C(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return mC(t[".sv"],e,n);if(typeof t[".sv"]=="object")return vC(t[".sv"],e);C(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},mC=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:C(!1,"Unexpected server value: "+t)}},vC=function(t,e,n){t.hasOwnProperty("increment")||C(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&C(!1,"Unexpected increment value: "+s);const i=e.node();if(C(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},Qd=function(t,e,n,s){return na(e,new ea(n,t),s)},ta=function(t,e,n){return na(t,new Zl(e),n)};function na(t,e,n){const s=t.getPriority().val(),i=eu(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,l=eu(o.getValue(),e,n);return l!==o.getValue()||i!==o.getPriority().val()?new Te(l,be(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new Te(i))),o.forEachChild(fe,(l,a)=>{const c=na(a,e.getImmediateChild(l),n);c!==a&&(r=r.updateImmediateChild(l,c))}),r}}/**
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
 */class sa{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function Tr(t,e){let n=e instanceof ie?e:new ie(e),s=t,i=G(n);for(;i!==null;){const r=Tn(s.node.children,i)||{children:{},childCount:0};s=new sa(i,s,r),n=ue(n),i=G(n)}return s}function Mn(t){return t.node.value}function ia(t,e){t.node.value=e,zo(t)}function Yd(t){return t.node.childCount>0}function yC(t){return Mn(t)===void 0&&!Yd(t)}function Rr(t,e){xe(t.node.children,(n,s)=>{e(new sa(n,t,s))})}function Jd(t,e,n,s){n&&!s&&e(t),Rr(t,i=>{Jd(i,e,!0,s)}),n&&s&&e(t)}function bC(t,e,n){let s=n?t:t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function ri(t){return new ie(t.parent===null?t.name:ri(t.parent)+"/"+t.name)}function zo(t){t.parent!==null&&wC(t.parent,t.name,t)}function wC(t,e,n){const s=yC(n),i=Ze(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,zo(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,zo(t))}/**
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
 */const EC=/[\[\].#$\/\u0000-\u001F\u007F]/,CC=/[\[\].#$\u0000-\u001F\u007F]/,io=10*1024*1024,Nr=function(t){return typeof t=="string"&&t.length!==0&&!EC.test(t)},Xd=function(t){return typeof t=="string"&&t.length!==0&&!CC.test(t)},SC=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Xd(t)},Ys=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!mr(t)||t&&typeof t=="object"&&Ze(t,".sv")},xt=function(t,e,n,s){s&&e===void 0||oi(Ge(t,"value"),e,n)},oi=function(t,e,n){const s=n instanceof ie?new Ww(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+vn(s));if(typeof e=="function")throw new Error(t+"contains a function "+vn(s)+" with contents = "+e.toString());if(mr(e))throw new Error(t+"contains "+e.toString()+" "+vn(s));if(typeof e=="string"&&e.length>io/3&&_r(e)>io)throw new Error(t+"contains a string greater than "+io+" utf8 bytes "+vn(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(xe(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Nr(o)))throw new Error(t+" contains an invalid key ("+o+") "+vn(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Uw(s,o),oi(t,l,s),Vw(s)}),i&&r)throw new Error(t+' contains ".value" child '+vn(s)+" in addition to actual children.")}},IC=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=js(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Nr(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Bw);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&rt(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},Zd=function(t,e,n,s){if(s&&e===void 0)return;const i=Ge(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];xe(e,(o,l)=>{const a=new ie(o);if(oi(i,l,ve(n,a)),Ml(a)===".priority"&&!Ys(l))throw new Error(i+"contains an invalid value for '"+a.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(a)}),IC(i,r)},ra=function(t,e,n){if(!(n&&e===void 0)){if(mr(e))throw new Error(Ge(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Ys(e))throw new Error(Ge(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")}},li=function(t,e,n,s){if(!(s&&n===void 0)&&!Nr(n))throw new Error(Ge(t,e)+'was an invalid key = "'+n+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},Js=function(t,e,n,s){if(!(s&&n===void 0)&&!Xd(n))throw new Error(Ge(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},TC=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Js(t,e,n,s)},ot=function(t,e){if(G(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},ef=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Nr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!SC(n))throw new Error(Ge(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class RC{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Pr(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!Ll(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function tf(t,e,n){Pr(t,n),nf(t,s=>Ll(s,e))}function et(t,e,n){Pr(t,n),nf(t,s=>rt(s,e)||rt(e,s))}function nf(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(NC(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function NC(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();Sn&&Pe("event: "+n.toString()),ds(s)}}}/**
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
 */const sf="repo_interrupt",PC=25;class xC{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new RC,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Hi(),this.transactionQueueTree_=new sa,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function AC(t,e,n){if(t.stats_=Ol(t.repoInfo_),t.forceRestClient_||uw())t.server_=new Vi(t.repoInfo_,(s,i,r,o)=>{tu(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>nu(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ee(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new Ft(t.repoInfo_,e,(s,i,r,o)=>{tu(t,s,i,r,o)},s=>{nu(t,s)},s=>{kC(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=_w(t.repoInfo_,()=>new gE(t.stats_,t.server_)),t.infoData_=new hE,t.infoSyncTree_=new Zc({startListening:(s,i,r,o)=>{let l=[];const a=t.infoData_.getNode(s._path);return a.isEmpty()||(l=ii(t.infoSyncTree_,s._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),oa(t,"connected",!1),t.serverSyncTree_=new Zc({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(l,a)=>{const c=o(l,a);et(t.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function rf(t){const n=t.infoData_.getNode(new ie(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ai(t){return gC({timestamp:rf(t)})}function tu(t,e,n,s,i){t.dataUpdateCount++;const r=new ie(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const a=Fi(n,c=>be(c));o=uC(t.serverSyncTree_,r,a,i)}else{const a=be(n);o=Kd(t.serverSyncTree_,r,a,i)}else if(s){const a=Fi(n,c=>be(c));o=lC(t.serverSyncTree_,r,a)}else{const a=be(n);o=ii(t.serverSyncTree_,r,a)}let l=r;o.length>0&&(l=os(t,r)),et(t.eventQueue_,l,o)}function nu(t,e){oa(t,"connected",e),e===!1&&MC(t)}function kC(t,e){xe(e,(n,s)=>{oa(t,n,s)})}function oa(t,e,n){const s=new ie("/.info/"+e),i=be(n);t.infoData_.updateSnapshot(s,i);const r=ii(t.infoSyncTree_,s,i);et(t.eventQueue_,s,r)}function xr(t){return t.nextWriteId_++}function OC(t,e,n){const s=hC(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(i=>{const r=be(i).withIndex(e._queryParams.getIndex());Ko(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=ii(t.serverSyncTree_,e._path,r);else{const l=Qs(t.serverSyncTree_,e);o=Kd(t.serverSyncTree_,e._path,r,l)}return et(t.eventQueue_,e._path,o),Ji(t.serverSyncTree_,e,n,null,!0),r},i=>(_s(t,"get for query "+Ee(e)+" failed: "+i),Promise.reject(new Error(i))))}function la(t,e,n,s,i){_s(t,"set",{path:e.toString(),value:n,priority:s});const r=ai(t),o=be(n,s),l=Sr(t.serverSyncTree_,e),a=ta(o,l,r),c=xr(t),u=Ql(t.serverSyncTree_,e,a,c,!0);Pr(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(d,_)=>{const m=d==="ok";m||Le("set at "+e+" failed: "+d);const T=Yt(t.serverSyncTree_,c,!m);et(t.eventQueue_,e,T),dn(t,i,d,_)});const h=ca(t,e);os(t,h),et(t.eventQueue_,h,[])}function DC(t,e,n,s){_s(t,"update",{path:e.toString(),value:n});let i=!0;const r=ai(t),o={};if(xe(n,(l,a)=>{i=!1,o[l]=Qd(ve(e,l),be(a),t.serverSyncTree_,r)}),i)Pe("update() called with empty data.  Don't do anything."),dn(t,s,"ok",void 0);else{const l=xr(t),a=oC(t.serverSyncTree_,e,o,l);Pr(t.eventQueue_,a),t.server_.merge(e.toString(),n,(c,u)=>{const h=c==="ok";h||Le("update at "+e+" failed: "+c);const d=Yt(t.serverSyncTree_,l,!h),_=d.length>0?os(t,e):e;et(t.eventQueue_,_,d),dn(t,s,c,u)}),xe(n,c=>{const u=ca(t,ve(e,c));os(t,u)}),et(t.eventQueue_,e,[])}}function MC(t){_s(t,"onDisconnectEvents");const e=ai(t),n=Hi();Bo(t.onDisconnect_,Z(),(i,r)=>{const o=Qd(i,r,t.serverSyncTree_,e);fs(n,i,o)});let s=[];Bo(n,Z(),(i,r)=>{s=s.concat(ii(t.serverSyncTree_,i,r));const o=ca(t,i);os(t,o)}),t.onDisconnect_=Hi(),et(t.eventQueue_,Z(),s)}function LC(t,e,n){t.server_.onDisconnectCancel(e.toString(),(s,i)=>{s==="ok"&&$o(t.onDisconnect_,e),dn(t,n,s,i)})}function su(t,e,n,s){const i=be(n);t.server_.onDisconnectPut(e.toString(),i.val(!0),(r,o)=>{r==="ok"&&fs(t.onDisconnect_,e,i),dn(t,s,r,o)})}function FC(t,e,n,s,i){const r=be(n,s);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,l)=>{o==="ok"&&fs(t.onDisconnect_,e,r),dn(t,i,o,l)})}function $C(t,e,n,s){if(To(n)){Pe("onDisconnect().update() called with empty data.  Don't do anything."),dn(t,s,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(i,r)=>{i==="ok"&&xe(n,(o,l)=>{const a=be(l);fs(t.onDisconnect_,ve(e,o),a)}),dn(t,s,i,r)})}function BC(t,e,n){let s;G(e._path)===".info"?s=Ko(t.infoSyncTree_,e,n):s=Ko(t.serverSyncTree_,e,n),tf(t.eventQueue_,e._path,s)}function Go(t,e,n){let s;G(e._path)===".info"?s=Ji(t.infoSyncTree_,e,n):s=Ji(t.serverSyncTree_,e,n),tf(t.eventQueue_,e._path,s)}function of(t){t.persistentConnection_&&t.persistentConnection_.interrupt(sf)}function WC(t){t.persistentConnection_&&t.persistentConnection_.resume(sf)}function _s(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Pe(n,...e)}function dn(t,e,n,s){e&&ds(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function UC(t,e,n,s,i,r){_s(t,"transaction on "+e);const o={path:e,update:n,onComplete:s,status:null,order:ed(),applyLocally:r,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},l=aa(t,e,void 0);o.currentInputSnapshot=l;const a=o.update(l.val());if(a===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{oi("transaction failed: Data returned ",a,o.path),o.status=0;const c=Tr(t.transactionQueueTree_,e),u=Mn(c)||[];u.push(o),ia(c,u);let h;typeof a=="object"&&a!==null&&Ze(a,".priority")?(h=Tn(a,".priority"),C(Ys(h),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):h=(Sr(t.serverSyncTree_,e)||$.EMPTY_NODE).getPriority().val();const d=ai(t),_=be(a,h),m=ta(_,l,d);o.currentOutputSnapshotRaw=_,o.currentOutputSnapshotResolved=m,o.currentWriteId=xr(t);const T=Ql(t.serverSyncTree_,e,m,o.currentWriteId,o.applyLocally);et(t.eventQueue_,e,T),Ar(t,t.transactionQueueTree_)}}function aa(t,e,n){return Sr(t.serverSyncTree_,e,n)||$.EMPTY_NODE}function Ar(t,e=t.transactionQueueTree_){if(e||kr(t,e),Mn(e)){const n=af(t,e);C(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&VC(t,ri(e),n)}else Yd(e)&&Rr(e,n=>{Ar(t,n)})}function VC(t,e,n){const s=n.map(c=>c.currentWriteId),i=aa(t,e,s);let r=i;const o=i.hash();for(let c=0;c<n.length;c++){const u=n[c];C(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=Be(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const l=r.val(!0),a=e;t.server_.put(a.toString(),l,c=>{_s(t,"transaction put response",{path:a.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<n.length;d++)n[d].status=2,u=u.concat(Yt(t.serverSyncTree_,n[d].currentWriteId)),n[d].onComplete&&h.push(()=>n[d].onComplete(null,!0,n[d].currentOutputSnapshotResolved)),n[d].unwatcher();kr(t,Tr(t.transactionQueueTree_,e)),Ar(t,t.transactionQueueTree_),et(t.eventQueue_,e,u);for(let d=0;d<h.length;d++)ds(h[d])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{Le("transaction at "+a.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}os(t,e)}},o)}function os(t,e){const n=lf(t,e),s=ri(n),i=af(t,n);return HC(t,i,s),s}function HC(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],c=Be(n,a.path);let u=!1,h;if(C(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)u=!0,h=a.abortReason,i=i.concat(Yt(t.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=PC)u=!0,h="maxretry",i=i.concat(Yt(t.serverSyncTree_,a.currentWriteId,!0));else{const d=aa(t,a.path,o);a.currentInputSnapshot=d;const _=e[l].update(d.val());if(_!==void 0){oi("transaction failed: Data returned ",_,a.path);let m=be(_);typeof _=="object"&&_!=null&&Ze(_,".priority")||(m=m.updatePriority(d.getPriority()));const x=a.currentWriteId,O=ai(t),W=ta(m,d,O);a.currentOutputSnapshotRaw=m,a.currentOutputSnapshotResolved=W,a.currentWriteId=xr(t),o.splice(o.indexOf(x),1),i=i.concat(Ql(t.serverSyncTree_,a.path,W,a.currentWriteId,a.applyLocally)),i=i.concat(Yt(t.serverSyncTree_,x,!0))}else u=!0,h="nodata",i=i.concat(Yt(t.serverSyncTree_,a.currentWriteId,!0))}et(t.eventQueue_,n,i),i=[],u&&(e[l].status=2,function(d){setTimeout(d,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(h==="nodata"?s.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):s.push(()=>e[l].onComplete(new Error(h),!1,null))))}kr(t,t.transactionQueueTree_);for(let l=0;l<s.length;l++)ds(s[l]);Ar(t,t.transactionQueueTree_)}function lf(t,e){let n,s=t.transactionQueueTree_;for(n=G(e);n!==null&&Mn(s)===void 0;)s=Tr(s,n),e=ue(e),n=G(e);return s}function af(t,e){const n=[];return cf(t,e,n),n.sort((s,i)=>s.order-i.order),n}function cf(t,e,n){const s=Mn(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);Rr(e,i=>{cf(t,i,n)})}function kr(t,e){const n=Mn(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,ia(e,n.length>0?n:void 0)}Rr(e,s=>{kr(t,s)})}function ca(t,e){const n=ri(lf(t,e)),s=Tr(t.transactionQueueTree_,e);return bC(s,i=>{ro(t,i)}),ro(t,s),Jd(s,i=>{ro(t,i)}),n}function ro(t,e){const n=Mn(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(C(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(C(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(Yt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?ia(e,void 0):n.length=r+1,et(t.eventQueue_,ri(e),i);for(let o=0;o<s.length;o++)ds(s[o])}}/**
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
 */function jC(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function KC(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Le(`Invalid query segment '${n}' in query '${t}'`)}return e}const qo=function(t,e){const n=zC(t),s=n.namespace;n.domain==="firebase.com"&&Pt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&Pt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||tw();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new pd(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new ie(n.pathString)}},zC=function(t){let e="",n="",s="",i="",r="",o=!0,l="https",a=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(l=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(i=jC(t.substring(u,h)));const d=KC(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")n="localhost";else if(_.split(".").length<=2)n=_;else{const m=e.indexOf(".");s=e.substring(0,m).toLowerCase(),n=e.substring(m+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:a,domain:n,subdomain:s,secure:o,scheme:l,pathString:i,namespace:r}};/**
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
 */const iu="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",GC=function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=iu.charAt(n%64),n=Math.floor(n/64);C(n===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=iu.charAt(e[i]);return C(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class uf{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ee(this.snapshot.exportVal())}}class hf{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class ua{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return C(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */let qC=class{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new je;return LC(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){ot("OnDisconnect.remove",this._path);const e=new je;return su(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){ot("OnDisconnect.set",this._path),xt("OnDisconnect.set",e,this._path,!1);const n=new je;return su(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){ot("OnDisconnect.setWithPriority",this._path),xt("OnDisconnect.setWithPriority",e,this._path,!1),ra("OnDisconnect.setWithPriority",n,!1);const s=new je;return FC(this._repo,this._path,e,n,s.wrapCallback(()=>{})),s.promise}update(e){ot("OnDisconnect.update",this._path),Zd("OnDisconnect.update",e,this._path,!1);const n=new je;return $C(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}};/**
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
 */class Ye{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return q(this._path)?null:Ml(this._path)}get ref(){return new at(this._repo,this._path)}get _queryIdentifier(){const e=Hc(this._queryParams),n=Al(e);return n==="{}"?"default":n}get _queryObject(){return Hc(this._queryParams)}isEqual(e){if(e=tt(e),!(e instanceof Ye))return!1;const n=this._repo===e._repo,s=Ll(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+$w(this._path)}}function Or(t,e){if(t._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function fn(t){let e=null,n=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(n=t.getIndexEndValue()),t.getIndex()===Rt){const s="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(t.hasStart()){if(t.getIndexStartName()!==an)throw new Error(s);if(typeof e!="string")throw new Error(i)}if(t.hasEnd()){if(t.getIndexEndName()!==Bt)throw new Error(s);if(typeof n!="string")throw new Error(i)}}else if(t.getIndex()===fe){if(e!=null&&!Ys(e)||n!=null&&!Ys(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(C(t.getIndex()instanceof Bl||t.getIndex()===Wl,"unknown index type."),e!=null&&typeof e=="object"||n!=null&&typeof n=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function Dr(t){if(t.hasStart()&&t.hasEnd()&&t.hasLimit()&&!t.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class at extends Ye{constructor(e,n){super(e,n,new yr,!1)}get parent(){const e=Cd(this._path);return e===null?null:new at(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}let Mr=class Qo{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new ie(e),s=xn(this.ref,e);return new Qo(this._node.getChild(n),s,fe)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Qo(i,xn(this.ref,s),fe)))}hasChild(e){const n=new ie(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function df(t,e){return t=tt(t),t._checkNotDeleted("ref"),e!==void 0?xn(t._root,e):t._root}function ru(t,e){t=tt(t),t._checkNotDeleted("refFromURL");const n=qo(e,t._repo.repoInfo_.nodeAdmin);ef("refFromURL",n);const s=n.repoInfo;return!t._repo.repoInfo_.isCustomHost()&&s.host!==t._repo.repoInfo_.host&&Pt("refFromURL: Host name does not match the current database: (found "+s.host+" but expected "+t._repo.repoInfo_.host+")"),df(t,n.path.toString())}function xn(t,e){return t=tt(t),G(t._path)===null?TC("child","path",e,!1):Js("child","path",e,!1),new at(t._repo,ve(t._path,e))}function QC(t,e){t=tt(t),ot("push",t._path),xt("push",e,t._path,!0);const n=rf(t._repo),s=GC(n),i=xn(t,s),r=xn(t,s);let o;return e!=null?o=ha(r,e).then(()=>r):o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function YC(t){return ot("remove",t._path),ha(t,null)}function ha(t,e){t=tt(t),ot("set",t._path),xt("set",e,t._path,!1);const n=new je;return la(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function JC(t,e){t=tt(t),ot("setPriority",t._path),ra("setPriority",e,!1);const n=new je;return la(t._repo,ve(t._path,".priority"),e,null,n.wrapCallback(()=>{})),n.promise}function XC(t,e,n){if(ot("setWithPriority",t._path),xt("setWithPriority",e,t._path,!1),ra("setWithPriority",n,!1),t.key===".length"||t.key===".keys")throw"setWithPriority failed: "+t.key+" is a read-only object.";const s=new je;return la(t._repo,t._path,e,n,s.wrapCallback(()=>{})),s.promise}function ZC(t,e){Zd("update",e,t._path,!1);const n=new je;return DC(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function eS(t){t=tt(t);const e=new ua(()=>{}),n=new ci(e);return OC(t._repo,t,n).then(s=>new Mr(s,new at(t._repo,t._path),t._queryParams.getIndex()))}class ci{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new uf("value",this,new Mr(e.snapshotNode,new at(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new hf(this,e,n):null}matches(e){return e instanceof ci?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Lr{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new hf(this,e,n):null}createEvent(e,n){C(e.childName!=null,"Child events should have a childName.");const s=xn(new at(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new uf(e.type,this,new Mr(e.snapshotNode,s,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Lr?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function ui(t,e,n,s,i){let r;if(typeof s=="object"&&(r=void 0,i=s),typeof s=="function"&&(r=s),i&&i.onlyOnce){const a=n,c=(u,h)=>{Go(t._repo,t,l),a(u,h)};c.userCallback=n.userCallback,c.context=n.context,n=c}const o=new ua(n,r||void 0),l=e==="value"?new ci(o):new Lr(e,o);return BC(t._repo,t,l),()=>Go(t._repo,t,l)}function Yo(t,e,n,s){return ui(t,"value",e,n,s)}function ou(t,e,n,s){return ui(t,"child_added",e,n,s)}function lu(t,e,n,s){return ui(t,"child_changed",e,n,s)}function au(t,e,n,s){return ui(t,"child_moved",e,n,s)}function cu(t,e,n,s){return ui(t,"child_removed",e,n,s)}function uu(t,e,n){let s=null;const i=n?new ua(n):null;e==="value"?s=new ci(i):e&&(s=new Lr(e,i)),Go(t._repo,t,s)}class yt{}class ff extends yt{constructor(e,n){super(),this._value=e,this._key=n}_apply(e){xt("endAt",this._value,e._path,!0);const n=Fo(e._queryParams,this._value,this._key);if(Dr(n),fn(n),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Ye(e._repo,e._path,n,e._orderByCalled)}}function tS(t,e){return li("endAt","key",e,!0),new ff(t,e)}class nS extends yt{constructor(e,n){super(),this._value=e,this._key=n}_apply(e){xt("endBefore",this._value,e._path,!1);const n=uE(e._queryParams,this._value,this._key);if(Dr(n),fn(n),e._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Ye(e._repo,e._path,n,e._orderByCalled)}}function sS(t,e){return li("endBefore","key",e,!0),new nS(t,e)}class pf extends yt{constructor(e,n){super(),this._value=e,this._key=n}_apply(e){xt("startAt",this._value,e._path,!0);const n=Lo(e._queryParams,this._value,this._key);if(Dr(n),fn(n),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new Ye(e._repo,e._path,n,e._orderByCalled)}}function iS(t=null,e){return li("startAt","key",e,!0),new pf(t,e)}class rS extends yt{constructor(e,n){super(),this._value=e,this._key=n}_apply(e){xt("startAfter",this._value,e._path,!1);const n=cE(e._queryParams,this._value,this._key);if(Dr(n),fn(n),e._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new Ye(e._repo,e._path,n,e._orderByCalled)}}function oS(t,e){return li("startAfter","key",e,!0),new rS(t,e)}class lS extends yt{constructor(e){super(),this._limit=e}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ye(e._repo,e._path,lE(e._queryParams,this._limit),e._orderByCalled)}}function aS(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new lS(t)}class cS extends yt{constructor(e){super(),this._limit=e}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ye(e._repo,e._path,aE(e._queryParams,this._limit),e._orderByCalled)}}function uS(t){if(typeof t!="number"||Math.floor(t)!==t||t<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new cS(t)}class hS extends yt{constructor(e){super(),this._path=e}_apply(e){Or(e,"orderByChild");const n=new ie(this._path);if(q(n))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const s=new Bl(n),i=br(e._queryParams,s);return fn(i),new Ye(e._repo,e._path,i,!0)}}function dS(t){if(t==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(t==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(t==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return Js("orderByChild","path",t,!1),new hS(t)}class fS extends yt{_apply(e){Or(e,"orderByKey");const n=br(e._queryParams,Rt);return fn(n),new Ye(e._repo,e._path,n,!0)}}function pS(){return new fS}class _S extends yt{_apply(e){Or(e,"orderByPriority");const n=br(e._queryParams,fe);return fn(n),new Ye(e._repo,e._path,n,!0)}}function gS(){return new _S}class mS extends yt{_apply(e){Or(e,"orderByValue");const n=br(e._queryParams,Wl);return fn(n),new Ye(e._repo,e._path,n,!0)}}function vS(){return new mS}class yS extends yt{constructor(e,n){super(),this._value=e,this._key=n}_apply(e){if(xt("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new ff(this._value,this._key)._apply(new pf(this._value,this._key)._apply(e))}}function bS(t,e){return li("equalTo","key",e,!0),new yS(t,e)}function ut(t,...e){let n=tt(t);for(const s of e)n=s._apply(n);return n}XE(at);sC(at);/**
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
 */const wS="FIREBASE_DATABASE_EMULATOR_HOST",Jo={};let ES=!1;function CS(t,e,n,s){t.repoInfo_=new pd(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),s&&(t.authTokenProvider_=s)}function _f(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||Pt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Pe("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=qo(r,i),l=o.repoInfo,a,c;typeof process<"u"&&Ic&&(c=Ic[wS]),c?(a=!0,r=`http://${c}?ns=${l.namespace}`,o=qo(r,i),l=o.repoInfo):a=!o.repoInfo.secure;const u=i&&a?new Yn(Yn.OWNER):new dw(t.name,t.options,e);ef("Invalid Firebase Database URL",o),q(o.path)||Pt("Database URL must point to the root of a Firebase Database (not including a child path).");const h=IS(l,t,u,new hw(t.name,n));return new TS(h,t)}function SS(t,e){const n=Jo[e];(!n||n[t.key]!==t)&&Pt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),of(t),delete n[t.key]}function IS(t,e,n,s){let i=Jo[e.name];i||(i={},Jo[e.name]=i);let r=i[t.toURLString()];return r&&Pt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new xC(t,ES,n,s),i[t.toURLString()]=r,r}let TS=class{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(AC(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new at(this._repo,Z())),this._rootInternal}_delete(){return this._rootInternal!==null&&(SS(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Pt("Cannot call "+e+" on a deleted database.")}};function gf(){ns.IS_TRANSPORT_INITIALIZED&&Le("Transport has already been initialized. Please call this function before calling ref or setting up a listener")}function RS(){gf(),Qt.forceDisallow()}function NS(){gf(),st.forceDisallow(),Qt.forceAllow()}function PS(t,e,n,s={}){t=tt(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Pt("Cannot call useEmulator() after instance has already been initialized.");const i=t._repoInternal;let r;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&Pt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Yn(Yn.OWNER);else if(s.mockUserToken){const o=typeof s.mockUserToken=="string"?s.mockUserToken:yy(s.mockUserToken,t.app.options.projectId);r=new Yn(o)}CS(i,e,n,r)}function xS(t){t=tt(t),t._checkNotDeleted("goOffline"),of(t._repo)}function AS(t){t=tt(t),t._checkNotDeleted("goOnline"),WC(t._repo)}function kS(t,e){nd(t,e)}/**
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
 */function OS(t){Xh(Nl),ts(new $t("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return _f(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),en(Tc,Rc,t),en(Tc,Rc,"esm2017")}/**
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
 */const DS={".sv":"timestamp"};function MS(){return DS}function LS(t){return{".sv":{increment:t}}}/**
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
 */let FS=class{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}};function $S(t,e,n){var s;if(t=tt(t),ot("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const i=(s=n==null?void 0:n.applyLocally)!==null&&s!==void 0?s:!0,r=new je,o=(a,c,u)=>{let h=null;a?r.reject(a):(h=new Mr(u,new at(t._repo,t._path),fe),r.resolve(new FS(c,h)))},l=Yo(t,()=>{});return UC(t._repo,t._path,e,o,l,i),r.promise}Ft.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Ft.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};OS();const BS="@firebase/database-compat",WS="1.0.2";/**
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
 */const US=new gr("@firebase/database-compat"),mf=function(t){const e="FIREBASE WARNING: "+t;US.warn(e)};/**
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
 */const VS=function(t,e,n,s){if(!(s&&n===void 0)&&typeof n!="boolean")throw new Error(Ge(t,e)+"must be a boolean.")},HS=function(t,e,n){if(!(n&&e===void 0))switch(e){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw new Error(Ge(t,"eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}};/**
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
 */class jS{constructor(e){this._delegate=e}cancel(e){B("OnDisconnect.cancel",0,1,arguments.length),Re("OnDisconnect.cancel","onComplete",e,!0);const n=this._delegate.cancel();return e&&n.then(()=>e(null),s=>e(s)),n}remove(e){B("OnDisconnect.remove",0,1,arguments.length),Re("OnDisconnect.remove","onComplete",e,!0);const n=this._delegate.remove();return e&&n.then(()=>e(null),s=>e(s)),n}set(e,n){B("OnDisconnect.set",1,2,arguments.length),Re("OnDisconnect.set","onComplete",n,!0);const s=this._delegate.set(e);return n&&s.then(()=>n(null),i=>n(i)),s}setWithPriority(e,n,s){B("OnDisconnect.setWithPriority",2,3,arguments.length),Re("OnDisconnect.setWithPriority","onComplete",s,!0);const i=this._delegate.setWithPriority(e,n);return s&&i.then(()=>s(null),r=>s(r)),i}update(e,n){if(B("OnDisconnect.update",1,2,arguments.length),Array.isArray(e)){const i={};for(let r=0;r<e.length;++r)i[""+r]=e[r];e=i,mf("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Re("OnDisconnect.update","onComplete",n,!0);const s=this._delegate.update(e);return n&&s.then(()=>n(null),i=>n(i)),s}}/**
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
 */class KS{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return B("TransactionResult.toJSON",0,1,arguments.length),{committed:this.committed,snapshot:this.snapshot.toJSON()}}}/**
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
 */class sn{constructor(e,n){this._database=e,this._delegate=n}val(){return B("DataSnapshot.val",0,0,arguments.length),this._delegate.val()}exportVal(){return B("DataSnapshot.exportVal",0,0,arguments.length),this._delegate.exportVal()}toJSON(){return B("DataSnapshot.toJSON",0,1,arguments.length),this._delegate.toJSON()}exists(){return B("DataSnapshot.exists",0,0,arguments.length),this._delegate.exists()}child(e){return B("DataSnapshot.child",0,1,arguments.length),e=String(e),Js("DataSnapshot.child","path",e,!1),new sn(this._database,this._delegate.child(e))}hasChild(e){return B("DataSnapshot.hasChild",1,1,arguments.length),Js("DataSnapshot.hasChild","path",e,!1),this._delegate.hasChild(e)}getPriority(){return B("DataSnapshot.getPriority",0,0,arguments.length),this._delegate.priority}forEach(e){return B("DataSnapshot.forEach",1,1,arguments.length),Re("DataSnapshot.forEach","action",e,!1),this._delegate.forEach(n=>e(new sn(this._database,n)))}hasChildren(){return B("DataSnapshot.hasChildren",0,0,arguments.length),this._delegate.hasChildren()}get key(){return this._delegate.key}numChildren(){return B("DataSnapshot.numChildren",0,0,arguments.length),this._delegate.size}getRef(){return B("DataSnapshot.ref",0,0,arguments.length),new Xe(this._database,this._delegate.ref)}get ref(){return this.getRef()}}class Ae{constructor(e,n){this.database=e,this._delegate=n}on(e,n,s,i){var r;B("Query.on",2,4,arguments.length),Re("Query.on","callback",n,!1);const o=Ae.getCancelAndContextArgs_("Query.on",s,i),l=(c,u)=>{n.call(o.context,new sn(this.database,c),u)};l.userCallback=n,l.context=o.context;const a=(r=o.cancel)===null||r===void 0?void 0:r.bind(o.context);switch(e){case"value":return Yo(this._delegate,l,a),n;case"child_added":return ou(this._delegate,l,a),n;case"child_removed":return cu(this._delegate,l,a),n;case"child_changed":return lu(this._delegate,l,a),n;case"child_moved":return au(this._delegate,l,a),n;default:throw new Error(Ge("Query.on","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}}off(e,n,s){if(B("Query.off",0,3,arguments.length),HS("Query.off",e,!0),Re("Query.off","callback",n,!0),_c("Query.off","context",s,!0),n){const i=()=>{};i.userCallback=n,i.context=s,uu(this._delegate,e,i)}else uu(this._delegate,e)}get(){return eS(this._delegate).then(e=>new sn(this.database,e))}once(e,n,s,i){B("Query.once",1,4,arguments.length),Re("Query.once","callback",n,!0);const r=Ae.getCancelAndContextArgs_("Query.once",s,i),o=new je,l=(c,u)=>{const h=new sn(this.database,c);n&&n.call(r.context,h,u),o.resolve(h)};l.userCallback=n,l.context=r.context;const a=c=>{r.cancel&&r.cancel.call(r.context,c),o.reject(c)};switch(e){case"value":Yo(this._delegate,l,a,{onlyOnce:!0});break;case"child_added":ou(this._delegate,l,a,{onlyOnce:!0});break;case"child_removed":cu(this._delegate,l,a,{onlyOnce:!0});break;case"child_changed":lu(this._delegate,l,a,{onlyOnce:!0});break;case"child_moved":au(this._delegate,l,a,{onlyOnce:!0});break;default:throw new Error(Ge("Query.once","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}return o.promise}limitToFirst(e){return B("Query.limitToFirst",1,1,arguments.length),new Ae(this.database,ut(this._delegate,aS(e)))}limitToLast(e){return B("Query.limitToLast",1,1,arguments.length),new Ae(this.database,ut(this._delegate,uS(e)))}orderByChild(e){return B("Query.orderByChild",1,1,arguments.length),new Ae(this.database,ut(this._delegate,dS(e)))}orderByKey(){return B("Query.orderByKey",0,0,arguments.length),new Ae(this.database,ut(this._delegate,pS()))}orderByPriority(){return B("Query.orderByPriority",0,0,arguments.length),new Ae(this.database,ut(this._delegate,gS()))}orderByValue(){return B("Query.orderByValue",0,0,arguments.length),new Ae(this.database,ut(this._delegate,vS()))}startAt(e=null,n){return B("Query.startAt",0,2,arguments.length),new Ae(this.database,ut(this._delegate,iS(e,n)))}startAfter(e=null,n){return B("Query.startAfter",0,2,arguments.length),new Ae(this.database,ut(this._delegate,oS(e,n)))}endAt(e=null,n){return B("Query.endAt",0,2,arguments.length),new Ae(this.database,ut(this._delegate,tS(e,n)))}endBefore(e=null,n){return B("Query.endBefore",0,2,arguments.length),new Ae(this.database,ut(this._delegate,sS(e,n)))}equalTo(e,n){return B("Query.equalTo",1,2,arguments.length),new Ae(this.database,ut(this._delegate,bS(e,n)))}toString(){return B("Query.toString",0,0,arguments.length),this._delegate.toString()}toJSON(){return B("Query.toJSON",0,1,arguments.length),this._delegate.toJSON()}isEqual(e){if(B("Query.isEqual",1,1,arguments.length),!(e instanceof Ae)){const n="Query.isEqual failed: First argument must be an instance of firebase.database.Query.";throw new Error(n)}return this._delegate.isEqual(e._delegate)}static getCancelAndContextArgs_(e,n,s){const i={cancel:void 0,context:void 0};if(n&&s)i.cancel=n,Re(e,"cancel",i.cancel,!0),i.context=s,_c(e,"context",i.context,!0);else if(n)if(typeof n=="object"&&n!==null)i.context=n;else if(typeof n=="function")i.cancel=n;else throw new Error(Ge(e,"cancelOrContext")+" must either be a cancel callback or a context object.");return i}get ref(){return new Xe(this.database,new at(this._delegate._repo,this._delegate._path))}}class Xe extends Ae{constructor(e,n){super(e,new Ye(n._repo,n._path,new yr,!1)),this.database=e,this._delegate=n}getKey(){return B("Reference.key",0,0,arguments.length),this._delegate.key}child(e){return B("Reference.child",1,1,arguments.length),typeof e=="number"&&(e=String(e)),new Xe(this.database,xn(this._delegate,e))}getParent(){B("Reference.parent",0,0,arguments.length);const e=this._delegate.parent;return e?new Xe(this.database,e):null}getRoot(){return B("Reference.root",0,0,arguments.length),new Xe(this.database,this._delegate.root)}set(e,n){B("Reference.set",1,2,arguments.length),Re("Reference.set","onComplete",n,!0);const s=ha(this._delegate,e);return n&&s.then(()=>n(null),i=>n(i)),s}update(e,n){if(B("Reference.update",1,2,arguments.length),Array.isArray(e)){const i={};for(let r=0;r<e.length;++r)i[""+r]=e[r];e=i,mf("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ot("Reference.update",this._delegate._path),Re("Reference.update","onComplete",n,!0);const s=ZC(this._delegate,e);return n&&s.then(()=>n(null),i=>n(i)),s}setWithPriority(e,n,s){B("Reference.setWithPriority",2,3,arguments.length),Re("Reference.setWithPriority","onComplete",s,!0);const i=XC(this._delegate,e,n);return s&&i.then(()=>s(null),r=>s(r)),i}remove(e){B("Reference.remove",0,1,arguments.length),Re("Reference.remove","onComplete",e,!0);const n=YC(this._delegate);return e&&n.then(()=>e(null),s=>e(s)),n}transaction(e,n,s){B("Reference.transaction",1,3,arguments.length),Re("Reference.transaction","transactionUpdate",e,!1),Re("Reference.transaction","onComplete",n,!0),VS("Reference.transaction","applyLocally",s,!0);const i=$S(this._delegate,e,{applyLocally:s}).then(r=>new KS(r.committed,new sn(this.database,r.snapshot)));return n&&i.then(r=>n(null,r.committed,r.snapshot),r=>n(r,!1,null)),i}setPriority(e,n){B("Reference.setPriority",1,2,arguments.length),Re("Reference.setPriority","onComplete",n,!0);const s=JC(this._delegate,e);return n&&s.then(()=>n(null),i=>n(i)),s}push(e,n){B("Reference.push",0,2,arguments.length),Re("Reference.push","onComplete",n,!0);const s=QC(this._delegate,e),i=s.then(o=>new Xe(this.database,o));n&&i.then(()=>n(null),o=>n(o));const r=new Xe(this.database,s);return r.then=i.then.bind(i),r.catch=i.catch.bind(i,void 0),r}onDisconnect(){return ot("Reference.onDisconnect",this._delegate._path),new jS(new qC(this._delegate._repo,this._delegate._path))}get key(){return this.getKey()}get parent(){return this.getParent()}get root(){return this.getRoot()}}/**
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
 */class Xs{constructor(e,n){this._delegate=e,this.app=n,this.INTERNAL={delete:()=>this._delegate._delete(),forceWebSockets:RS,forceLongPolling:NS}}useEmulator(e,n,s={}){PS(this._delegate,e,n,s)}ref(e){if(B("database.ref",0,1,arguments.length),e instanceof Xe){const n=ru(this._delegate,e.toString());return new Xe(this,n)}else{const n=df(this._delegate,e);return new Xe(this,n)}}refFromURL(e){B("database.refFromURL",1,1,arguments.length);const s=ru(this._delegate,e);return new Xe(this,s)}goOffline(){return B("database.goOffline",0,0,arguments.length),xS(this._delegate)}goOnline(){return B("database.goOnline",0,0,arguments.length),AS(this._delegate)}}Xs.ServerValue={TIMESTAMP:MS(),increment:t=>LS(t)};function zS({app:t,url:e,version:n,customAuthImpl:s,customAppCheckImpl:i,namespace:r,nodeAdmin:o=!1}){Xh(n);const l=new Bh("database-standalone"),a=new No("auth-internal",l);a.setComponent(new $t("auth-internal",()=>s,"PRIVATE"));let c;return i&&(c=new No("app-check-internal",l),c.setComponent(new $t("app-check-internal",()=>i,"PRIVATE"))),{instance:new Xs(_f(t,a,c,e,o),t),namespace:r}}var GS=Object.freeze({__proto__:null,initStandalone:zS});/**
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
 */const qS=Xs.ServerValue;function QS(t){t.INTERNAL.registerComponent(new $t("database-compat",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app-compat").getImmediate(),i=e.getProvider("database").getImmediate({identifier:n});return new Xs(i,s)},"PUBLIC").setServiceProps({Reference:Xe,Query:Ae,Database:Xs,DataSnapshot:sn,enableLogging:kS,INTERNAL:GS,ServerValue:qS}).setMultipleInstances(!0)),t.registerVersion(BS,WS)}QS(xl);const YS=xl.initializeApp({databaseURL:"https://c210-67728-default-rtdb.firebaseio.com"}),JS=YS.database(),XS=JS.ref("subscriptions"),ZS={data(){return{bMsg:!1}},methods:{fnPushSubscribe(){let t=this;Notification.requestPermission(function(e){e!=="granted"?console.log("푸시알림 기능이 허용되지 않았습니다!"):t.fnConfigurePushSub()})},fnConfigurePushSub(){let t=this;if(!("serviceWorker"in navigator)){console.log("서비스 워커가 없습니다!");return}navigator.serviceWorker.ready.then(function(e){return e.pushManager.getSubscription()}).then(function(e){e===null?(t.fnNewSubscription(),t.fnDisplayNotification()):console.log("이미 구독되어 있습니다!")})},fnNewSubscription(){let t=this;navigator.serviceWorker.ready.then(function(e){const s=t.urlBase64ToUint8Array("BEUb-27a0ug58aSI7yEXKqicaaA7qLI_Pzro-wOWOFY2lD30Z6J1NaZTaSbnPjY2r_P-9Z9YaXyDo9or4IFQjrQ");return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:s}).then(function(i){const r=JSON.parse(JSON.stringify(i));var o={endpoint:r.endpoint,keys:{p256dh:r.keys.p256dh,auth:r.keys.auth}};return XS.push(o)})})},fnUnSubscription(){let t=this;navigator.serviceWorker.ready.then(function(e){return e.pushManager.getSubscription()}).then(function(e){t.bMsg=!0,e.unsubscribe()}).catch(e=>console.log(e))},fnDisplayNotification(){const t="졸업작품 전시회",e={body:"새로운 소식 알림 서비스에 가입하신 것을 환영합니다!",icon:"/img/push-noti.png",badge:"/img/push-badge-icon.png",image:"/img/push-image.jpg",actions:[{action:"like",title:"커피를 좋아하시면 링크를 클릭하세요.",icon:"/img/push-coffee.png"}],vibrate:[500,100,500]};navigator.serviceWorker.ready.then(function(n){n.showNotification(t,e)})},urlBase64ToUint8Array(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),s=window.atob(n);return Uint8Array.from([...s].map(i=>i.charCodeAt(0)))}}},eI=w("h1",{class:"headline"},"졸업작품 전시회 푸시알림",-1),tI=w("div",{class:"body-1"}," 졸업작품 전시회의 초청 푸시 알림을 보내려고 합니다. [알림허용] 단추를 클릭하시면 알림 정보를 받으실 수 있습니다. ",-1);function nI(t,e,n,s,i,r){const o=de("v-img"),l=de("v-col"),a=de("v-card-title"),c=de("v-row"),u=de("v-icon"),h=de("v-btn"),d=de("v-snackbar"),_=de("v-card");return se(),$s(_,{class:"mx-auto","max-width":"500"},{default:j(()=>[D(o,{src:"../assets/img/push-image.jpg",height:"200px"}),D(c,{align:"center"},{default:j(()=>[D(l,{offset:"1",cols:"2"},{default:j(()=>[D(o,{contain:"",color:"blue darken-2",src:"../assets/img/push-noti.png","max-width":"70px"})]),_:1}),D(l,{cols:"8"},{default:j(()=>[D(a,{"primary-title":""},{default:j(()=>[eI,tI]),_:1})]),_:1})]),_:1}),D(c,{align:"center"},{default:j(()=>[D(l,{offset:"1",cols:"5"},{default:j(()=>[D(h,{block:"",large:"",onClick:r.fnPushSubscribe,color:"orange",dark:""},{default:j(()=>[D(u,{dark:"",left:""},{default:j(()=>[ae("add_alert")]),_:1}),ae(" 알림 허용 ")]),_:1},8,["onClick"])]),_:1}),D(l,{cols:"5"},{default:j(()=>[D(h,{block:"",large:"",onClick:r.fnUnSubscription,color:"orange",dark:""},{default:j(()=>[D(u,{dark:"",left:""},{default:j(()=>[ae("notifications_off")]),_:1}),ae(" 알림 해제 ")]),_:1},8,["onClick"])]),_:1})]),_:1}),D(d,{modelValue:i.bMsg,"onUpdate:modelValue":e[1]||(e[1]=m=>i.bMsg=m)},{default:j(()=>[ae(" 푸시알림이 해제되었습니다. "),D(h,{color:"orange",text:"",onClick:e[0]||(e[0]=m=>i.bMsg=!1)},{default:j(()=>[ae("닫기")]),_:1})]),_:1},8,["modelValue"])]),_:1})}const sI=We(ZS,[["render",nI]]),iI={data(){return{sTitle:"",sMsg:""}},methods:{fnSendPush(){const t=JSON.stringify({pTitle:this.sTitle,pMsg:this.sMsg});console.log(t),fetch("https://us-central1-c210-67728.cloudfunctions.net/storePushData",{method:"POST",headers:{"Content-type":"application/json"},body:t}).then(e=>{if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return e.json()}).then(e=>{console.log(e.message)}).catch(e=>console.log("오류!"+e.message))}}},rI=w("h1",{class:"display-1"},"메시지 보내기",-1);function oI(t,e,n,s,i,r){const o=de("v-col"),l=de("v-text-field"),a=de("v-textarea"),c=de("v-row"),u=de("v-container"),h=de("v-icon"),d=de("v-btn"),_=de("v-card-actions"),m=de("v-card");return se(),$s(u,null,{default:j(()=>[D(c,{wrap:""},{default:j(()=>[D(o,{cols:"12",class:"text-center"},{default:j(()=>[rI]),_:1}),D(o,{class:"my-3",offset:"1",cols:"10"},{default:j(()=>[D(m,{color:"blue-grey lighten-1",dark:""},{default:j(()=>[D(u,{class:"my-3"},{default:j(()=>[D(c,null,{default:j(()=>[D(o,{cols:"12"},{default:j(()=>[D(l,{autofocus:"",name:"title",label:"제목",type:"text",modelValue:i.sTitle,"onUpdate:modelValue":e[0]||(e[0]=T=>i.sTitle=T),color:"white"},null,8,["modelValue"])]),_:1}),D(o,{cols:"12"},{default:j(()=>[D(a,{rows:"3",name:"message",label:"내용",type:"text",modelValue:i.sMsg,"onUpdate:modelValue":e[1]||(e[1]=T=>i.sMsg=T),color:"white"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),D(_,null,{default:j(()=>[D(d,{block:"",large:"",color:"orange",dark:"",onClick:r.fnSendPush},{default:j(()=>[D(h,{left:""},{default:j(()=>[ae("message")]),_:1}),ae("발 송 ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const lI=We(iI,[["render",oI]]),aI=ev({history:vm("/"),routes:[{name:"",path:"/",component:wo},{name:"main",path:"/main",component:wo},{name:"board",path:"/board",component:cv},{name:"calendar",path:"/calendar",component:_h},{name:"friend",path:"/friend",component:El},{name:"meeting",path:"/meeting",component:Av},{name:"mypage",path:"/mypage",component:gh},{path:"/voice",name:"Voice",component:Gv},{path:"/voice/trainer",name:"VoiceTrainer",component:cy},{path:"/subscribe",name:"subscribe",component:sI},{path:"/pushnotify",name:"pushnotify",component:lI}]});var cI=function(){return!!(window.location.hostname==="localhost"||window.location.hostname==="[::1]"||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/))},Xo;typeof window<"u"&&(typeof Promise<"u"?Xo=new Promise(function(t){return window.addEventListener("load",t)}):Xo={then:function(t){return window.addEventListener("load",t)}});function uI(t,e){e===void 0&&(e={});var n=e.registrationOptions;n===void 0&&(n={}),delete e.registrationOptions;var s=function(i){for(var r=[],o=arguments.length-1;o-- >0;)r[o]=arguments[o+1];e&&e[i]&&e[i].apply(e,r)};"serviceWorker"in navigator&&Xo.then(function(){cI()?(hI(t,s,n),navigator.serviceWorker.ready.then(function(i){s("ready",i)}).catch(function(i){return Zs(s,i)})):(vf(t,s,n),navigator.serviceWorker.ready.then(function(i){s("ready",i)}).catch(function(i){return Zs(s,i)}))})}function Zs(t,e){navigator.onLine||t("offline"),t("error",e)}function vf(t,e,n){navigator.serviceWorker.register(t,n).then(function(s){if(e("registered",s),s.waiting){e("updated",s);return}s.onupdatefound=function(){e("updatefound",s);var i=s.installing;i.onstatechange=function(){i.state==="installed"&&(navigator.serviceWorker.controller?e("updated",s):e("cached",s))}}}).catch(function(s){return Zs(e,s)})}function hI(t,e,n){fetch(t).then(function(s){s.status===404?(e("error",new Error("Service worker not found at "+t)),hu()):s.headers.get("content-type").indexOf("javascript")===-1?(e("error",new Error("Expected "+t+" to have javascript content-type, but received "+s.headers.get("content-type"))),hu()):vf(t,e,n)}).catch(function(s){return Zs(e,s)})}function hu(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()}).catch(function(t){return Zs(emit,t)})}var dI={};uI(`${dI.BASE_URL}service-worker.js`,{ready(){console.log(`App is being served from cache by a service worker.
For more details, visit https://goo.gl/AFskqB`)},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}});const da=D_(ov);"serviceWorker"in navigator&&ph();da.use(B_());da.use(aI);da.mount("#app");ph({immediate:!0});
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
