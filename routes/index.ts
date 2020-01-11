import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.json({ status: 'Success'})
});

export default router;
