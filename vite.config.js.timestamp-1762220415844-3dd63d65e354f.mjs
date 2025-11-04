// vite.config.js
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import preact from "file:///app/node_modules/@preact/preset-vite/dist/esm/index.mjs";
var vite_config_default = defineConfig({
  server: {
    proxy: {
      "/ws": {
        target: "ws://gadadar4ch.local",
        ws: true
      }
    }
  },
  plugins: [preact()],
  resolve: {
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat"
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/bundle.js",
        chunkFileNames: "assets/chunk-[name].js",
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/[name].[ext]";
          }
          if (/\.css$/.test(name ?? "")) {
            return "css/[name].[ext]";
          }
          if (/\.js$/.test(name ?? "")) {
            return "js/[name].[ext]";
          }
          return "assets/[name].[ext]";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBwcmVhY3QgZnJvbSAnQHByZWFjdC9wcmVzZXQtdml0ZSc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy93cyc6IHtcbiAgICAgICAgdGFyZ2V0OiAnd3M6Ly9nYWRhZGFyNGNoLmxvY2FsJyxcbiAgICAgICAgd3M6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtwcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ3JlYWN0JzogJ3ByZWFjdC9jb21wYXQnLFxuICAgICAgJ3JlYWN0LWRvbSc6ICdwcmVhY3QvY29tcGF0J1xuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvYnVuZGxlLmpzJywgXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2NodW5rLVtuYW1lXS5qcycsIFxuICAgICAgICBhc3NldEZpbGVOYW1lczogKHsgbmFtZSB9KSA9PiB7XG4gICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjb3JyZWN0IGV4dGVuc2lvbiBiYXNlZCBvbiB0aGUgYXNzZXQncyBjb250ZW50IHR5cGVcbiAgICAgICAgICBpZiAoL1xcLihnaWZ8anBlP2d8cG5nfHN2ZykkLy50ZXN0KG5hbWUgPz8gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9bbmFtZV0uW2V4dF0nO1xuICAgICAgICAgIH0gXG4gICAgICAgICAgaWYgKC9cXC5jc3MkLy50ZXN0KG5hbWUgPz8gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Nzcy9bbmFtZV0uW2V4dF0nO1xuICAgICAgICAgIH1cblx0XHQgIGlmICgvXFwuanMkLy50ZXN0KG5hbWUgPz8gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2pzL1tuYW1lXS5bZXh0XSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEFkZCBtb3JlIHNwZWNpZmljIGNhc2VzIGlmIG5lZWRlZFxuXG4gICAgICAgICAgLy8gRmFsbGJhY2sgZm9yIG90aGVyIGFzc2V0IHR5cGVzXG4gICAgICAgICAgcmV0dXJuICdhc3NldHMvW25hbWVdLltleHRdJzsgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOEwsU0FBUyxvQkFBb0I7QUFDM04sT0FBTyxZQUFZO0FBR25CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxFQUNsQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRTVCLGNBQUkseUJBQXlCLEtBQUssUUFBUSxFQUFFLEdBQUc7QUFDN0MsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBSSxTQUFTLEtBQUssUUFBUSxFQUFFLEdBQUc7QUFDN0IsbUJBQU87QUFBQSxVQUNUO0FBQ04sY0FBSSxRQUFRLEtBQUssUUFBUSxFQUFFLEdBQUc7QUFDdEIsbUJBQU87QUFBQSxVQUNUO0FBSUEsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
