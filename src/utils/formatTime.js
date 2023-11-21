export const FormattedTime = (Date) => {
    // Get the individual components of the date and time
    const year = Date.getFullYear();
    const month = Date.getMonth() + 1;
    const day = Date.getDate();
    const hours = Date.getHours();
    const minutes = Date.getMinutes();
    // Format the components into a readable time string
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const DateToMonthDay = (Date) => {
    // Get the individual components of the date and time
    const month = Date.getMonth() + 1;
    const day = Date.getDate();
    // Format the components into a readable time string
    return `${month}月${day}日`
}

export const formatTimeToChinese = (dateNeedConvert) => {
    const date = new Date(dateNeedConvert)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份是从0开始的，需要加1
    const day = date.getDate();

    const chineseDate = `${year}-${month}-${day}`;
    return chineseDate;
}

export const formatTimeToInternational = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份是从0开始的，需要加1
    const day = date.getDate();
    const internationalDate = `${day}/${month}/${year}`;
    return internationalDate;
}