import { FC, useEffect, useState } from 'react';

import useFetchData from '~/hooks/useFetchData';
import { IStatus, ITask } from '~/interfaces/ITask';

import TaskService from '~/services/task.service';

type TaskProps = {
  item: ITask, statuses: IStatus[]
};
const Task: FC<TaskProps> = ({ item, statuses }) => {
  const { updateTask } = TaskService;
  const [ selectStatus, setSelectStatus ] = useState(item.status.id);

  return (
    <div>
      {item.name}

      <select
        name=""
        id=""
        value={ selectStatus }
        onChange={ async (e) => {
          setSelectStatus(+e.target.value);
          await updateTask(item.id, +e.target.value);
        } }
      >

        {statuses?.map((status) => <option value={ status.id }>{status.name}</option>)}
      </select>
    </div>
  );
};

const Home: FC = () => {
  const [ inputValue, setInputValue ] = useState('');
  const { getTasks, getStatuses, createTask } = TaskService;
  const {
    data: tasks,
    isLoading: isLoadingTasks,
  } = useFetchData(getTasks);

  const {
    data: statuses,
    isLoading: isLoadingStatuses,
  } = useFetchData(getStatuses);

  const [ renderTasks, setRenderTasks ] = useState<ITask[]>([]);

  useEffect(() => {
    setRenderTasks(tasks?.data || []);
  }, [ tasks ]);

  if (tasks && isLoadingTasks && isLoadingStatuses && statuses) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <form>
        <input type="text" onChange={ (e) => setInputValue(e.target.value) } value={ inputValue } />
        <button
          type="button"
          onClick={ async () => {
            if (inputValue) {
              const newTask = await createTask(inputValue);
              setInputValue('');
              setRenderTasks((prev) => [ ...prev, newTask ]);
            }
          } }
        >
          Add new task

        </button>
      </form>
      {renderTasks && statuses && renderTasks.map((item) => (
        <Task item={ item } statuses={ statuses!.data } />
      ))}
    </div>
  );
};

export default Home;
