import MakeCode from "./makeCode";

function NavFunction() {
  function userClick(val) {
    let phone = [];
    let phoneName = [];
    let country = val.Country;
    let over = val.Overview;
    let spec = val.Spec;
    let names = [];

    val.product.forEach((item) => {
      names.push(item.first);
      phoneName?.push(item.first);
      if (item.last) {
        phone?.push(item.last);
      } else {
        phone?.push(item.first.replace(/\s+/g, "-").toLowerCase());
      }
    });

    return MakeCode(country, phone, over, spec, names);
  }

  return { userClick };
}

export default NavFunction;
