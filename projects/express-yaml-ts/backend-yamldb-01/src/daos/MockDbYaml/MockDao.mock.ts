import * as yaml from "js-yaml";
import YAML from 'yaml'

import { IUser } from '@entities/User';
import { promises } from "fs";
const { readFile, writeFile } = promises;
interface IDatabase {
    users: IUser[];
}

class MockDaoMockYaml {

    private readonly dbFilePath = 'src/daos/MockDbYaml/MockDb.yaml';

    async openDb() {
        try {
            const yamlString = await readFile(this.dbFilePath, 'utf8');
            const jsonOutput: any = yaml.load(yamlString)
            return Promise.resolve(jsonOutput) as Promise<IDatabase>;

        } catch (error) {
            return Promise.reject(error);
        }

    }

    async saveDb(db: IDatabase): Promise<void> {
        try {
            const yamlString: string = YAML.stringify(db);
            // save has no value. await just needs to return somewhere or code breaks
            let save = await writeFile(this.dbFilePath, yamlString); // need to be in an async function
            return Promise.resolve(save) as Promise<void>;

        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default MockDaoMockYaml;
