const fs = require('fs');
const path = require('path');
const process = require('process')

const resolve = require('eslint-module-utils/resolve').default;
const { parse } = require('@typescript-eslint/typescript-estree');

module.exports = {
  rules: {
    "no-template-literals": {
      create: function (context) {
        let i = 0
        console.log(resolve)
        const nodes = [
          'ExportAllDeclaration',
          'ExportNamedDeclaration'
        ]
        // console.log(require('@yext/answers-core'), Object.keys(context.getScope()))
        return {
          'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ObjectPattern > Property'(node) {
            console.log('e > v> p', node.value.name)
          },
          'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator'(node) {
            console.log('e > v', node.id.name)
          },
          'ExportNamedDeclaration > ExportSpecifier'(node) {
            console.log('e > e', node.exported.name)
          },
          ExportNamedDeclaration(node) {
            if (node?.declaration?.id?.name) {
              console.log(node.declaration.id.name)
            }
          },
        //   Program(node) {
        //     node.body.filter(n => nodes.includes(n.type)).forEach(n => {
        //       console.log('---', n.type)
        //       if (n.type === 'ExportAllDeclaration') {
        //         const moduleName = n.source.value;
        //         console.log(moduleName)
        //         console.log(resolve(moduleName, context))
        //       } else {
        //         console.log()
        //       }
        //     });
        //   },
        //   ExportAllDeclaration(node) {
        //     // console.log('export all', i++)
        //     // const resolved = resolve('@yext/answers-core', context)
        //     // console.log(parse(fs.readFileSync(resolved, 'utf-8')))
        //     // const moduleName = node.source.value;
        //     // const localModulePath = path.join(context.getCwd(), moduleName);
        //     // const relativePath = path.relative(__dirname, localModulePath);
        //     // console.log(context.getCwd(), moduleName, localModulePath, relativePath);
        //     // console.log(moduleName === '@yext/answers-core' ? require(moduleName) : require(relativePath));
        //     // require('fs').writeFileSync('test.json', JSON.stringify(node))
        //   },
        //   TemplateLiteral(node) {
        //     // console.log('tmpl literal', i++)
        //     // context.report(node, 'Do not use template literals');
        //   }
        };
      }
    }
  }
};

function Handler(program) {

}