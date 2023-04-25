// Mark the function as async to allow using await inside
export async function hashPassword(password) {
    // Convert the password to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    // Hash the password using the SubtleCrypto API
    // crypto.subtle.digest returns a Promise, so we use await to wait for it to resolve
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  }
  