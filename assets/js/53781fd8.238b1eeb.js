"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[953],{4695:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>r,contentTitle:()=>d,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var t=n(4246),s=n(1670);const a={title:"Tagged Ids",sidebar_position:2},d=void 0,o={id:"advanced/tagged-ids",title:"Tagged Ids",description:'Joist automatically "tags" entity ids, by prefixing them with a per-entity identifier.',source:"@site/docs/advanced/tagged-ids.md",sourceDirName:"advanced",slug:"/advanced/tagged-ids",permalink:"/docs/advanced/tagged-ids",draft:!1,unlisted:!1,editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/advanced/tagged-ids.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Tagged Ids",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Unit of Work",permalink:"/docs/advanced/unit-of-work"},next:{title:"Soft Deletes",permalink:"/docs/advanced/soft-deletes"}},r={},l=[{value:"Tag Assignment",id:"tag-assignment",level:2},{value:"Rationale",id:"rationale",level:2},{value:"Avoiding &quot;Wrong Id&quot; Bugs",id:"avoiding-wrong-id-bugs",level:3},{value:"Easier Debugging",id:"easier-debugging",level:3},{value:"Convenient GraphQL Integration",id:"convenient-graphql-integration",level:3},{value:"But I&#39;m Not Using GraphQL",id:"but-im-not-using-graphql",level:3},{value:"Running SQL Queries",id:"running-sql-queries",level:2},{value:"Untagged Id Fallback",id:"untagged-id-fallback",level:2},{value:"Disabling Tagged Ids",id:"disabling-tagged-ids",level:2}];function c(e){const i={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.p,{children:'Joist automatically "tags" entity ids, by prefixing them with a per-entity identifier.'}),"\n",(0,t.jsxs)(i.p,{children:["For example, assuming the ",(0,t.jsx)(i.code,{children:"Author"})," entity is configured to use ",(0,t.jsx)(i.code,{children:"a"})," as it's tag, then ",(0,t.jsx)(i.code,{children:"a.id"})," returns ",(0,t.jsx)(i.code,{children:'"a:1"'})," instead of ",(0,t.jsx)(i.code,{children:"1"}),":"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-typescript",children:'const a = await em.findOneOrFail(Author, { firstName: "first" });\n// Outputs `a:1`\nconsole.log(a.id);\n'})}),"\n",(0,t.jsxs)(i.p,{children:["In the database, the ",(0,t.jsx)(i.code,{children:"authors.id"})," column is still an auto-increment integer and has an int value of ",(0,t.jsx)(i.code,{children:"1"})," for this row, Joist just handles automatically adding & removing the ",(0,t.jsx)(i.code,{children:"a:"})," prefix while loading/saving to the database."]}),"\n",(0,t.jsx)(i.h2,{id:"tag-assignment",children:"Tag Assignment"}),"\n",(0,t.jsxs)(i.p,{children:["For the tag names, when you add a new table, Joist guesses a tag name to use by abbreviating the table name, i.e. ",(0,t.jsx)(i.code,{children:"book_reviews"})," is ",(0,t.jsx)(i.code,{children:"br"})," or ",(0,t.jsx)(i.code,{children:"foo_bar_zazzes"})," is ",(0,t.jsx)(i.code,{children:"fbz"}),"."]}),"\n",(0,t.jsxs)(i.p,{children:["If there is a collision, i.e. the ",(0,t.jsx)(i.code,{children:"br"})," abbreviation is already taken by an existing table in ",(0,t.jsx)(i.code,{children:"joist-config.json"}),", then Joist will use the full entity name, i.e. ",(0,t.jsx)(i.code,{children:"bookReview"}),"."]}),"\n",(0,t.jsxs)(i.p,{children:["The guessed tag name is then stored ",(0,t.jsx)(i.code,{children:"joist-config.json"}),", where you can easily change it if Joist initially guesses wrong."]}),"\n",(0,t.jsxs)(i.p,{children:["However, once you have a given tagged id deployed in production, you should probably never change it (i.e. change the ",(0,t.jsx)(i.code,{children:"bookReview"})," tag to ",(0,t.jsx)(i.code,{children:"bkr"}),"), because even though Joist internally would immediately start using the new tag value (after the change is deployed), if any other external systems have copies of your ids (like you've stored ",(0,t.jsx)(i.code,{children:"bookReview:1"})," in an external/3rd party system), those externally-stored ids will now be incorrect, and Joist will be unload to load them."]}),"\n",(0,t.jsx)(i.h2,{id:"rationale",children:"Rationale"}),"\n",(0,t.jsx)(i.p,{children:"There are a few reasons for this feature:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:'Avoiding "Wrong Id" Bugs'}),"\n",(0,t.jsx)(i.li,{children:"Easier debugging"}),"\n",(0,t.jsx)(i.li,{children:"Convenient GraphQL integration"}),"\n"]}),"\n",(0,t.jsx)(i.h3,{id:"avoiding-wrong-id-bugs",children:'Avoiding "Wrong Id" Bugs'}),"\n",(0,t.jsx)(i.p,{children:"Knowing the entity type for each id eliminates a class of bugs where ids are passed incorrectly across entity types."}),"\n",(0,t.jsx)(i.p,{children:"For example, a bug like:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-typescript",children:'const id = someAuthor.id;\n// ...lots of lines of code go by...\n// Oops, I used an "author id" to find a book...\nconst book = em.load(Book, id);\n'})}),"\n",(0,t.jsxs)(i.p,{children:['Frustratingly, often these "wrong id" bugs will be missed during local testing, because every table only has a few rows of ',(0,t.jsx)(i.code,{children:"id 1"}),", ",(0,t.jsx)(i.code,{children:"id 2"}),", so it's easy to have ",(0,t.jsx)(i.code,{children:"id 1"})," taken from the ",(0,t.jsx)(i.code,{children:"authors"})," table and accidentally work when looking it up in the ",(0,t.jsx)(i.code,{children:"books"})," table."]}),"\n",(0,t.jsxs)(i.p,{children:["It's not until production when ",(0,t.jsx)(i.code,{children:"books"})," ",(0,t.jsx)(i.code,{children:"id 1,203,345"})," is accidentally used as an ",(0,t.jsx)(i.code,{children:"author_id"}),' and a "invalid foreign key" constraint fails that we realize we\'d try to insert bad data (and may have already been inserting bad data in production up until this point).']}),"\n",(0,t.jsxs)(i.p,{children:["Note that Joist's entities also use strongly-typed id types (i.e. ",(0,t.jsx)(i.code,{children:"Author.id"})," returns an ",(0,t.jsx)(i.code,{children:"AuthorId"}),') to help prevent this with static type checking, but typed ids only prevent "wrong id" bugs that happen internally in the backend code (so, technically within our above example, we should get a compile error that ',(0,t.jsx)(i.code,{children:"id"})," needs to be a ",(0,t.jsx)(i.code,{children:"BookId"}),", which is great)."]}),"\n",(0,t.jsxs)(i.p,{children:['However, tagged ids extends "typed ids"-style protection to API calls, i.e. if a client calls the API for "author ',(0,t.jsx)(i.code,{children:"a:1"}),'" and then makes a subsequent API call that accidentally uses ',(0,t.jsx)(i.code,{children:"a:1"})," as a book id, Joist will throw a runtime error that it expected a ",(0,t.jsx)(i.code,{children:"b:..."})," prefixed id."]}),"\n",(0,t.jsx)(i.h3,{id:"easier-debugging",children:"Easier Debugging"}),"\n",(0,t.jsxs)(i.p,{children:["Seeing tagged ids in console output and error messages makes debugging easier because you immediately know which entity that was for, without having to manually annotate the ids in your logging statements, like with ",(0,t.jsx)(i.code,{children:"authorId=${...}"}),", or when the ",(0,t.jsx)(i.code,{children:"id"})," is in JSON payloads."]}),"\n",(0,t.jsx)(i.p,{children:"This seems minor, but in our experience once you've worked with tagged ids in log output, API calls, error messages, etc., you get really attached to the developer experience."}),"\n",(0,t.jsx)(i.h3,{id:"convenient-graphql-integration",children:"Convenient GraphQL Integration"}),"\n",(0,t.jsxs)(i.p,{children:["In GraphQL, there is a dedicated ",(0,t.jsx)(i.code,{children:"ID"})," type for id fields, e.g. for modeling an ",(0,t.jsx)(i.code,{children:"type Author { id: ID! }"})," field."]}),"\n",(0,t.jsxs)(i.p,{children:["Granted, it is not required to use the ",(0,t.jsx)(i.code,{children:"ID"})," type, i.e. you can just as well use ",(0,t.jsx)(i.code,{children:"id: Integer!"}),", but the ",(0,t.jsx)(i.code,{children:"ID"})," type is encouraged/more idiomatic because it is opaque, meaning it hides the ",(0,t.jsx)(i.code,{children:"id"}),"'s implementation details from the client."]}),"\n",(0,t.jsxs)(i.p,{children:['I.e., to an external client, it shouldn\'t really matter if your internal id is "a number" or "a uuid" or "a string", and so having this ',(0,t.jsx)(i.code,{children:"ID"})," type is how GraphQL represents that opaqueness."]}),"\n",(0,t.jsxs)(i.p,{children:['That said, in practice the "opaque" ',(0,t.jsx)(i.code,{children:"ID"})," type ends up being mapped to ",(0,t.jsx)(i.code,{children:"string"}),"s in actual languages like TypeScript or Go, since a string value can effectively encode/represent other types like a number, or a UUID (albeit with some overhead)."]}),"\n",(0,t.jsxs)(i.p,{children:['So while Joist is technically GraphQL-agnostic, if you are implementing a GraphQL system (which is what drove Joist\'s original development), the GraphQL layer already wants "the id is a string", so it is convenient if the ',(0,t.jsx)(i.code,{children:"Author"})," entity's ",(0,t.jsx)(i.code,{children:"id"})," is already a string, as then your resolver layer doesn't have to constantly map back/forth from integers to strings for output, and strings to ",(0,t.jsx)(i.code,{children:"parseInt"}),"-d integers for input."]}),"\n",(0,t.jsx)(i.p,{children:'Joist does all of that internally, i.e. "string/number mapping" between the API/entity domain layer and the database columns.'}),"\n",(0,t.jsx)(i.h3,{id:"but-im-not-using-graphql",children:"But I'm Not Using GraphQL"}),"\n",(0,t.jsx)(i.p,{children:"Even if you're not using GraphQL, both benefits/rationale of:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Id implementations should be opaque to external clients, and"}),"\n",(0,t.jsx)(i.li,{children:'Tagged ids prevent "wrong id" bugs'}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:'Are applicable to any system, so ideally you could apply the "id is a string" approach to your REST or GRPC or other APIs.'}),"\n",(0,t.jsxs)(i.p,{children:["That said, if you have an existing ",(0,t.jsx)(i.code,{children:"number"}),"-based API that you can't change, Joist provides ",(0,t.jsx)(i.code,{children:"deTagId"}),", ",(0,t.jsx)(i.code,{children:"deTagIds"}),", and ",(0,t.jsx)(i.code,{children:"tagId"})," methods to convert to/from tagged ids to the actual number value."]}),"\n",(0,t.jsx)(i.p,{children:"(Also, see the section below for disabling tagged IDs if you'd prefer that.)"}),"\n",(0,t.jsx)(i.h2,{id:"running-sql-queries",children:"Running SQL Queries"}),"\n",(0,t.jsxs)(i.p,{children:["When writing raw SQL queries, you can get the numeric value using ",(0,t.jsx)(i.code,{children:"deTagId"})]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-typescript",children:'  const query = someKnexQuery();\n  query.whereIn("books.id", deTagId(getMetadata(Book), bookId));\n'})}),"\n",(0,t.jsxs)(i.p,{children:["Note that ",(0,t.jsx)(i.code,{children:"deTagId"})," accepts the ",(0,t.jsx)(i.code,{children:"Book"})," entity as its 1st parameter because it still applies the tagged id runtime check, i.e. ensure that ",(0,t.jsx)(i.code,{children:"bookId"})," starts with ",(0,t.jsx)(i.code,{children:"b:..."}),"."]}),"\n",(0,t.jsxs)(i.p,{children:["If you need to detag a value without knowing the entity type, you can use ",(0,t.jsx)(i.code,{children:"unsafeDeTagIds"}),"."]}),"\n",(0,t.jsx)(i.h2,{id:"untagged-id-fallback",children:"Untagged Id Fallback"}),"\n",(0,t.jsx)(i.p,{children:"If you do happen to given Joist untagged ids, it will still work, for example:"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-typescript",children:'const id = "1";\n// This will work, the `a:` prefix is not strictly required\nconst a = await em.load(Author, id);\n'})}),"\n",(0,t.jsx)(i.h2,{id:"disabling-tagged-ids",children:"Disabling Tagged Ids"}),"\n",(0,t.jsxs)(i.p,{children:["If you're migrating an existing system to Joist, or just don't want to use tagged ids (although you should try them and see!), you can disable them in the ",(0,t.jsx)(i.code,{children:"joist-config.json"})," file by setting the ",(0,t.jsx)(i.code,{children:"idType"}),":"]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-json",children:'{\n  "idType": "untagged-string"\n}\n'})}),"\n",(0,t.jsxs)(i.p,{children:["This will change the return value of ",(0,t.jsx)(i.code,{children:"Author.id"})," from ",(0,t.jsx)(i.code,{children:'"a:1"'})," to just ",(0,t.jsx)(i.code,{children:'"1"'}),"."]}),"\n",(0,t.jsxs)(i.p,{children:["Note the value is still a string; we've not added support for returning numbers yet, see ",(0,t.jsx)(i.a,{href:"https://github.com/stephenh/joist-ts/issues/368",children:"#368"}),"."]})]})}function h(e={}){const{wrapper:i}={...(0,s.a)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1670:(e,i,n)=>{n.d(i,{Z:()=>o,a:()=>d});var t=n(7378);const s={},a=t.createContext(s);function d(e){const i=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),t.createElement(a.Provider,{value:i},e.children)}}}]);