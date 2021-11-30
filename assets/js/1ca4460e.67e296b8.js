"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[255],{5318:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),f=c(n),m=a,d=f["".concat(l,".").concat(m)]||f[m]||u[m]||o;return n?r.createElement(d,i(i({ref:t},p),{},{components:n})):r.createElement(d,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5247:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return f}});var r=n(5773),a=n(808),o=(n(7378),n(5318)),i=["components"],s={title:"Best-in-Class Performance",position:4},l=void 0,c={unversionedId:"goals/best-in-class-performance",id:"goals/best-in-class-performance",isDocsHomePage:!1,title:"Best-in-Class Performance",description:"Joist aims for best-in-class performance by performing all INSERT, UPDATE, DELETE, and even SELECT operations in bulk.",source:"@site/docs/goals/best-in-class-performance.md",sourceDirName:"goals",slug:"/goals/best-in-class-performance",permalink:"/joist-ts/docs/goals/best-in-class-performance",editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/goals/best-in-class-performance.md",tags:[],version:"current",frontMatter:{title:"Best-in-Class Performance",position:4},sidebar:"tutorialSidebar",previous:{title:"Small & simple codebase",permalink:"/joist-ts/docs/goals/small-codebase"},next:{title:"Overview",permalink:"/joist-ts/docs/features"}},p=[],u={toc:p};function f(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Joist aims for best-in-class performance by performing all ",(0,o.kt)("inlineCode",{parentName:"p"},"INSERT"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"UPDATE"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"DELETE"),", and even ",(0,o.kt)("inlineCode",{parentName:"p"},"SELECT")," operations in bulk."),(0,o.kt)("p",null,"If you save 100 new authors, that is 1 SQL ",(0,o.kt)("inlineCode",{parentName:"p"},"INSERT")," statement. If you update 500 books, that is 1 SQL ",(0,o.kt)("inlineCode",{parentName:"p"},"UPDATE")," statement."),(0,o.kt)("p",null,"If you have a Unit of Work that has 100 new authors and 500 new books, there will be 1 SQL ",(0,o.kt)("inlineCode",{parentName:"p"},"INSERT")," statement for the authors, and 1 SQL ",(0,o.kt)("inlineCode",{parentName:"p"},"INSERT")," statement for the books."),(0,o.kt)("p",null,"This is dramatically different than other ORMs that generally issue 1 SQL statement per entity ",(0,o.kt)("em",{parentName:"p"},"instance")," instead of 1 SQL statement per entity ",(0,o.kt)("em",{parentName:"p"},"table")," (technically Joist is 1 SQL statement per entity type and operation, i.e. inserting authors and updating authors and deleting authors are separte statements)."),(0,o.kt)("p",null,"Note that this capability, especially bulk updates, currently requires a Postgres-specific ",(0,o.kt)("inlineCode",{parentName:"p"},"UPDATE"),' syntax, but that is part of the pay-off for Joist\'s "unapologetically Postgres-only (for now)" approach.'))}f.isMDXComponent=!0}}]);