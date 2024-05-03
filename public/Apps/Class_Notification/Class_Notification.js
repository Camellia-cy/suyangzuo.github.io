const 信息提供区 = document.querySelector("#信息提供区");
const 标签区集合 = 信息提供区.querySelectorAll(".标签区");
const 生成截图按钮 = document.getElementById("生成截图");
const 截图生成区 = document.getElementById("截图生成区");
const 随机回复复选框 = document.getElementById("随机生成回复");
const 分割回复时间复选框 = document.getElementById("分割回复时间");
const 颜色模式复选框 = document.getElementById("颜色模式");
const 回复词集合 = [
  "已收到",
  "收到",
  "已知悉",
  "收到了",
  "好的老师",
  "收到！",
  "明白！",
];

let 随机回复 = false;
let 分割回复时间 = true;
let 颜色模式 = "dark";

if (localStorage.getItem("随机回复") === null) {
  localStorage.setItem("随机回复", 随机回复.toString());
} else {
  随机回复 = JSON.parse(localStorage.getItem("随机回复"));
  随机回复复选框.checked = 随机回复;
}

if (localStorage.getItem("分割回复时间") === null) {
  localStorage.setItem("分割回复时间", 分割回复时间.toString());
} else {
  分割回复时间 = JSON.parse(localStorage.getItem("分割回复时间"));
  分割回复时间复选框.checked = 分割回复时间;
}

if (localStorage.getItem("颜色模式") === null) {
  localStorage.setItem("颜色模式", 颜色模式);
} else {
  颜色模式 = localStorage.getItem("颜色模式");
  颜色模式复选框.checked = 颜色模式 === "light";
  if (颜色模式复选框.checked) {
    截图生成区.setAttribute("浅色模式", "");
  } else {
    截图生成区.removeAttribute("浅色模式");
  }
}

随机回复复选框.addEventListener("input", () => {
  随机回复 = 随机回复复选框.checked;
  localStorage.setItem("随机回复", 随机回复.toString());
});

分割回复时间复选框.addEventListener("input", () => {
  分割回复时间 = 分割回复时间复选框.checked;
  localStorage.setItem("分割回复时间", 分割回复时间.toString());
});

颜色模式复选框.addEventListener("input", () => {
  颜色模式 = 颜色模式复选框.checked ? "light" : "dark";
  if (颜色模式复选框.checked) {
    截图生成区.setAttribute("浅色模式", "");
  } else {
    截图生成区.removeAttribute("浅色模式");
  }
  localStorage.setItem("颜色模式", 颜色模式);
});

生成截图按钮.addEventListener("click", 生成截图);

