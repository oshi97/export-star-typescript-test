const fs = require('fs');
const path = require('path');
const process = require('process')

const resolve = require('eslint-module-utils/resolve').default;
const { parse } = require('@typescript-eslint/typescript-estree');

module.exports = {
  rules: {
    "no-template-literals": {
      create: function (context) {
        const exportedIdentifiers = new Set();
        function reportIfDuplicate(node, identifier) {
          if (exportedIdentifiers.has(identifier)) {
            context.report({
              message: `Duplicate exported identifier '${identifier}'`,
              node
            });
          } else {
            exportedIdentifiers.add(identifier);
          }
        }
        return {
          'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ObjectPattern > Property'(node) {
            reportIfDuplicate(node, node.value.name);
          },
          'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator'(node) {
            reportIfDuplicate(node, node.id.name);
          },
          'ExportNamedDeclaration > ExportSpecifier'(node) {
            reportIfDuplicate(node, node.exported.name);
          },
          ExportNamedDeclaration(node) {
            const identifier = node?.declaration?.id?.name;
            if (identifier) {
              reportIfDuplicate(node, identifier)
            }
          },
          ExportAllDeclaration(node) {
            const exportSource = node.source.value;
            const sourceFilePath = resolve(exportSource, context);
            
          }
        };
      }
    }
  }
};

function Handler(program) {

}