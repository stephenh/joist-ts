import { camelCase } from "change-case";
import { CodeGenFile, Config, EntityDbMetadata } from "joist-codegen";
import { code, imp } from "ts-poet";

const context = imp("Context@src/context");
const saveEntities = imp("saveEntities@src/resolvers/mutations/utils");
const mutationResolvers = imp("MutationResolvers@src/generated/graphql-types");
const run = imp("run@src/resolvers/testUtils");

/**
 * Generates a save resolver.
 *
 * This basically preempts the Joist-agnostic resolvers generated by [1] b/c `joist-codegen`
 * will run first and put these Joist-aware resolvers in place first.
 *
 * Then when [1] runs, it will only output resolver scaffolding for non-entity resolvers.
 *
 * [1]: https://github.com/homebound-team/graphql-typescript-resolver-scaffolding
 */
export function generateSaveResolvers(config: Config, entities: EntityDbMetadata[]): CodeGenFile[] {
  const resolvers = entities.map((e) => {
    const { name } = e;
    const camelName = camelCase(name);
    const type = imp(`${name}@src/entities`);
    const contents = code`
      export const save${name}: Pick<${mutationResolvers}, "save${name}"> = {
        async save${name}(root, args, ctx) {
          const [id] = await ${saveEntities}(ctx, ${type}, [args.input]);
          return { ${camelName}: id };
        },
      };
    `;
    return { name: `resolvers/mutations/${camelName}/save${name}Resolver.ts`, overwrite: false, contents };
  });

  const testFiles = entities.map((e) => {
    const { name } = e;
    const camelName = camelCase(name);
    const type = imp(`${e.name}@src/entities`);
    const inputType = imp(`Save${name}Input@src/generated/graphql-types`);
    const resolverConst = imp(`save${name}@src/resolvers/mutations/${camelName}/save${name}Resolver`);
    const tagName = config.entities[name].tag || "entity";

    const contents = code`
      import "src/setupDbTests";

      describe("save${name}", () => {
        it.withCtx("can create", async (ctx) => {
          const { em } = ctx;
          const result = await runSave${name}(ctx, () => ({}));
          const ${tagName} = await em.load(${type}, result.${camelName});
        });
      });

      async function runSave${name}(ctx: ${context}, inputFn: () => ${inputType}) {
        return await ${run}(ctx, async (ctx) => {
          return ${resolverConst}.save${name}({}, { input: inputFn() }, ctx, undefined!);
        });
      }
    `;
    return { name: `resolvers/mutations/${camelName}/save${name}Resolver.test.ts`, overwrite: false, contents };
  });

  return [...resolvers, ...testFiles];
}
