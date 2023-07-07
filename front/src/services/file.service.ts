import axiosInstance from './axiosInstance';

const path = '/upload';

const FileService = {
  async uploadFile(file: FormData) {
    try {
      const response = await axiosInstance.post(path, file);
      return response;
    } catch (err) {
      alert(err);
      throw err;
    }
  },
};

export default FileService;
