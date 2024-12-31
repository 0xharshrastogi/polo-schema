# Polo Schema Builder

`polo` is a schema builder for defining the structure of a Polo document.

## Installation

To install the package, use npm or yarn:

```bash
npm install polo-schema
# or
yarn add polo-schema
```

## Usage

Here is an example of how to use the `polo` schema builder:

```typescript
import { polo } from "polo-schema";

const schema = polo.struct({
    name: polo.string,
    age: polo.integer,
    alias: polo.arrayOf(polo.string),
    friends: polo.map({
        keys: polo.string,
        values: polo.string
    }),
    address: polo.struct({
        street: polo.string,
        city: polo.string,
        state: polo.string,
    })
});
```

## API

### Primitive Types

- `polo.string`: Represents a string type.
- `polo.integer`: Represents an integer type.
- `polo.boolean`: Represents a boolean type.
- `polo.null`: Represents a null type.
- `polo.bytes`: Represents a bytes type.
- `polo.float`: Represents a float type.
- `polo.raw`: Represents a raw type.
- `polo.document`: Represents a document type.

### Struct

To define a struct schema:

```typescript
const structSchema = polo.struct({
    fieldName: polo.string,
    anotherField: polo.integer,
});
```

### Array

To define an array schema:

```typescript
const arraySchema = polo.arrayOf(polo.string);
```

### Map

To define a map schema:

```typescript
const mapSchema = polo.map({
    keys: polo.string,
    values: polo.integer,
});
```

## License

This project is licensed under the MIT License.
