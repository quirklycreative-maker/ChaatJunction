import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import worker from "../dist/server/index.js";

const output = new URL("../github-pages/", import.meta.url);
const client = new URL("../dist/client/", import.meta.url);
const projectPath = "/CJ-POC";
const routes = ["/", "/joy", "/heritage", "/chatore", "/menu", "/joy/menu", "/heritage/menu", "/chatore/menu"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true });

for (const route of routes) {
  const response = await worker.fetch(new Request(`https://static.local${route}`));
  if (!response.ok) throw new Error(`Could not render ${route}: ${response.status}`);
  let html = await response.text();

  html = html
    .replaceAll(
      /\/_vinext\/image\?url=%2F([^&"']+)&amp;w=\d+&amp;q=\d+/g,
      (_match, encodedPath) => `/${decodeURIComponent(encodedPath)}`,
    )
    .replaceAll(/"\/(?!>)/g, `"${projectPath}/`)
    .replaceAll(/'\/(?!>)/g, `'${projectPath}/`)
    .replaceAll(`${projectPath}/${projectPath.slice(1)}/`, `${projectPath}/`);

  const destination = route === "/" ? output : new URL(`.${route}/`, output);
  await mkdir(destination, { recursive: true });
  await writeFile(new URL("index.html", destination), html);
}

await writeFile(new URL(".nojekyll", output), "");
