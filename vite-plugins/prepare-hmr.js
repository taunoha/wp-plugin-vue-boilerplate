import path from "path";
import { exec } from 'node:child_process';
import fs from "fs";

let entryUrl = 'http://localhost:5173/src/main.js';
let foundHmrUrlParam = false;
let _server = null;
let isStopping = false;

function handleHmrUrlParam(content, status) {
  let updatedContent = content;

  if (foundHmrUrlParam === false && updatedContent.match(/\$hmrUrl\s*=/)) {
    foundHmrUrlParam = true;
  }

  if (status === 'start') {
    updatedContent = updatedContent.replace(/\$hmrUrl\s*=\s*['"]{2}/, `$hmrUrl = '${entryUrl}'`);
  } else {
    updatedContent = updatedContent.replace(/\$hmrUrl\s*=\s*['"][^'"]*['"]/, `$hmrUrl = ""`);
  }

  return updatedContent;
}

function handleToggleDevServer(status = 'start') {
  const dir = path.resolve(__dirname, '../');

  fs.readdir(dir, (_, files) => {
    files.forEach(file => {
      if (file.endsWith('.php')) {
        const filePath = path.resolve(dir, file);
        const updatedContent = handleHmrUrlParam(fs.readFileSync(filePath, 'utf8'), status);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
      }
    });
  });
}

async function handleDevServerStop() {
  handleToggleDevServer('stop');
  await new Promise(resolve => setTimeout(resolve, 147));

  console.log('\n\nBuilding production files...');

  await new Promise(resolve => exec('vite build', (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Done.');
    }
    resolve();
  }));
}

async function handleDevServerStart() {
  handleToggleDevServer('start');
  await new Promise(resolve => setTimeout(resolve, 147));

  if (!foundHmrUrlParam) {
    _server.config.logger.warn(`\nNo $hmrUrl found in your plugin root file. HMR disabled.\n`);
  }
}

export default function prepareHmr() {
  return {
    name: 'prepareHmr',
    buildStart() {

      if (this.meta.watchMode) {
        return;
      }

      handleToggleDevServer('stop');
    },
    configureServer(server) {

      _server = server;

      _server.httpServer?.once('listening', () => {
        const address = _server.httpServer.address();
        const { port } = address;
        const host = address.address.indexOf('::') !== -1 ? 'localhost' : address.address;
        entryUrl = `http://${host}:${port}/src/main.js`;
        handleDevServerStart();
      });

      _server.ws.on('close', () => {
        if (isStopping) {
          return;
        }
        isStopping = true;
        handleDevServerStop();
      });

      process?.on('SIGINT', async () => {
        if (isStopping) {
          return;
        }
        isStopping = true;
        await handleDevServerStop();
        process.exit(0);
      });
    },
  };
}
