```javascript
var lint = require('commonform-lint')
var assert = require('assert')
```

`lint` takes a [Common Form](https://npmjs.com/packages/commonform-validate) argument and returns an array of [Common Form Annotations](https://npmjs.com/packages/commonform-annotations).

# Broken Cross-References

```javascript
var message = 'The heading "Indemnity" is referenced, but not used.'

assert.deepEqual(
  lint({content: [{reference: 'Indemnity'}]}),
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

assert.deepEqual(
  lint({
    content: [
      {reference: 'Indemnity'},
      {reference: 'Indemnity'}
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

# Defined Terms

## Conflicting Definitions

```javascript
assert.deepEqual(
  lint({
    content: [
      {definition: 'Agreement'}, ' ',
      {definition: 'Agreement'}, ' ',
      {definition: 'Consideration'}, ' ',
      {use: 'Agreement'}, ' ',
      {use: 'Agreement'}, ' ',
      {use: 'Consideration'}, ' ',
      {use: 'Consideration'}
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
assert.deepEqual(
  lint({content: [{use: 'Agreement'}]}),
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

assert.deepEqual(
  lint({content: [{use: 'Agreement'}, {use: 'Agreement'}]}),
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
assert.deepEqual(
  lint({content: [{definition: 'Agreement'}]}),
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
assert.deepEqual(
  lint({
    content: [
      {use: 'Agreement'}, ' ',
      {definition: 'Agreement'}
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

# Structurally Sound Forms

```javascript
assert.deepEqual(
  lint({
    content: [
      {definition: 'Agreement'}, ' ',
      {definition: 'Consideration'}, ' ',
      {use: 'Agreement'}, ' ',
      {use: 'Agreement'}, ' ',
      {use: 'Consideration'}, ' ',
      {use: 'Consideration'}
    ]
  }),
  []
)

assert.deepEqual(
  lint({
    content: [
      {
        heading: 'Heading',
        form: {content: ['test']}
      },
      {reference: 'Heading'}, ' ',
      {definition: 'Term'}, ' ',
      {use: 'Term'}, ' ',
      {use: 'Term'}
    ]
  }),
  []
)
```
