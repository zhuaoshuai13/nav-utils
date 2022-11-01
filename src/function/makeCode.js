import format from "./format";

function MakeCode(country, phone = [], over, spec, names) {
  //   const [mainArray, setMainArray] = useState([]);

  //   const [specArray, setSpecArray] = useState([]);

  //   const [copyMainArray, setCopyMainArray] = useState([]);

  //   const [copySpecArray, setCopySpecArray] = useState([]);
  const mainArray = [];

  const specArray = [];

  const copyMainArray = [];

  const copySpecArray = [];

  //   竖线
  const htmlLine = () => {
    return `<span class="im-space">|</span>`;
  };

  //   生成手机link
  const generateCountryUrl = (country, phone) => {
    const urlArr = [];
    if (country) {
      phone?.forEach((item) => {
        urlArr.push(`/${country}/smartphone/${item}`);
      });
    } else {
      phone?.forEach((item) => {
        urlArr.push(`/smartphone/${item}`);
      });
    }
    return urlArr;
  };

  const phoneMessage = generateCountryUrl(country, phone);

  //   生成html结构

  // overview部分

  const overview = (link) => {
    return `
     <div class="overview now">
       <b class="nav-arrow"><i class="iconfont icon-arrow"></i></b>
       <ul>
       <li><a class="right" href="${link}">${over ? over : "OVERVIEW"}</a></li>
       <li><a href="${link}/specs">${spec ? spec : "SPECS"}</a></li>
       </ul>
     </div>
     `;
  };

  const specFun = (link) => {
    return `
     <div class="overview now">
       <b class="nav-arrow"><i class="iconfont icon-arrow"></i></b>
       <ul>
       <li><a href="${link}">${over ? over : "OVERVIEW"}</a></li>
       <li><a class="right" href="${link}/specs">${spec ? spec : "SPECS"}</a></li>
       </ul>
     </div>
     `;
  };

  const changeList = (key) => {
    const arrray = [];
    phoneMessage.forEach((item, index) => {
      arrray.push(`<li><a href="${item}">${names[index]}</a></li>`);
    });
    const temp = arrray.splice(key, 1);
    arrray.unshift(temp[0]);
    return arrray.join().replace(/,/g, "");
  };

  const otherList = () => {
    const arr = [];
    names.forEach((item, index) => {
      arr.push(`<a href="${phoneMessage[index]}" class="title-nav other"> ${item} </a>`);
    });
    return arr;
  };

  const nowList = (index) => {
    return `
           <div class="title-nav now">
               ${names[index]}
               <b class="nav-arrow"><i class="iconfont icon-arrow"></i></b>
               <ul>
                   ${changeList(index)}
               </ul>
           </div>
           `;
  };

  //   const f1 = document.querySelectorAll(".f1");

  //   总html
  const result = (country, phone, over, spec) => {
    phoneMessage.forEach((item, index) => {
      let main = `<div class="im-in-list">`;
      let specs = `<div class="im-in-list">`;
      for (let i = 0; i < phoneMessage.length; i++) {
        if (i === index) {
          main += nowList(i);
          if (i !== phoneMessage.length - 1) {
            main += htmlLine();
          }
          //    main += htmlLine();
        } else {
          main += otherList()[i];
          if (i !== phoneMessage.length - 1) {
            main += htmlLine();
          }
        }
      }
      for (let i = 0; i < phoneMessage.length; i++) {
        if (i === index) {
          specs += nowList(i);
          if (i !== phoneMessage.length - 1) {
            specs += htmlLine();
          }
          //    specs += htmlLine();
        } else {
          specs += otherList()[i];
          if (i !== phoneMessage.length - 1) {
            specs += htmlLine();
          }
        }
      }
      main += overview(item);

      specs += specFun(item);

      specs += `</div>`;

      main += `</div>`;

      const formatMain = format(main);
      const formatSpecs = format(specs);
      copyMainArray.push(formatMain);
      copySpecArray.push(formatSpecs);

      const showMain = formatMain.replace(/</g, "&lt;");
      const showSpecs = formatSpecs.replace(/</g, "&lt;");
      mainArray.push(showMain);
      specArray.push(showSpecs);
    });

    return { mainArray, specArray, copyMainArray, copySpecArray, names };
  };

  return result();
}

export default MakeCode;
