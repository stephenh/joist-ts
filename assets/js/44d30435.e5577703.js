"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[592],{5318:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return c}});var a=n(7378);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),m=s(n),c=r,f=m["".concat(p,".").concat(c)]||m[c]||d[c]||i;return n?a.createElement(f,l(l({ref:t},u),{},{components:n})):a.createElement(f,l({ref:t},u))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5792:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return u},default:function(){return m}});var a=n(5773),r=n(808),i=(n(7378),n(5318)),l=["components"],o={},p=void 0,s={unversionedId:"features/partial-update-apis",id:"features/partial-update-apis",isDocsHomePage:!1,title:"partial-update-apis",description:"Support for Partial Update Style APIs",source:"@site/docs/features/partial-update-apis.md",sourceDirName:"features",slug:"/features/partial-update-apis",permalink:"/joist-ts/docs/features/partial-update-apis",editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/features/partial-update-apis.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Lifecycle Hooks",permalink:"/joist-ts/docs/features/lifecycle-hooks"},next:{title:"Protected Fields",permalink:"/joist-ts/docs/features/protected-fields"}},u=[{value:"Support for Partial Update Style APIs",id:"support-for-partial-update-style-apis",children:[],level:3}],d={toc:u};function m(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"support-for-partial-update-style-apis"},"Support for Partial Update Style APIs"),(0,i.kt)("p",null,"A common pattern for APIs is to treat ",(0,i.kt)("inlineCode",{parentName:"p"},"null")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," differently, i.e. ",(0,i.kt)("inlineCode",{parentName:"p"},"{ lastName: null }"),' specifically means "unset the ',(0,i.kt)("inlineCode",{parentName:"p"},"lastName"),' property" while ',(0,i.kt)("inlineCode",{parentName:"p"},"firstName")," being not present (i.e. ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined"),') means "do not change ',(0,i.kt)("inlineCode",{parentName:"p"},"firstName"),'".'),(0,i.kt)("p",null,"These APIs can be difficult to map to Joist's opinionated approach of \"required properties must never be passed as ",(0,i.kt)("inlineCode",{parentName:"p"},"null")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined"),'", so Joist has two helper methods for building partial-update-style APIs: ',(0,i.kt)("inlineCode",{parentName:"p"},"EntityMangaer.createPartial")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Entity.setPartial"),"."),(0,i.kt)("p",null,"I.e. for a non-null ",(0,i.kt)("inlineCode",{parentName:"p"},"firstName")," and nullable ",(0,i.kt)("inlineCode",{parentName:"p"},"lastName"),' fields that both come in (from an RPC call or GraphQL mutation) as the "partial update" type of ',(0,i.kt)("inlineCode",{parentName:"p"},"string | null | undefined"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Author.setPartial")," allows directly passing both fields:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'const author = em.load(Author, "1");\nconst firstName: string | null | undefined = incomingFirstName;\nconst lastName: string | null | undefined = incomingLastName;\n// Calling set is a compile error because set\'s firstName must be a string\n// @ts-expect-error\nauthor.set({ firstName, lastName });\n// Call setPartial will compile\nauthor.setPartial({ firstName, lastName });\n}\n')),(0,i.kt)("p",null,"And the runtime behavior is:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},'firstName: "foo"')," will update ",(0,i.kt)("inlineCode",{parentName:"li"},"firstName")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"firstName: undefined")," will noop"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"firstName: null")," will be a runtime error"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},'lastName: "bar"')," will update ",(0,i.kt)("inlineCode",{parentName:"li"},"lastName")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"lastName: undefined")," will noop"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"lastName: null")," will unset ",(0,i.kt)("inlineCode",{parentName:"li"},"lastName")," (i.e. set it as ",(0,i.kt)("inlineCode",{parentName:"li"},"undefined"),")")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"EntityManager.createPartial")," constructor method has similar semantics."),(0,i.kt)("p",null,"Arguably the ideal partial-update type for ",(0,i.kt)("inlineCode",{parentName:"p"},"Author")," in this scenario would be:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"interface AuthorInput {\n  firstName: string | undefined;\n  lastName: string | null | undefined;\n}\n")),(0,i.kt)("p",null,"Which would alleviate the need for ",(0,i.kt)("inlineCode",{parentName:"p"},"setPartial"),", but it's sometimes hard to express this nuance in RPC/API type systems that generate the ",(0,i.kt)("inlineCode",{parentName:"p"},"AuthorInput")," TypeScript type, i.e. in particular GraphQL's type system cannot express the difference between ",(0,i.kt)("inlineCode",{parentName:"p"},"firstName")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"lastName")," with a partial-update style input type like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"type AuthorInput {\n  firstName: String\n  lastName: String\n}\n")),(0,i.kt)("p",null,"There is also a ",(0,i.kt)("inlineCode",{parentName:"p"},"EntityManager.createOrUpdatePartial"),' method that will conditionally create-or-update an entity, while accepting partial-update/"',(0,i.kt)("inlineCode",{parentName:"p"},"null"),'-means-unset" opts (and, per above, still apply runtime validation that no required fields are unset):'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'// Partial-update-typed variables from incoming API call\nconst id: number | undefined | null = 0;\nconst firstName: string | undefined | null = "...fromApi...";\nconst mentorId: number | undefined | null = 1;\nconst newBooks: Array<{ title: string | undefined | null }> = [{ title: "...fromApi..." }];\nawait em.createOrUpdatePartial(Author, {\n  id,\n  firstName,\n  mentor: mentorId,\n  books: newBooks,\n});\n')),(0,i.kt)("p",null,"Note how, unlike the ",(0,i.kt)("inlineCode",{parentName:"p"},"create")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"set")," methods that are synchronous and so only accept ",(0,i.kt)("inlineCode",{parentName:"p"},"Entity")," values for opts like ",(0,i.kt)("inlineCode",{parentName:"p"},"mentor")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"books"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"createOrUpdatePartial")," accepts partials of references/collections and will recursively ",(0,i.kt)("inlineCode",{parentName:"p"},"createOrUpdatePartial")," nested partials into the appropriate new-or-found entities based on the presence of ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," fields."),(0,i.kt)("p",null,"This effectively mimicks Objection.js's ",(0,i.kt)("a",{parentName:"p",href:"https://vincit.github.io/objection.js/guide/query-examples.html#graph-upserts"},(0,i.kt)("inlineCode",{parentName:"a"},"upsertGraph")),", with the same disclaimer that you should only pass trusted/white-listed keys to ",(0,i.kt)("inlineCode",{parentName:"p"},"createOrUpdatePartial")," (i.e. keys from a validated/subset GraphQL input type) and not just whatever form fields the user has happened to HTTP POST to your endpoint."))}m.isMDXComponent=!0}}]);