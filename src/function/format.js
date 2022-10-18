/**
 * 代码格式化
 * @param {*} strs
 * @returns
 */
function Format(strs) {
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
    if (strs[i] === "<") {
      left = i;

      if (strs[left + 1] !== "/") {
        for (let m = left; m < strs.length; m++) {
          if (strs[m] === " " || strs[m] === ">") {
            tag.push(strs.slice(left + 1, m));
            break;
          }
        }
      }
    } else if (strs[i] === ">") {
      //发现右尖括号后将其记录在right变量上
      right = i;
    }
    //当做尖括号右尖括号都记录了一个位置后，说明二者之间的内容为代码的一行
    if (typeof left === "number" && typeof right === "number") {
      //判断字符串<号后是否为‘/’，如果满足，表明该行代码为双标签的闭合标签
      for (var j = right; j < strs.length; j++) {
        if (strs[j] === "<") {
          if (strs[j + 1] === "/") {
            switchs = true;
          } else {
            switchs = false;
          }
          //去掉文本中多余的空格
          outString = strs.slice(right + 1, j).trim();
          break;
        }
      }

      if (strs[left + 1] !== "/" && switchs === false && outString === "") {
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

      if (strs[left + 1] !== "/" && switchs === true && outString !== "") {
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

      if (strs[left + 1] !== "/" && switchs === true && outString === "") {
        str += fmt.join("") + strs.slice(left, right + 1);
        switchTwo = false;
        switchThree = [];
      }

      if (strs[left + 1] !== "/" && switchs === false && outString !== "") {
        if (!switchTwo) {
          fmt.push(blank);
        }
        str += fmt.join("") + strs.slice(left, right + 1) + outString;
        str += "\n";
        fmt.push(blank);
        switchTwo = false;
        switchThree = [];
      }

      if (strs[left + 1] === "/" && strs[right + 2] !== "/") {
        fmt.pop();
        str += fmt.join("") + strs.slice(left, right + 1);
        str += "\n";
        switchTwo = false;
        switchThree.push("f");
      }

      if (strs[left + 1] === "/" && strs[right + 2] === "/") {
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
export default Format;
