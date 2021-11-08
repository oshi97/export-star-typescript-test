const { readFileSync } = require('fs');
const resolve = require('eslint-module-utils/resolve').default;
const { parse } = require('@typescript-eslint/typescript-estree');

module.exports = {
  rules: {
    'no-duplicate-identifiers': {
      create: createASTVisitor
    }
  }
};

// 'eslint-module-utils/resolve' checks the eslint settings to determine which resolver package to use.
// Unfortunately, there's no way to override this just for the resolver.
// Currently, this plugin only works for Typescript.
const RESOLVER_SETTING = 'import/resolver';

function createASTVisitor(context) {
  if (context.settings[RESOLVER_SETTING] && context.settings[RESOLVER_SETTING] !== 'typescript') {
    throw new Error(
      `the '${RESOLVER_SETTING}' eslint setting must be set to 'typescript' for '${context.id}' to work`);
  }
  context.settings[RESOLVER_SETTING] = 'typescript';
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
  function handleNamedExport(node) {
    const identifier = node?.declaration?.id?.name;
    if (identifier) {
      reportIfDuplicate(node, identifier)
    } else if (node?.declaration?.declarations?.length > 0) {
      node.declaration.declarations.forEach(d => {
        if (d.id.type === 'Identifier') {
          reportIfDuplicate(node, d.id.name);
        } else if (d.id.type === 'ObjectPattern') {
          d.id.properties.forEach(p => {
            reportIfDuplicate(node, p.value.name)
          })
        }
      });
    } else if (node.specifiers.length > 0) {
      node.specifiers.forEach(s => {
        reportIfDuplicate(node, s.exported.name)
      });
    }
  }
  function handleExportAll(exportAllNode) {
    const exportSource = exportAllNode.source.value;
    const sourceFilePath = resolve(exportSource, context);
    const sourceCode = readFileSync(sourceFilePath, 'utf-8');
    const ast = parse(sourceCode, {
      loc: true
    });
    ast.body.forEach(astNode => {
      if (astNode.type === 'ExportNamedDeclaration') {
        handleNamedExport(astNode);
      } else if (astNode.type === 'ExportAllDeclaration') {
        handleExportAll(astNode);
      }
    });
  }
  return {
    ExportNamedDeclaration: handleNamedExport,
    ExportAllDeclaration: handleExportAll
  };
}
