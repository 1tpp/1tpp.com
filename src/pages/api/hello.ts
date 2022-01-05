import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  aka: string
  age: number
  school: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({
    name: 'Panapat Pilapa',
    aka: '1tpp',
    age: 17,
    school: 'Ubon Ratchathani Technical College',
  })
}
