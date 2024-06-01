import { NextApiRequest, NextApiResponse } from 'next';


let userData = {
  id: 1,
  name: 'Emmanuel Juanich',
  email: 'emmanj@gmail.com',
  bio: '3rd Year Computer Science Student',
  info: [
    {
      title: "Aq xii Emman",
      content: "Emman mapagmahal"
    },
    {
      title: "I am Emman",
      content: "Lovable Emman"
    }
  ]
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(userData);
  } else if (req.method === 'PUT') {
    const { id, name, email, bio, info } = req.body;
    if (!id || !name || !email || !bio || !info) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      userData = { id, name, email, bio, info };
      res.status(200).json(userData);
    }
  } else if (req.method === 'POST') {
    const { name, email, bio, info } = req.body;
    if (!name || !email || !bio || !info) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      const id = userData.id + 1;
      userData = { id, name, email, bio, info };
      res.status(201).json(userData);
    }
  } else if (req.method === 'DELETE') {
    userData = {
      id: 1,
      name: '',
      email: '',
      bio: '',
      info: []
    };
    res.status(200).end('User data deleted successfully');
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
