import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  RichTextAttribute,
  DateAttribute,
  ComponentAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  ComponentSchema,
  Schema,
  Attribute,
} from "@strapi/strapi";
import { StringRecord } from "@strapi/strapi/lib/types/utils";
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
  return className(myString) + "Attributes";
}

function generateEnum(comp: Schema) {
  let fileContent = `export enum ${enumName(comp.info.displayName)} {\n`;
  Object.keys(comp.attributes).forEach((key) => {
    fileContent += `\t${key} = "${key}",\n`;
  });
  fileContent += "}\n\n";
  return fileContent;
}

function generateType(comp: Schema) {
  let fileContent = `export class ${className(comp.info.displayName)} {\n`;
  Object.keys(comp.attributes).forEach((key) => {
    fileContent += `\t${key}: ${getType(comp.attributes[key])};\n`;
  });
  fileContent += "}\n\n";
  return fileContent;
}

function getType(attr: Attribute) {
  let type = getBaseType(attr);
  if (attr["repeatable"]) {
    type = type + "[]";
  }
  return type;
}

function getBaseType(attr: Attribute) {
  switch (attr.type) {
    case "email":
    case "password":
    case "richtext":
    case "enumeration":
      return "string";
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
        relation === "oneToMany" || relation === "ManyToMany" ? "[]" : "";
      return toClass + isArray;

    default:
      return attr.type;
  }
}

async function saveFile(fileContent: string) {
  const filePath = "src/schema.ts";
  // console.log(fileContent);
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

  let fileContent = "";
  allTypes.forEach((schema) => (fileContent += generateEnum(schema)));
  allTypes.forEach((schema) => (fileContent += generateType(schema)));

  return fileContent;
}

async function getTypes(): Promise<Schema[]> {
  const appContext = await strapiContext.compile();
  const strapi = await strapiContext(appContext).register();

  const contentTypes = Object.keys(strapi.contentTypes)
    .filter(
      (key) =>
        key.startsWith("api::") || key === "plugin::users-permissions.user"
    )
    .map((key) => strapi.contentTypes[key]);
  const components: Schema[] = Object.values(strapi.components);
  strapi.destroy();
  const allTypes: Schema[] = [...contentTypes, ...components];
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
