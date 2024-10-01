const fs = require('fs');
const crypto = require('crypto');

function generateJwtSecret() {
    return crypto.randomBytes(32).toString('hex'); 
}

function writeToEnv(secret) {
    const envFilePath = './.env'; 
    const envVariable = `JWT_SECRET=${secret}`; 
    let envContent = '';

    if (fs.existsSync(envFilePath)) {
        envContent = fs.readFileSync(envFilePath, 'utf8');

        if (envContent.includes('JWT_SECRET')) {
            envContent = envContent.replace(/JWT_SECRET=.*/g, envVariable);
        } else {
            envContent += `\n${envVariable}\n`;
        }
    } else {
        envContent = `${envVariable}\n`;
    }

    fs.writeFileSync(envFilePath, envContent);

    console.clear();
    console.log(`\x1b[32mJWT_SECRET: ${secret}\x1b[0m`);
}

function main() {
    const jwtSecret = generateJwtSecret(); 
    writeToEnv(jwtSecret); 
}

main(); 
