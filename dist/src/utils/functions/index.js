import { getCategories, getCategory, getSubCategories, getSubCategory, categoryLinkingSubCategory } from "./category";
import { getSummaries, getSummaryBook, createSummary } from "./summary";
import { getUser, emailAuthMixin_sendVerifyMail, register, login, logout, getCurrentUser } from "./user";
import { getFavorite, getFavorites, createFavorite, deleteFavorite, getDonefavorite, getfavoriteNum } from "./favorite";
var functions = {
    getCategories: getCategories,
    getCategory: getCategory,
    getSubCategories: getSubCategories,
    getSubCategory: getSubCategory,
    categoryLinkingSubCategory: categoryLinkingSubCategory,
    getSummaries: getSummaries,
    getSummaryBook: getSummaryBook,
    createSummary: createSummary,
    getUser: getUser,
    getCurrentUser: getCurrentUser,
    emailAuthMixin_sendVerifyMail: emailAuthMixin_sendVerifyMail,
    register: register,
    login: login,
    logout: logout,
    getDonefavorite: getDonefavorite,
    getFavorites: getFavorites,
    createFavorite: createFavorite,
    deleteFavorite: deleteFavorite,
    getFavorite: getFavorite,
    getfavoriteNum: getfavoriteNum
};
// import _ from 'underscore'
// import bluebird from 'bluebird'
// _.mapObject(models, function(val) {
//   bluebird.promisifyAll(val)
//   bluebird.promisifyAll(val.prototype)
// })
export default functions;
//# sourceMappingURL=index.js.map