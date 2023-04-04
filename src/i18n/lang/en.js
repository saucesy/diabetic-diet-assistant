/**
 * Created by PhpStorm.
 * User: Devmc
 * Date: 2023/3/22
 * Time: 14:46
 */

export default {
    functions: {
        calender: "Calender",
        charts: "Charts",
        relations: "Relations",
        create: "Create",
        login: "Login",
        logout: "Logout",
        profile: "Profile"
    },
    profile: {
        username: "Username",
        email: "Email",
        birthday: "Birthday",
        height: "Height",
        weight: "Weight",
        gender: "Gender",
        password: "Password",
        update: "Update",
        remark: "Remark",
        updateRemark: "Update Remark"
    },
    sign: {
        loginTitle: "Welcome Back!",
        login: "Login",
        logout: "Logout",
        remember: "Remember Me",
        register: "Register Account",
        skip: "Skip",
        update: "Update",
        toRegister: "Create an Account",
        registerTitle: "Create an Account!",
        toLogin: "Already have an account? Login!",
        policyStart: "I've read and agreed to",
        policy: "Privacy Policy",
        policyEnd: ".",
        completeTitle: "Complete Profile!"
    },
    charts: {
        time: {
            d7: "Recent 7 days",
            d14: "Recent 14 days",
            m1: "Recent 1 month",
            m3: "Recent 3 months",
            custom: "Custom"
        },
        face: {
            great: "great",
            good: "good",
            normal: "normal",
            worse: "worse",
            unknown: "unknown"
        },
        title: "Blood glucose rating",
        note: "Note: Please add the diet in detail before displaying the data; Below the rating is the quality of carbohydrates intake.",
        chartTitle: "Chart for %{time}",
        export: "Export",
        select: {
            title: "Select Date",
            startTime: "Select start time",
            endTime: "Select end time",
            cancel: "Cancel",
            confirm: "Confirm"
        },
        remark: "Remark: ",
        noRemark: "No Remark",
        carbohydrate: "Carbohydrate",
        satisfaction: "Blood glucose satisfaction"
    },
    calender: {
        beforeDawn: 'Before Dawn',
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        supper: 'Supper',
        nightSnack: 'Night Snack',
        clickToAdd: "Click to add food...",
        totalCarbs: "Total carbs: ",
        publish: {
            title: "Publish",
            time: "Time",
            name: "Title",
            cancel: "Cancel",
            confirm: "Confirm"
        },
        carbsPerQuantity: "%{carbs}g carbs per %{amount}%{unit} %{name}",
        canAddRemark: "You can add comments here",
        rating: "Blood glucose rating"
    },
    relations: {
        friends: "Friends",
        newFriends: "New Friends",
        searchUser: "search user",
        waitingFor: "Waiting for validation",
        agree: "Agree",
        refuse: "Refuse",
        add: "Add",
        noData: "No Data..."
    },
    validator: {
        username: "Username must be 4-12 characters long",
        password: "Password must be 6-20 characters long",
        email: "Email format is incorrect",
    },
    message: {
        loginSuccess: "Login success",
        registerSuccess: "Register success",
        updateSuccess: "Update success",
        logoutSuccess: "Logout success",
        operationSuccess: "Operation success",
        completeForm: "Please complete the form",
        agreeToPolicyFirst: "Agree to Privacy Policy first",
        heightMustGe0: "Height must be greater than 0",
        weightMustGe0: "Weight must be greater than 0",
        selectDate: "Please select date",
        endTimeGeToday: 'End time cannot be greater than today',
        startTimeLeEndTime: 'Start time needs to be less than end time',
        applySuccess: 'Send success',
        saveSuccess: "Saved success",
        networkAnomaly: "Network anomaly",
        publishSuccess: "Publish success"
    }
};