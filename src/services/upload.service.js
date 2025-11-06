class UploadService {
  async upload(files) {
    try {
      return files.map((file) => `/uploads/img/${file.filename}`);
    } catch (error) {
      throw new Error("Error uploading files: " + error.message);
    }
  }
}

export default UploadService;
