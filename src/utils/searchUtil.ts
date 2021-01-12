/* eslint-disable no-restricted-syntax */
import hangul from "hangul-js";

export function search(keyword: string, text: string) {
  const disassembleGruop = hangul.d(keyword, true);
  let keywordCho = "";
  disassembleGruop.forEach((gruop) => {
    keywordCho += gruop[0] || "";
  });
  if (
    keyword.toUpperCase().includes(text.toUpperCase()) ||
    keywordCho.toUpperCase().includes(text.toUpperCase())
  ) {
    return 1;
  }
  return 0;
}

export function searchListUser(
  data: SearchItemType[],
  searchText: string,
  filterUser?: { id: number }[]
) {
  if (!searchText || searchText.trim() === "" || searchText.trim().length < 2)
    return [];
  const nameList: SearchItemType[] = [];
  const organizationNameList: SearchItemType[] = [];
  for (const obj of data) {
    let include = false;
    if (filterUser && filterUser.length !== 0) {
      include = !!filterUser.find(({ id }) => id === obj.id);
    }
    if (!include)
      if (search(obj.name, searchText)) {
        const findIndex = nameList.findIndex((item) => item.name > obj.name);
        if (findIndex === -1) nameList.push(obj);
        else nameList.splice(findIndex, 0, obj);
      } else if (search(obj.organizationName, searchText)) {
        const findIndex = organizationNameList.findIndex(
          (item) => item.name > obj.name
        );
        if (findIndex === -1) organizationNameList.push(obj);
        else organizationNameList.splice(findIndex, 0, obj);
      }
  }
  return [...nameList, ...organizationNameList];
}

export function searchList(
  data: any[],
  searchText: string,
  findKeys: string[]
) {
  if (!searchText || searchText.trim() === "" || searchText.trim().length < 2)
    return [];
  const findList: any[] = [];
  for (const obj of data) {
    let target: any;
    for (const key of findKeys) {
      if (target) target = target[key];
      else target = obj[key];
    }
    if (search(target, searchText)) {
      findList.push(obj);
    }
  }
  return findList;
}
