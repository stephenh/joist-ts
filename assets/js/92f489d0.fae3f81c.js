"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[66],{5318:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var a=n(7378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),h=i,m=d["".concat(l,".").concat(h)]||d[h]||u[h]||o;return n?a.createElement(m,r(r({ref:t},c),{},{components:n})):a.createElement(m,r({ref:t},c))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var p=2;p<o;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7742:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return c},default:function(){return d}});var a=n(2685),i=n(1244),o=(n(7378),n(5318)),r=["components"],s={title:"Entity Matcher",sidebar_position:4},l=void 0,p={unversionedId:"features/entity-matcher",id:"features/entity-matcher",title:"Entity Matcher",description:"Joist provides a toMatchEntity matcher for more pleasant assertions in Jest.",source:"@site/docs/features/entity-matcher.md",sourceDirName:"features",slug:"/features/entity-matcher",permalink:"/docs/features/entity-matcher",editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/features/entity-matcher.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Entity Matcher",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Changed Fields",permalink:"/docs/features/changed-fields"},next:{title:"Bulk Operations",permalink:"/docs/features/bulk-operations"}},c=[{value:"Automatic Loading of Relations",id:"automatic-loading-of-relations",children:[],level:3},{value:"Prettier Output",id:"prettier-output",children:[],level:3},{value:"Installation",id:"installation",children:[],level:3}],u={toc:c};function d(e){var t=e.components,n=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Joist provides a ",(0,o.kt)("inlineCode",{parentName:"p"},"toMatchEntity")," matcher for more pleasant assertions in Jest."),(0,o.kt)("p",null,"There are two main benefits:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Automatic loading of relations"),(0,o.kt)("li",{parentName:"ul"},"Prettier actual vs. expected output")),(0,o.kt)("h3",{id:"automatic-loading-of-relations"},"Automatic Loading of Relations"),(0,o.kt)("p",null,'A potentially unwieldy pattern in tests is asserting against a "subtree" of data that was not initially loaded, i.e.:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const a1 = newAuthor(em);\n// Invoke something that adds books with reviews\nawait addBooksAndReviews(a1);\n// Because a1 is New we can access `books.get`, so this is easy...\nexpect(a1.books.get.length).toEqual(2);\n// But beyond that, we can't drill into each book's reviews\n// Compile error\nexpect(a1.books.get[0].reviews.get[0].title).toEqual(\"title\");\n")),(0,o.kt)("p",null,"And so test code would have to explicitly load what it wants to assert against, either with a separate ",(0,o.kt)("inlineCode",{parentName:"p"},"await b1.reviews.load()"),' for each individual relation (which can be tedious), or by declaring a "2nd version" of the entity with a ',(0,o.kt)("inlineCode",{parentName:"p"},"populate")," load hint (which is better but also awkward):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'const a1 = newAuthor(em);\n// Invoke something that adds books with reviews\nawait addBooksAndReviews(a1);\n// Preload the subtree of data we want to assert against\nconst a1_2 = await a1.populate({ books: "reviews" });\n// Now we can use get\nexpect(a1_2.books.get.length).toEqual(2);\nexpect(a1_2.books.get[0].reviews.get[0].title).toEqual("title");\n')),(0,o.kt)("p",null,"As a third option, ",(0,o.kt)("inlineCode",{parentName:"p"},"toMatchEntity")," provides a ",(0,o.kt)("inlineCode",{parentName:"p"},"toMatchObject"),"-style API so that a test can idiomatically declare what the subtree of data should be:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'const a1 = newAuthor(em);\n// Invoke something that adds books with reviews\nawait addBooksAndReviews(a1);\nawait expect(a1).toMatchEntity({\n  books: [\n    {\n      title: "b1",\n      reviews: [{ rating: 5 }],\n    },\n    {\n      title: "b2",\n      reviews: [{ rating: 4 }, { rating: -2 }],\n    },\n  ],\n});\n')),(0,o.kt)("p",null,'The upshot is that we get to assert against the entity "as if it\'s JSON" or "just data", and then ',(0,o.kt)("inlineCode",{parentName:"p"},"toMatchEntity")," takes care of loading the various references and collections."),(0,o.kt)("h3",{id:"prettier-output"},"Prettier Output"),(0,o.kt)("p",null,"Sometimes when entities are included in Jest failures, i.e. by Jest's native ",(0,o.kt)("inlineCode",{parentName:"p"},"toMatchObject"),', the Jest console output is ugly b/c Jest prints the internal implementation of the entity object (i.e. a failure for "expected ',(0,o.kt)("inlineCode",{parentName:"p"},"a1"),'" ends up printing the ',(0,o.kt)("inlineCode",{parentName:"p"},"a1.books")," field, which is actually a ",(0,o.kt)("inlineCode",{parentName:"p"},"OneToManyCollection")," with various internal flags/state, all of which are included in the output)."),(0,o.kt)("p",null,"Even with ~3-4 entities in a native ",(0,o.kt)("inlineCode",{parentName:"p"},"toMatchObject")," assertion, the output can get long and hard to visually parse."),(0,o.kt)("p",null,"Instead, ",(0,o.kt)("inlineCode",{parentName:"p"},"toMatchEntity"),' abbreviates each entity as simply its tagged id, so output for an assertion failure of "the collection expected two books of ',(0,o.kt)("inlineCode",{parentName:"p"},"b:1")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"b:2")," but only had one ",(0,o.kt)("inlineCode",{parentName:"p"},"b:2"),'" will look like:'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},'- Expected  - 0\n+ Received  + 1\n\n  Object {</>\n    "books": Array [\n+     "b:1",\n      "b:2",\n    ],\n  }\n`);\n')),(0,o.kt)("p",null,"Note that if an entity is new, i.e. the test has not done ",(0,o.kt)("inlineCode",{parentName:"p"},"em.flush")," (which is fine, tests should only ",(0,o.kt)("inlineCode",{parentName:"p"},"em.flush")," if really necessary, to be as fast & lightweight as possible), the abbreviation for an unsaved ",(0,o.kt)("inlineCode",{parentName:"p"},"Book"),' will be a "test id" of ',(0,o.kt)("inlineCode",{parentName:"p"},"b#1")," where ",(0,o.kt)("inlineCode",{parentName:"p"},"b")," is the entity's tag, and the ",(0,o.kt)("inlineCode",{parentName:"p"},"#1")," is the index of that particular entity within the ",(0,o.kt)("inlineCode",{parentName:"p"},"EntityManager"),"'s entities of that type."),(0,o.kt)("h3",{id:"installation"},"Installation"),(0,o.kt)("p",null,"In your ",(0,o.kt)("inlineCode",{parentName:"p"},"setupTests.ts"),", add:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},'import { toMatchEntity } from "joist-test-utils";\n\nexpect.extend({ toMatchEntity });\n')))}d.isMDXComponent=!0}}]);