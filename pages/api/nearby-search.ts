import type { NextApiRequest, NextApiResponse } from 'next'
import Axios from 'axios'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { keyword, type } = req.query

  const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}bar&location=40.7591704,-74.0392707&radius=50000&type=${type}&language=en&key=${process.env.MAPS_API_KEY}`

  return new Promise((resolve, reject) => {
    Axios
      .get(URL)
      .then(({ data }) => {
        if (data.status == 'OK') {
          res.status(200).json({ data })
          resolve({})
        }
      }).catch(err => {
        res.status(400).json({ err })
        reject({})
      })
  })
}

export default handler