function 生成截图() {
  for (const 标签区 of 标签区集合) {
    const 输入框 = 标签区.querySelector(".输入框");
    const 标签 = 标签区.querySelector(".标签");
    if (
      (输入框.value === null || 输入框.value === "") &&
      输入框.id !== "回复者姓名后缀"
    ) {
      return;
    }
  }

  截图生成区.innerHTML = "";

  const 班级名称区 = document.createElement("div");
  班级名称区.className = "班级名称区";
  截图生成区.appendChild(班级名称区);

  const 时间区 = document.createElement("h6");
  时间区.className = "时间区";
  const 当前日历时间 = Date.now();
  let 当前日期 = new Date(当前日历时间);
  const 小时 = 当前日期.getHours();
  const 分钟 = 当前日期.getMinutes();
  const 小时文本 = 小时 < 10 ? `0${小时}` : 小时.toString();
  const 分钟文本 = 分钟 < 10 ? `0${分钟}` : 分钟.toString();
  时间区.textContent = `${小时文本}:${分钟文本}`;
  截图生成区.appendChild(时间区);

  const 班级名称输入框 = document.getElementById("班级名称");
  const 班级名称 = 班级名称输入框.value;

  const 班级人数输入框 = document.getElementById("班级人数");
  const 班级人数 = 班级人数输入框.value;

  班级名称区.textContent = `${班级名称} (${班级人数})`;

  const 班主任姓名输入框 = document.getElementById("班主任姓名");
  const 班主任姓名 = 班主任姓名输入框.value;

  const 通知信息输入框 = document.getElementById("通知信息");
  const 通知信息 = 通知信息输入框.value;

  生成个人信息(班主任姓名, 通知信息);

  const 学生姓名输入框 = document.getElementById("学生姓名");
  const 学生姓名 = 学生姓名输入框.value;
  const 姓名集合 = 学生姓名.split("，");

  const 后缀输入框 = document.getElementById("回复者姓名后缀");
  const 后缀字符串 = 后缀输入框.value;
  const 后缀集合 = 后缀字符串.split("，");

  let 时间段数 = 0;
  let 最大值 = 0;
  let 最小值 = 0;
  if (姓名集合.length <= 5) {
    最小值 = 0;
    最大值 = 1;
  } else if (姓名集合.length <= 10) {
    最小值 = 1;
    最大值 = 3;
  } else if (姓名集合.length <= 20) {
    最小值 = 3;
    最大值 = 5;
  } else if (姓名集合.length <= 30) {
    最小值 = 3;
    最大值 = 7;
  } else if (姓名集合.length <= 40) {
    最小值 = 4;
    最大值 = 8;
  } else {
    最小值 = 5;
    最大值 = 10;
  }
  时间段数 = Math.floor(Math.random() * (最大值 - 最小值 + 1) + 最小值);

  let 发送时间使用计数 = 0;
  for (const 姓名 of 姓名集合) {
    const 回复索引 = Math.floor(Math.random() * 回复词集合.length);
    const 回复信息 = 随机回复复选框.checked ? 回复词集合[回复索引] : "已收到";

    const 后缀索引 = Math.floor(Math.random() * 后缀集合.length);
    const 后缀 = 后缀集合[后缀索引];

    生成个人信息(`${姓名}${后缀}`, 回复信息);

    const 需要添加时间 =
      Math.floor(Math.random() * (最大值 - 最小值 + 1) + 最小值) === 最大值;
    if (!分割回复时间复选框.checked) continue;
    if (!需要添加时间) continue;
    if (++发送时间使用计数 > 时间段数) continue;
    if (姓名集合.indexOf(姓名) === 姓名集合.length - 1) break;

    const 时间分区 = document.createElement("h6");
    时间分区.className = "时间区";
    当前日期 = new Date(
      当前日期.getTime() +
        Math.floor(Math.random() * (1800 - 180) + 180) * 1000,
    );
    const 新小时 = 当前日期.getHours();
    const 新分钟 = 当前日期.getMinutes();
    const 新小时文本 = 新小时 < 10 ? `0${新小时}` : 新小时.toString();
    const 新分钟文本 = 新分钟 < 10 ? `0${新分钟}` : 新分钟.toString();
    时间分区.textContent = `${新小时文本}:${新分钟文本}`;
    截图生成区.appendChild(时间分区);
  }

  截图生成区.querySelectorAll(".个人区").item(0).classList.add("班主任区");
}

function 生成个人信息(name, info) {
  const 个人区 = document.createElement("div");
  个人区.className = "个人区";
  截图生成区.appendChild(个人区);

  const 头像区 = document.createElement("figure");
  头像区.className = "头像区";
  const 头像 = document.createElement("img");
  头像.className = "头像";
  const 头像号码 = Math.floor(Math.random() * 100 + 1);
  头像.src = `./Images/头像/${头像号码}.jpg`;
  头像.alt = "头像";
  头像区.appendChild(头像);

  const 姓名内容区 = document.createElement("div");
  姓名内容区.className = "姓名内容区";

  const 姓名区 = document.createElement("span");
  姓名区.className = "姓名区";

  姓名区.textContent = name;
  const 内容区 = document.createElement("内容区");
  内容区.className = "内容区";
  内容区.textContent = info;
  姓名内容区.append(姓名区, 内容区);

  个人区.append(头像区, 姓名内容区);
}
