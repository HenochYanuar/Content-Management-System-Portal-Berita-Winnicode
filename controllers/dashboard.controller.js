const userModel = require('../models/user.model')
const { errMsg, errLayout } = require('../utils/error')
const layout = 'layout/index'

const dashboard = async (req, res) => {

  try {
    const user = await userModel.findByEmail(req.user.email)
  
    res.status(200).render('dashboard/index', { context: { user }, title: 'Dashboard Admin', layout: layout})
    
  } catch (error) {
    console.error('Error in dashboard:', error)
    res.status(500).render(errLayout, errMsg)
  }
}

module.exports = {
  dashboard
}