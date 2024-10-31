const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)

const getAllArticles = async (page, limit, search) => {
  try {
    const offset = (page - 1) * limit

    const articles = await db('articles')
      .where(function() {
        if (search) {
          this.where('title', 'like', `%${search}%`)
              .orWhere('content', 'like', `%${search}%`)
              .orWhere('category', 'like', `%${search}%`)
        }
      })
      .orderBy('updated_at', 'desc')
      .limit(limit)
      .offset(offset)

    const [{ count }] = await db('articles')
      .where(function() {
        if (search) {
          this.where('title', 'like', `%${search}%`)
              .orWhere('content', 'like', `%${search}%`)
              .orWhere('category', 'like', `%${search}%`)
        }
      })
      .count('id as count')

    return { articles, totalItems: parseInt(count) }

  } catch (error) {
    throw new Error('Error getting all news articles')
    
  }
}

const create = async (data) => {
  try {
    return await db('articles').insert(data)

  } catch (error) {
    throw new Error('Error failed create new article')

  }
}

const getOne = async (id) => {
  try {
    return await db('articles').where({ id }).first()

  } catch (error) {
    throw new Error('Error geting a article by id')

  }
}

const deleteArticle = async (id) => {
  try {
    return await db('articles').where({ id }).del()

  } catch (error) {
    throw new Error('Error deleting article by id')

  }
}

module.exports = {
  getAllArticles, create, getOne, deleteArticle
}