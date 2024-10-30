const userModel = require('../models/user.model')
const articleModel = require('../models/article.model')
const saveImgMiddleware = require('../middleware/saveImgMiddleware')
const idCreator = require('../utils/idCreator')
const { err500, err404 } = require('../utils/error')


const layout = 'layout/index'
const messages = ''

const getAllArticles = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)
    const articles = await articleModel.getAllArticles()

    const context = {
      user, articles
    }

    const title = 'News Articles list'

    res.status(200).render('articles/index', { context, messages, title, layout })
    
  } catch (error) {
    console.error('Error in getAllArticles:', error)
    res.status(500).render(err500.layout, err500.message)
  }

}

const formAddArticle = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)

    const categories = [
      'Politik', 'Ekonomi', 'Teknologi', 'Olahraga', 'Kesehatan',
      'Pendidikan', 'Hiburan', 'Sains', 'Lingkungan', 'Kriminalitas',
      'Travel & Wisata', 'Pendidikan', 'Keuangan'
    ]

    const context = { 
      user, categories 
    }

    const title = 'Form Add News Article'

    res.status(200).render('articles/formAdd', { context, messages, title, layout })

  } catch (error) {
    console.error('Error in formAddArticle:', error)
    res.status(500).render(err500.layout, err500.message)
  }
}

const postAddArticle = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)

    let { articleTitle, content, category } = req.body

    if (category[0] === "Lainnya") {
      category = category[1]
    } else {
      category = category[0]
    }

    const foto = req.file.filename

    if (!user) {
      res.status(400).render(err404.layout, err404.message)
      return
    } 

    const id = idCreator.createID()

    await articleModel.create({
      id, 
      title: articleTitle, 
      content, 
      image_url: `/img/articles_image/${foto}`,
      category
    })
    
    const articles = await articleModel.getAllArticles()

    const context = {
      user, articles
    }

    const title = 'News Articles list'

    const messages = 'Success, news article created successfully'

    res.status(201).render('articles/index', { context, messages, title, layout })

  } catch (error) {
    console.error('Error in postAddArticle:', error)
    res.status(500).render(err500.layout, err500.message)
  }
}

const uploadMiddleware = saveImgMiddleware.uploadArticelImg

module.exports = {
  getAllArticles, formAddArticle, postAddArticle, uploadMiddleware
}