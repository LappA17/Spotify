import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';
import * as uuid from 'uuid'; // для генерация рандома

@Injectable()
export class FilesService {
	async createFile(file): Promise<string> {
		try {
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve(__dirname, '..', 'static');
			//если по этому пути ничего не существует то создадим папку
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.join(filePath, fileName), file.buffer);
			return fileName;
		} catch (err) {
			throw new HttpException(`Error while writing a file`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
