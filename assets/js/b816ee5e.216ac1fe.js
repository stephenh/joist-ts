"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[341],{5318:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var o=t(7378);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=o.createContext({}),d=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=d(e.components);return o.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},c=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=d(t),m=r,k=c["".concat(s,".").concat(m)]||c[m]||u[m]||a;return t?o.createElement(k,i(i({ref:n},p),{},{components:t})):o.createElement(k,i({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=c;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var d=2;d<a;d++)i[d]=t[d];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}c.displayName="MDXCreateElement"},7333:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return p},default:function(){return c}});var o=t(2685),r=t(1244),a=(t(7378),t(5318)),i=["components"],l={title:"One to Manys",sidebar_position:4},s=void 0,d={unversionedId:"modeling/many-to-ones",id:"modeling/many-to-ones",title:"One to Manys",description:'Joist\'s codegen will look for o2m "incoming" foreign keys like:',source:"@site/docs/modeling/many-to-ones.md",sourceDirName:"modeling",slug:"/modeling/many-to-ones",permalink:"/docs/modeling/many-to-ones",editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/modeling/many-to-ones.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"One to Manys",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Many To Ones",permalink:"/docs/modeling/one-to-manys"},next:{title:"One to Ones",permalink:"/docs/modeling/one-to-ones"}},p=[{value:"Required vs. Optional",id:"required-vs-optional",children:[],level:3},{value:"Unloaded vs. Loaded",id:"unloaded-vs-loaded",children:[],level:3},{value:"In Sync Relations",id:"in-sync-relations",children:[],level:3}],u={toc:p};function c(e){var n=e.components,t=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Joist's codegen will look for ",(0,a.kt)("inlineCode",{parentName:"p"},"o2m"),' "incoming" foreign keys like:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-console"},'                                       Table "public.books"\n   Column   |           Type           | Collation | Nullable |              Default\n------------+--------------------------+-----------+----------+-----------------------------------\n id         | integer                  |           | not null | nextval(\'books_id_seq\'::regclass)\n author_id  | integer                  |           | not null |\n ...\nIndexes:\n    "books_pkey" PRIMARY KEY, btree (id)\n    "books_author_id_idx" btree (author_id)\nForeign-key constraints:\n    "books_author_id_fkey" FOREIGN KEY (author_id) REFERENCES authors(id) DEFERRABLE INITIALLY DEFERRED\n')),(0,a.kt)("p",null,"And automatically include them in the ",(0,a.kt)("inlineCode",{parentName:"p"},"BookCodegen")," file as a reference:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'export abstract class BookCodegen {\n  readonly author: ManyToOneReference<Book, Author, never> = hasOne(authorMeta, "author", "books");\n}\n')),(0,a.kt)("h3",{id:"required-vs-optional"},"Required vs. Optional"),(0,a.kt)("p",null,"When ",(0,a.kt)("inlineCode",{parentName:"p"},"books.author_id")," is ",(0,a.kt)("inlineCode",{parentName:"p"},"not null"),", the reference is modeled as required, i.e. ",(0,a.kt)("inlineCode",{parentName:"p"},"ManyToOneReference.get")," returns ",(0,a.kt)("inlineCode",{parentName:"p"},"Author"),", and cannot be ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined"),"."),(0,a.kt)("p",null,"When ",(0,a.kt)("inlineCode",{parentName:"p"},"books.author_id")," is ",(0,a.kt)("inlineCode",{parentName:"p"},"nullable"),", the refernece is modeling as optional, i.e. ",(0,a.kt)("inlineCode",{parentName:"p"},"ManyToOneReference.get")," returns ",(0,a.kt)("inlineCode",{parentName:"p"},"Author | undefined"),", and so can be ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined"),"."),(0,a.kt)("h3",{id:"unloaded-vs-loaded"},"Unloaded vs. Loaded"),(0,a.kt)("p",null,"Because the ",(0,a.kt)("inlineCode",{parentName:"p"},"author_id")," column exists directly on the ",(0,a.kt)("inlineCode",{parentName:"p"},"books")," table, some methods are available immediately:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'const b = await em.load(Book, "b:1");\nconsole.log(b.author.id, b.author.isSet);\n')),(0,a.kt)("p",null,"But accessing the ",(0,a.kt)("inlineCode",{parentName:"p"},"Author")," entity itself requires a populate hint:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'const b = await em.load(Book, "b:1", "author");\nconsole.log(b.author.get.firstName);\n')),(0,a.kt)("h3",{id:"in-sync-relations"},"In Sync Relations"),(0,a.kt)("p",null,"Joist will keep both sides of a m2o/o2m relationship sync, i.e.:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// Load the author with the books collection loaded\nconst a = await em.load(Author, "a:1", "books");\n// Load a book, and set the author\nconst b = await em.load(Book, "b:1");\nb.author.set(a);\n// This will print true\nconsole.log(a.books.get.includes(b));\n')),(0,a.kt)("p",null,"If the ",(0,a.kt)("inlineCode",{parentName:"p"},"Author.books")," collection is not loaded yet, then the ",(0,a.kt)("inlineCode",{parentName:"p"},"b.author.set"),' line does not cause it to become loaded, but instead will remember "add ',(0,a.kt)("inlineCode",{parentName:"p"},"b"),'" as a pending operation, to apply to ',(0,a.kt)("inlineCode",{parentName:"p"},"a.books"),", should it later become loaded within the current ",(0,a.kt)("inlineCode",{parentName:"p"},"EntityManager"),"."))}c.isMDXComponent=!0}}]);