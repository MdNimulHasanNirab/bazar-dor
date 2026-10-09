/**
 * @typedef {"up" | "down" | "flat"} Direction
 */

/**
 * @typedef {Object} Market
 * @property {string} market
 * @property {string} division
 * @property {number} min
 * @property {number} max
 */

/**
 * @typedef {Object} ProductChange
 * @property {Direction} dir
 * @property {number} pct
 */

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} slug
 * @property {string} nameBn
 * @property {string} category
 * @property {string} categoryNameBn
 * @property {string} categoryIcon
 * @property {"kg" | "litre" | "dozen" | "piece"} unit
 * @property {string} image
 * @property {number} today
 * @property {number} yesterday
 * @property {number} lastWeek
 * @property {number} lastMonth
 * @property {ProductChange} change
 * @property {Market[]} markets
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} slug
 * @property {string} nameBn
 * @property {string} icon
 */