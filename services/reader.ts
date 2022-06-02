import fs from 'fs';
import { join } from 'path';

const categories: any = {};
const ymlData: any[] = [];

export const getCategories = () => categories;
export const saveCategories = () => {
  console.log("Save ...");
}
export const getYML = () => ymlData;
export const saveYML = () => {
  console.log("Save YML...");
}
export const dictionaryDataReader = (data: Buffer) => {
  data
    .toString("utf-8")
    .split("\n")
    .map((r: string) => {
      const [word, descr, cat] = r.split(";");
      ymlData.push([word, descr]);
      const category = categories[cat] || [];
      category.push(word);
      categories[cat] = category;
    });
}

export const importData = async () => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(join(process.cwd(), 'data', 'import_dict.csv'));
    stream.on('data', dictionaryDataReader);
    stream.on('end', resolve);
    stream.on('error', reject);
  })
}
