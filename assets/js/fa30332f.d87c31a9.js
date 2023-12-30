"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[141],{5789:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>d});var t=o(4246),s=o(1670);const i={title:"Lifecycle Hooks",sidebar_position:4},a=void 0,r={id:"modeling/lifecycle-hooks",title:"Lifecycle Hooks",description:'Joist supports hooks that can run business logic at varies stages in an entity\'s lifecycle, for example to implement business logic like "when an Author entity is updated, always do x/y/z".',source:"@site/docs/modeling/lifecycle-hooks.md",sourceDirName:"modeling",slug:"/modeling/lifecycle-hooks",permalink:"/docs/modeling/lifecycle-hooks",draft:!1,unlisted:!1,editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/modeling/lifecycle-hooks.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Lifecycle Hooks",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Validation Rules",permalink:"/docs/modeling/validation-rules"},next:{title:"Enums",permalink:"/docs/modeling/enum-tables"}},l={},d=[{value:"Setup",id:"setup",level:3},{value:"Available Hooks",id:"available-hooks",level:3},{value:"Allowed Behavior",id:"allowed-behavior",level:3},{value:"Wire Calls",id:"wire-calls",level:4},{value:"Hooks vs. Validation Rules",id:"hooks-vs-validation-rules",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["Joist supports hooks that can run business logic at varies stages in an entity's lifecycle, for example to implement business logic like \"when an ",(0,t.jsx)(n.code,{children:"Author"}),' entity is updated, always do x/y/z".']}),"\n",(0,t.jsx)(n.h3,{id:"setup",children:"Setup"}),"\n",(0,t.jsxs)(n.p,{children:["All hooks are set up by the entity's ",(0,t.jsx)(n.code,{children:"config"})," API:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'import { authorConfig as config } from "./entities";\n\nexport class Author extends AuthorCodegen {}\n\n// Create a draft book for all authors\nconfig.beforeCreate("books", (a, { em }) => {\n  if (a.books.get.length === 0) {\n    em.create(Book, { author: a, status: BookStatus.Draft });\n  }\n})\n'})}),"\n",(0,t.jsxs)(n.admonition,{type:"info",children:[(0,t.jsx)(n.p,{children:"At first, it seems odd that Joist's hooks are not methods on the class itself, as this would be a more traditional place for ORM-driven business logic."}),(0,t.jsxs)(n.p,{children:["However, being added via the ",(0,t.jsx)(n.code,{children:"config"})," API has a few benefits:"]}),(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["The hook methods all take load hints, i.e. ",(0,t.jsx)(n.code,{children:'"books"'})," in the above ",(0,t.jsx)(n.code,{children:"beforeCreate"})," example, which makes the ",(0,t.jsx)(n.code,{children:"a"})," param typed as ",(0,t.jsx)(n.code,{children:'Loaded<Author, "books">'})," instead of ",(0,t.jsx)(n.code,{children:"Author"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["This allows the hook's business logic to be written with as few ",(0,t.jsx)(n.code,{children:"await"}),"s as possible, such that ideally the lambda itself can be synchronous (although you can make it ",(0,t.jsx)(n.code,{children:"async"})," if necessary)."]}),"\n",(0,t.jsxs)(n.p,{children:["If ",(0,t.jsx)(n.code,{children:"beforeCreate"})," was written as a method, then an additional local variable (similar to ",(0,t.jsx)(n.code,{children:"a"}),") would need to be created, as ",(0,t.jsx)(n.code,{children:"this"})," is not aware of the hook's load hint."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["It's easier to keep business logic small & decoupled, because if you have multiple operations to perform on ",(0,t.jsx)(n.code,{children:"beforeCreate"}),", you can have two entirely separate hooks, each with separate load hints and their own lambdas."]}),"\n",(0,t.jsxs)(n.p,{children:["If ",(0,t.jsx)(n.code,{children:"beforeCreate"})," was a single ",(0,t.jsx)(n.code,{children:"Author.beforeCreate"})," method, then its implementation would just get bigger and more complex as it handles additional business requirements."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"It's trivial to reuse hook logic across entities without relying on multiple inheritance."}),"\n",(0,t.jsxs)(n.p,{children:["For example, we could have a method like ",(0,t.jsx)(n.code,{children:"addSoftDeleteHooks(config)"})," that, for any given entity's config, adds some shared business logic to the entity."]}),"\n"]}),"\n"]})]}),"\n",(0,t.jsx)(n.h3,{id:"available-hooks",children:"Available Hooks"}),"\n",(0,t.jsx)(n.p,{children:"Joist supports the following hooks, listed in the order that they are fired:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"beforeCreate"})," fired when an entity is created / ",(0,t.jsx)(n.code,{children:"INSERT"}),"-d for the first time"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"beforeUpdate"})," fired when an entity is updated / ",(0,t.jsx)(n.code,{children:"UPDATE"}),"-d"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"beforeFlush"})," fired when an entity is either created or updated (but not deleted)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"beforeDelete"})," fired when an entity is deleted / ",(0,t.jsx)(n.code,{children:"DELETE"}),"-d"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"afterValidation"})," fired after an entity is created or updated, and all validation rules have passed"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"beforeCommit"})," fired when an entity is created, or updated, or deleted and the transaction is about to commit, can abort the transaction by throwing an error"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"afterCommit"})," fired when an entity is created, or updated, or deleted and the transaction has committed"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"allowed-behavior",children:"Allowed Behavior"}),"\n",(0,t.jsx)(n.p,{children:"Hooks are allowed to create/update/delete other entities."}),"\n",(0,t.jsxs)(n.p,{children:["For example, a new ",(0,t.jsx)(n.code,{children:"Author"})," can ",(0,t.jsx)(n.code,{children:"em.create"})," a new ",(0,t.jsx)(n.code,{children:"Book"})," in an ",(0,t.jsx)(n.code,{children:"Author.beforeCreate"})," hook.  Or a deleted ",(0,t.jsx)(n.code,{children:"Author"})," could ",(0,t.jsx)(n.code,{children:"em.delete"})," its ",(0,t.jsx)(n.code,{children:"Book"}),"s in an ",(0,t.jsx)(n.code,{children:"Author.beforeDelete"})," hook."]}),"\n",(0,t.jsx)(n.p,{children:"Any entities that are created/updated/deleted by a hook will themselves have their appropriate hooks ran, although only if those entity's hooks have not already been run (to avoid cycles of a book-touches-author/author-touches-book infinitely recursing)."}),"\n",(0,t.jsx)(n.h4,{id:"wire-calls",children:"Wire Calls"}),"\n",(0,t.jsx)(n.p,{children:"Making RPC calls to 3rd party systems can be problematic, and so we recommend:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Do not make RPC calls from any non-",(0,t.jsx)(n.code,{children:"afterCommit"})," hook."]}),"\n",(0,t.jsxs)(n.p,{children:["It is very likely that hooks will run but then your ",(0,t.jsx)(n.code,{children:"em.flush"})," later fails due to unrelated validation rules, at which point your transaction/changes won't be committed and you've likely made an unnecessary/incorrect wire call."]}),"\n",(0,t.jsxs)(n.p,{children:["(Any non-",(0,t.jsx)(n.code,{children:"afterCommit"})," hook also will not have ids assigned yet for newly-created entities, and often these ids are necessary for communicating with the 3rd party system.)"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Only pragmatically make wire calls in the ",(0,t.jsx)(n.code,{children:"afterCommit"})," hook."]}),"\n",(0,t.jsxs)(n.p,{children:["While ",(0,t.jsx)(n.code,{children:"afterCommit"}),' is the "safest" place to make a wire call, because it\'s only called after the transaction has been committed, there is still a chance that either a) ',(0,t.jsx)(n.code,{children:"em.flush"})," commits but the machine crashes before running ",(0,t.jsx)(n.code,{children:"afterCommit"}),", or b) your ",(0,t.jsx)(n.code,{children:"afterCommit"})," fails but now will not retry."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Because of these wrinkles, our general recommendation is to use a ",(0,t.jsx)(n.a,{href:"https://brandur.org/job-drain",children:"job drain"}),' pattern, where hooks only create "intentions" of work to be done (background jobs), this intention is atomically saved to the database in the same transaction as your business logic (for an example a ',(0,t.jsx)(n.code,{children:"jobs"})," table), and then you have a separate background job runner that handles invoking (and retrying if necessary) the intended action of calling/syncing with the 3rd party system."]}),"\n",(0,t.jsx)(n.h3,{id:"hooks-vs-validation-rules",children:"Hooks vs. Validation Rules"}),"\n",(0,t.jsx)(n.p,{children:"Hooks run before validation rules, and are allowed to mutate entities that may currently be invalid."}),"\n",(0,t.jsx)(n.p,{children:"Valiation rules run after hooks, and are not allowed to mutate entities: they must be side effect free."}),"\n",(0,t.jsxs)(n.p,{children:['For example, you could have a validation rule of "Author must have at least one book", and a hook that "creates a default book for new authors", and when you do ',(0,t.jsx)(n.code,{children:"em.create(Author)"})," without any books, then first the hook would run and create a single book, such that when the validation rule runs, it passes."]}),"\n",(0,t.jsx)(n.p,{children:"Similarly, hooks can set required fields before the missing values trigger validation rules."}),"\n",(0,t.jsxs)(n.p,{children:["Validation rules are only ran once per ",(0,t.jsx)(n.code,{children:"em.flush"}),", and only after all hooks, and all transitively-ran hooks, have finished."]}),"\n",(0,t.jsxs)(n.admonition,{type:"info",children:[(0,t.jsx)(n.p,{children:'The term "transitively-ran" hooks describes the scenario of:'}),(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["An endpoint/user code creates 5 new ",(0,t.jsx)(n.code,{children:"Author"})," entities and calls ",(0,t.jsx)(n.code,{children:"em.flush"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"em.flush"}),' "runs hooks" (',(0,t.jsx)(n.code,{children:"beforeCreate"})," and ",(0,t.jsx)(n.code,{children:"beforeFlush"}),") for all 5 new ",(0,t.jsx)(n.code,{children:"Author"}),"s entities"]}),"\n",(0,t.jsxs)(n.li,{children:["Each ",(0,t.jsx)(n.code,{children:"Author"}),"'s ",(0,t.jsx)(n.code,{children:"beforeCreate"})," hook creates a new draft ",(0,t.jsx)(n.code,{children:"Book"})," entity"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"em.flush"})," notices the newly-created ",(0,t.jsx)(n.code,{children:"Book"}),' entities, and so "runs hooks again", but only against the 5 ',(0,t.jsx)(n.code,{children:"Book"})," entities"]}),"\n"]}),(0,t.jsx)(n.p,{children:'So, this process is transitive as mutating the initial set of entities may cause, via custom logic in hooks, a subsequent set of entities to be mutated, which themselves might cause an additional set of entities to be mutated, until the process "settles".'}),(0,t.jsxs)(n.p,{children:["Note that because ",(0,t.jsx)(n.code,{children:"em.flush"})," marks which entities have had hooks ran, and will not invoke hooks twice on a given entity, this process is guaranteed to finish, i.e. there is not a risk of infinite loops between hooks."]})]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1670:(e,n,o)=>{o.d(n,{Z:()=>r,a:()=>a});var t=o(7378);const s={},i=t.createContext(s);function a(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);