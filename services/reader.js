// @ts-nocheck
const categories = {};
const ymlData = [];

module.exports = {
  getCategories: () => categories,
  saveCategories: () => {
    console.log("Save ...");
  },
  getYML: () => ymlData,
  saveYML: () => {
    console.log("Save YML...");
  },
  dictionaryDataReader: (data) => {
    data
      .toString("utf-8")
      .split("\n")
      .map((r) => {
        const [word, descr, cat] = r.split(";");
        ymlData.push([word, descr]);
        const category = categories[cat] || [];
        category.push(word);
        categories[cat] = category;
      });
  },
};
