import React from "react"

import {
  getCategories,
  getCategory,
  getSubCategories,
  getSubCategory,
  categoryLinkingSubCategory
} from "./category"
import {
  getSummaries,
  getSummaryBook,
  createSummary,
  getSummariesCount
} from "./summary"
import {
  getUser,
  emailAuthMixin_sendVerifyMail,
  register,
  login,
  logout,
  getCurrentUser
} from "./user"
import {
  getFavorite,
  getFavorites,
  createFavorite,
  deleteFavorite,
  getDonefavorite,
  getfavoriteNum
} from "./favorite"
import { readQuery, formatDateHour } from "./defalt"
import { createBrowsing, getMyBrowsing } from "./Browsing"

const functions = {
  getCategories,
  getCategory,
  getSubCategories,
  getSubCategory,
  categoryLinkingSubCategory,
  getSummaries,
  getSummaryBook,
  createSummary,
  getUser,
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
  getSummariesCount,
  createBrowsing,
  getMyBrowsing,
  formatDateHour
}

export default functions
