// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (req.method === 'GET') {
    // const { id } = req.query;
    console.log("TESTE INDEX GET");    
  } else {
    res.status(405).end(); // Método HTTP não permitido
  }
}
