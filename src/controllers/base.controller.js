export default class BaseController {
  constructor() {
    this._autoBind();
  }

  _autoBind() {
    let proto = Object.getPrototypeOf(this);
    while (proto && proto !== Object.prototype) {
      for (const key of Object.getOwnPropertyNames(proto)) {
        const val = this[key];
        if (key !== "constructor" && typeof val === "function") {
          this[key] = val.bind(this);
        }
      }
      proto = Object.getPrototypeOf(proto);
    }
  }
}
