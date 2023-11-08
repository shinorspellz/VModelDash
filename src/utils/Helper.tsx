import Cookies from "js-cookie";

export const cookieReader = (typeCook: string, page: number) => {
  var tokenn = null;
  switch (page) {
    case 1:
      if (Cookies.get(typeCook)) {
        tokenn = Cookies.get(typeCook);
      }
      return tokenn;
    default:
      break;
  }
};
