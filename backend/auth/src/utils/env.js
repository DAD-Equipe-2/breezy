const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const ENV_PATH = path.resolve(process.cwd(), '.env')


function generateJWTKeys() {
    // Generate secure random keys
    const generateKey = () => crypto.randomBytes(64).toString('hex');

    // Ensure .env file exists
    if (!fs.existsSync(ENV_PATH)) {
        fs.writeFileSync(ENV_PATH, '');
    }

    // Read current contents
    let envContent = fs.readFileSync(ENV_PATH, 'utf-8');

    const addEnvVar = (key, value) => {
        const regex = new RegExp(`^${key}=.*$`, 'm');
        if (!regex.test(envContent)) {
            envContent += `\n${key}=${value}`;
        }
    };

    // Add keys if missing
    addEnvVar('ACCESS_JWT_KEY', generateKey());
    addEnvVar('REFRESH_JWT_KEY', generateKey());

    // Write updated content back to .env
    fs.writeFileSync(ENV_PATH, envContent.trim() + '\n');
}

module.exports = { generateJWTKeys };