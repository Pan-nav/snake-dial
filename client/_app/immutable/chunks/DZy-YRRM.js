import{J as b,K as E,L as k,M as S,N as W,O as Y,P as q,q as B,Q as L,R as H,T as $,V as j,W as m,c as w,s as D,a as C,f as p,X as J,Y as K,Z as Q,_ as X,$ as Z,a0 as z,a1 as F,e as G,B as U,j as x,h as N,D as rr}from"./Uw8UQGvQ.js";import{b as tr}from"./BN8xHMNY.js";const er=["touchstart","touchmove"];function ar(r){return er.includes(r)}function sr(r){var t=k,a=S;b(null),E(null);try{return r()}finally{b(t),E(a)}}const ir=new Set,A=new Set;function nr(r,t,a,o={}){function i(e){if(o.capture||y.call(t,e),!e.cancelBubble)return sr(()=>a==null?void 0:a.call(this,e))}return r.startsWith("pointer")||r.startsWith("touch")||r==="wheel"?B(()=>{t.addEventListener(r,i,o)}):t.addEventListener(r,i,o),i}function cr(r,t,a,o,i){var e={capture:o,passive:i},u=nr(r,t,a,e);(t===document.body||t===window||t===document)&&q(()=>{t.removeEventListener(r,u,e)})}function y(r){var O;var t=this,a=t.ownerDocument,o=r.type,i=((O=r.composedPath)==null?void 0:O.call(r))||[],e=i[0]||r.target,u=0,_=r.__root;if(_){var l=i.indexOf(_);if(l!==-1&&(t===document||t===window)){r.__root=t;return}var h=i.indexOf(t);if(h===-1)return;l<=h&&(u=l)}if(e=i[u]||r.target,e!==t){W(r,"currentTarget",{configurable:!0,get(){return e||a}});var T=k,f=S;b(null),E(null);try{for(var s,n=[];e!==null;){var c=e.assignedSlot||e.parentNode||e.host||null;try{var d=e["__"+o];if(d!==void 0&&(!e.disabled||r.target===e))if(Y(d)){var[M,...P]=d;M.apply(e,[r,...P])}else d.call(e,r)}catch(g){s?n.push(g):s=g}if(r.cancelBubble||c===t||c===null)break;e=c}if(s){for(let g of n)queueMicrotask(()=>{throw g});throw s}}finally{r.__root=t,delete r.currentTarget,b(T),E(f)}}}let V=!0;function lr(r,t){var a=t==null?"":typeof t=="object"?t+"":t;a!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=a,r.nodeValue=a+"")}function or(r,t){return I(r,t)}function dr(r,t){L(),t.intro=t.intro??!1;const a=t.target,o=N,i=p;try{for(var e=H(a);e&&(e.nodeType!==8||e.data!==$);)e=j(e);if(!e)throw m;w(!0),D(e),C();const u=I(r,{...t,anchor:e});if(p===null||p.nodeType!==8||p.data!==J)throw K(),m;return w(!1),u}catch(u){if(u===m)return t.recover===!1&&Q(),L(),X(a),w(!1),or(r,t);throw u}finally{w(o),D(i)}}const v=new Map;function I(r,{target:t,anchor:a,props:o={},events:i,context:e,intro:u=!0}){L();var _=new Set,l=f=>{for(var s=0;s<f.length;s++){var n=f[s];if(!_.has(n)){_.add(n);var c=ar(n);t.addEventListener(n,y,{passive:c});var d=v.get(n);d===void 0?(document.addEventListener(n,y,{passive:c}),v.set(n,1)):v.set(n,d+1)}}};l(Z(ir)),A.add(l);var h=void 0,T=z(()=>{var f=a??t.appendChild(F());return G(()=>{if(e){U({});var s=x;s.c=e}i&&(o.$$events=i),N&&tr(f,null),V=u,h=r(f,o)||{},V=!0,N&&(S.nodes_end=p),e&&rr()}),()=>{var c;for(var s of _){t.removeEventListener(s,y);var n=v.get(s);--n===0?(document.removeEventListener(s,y),v.delete(s)):v.set(s,n)}A.delete(l),f!==a&&((c=f.parentNode)==null||c.removeChild(f))}});return R.set(h,T),h}let R=new WeakMap;function _r(r,t){const a=R.get(r);return a?(R.delete(r),a(t)):Promise.resolve()}export{V as a,cr as e,dr as h,or as m,lr as s,_r as u,sr as w};
