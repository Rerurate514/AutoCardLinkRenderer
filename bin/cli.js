#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

async function main() {
    const targetDir = process.cwd();
    const pluginPath = path.join(targetDir, 'quartz', 'plugins', 'transformers', 'yourplugin.ts');

    if (!fs.existsSync(path.join(targetDir, 'quartz'))) {
        console.error('❌ Error: This doesn\'t appear to be a Quartz project.');
        console.error('Please run this command from your Quartz project root.');
        process.exit(1);
    }

    const templatePath = path.join(__dirname, '..', 'templates', 'yourplugin.ts');

    try {
        await fs.copy(templatePath, pluginPath);
        console.log('✅ Plugin installed successfully!');
        console.log(`📁 Location: ${pluginPath}`);
        console.log('\n📝 Usage:');
        console.log('Add to your quartz.config.ts:');
        console.log('\nimport { YourPlugin } from "./quartz/plugins/transformers/yourplugin"');
        console.log('\nexport default {\n  plugins: {\n    transformers: [\n      YourPlugin(),\n      // ...\n    ]\n  }\n}');
    } catch (error) {
        console.error('❌ Error installing plugin:', error.message);
        process.exit(1);
    }
}

main();
