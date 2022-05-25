"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[405],{5318:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=d(n),m=o,h=u["".concat(s,".").concat(m)]||u[m]||p[m]||i;return n?a.createElement(h,r(r({ref:t},c),{},{components:n})):a.createElement(h,r({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var d=2;d<i;d++)r[d]=n[d];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5543:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return d},toc:function(){return p}});var a=n(2685),o=n(1244),i=(n(7378),n(5318)),r=["components"],l={title:"Code Generation",sidebar_position:1},s=void 0,d={unversionedId:"goals/code-generation",id:"goals/code-generation",title:"Code Generation",description:"One of the primary ways Joist achieves ActiveRecord-level productivity and DRY-ness is by leveraging continual, schema-driven code generation.",source:"@site/docs/goals/code-generation.md",sourceDirName:"goals",slug:"/goals/code-generation",permalink:"/docs/goals/code-generation",draft:!1,editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/goals/code-generation.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Code Generation",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/docs/goals"},next:{title:"Avoiding N+1s",permalink:"/docs/goals/avoiding-n-plus-1s"}},c={},p=[{value:"Understanding the Generated Code",id:"understanding-the-generated-code",level:3},{value:"Example Entity File",id:"example-entity-file",level:3},{value:"Evergreen Code Generation",id:"evergreen-code-generation",level:3},{value:"Custom Business Logic",id:"custom-business-logic",level:3},{value:"Declarative Customizations (TODO)",id:"declarative-customizations-todo",level:3},{value:"Pros/Cons",id:"proscons",level:3}],u={toc:p};function m(e){var t=e.components,n=(0,o.Z)(e,r);return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"One of the primary ways Joist achieves ActiveRecord-level productivity and DRY-ness is by leveraging ",(0,i.kt)("strong",{parentName:"p"},"continual, schema-driven code generation"),"."),(0,i.kt)("h3",{id:"understanding-the-generated-code"},"Understanding the Generated Code"),(0,i.kt)("p",null,"Joist will generate:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Each codegen entity file (",(0,i.kt)("inlineCode",{parentName:"li"},"AuthorCodegen.ts"),") (every time)",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Contains the generated ",(0,i.kt)("inlineCode",{parentName:"li"},"AuthorCodegen")," class that extends ",(0,i.kt)("inlineCode",{parentName:"li"},"BaseEntity")),(0,i.kt)("li",{parentName:"ul"},"Contains fields for all primitive columns"),(0,i.kt)("li",{parentName:"ul"},"Contains fields for all relations (references and collections)"),(0,i.kt)("li",{parentName:"ul"},"Contains auto-generated validations (from not null constraints)"))),(0,i.kt)("li",{parentName:"ul"},"Each working entity file (",(0,i.kt)("inlineCode",{parentName:"li"},"Author.ts"),") (just once)",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Contains an empty ",(0,i.kt)("inlineCode",{parentName:"li"},"Author")," class that extends ",(0,i.kt)("inlineCode",{parentName:"li"},"AuthorCodegen")))),(0,i.kt)("li",{parentName:"ul"},"Each entity factory file (",(0,i.kt)("inlineCode",{parentName:"li"},"Author.factories.ts"),") (just once)"),(0,i.kt)("li",{parentName:"ul"},"A ",(0,i.kt)("inlineCode",{parentName:"li"},"metadata.ts")," file with schema information (every time)")),(0,i.kt)("h3",{id:"example-entity-file"},"Example Entity File"),(0,i.kt)("p",null,"I.e. for an ",(0,i.kt)("inlineCode",{parentName:"p"},"authors")," table, the initial ",(0,i.kt)("inlineCode",{parentName:"p"},"Author.ts")," file is as clean & simple as:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'import { AuthorCodegen } from "./entities";\n\nexport class Author extends AuthorCodegen {}\n')),(0,i.kt)("p",null,"Similar to ActiveRecord, Joist automatically adds all the columns to the ",(0,i.kt)("inlineCode",{parentName:"p"},"Author")," class for free, without you having to re-type them in your domain object. It does this for:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Primitive columns, i.e. ",(0,i.kt)("inlineCode",{parentName:"li"},"first_name")," can be set via ",(0,i.kt)("inlineCode",{parentName:"li"},'author.firstName = "bob"')),(0,i.kt)("li",{parentName:"ul"},"Foreign key columns, i.e. ",(0,i.kt)("inlineCode",{parentName:"li"},"book.author_id")," can be set via ",(0,i.kt)("inlineCode",{parentName:"li"},"book.author.set(...)"),", and"),(0,i.kt)("li",{parentName:"ul"},"Foreign key collections, i.e. ",(0,i.kt)("inlineCode",{parentName:"li"},"Author.books")," can be loaded via ",(0,i.kt)("inlineCode",{parentName:"li"},"await author.books.load()"),"."),(0,i.kt)("li",{parentName:"ul"},"One-to-one relations, many-to-many collections, etc.")),(0,i.kt)("p",null,"These columns/fields are added to the ",(0,i.kt)("inlineCode",{parentName:"p"},"AuthorCodegen.ts")," file, which looks (heavily redacted for clarity) something like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'// This is all generated code\nexport abstract class AuthorCodegen extends BaseEntity {\n  readonly books: Collection<Author, Book> = hasMany(\n    bookMeta,\n    "books",\n    "author",\n    "author_id",\n  );\n\n  readonly publisher: Reference<Author, Publisher, undefined> = hasOne(\n    publisherMeta,\n    "publisher",\n    "authors",\n  );\n\n  // ...\n\n  get id(): AuthorId | undefined {\n    return this.__orm.data["id"];\n  }\n\n  get firstName(): string {\n    return this.__orm.data["firstName"];\n  }\n\n  set firstName(firstName: string) {\n     setField(this, "firstName", firstName);\n  }\n}\n')),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Note that, while ActiveRecord leverages Ruby's runtime meta-programming to add getter & setters when your program starts up, Joist does this via build-time code generation (i.e. by running a ",(0,i.kt)("inlineCode",{parentName:"p"},"npm run joist-codegen")," command)."),(0,i.kt)("p",{parentName:"div"},"This approach allows the generated types to be seen by the TypeScript compiler and IDEs, and so provides your codebase a type-safe view of your database."))),(0,i.kt)("h3",{id:"evergreen-code-generation"},"Evergreen Code Generation"),(0,i.kt)("p",null,"Joist's code generation runs continually (although currently invoked by hand, i.e. individual ",(0,i.kt)("inlineCode",{parentName:"p"},"npm run joist-codegen")," commands), after every migration/schema change, so your domain objects will always 1-to-1 match your schema, without having to worry about keeping the two in sync."),(0,i.kt)("h3",{id:"custom-business-logic"},"Custom Business Logic"),(0,i.kt)("p",null,"Even though Joist's code generation runs continually, it only touches the ",(0,i.kt)("inlineCode",{parentName:"p"},"Author.ts")," once."),(0,i.kt)("p",null,"After that, all of Joist's updates are made only to the separate ",(0,i.kt)("inlineCode",{parentName:"p"},"AuthorCodegen.ts")," file."),(0,i.kt)("p",null,"This makes ",(0,i.kt)("inlineCode",{parentName:"p"},"Author.ts"),' a safe space to add any custom business logic you might need, separate from the boilerplate of the various getters, setters, and relations that are isolated into "codegen" base class, and always overwritten.'),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"/docs/modeling/lifecycle-hooks"},"Lifecycle Hooks")," and ",(0,i.kt)("a",{parentName:"p",href:"/docs/modeling/derived-fields"},"Derived Fields")," for examples of how to add business logic."),(0,i.kt)("h3",{id:"declarative-customizations-todo"},"Declarative Customizations (TODO)"),(0,i.kt)("p",null,"If you do need to customize how a column is mapped, Joist ",(0,i.kt)("em",{parentName:"p"},"should")," (these are not implemented yet) have two levers to pull:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Declare a schema-wide rule based on the column's type and/or naming convention"),(0,i.kt)("p",{parentName:"li"},"In the ",(0,i.kt)("inlineCode",{parentName:"p"},"joist-codegen.json")," config file, define all ",(0,i.kt)("inlineCode",{parentName:"p"},"timestampz")," columns should be mapped as type ",(0,i.kt)("inlineCode",{parentName:"p"},"MyCustomDateTime"),"."),(0,i.kt)("p",{parentName:"li"},"This would be preferable to per-column configuration/annotations because you could declare the rule once, and have it apply to all applicable columns in your schema.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Declare a specific user type for a column."),(0,i.kt)("p",{parentName:"li"},"In the ",(0,i.kt)("inlineCode",{parentName:"p"},"joist-codegen.json")," config file, define the column's specific user type."))),(0,i.kt)("h3",{id:"proscons"},"Pros/Cons"),(0,i.kt)("p",null,"This approach (continual, verbatim mapping of the database schema to your object model) generally assumes you have a modern/pleasant schema to work with, and you don't need your object model to look dramatically different from your database tables."),(0,i.kt)("p",null,"And specifically Joist's assertion is that this 1-1 restriction is a feature, because it should largely help avoid the ",(0,i.kt)("a",{parentName:"p",href:"https://blog.codinghorror.com/object-relational-mapping-is-the-vietnam-of-computer-science/"},"horror stories of ORMs"),", where the ORM is asked to do non-trivial translation between a database schema and object model that are fundamentally at odds."))}m.isMDXComponent=!0}}]);