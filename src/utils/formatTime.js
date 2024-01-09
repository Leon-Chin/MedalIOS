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

export const DateToMonthDay = (date, intl) => {
    // Get the individual components of the date and time
    // const month = Date.getMonth() + 1;
    // const day = Date.getDate();
    // Format the components into a readable time string
    const handledDate = new Date(date)
    if (intl === "zh") {
        return new Intl.DateTimeFormat('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(handledDate);
    } else {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(handledDate);
    }
    // return `${month}月${day}日`
}

export const formatTimeToChinese = (dateNeedConvert) => {
    const date = new Date(dateNeedConvert)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份是从0开始的，需要加1
    const day = date.getDate();

    const chineseDate = `${year}-${month}-${day}`;
    return chineseDate;
}

export const formatTimeForCharts = (dateNeedConvert) => {
    const today = new Date()
    const todayYear = today.getFullYear()
    const date = new Date(dateNeedConvert)
    const year = date.getFullYear();
    const isCurrentYear = todayYear === year
    const month = date.getMonth() + 1; // 月份是从0开始的，需要加1
    const day = date.getDate();
    const returnDate = !isCurrentYear ? `${year}-${month}-${day}` : `${month}-${day}`;
    return returnDate;
}

export const formatTimeForChartSoloItem = (dateNeedConvert) => {
    const today = new Date()
    const todayYear = today.getFullYear()
    const date = new Date(dateNeedConvert)
    const year = date.getFullYear();
    const isCurrentYear = todayYear === year
    const month = date.getMonth() + 1; // 月份是从0开始的，需要加1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const returnDate = !isCurrentYear ? `${year}-${month}-${day} ${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}` : `${month}-${day} ${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}`;
    return returnDate;
}

export const formatTimeToInternational = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份是从0开始的，需要加1
    const day = date.getDate();
    const internationalDate = `${day}/${month}/${year}`;
    return internationalDate;
}