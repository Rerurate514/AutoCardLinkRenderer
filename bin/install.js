#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

async function main() {
    const targetDir = process.cwd();
    const quartzPluginDir = path.join(targetDir, 'quartz', 'plugins', 'transformers');

    if (!fs.existsSync(path.join(targetDir, 'quartz'))) {
        console.error('❌ Error: This doesn\'t appear to be a Quartz project.');
        console.error('   Please run this command from your Quartz project root.');
        process.exit(1);
    }

    const templatePath = path.join(__dirname, '..', 'templates', 'autocardlink.ts');
    const destPath = path.join(quartzPluginDir, 'autocardlink.ts');

    try {
        await fs.copy(templatePath, destPath);
        console.log('✅ AutoCardLink plugin installed successfully!');
        console.log(`📁 Location: ${destPath}`);
        console.log('\n📝 Next steps:');
        console.log('1. Add to your quartz.config.ts:');
        console.log('\n   import { AutoCardLink } from "./quartz/plugins/transformers/autocardlink"');
        console.log('\n   export default {');
        console.log('     plugins: {');
        console.log('       transformers: [');
        console.log('         AutoCardLink(),');
        console.log('         // ...');
        console.log('       ]');
        console.log('     }');
        console.log('   }');
    } catch (error) {
        console.error('❌ Error installing plugin:', error.message);
        process.exit(1);
    }
}

main();
