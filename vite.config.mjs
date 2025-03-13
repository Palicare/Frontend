import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';
import https from 'https';
import fs from 'fs';
import path from 'path';

// Function to get local IPv6
function getLocalIPv6() {
  const interfaces = os.networkInterfaces();
  let fallbackIP = "::1"; // Default to localhost

  for (const iface of Object.values(interfaces)) {
    for (const config of iface || []) {
      if (config.family === 'IPv6' && !config.internal) {
        if (/^([2-3][0-9A-Fa-f]{3}:)/.test(config.address)) {
          return config.address; // Prefer public IPv6 immediately
        }
        if (!config.address.startsWith('fe80::')) {
          fallbackIP = config.address; // Save non-local IPv6
        }
      }
    }
  }

  return fallbackIP;
}

// Function to get global IPv6 from ipify
async function getGlobalIPv6() {
  return new Promise((resolve) => {
    https.get('https://api64.ipify.org', (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data.trim()));
    }).on('error', () => resolve(getLocalIPv6())); // Fallback to local IPv6
  });
}

// Async setup to fetch IPv6 dynamically
async function setupViteConfig() {
  const LOCAL_IPv6 = await getGlobalIPv6();
  const BACKEND_PORT = 8080;
  const BACKEND_URL = `http://localhost:${BACKEND_PORT}`; // 🔥 Use localhost to keep backend private

  console.log(`✅ Public/Global IPv6 Detected: ${LOCAL_IPv6}`);
  console.log(`✅ Backend is proxied internally at: ${BACKEND_URL}`);

  return defineConfig({
    plugins: [react()],
    server: {
      host: '::', // Allow both IPv4 & IPv6
      port: 443, // Publicly accessible frontend
      strictPort: true,
      https: {
        key: fs.readFileSync(path.resolve('./src/https/key.pem')),
        cert: fs.readFileSync(path.resolve('./src/https/cert.pem')),
      },
      proxy: {
        '/api': {
          target: BACKEND_URL, // 🔥 Proxy to localhost (backend is never exposed)
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      allowedHosts: [
        'https://2000slash.duckdns.org', // Explicitly allow frontend domains
        'https://monkika.de'
      ],
    },
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify('/api'), // 🔥 Clean API calls in frontend
    },
  });
}

export default setupViteConfig();
