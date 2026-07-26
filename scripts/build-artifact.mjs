/*
 * Turns the single-file build into a page fragment that can be published as a
 * hosted Artifact: same markup, minus the document wrapper the host supplies.
 * Run after `vite build --mode artifact`.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = readFileSync(resolve(root, 'dist-single/index.html'), 'utf8')

const head = source.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? ''
const body = source.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? ''

// Keep the styles and scripts; drop charset and viewport, which the host sets.
const styles = head
  .replace(/<meta[^>]*>/g, '')
  .replace(/<link[^>]*>/g, '')
  .replace(/<title>[\s\S]*?<\/title>/g, '')
  .trim()

const page = `<title>Il Salotto</title>\n${styles}\n${body.trim()}\n`

mkdirSync(resolve(root, 'dist-single'), { recursive: true })
writeFileSync(resolve(root, 'dist-single/il-salotto.html'), page)

console.log(`il-salotto.html: ${(page.length / 1024).toFixed(0)} kB`)
