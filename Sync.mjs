import path from 'path';
import fs from 'fs/promises';

class Sync {
    constructor(repoPath = '.' )  {
        this.repoPath = path.join(repoPath, '.sync');
        this.objectsPath = path.join(this.repoPath, 'objects'); // .Sync/objects
        this.headPath = path.join(this.repoPath, 'HEAD'); //.Sync/HEAD
        this.indexPath = path.join(this.repoPath, 'index'); // .Sync/index
        this.init();
    }

    async init() {
        await fs.mkdir(this.objectsPath, {recursive: true});
        try {
            await fs.writeFile(this.headPath, {flag: 'wx'}); // wx: open for writing. fails if file exists
            await fs.writeFile(this.indexPath, JSON.stringify([]), {flag: 'wx'});
        } catch (error) {
            console.log("Already initialised the .Sync folder");
        }
    }    
}
const Sync = new Sync();