import { directus } from '~/contexts/user';

const PATH = '/upload';

const FileService = {
  async uploadFile(formData: FormData) {
    try {
      await directus.transport.post(PATH, formData);
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
    }
  },
};

export default FileService;
