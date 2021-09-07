const knex = require('../database')


module.exports = {
  async index(req, res, next) {
    try {
      const {page = 1} = req.query;
      
      const results = await knex('projects')
        .limit(5)
        .offset((page - 1) * 5)
      
      const [count] = await knex('projects').count();
      res.header('X-Total-Count', count["count"])

      return res.json(results)
    } catch (error) {
      next (error)
    }
    
  },  
  async createProject(req, res, next) {
    try {
      const { title } = req.body
      const { user_id } = req.params

      await knex('projects')
      .insert({
        title, 
        user_id: user_id
      })
       return res.status(201).send()
    } catch (error) {
      next(error)
    }
  },
  async listProjectsById(req, res, next) {
    try {
      const { user_id, page = 1} = req.query;      

      const query = knex('projects')
        .limit(5)
        .offset((page - 1) * 5)

      const  countObj = knex('projects').count()

      if(user_id) {
        query
        .where({ user_id })
        .join('users', 'users.id', '=', 'projects.user_id')
        .select('projects.*', 'users.username')
        .where('users.deleted_at', null)


        countObj
        .where({ user_id })
      }

      const [count] = await countObj
      res.header('X-Total-Count', count["count"])

      const results = await query
      return res.json(results)

    } catch (error) {
      next(error)
    }
  }

  

}