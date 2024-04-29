export const addMonths = (monthsToAdd : number) => {
    const newDate = new Date();

    const currentMonth = newDate.getMonth();
    const newMonth = currentMonth + monthsToAdd;

    const newYear = newDate.getFullYear() + Math.floor(newMonth / 12);
    const adjustedMonth = newMonth % 12;

    newDate.setFullYear(newYear);
    newDate.setMonth(adjustedMonth);

    return newDate;
}