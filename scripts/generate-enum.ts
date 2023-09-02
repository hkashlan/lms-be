import { Schema, Attribute } from "@strapi/strapi";
import fs from "fs";
const strapiContext = require("../node_modules/@strapi/strapi/lib/index");
const prettier = require("prettier");

function className(myString: string) {
  const words = myString.split("-");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join("");
}

function enumName(myString: string) {
  return className(myString) + "Relations";
}

function enumNameAttributes(myString: string) {
  return className(myString) + "Attributes";
}

function generateTypeRelations(comp: Schema.Schema) {
  let relations = "";
  Object.keys(comp.attributes)
    .filter(
      (key) =>
        comp.attributes[key].type === "relation" ||
        comp.attributes[key].type === "component" ||
        comp.attributes[key].type === "media"
    )
    .forEach((key) => {
      relations += `\t${key} = "${key}",\n`;
    });
  if (relations) {
    let fileContent =
      `export enum ${enumName(comp.info.displayName)} {\n` + relations;
    fileContent += "}\n\n";
    return fileContent;
  } else {
    return "";
  }
}

function generateTypeAttributes(comp: Schema.Schema) {
  let relations = "";
  Object.keys(comp.attributes).forEach((key) => {
    relations += `\t${key} = "${key}",\n`;
  });
  if (relations) {
    let fileContent =
      `export enum ${enumNameAttributes(comp.info.displayName)} {\n` +
      relations;
    fileContent += "}\n\n";
    return fileContent;
  } else {
    return "";
  }
}

function generateType(comp: Schema.Schema) {
  let fileContent = "";
  fileContent = generateEnum(comp);

  fileContent += `export class ${className(comp.info.displayName)} {\n`;
  Object.keys(comp.attributes).forEach((key) => {
    const required = comp.attributes[key]["required"] ? "" : "?";
    fileContent += `\t${key}${required}: ${getType(
      key,
      comp.attributes[key]
    )};\n`;
  });
  fileContent += "}\n\n";
  return fileContent;
}

function generateEnum(comp: Schema.Schema) {
  return Object.keys(comp.attributes)
    .filter((key) => comp.attributes[key].type === "enumeration")
    .map((key) => {
      const attr = comp.attributes[key];
      let fileContent = `export enum ${className(key)} {\n`;
      fileContent += attr["enum"]
        .map((key) => `\t${key} = "${key}",\n`)
        .join("");
      fileContent += `}\n\n`;
      return fileContent;
    })
    .join("");
}

function getType(key: string, attr: Attribute.Any) {
  let type = getBaseType(key, attr);
  if (attr["repeatable"]) {
    type = type + "[]";
  }
  return type;
}

function getBaseType(key: string, attr: Attribute.Any) {
  switch (attr.type) {
    case "email":
    case "password":
    case "richtext":
      return "string";
    case "enumeration":
      return className(key);
    case "integer":
      return "number";
    case "component":
      return className(attr["component"].split(".")[1]);
    case "date":
    case "datetime":
      return "Date";
    case "relation":
      const relation: string = attr["relation"];
      const toClass = className(attr["target"].split(".")[1]);
      const isArray =
        relation === "oneToMany" || relation === "manyToMany" ? "[]" : "";
      return toClass + isArray;

    default:
      return attr.type;
  }
}

async function saveFile(fileContent: string) {
  const filePath = "src/schema.ts";
  fs.writeFile(
    filePath,
    // prettier.format(fileContent, { parser: "typescript" }),
    fileContent,
    (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Content saved to ${filePath}`);
      }
    }
  );
}

async function generateSchema(): Promise<string> {
  const allTypes = await getTypes();

  let fileContent = "export class media {url: string}\n";
  allTypes.forEach((schema) => (fileContent += generateTypeRelations(schema)));
  allTypes.forEach((schema) => (fileContent += generateTypeAttributes(schema)));
  allTypes.forEach((schema) => (fileContent += generateType(schema)));

  return fileContent;
}

async function getTypes(): Promise<Schema.Schema[]> {
  const appContext = await strapiContext.compile();
  const strapi = await strapiContext(appContext).register();

  const contentTypes = Object.keys(strapi.contentTypes)
    .filter(
      (key) =>
        key.startsWith("api::") || key === "plugin::users-permissions.user"
    )
    .map((key) => strapi.contentTypes[key]);

  contentTypes.forEach(
    (c) => (c.attributes["id"] = { type: "number", required: true })
  );

  const components: Schema.Schema[] = Object.values(strapi.components);
  strapi.destroy();
  const allTypes: Schema.Schema[] = [...contentTypes, ...components];
  const excludeAttributes = [
    "createdAt",
    "updatedAt",
    "createdBy",
    "role",
    "updatedBy",
  ];
  allTypes.forEach((t) =>
    excludeAttributes.forEach((a) => delete t.attributes[a])
  );
  return allTypes;
}

async function main() {
  const fileContent = await generateSchema();
  await saveFile(fileContent);
}

main();
