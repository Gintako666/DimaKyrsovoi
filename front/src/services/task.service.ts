/* eslint-disable @typescript-eslint/no-explicit-any */
import { directus } from '~/contexts/user';
import { ITransaction } from '~/interfaces/transaction.interface';

const PATH = 'task';

const TaskService = {
  async getTasks() {
    const result = directus.items(PATH).readByQuery({});

    return result as Promise<{ data: ITransaction[] }>;
  },
};

export default TaskService;
