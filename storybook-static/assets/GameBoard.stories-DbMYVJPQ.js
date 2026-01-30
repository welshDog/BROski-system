const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BiFylCLN.js","./Avatar-2Q7WhId4.js","./index-GiUgBvb1.js","./jsx-runtime-CDt2p4po.js","./client-BLTvwgUg.js","./index-C8NrMXaH.js","./iframe-BHJYwy2s.js"])))=>i.map(i=>d[i]);
import{j as l}from"./jsx-runtime-CDt2p4po.js";import{r as x,g as se,R as K}from"./index-GiUgBvb1.js";import{C as Q,A as ie,O as ue}from"./Avatar-2Q7WhId4.js";import{_ as le}from"./iframe-BHJYwy2s.js";const ce={},D=e=>{let o;const t=new Set,r=(v,S)=>{const y=typeof v=="function"?v(o):v;if(!Object.is(y,o)){const m=o;o=S??(typeof y!="object"||y===null)?y:Object.assign({},o,y),t.forEach(f=>f(o,m))}},a=()=>o,g={setState:r,getState:a,getInitialState:()=>d,subscribe:v=>(t.add(v),()=>t.delete(v)),destroy:()=>{(ce?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),t.clear()}},d=o=e(r,a,g);return g},de=e=>e?D(e):D;var V={exports:{}},Y={},ee={exports:{}},te={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var I=x;function me(e,o){return e===o&&(e!==0||1/e===1/o)||e!==e&&o!==o}var pe=typeof Object.is=="function"?Object.is:me,ve=I.useState,fe=I.useEffect,he=I.useLayoutEffect,ge=I.useDebugValue;function ye(e,o){var t=o(),r=ve({inst:{value:t,getSnapshot:o}}),a=r[0].inst,n=r[1];return he(function(){a.value=t,a.getSnapshot=o,B(a)&&n({inst:a})},[e,t,o]),fe(function(){return B(a)&&n({inst:a}),e(function(){B(a)&&n({inst:a})})},[e]),ge(t),t}function B(e){var o=e.getSnapshot;e=e.value;try{var t=o();return!pe(e,t)}catch{return!0}}function Se(e,o){return o()}var be=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Se:ye;te.useSyncExternalStore=I.useSyncExternalStore!==void 0?I.useSyncExternalStore:be;ee.exports=te;var xe=ee.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P=x,Ie=xe;function _e(e,o){return e===o&&(e!==0||1/e===1/o)||e!==e&&o!==o}var Ee=typeof Object.is=="function"?Object.is:_e,je=Ie.useSyncExternalStore,we=P.useRef,Re=P.useEffect,Ce=P.useMemo,Pe=P.useDebugValue;Y.useSyncExternalStoreWithSelector=function(e,o,t,r,a){var n=we(null);if(n.current===null){var c={hasValue:!1,value:null};n.current=c}else c=n.current;n=Ce(function(){function g(m){if(!d){if(d=!0,v=m,m=r(m),a!==void 0&&c.hasValue){var f=c.value;if(a(f,m))return S=f}return S=m}if(f=S,Ee(v,m))return f;var u=r(m);return a!==void 0&&a(f,u)?(v=m,f):(v=m,S=u)}var d=!1,v,S,y=t===void 0?null:t;return[function(){return g(o())},y===null?void 0:function(){return g(y())}]},[o,t,r,a]);var p=je(e,n[0],n[1]);return Re(function(){c.hasValue=!0,c.value=p},[p]),Pe(p),p};V.exports=Y;var He=V.exports;const Be=se(He),ne={},{useDebugValue:Ae}=K,{useSyncExternalStoreWithSelector:De}=Be;let L=!1;const Le=e=>e;function Oe(e,o=Le,t){(ne?"production":void 0)!=="production"&&t&&!L&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),L=!0);const r=De(e.subscribe,e.getState,e.getServerState||e.getInitialState,o,t);return Ae(r),r}const O=e=>{(ne?"production":void 0)!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const o=typeof e=="function"?de(e):e,t=(r,a)=>Oe(o,r,a);return Object.assign(t,o),t},$e=e=>e?O(e):O;function re({position:e,index:o,type:t="normal"}){const r=x.useRef(null),[a,n]=x.useState(!1),c={normal:"#4F46E5",bonus:"#EF4444",start:"#22C55E",end:"#FBBF24"},p=a?1.2:1;return l.jsxs("mesh",{ref:r,position:e,onPointerEnter:()=>n(!0),onPointerLeave:()=>n(!1),scale:p,children:[l.jsx("boxGeometry",{args:[.8,.2,.8]}),l.jsx("meshStandardMaterial",{color:c[t],emissive:a?c[t]:"#000",emissiveIntensity:a?.5:0}),l.jsx("meshStandardMaterial",{attach:"material-1",color:"#999"})]})}re.__docgenInfo={description:"",methods:[],displayName:"BoardSpace",props:{position:{required:!0,tsType:{name:"tuple",raw:"[number, number, number]",elements:[{name:"number"},{name:"number"},{name:"number"}]},description:""},index:{required:!0,tsType:{name:"number"},description:""},type:{required:!1,tsType:{name:"union",raw:"'normal' | 'bonus' | 'start' | 'end'",elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'bonus'"},{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}]},description:"",defaultValue:{value:"'normal'",computed:!1}}}};const Fe={};function Me(e,o){let t;try{t=e()}catch{return}return{getItem:a=>{var n;const c=g=>g===null?null:JSON.parse(g,void 0),p=(n=t.getItem(a))!=null?n:null;return p instanceof Promise?p.then(c):c(p)},setItem:(a,n)=>t.setItem(a,JSON.stringify(n,void 0)),removeItem:a=>t.removeItem(a)}}const R=e=>o=>{try{const t=e(o);return t instanceof Promise?t:{then(r){return R(r)(t)},catch(r){return this}}}catch(t){return{then(r){return this},catch(r){return R(r)(t)}}}},Te=(e,o)=>(t,r,a)=>{let n={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:i=>i,version:0,merge:(i,h)=>({...h,...i}),...o},c=!1;const p=new Set,g=new Set;let d;try{d=n.getStorage()}catch{}if(!d)return e((...i)=>{console.warn(`[zustand persist middleware] Unable to update item '${n.name}', the given storage is currently unavailable.`),t(...i)},r,a);const v=R(n.serialize),S=()=>{const i=n.partialize({...r()});let h;const s=v({state:i,version:n.version}).then(b=>d.setItem(n.name,b)).catch(b=>{h=b});if(h)throw h;return s},y=a.setState;a.setState=(i,h)=>{y(i,h),S()};const m=e((...i)=>{t(...i),S()},r,a);let f;const u=()=>{var i;if(!d)return;c=!1,p.forEach(s=>s(r()));const h=((i=n.onRehydrateStorage)==null?void 0:i.call(n,r()))||void 0;return R(d.getItem.bind(d))(n.name).then(s=>{if(s)return n.deserialize(s)}).then(s=>{if(s)if(typeof s.version=="number"&&s.version!==n.version){if(n.migrate)return n.migrate(s.state,s.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return s.state}).then(s=>{var b;return f=n.merge(s,(b=r())!=null?b:m),t(f,!0),S()}).then(()=>{h==null||h(f,void 0),c=!0,g.forEach(s=>s(f))}).catch(s=>{h==null||h(void 0,s)})};return a.persist={setOptions:i=>{n={...n,...i},i.getStorage&&(d=i.getStorage())},clearStorage:()=>{d==null||d.removeItem(n.name)},getOptions:()=>n,rehydrate:()=>u(),hasHydrated:()=>c,onHydrate:i=>(p.add(i),()=>{p.delete(i)}),onFinishHydration:i=>(g.add(i),()=>{g.delete(i)})},u(),f||m},ze=(e,o)=>(t,r,a)=>{let n={storage:Me(()=>localStorage),partialize:u=>u,version:0,merge:(u,i)=>({...i,...u}),...o},c=!1;const p=new Set,g=new Set;let d=n.storage;if(!d)return e((...u)=>{console.warn(`[zustand persist middleware] Unable to update item '${n.name}', the given storage is currently unavailable.`),t(...u)},r,a);const v=()=>{const u=n.partialize({...r()});return d.setItem(n.name,{state:u,version:n.version})},S=a.setState;a.setState=(u,i)=>{S(u,i),v()};const y=e((...u)=>{t(...u),v()},r,a);a.getInitialState=()=>y;let m;const f=()=>{var u,i;if(!d)return;c=!1,p.forEach(s=>{var b;return s((b=r())!=null?b:y)});const h=((i=n.onRehydrateStorage)==null?void 0:i.call(n,(u=r())!=null?u:y))||void 0;return R(d.getItem.bind(d))(n.name).then(s=>{if(s)if(typeof s.version=="number"&&s.version!==n.version){if(n.migrate)return[!0,n.migrate(s.state,s.version)];console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,s.state];return[!1,void 0]}).then(s=>{var b;const[oe,ae]=s;if(m=n.merge(ae,(b=r())!=null?b:y),t(m,!0),oe)return v()}).then(()=>{h==null||h(m,void 0),m=r(),c=!0,g.forEach(s=>s(m))}).catch(s=>{h==null||h(void 0,s)})};return a.persist={setOptions:u=>{n={...n,...u},u.storage&&(d=u.storage)},clearStorage:()=>{d==null||d.removeItem(n.name)},getOptions:()=>n,rehydrate:()=>f(),hasHydrated:()=>c,onHydrate:u=>(p.add(u),()=>{p.delete(u)}),onFinishHydration:u=>(g.add(u),()=>{g.delete(u)})},n.skipHydration||f(),m||y},Ge=(e,o)=>"getStorage"in o||"serialize"in o||"deserialize"in o?((Fe?"production":void 0)!=="production"&&console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."),Te(e,o)):ze(e,o),ke=Ge;function $(e){return Math.max(100,e*100)}const F=100;function Ne(e,o){const t=Math.floor(o/25);let r=e.level,a=e.experience+t;for(;a>=$(r)&&r<F;)a-=$(r),r+=1;return r>=F&&(a=0),{level:r,experience:a}}const A=$e()(ke((e,o)=>({position:0,level:1,experience:0,coinBalance:0,appearance:{baseColor:"#FF6B6B",hatId:null,wingId:null,petId:null},moveAvatar:t=>e(r=>({position:Math.min(r.position+t,50)})),addCoins:t=>e(r=>{const a=r.coinBalance+t,n=Ne({level:r.level,experience:r.experience},t);return{coinBalance:a,level:n.level,experience:n.experience}}),setAppearance:t=>e(r=>({appearance:{...r.appearance,...t}})),resetPosition:()=>e({position:0})}),{name:"game-store"})),Je=K.lazy(()=>le(()=>import("./index-BiFylCLN.js"),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url).then(e=>({default:e.OrbitControls})));function C(){const e=A(o=>o.position);return l.jsx("div",{style:{width:"100%",height:"100%"},children:l.jsxs(Q,{camera:{position:[0,20,20],fov:45},children:[l.jsx("ambientLight",{intensity:.8}),l.jsx("pointLight",{position:[10,20,10],intensity:1}),l.jsx("pointLight",{position:[-10,20,-10],intensity:.5}),Array.from({length:50}).map((o,t)=>{const r=t/50*Math.PI*2,a=Math.cos(r)*12,n=Math.sin(r)*12;let c="normal";return t===0&&(c="start"),t===49&&(c="end"),t%10===0&&t!==0&&(c="bonus"),l.jsx(re,{position:[a,0,n],index:t,type:c},t)}),l.jsx(ie,{boardPosition:e}),l.jsx(x.Suspense,{fallback:null,children:l.jsx(Je,{autoRotate:!0,autoRotateSpeed:2,enableZoom:!0,enablePan:!0})})]})})}C.__docgenInfo={description:"",methods:[],displayName:"GameBoard"};const Ue={title:"3D/GameBoard",component:C,argTypes:{autoRotate:{control:"boolean"},autoRotateSpeed:{control:{type:"range",min:0,max:5,step:.5}},ambientIntensity:{control:{type:"range",min:0,max:2,step:.1}},pointIntensity:{control:{type:"range",min:0,max:2,step:.1}},viewportHeight:{control:{type:"number",min:300,max:900}}}};function H({children:e,args:o}){const{autoRotate:t=!0,autoRotateSpeed:r=2,ambientIntensity:a=.8,pointIntensity:n=1,viewportHeight:c=500}=o;return l.jsx("div",{style:{width:"100%",height:c},children:l.jsxs(Q,{camera:{position:[0,20,20],fov:45},children:[l.jsx("ambientLight",{intensity:a}),l.jsx("pointLight",{position:[10,20,10],intensity:n}),l.jsx("pointLight",{position:[-10,20,-10],intensity:n*.5}),l.jsx(x.Suspense,{fallback:null,children:e}),l.jsx(ue,{autoRotate:t,autoRotateSpeed:r,enableZoom:!0,enablePan:!0})]})})}const _={args:{autoRotate:!0,autoRotateSpeed:2,ambientIntensity:.8,pointIntensity:1,viewportHeight:500},render:e=>l.jsx(H,{args:e,children:l.jsx(C,{})})},E={args:{autoRotate:!1,autoRotateSpeed:0,ambientIntensity:1,pointIntensity:1.2,viewportHeight:500},render:e=>l.jsx(H,{args:e,children:l.jsx(C,{})})},j={args:{autoRotate:!1,ambientIntensity:.7,pointIntensity:1,viewportHeight:500},decorators:[(e,o)=>{A.setState({position:0});let t=0;const r=setInterval(()=>{t+=1,A.getState().moveAvatar(1),t>10&&clearInterval(r)},800);return l.jsx(e,{})}],render:e=>l.jsx(H,{args:e,children:l.jsx(C,{})})},w={args:{autoRotate:!1,ambientIntensity:.5,pointIntensity:.5,viewportHeight:400},render:e=>l.jsx(H,{args:e,children:l.jsx("nonexistent",{})})};var M,T,z;_.parameters={..._.parameters,docs:{...(M=_.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    autoRotate: true,
    autoRotateSpeed: 2,
    ambientIntensity: 0.8,
    pointIntensity: 1,
    viewportHeight: 500
  },
  render: args => <CanvasProvider args={args}>\r
      <GameBoard />\r
    </CanvasProvider>
}`,...(z=(T=_.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var G,k,N;E.parameters={...E.parameters,docs:{...(G=E.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    autoRotate: false,
    autoRotateSpeed: 0,
    ambientIntensity: 1,
    pointIntensity: 1.2,
    viewportHeight: 500
  },
  render: args => <CanvasProvider args={args}>\r
      <GameBoard />\r
    </CanvasProvider>
}`,...(N=(k=E.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var J,U,W;j.parameters={...j.parameters,docs:{...(J=j.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    autoRotate: false,
    ambientIntensity: 0.7,
    pointIntensity: 1,
    viewportHeight: 500
  },
  decorators: [(Story, ctx) => {
    useGameStore.setState({
      position: 0
    });
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      useGameStore.getState().moveAvatar(1);
      if (step > 10) clearInterval(interval);
    }, 800);
    return <Story />;
  }],
  render: args => <CanvasProvider args={args}>\r
      <GameBoard />\r
    </CanvasProvider>
}`,...(W=(U=j.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var X,Z,q;w.parameters={...w.parameters,docs:{...(X=w.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    autoRotate: false,
    ambientIntensity: 0.5,
    pointIntensity: 0.5,
    viewportHeight: 400
  },
  render: args => <CanvasProvider args={args}>\r
      {/* Intentionally render invalid element to simulate error */}\r
      {/* @ts-expect-error */}\r
      <nonexistent />\r
    </CanvasProvider>
}`,...(q=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:q.source}}};const We=["Default","HoverAndClick","MoveAvatar","ErrorBoundaryCase"],Qe=Object.freeze(Object.defineProperty({__proto__:null,Default:_,ErrorBoundaryCase:w,HoverAndClick:E,MoveAvatar:j,__namedExportsOrder:We,default:Ue},Symbol.toStringTag,{value:"Module"}));export{Qe as G,$e as c};
