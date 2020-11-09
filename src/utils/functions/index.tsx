import React from "react"

import {
  getCategories,
  getCategory,
  getSubCategories,
  getSubCategory,
  categoryLinkingSubCategory
} from "./category"
import { getSummaries, getSummaryBook, createSummary } from "./summary"
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
import { readQuery } from "./defalt"

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
  readQuery
}

// import _ from 'underscore'
// import bluebird from 'bluebird'
// _.mapObject(models, function(val) {
//   bluebird.promisifyAll(val)
//   bluebird.promisifyAll(val.prototype)
// })

export default functions
