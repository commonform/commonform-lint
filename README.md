# commonform-lint

find technical errors in [Common Forms](https://www.npmjs.com/package/commonform-validate)

```javascript
var lint = require('commonform-lint')
var assert = require('assert')
```

`lint` takes a [Common Form](https://npmjs.com/packages/commonform-validate) argument and returns an array of [Common Form Annotations](https://npmjs.com/packages/commonform-annotations).

# Cross-Reference Problems

## Broken Cross-References

```javascript
var message = 'The heading "Indemnity" is referenced, but not used.'

assert.deepStrictEqual(
  lint({ content: [{ reference: 'Indemnity' }] }),
  [
    {
      message: message,
      level: 'error',
      path: ['content', 0],
      source: 'commonform-lint',
      url: null
    }
  ],
  'returns commonform-annotation noting broken reference'
)

assert.deepStrictEqual(
  lint({
    content: [
      { reference: 'Indemnity' },
      { reference: 'Indemnity' }
    ]
  }),
  [
    {
      message: message,
      level: 'error',
      path: ['content', 0],
      source: 'commonform-lint',
      url: null
    },
    {
      message: message,
      level: 'error',
      path: ['content', 1],
      source: 'commonform-lint',
      url: null
    }
  ],
  'notes multiple broken references'
)
```

## Unmarked Cross-References

```javascript
assert.deepStrictEqual(
  lint({
    content: [
      {
        heading: 'Preamble',
        form: { content: ['This is a preamble.'] }
      },
      {
        form: { content: ['Nothing important gets said in Preamble.'] }
      }
    ]
  }),
  [
    {
      message: (
        'The heading "Preamble" is used, ' +
        'but not marked as a reference.'
      ),
      level: 'info',
      path: ['content', 1, 'form', 'content', 0],
      source: 'commonform-lint',
      url: null
    }
  ],
  'notes unmarked reference'
)
```
# Defined-Term Problems

## Conflicting Definitions

```javascript
assert.deepStrictEqual(
  lint({
    content: [
      { definition: 'Agreement' }, ' ',
      { definition: 'Agreement' }, ' ',
      { definition: 'Consideration' }, ' ',
      { use: 'Agreement' }, ' ',
      { use: 'Agreement' }, ' ',
      { use: 'Consideration' }, ' ',
      { use: 'Consideration' }
    ]
  }),
  [
    {
      message: 'The term "Agreement" is defined more than once.',
      level: 'error',
      path: ['content', 0],
      source: 'commonform-lint',
      url: null
    },
    {
      message: 'The term "Agreement" is defined more than once.',
      level: 'error',
      path: ['content', 2],
      source: 'commonform-lint',
      url: null
    }
  ],
  'notes multiple definitions of the same term'
)
```

## Undefined Terms

```javascript
assert.deepStrictEqual(
  lint({ content: [{ use: 'Agreement' }] }),
  [
    {
      message: 'The term "Agreement" is used, but not defined.',
      level: 'error',
      path: ['content', 0],
      source: 'commonform-lint',
      url: null
    }
  ],
  'reports the use of an undefined term'
)

assert.deepStrictEqual(
  lint({ content: [{ use: 'Agreement' }, { use: 'Agreement' }] }),
  [
    {
      message: 'The term "Agreement" is used, but not defined.',
      level: 'error',
      path: ['content', 0],
      source: 'commonform-lint',
      url: null
    },
    {
      message: 'The term "Agreement" is used, but not defined.',
      level: 'error',
      path: ['content', 1],
      source: 'commonform-lint',
      url: null
    }
  ],
  'notes multiple uses of an undefined term'
)
```

## Extra Definitions

```javascript
assert.deepStrictEqual(
  lint({ content: [{ definition: 'Agreement' }] }),
  [
    {
      message: 'The term "Agreement" is defined, but not used.',
      level: 'warn',
      path: ['content', 0],
      source: 'commonform-lint',
      url: null
    }
  ],
  'notes use of an unused definition'
)
```

## Terms Used Only Once

```javascript
assert.deepStrictEqual(
  lint({
    content: [
      { use: 'Agreement' }, ' ',
      { definition: 'Agreement' }
    ]
  }),
  [
    {
      message: 'The defined term "Agreement" is used only once.',
      level: 'info',
      path: ['content', 0],
      source: 'commonform-lint',
      url: null
    }
  ],
  'notes single use of defined term'
)
```

## Unmarked Defined-Term Uses

```javascript
assert.deepStrictEqual(
  lint({
    content: [
      {
        form: {
          content: [
            'Defines the term ', { definition: 'Agreement' }, '.'
          ]
        }
      },
      {
        form: {
          content: [
            'Uses the term ', { use: 'Agreement' }, '.'
          ]
        }
      },
      {
        form: {
          content: [
            'Uses the term ', { use: 'Agreement' }, ' again.'
          ]
        }
      },
      {
        form: {
          content: [
            'Uses the term Agreement without marking.'
          ]
        }
      }
    ]
  }),
  [
    {
      message: 'The term "Agreement" is used, but not marked as a defined term.',
      level: 'info',
      path: ['content', 3, 'form', 'content', 0],
      source: 'commonform-lint',
      url: null
    }
  ],
  'notes unmarked use of defined term'
)
```

```javascript
assert.deepStrictEqual(
  lint({
    content: [
      {
        form: {
          content: [
            'Defines the term ', { definition: 'Apple' }, '.'
          ]
        }
      },
      {
        form: {
          content: [
            'Uses the term ', { use: 'Apple' }, '.'
          ]
        }
      },
      {
        form: {
          content: [
            'Uses the term ', { use: 'Apple' }, ' again.'
          ]
        }
      },
      {
        form: {
          content: [
            'Uses Applesauce, which is not a defined term.'
          ]
        }
      }
    ]
  }),
  [],
  'does not note unmarked use of defined term within a longer word'
)
```

# Structurally Sound Forms

```javascript
assert.deepStrictEqual(
  lint({
    content: [
      { definition: 'Agreement' }, ' ',
      { definition: 'Consideration' }, ' ',
      { use: 'Agreement' }, ' ',
      { use: 'Agreement' }, ' ',
      { use: 'Consideration' }, ' ',
      { use: 'Consideration' }
    ]
  }),
  [/* no annotations */]
)

assert.deepStrictEqual(
  lint({
    content: [
      {
        heading: 'Heading',
        form: { content: ['test'] }
      },
      { reference: 'Heading' }, ' ',
      { definition: 'Term' }, ' ',
      { use: 'Term' }, ' ',
      { use: 'Term' }
    ]
  }),
  [/* no annotations */]
)
```
