import { getVersion } from '../config.mjs';
import { signAddon } from 'sign-addon';

export default async function (sourcePath, zipPath, releasePath, browserConfig, itemConfig) {
  if (!process.env.AMO_KEY) {
    return Promise.reject(new Error('AMO_KEY not found'));
  }
  if (!process.env.AMO_SECRET) {
    return Promise.reject(new Error('AMO_SECRET not found'));
  }

  // console.log("AMO", sourcePath, zipPath, releasePath, browserConfig, itemConfig);

  // return;
  return signAddon({
    xpiPath: zipPath,
    version: await getVersion(sourcePath),
    apiKey: process.env.AMO_KEY,
    apiSecret: process.env.AMO_SECRET,
    id: itemConfig.id,
    disableProgressBar: true,
  });
};
