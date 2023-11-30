import { Request, Response } from 'express'

const getAllProducts = async (req: Request, res: Response) => {
  res.status(200).json({ msg: 'Yeah I am working' })
}

module.exports = {
  getAllProducts,
}
