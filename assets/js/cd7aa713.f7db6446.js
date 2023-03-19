"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[317],{5318:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var i=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),m=p(n),k=a,c=m["".concat(s,".").concat(k)]||m[k]||u[k]||o;return n?i.createElement(c,l(l({ref:t},d),{},{components:n})):i.createElement(c,l({ref:t},d))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=m;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:a,l[1]=r;for(var p=2;p<o;p++)l[p]=n[p];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1408:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var i=n(2685),a=(n(7378),n(5318));const o={title:"Find Queries",sidebar_position:3},l=void 0,r={unversionedId:"features/queries-find",id:"features/queries-find",title:"Find Queries",description:"Find queries are Joist's minimalist syntax for building SELECT queries that load entities.",source:"@site/docs/features/queries-find.md",sourceDirName:"features",slug:"/features/queries-find",permalink:"/docs/features/queries-find",draft:!1,editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/features/queries-find.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Find Queries",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Loading Entities",permalink:"/docs/features/loading-entities"},next:{title:"Changed Fields",permalink:"/docs/features/changed-fields"}},s={},p=[{value:"Structure",id:"structure",level:2},{value:"Inline Conditions",id:"inline-conditions",level:2},{value:"Complex Conditions",id:"complex-conditions",level:2},{value:"Condition &amp; Join Pruning",id:"condition--join-pruning",level:2},{value:"Methods",id:"methods",level:2},{value:"<code>#find</code>",id:"find",level:3},{value:"<code>#findOne</code>",id:"findone",level:3},{value:"<code>#findOneOrFail</code>",id:"findoneorfail",level:3},{value:"<code>#findOrCreate</code>",id:"findorcreate",level:3}],d={toc:p};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Find queries are Joist's minimalist syntax for building ",(0,a.kt)("inlineCode",{parentName:"p"},"SELECT")," queries that load entities."),(0,a.kt)("p",null,"They look like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'// Find all BookReviews for a given Publisher\nconst reviews1 = await em.find(BookReview, {\n  book: { author: { publisher: p1 } }\n});\n\n// Find all BookReviews of Books with foo in the title\nconst reviews2 = await em.find(BookReview, {\n  book: { title: { like: "%foo%" } }\n});\n\n')),(0,a.kt)("p",null,"All ",(0,a.kt)("inlineCode",{parentName:"p"},"find")," queries are executed via Joist's ",(0,a.kt)("a",{parentName:"p",href:"./entity-manager"},"EntityManager"),"."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"As mentioned on ",(0,a.kt)("a",{parentName:"p",href:"./loading-entities"},"Loading Entities"),", Joist's ",(0,a.kt)("inlineCode",{parentName:"p"},"find")," methods are meant to handle the ~80-90% of SQL queries in your codebase that are simple ",(0,a.kt)("inlineCode",{parentName:"p"},"SELECT"),"s of entities with a variety of joins and conditions."),(0,a.kt)("p",{parentName:"admonition"},"If you need more complex queries, i.e. with aggregates or subqueries, you can still use a raw query builder like Knex.")),(0,a.kt)("h2",{id:"structure"},"Structure"),(0,a.kt)("p",null,"Find queries are made up of three parts:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"A ",(0,a.kt)("strong",{parentName:"li"},"join literal")," that describes the tables to query/filter against,"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},"Inline conditions")," within the join literal itself, and"),(0,a.kt)("li",{parentName:"ol"},"Optional ",(0,a.kt)("strong",{parentName:"li"},"complex conditions")," that are passed as a separate argument")),(0,a.kt)("p",null,"For example, to query all ",(0,a.kt)("inlineCode",{parentName:"p"},"BookReview"),"s for a given ",(0,a.kt)("inlineCode",{parentName:"p"},"Publisher"),", by joining through the ",(0,a.kt)("inlineCode",{parentName:"p"},"Book")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"Author")," tables, we start at ",(0,a.kt)("inlineCode",{parentName:"p"},"BookReviews")," and then use nested object literals to join in the ",(0,a.kt)("inlineCode",{parentName:"p"},"Book")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"Author"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const reviews = await em.find(\n  BookReview,\n  // this is the join literal\n  { book: { author: { publisher: p1 } } },\n);\n")),(0,a.kt)("p",null,"This turns into the SQL:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT br.* FROM book_reviews br\n  JOIN books b ON br.book_id = b.id\n  JOIN authors a ON b.author_id = a.id\nWHERE a.publisher_id = 1\n")),(0,a.kt)("p",null,"Basically the join literal creates the ",(0,a.kt)("inlineCode",{parentName:"p"},"JOIN <table> ON <foreign key>")," clauses of the SQL statement."),(0,a.kt)("p",null,"The join literal is the biggest brevity win of find queries, because just adding ",(0,a.kt)("inlineCode",{parentName:"p"},"{ book: { author: ... } }")," is much quicker than typing out the boilerplate ",(0,a.kt)("inlineCode",{parentName:"p"},"ON br.book_id = b.id")," for each join in a query."),(0,a.kt)("h2",{id:"inline-conditions"},"Inline Conditions"),(0,a.kt)("p",null,"Inline conditions are ",(0,a.kt)("inlineCode",{parentName:"p"},"WHERE")," conditions that appear directly in the join literal, i.e.: "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'// Conditions directly in the top-level `books` join literal\nawait em.find(Book, { title: "b1" })\nawait em.find(Book, { title: { ne: "b1" } })\nawait em.find(Book, { publishedAt: { gte: jan1 } })\n// Or conditions within any nested join literal like `author`\nawait em.find(Book, { author: { firstName: { in: ["a1", "a2"] } } })\n')),(0,a.kt)("p",null,"As expected turn into the SQL ",(0,a.kt)("inlineCode",{parentName:"p"},"WHERE")," clauses:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM books WHERE title = 'b1';\nSELECT * FROM books WHERE title != 'b1';\nSELECT * FROM books WHERE published_at >= '2018-01-01';\nSELECT * FROM books b\n    INNER JOIN authors ON b.author_id = a.id\n    WHERE a.first_name IN ('a1', 'a2');\n")),(0,a.kt)("p",null,"Because these conditions are inline with the rest of the join literal, they are always ",(0,a.kt)("inlineCode",{parentName:"p"},"AND"),"-d together with any other inline condition, for example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'await em.find(Book, { title: "b1", author: a1 })\n')),(0,a.kt)("p",null,"Finds books with the title is ",(0,a.kt)("inlineCode",{parentName:"p"},"b1")," ",(0,a.kt)("strong",{parentName:"p"},"and")," the author is ",(0,a.kt)("inlineCode",{parentName:"p"},"a:1"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM books WHERE title = 'b1' AND author_id = 1;\n")),(0,a.kt)("p",null,"Inline conditions can be any of the following formats/operators:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Just the value itself, i.e. ",(0,a.kt)("inlineCode",{parentName:"li"},'{ firstName: "a1" }'),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},'{ firstName: ["a1", "a2"] }')," becomes ",(0,a.kt)("inlineCode",{parentName:"li"},'first_name IN ("a1", "a2")')))),(0,a.kt)("li",{parentName:"ul"},"Just the entity itself, i.e. ",(0,a.kt)("inlineCode",{parentName:"li"},"{ publisher: p1 }"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"{ publisher: [p1, p2] }")," becomes ",(0,a.kt)("inlineCode",{parentName:"li"},"publisher_id IN (1, 2)")))),(0,a.kt)("li",{parentName:"ul"},"A variety of operator literals, i.e.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},'{ eq: "a1" }')),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},'{ ne: "a1" }')),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"{ eq: null }")," becomes ",(0,a.kt)("inlineCode",{parentName:"li"},"IS NULL")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"{ ne: null }")," becomes ",(0,a.kt)("inlineCode",{parentName:"li"},"IS NOT NULL")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},'{ in: ["a1", "b2", null] }')),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"{ lt: 1 }")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"{ gt: 1 }")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"{ gte: 1 }")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"{ lte: 1 }")))),(0,a.kt)("li",{parentName:"ul"},"An operator literal can also include multiple keys, i.e.:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"{ gt: 1, lt: 10 }")," becomes ",(0,a.kt)("inlineCode",{parentName:"li"},"> 1 AND < 10")))),(0,a.kt)("li",{parentName:"ul"},"An operator literal can also use an explicit ",(0,a.kt)("inlineCode",{parentName:"li"},"op")," key, i.e.:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},'{ op: "eq", value: "a1" }')," "),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},'{ op: "in", value: ["a1", "a2"] }'))))),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"op"),' format is useful for frontend UIs where the operator is bound to a drop-down, i.e. select ">=" or "<=" or "=" , as then the select field can be down to the single ',(0,a.kt)("inlineCode",{parentName:"p"},"op")," key, instead of adding/removing the ",(0,a.kt)("inlineCode",{parentName:"p"},"gt"),"/",(0,a.kt)("inlineCode",{parentName:"p"},"lt"),"/",(0,a.kt)("inlineCode",{parentName:"p"},"eq")," keys based on the currently-selected operator.")),(0,a.kt)("h2",{id:"complex-conditions"},"Complex Conditions"),(0,a.kt)("p",null,"While inline conditions are very succinct, they only support ",(0,a.kt)("inlineCode",{parentName:"p"},"AND"),"s."),(0,a.kt)("p",null,"Complex conditions allow complex conditions, i.e. ",(0,a.kt)("inlineCode",{parentName:"p"},"AND")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"OR"),"s that can be nested arbitrarily deep."),(0,a.kt)("p",null,'To support this, complex conditions introduce the concept of "aliases", which allow conditions to be created ',(0,a.kt)("em",{parentName:"p"},"outside")," of join literal, in a 3rd ",(0,a.kt)("inlineCode",{parentName:"p"},"conditions")," argument that can be organized orthogonally to how the tables are joined into the query."),(0,a.kt)("p",null,"For example, to do an ",(0,a.kt)("inlineCode",{parentName:"p"},"OR"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'const b = alias(Book);\nawait em.find(\n  Book,\n  { as: b },\n  { conditions:\n    { or: [b.title.eq("b1"), b.author.eq(a1)] }\n  }      \n);\n')),(0,a.kt)("p",null,"So we still have the join literal, but the ",(0,a.kt)("inlineCode",{parentName:"p"},"as")," keyword binds the ",(0,a.kt)("inlineCode",{parentName:"p"},"b")," alias to the ",(0,a.kt)("inlineCode",{parentName:"p"},"books")," table, and then we can create an ",(0,a.kt)("inlineCode",{parentName:"p"},"OR")," expressions after."),(0,a.kt)("p",null,"Splitting the aliases out allows ",(0,a.kt)("inlineCode",{parentName:"p"},"OR")," expressions that touch separate tables, by using an alias for each table:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'const [b, a] = aliases(Book, Author);\nawait em.find(\n  Book,\n  { as: b, author: a },\n  { conditions:\n    { or: [b.title.eq("b1"), a.firstName.eq("a1")] }\n  }      \n);\n')),(0,a.kt)("p",null,"The aliases use method calls to create conditions (i.e. ",(0,a.kt)("inlineCode",{parentName:"p"},".eq(1)"),"), which is a different syntax than the inline condition's ",(0,a.kt)("inlineCode",{parentName:"p"},"{ eq: 1 }")," literals, but the supported operations are still the same:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},'eq("b1")')),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},'ne("b1")')),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"lt(1)")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"gt(1)")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"lte(1)")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"gte(1)")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"gte(1)"))),(0,a.kt)("h2",{id:"condition--join-pruning"},"Condition & Join Pruning"),(0,a.kt)("p",null,"Find queries have special treatment of ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined"),", to facilitate constructing complex queries:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"any condition that has ",(0,a.kt)("inlineCode",{parentName:"li"},"undefined")," as a value will be dropped, and"),(0,a.kt)("li",{parentName:"ul"},"any join that has no conditions actively using the joined table will also be dropped")),(0,a.kt)("p",null,"This allows building queries from ",(0,a.kt)("inlineCode",{parentName:"p"},"filter"),"s like:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"// Either firstName or publisherId may be defined\nconst { firstName, publisherId } = req.filter;\nconst rows = await em.find(\n  Book,\n  { firstName, author: { publisher: publisherId } }\n)\n")),(0,a.kt)("p",null,"Where if the ",(0,a.kt)("inlineCode",{parentName:"p"},"req.filter")," does not have ",(0,a.kt)("inlineCode",{parentName:"p"},"publisherId")," set (because it was not submitted for this query), then:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"There will not be ",(0,a.kt)("inlineCode",{parentName:"li"},"WHERE")," clause for ",(0,a.kt)("inlineCode",{parentName:"li"},"author.publisher_id")),(0,a.kt)("li",{parentName:"ul"},"There will not be a join from ",(0,a.kt)("inlineCode",{parentName:"li"},"books")," to ",(0,a.kt)("inlineCode",{parentName:"li"},"authors"))),(0,a.kt)("p",null,"The win here is that, without the pruning feature, the filter construction code would have to manually join in the ",(0,a.kt)("inlineCode",{parentName:"p"},"authors")," table only if ",(0,a.kt)("inlineCode",{parentName:"p"},"publisherId")," was defined, to avoid making the query more expensive than it needs to be."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},'This means if you want to filter on "is null", you need to use an explicit ',(0,a.kt)("inlineCode",{parentName:"p"},"firstName: null")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"firstName: { eq: null }")," instead of assuming that ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," will be treated as ",(0,a.kt)("inlineCode",{parentName:"p"},"null"),"."),(0,a.kt)("p",{parentName:"admonition"},"This approach is admittedly contrary to ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," vs. ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," behavior in the rest of Joist, where ",(0,a.kt)("inlineCode",{parentName:"p"},"undefined")," ",(0,a.kt)("em",{parentName:"p"},"is")," converted to ",(0,a.kt)("inlineCode",{parentName:"p"},"NULL")," i.e. when saving column values to the database.")),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("h3",{id:"find"},(0,a.kt)("inlineCode",{parentName:"h3"},"#find")),(0,a.kt)("p",null,"Query an entity and given where clause"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'const em = newEntityManager();\nconst authors = await em.find(Author, { email: "foo@bar.com" });\n')),(0,a.kt)("p",null,"You can also query based on an association"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'const books = await em.find(Book, { author: { firstName: "a2" } });\n')),(0,a.kt)("h3",{id:"findone"},(0,a.kt)("inlineCode",{parentName:"h3"},"#findOne")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const em = newEntityManager();\nconst author = await em.findOne(Author, { email: 'foo@bar.com\" });\n")),(0,a.kt)("h3",{id:"findoneorfail"},(0,a.kt)("inlineCode",{parentName:"h3"},"#findOneOrFail")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'const em = newEntityManager();\nconst author = await em.findOneOrFail(Author, { email: "foo@bar.com" });\n')),(0,a.kt)("h3",{id:"findorcreate"},(0,a.kt)("inlineCode",{parentName:"h3"},"#findOrCreate")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'const em = newEntityManager();\nconst author = await em.findOrCreate(Author, { email: "foo@bar.com" });\n')))}u.isMDXComponent=!0}}]);