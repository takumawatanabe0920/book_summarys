import React from "react"

import {
  getCategories,
  getCategory,
  getSubCategories,
  getSubCategory,
  categoryLinkingSubCategory
} from "./category"
import {
  getOneConditionsSummaries,
  getTwoConditionsSummaries,
  getSummaryBook,
  getSummaryBookPopulate,
  createSummary,
  updateSummary,
  getSummariesCount,
  getCategorySummariesCount,
  updateFavoriteSummaries,
  getRankingSummaries,
  getNewSummaries
} from "./summary"
import {
  emailAuthMixin_sendVerifyMail,
  register,
  login,
  logout,
  getCurrentUser,
  getIdUser,
  updateUser
} from "./user"
import {
  getFavorite,
  getFavorites,
  createFavorite,
  deleteFavorite,
  getDonefavorite,
  getfavoriteNum,
  getMyFavorites
} from "./favorite"
import {
  readQuery,
  formatDateHour,
  uploadImage,
  getImage,
  responseUploadImage
} from "./defalt"
import { createBrowsing, getMyBrowsings } from "./browsing"
import {
  createSummaryComment,
  getMyComments,
  getSummaryComments,
  getIdComment
} from "./comment"
import {
  createNotification,
  getMyNotifications,
  getMyNotReadNotificationsCount,
  updateReadNotifications
} from "./notification"

export {
  getCategories,
  getCategory,
  getSubCategories,
  getSubCategory,
  categoryLinkingSubCategory,
  getSummaryBook,
  getOneConditionsSummaries,
  createSummary,
  updateSummary,
  updateFavoriteSummaries,
  getMyFavorites,
  getRankingSummaries,
  getSummariesCount,
  getCategorySummariesCount,
  getTwoConditionsSummaries,
  getIdUser,
  updateUser,
  getCurrentUser,
  emailAuthMixin_sendVerifyMail,
  register,
  login,
  logout,
  getDonefavorite,
  getFavorites,
  createFavorite,
  deleteFavorite,
  getFavorite,
  getfavoriteNum,
  readQuery,
  createBrowsing,
  getMyBrowsings,
  formatDateHour,
  getMyComments,
  createSummaryComment,
  getSummaryComments,
  getSummaryBookPopulate,
  getIdComment,
  createNotification,
  getMyNotifications,
  getNewSummaries,
  getMyNotReadNotificationsCount,
  updateReadNotifications,
  uploadImage,
  getImage,
  responseUploadImage
}
