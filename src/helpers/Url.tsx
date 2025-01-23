//swagger url
export const BASE_URL: string = "http://207.154.246.120:8080";

//img
export const attachment : string = `${BASE_URL}/api/attachment/getFile/`;

//dashboard 
 export const dashboard : string = `${BASE_URL}/api/dashboard/website/statistic`;

 //category
 export const category : string = `${BASE_URL}/api/category`;


// Get Me 
export const getMe : string = `${BASE_URL}/api/user/me`


//---------------------------------leave-feedback-Controller-------------------------------
//leave-feedback-save
export const leaveFeedbackSave : string = `${BASE_URL}/api/leave/feedback/save`;
//leave/feedback/master/or/salon-search

export const leaveFeedbackMasterOrSalonSearch : string = `${BASE_URL}/api/leave/feedback/master/or/salon`;




//---------------------------------Attachment-Controller-------------------------------
// AttachmentUpload
export const AttachmentUpload : string = `${BASE_URL}/api/attachment/upload`;
//---------------------------------Attachment-Controller-------------------------------



//---------------------------------Auth-Controller-------------------------------
// SendCode
export const sendCode : string = `${BASE_URL}/api/auth/sendCode`;
// ChekCode
export const chekCode : string = `${BASE_URL}/api/auth/checkCode`;
// Login
export const login : string = `${BASE_URL}/api/auth/login`;
// PhoneCheck
export const phoneCheck : string = `${BASE_URL}/api/user/checking/phone`;
// Register
export const register : string = `${BASE_URL}/api/auth/master`;

//---------------------------------Auth-Controller-------------------------------