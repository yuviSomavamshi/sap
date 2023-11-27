import isEmpty from "lodash/isEmpty";

export function cashFormat(n) {
  do {
    if (n < 1e3) break;
    if (n >= 1e3 && n < 1e6) {
      n = +(n / 1e3).toFixed(1) + "K";
      break;
    }
    if (n >= 1e6 && n <= 1e9) {
      n = +(n / 1e6).toFixed(1) + "M";
      break;
    }
    if (n >= 1e9 && n <= 1e12) {
      n = +(n / 1e9).toFixed(1) + "B";
      break;
    }
    if (n >= 1e12 && n <= 1e15) {
      n = +(n / 1e12).toFixed(1) + "T";
      break;
    }
    if (n >= 1e15 && n <= 1e18) {
      n = +(n / 1e15).toFixed(1) + "P";
      break;
    }
  } while (false);
  return n;
}

export function cropString(str, limit = 20) {
  if (!str) return "";
  if (str && str.length < limit) return str;
  else return str.substring(0, limit - 3) + "...";
}

export function isValidateAddress(ip) {
  return (
    ip === "localhost" ||
    /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(ip) ||
    /^((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})$/.test(ip) ||
    /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/g.test(
      ip
    )
  );
}

export function toSnakeCase(inputString, delim = "_") {
  if (inputString === undefined) return "";
  const str = [];
  const array = inputString.split("");
  for (let index = 0; index < array.length; index++) {
    const character = array[index];
    if (Number.isNaN(character) && character === character.toUpperCase()) {
      if (!(index > 0 && array[index - 1] === array[index - 1].toUpperCase())) str.push(delim);
      str.push(character.toUpperCase());
    } else {
      str.push(character);
    }
  }
  return str.join("");
}

export function schemaToJson(prop, data) {
  switch (prop.type) {
    case "object":
      if (data === undefined) data = {};
      prop.properties &&
        Object.keys(prop.properties).forEach((property) => {
          data[property] = schemaToJson(prop.properties[property], data[property]);
        });
      break;
    case "array":
      let properties = [];
      Array.isArray(data) && data.forEach((item) => properties.push(schemaToJson(prop.items, item)));
      return properties;
    case "number":
      if (!Number.isNaN(data)) return parseInt(data);
      if (!Number.isNaN(prop.default)) return parseInt(prop.default);
      if (!Number.isNaN(prop.minimum)) return parseInt(prop.minimum);
      if (!Number.isNaN(prop.maximum)) return parseInt(prop.maximum);
      return 0;
    case "integer":
      if (!Number.isNaN(data)) return Number(data);
      if (!Number.isNaN(prop.default)) return Number(prop.default);
      if (!Number.isNaN(prop.minimum)) return Number(prop.minimum);
      if (!Number.isNaN(prop.maximum)) return Number(prop.maximum);
      return 0;

    case "boolean":
      return data !== undefined ? Boolean(data) : Boolean(prop.default);
    case "string":
      return !isEmpty(data)
        ? String(data)
        : !isEmpty(prop.default)
          ? prop.default
          : Array.isArray(prop.enum) && prop.enum.length > 0
            ? prop.enum[0]
            : "";
    default:
  }
  return data;
}
