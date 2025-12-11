#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

async function main() {
    const targetDir = process.cwd();
    const quartzDir = path.join(targetDir, 'quartz');

    if (!fs.existsSync(quartzDir)) {
        console.error('❌ Error: This doesn\'t appear to be a Quartz project.');
        console.error('   Please run this command from your Quartz project root.');
        process.exit(1);
    }

    try {
        const transformerSrc = path.join(__dirname, '..', 'templates', 'quartz', 'plugins', 'transformers', 'aclr.ts');
        const transformerDest = path.join(quartzDir, 'plugins', 'transformers', 'aclr.ts');
        await fs.copy(transformerSrc, transformerDest);
        console.log('✅ Transformer plugin copied: quartz/plugins/transformers/aclr.ts');

        const styleSrc = path.join(__dirname, '..', 'templates', 'quartz', 'components', 'styles', 'autoCardLink.inline.scss');
        const styleDest = path.join(quartzDir, 'components', 'styles', 'autoCardLink.inline.scss');
        await fs.copy(styleSrc, styleDest);
        console.log('✅ Style file copied: quartz/components/styles/autoCardLink.inline.scss');

        console.log('\n📝 Next steps:');
        console.log('1. Add to your quartz.config.ts:');
        console.log('\n   import { AutoCardLink } from "./quartz/plugins/transformers/aclr"');
        console.log('\n   export default {');
        console.log('     plugins: {');
        console.log('       transformers: [');
        console.log('         AutoCardLink(),');
        console.log('         // ...');
        console.log('       ]');
        console.log('     }');
        console.log('   }');
        console.log('\n2. The style file will be automatically loaded by Quartz.');

    } catch (error) {
        console.error('❌ Error installing plugin:', error.message);
        process.exit(1);
    }
}

main();
