function formatDate(newDate) {
  const months = {
    0: "Styczeń",
    1: "Luty",
    2: "Marzec",
    3: "Kwiecień",
    4: "Maj",
    5: "Czerwiec",
    6: "Lipiec",
    7: "Sierpień",
    8: "Wrzesień",
    9: "Październik",
    10: "Listopad",
    11: "Grudzień",
  };
  const days = ["Niedz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];

  const d = new Date(newDate + 7);
  const year = d.getFullYear();
  const date = d.getDate();
  const monthIndex = d.getMonth();
  const monthName = months[d.getMonth()];
  const dayName = days[d.getDay()]; // Thu
  const formatted = `${dayName}, ${date}-${monthIndex + 1}-${year}`;

  return formatted.toString();
}
export default formatDate;
