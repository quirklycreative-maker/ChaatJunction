import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import worker from "../dist/server/index.js";

const output = new URL("../github-pages/", import.meta.url);
const client = new URL("../dist/client/", import.meta.url);
const projectPath = "/ChaatJunction";
const routes = ["/", "/joy", "/heritage", "/chatore", "/menu", "/joy/menu", "/heritage/menu", "/chatore/menu"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true });

for (const route of routes) {
  const response = await worker.fetch(new Request(`https://static.local${route}`));
  if (!response.ok) throw new Error(`Could not render ${route}: ${response.status}`);
  let html = await response.text();

  html = html
    .replaceAll("/_vinext/image?url=%2Ffood-spice.png&amp;w=640&amp;q=75", `${projectPath}/food-spice.png`)
    .replaceAll("/_vinext/image?url=%2Ffood-joy.png&amp;w=640&amp;q=75", `${projectPath}/food-joy.png`)
    .replaceAll("/_vinext/image?url=%2Ffood-heritage.png&amp;w=640&amp;q=75", `${projectPath}/food-heritage.png`)
    .replaceAll("/_vinext/image?url=%2Ffood-chatore.png&amp;w=640&amp;q=75", `${projectPath}/food-chatore.png`)
    .replaceAll('"/', `"${projectPath}/`)
    .replaceAll("'/", `'${projectPath}/`)
    .replaceAll(`${projectPath}/${projectPath.slice(1)}/`, `${projectPath}/`);

  const destination = route === "/" ? output : new URL(`.${route}/`, output);
  await mkdir(destination, { recursive: true });
  await writeFile(new URL("index.html", destination), html);
}

await writeFile(new URL(".nojekyll", output), "");
