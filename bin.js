#!/usr/bin/env node
import lint from 'commonform-lint'

const chunks = []
process.stdin
  .on('data', function (chunk) {
    chunks.push(chunk)
  })
  .once('error', function (error) {
    console.error(error)
    process.exit(1)
  })
  .once('end', function () {
    const input = Buffer.concat(chunks).toString()
    let form
    try {
      form = JSON.parse(input)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
    console.log(JSON.stringify(lint(form)))
  })
