const local_name = 'external-libs';

export default class LocalExternalLibs {
  static addOne(libObj) {
    const libs = this.getAll();

    libs.push(libObj);
    this.save(libs)
    return libs
  }

  static removeOne(libToRm) {
    const newLibs = this.getAll().filter(lib => lib.latest !== libToRm.latest)
    this.save(newLibs)
    return newLibs
  }

  static save(libs) {
    localStorage.setItem(local_name, JSON.stringify(libs))
  }

  static getAll() {
    const local = localStorage.getItem(local_name);
    const libs = local ? JSON.parse(local) : [];
    return libs
  }
}