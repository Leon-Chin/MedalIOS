import { useIntl } from "react-intl";

//计算平均数
export const calculateBMI = (weight, height) => {//weight kg 身高 cm
const convertedHeight = parseFloat(height) / 100
const heightSquare = convertedHeight * convertedHeight;
const BMI = parseFloat(weight) / heightSquare
return parseFloat(BMI.toFixed(2));
}

export const BMISort = (bmi) => {
    const { formatMessage } = useIntl()
if (bmi < 18.5) {

return formatMessage({ id: 'app.statistic.bmiLvl.underWt' });

} else if (bmi >= 18.5 && bmi <= 24.9) {

return formatMessage({ id: 'app.statistic.bmiLvl.norWt' });

} else if (bmi >= 25 && bmi <= 29.9) {

return formatMessage({ id: 'app.statistic.bmiLvl.overWt' });

} else {

return formatMessage({ id: 'app.statistic.bmiLvl.obesity' });

}

}