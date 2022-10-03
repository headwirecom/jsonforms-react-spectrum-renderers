export const openItemWhenInQueryParam = (
  path: string,
  index: number,
  handleExpand: (refresh: boolean) => void
) => {
  try {
    const url: any = new URL(window.location.toString());

    const formLocation: any = url.searchParams.get('formLocation');
    if (!formLocation) {
      return;
    }

    const formLocationArray: any[] = [];
    formLocation.split('-').map((item: any) => {
      item = item.split('-')[0];
      if (`${formLocationArray.join('.')}.${item}`.includes(`${path}.${index}`)) {
        handleExpand(true);
      }
      formLocationArray.push(item);
    });
  } catch {}
};

export const findValue: any = (obj: any, key: string) => {
  if (!obj || !key) {
    return undefined;
  }
  if (obj[key]) {
    return obj[key];
  }
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === 'object') {
        const result: any = findValue(obj[prop], key);
        if (result) {
          return result;
        }
      }
    }
  }
};
