"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[761],{5318:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return h}});var o=a(7378);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,o,n=function(e,t){if(null==e)return{};var a,o,n={},i=Object.keys(e);for(o=0;o<i.length;o++)a=i[o],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)a=i[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=o.createContext({}),p=function(e){var t=o.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),m=p(a),h=n,u=m["".concat(s,".").concat(h)]||m[h]||c[h]||i;return a?o.createElement(u,l(l({ref:t},d),{},{components:a})):o.createElement(u,l({ref:t},d))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,l=new Array(i);l[0]=m;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:n,l[1]=r;for(var p=2;p<i;p++)l[p]=a[p];return o.createElement.apply(null,l)}return o.createElement.apply(null,a)}m.displayName="MDXCreateElement"},7059:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return r},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return m}});var o=a(2685),n=a(1244),i=(a(7378),a(5318)),l=["components"],r={title:"Avoiding N+1s",sidebar_position:2},s=void 0,p={unversionedId:"goals/avoiding-n-plus-1s",id:"goals/avoiding-n-plus-1s",title:"Avoiding N+1s",description:'Joist is built on top of Facebook\'s dataloader library, which allows it fundamentally avoid N+1s in a systematic way that almost always "just works".',source:"@site/docs/goals/avoiding-n-plus-1s.md",sourceDirName:"goals",slug:"/goals/avoiding-n-plus-1s",permalink:"/docs/goals/avoiding-n-plus-1s",editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/goals/avoiding-n-plus-1s.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Avoiding N+1s",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Code Generation",permalink:"/docs/goals/code-generation"},next:{title:"Type-Safe Relations",permalink:"/docs/goals/type-safe-relations"}},d=[{value:"Background",id:"background",children:[],level:2},{value:"Common/Tedious Pitfall",id:"commontedious-pitfall",children:[],level:2},{value:"Saved By the Event Loop",id:"saved-by-the-event-loop",children:[{value:"Control Flow",id:"control-flow",children:[],level:3}],level:2},{value:"N+1-Safe GraphQL Resolvers",id:"n1-safe-graphql-resolvers",children:[],level:2},{value:"Preloading Is Still Allowed",id:"preloading-is-still-allowed",children:[],level:2},{value:"Where It Doesn&#39;t Work",id:"where-it-doesnt-work",children:[],level:2}],c={toc:d};function m(e){var t=e.components,a=(0,n.Z)(e,l);return(0,i.kt)("wrapper",(0,o.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Joist is built on top of Facebook's ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/graphql/dataloader"},"dataloader"),' library, which allows it fundamentally avoid N+1s in a systematic way that almost always "just works".'),(0,i.kt)("h2",{id:"background"},"Background"),(0,i.kt)("p",null,'The term "N+1" is what happens for code that looks like:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'// Get an author and their books\nconst author = await em.load(Author, "a:1");\nconst books = await author.books.load();\n\n// Do something with each book\nawait Proimse.all(books.map(async (book) => {\n  // Load this book\'s reviews\n  const reviews = await book.reviews.load();\n}));\n')),(0,i.kt)("p",null,"The risk is that if each invocation of ",(0,i.kt)("inlineCode",{parentName:"p"},"book.reviews.load()")," causes a ",(0,i.kt)("inlineCode",{parentName:"p"},"SELECT * FROM book_reviews WHERE book_id = 1"),", then ",(0,i.kt)("inlineCode",{parentName:"p"},"SELECT * FROM book_reviews WHERE book_id = 2"),", then ",(0,i.kt)("inlineCode",{parentName:"p"},"... WHERE book_id = 3"),", etc., then if we have ",(0,i.kt)("inlineCode",{parentName:"p"},"N")," books, we will make ",(0,i.kt)("inlineCode",{parentName:"p"},"N")," SQL queries (one for each book id)."),(0,i.kt)("p",null,"If we count the initial ",(0,i.kt)("inlineCode",{parentName:"p"},"SELECT * FROM books WHERE author_id = 1")," query as ",(0,i.kt)("inlineCode",{parentName:"p"},"1"),", this means we've made ",(0,i.kt)("inlineCode",{parentName:"p"},"N + 1")," queries to process each of the author's books, hence the term N+1."),(0,i.kt)("h2",{id:"commontedious-pitfall"},"Common/Tedious Pitfall"),(0,i.kt)("p",null,'N+1s have fundamentally plagued ORMs, not just in Node/TypeScript but basically all programming languages & ORMs, because at the end of the day the ORM approach of modeling "foreign keys as collections" (i.e. ',(0,i.kt)("inlineCode",{parentName:"p"},"book.reviews"),' "looks like an in-memory collection", but ',(0,i.kt)("em",{parentName:"p"},"actually"),' requires an expensive I/O call to load) clashes with the usual (in-memory) semantics that "collections are cheap to access", ',(0,i.kt)("strong",{parentName:"p"},"leading to a leaky abstraction"),"."),(0,i.kt)("p",null,"Unfortunately, writing ",(0,i.kt)("inlineCode",{parentName:"p"},"for")," loops, like above, that access a collection is a common and natural pattern for programmers to use, and typically is perfectly safe to do; however, and ORMs risk breaking this assumption."),(0,i.kt)("p",null,"In ORM like ActiveRecord, N+1s happen by default, and the programmer needs to tell ActiveRecord ahead of time which collections to preload, i.e. in Ruby:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ruby"},'author = Author.find_by_id("1");\n# The `include(:reviews)` means reviews are fetched before the `for` loop\nbooks = Book.find({ author_id: author.id }).include(:reviews)\nbooks.each do |book|\n  # Now access the collection, and it\'s already in-memory\n  reviews = book.reviews.length;\nend\n')),(0,i.kt)("p",null,"This resolves the performance issue, but relies on programmer's knowing what data will be accessed in loops ahead of time. This is possible, but as a codebase grows and codepaths become more complicated, it can become a tedious game of whack-a-mole, as the default behavior is inherently not performant. "),(0,i.kt)("h2",{id:"saved-by-the-event-loop"},"Saved By the Event Loop"),(0,i.kt)("p",null,"Joist is able to avoid N+1s ",(0,i.kt)("strong",{parentName:"p"},"without preload hints")," by leveraging Facebook's ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/graphql/dataloader"},"dataloader")," library to automatically batch multiple ",(0,i.kt)("inlineCode",{parentName:"p"},"load")," operations into single SQL statements."),(0,i.kt)("p",null,"Dataloader leverages JavaScript's synchronous/single-thread model, which is where when JavaScript evaluates the ",(0,i.kt)("inlineCode",{parentName:"p"},"book.reviews.load()")," method insdie of ",(0,i.kt)("inlineCode",{parentName:"p"},"books.map"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"await Proimse.all(books.map(async (book) => {\n  const reviews = await book.reviews.load();\n}));\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"load")," method is fundamentally not allowed make an immediate SQL call, because it would block the thread."),(0,i.kt)("p",null,"Instead, the ",(0,i.kt)("inlineCode",{parentName:"p"},"load")," method is forced to return a ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),", handle the I/O off the thread, and then later return the ",(0,i.kt)("inlineCode",{parentName:"p"},"reviews")," that have been loaded."),(0,i.kt)("p",null,"And so the ",(0,i.kt)("em",{parentName:"p"},"actual"),' "immediate next thing" that this code does, is that it invokes the next iteration of ',(0,i.kt)("inlineCode",{parentName:"p"},"books.map"),", i.e. get ",(0,i.kt)("inlineCode",{parentName:"p"},"book 2")," and immediately asks for its ",(0,i.kt)("inlineCode",{parentName:"p"},"reviews.load()")," as well."),(0,i.kt)("p",null,'Ironically, this forced "nothing can block", that for years was the bane of JavaScript\'s programming model due to the pre-',(0,i.kt)("inlineCode",{parentName:"p"},"Promise")," callback hell it caused, gives Joist (via dataloader) an opportunity to wait just a ",(0,i.kt)("em",{parentName:"p"},"little bit"),", until all of the ",(0,i.kt)("inlineCode",{parentName:"p"},"book.reviews.load()"),' have been "asked for", and the ',(0,i.kt)("inlineCode",{parentName:"p"},"books.map")," iteration is finished, to only then see that \"ah, we've been asked to do 10 ",(0,i.kt)("inlineCode",{parentName:"p"},"book.reviews.load"),", let's do those as a single SQL statement\", and execute a single SQL statement like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM book_reviews WHERE book_id IN (1, 2, 3, ..., 10);\n")),(0,i.kt)("h3",{id:"control-flow"},"Control Flow"),(0,i.kt)("p",null,'It is a little esoteric, but dataloader implements this by automatically managing "flush" events in JavaScript\'s event loop. Specifically, the event loop execution will look like (each "Tick" is a synchronous execution of logic on the event loop):'),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Tick 1, call ",(0,i.kt)("inlineCode",{parentName:"li"},"books.map")," for each book, and synchronously",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"For book 1, call ",(0,i.kt)("inlineCode",{parentName:"li"},"load"),', there is no existing "flush" event, so dataloader creates one at the end of the queue, with ',(0,i.kt)("inlineCode",{parentName:"li"},"book:1")," in it"),(0,i.kt)("li",{parentName:"ul"},"For book 2, call ",(0,i.kt)("inlineCode",{parentName:"li"},"load"),', see there is already a queued "flush" event, so add ',(0,i.kt)("inlineCode",{parentName:"li"},"book:2")," to it,"),(0,i.kt)("li",{parentName:"ul"},"For book ",(0,i.kt)("inlineCode",{parentName:"li"},"N"),", call ",(0,i.kt)("inlineCode",{parentName:"li"},"load"),', see there is already a queued "flush" event, so add ',(0,i.kt)("inlineCode",{parentName:"li"},"book:N")," to it"))),(0,i.kt)("li",{parentName:"ul"},'Tick 2, evaluate the "flush" event',(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},'Tell Joist "load all 10 books"'),(0,i.kt)("li",{parentName:"ul"},"Joist issues a single SQL statement"))),(0,i.kt)("li",{parentName:"ul"},'Tick 3, SQL statement resolves, Joist tells dataloader "okay, here are the reviews for each of the 10 books"',(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Resolve book 1's promise with its reviews"),(0,i.kt)("li",{parentName:"ul"},"Resolve book 2's promise with its reviews"),(0,i.kt)("li",{parentName:"ul"},"Resolve book ",(0,i.kt)("inlineCode",{parentName:"li"},"N"),"'s promise with its reviews"))),(0,i.kt)("li",{parentName:"ul"},"Tick 4, continue book 1's ",(0,i.kt)("inlineCode",{parentName:"li"},"async")," function, now with ",(0,i.kt)("inlineCode",{parentName:"li"},"reviews")," populated"),(0,i.kt)("li",{parentName:"ul"},"Tick 5, continue book 2's ",(0,i.kt)("inlineCode",{parentName:"li"},"async")," function, now with ",(0,i.kt)("inlineCode",{parentName:"li"},"reviews")," populated"),(0,i.kt)("li",{parentName:"ul"},"...")),(0,i.kt)("h2",{id:"n1-safe-graphql-resolvers"},"N+1-Safe GraphQL Resolvers"),(0,i.kt)("p",null,"This auto-batching will work for any ",(0,i.kt)("inlineCode",{parentName:"p"},"em.load")," calls that happening synchronously within a tick of the event loop, which means they can either be laid out simply, like in our example ",(0,i.kt)("inlineCode",{parentName:"p"},"books.map")," example, or happen across seemingly-disparate method calls."),(0,i.kt)("p",null,"For example, let's say a GraphQL client has issued a query like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n  authors(id: 1) {\n    books {\n      reviews {\n        id\n        name  \n      }  \n    }  \n  }\n}\n")),(0,i.kt)("p",null,"We might implement our ",(0,i.kt)("inlineCode",{parentName:"p"},"books.reviews")," resolver like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"const booksResolver = {\n  async reviews(bookId, args, ctx) {\n    const book = await ctx.em.load(Book, bookId);\n    return await book.reviews.load();\n  }\n}\n")),(0,i.kt)("p",null,"And, the way the GraphQL resolver pattern works, the GraphQL runtime will call the ",(0,i.kt)("inlineCode",{parentName:"p"},"booksResolver.reviews(1)"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"booksResolver.reviews(2)"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"booksResolver.reviews(3)"),", etc. method for each of the books returning from our query."),(0,i.kt)("p",null,"This looks like it could be an N+1, however because each of the ",(0,i.kt)("inlineCode",{parentName:"p"},"reviews(1)"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"reviews(2)"),', etc. calls has happened within a single tick of the event loop, the dataloader "flush" event will automatically kick-in and ask Joist to look all of the reviews as a single SQL call.'),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Granted, Joist is GraphQL agnostic, so you may use a different API layer, like REST or GRPC."),(0,i.kt)("p",{parentName:"div"},"But this example shows how dataloader's \"batch anything that happens within a single tick\" will batch many common patterns automatically/for free, in a way that is so powerful it almost seems like JavaScript's event loop was designed from day one to purposefully support this, but instead it evolved almost by accident/happenstance."))),(0,i.kt)("h2",{id:"preloading-is-still-allowed"},"Preloading Is Still Allowed"),(0,i.kt)("p",null,"Granted, while we used this ",(0,i.kt)("inlineCode",{parentName:"p"},"async")," / ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise.all"),"-heavy example for illustrating how N+1 prevention works:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'const author = await em.load(Author, "a:1");\nconst books = await author.books.load();\nawait Proimse.all(books.map(async (book) => {\n  const reviews = await book.reviews.load();\n}));\n')),(0,i.kt)("p",null,"Joist ",(0,i.kt)("em",{parentName:"p"},"also")," supports preloading, which dramatically tidies up the code:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'const author = await em.load(Author, "a:1", { books: "reviews" });\nauthor.books.get.map((book) => {\n  const reviews = book.reviews.get;\n});\n')),(0,i.kt)("p",null,"See the next ",(0,i.kt)("a",{parentName:"p",href:"/docs/goals/type-safe-relations"},"Type-Safe Relations")," page for more information about that feature, but nonetheless the important point is that, in a sufficiently complex codebase, it's ",(0,i.kt)("strong",{parentName:"p"},"extremely hard to know ahead of time")," what data the business logic will or will not need."),(0,i.kt)("p",null,"But with Joist's N+1 avoidance, the performance profile of using preload hints (i.e. in small, hand-crafted code) or not using preload hints (i.e. in complex, heavily decomposed code) is ",(0,i.kt)("strong",{parentName:"p"},"exactly the same"),"."),(0,i.kt)("h2",{id:"where-it-doesnt-work"},"Where It Doesn't Work"),(0,i.kt)("p",null,"As powerful as Joist's batching is, it only works on simple database queries like foreign key loads, i.e. ",(0,i.kt)("inlineCode",{parentName:"p"},"author.books.load()")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"book.author.load()"),", which just navigate the object graph."),(0,i.kt)("p",null,"If you are doing a complex query within a loop:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'const books = await author.books.load();\nawait Proimse.all(books.map(async (book) => {\n  await em.find(BookReview, { book, someOther: "fancyCondition" }); \n}));\n')),(0,i.kt)("p",null,"Then dataloader will correctly tell Joist to execute the ",(0,i.kt)("inlineCode",{parentName:"p"},"em.find"),' for all 10 books "as a batch", however, it becomes hard to combine each of the ',(0,i.kt)("inlineCode",{parentName:"p"},"find")," queries (each of which could have arbitrarily complex where clauses/conditions) into a single SQL statement."),(0,i.kt)("p",null,"As of now, Joist technically ",(0,i.kt)("em",{parentName:"p"},"will")," ",(0,i.kt)("inlineCode",{parentName:"p"},"UNION")," all of these ",(0,i.kt)("inlineCode",{parentName:"p"},"em.find"),"s together into a single SQL call, but the SQL query is sufficiently complex (especially if there are ~100s of them, i.e. for 100 books) that they can often break, and the feature (batching custom ",(0,i.kt)("inlineCode",{parentName:"p"},"em.find"),"s) needs to be either removed or re-worked."))}m.isMDXComponent=!0}}]);