const ERROR_MESSAGE = { type: "error", text1: '出现异常请稍后重试', topOffset: 50 };
const AlreadyHave_MESSAGE = { type: "info", text1: '今日已有这个训练了', topOffset: 50 };
const AddSuccess_MESSAGE = { type: "success", text1: '添加成功', topOffset: 50 };
const FavorSuccess_MESSAGE = { type: "success", text1: '收藏成功', topOffset: 50 };
const AlreadyEvaluation_MESSAGE = { type: "success", text1: '已经提交评估，将为您生成个性化推荐', topOffset: 50 };
const NothingInput_MESSAGE = { type: "error", text1: '您未作出选择, 无法为您更新', topOffset: 50 };
const PleaseInput_MESSAGE = { type: "info", text1: '请输入有效信息', topOffset: 50 };
const PleaseInputSearchContent_MESSAGE = { type: "info", text1: '请输入你所要查找的内容', topOffset: 50 };
const PublicSuccess_MESSAGE = { type: "info", text1: '发布成功', topOffset: 50 };
const CanNotFinish_MESSAGE = { type: "error", text1: '时间过短｜步数过少, 数据太小无法记录', topOffset: 50 };
const ThanksForFeedback_MESSAGE = { type: "success", text1: '感谢您的反馈', topOffset: 50 };
const AlreadyFavorTutorial_MESSAGE = { type: "success", text1: '您已收藏此教程', topOffset: 50 };


const ERROR_Alert = (content) => {
    return { type: "error", text1: content, topOffset: 50 };
}

const INFO_Alert = (content) => {
    return { type: "info", text1: content, topOffset: 50 };
}

const SUCCESS_Alert = (content) => {
    return { type: "success", text1: content, topOffset: 50 };
}


export {
    ERROR_Alert,
    INFO_Alert,
    SUCCESS_Alert,
    PleaseInput_MESSAGE,
    FavorSuccess_MESSAGE,
    AlreadyFavorTutorial_MESSAGE,
    ERROR_MESSAGE,
    ThanksForFeedback_MESSAGE,
    CanNotFinish_MESSAGE,
    PublicSuccess_MESSAGE,
    AlreadyHave_MESSAGE,
    AddSuccess_MESSAGE,
    AlreadyEvaluation_MESSAGE,
    NothingInput_MESSAGE,
    PleaseInputSearchContent_MESSAGE,
}
