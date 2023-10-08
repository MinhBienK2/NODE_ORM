import { Request, Response } from 'express';

const getHomePage = (req: Request, res: Response) => {
  return res.render('homepage.ejs');
};

const getAboutPage = (req: Request, res: Response) => {
  return res.render('test/about.ejs');
};

export = { getHomePage, getAboutPage };
