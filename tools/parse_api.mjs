// @ts-check
import * as fs from "fs/promises";
import * as path from 'path';

/**
 * @type {import('../temp/callbackify-mongodb.api.json')}
 */
const api = JSON.parse(
  await fs.readFile(
    new URL("../temp/callbackify-mongodb.api.json", import.meta.url),
    { encoding: "utf8" }
  )
);

async function* walk(root) {
  const directoryContents = await fs.readdir(root);
  for (const filepath of directoryContents) {
    const fullPath = path.join(root.toString(), filepath);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      yield* walk(fullPath);
    } else if (stat.isFile() && fullPath.endsWith('.js')) {
      yield fullPath;
    }
  }
}

import * as mongodb from 'mongodb';
function needsSpecialImportPath(className) {
  return mongodb[className] == null
}

async function findImportPath(className) {
  if(!needsSpecialImportPath(className)) {
    return 'mongodb'
  } else {
    let module;
    let moduleStr;
    const url = new URL("../node_modules/mongodb/lib", import.meta.url);
    const base = url.pathname
    for await (const importStr of walk(base)) {
      module = await import(importStr)
      moduleStr = importStr;
      if(module[className] != null) {
        break
      }
    }
    const libIndex = moduleStr.indexOf('lib/')
    return `mongodb/${moduleStr.slice(libIndex)}`
  }
}

const members = api.members[0].members;
const publicClasses = members.filter(
  (member) => member.releaseTag === "Public" && member.kind === "Class"
);

const asyncAPIs = publicClasses.filter((klass) => {
  const promiseMethodsIndexes = []
  const members = Array.isArray(klass.members) ? klass.members : [];
  for (const [index, member] of members.entries()) {
    if(member.kind === 'Method') {
      for (const {text} of member.excerptTokens) {
        if(text === "Promise") {
          promiseMethodsIndexes.push(index)
        }
      }
    }
  }

  if (promiseMethodsIndexes.length > 0) {
    klass.promiseMethodsIndexes = promiseMethodsIndexes;
    return true;
  }
  return false;
});

const classToMethods = []
for (const klass of asyncAPIs) {
  console.log(klass.name);
  const uniqueAsyncMethods = Array.from(new Set(klass.promiseMethodsIndexes.map(index => klass.members[index].name)))
  uniqueAsyncMethods.sort((a, b) => a.localeCompare(b))
  classToMethods.push([klass.name, {location: await findImportPath(klass.name), methods: []}])
  for (const name of uniqueAsyncMethods) {
    classToMethods[classToMethods.length - 1][1].methods.push(name)
  }
}

await fs.writeFile(new URL("../src/api.js", import.meta.url), `module.exports = { api: new Map(${JSON.stringify(classToMethods, undefined, 2)}) };\n`, {encoding: 'utf8'})
