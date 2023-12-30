"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[317],{8511:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>t,contentTitle:()=>r,default:()=>h,frontMatter:()=>l,metadata:()=>d,toc:()=>c});var s=i(4246),o=i(1670);const l={title:"Find Queries",sidebar_position:3},r=void 0,d={id:"features/queries-find",title:"Find Queries",description:"Find queries are Joist's minimalist syntax for building SELECT queries that load entities.",source:"@site/docs/features/queries-find.md",sourceDirName:"features",slug:"/features/queries-find",permalink:"/docs/features/queries-find",draft:!1,unlisted:!1,editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/features/queries-find.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Find Queries",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Loading Entities",permalink:"/docs/features/loading-entities"},next:{title:"Changed Fields",permalink:"/docs/features/changed-fields"}},t={},c=[{value:"Structure",id:"structure",level:2},{value:"Inline Conditions",id:"inline-conditions",level:2},{value:"Complex Conditions",id:"complex-conditions",level:2},{value:"Condition &amp; Join Pruning",id:"condition--join-pruning",level:2},{value:"Incrementally Building Queries",id:"incrementally-building-queries",level:2},{value:"Methods",id:"methods",level:2},{value:"<code>#find</code>",id:"find",level:3},{value:"<code>#findOne</code>",id:"findone",level:3},{value:"<code>#findOneOrFail</code>",id:"findoneorfail",level:3},{value:"<code>#findOrCreate</code>",id:"findorcreate",level:3}];function a(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["Find queries are Joist's minimalist syntax for building ",(0,s.jsx)(n.code,{children:"SELECT"})," queries that load entities."]}),"\n",(0,s.jsx)(n.p,{children:"They look like this:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'// Find all BookReviews for a given Publisher\nconst reviews1 = await em.find(BookReview, {\n  book: { author: { publisher: p1 } }\n});\n\n// Find all BookReviews of Books with foo in the title\nconst reviews2 = await em.find(BookReview, {\n  book: { title: { like: "%foo%" } }\n});\n\n'})}),"\n",(0,s.jsxs)(n.p,{children:["All ",(0,s.jsx)(n.code,{children:"find"})," queries are executed via Joist's ",(0,s.jsx)(n.a,{href:"./entity-manager",children:"EntityManager"}),"."]}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsxs)(n.p,{children:["As mentioned on ",(0,s.jsx)(n.a,{href:"./loading-entities",children:"Loading Entities"}),", Joist's ",(0,s.jsx)(n.code,{children:"find"})," methods are meant to handle the ~80-90% of SQL queries in your codebase that are simple ",(0,s.jsx)(n.code,{children:"SELECT"}),"s of entities with a variety of joins and conditions."]}),(0,s.jsx)(n.p,{children:"If you need more complex queries, i.e. with aggregates or subqueries, you can still use a raw query builder like Knex."})]}),"\n",(0,s.jsx)(n.h2,{id:"structure",children:"Structure"}),"\n",(0,s.jsx)(n.p,{children:"Find queries are made up of three parts:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["A ",(0,s.jsx)(n.strong,{children:"join literal"})," that describes the tables to query/filter against,"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Inline conditions"})," within the join literal itself, and"]}),"\n",(0,s.jsxs)(n.li,{children:["Optional ",(0,s.jsx)(n.strong,{children:"complex conditions"})," that are passed as a separate argument"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["For example, to query all ",(0,s.jsx)(n.code,{children:"BookReview"}),"s for a given ",(0,s.jsx)(n.code,{children:"Publisher"}),", by joining through the ",(0,s.jsx)(n.code,{children:"Book"})," and ",(0,s.jsx)(n.code,{children:"Author"})," tables, we start at ",(0,s.jsx)(n.code,{children:"BookReviews"})," and then use nested object literals to join in the ",(0,s.jsx)(n.code,{children:"Book"})," and ",(0,s.jsx)(n.code,{children:"Author"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const reviews = await em.find(\n  BookReview,\n  // this is the join literal\n  { book: { author: { publisher: p1 } } },\n);\n"})}),"\n",(0,s.jsx)(n.p,{children:"This turns into the SQL:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT br.* FROM book_reviews br\n  JOIN books b ON br.book_id = b.id\n  JOIN authors a ON b.author_id = a.id\nWHERE a.publisher_id = 1\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Basically the join literal creates the ",(0,s.jsx)(n.code,{children:"JOIN <table> ON <foreign key>"})," clauses of the SQL statement."]}),"\n",(0,s.jsxs)(n.p,{children:["The join literal is the biggest brevity win of find queries, because just adding ",(0,s.jsx)(n.code,{children:"{ book: { author: ... } }"})," is much quicker than typing out the boilerplate ",(0,s.jsx)(n.code,{children:"ON br.book_id = b.id"})," for each join in a query."]}),"\n",(0,s.jsx)(n.h2,{id:"inline-conditions",children:"Inline Conditions"}),"\n",(0,s.jsxs)(n.p,{children:["Inline conditions are ",(0,s.jsx)(n.code,{children:"WHERE"})," conditions that appear directly in the join literal, i.e.:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'// Conditions directly in the top-level `books` join literal\nawait em.find(Book, { title: "b1" })\nawait em.find(Book, { title: { ne: "b1" } })\nawait em.find(Book, { publishedAt: { gte: jan1 } })\n// Or conditions within any nested join literal like `author`\nawait em.find(Book, { author: { firstName: { in: ["a1", "a2"] } } })\n'})}),"\n",(0,s.jsxs)(n.p,{children:["As expected turn into the SQL ",(0,s.jsx)(n.code,{children:"WHERE"})," clauses:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM books WHERE title = 'b1';\nSELECT * FROM books WHERE title != 'b1';\nSELECT * FROM books WHERE published_at >= '2018-01-01';\nSELECT * FROM books b\n    INNER JOIN authors ON b.author_id = a.id\n    WHERE a.first_name IN ('a1', 'a2');\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Because these conditions are inline with the rest of the join literal, they are always ",(0,s.jsx)(n.code,{children:"AND"}),"-d together with any other inline condition, for example:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'await em.find(Book, { title: "b1", author: a1 })\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Finds books with the title is ",(0,s.jsx)(n.code,{children:"b1"})," ",(0,s.jsx)(n.strong,{children:"and"})," the author is ",(0,s.jsx)(n.code,{children:"a:1"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM books WHERE title = 'b1' AND author_id = 1;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Inline conditions can be any of the following formats/operators:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Just the value itself, i.e. ",(0,s.jsx)(n.code,{children:'{ firstName: "a1" }'}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'{ firstName: ["a1", "a2"] }'})," becomes ",(0,s.jsx)(n.code,{children:'first_name IN ("a1", "a2")'})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Just the entity itself, i.e. ",(0,s.jsx)(n.code,{children:"{ publisher: p1 }"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"{ publisher: [p1, p2] }"})," becomes ",(0,s.jsx)(n.code,{children:"publisher_id IN (1, 2)"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"{ publisher: true }"})," becomes ",(0,s.jsx)(n.code,{children:"publisher_id IS NOT NULL"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"{ publisher: false }"})," becomes ",(0,s.jsx)(n.code,{children:"publisher_id IS NULL"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"{ publisher: undefined }"})," is ignored"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["A variety of operator literals, i.e.","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ eq: "a1" }'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ ne: "a1" }'})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"{ eq: null }"})," becomes ",(0,s.jsx)(n.code,{children:"IS NULL"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"{ ne: null }"})," becomes ",(0,s.jsx)(n.code,{children:"IS NOT NULL"})]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ in: ["a1", "b2", null] }'})}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:'{ nin: ["a1", "b2"] }'})," becomes ",(0,s.jsx)(n.code,{children:"NOT IN"})]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"{ lt: 1 }"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"{ gt: 1 }"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"{ gte: 1 }"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"{ lte: 1 }"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ like: "str" }'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ ilike: "str" }'})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["An operator literal can also include multiple keys, i.e.:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"{ gt: 1, lt: 10 }"})," becomes ",(0,s.jsx)(n.code,{children:"> 1 AND < 10"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["An operator literal can also use an explicit ",(0,s.jsx)(n.code,{children:"op"})," key, i.e.:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ op: "eq", value: "a1" }'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ op: "in", value: ["a1", "a2"] }'})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["An array field can also use these additional operators, i.e.:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ contains: ["book"] }'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ overlaps: ["book"] }'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'{ containedBy: ["book"] }'})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"op"})," format is useful for frontend UIs where the operator is bound to a drop-down, i.e. select ",(0,s.jsx)(n.code,{children:">="})," or ",(0,s.jsx)(n.code,{children:"<="})," or ",(0,s.jsx)(n.code,{children:"="}),", as then the select field can be down to the single ",(0,s.jsx)(n.code,{children:"op"})," key, instead of adding/removing the ",(0,s.jsx)(n.code,{children:"gt"}),"/",(0,s.jsx)(n.code,{children:"lt"}),"/",(0,s.jsx)(n.code,{children:"eq"})," keys based on the currently-selected operator."]})}),"\n",(0,s.jsx)(n.h2,{id:"complex-conditions",children:"Complex Conditions"}),"\n",(0,s.jsxs)(n.p,{children:["While inline conditions are very succinct, they only support ",(0,s.jsx)(n.code,{children:"AND"}),"s."]}),"\n",(0,s.jsxs)(n.p,{children:["Complex conditions allow complex conditions, i.e. ",(0,s.jsx)(n.code,{children:"AND"})," and ",(0,s.jsx)(n.code,{children:"OR"}),"s that can be nested arbitrarily deep."]}),"\n",(0,s.jsxs)(n.p,{children:['To support this, complex conditions introduce the concept of "aliases", which allow conditions to be created ',(0,s.jsx)(n.em,{children:"outside"})," of join literal, in a 3rd ",(0,s.jsx)(n.code,{children:"conditions"})," argument that can be organized orthogonally to how the tables are joined into the query."]}),"\n",(0,s.jsxs)(n.p,{children:["For example, to do an ",(0,s.jsx)(n.code,{children:"OR"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'const b = alias(Book);\nawait em.find(\n  Book,\n  { as: b },\n  { conditions:\n    { or: [b.title.eq("b1"), b.author.eq(a1)] }\n  }      \n);\n'})}),"\n",(0,s.jsxs)(n.p,{children:["So we still have the join literal, but the ",(0,s.jsx)(n.code,{children:"as"})," keyword binds the ",(0,s.jsx)(n.code,{children:"b"})," alias to the ",(0,s.jsx)(n.code,{children:"books"})," table, and then we can create an ",(0,s.jsx)(n.code,{children:"OR"})," expressions after."]}),"\n",(0,s.jsxs)(n.p,{children:["Splitting the aliases out allows ",(0,s.jsx)(n.code,{children:"OR"})," expressions that touch separate tables, by using an alias for each table:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'const [b, a] = aliases(Book, Author);\nawait em.find(\n  Book,\n  { as: b, author: a },\n  { conditions:\n    { or: [b.title.eq("b1"), a.firstName.eq("a1")] }\n  }      \n);\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The aliases use method calls to create conditions (i.e. ",(0,s.jsx)(n.code,{children:".eq(1)"}),"), which is a different syntax than the inline condition's ",(0,s.jsx)(n.code,{children:"{ eq: 1 }"})," literals, but the supported operations are still the same:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'eq("b1")'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:'ne("b1")'})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"lt(1)"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"gt(1)"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"lte(1)"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"gte(1)"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"gte(1)"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"condition--join-pruning",children:"Condition & Join Pruning"}),"\n",(0,s.jsxs)(n.p,{children:["Find queries have special treatment of ",(0,s.jsx)(n.code,{children:"undefined"}),", to facilitate constructing complex queries:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["any condition that has ",(0,s.jsx)(n.code,{children:"undefined"})," as a value will be dropped, and"]}),"\n",(0,s.jsx)(n.li,{children:"any join that has no conditions actively using the joined table will also be dropped"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["This allows building queries from ",(0,s.jsx)(n.code,{children:"filter"}),"s like:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"// Either firstName or publisherId may be defined\nconst { firstName, publisherId } = req.filter;\nconst rows = await em.find(\n  Book,\n  { firstName, author: { publisher: publisherId } }\n)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Where if the ",(0,s.jsx)(n.code,{children:"req.filter"})," does not have ",(0,s.jsx)(n.code,{children:"publisherId"})," set (because it was not submitted for this query), then:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["There will not be ",(0,s.jsx)(n.code,{children:"WHERE"})," clause for ",(0,s.jsx)(n.code,{children:"author.publisher_id"})]}),"\n",(0,s.jsxs)(n.li,{children:["There will not be a join from ",(0,s.jsx)(n.code,{children:"books"})," to ",(0,s.jsx)(n.code,{children:"authors"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["The win here is that, without the pruning feature, the filter construction code would have to manually join in the ",(0,s.jsx)(n.code,{children:"authors"})," table only if ",(0,s.jsx)(n.code,{children:"publisherId"})," was defined, to avoid making the query more expensive than it needs to be."]}),"\n",(0,s.jsxs)(n.admonition,{type:"tip",children:[(0,s.jsxs)(n.p,{children:['This means if you want to filter on "is null", you need to use an explicit ',(0,s.jsx)(n.code,{children:"firstName: null"})," or ",(0,s.jsx)(n.code,{children:"firstName: { eq: null }"})," instead of assuming that ",(0,s.jsx)(n.code,{children:"undefined"})," will be treated as ",(0,s.jsx)(n.code,{children:"null"}),"."]}),(0,s.jsxs)(n.p,{children:["This approach is admittedly contrary to ",(0,s.jsx)(n.code,{children:"null"})," vs. ",(0,s.jsx)(n.code,{children:"undefined"})," behavior in the rest of Joist, where ",(0,s.jsx)(n.code,{children:"undefined"})," ",(0,s.jsx)(n.em,{children:"is"})," converted to ",(0,s.jsx)(n.code,{children:"NULL"})," i.e. when saving column values to the database."]})]}),"\n",(0,s.jsx)(n.h2,{id:"incrementally-building-queries",children:"Incrementally Building Queries"}),"\n",(0,s.jsxs)(n.p,{children:["Joist's filters, specifically the ",(0,s.jsx)(n.code,{children:"FilterWithAlias"})," type, can be used to incrementally create/combine queries, in a fashion similar to Rails relations. For example something like:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const where: FilterWithAlias<Book> = {};\nif (authorCondition) {\n  where.author = authorCondition\n}\nif (titleCondition) {\n  where.title = titleCondition;\n}\nreturn await em.find(Book, where);\n"})}),"\n",(0,s.jsx)(n.p,{children:"Often times it can be most ergonomic to use spreading to do this inline:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"return await em.find(Book, {\n  author: { ...authorCondition, title },\n  title,\n});\n"})}),"\n",(0,s.jsxs)(n.p,{children:["But, in general, the ",(0,s.jsx)(n.code,{children:"FilterWithAlias"})," type allows you to create/pass around snippets of filters."]}),"\n",(0,s.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(n.h3,{id:"find",children:(0,s.jsx)(n.code,{children:"#find"})}),"\n",(0,s.jsx)(n.p,{children:"Query an entity and given where clause"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'const em = newEntityManager();\nconst authors = await em.find(Author, { email: "foo@bar.com" });\n'})}),"\n",(0,s.jsx)(n.p,{children:"You can also query based on an association"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'const books = await em.find(Book, { author: { firstName: "a2" } });\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Batch friendly"}),"\n",(0,s.jsxs)(n.li,{children:["Returns","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Array of zero or more entities"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"findone",children:(0,s.jsx)(n.code,{children:"#findOne"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const em = newEntityManager();\nconst author = await em.findOne(Author, { email: 'foo@bar.com\" });\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Batch friendly"}),"\n",(0,s.jsxs)(n.li,{children:["Returns","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Entity if one found"}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"undefined"})," if nothing found"]}),"\n",(0,s.jsxs)(n.li,{children:["throws ",(0,s.jsx)(n.code,{children:"TooManyError"})," if more than 1 found"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"findoneorfail",children:(0,s.jsx)(n.code,{children:"#findOneOrFail"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'const em = newEntityManager();\nconst author = await em.findOneOrFail(Author, { email: "foo@bar.com" });\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Batch friendly"}),"\n",(0,s.jsxs)(n.li,{children:["Returns","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Entity if one found"}),"\n",(0,s.jsxs)(n.li,{children:["throws ",(0,s.jsx)(n.code,{children:"NotFoundError"})," if nothing found"]}),"\n",(0,s.jsxs)(n.li,{children:["throws ",(0,s.jsx)(n.code,{children:"TooManyError"})," if more than 1 found"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"findorcreate",children:(0,s.jsx)(n.code,{children:"#findOrCreate"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:'const em = newEntityManager();\nconst author = await em.findOrCreate(Author, { email: "foo@bar.com" });\n'})})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},1670:(e,n,i)=>{i.d(n,{Z:()=>d,a:()=>r});var s=i(7378);const o={},l=s.createContext(o);function r(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);