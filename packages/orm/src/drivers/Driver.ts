import { Knex } from "knex";
import { Entity } from "../Entity";
import { FilterAndSettings } from "../EntityFilter";
import { EntityManager, MaybeAbstractEntityConstructor } from "../EntityManager";
import { ParsedFindQuery } from "../QueryParser";
import { ManyToManyCollection, ManyToManyLargeCollection } from "../relations";
import { JoinRow } from "../relations/ManyToManyCollection";
import { JoinRowTodo, Todo } from "../Todo";

/** Isolates all SQL calls that joist needs to make to fetch/save data. */
export interface Driver {
  /** Just finds presence in a m2m w/o loading the full relation. */
  findManyToMany<T extends Entity, U extends Entity>(
    em: EntityManager,
    collection: ManyToManyCollection<T, U> | ManyToManyLargeCollection<T, U>,
    // encoded tuples of `foo_id=2,bar_id=3`, `bar_id=4,foo_id=5`
    keys: readonly string[],
  ): Promise<JoinRow[]>;

  find<T extends Entity>(
    em: EntityManager,
    type: MaybeAbstractEntityConstructor<T>,
    queries: readonly FilterAndSettings<T>[],
  ): Promise<unknown[][]>;

  /** Executes a low-level `ParsedFindQuery` against the database and returns the rows. */
  executeFind(
    em: EntityManager,
    parsed: ParsedFindQuery,
    settings: { limit?: number; offset?: number },
  ): Promise<any[]>;

  transaction<T>(
    em: EntityManager,
    fn: (txn: Knex.Transaction) => Promise<T>,
    isolationLevel?: "serializable",
  ): Promise<T>;

  assignNewIds(em: EntityManager, todos: Record<string, Todo>): Promise<void>;

  flushEntities(em: EntityManager, todos: Record<string, Todo>): Promise<void>;

  flushJoinTables(em: EntityManager, joinRows: Record<string, JoinRowTodo>): Promise<void>;
}
