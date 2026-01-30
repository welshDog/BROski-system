import{j as t}from"./jsx-runtime-CDt2p4po.js";import{r as f}from"./index-GiUgBvb1.js";import{A as n,C as j,O as R}from"./Avatar-2Q7WhId4.js";const I={title:"3D/Avatar",component:n,argTypes:{boardPosition:{control:{type:"range",min:0,max:49,step:1}},autoRotate:{control:"boolean"},autoRotateSpeed:{control:{type:"range",min:0,max:5,step:.5}},ambientIntensity:{control:{type:"range",min:0,max:2,step:.1}},viewportHeight:{control:{type:"number",min:300,max:900}}}};function s({children:e,args:b}){const{autoRotate:P=!0,autoRotateSpeed:x=2,ambientIntensity:h=.8,viewportHeight:y=500}=b;return t.jsx("div",{style:{width:"100%",height:y},children:t.jsxs(j,{camera:{position:[0,20,20],fov:45},children:[t.jsx("ambientLight",{intensity:h}),t.jsx(f.Suspense,{fallback:null,children:e}),t.jsx(R,{autoRotate:P,autoRotateSpeed:x,enableZoom:!0,enablePan:!0})]})})}const r={args:{boardPosition:0,autoRotate:!0,autoRotateSpeed:2,ambientIntensity:.8,viewportHeight:500},render:e=>t.jsx(s,{args:e,children:t.jsx(n,{boardPosition:e.boardPosition})})},a={args:{boardPosition:0,autoRotate:!1,ambientIntensity:1,viewportHeight:500},render:e=>t.jsx(s,{args:e,children:t.jsx(n,{boardPosition:e.boardPosition})})},o={args:{boardPosition:0,autoRotate:!1,ambientIntensity:.5,viewportHeight:400},render:e=>t.jsx(s,{args:e,children:t.jsx("invalid",{})})};var i,d,m;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    boardPosition: 0,
    autoRotate: true,
    autoRotateSpeed: 2,
    ambientIntensity: 0.8,
    viewportHeight: 500
  },
  render: args => <CanvasProvider args={args}>\r
      <Avatar boardPosition={args.boardPosition} />\r
    </CanvasProvider>
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,c,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    boardPosition: 0,
    autoRotate: false,
    ambientIntensity: 1,
    viewportHeight: 500
  },
  render: args => <CanvasProvider args={args}>\r
      <Avatar boardPosition={args.boardPosition} />\r
    </CanvasProvider>
}`,...(u=(c=a.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var g,l,v;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    boardPosition: 0,
    autoRotate: false,
    ambientIntensity: 0.5,
    viewportHeight: 400
  },
  render: args => <CanvasProvider args={args}>\r
      {/* @ts-expect-error */}\r
      <invalid />\r
    </CanvasProvider>
}`,...(v=(l=o.parameters)==null?void 0:l.docs)==null?void 0:v.source}}};const S=["Default","Animate","ErrorBoundaryCase"];export{a as Animate,r as Default,o as ErrorBoundaryCase,S as __namedExportsOrder,I as default};
