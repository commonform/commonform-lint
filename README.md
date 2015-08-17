```javascript
var lint = require('commonform-lint')
var assert = require('assert')

var message = 'The heading "Indemnity" is referenced, but not used.'

assert.deepEqual(
  lint({ content: [ { reference: 'Indemnity' } ] }),
  [ { message: message,
      path: [ 'content', 0 ],
      source: 'commonform-lint',
      url: null } ],
  'returns commonform-annotation noting broken reference')

assert.deepEqual(
  lint({
    content: [
      { reference: 'Indemnity' },
      { reference: 'Indemnity' } ] }),
  [ { message: message,
      path: [ 'content', 0 ],
      source: 'commonform-lint',
      url: null },
    { message: message,
      path: [ 'content', 1 ],
      source: 'commonform-lint',
      url: null } ],
  'notes multiple broken references')

assert.deepEqual(
  lint({
    content: [
      { definition: 'Agreement' },
      { definition: 'Consideration' },
      { use: 'Agreement' },
      { use: 'Consideration' } ] }),
  [ ],
  'ignores terms defined once')

assert.deepEqual(
  lint({
    content: [
      { definition: 'Agreement' },
      { definition: 'Agreement' },
      { definition: 'Consideration' },
      { use: 'Agreement' },
      { use: 'Consideration' } ] }),
  [ { message: 'The term "Agreement" is defined more than once.',
      path: [ 'content', 0 ],
      source: 'commonform-lint',
      url: null },
    { message: 'The term "Agreement" is defined more than once.',
      path: [ 'content', 1 ],
      source: 'commonform-lint',
      url: null } ],
  'notes multiple definitions of the same term')

assert.deepEqual(
  lint({ content: [ { use: 'Agreement' } ] }),
  [ { message: 'The term "Agreement" is used, but not defined.',
      path: [ 'content', 0 ],
      source: 'commonform-lint',
      url: null } ],
  'reports the use of an undefined term')

assert.deepEqual(
  lint({ content: [ { use: 'Agreement' }, { use: 'Agreement' } ] }),
  [ { message: 'The term "Agreement" is used, but not defined.',
      path: [ 'content', 0 ],
      source: 'commonform-lint',
      url: null },
    { message: 'The term "Agreement" is used, but not defined.',
      path: [ 'content', 1 ],
      source: 'commonform-lint',
      url: null } ],
  'notes multiple uses of an undefined term')

assert.deepEqual(
  lint({ content: [ { definition: 'Agreement' } ] }),
  [ { message: 'The term "Agreement" is defined, but not used.',
      path: [ 'content', 0 ],
      source: 'commonform-lint',
      url: null } ],
  'notes use of an unused definition')

assert.equal(
  lint({
    content: [
      { heading: 'Heading',
        form: { content: [ 'test' ] } },
      { reference: 'Heading' },
      { definition: 'Term' },
      { use: 'Term' } ] })
    .length,
  0,
  'returns no annotations for a sound form')
```
