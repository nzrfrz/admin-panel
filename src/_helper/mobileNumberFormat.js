// Format mobile number without area code
export const mobileNumberFormat = (number) => {
    let numToString = number.toString();
    let firstThree = numToString.slice(0, 3);
    let secondThree = numToString.slice(3, 6);
    let thirdThree = numToString.slice(6, 9);
    let lastNumber = numToString.slice(9);

    if (lastNumber.length > 0) return [firstThree, secondThree, thirdThree, lastNumber].join("-");
    return [firstThree, secondThree, thirdThree].join("-");
};