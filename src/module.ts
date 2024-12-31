/**
 * @module polo-schema
 *
 * This module provides a schema builder for defining the structure of a Polo document.
 *
 * @example
 * ```typescript
 * import { polo } from "polo-schema";
 *
 * const schema = polo.struct({
 *  name: polo.string,
 *  age: polo.integer,
 *  address: polo.struct({
 *   street: polo.string,
 *   city: polo.string,
 *   state: polo.string,
 *  })
 * });
 */

export { polo, type PoloSchema } from "./polo-schema.js";
