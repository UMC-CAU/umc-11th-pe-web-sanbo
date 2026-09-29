const student = {
  name: "정민",
  skills: ["HTML", "CSS", "JavaScript"],
};

function printSkills(skills) {
  for (const skill of skills) {
    if (skill === "JavaScript") {
      console.log(`${skill}: 화면에 동작을 더합니다.`);
    } else {
      console.log(skill);
    }
  }
}

console.log(student.name);
printSkills(student.skills);

const message = document.querySelector("#message");
const greetingButton = document.querySelector("#greeting-button");

greetingButton.addEventListener("click", function () {
  message.textContent = "웹 개발을 시작합니다!";
});

const button = document.querySelector("#start-button");

button.addEventListener("click", function () {
  console.log("시작합니다!");
});
