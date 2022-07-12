export const openItemWhenInQueryParam = (
  path: string,
  index: number,
  handleExpand: () => void
) => {
  try {
    const searchArray: any = window.location.href.split('?')[1].split('&');
    for (let i = 0; i < searchArray.length; i++) {
      searchArray[i] = searchArray[i].split('=');
    }
    const newSearch = new URLSearchParams(searchArray);

    let formLocation: any = newSearch.get('formLocation');
    if (!formLocation) {
      return;
    }
    formLocation = formLocation.split('_');
    const regex = new RegExp(`((^|_)${path}-${index}$)`);

    formLocation.forEach((location: string) => {
      if (regex.test(location)) {
        handleExpand();
      }
    });
  } catch {}
};

export const findValue: any = (obj: any, key: string) => {
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
