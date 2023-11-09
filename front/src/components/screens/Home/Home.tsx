import { FC, useEffect, useState } from 'react';

import Loader from '~/components/shared/Loader/Loader';

import useFetchData from '~/hooks/useFetchData';

import TaskService from '~/services/task.service';

const Home: FC = () => {
  const { getTasks } = TaskService;
  const {
    data,
    isLoading,
  } = useFetchData(getTasks);

  useEffect(() => {
    console.log(data);
  }, [ data ]);

  if (data && isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {data && data.data.map((item) => item.name)}
    </div>
  );
};

export default Home;
