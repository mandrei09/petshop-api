export const calculateAge = async (birthDate: Date) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthYear = birthDate.getFullYear();

    let age = currentYear - birthYear;

    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
    const currentDay = currentDate.getDate();
    const birthDay = birthDate.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }

    return age;
}
