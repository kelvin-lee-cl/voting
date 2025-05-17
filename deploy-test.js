/**
 * This script is intended to verify that the application is ready for deployment.
 * Run it with: node deploy-test.js
 */

console.log('Deployment Readiness Check');
console.log('==========================');

// Check for required files
const fs = require('fs');
const requiredFiles = [
    'app.js',
    'package.json',
    'render.yaml',
    'views/login.ejs',
    'views/vote.ejs',
    'views/results.ejs',
    'public/css/style.css'
];

console.log('\nChecking required files:');
let allFilesExist = true;
for (const file of requiredFiles) {
    const exists = fs.existsSync(file);
    console.log(` - ${file}: ${exists ? '✅' : '❌'}`);
    if (!exists) allFilesExist = false;
}

// Check package.json for required fields
console.log('\nChecking package.json:');
try {
    const pkg = require('./package.json');
    console.log(` - name: ${pkg.name ? '✅' : '❌'}`);
    console.log(` - main entry: ${pkg.main ? '✅' : '❌'}`);
    console.log(` - start script: ${pkg.scripts && pkg.scripts.start ? '✅' : '❌'}`);
    console.log(` - engines field: ${pkg.engines ? '✅' : '❌'}`);
} catch (err) {
    console.error(' Error reading package.json:', err.message);
}

// Check for environment handling
console.log('\nChecking environment handling:');
const appContent = fs.readFileSync('app.js', 'utf8');
console.log(` - PORT environment variable: ${appContent.includes('process.env.PORT') ? '✅' : '❌'}`);
console.log(` - NODE_ENV handling: ${appContent.includes('process.env.NODE_ENV') ? '✅' : '❌'}`);

// Final check
console.log('\nDeployment readiness status:');
if (allFilesExist) {
    console.log(' ✅ All core files are present');
    console.log(' ✅ Application appears ready for deployment');
    console.log('\nTo deploy:');
    console.log(' 1. Create a Git repository with these files');
    console.log(' 2. Push to GitHub/GitLab');
    console.log(' 3. Connect to Render.com and deploy as a Web Service');
} else {
    console.log(' ❌ Some required files are missing. See above for details.');
} 