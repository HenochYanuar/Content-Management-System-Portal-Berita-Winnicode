const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development) 

const getAllArticles = async () => {
  try {
    return await db('articles').select()

  } catch (error) {
    throw new Error('Error geting all news articles')
  
  }
}

const create = async (data) => {
  try {
    return await db('articles').insert(data)

  } catch (error) {
    throw new Error('Error failed create new article')

  }
}

module.exports = {
  getAllArticles, create
}