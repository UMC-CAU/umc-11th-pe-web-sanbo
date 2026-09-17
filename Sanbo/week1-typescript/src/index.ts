type StudyMember = {
  id: number;
  name: string;
  role: "leader" | "member";
  githubId?: string;
};

const members: StudyMember[] = [
  { id: 1, name: "정민", role: "member", githubId: "Sanbo" },
  { id: 2, name: "준빈", role: "leader" },
];

const foundMember = (id: number) => {
  return members.find((member) => member.id === id);
};

const printResult = (id: number) => {
  const member = foundMember(id);

  if (!member) {
    console.log(id + " does not exist.");
    return;
  }
  console.log("id: " + member.id);
  console.log("name: " + member.name);
  console.log("role: " + member.role);
  console.log("githubID: " + (member.githubId ?? "does not exist"));
};

printResult(1);
printResult(2);
printResult(999);
