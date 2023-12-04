import { Users } from '@models/users';
import * as testingDb from './databaseTest';

const initTestingModule = async () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  beforeAll(async () => {
    await testingDb.connectDBTesting();
  });

  /**
   * Remove and close the db and server.
   */
  afterAll(async () => {
    await testingDb.closeDBTesting();
  });
};

export default initTestingModule;
