let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

// 參數一 要控制的對象
// 參數二 經過的時間
// 參數三 控制對象的原始狀態
// 參數四 控制對象的動畫結束後的狀態
// 參數五 要提前多久時間執行
time_line.fromTo(hero, 1, {height: "0%"}, {height: "100%", ease: Power2.easeInOut}).fromTo(hero, 1.2, {width: "80%"}, {width: "100%", ease: Power2.easeInOut}).fromTo(slider, 1, {x: "-100%"}, {x: "0%", ease: Power2.easeInOut}, "-=1.2").fromTo(animation, 0.3, {opacity: 1}, {opacity: 0});

setTimeout(() => {
  animation.style.pointerEvents = "none"
});

// 讓整個網站的 enter key 都無法使用
window.addEventListener("keypress", (e) => {
  if(e.key == "Enter"){
    e.preventDefault();
  };
});

// 防止 form 內部的 button 交出表單
let buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});


// 選擇 select 內的 option 之後，改變相對應的顏色及改變 GPA 分數
let allSelects = document.querySelectorAll("select");
allSelects.forEach(select => {
  select.addEventListener("change", (e) => {
    setGPA();
    // change 這個 type 擁有 target 這個屬性
    changeColor(e.target);
  });
});

// 改變 credit 內的 數字 之後，改變 GPA 分數
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", (e) => {
    setGPA();
  });
});

// 設定相對應的顏色
function changeColor(target) {
  if(target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  }else if(target.value == "B+" || target.value == "B" || target.value == "B-") {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  }else if(target.value == "C+" || target.value == "C" || target.value == "C-") {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  }else if(target.value == "D+" || target.value == "D" || target.value == "D-") {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  }else if(target.value == "F") {
    target.style.backgroundColor = "gray";
    target.style.color = "white";
  }else {
    target.style.backgroundColor = "white";
  }};

// 分數換算
function transferGrade(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

// GPA 換算
// credit（學分） * 分數 = 分子
// credit（學分） 總和 = 分母
function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0; // 分子
  let sumCredit = 0; // 分母
  let result = document.getElementById("result-gpa"); // GPA 換算結果
  
  // 計算分母
  for(let i = 0; i < credits.length; i++) {
    if(!isNaN(credits[i].valueAsNumber)) {
      sumCredit += credits[i].valueAsNumber;
    }
  }

  // 計算分子
  for(let i =0; i < formLength; i++) {
    if(!isNaN(credits[i].valueAsNumber)) {
      sum += transferGrade(selects[i].value) * credits[i].valueAsNumber;
    }
  }
  
  if(sumCredit == 0) {
    // 如果分母是 0 除出來會是 NaN
    result.innerText = (0.00).toFixed(2);
  }else {
    result.innerText = (sum / sumCredit).toFixed(2);
  }
  
  return result.innerText;
}


// 新增 form
let addButton = document.querySelector(".plus-button");
// console.log(addButton);

addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("placeholder", "class category");
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credit");
  newInput3.addEventListener("change", () => {
    setGPA();
  });


  // 製作 select 選項
  let newSelect = document.createElement("select");
  newSelect.setAttribute("neame", "select");
  newSelect.classList.add("select");
  let opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  let opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  let opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  let opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  let opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  let opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  let opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  let opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  let opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  let opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  let opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  let opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  let opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);
  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });


  // 製作垃圾桶
  let newTrash = document.createElement("button");
  newTrash.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newTrash.appendChild(newItag);
  // newTrash 的刪除動畫效果
  newTrash.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation = "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener("animationend", (e) => {
      e.target.remove();
      setGPA();
    });
  });

  
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newTrash);

  newForm.appendChild(newDiv);
  
  document.querySelector(".all-inputs").appendChild(newForm);

  // newForm 的新增動畫效果
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});


// 垃圾桶 刪除功能
let trashs = document.querySelectorAll(".trash-button");
trashs.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove");
  });
});
// 垃圾桶 的刪除動畫效果
trashs.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
  });
});

// 排序程式碼
let btn1 = document.querySelector(".sort-descending"); // 大到小
let btn2 = document.querySelector(".sort-ascending"); // 小到大

btn1.addEventListener("click", () => {
  handleSorting("descending"); // 大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); // 小到大
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];


  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; // class category
    let class_number = graders[i].children[1].value; // class number
    let class_credit = graders[i].children[2].value; // class credit
    let class_grader = graders[i].children[3].value; // class grader

    // console.log(class_name, class_number, class_credit, class_grader);

    if(!(class_name == "" && class_number == "" && class_credit == "" && class_grader == "")) {
      let newArry = {
        class_name, class_number, class_credit, class_grader
      };
      // console.log(newArry);
      objectArray.push(newArry);
    };
  };
  // console.log(objectArray);

  // 取 objectArray 後，新增新屬性 class_grader_number 並賦予值
  // 將成績 class_grader 的型別從 string to number
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grader_number = transferGrade(objectArray[i].class_grader);
  };
  // console.log(objectArray);
  
  // 將 array 進行排序
  objectArray = mergeSort(objectArray);
  // 此處的 direction 是 fn handleSorting 的參數
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  };
  // console.log(objectArray);

  // 根據 objectArray 的內容，來更新網頁
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";
  
  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
      <input type="text" placeholder="class category" class="class-type" list="opt" value=${objectArray[i].class_name} ><!--
      --><input type="text" placeholder="class number" class="class-number" value=${objectArray[i].class_number}><!--
      --><input type="number" placeholder="credits" class="class-credit" min="0" max="6" value=${objectArray[i].class_credit}><!--
      --><select name="select" class="select" value=${objectArray[i].class_grader}>
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option>
      </select><!--
      --><button class="trash-button">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </form>`;
  };

  // select 可以用 JS 改
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grader;
  };

  // select 監聽事件及改色
  let allSelects = document.querySelectorAll("select");
  allSelects.forEach(select => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      changeColor(e.target);
      setGPA();
    });
  });

  // credit 監聽事件
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach(credit => {
    credit.addEventListener("change", (e) => {
      setGPA();
    });
  });

  // trash 監聽事件
  let allTrashs = document.querySelectorAll(".trash-button");
  allTrashs.forEach(trash => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation = "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener("animationend", (e) => {
        e.target.remove();
        setGPA();
      });
    });
  });

  // 左右兩邊的 array 進行比大小 
  function merge(a1, a2) {
    let result = [];
    let i = 0;
    let j = 0;
    
    while (i < a1.length && j < a2.length) {
      if (a1[i].class_grader_number > a2[j].class_grader_number) {
        result.push(a2[j]);
        j++;
      } else {
        result.push(a1[i]);
        i++;
      };
    };
    
    while (i < a1.length) {
      result.push(a1[i]);
      i++;
    };
    while (j < a2.length) {
      result.push(a2[j]);
      j++;
    };
    
    return result;
  };
  
  // 將原有的 array 拆成兩個 array 讓左右去比較
  function mergeSort(arr) {
    // 如果 array 的長度是 0
    if (arr.length == 0) {
      return;
    };
    // 如果 array 的長度是 1 ， return 他自己
    if (arr.length == 1) {
      return arr;
    } else {
      // 取 array 的總長的一半
      let middle = Math.floor(arr.length / 2);
      // 左邊的 array 從 index 0 到 index middle
      let left = arr.slice(0, middle);
      // 右邊的 array 從 index middle 到 index 最後
      let right = arr.slice(middle, arr.length);
      // 執行 fn merge(a1,a2)
      return merge(mergeSort(left), mergeSort(right));
    };
  };
};
