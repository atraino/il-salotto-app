import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Default build: a normal Vite bundle in dist/.
 * `--mode artifact`: one self-contained HTML file in dist-single/, fonts inlined
 * as data URIs, for hosting the prototype somewhere it can be opened on a phone.
 */
export default defineConfig(({ mode }) => {
  const single = mode === 'artifact'
  return {
    plugins: single ? [react(), viteSingleFile()] : [react()],
    build: single
      ? {
          outDir: 'dist-single',
          cssCodeSplit: false,
          assetsInlineLimit: 100_000_000,
        }
      : {},
  }
})
