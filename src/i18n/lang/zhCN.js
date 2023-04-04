/**
 * Created by PhpStorm.
 * User: Devmc
 * Date: 2023/3/22
 * Time: 14:46
 */

export default {
    functions: {
        calender: "日历",
        charts: "统计",
        relations: "朋友",
        create: "注册",
        login: "登录",
        logout: "退出登录",
        profile: "信息"
    },
    profile: {
        username: "用户名",
        email: "电子邮箱",
        birthday: "生日",
        height: "身高",
        weight: "体重",
        gender: "性别",
        password: "密码",
        update: "更新信息",
        remark: "备注",
        updateRemark: "更新备注"
    },
    sign: {
        loginTitle: "欢迎回来！",
        login: "登录",
        logout: "退出登录",
        remember: "记住密码",
        register: "立即注册",
        skip: "跳过",
        update: "更新",
        toRegister: "没有账号？立即注册！",
        registerTitle: "创建账号！",
        toLogin: "已有帐号? 立即登录！",
        policyStart: "我已阅读并同意",
        policy: "《隐私政策》",
        policyEnd: "。",
        completeTitle: "完善信息！",
    },
    charts: {
        time: {
            d7: "最近7天",
            d14: "最近14天",
            m1: "最近1月",
            m3: "最近3月",
            custom: "自定义"
        },
        face: {
            great: "很棒",
            good: "不错",
            normal: "正常",
            worse: "不好",
            unknown: "未知"
        },
        title: "血糖满意度评分",
        note: "注意：添加详细饮食后才能显示数据，下面是碳水化合物摄入量。",
        chartTitle: " %{time}的图表",
        export: "导出",
        select: {
            title: "选择时间",
            startTime: "选择开始时间",
            endTime: "选择结束时间",
            cancel: "取消",
            confirm: "确定"
        },
        remark: "评价: ",
        noRemark: "无评价",
        carbohydrate: "碳水化合物",
        satisfaction: "血糖满意度"
    },
    relations: {
        friends: "朋友",
        newFriends: "新朋友",
        searchUser: "搜索用户",
        waitingFor: "等待对方验证",
        agree: "同意",
        refuse: "拒绝",
        add: "添加",
        noData: "暂无数据"
    },
    calender: {
        beforeDawn: '早上',
        breakfast: '早餐',
        lunch: '午餐',
        supper: '晚餐',
        nightSnack: '夜宵',
        clickToAdd: "点击添加食物...",
        totalCarbs: "总碳水量：",
        publish: {
            title: "发布",
            time: "时间",
            name: "标题",
            cancel: "取消",
            confirm: "确定"
        },
        carbsPerQuantity: "每 %{amount}%{unit} %{name}包含 %{carbs}g 碳水化合物",
        canAddRemark: "您可以在此处添加就餐评价",
        rating: "血糖满意度评分"
    },
    validator: {
        username: "用户名长度在4-12个字符之间",
        password: "密码长度在6-20个字符之间",
        email: "电子邮件格式不正确",
    },
    message: {
        loginSuccess: "登录成功",
        registerSuccess: "注册成功",
        updateSuccess: "更新成功",
        logoutSuccess: "退出登录成功",
        operationSuccess: "操作成功",
        completeForm: "请完善表格",
        agreeToPolicyFirst: "请同意隐私政策",
        heightMustGe0: "身高必须大于0",
        weightMustGe0: "体重必须大于0",
        selectDate: "请选择日期",
        endTimeGeToday: '结束时间不能大于今天',
        startTimeLeEndTime: '开始时间需要小于结束时间',
        applySuccess: '申请成功',
        saveSuccess: "保存成功",
        networkAnomaly: "网络异常",
        publishSuccess: "发布成功"
    }
};