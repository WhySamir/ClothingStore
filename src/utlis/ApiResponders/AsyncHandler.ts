import type { NextApiRequest, NextApiResponse } from 'next';

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;

const asyncHandler = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message || 'Internal Server Error' });
    }
  };
};

export { asyncHandler };
