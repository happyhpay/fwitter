import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }
    const existedUser = (await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })) as any;

    const userWithoutPassword = exclude(existedUser, ['hashedPassword']);

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });
    return res.status(200).json({ ...existedUser, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
