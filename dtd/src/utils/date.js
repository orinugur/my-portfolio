export function getToday() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    date: now.getDate(),
  };
}

export function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  const matrix = [];
  let week = new Array(7).fill(0);
  let day = 1;

  // 첫 주
  for (let i = firstDay; i < 7; i++) {
    week[i] = day++;
  }
  matrix.push([...week]);

  // 나머지 주
  while (day <= lastDate) {
    week = new Array(7).fill(0);
    for (let i = 0; i < 7 && day <= lastDate; i++) {
      week[i] = day++;
    }
    matrix.push([...week]);
  }
  return matrix;
}

export function getMonthName(month) {
  const names = [
    "",
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];
  return names[month];
}