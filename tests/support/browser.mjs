import fs from 'node:fs';
import {chromium as browser} from 'playwright';
fs.mkdirSync('outputs',{recursive:true});
export const chromium={launch(options={}){return browser.launch({...options,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});}};
