import { WebContainer } from '@webcontainer/api';

let webcontainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

export const bootWebContainer = async () => {
  if (webcontainerInstance) return webcontainerInstance;
  if (bootPromise) return bootPromise;

  bootPromise = WebContainer.boot();
  webcontainerInstance = await bootPromise;
  
  await webcontainerInstance.mount({
    'package.json': {
      file: {
        contents: JSON.stringify({
          name: 'codehightech-sandbox',
          type: 'module',
          dependencies: {
            "typescript": "latest",
            "ts-node": "latest",
            "express": "latest"
          }
        }, null, 2)
      }
    }
  });

  return webcontainerInstance;
};
