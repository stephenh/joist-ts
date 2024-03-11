import inquirer from "inquirer";
import semver from "semver";
import { maybeAdjustForLocalDevelopment } from "../adjustVersion";
import { Config } from "../config";
import { Codemod } from "./Codemod";
import { v1_143_0_rename_derived_async_property } from "./v1_143_0_rename_derived_async_property";

export async function maybeRunTransforms(config: Config): Promise<void> {
  const confVersion = config.version;
  const thisVersion = getThisVersion();
  if (semver.eq(confVersion, thisVersion)) {
    return;
  }

  const mods = findApplyableCodemods(confVersion);
  if (mods.length === 0) {
    // Nothing to do, but bump the version anyway
    config.version = thisVersion;
    return;
  }

  console.log(
    `Your project is on Joist ${confVersion} and there are ${mods.length} codemods to help upgrade to ${thisVersion}.`,
  );

  const run = await inquirer.prompt({
    name: "run",
    type: "confirm",
    message: `Would you like to run them?`,
  });

  // They opted out
  if (!run) {
    config.version = thisVersion;
    return;
  }

  // Otherwise run them
  for await (const mod of mods) {
    const run = await inquirer.prompt({
      name: "run",
      type: "confirm",
      message: `Do you want to run ${mod.description}?`,
    });
    if (!run) continue;
    await mod.run(config);
  }

  console.log(`\n\n\nYou've been upgraded to ${thisVersion}!`);

  // Now that all codemods they wanted to run have passed, bump the version
  config.version = thisVersion;
}

export function getThisVersion(): string {
  // Assume we're at `./node_modules/joist-codegen/build/index.js`, so `../../package.json`
  // will be our own `joist-codegen/package.json` with the version the user has installed.
  return maybeAdjustForLocalDevelopment(require("../../package.json").version);
}

function findApplyableCodemods(prevVersion: string): Codemod[] {
  return [v1_143_0_rename_derived_async_property].filter((t) => semver.lt(prevVersion, t.version));
}
