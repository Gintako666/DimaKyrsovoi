import axiosInstance from './axiosInstance';

const PATH = '/upload';

const FileService = {
  async uploadFile(file: FormData) {
    try {
      const response = await axiosInstance.post(PATH, file);
      return response;
    } catch (err) {
      alert(err);
      throw err;
    }
  },
};

export default FileService;
