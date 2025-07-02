import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/Styles'),
      '@components': path.resolve(__dirname, 'src/Components'),
      '@pages': path.resolve(__dirname, 'src/Pages'),
      '@contexts': path.resolve(__dirname, 'src/Contexts'),
      '@services': path.resolve(__dirname, 'src/Services')
    },
  },
})
