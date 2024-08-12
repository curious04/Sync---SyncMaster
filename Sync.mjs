import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

class Sync {
    constructor(repoPath = '.' )  {
        this.repoPath = path.join(repoPath, '.sync');
        this.objectsPath = path.join(this.repoPath, 'objects'); // .Sync/objects
        this.headPath = path.join(this.repoPath, 'HEAD'); //.sync/HEAD
        this.indexPath = path.join(this.repoPath, 'index'); // .sync/index
        this.init();
    }

    async init() {
        await fs.mkdir(this.objectsPath, {recursive: true});
        try {
            await fs.writeFile(this.headPath, '', {flag: 'wx'}); // wx: open for writing. fails if file exists
            await fs.writeFile(this.indexPath, JSON.stringify([]), {flag: 'wx'});
        } catch (error) {
            console.log("Already initialised the .sync folder");
        }
    }    

    hashObject(content) {
        return crypto.createHash('sha1').update(content, 'utf-8').digest('hex');
    }

    async add(fileToBeAdded) {
        // fileToBeAdded: path/to/file
        const fileData = await fs.readFile(fileToBeAdded, { encoding: 'utf-8' }); //read the file
        const fileHash = this.hashObject(fileData); // hash the file
        console.log(fileHash);
        const newFileHashedObjectPath = path.join(this.objectsPath, fileHash); //.sync/objects/abc123
        await fs.writeFile(newFileHashedObjectPath, fileData);
        //One step missing: Add the file to staging area
        console.log(`Added ${fileToBeAdded}`);
    }
}
const sync = new Sync();
sync.add('sample.txt');
