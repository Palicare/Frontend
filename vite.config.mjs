import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';

// Function to get the correct local IP
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface || []) {
      if (config.family === 'IPv4' && !config.internal) {
        // Prefer IPs in the 192.168.x.x or 10.x.x.x range
        if (config.address.startsWith('192.168.') || config.address.startsWith('10.')) {
          return config.address;
        }
      }
    }
  }
  // Fallback if no match found
  return 'localhost';
}

const LOCAL_IP = getLocalIp();
const BACKEND_PORT = 8080; // Adjust if your backend runs on a different port
const BACKEND_URL = `http://${LOCAL_IP}:${BACKEND_PORT}`;

console.log(`✅ Correct Backend IP detected: ${BACKEND_URL}`);

export default defineConfig({
  plugins: [react()],
  server: {
    host: LOCAL_IP, // Bind to the correct local network interface
    port: 5173, // Change if needed
  },
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(BACKEND_URL),
  },
});
