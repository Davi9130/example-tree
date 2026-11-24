import packageJson from "hierarch-tree/package.json";

export const libraryName = packageJson.name;
export const libraryVersion = packageJson.version;
export const libraryDescription = packageJson.description;
export const libraryLicense = packageJson.license;

export const npmUrl = `https://www.npmjs.com/package/${packageJson.name}`;

export const githubUrl = packageJson.repository.url.replace(/^git\+/, "").replace(/\.git$/, "");

export const docsBase = `${githubUrl}/blob/main`;

export const installCommand = `npm install ${packageJson.name}`;
