"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[630],{5318:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var o=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),c=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,f=p["".concat(s,".").concat(m)]||p[m]||d[m]||a;return n?o.createElement(f,i(i({ref:t},u),{},{components:n})):o.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3813:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return d}});var o=n(2685),r=n(1244),a=(n(7378),n(5318)),i=["components"],l={title:"Many To Ones",sidebar_position:2},s=void 0,c={unversionedId:"associations/one-to-manys",id:"associations/one-to-manys",title:"Many To Ones",description:"Joist's codegen will look for m2o foreign keys like:",source:"@site/docs/associations/one-to-manys.md",sourceDirName:"associations",slug:"/associations/one-to-manys",permalink:"/docs/associations/one-to-manys",draft:!1,editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/associations/one-to-manys.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Many To Ones",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Partial Update APIs",permalink:"/docs/querying/partial-update-apis"},next:{title:"One to Manys",permalink:"/docs/associations/many-to-ones"}},u={},d=[{value:"Unloaded vs. Loaded",id:"unloaded-vs-loaded",level:3},{value:"In Sync Relations",id:"in-sync-relations",level:3}],p={toc:d};function m(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Joist's codegen will look for ",(0,a.kt)("inlineCode",{parentName:"p"},"m2o")," foreign keys like:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-console"},'                                       Table "public.books"\n   Column   |           Type           | Collation | Nullable |              Default\n------------+--------------------------+-----------+----------+-----------------------------------\n id         | integer                  |           | not null | nextval(\'books_id_seq\'::regclass)\n author_id  | integer                  |           | not null |\n ...\nIndexes:\n    "books_pkey" PRIMARY KEY, btree (id)\n    "books_author_id_idx" btree (author_id)\nForeign-key constraints:\n    "books_author_id_fkey" FOREIGN KEY (author_id) REFERENCES authors(id) DEFERRABLE INITIALLY DEFERRED\n')),(0,a.kt)("p",null,'And automatically include them in the "other sides" ',(0,a.kt)("inlineCode",{parentName:"p"},"AuthorCodegen")," file as a collection:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'export abstract class AuthorCodegen {\n  readonly books: Collection<Author, Book> = hasMany(bookMeta, "books", "author", "author_id");\n}\n')),(0,a.kt)("h3",{id:"unloaded-vs-loaded"},"Unloaded vs. Loaded"),(0,a.kt)("p",null,"Because the ",(0,a.kt)("inlineCode",{parentName:"p"},"authors"),' table is the "other side" of the relationship, very few methods are available on ',(0,a.kt)("inlineCode",{parentName:"p"},"Collection")," when unloaded."),(0,a.kt)("p",null,"To be useful, the collection must be loaded with a populate hint:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'const a = await em.load(Author, "a:1", "books");\nconsole.log(a.books.get.length);\nconsole.log(a.books.get[0].title);\n')),(0,a.kt)("h3",{id:"in-sync-relations"},"In Sync Relations"),(0,a.kt)("p",null,"Joist will keep both sides of a m2o/o2m relationship sync, i.e.:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},'// Load the author with the books collection loaded\nconst a = await em.load(Author, "a:1", "books");\n// Load a book, and add it to our collection\nconst b = await em.load(Book, "b:1");\na.books.add(b);\n// This will print true\nconsole.log(b.author.get === a);\n')))}m.isMDXComponent=!0}}]);