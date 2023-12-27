"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6122],{1057:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>d,default:()=>u,frontMatter:()=>c,metadata:()=>o,toc:()=>r});var n=a(4246),s=a(1670);const c={title:"Cascading Deletes"},d=void 0,o={id:"features/cascade-deletes",title:"Cascading Deletes",description:"You can have a parent cascade delete its children by doing:",source:"@site/docs/features/cascade-deletes.md",sourceDirName:"features",slug:"/features/cascade-deletes",permalink:"/docs/features/cascade-deletes",draft:!1,unlisted:!1,editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/features/cascade-deletes.md",tags:[],version:"current",frontMatter:{title:"Cascading Deletes"},sidebar:"tutorialSidebar",previous:{title:"Changed Fields",permalink:"/docs/features/changed-fields"},next:{title:"Partial Update APIs",permalink:"/docs/features/partial-update-apis"}},i={},r=[];function l(e){const t={code:"code",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"You can have a parent cascade delete its children by doing:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:'bookConfig.cascadeDelete("reviews");\n'})}),"\n",(0,n.jsxs)(t.p,{children:["You can also use database foreign key cascades, but using the domain-level ",(0,n.jsx)(t.code,{children:"cascadeDelete"})," will mean that any application-layer hooks/validation logic/etc. that might need to run due to the review being deleted will be run during ",(0,n.jsx)(t.code,{children:"em.flush()"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Currently, Joist does not automatically cascade delete children; i.e. it could/may eventually use the database metadata of a foreign key with ",(0,n.jsx)(t.code,{children:"ON CACADE DELETE"})," to know it should generate a ",(0,n.jsx)(t.code,{children:"cascadeDelete(...)"})," in the base codegen file, but for now you have to manually specify any cascade deletions that you want."]})]})}function u(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1670:(e,t,a)=>{a.d(t,{Z:()=>o,a:()=>d});var n=a(7378);const s={},c=n.createContext(s);function d(e){const t=n.useContext(c);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),n.createElement(c.Provider,{value:t},e.children)}}}]);