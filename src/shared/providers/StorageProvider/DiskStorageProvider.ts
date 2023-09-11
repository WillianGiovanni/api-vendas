import uploadsConfig from '@config/uploads';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadsConfig.tempFolder, file),
      path.resolve(uploadsConfig.directory, file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadsConfig.directory, file);
    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
