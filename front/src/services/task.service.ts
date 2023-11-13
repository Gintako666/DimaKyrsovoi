/* eslint-disable @typescript-eslint/no-explicit-any */
import { directus } from '~/contexts/user';
import { IStatus, ITask } from '~/interfaces/ITask';

const TaskService = {
  async getTasks() {
    const result = directus.items('task').readByQuery({
      fields: [ '*.*' ],
    });

    return result as Promise<{ data: ITask[] }>;
  },

  createTask(name: string) {
    const result = directus.items('task').createOne({
      name,
      status: 1,
    });

    return result as Promise<ITask>;
  },

  updateTask(id: number, newStatus: number) {
    const result = directus.items('task').updateOne(id, {
      status: newStatus,
    });

    return result as Promise<ITask>;
  },

  async getStatuses() {
    const result = directus.items('task_status').readByQuery({});

    return result as Promise<{ data: IStatus[] }>;
  },
};

export default TaskService;
