export function generateRandomLong(): number {
    const highBits = Math.floor(Math.random() * 0x100000000); // Get random 32-bit value (upper 32 bits)
    const lowBits = Math.floor(Math.random() * Math.pow(2, 32)); // Get random 32-bit value (lower 32 bits)
    return (highBits << 32) | lowBits; // Combine using bitwise OR (|) and left shift (<<)
  }

  export function buildURL(): string {
      /*
        Use this spaghetti to get and use my current URL
      */
        const protocol = window.location.protocol; // e.g., "https:"
        const hostname = window.location.hostname;
        const port = window.location.port; // Might be an empty string
      
        const domain = port ? `${hostname}:${port}` : hostname;
        const fullUrl = `${protocol}//${domain}`;

        return fullUrl
  }