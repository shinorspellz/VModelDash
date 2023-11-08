import Cookies from "js-cookie";
import "moment-timezone";

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

export const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

// export const dateToTimezone = (date: string): Moment => {
//   // const { timeZone } = Localization.getCalendars()[0];
//   // return moment(date).tz(`${timeZone}`);
// };
