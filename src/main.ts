#!/usr/bin/env node
import { Peer } from './Peer'
import { print } from './tools'

try {
  new Peer().run()
} catch (error) {
  print(`Boot`, '', 0, 'Error')
}

