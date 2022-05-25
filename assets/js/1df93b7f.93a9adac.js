"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[237,11],{5318:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(7378);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(r),m=a,f=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},114:function(e,t,r){r.r(t),r.d(t,{default:function(){return f}});var n=r(1884),a=r(353),o=r(6112),i=r(8944),l=r(7378),s=r(7055),c="features_xdhU";l.Fragment,l.Fragment;function u(){return l.createElement("section",{className:c},l.createElement("div",{className:"container"},l.createElement("div",{className:"row"},l.createElement(s.default,null))))}var p="heroBanner_qdFl",d="button_JGCe";function m(){var e=(0,a.Z)().siteConfig;return l.createElement("header",{className:(0,i.Z)("hero hero--primary",p)},l.createElement("div",{className:"container"},l.createElement("h1",{className:"hero__title"},e.title),l.createElement("p",{className:"hero__subtitle"},e.tagline),l.createElement(n.Z,{to:"/docs/getting-started"},l.createElement("a",{className:d},"Get Started"))))}function f(){var e=(0,a.Z)().siteConfig;return l.createElement(o.Z,{title:"Hello from "+e.title,description:"Description will go into a meta tag in <head />"},l.createElement(m,null),l.createElement("main",null,l.createElement(u,null)))}},7055:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return p}});var n=r(2685),a=r(1244),o=(r(7378),r(5318)),i=["components"],l={title:"Goals",slug:"/goals",sidebar_label:"Overview",sidebar_position:0},s=void 0,c={unversionedId:"goals/overview",id:"goals/overview",title:"Goals",description:"The high-level goal of Joist is to bring ActiveRecord-level productivity to TypeScript/Node projects.",source:"@site/docs/goals/overview.md",sourceDirName:"goals",slug:"/goals",permalink:"/docs/goals",draft:!1,editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/goals/overview.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{title:"Goals",slug:"/goals",sidebar_label:"Overview",sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Schema Assumptions",permalink:"/docs/getting-started/schema-assumptions"},next:{title:"Code Generation",permalink:"/docs/goals/code-generation"}},u={},p=[],d={toc:p};function m(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The high-level goal of Joist is to bring ",(0,o.kt)("a",{parentName:"p",href:"https://guides.rubyonrails.org/active_record_basics.html"},"ActiveRecord"),"-level productivity to TypeScript/Node projects."),(0,o.kt)("p",null,"This is a lofty goal, and Joist has just started down that road, but that is the standard Joist strives for and ideally can surpass."),(0,o.kt)("p",null,"The major goals are:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Use ",(0,o.kt)("a",{parentName:"li",href:"/docs/goals/code-generation"},"code generation")," to move fast and remove boilerplate"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/docs/goals/avoiding-n-plus-1s"},"Avoid N+1s")," through first-class ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/graphql/dataloader"},"dataloader")," integration"),(0,o.kt)("li",{parentName:"ul"},"Differentiate ",(0,o.kt)("a",{parentName:"li",href:"/docs/goals/type-safe-relations"},"loaded vs. unloaded collections")," in the type system"),(0,o.kt)("li",{parentName:"ul"},"Enable ",(0,o.kt)("a",{parentName:"li",href:"/docs/goals/great-tests"},"great testing")," with built-in factories and other support"),(0,o.kt)("li",{parentName:"ul"},"Provide a variety of primitives of domain modeling options")))}m.isMDXComponent=!0}}]);