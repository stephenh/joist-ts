import { imp } from "ts-poet";

export const ConfigApi = imp("ConfigApi@joist-orm");
export const FieldStatus = imp("FieldStatus@joist-orm");
export const Entity = imp("Entity@joist-orm");
export const BaseEntity = imp("BaseEntity@joist-orm");
export const Flavor = imp("Flavor@joist-orm");
export const Reference = imp("Reference@joist-orm");
export const Collection = imp("Collection@joist-orm");
export const LargeCollection = imp("LargeCollection@joist-orm");
export const OneToManyCollection = imp("OneToManyCollection@joist-orm");
export const EntityOrmField = imp("EntityOrmField@joist-orm");
export const EntityManager = imp("EntityManager@src/entities");
export const JoistEntityManager = imp("EntityManager@joist-orm");
export const EntityMetadata = imp("EntityMetadata@joist-orm");
export const EnumMetadata = imp("EnumMetadata@joist-orm");
export const Lens = imp("Lens@joist-orm");
export const KeySerde = imp("KeySerde@joist-orm");
export const ManyToOneReference = imp("ManyToOneReference@joist-orm");
export const PolymorphicReference = imp("PolymorphicReference@joist-orm");
export const OneToOneReference = imp("OneToOneReference@joist-orm");
export const ManyToManyCollection = imp("ManyToManyCollection@joist-orm");
export const EnumFieldSerde = imp("EnumFieldSerde@joist-orm");
export const EnumArrayFieldSerde = imp("EnumArrayFieldSerde@joist-orm");
export const PolymorphicKeySerde = imp("PolymorphicKeySerde@joist-orm");
export const PrimitiveSerde = imp("PrimitiveSerde@joist-orm");
export const BigIntSerde = imp("BigIntSerde@joist-orm");
export const JsonSerde = imp("JsonSerde@joist-orm");
export const SuperstructSerde = imp("SuperstructSerde@joist-orm");
export const TaggedId = imp("TaggedId@joist-orm");
export const ZodSerde = imp("ZodSerde@joist-orm");
export const CustomSerdeAdapter = imp("CustomSerdeAdapter@joist-orm");
export const DecimalToNumberSerde = imp("DecimalToNumberSerde@joist-orm");
export const fail = imp("fail@joist-orm");
export const failNoIdYet = imp("failNoIdYet@joist-orm");
export const setOpts = imp("setOpts@joist-orm");
export const setField = imp("setField@joist-orm");
export const OrderBy = imp("OrderBy@joist-orm");
export const OptsOf = imp("OptsOf@joist-orm");
export const FieldsOf = imp("FieldsOf@joist-orm");
export const IdOf = imp("IdOf@joist-orm");
export const PartialOrNull = imp("PartialOrNull@joist-orm");
export const BooleanFilter = imp("BooleanFilter@joist-orm");
export const ValueFilter = imp("ValueFilter@joist-orm");
export const EntityFilter = imp("EntityFilter@joist-orm");
export const BooleanGraphQLFilter = imp("BooleanGraphQLFilter@joist-orm");
export const EntityGraphQLFilter = imp("EntityGraphQLFilter@joist-orm");
export const EnumGraphQLFilter = imp("EnumGraphQLFilter@joist-orm");
export const ValueGraphQLFilter = imp("ValueGraphQLFilter@joist-orm");
export const FilterOf = imp("FilterOf@joist-orm");
export const GraphQLFilterOf = imp("GraphQLFilterOf@joist-orm");
export const configureMetadata = imp("configureMetadata@joist-orm");
export const newRequiredRule = imp("newRequiredRule@joist-orm");
export const cleanStringValue = imp("cleanStringValue@joist-orm");
export const Changes = imp("Changes@joist-orm");
export const newChangesProxy = imp("newChangesProxy@joist-orm");
export const LoadHint = imp("LoadHint@joist-orm");
export const Loaded = imp("Loaded@joist-orm");
export const isLoaded = imp("isLoaded@joist-orm");
export const isEntity = imp("isEntity@joist-orm");
export const getEm = imp("getEm@joist-orm");
export const loadLens = imp("loadLens@joist-orm");
export const hasOneThrough = imp("hasOneThrough@joist-orm");
export const hasMany = imp("hasMany@joist-orm");
export const hasLargeMany = imp("hasLargeMany@joist-orm");
export const hasOne = imp("hasOne@joist-orm");
export const hasOnePolymorphic = imp("hasOnePolymorphic@joist-orm");
export const hasOneToOne = imp("hasOneToOne@joist-orm");
export const hasManyToMany = imp("hasManyToMany@joist-orm");
export const hasLargeManyToMany = imp("hasLargeManyToMany@joist-orm");
export const newTestInstance = imp("newTestInstance@joist-orm");
export const New = imp("New@joist-orm");
export const DeepNew = imp("DeepNew@joist-orm");
export const FactoryOpts = imp("FactoryOpts@joist-orm");
export const SSAssert = imp("assert@superstruct");
export const Zod = imp("z@zod");
export const EntityConstructor = imp("EntityConstructor@joist-orm");
export const MaybeAbstractEntityConstructor = imp("MaybeAbstractEntityConstructor@joist-orm");
export const deTagId = imp("deTagId@joist-orm");
export const toIdOf = imp("toIdOf@joist-orm");
export const PersistedAsyncProperty = imp("PersistedAsyncProperty@joist-orm");
export const PersistedAsyncReference = imp("PersistedAsyncReference@joist-orm");
