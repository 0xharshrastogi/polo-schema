type PrimitivePoloTypes =
  | "string"
  | "integer"
  | "boolean"
  | "null"
  | "bytes"
  | "float"
  | "raw"
  | "document";

interface PrimitiveSchema<T extends PrimitivePoloTypes> {
  kind: T;
}

interface ArraySchema {
  kind: "array";
  fields: {
    values: PoloSchema;
  };
}

interface MapSchema {
  kind: "map";
  fields: {
    keys: PrimitiveSchema<
      Exclude<
        PrimitivePoloTypes,
        "null" | "raw" | "document" | "bytes" | "null"
      >
    >;
    values: PoloSchema;
  };
}

interface StructSchema {
  kind: "struct";
  fields: Record<string | number, PoloSchema>;
}

export type PoloSchema =
  | PrimitiveSchema<PrimitivePoloTypes>
  | ArraySchema
  | MapSchema
  | StructSchema;

interface PoloMapBuilder {
  keys: MapSchema["fields"]["keys"];
  values: MapSchema["fields"]["values"];
}

class PoloSchemaBuilder {
  primitive<T extends PrimitivePoloTypes>(kind: T): PrimitiveSchema<T> {
    return { kind };
  }

  get boolean(): PrimitiveSchema<"boolean"> {
    return this.primitive("boolean");
  }

  get integer(): PrimitiveSchema<"integer"> {
    return this.primitive("integer");
  }

  get string(): PrimitiveSchema<"string"> {
    return this.primitive("string");
  }

  get null(): PrimitiveSchema<"null"> {
    return this.primitive("null");
  }

  get bytes(): PrimitiveSchema<"bytes"> {
    return this.primitive("bytes");
  }

  get float(): PrimitiveSchema<"float"> {
    return this.primitive("float");
  }

  get raw(): PrimitiveSchema<"raw"> {
    return this.primitive("raw");
  }

  get document(): PrimitiveSchema<"document"> {
    return this.primitive("document");
  }

  struct(fields: StructSchema["fields"]): StructSchema {
    return { kind: "struct", fields };
  }

  arrayOf(schema: PoloSchema): ArraySchema {
    return { kind: "array", fields: { values: schema } };
  }

  map(builder: PoloMapBuilder): MapSchema {
    return {
      kind: "map",
      fields: { keys: builder.keys, values: builder.values },
    };
  }
}

/**
 * `polo` is a schema builder for defining the structure of a Polo document.
 *
 * @example
 * ```typescript
 * import { polo } from "polo-schema";
 *
 * const schema = polo.struct({
 *  name: polo.string,
 *  age: polo.integer,
 *  alias: polo.arrayOf(polo.string),
 *  friends: polo.map({
 *   keys: polo.string,
 *   values: polo.string
 *  }),
 *  address: polo.struct({
 *   street: polo.string,
 *   city: polo.string,
 *   state: polo.string,
 *  })
 * });
 */
export const polo = new PoloSchemaBuilder();
