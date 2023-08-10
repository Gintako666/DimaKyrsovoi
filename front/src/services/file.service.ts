import { directus } from '~/contexts/user';

const PATH = '/upload';

const FileService = {
  async uploadFile(file: FormData) {
    try {
      await directus.transport.post(PATH, file);
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
    }
  },
};

export default FileService;
