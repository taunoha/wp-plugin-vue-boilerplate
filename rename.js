import prompts from "prompts";
import fs from "fs";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = [
  {
    type: "text",
    name: "name",
    message: "Plugin name:",
    initial: "My Plugin",
    validate: (text) =>
      text.match(/[^A-Za-z0-9_-\s]/g)
        ? "Name allows alphanumeric English characters, spaces, underscores and dashes."
        : true,
  },
];
(async () => {
  const response = await prompts(questions);

  if (!response.name) {
    console.error("You must provide a plugin name.");
    process.exit(1);
  }

  const replacements = {
    "{plugin-name}": response.name,
    '{plugin}': response.name.toLowerCase().replace(/[-\s]/g, "_"),
    '{PLUGIN}': response.name.toUpperCase().replace(/[-\s]/g, "_"),
    '{plugin-shortcode}': response.name.toLowerCase().replace(/[_\s]/g, "-"),
  };

  console.log("Replacing in file names...");
  renameFiles(replacements);

  console.log("Replacing in file contents...");
  searchReplaceContents(replacements);

  console.log("Remove the 'rename.js' file and the 'promps' dependency from package.json.");
  console.log("Done.");
  
})();

const renameFiles = (replacements) => {
  const dir = path.resolve(__dirname);
  const files = walkSync(dir);

  files.forEach((file) => {
    let newPath = Object.keys(replacements).reduce(
      (acc, key) => acc.replace(new RegExp(key, "g"), replacements[key]),
      file
    );

    fs.renameSync(file, newPath);
  });
}

const searchReplaceContents = (replacements) => {
  const dir = path.resolve(__dirname);
  const files = walkSync(dir);

  files.forEach((file) => {
    const oldContent = fs.readFileSync(file, "utf8");

    let newFileContent = Object.keys(replacements).reduce(
      (acc, key) => acc.replace(new RegExp(key, "g"), replacements[key]),
      oldContent
    );

    fs.writeFileSync(file, newFileContent, "utf8");
  });

}

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist.filter(
    (path) => !path.match(/node_modules|\.git|package-lock|rename\.js/)
  );
};
