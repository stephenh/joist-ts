"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[651],{5318:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),f=a,h=p["".concat(l,".").concat(f)]||p[f]||d[f]||i;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},1145:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return p}});var r=n(2685),a=n(1244),i=(n(7378),n(5318)),o=["components"],s={title:"Changed Fields",sidebar_position:4},l=void 0,c={unversionedId:"features/changed-fields",id:"features/changed-fields",title:"Changed Fields",description:"Each entity tracks which of its fields has changed within the current unit of work/EntityManager:",source:"@site/docs/features/changed-fields.md",sourceDirName:"features",slug:"/features/changed-fields",permalink:"/docs/features/changed-fields",editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/features/changed-fields.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Changed Fields",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Tagged Ids",permalink:"/docs/features/tagged-ids"},next:{title:"Bulk Operations",permalink:"/docs/features/bulk-operations"}},u=[{value:"Audit Trails",id:"audit-trails",children:[],level:3}],d={toc:u};function p(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Each entity tracks which of its fields has changed within the current unit of work/",(0,i.kt)("inlineCode",{parentName:"p"},"EntityManager"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'const a1 = em.load(Author, "1");\n\n// Nothing has changed at first\nexpect(a1.changes.firstName.hasChanged).toBeFalsey();\n\n// Now perform some business logic\na1.firstName = "a2";\n\n// And the field shows up has changed\nexpect(a1.changes.firstName.hasChanged).toBeTruthy();\nexpect(a1.changes.firstName.originalValue).toEqual("a1");\n')),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"changes")," API has three methods:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"changes.firstName.hasChanged")," - is ",(0,i.kt)("inlineCode",{parentName:"li"},"true")," whenever ",(0,i.kt)("inlineCode",{parentName:"li"},"firstName")," has been set, either on a new entity or an existing entity"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"changes.firstName.hasUpdated")," - is ",(0,i.kt)("inlineCode",{parentName:"li"},"true")," only when ",(0,i.kt)("inlineCode",{parentName:"li"},"firstName")," has been changed on an existing entity"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"changes.firstName.originalValue")," - is the original value, only for an existing entity")),(0,i.kt)("h3",{id:"audit-trails"},"Audit Trails"),(0,i.kt)("p",null,"Note the ",(0,i.kt)("inlineCode",{parentName:"p"},"changes")," API is only for the current in-memory changes being made to an entity, it's not an audit trail."),(0,i.kt)("p",null,"That said, Joist entities can be used with 3rd-party audit trail solutions like ",(0,i.kt)("a",{parentName:"p",href:"https://pgxn.org/dist/cyanaudit/"},"CyanAudit"),"."))}p.isMDXComponent=!0}}]);