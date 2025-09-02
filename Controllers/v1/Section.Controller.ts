import {IAboutUsSection, IContactUsSection, IHeroSection, ISection, IWhyUsSection, SectionModel} from '@/Models/v1/Section.Model';
import SectionsServices from '@/Services/SectionServices.Services';
import ParseErrorMessage from '@/Utils/ParseErrorMessage';
import {Request, Response} from 'express';

async function getAllSection(req: Request, res: Response) {
  try {
    const allSection = await SectionsServices.getAllSection();
    res.status(200).json({message: 'Get All Sections Successful', data: allSection});
  } catch (error) {
    res.status(400).json({message: 'Get All Sections Failed', error: ParseErrorMessage(error)});
  }
}
async function getHeroSection(req: Request, res: Response) {
  try {
    const HeroSection = await SectionsServices.getHeroSection();
    res.status(200).json({message: 'Get Hero Sections Successful', data: HeroSection});
  } catch (error) {
    res.status(400).json({message: 'Get Hero Sections Failed', error: ParseErrorMessage(error)});
  }
}
async function getAboutUsSection(req: Request, res: Response) {
  try {
    const AboutUsSection = await SectionsServices.getAboutUsSection();
    res.status(200).json({message: 'Get AboutUs Sections Successful', data: AboutUsSection});
  } catch (error) {
    res.status(400).json({message: 'Get AboutUs Sections Failed', error: ParseErrorMessage(error)});
  }
}
async function getWhyUsSection(req: Request, res: Response) {
  try {
    const WhyUsSection = await SectionsServices.getWhyUsSection();
    res.status(200).json({message: 'Get WhyUs Sections Successful', data: WhyUsSection});
  } catch (error) {
    res.status(400).json({message: 'Get WhyUs Sections Failed', error: ParseErrorMessage(error)});
  }
}
async function getContactUsSection(req: Request, res: Response) {
  try {
    const ContactUsSection = await SectionsServices.getContactUsSection();
    res.status(200).json({message: 'Get ContactUs Sections Successful', data: ContactUsSection});
  } catch (error) {
    res.status(400).json({message: 'Get ContactUs Sections Failed', error: ParseErrorMessage(error)});
  }
}

async function editSection(req: Request, res: Response) {
  // console.log(req.body.data[0]);

  const allSection: [IHeroSection, IAboutUsSection, IWhyUsSection, IContactUsSection] = JSON.parse(req.body.data);
  const files = req.files as {[fieldname: string]: Express.Multer.File[]};

  if (files?.heroImage && files.heroImage[0]) allSection[0].content.imageUrl = files.heroImage[0].destination + '/' + files.heroImage[0].filename;
  if (files?.aboutUsImage && files.aboutUsImage[0]) allSection[1].content.imageUrl = files.aboutUsImage[0].destination + '/' + files.aboutUsImage[0].filename;
  if (files?.whyUsImage && files.whyUsImage[0]) allSection[2].content.imageUrl = files.whyUsImage[0].destination + '/' + files.whyUsImage[0].filename;
  if (!allSection || allSection[0] === undefined || allSection.length < 1) {
    res.status(400).json({message: 'Data Invalid'});
    return;
  }
  try {
    const editedSection = await SectionsServices.editSection(allSection);
    res.status(200).json({message: 'Edit Section Successful', data: editedSection});
  } catch (error) {
    res.status(400).json({message: 'Edit Section Failed', error: ParseErrorMessage(error)});
  }
}

const SectionController = {
  getAllSection,
  getHeroSection,
  getAboutUsSection,
  getWhyUsSection,
  getContactUsSection,
  editSection
};
export default SectionController;
