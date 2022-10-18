import { useEffect, useState } from "react";

function NavFunction() {
  const [mainArray, setMainArray] = useState([]);

  const [specArray, setSpecArray] = useState([]);

  const [copyMainArray, setCopyMainArray] = useState([]);

  const [copySpecArray, setCopySpecArray] = useState([]);

  const [phoneName, setPhoneName] = useState([]);

  function format(strs) {
    //声明left变量用于存放html标签中左尖括号（‘<’）位置
    var left = null;
    //声明right变量用于存放html标签中右尖括号（‘>’）位置
    var right = null;
    //声明str变量，用于存放格式化后的代码字符串
    var str = "";
    //存放html代码所进所用的空格
    var blank = "  ";
    //存放若干个blank变量，用于控制代码缩进的深度
    var fmt = [];

    //存入标签
    var tag = [];

    // 换行
    var switchs = false;

    var outString = "";

    var switchTwo = false;

    var switchThree = [];

    //对需要格式化的代码字符串进行遍历
    for (var i = 0; i < strs.length; i++) {
      //发现左尖括号后将其位置记录在left变量上
      if (strs[i] == "<") {
        left = i;

        if (strs[left + 1] !== "/") {
          for (let m = left; m < strs.length; m++) {
            if (strs[m] === " " || strs[m] === ">") {
              tag.push(strs.slice(left + 1, m));
              break;
            }
          }
        }
      } else if (strs[i] == ">") {
        //发现右尖括号后将其记录在right变量上
        right = i;
      }
      //当做尖括号右尖括号都记录了一个位置后，说明二者之间的内容为代码的一行
      if (typeof left == "number" && typeof right == "number") {
        //判断字符串<号后是否为‘/’，如果满足，表明该行代码为双标签的闭合标签
        for (var j = right; j < strs.length; j++) {
          if (strs[j] == "<") {
            if (strs[j + 1] == "/") {
              switchs = true;
            } else {
              switchs = false;
            }
            //去掉文本中多余的空格
            outString = strs.slice(right + 1, j).trim();
            break;
          }
        }

        if (strs[left + 1] !== "/" && switchs == false && outString == "") {
          if (switchThree?.includes("c") && switchThree?.includes("f")) {
            fmt.push(blank);
            str += fmt.join("") + strs.slice(left, right + 1);
            fmt.push(blank);
            str += "\n";
            switchTwo = true;
            switchThree = [];
          } else {
            str += fmt.join("") + strs.slice(left, right + 1);
            fmt.push(blank);
            str += "\n";
            switchTwo = true;
            switchThree = [];
          }
        }

        if (strs[left + 1] !== "/" && switchs == true && outString !== "") {
          if (switchTwo) {
            str += fmt.join("") + strs.slice(left, right + 1) + outString;
            switchThree.push("c");
          } else {
            if (!switchThree.includes("c")) {
              if (switchThree.includes("f")) {
                str += fmt.join("") + strs.slice(left, right + 1) + outString;
                fmt.pop(blank);
                switchThree.push("c");
              }
            } else {
              fmt.push(blank);
              str += fmt.join("") + strs.slice(left, right + 1) + outString;
              fmt.pop(blank);
              switchThree.push("c");
            }
          }
        }

        if (strs[left + 1] !== "/" && switchs == true && outString == "") {
          str += fmt.join("") + strs.slice(left, right + 1);
          switchTwo = false;
          switchThree = [];
        }

        if (strs[left + 1] !== "/" && switchs == false && outString !== "") {
          if (!switchTwo) {
            fmt.push(blank);
          }
          str += fmt.join("") + strs.slice(left, right + 1) + outString;
          str += "\n";
          fmt.push(blank);
          switchTwo = false;
          switchThree = [];
        }

        if (strs[left + 1] == "/" && strs[right + 2] !== "/") {
          fmt.pop();
          str += fmt.join("") + strs.slice(left, right + 1);
          str += "\n";
          switchTwo = false;
          switchThree.push("f");
        }

        if (strs[left + 1] == "/" && strs[right + 2] == "/") {
          str += strs.slice(left, right + 1);
          str += "\n";
          switchTwo = false;
          switchThree = [];
        }
        //重置left、right的值，用于for循环的下次存储做右尖括号的位置
        left = null;
        right = null;
      }
    }
    //返回得到的格式化完成的html代码字符串
    return str;
  }

  let phoneMessage;
  let name = [];
  let outArray = [];

  //   const body = document.querySelector("body");
  //   竖线
  const htmlLine = () => {
    return `<span class="im-space">|</span>`;
  };

  //   点击按钮
  function userClick(val) {
    let phone = [];
    let country = val.Country;
    let over = val.Overview;
    let spec = val.Spec;

    console.log(val);
    console.log(phoneName);

    val.product.forEach((item) => {
      name.push(item.first);
      phoneName?.push(item.first);
      if (item.last) {
        phone?.push(item.last);
      } else {
        phone?.push(item.first.replace(/\s+/g, "-").toLowerCase());
      }
    });
    console.log(phoneName);

    setPhoneName(...phoneName);

    // country = document.querySelector(".country").value;
    phoneMessage = generateCountryUrl(country, phone);
    return result(country, phone, over, spec);
  }

  //   生成手机link
  const generateCountryUrl = (country, phone) => {
    const urlArr = [];
    if (country) {
      phone.forEach((item) => {
        urlArr.push(`/${country}/smartphone/${item}`);
      });
    } else {
      phone.forEach((item) => {
        urlArr.push(`/smartphone/${item}`);
      });
    }
    return urlArr;
  };

  //   生成html结构

  // overview部分

  const overview = (over, spec, link) => {
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

  const specFun = (over, spec, link) => {
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
      arrray.push(`<li><a href="${item}">${name[index]}</a></li>`);
    });
    const temp = arrray.splice(key, 1);
    arrray.unshift(temp[0]);
    return arrray.join().replace(/,/g, "");
  };

  const otherList = () => {
    const arr = [];
    name.forEach((item, index) => {
      arr.push(`<a href="${phoneMessage[index]}" class="title-nav other"> ${item} </a>`);
    });
    return arr;
  };

  const nowList = (index) => {
    return `
           <div class="title-nav now">
               ${name[index]}
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
      main += overview(over, spec, item);

      specs += specFun(over, spec, item);

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

    setMainArray(...mainArray);
    setSpecArray(...specArray);

    setCopyMainArray(...copyMainArray);
    setCopySpecArray(...copySpecArray);
    return { mainArray, specArray, copyMainArray, copySpecArray, phoneName };
  };

  return { userClick };
}

export default NavFunction;
