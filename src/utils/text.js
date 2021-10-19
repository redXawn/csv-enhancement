export const rupiah = (nominal) => {
  return "Rp" + nominal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};
