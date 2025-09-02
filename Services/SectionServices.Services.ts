import {IAboutUsSection, IContactUsSection, IHeroSection, ISection, IWhyUsSection, SectionModel} from '@/Models/v1/Section.Model';

async function getAllSection() {
  try {
    const allSections = await SectionModel.findMany({orderBy: {order: 'asc'}});
    return allSections;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function getHeroSection() {
  try {
    const heroSections = await SectionModel.findUnique({where: {title: 'hero'}});
    return heroSections;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function getAboutUsSection() {
  try {
    const aboutUsSections = await SectionModel.findUnique({where: {title: 'aboutUs'}});
    return aboutUsSections;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function getWhyUsSection() {
  try {
    const whyUsSections = await SectionModel.findUnique({where: {title: 'whyUs'}});
    return whyUsSections;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
async function getContactUsSection() {
  try {
    const contactUsSections = await SectionModel.findUnique({where: {title: 'contactUs'}});
    return contactUsSections;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function EditHeroSection(heroSection: ISection) {
  const editedSection = await SectionModel.update({where: {title: heroSection.title}, data: {content: heroSection.content}});
  return editedSection;
}
async function EditAboutUsSection(AboutUsSection: ISection) {
  const editedSection = await SectionModel.update({where: {title: AboutUsSection.title}, data: {content: AboutUsSection.content}});
  return editedSection;
}
async function EditWhyUsSection(WhyUsSection: ISection) {
  const editedSection = await SectionModel.update({where: {title: WhyUsSection.title}, data: {content: WhyUsSection.content}});
  return editedSection;
}
async function EditContactUsSection(ContactUsSection: ISection) {
  const editedSection = await SectionModel.update({where: {title: ContactUsSection.title}, data: {content: ContactUsSection.content}});
  return editedSection;
}

async function editSection(allSection: [IHeroSection, IAboutUsSection, IWhyUsSection, IContactUsSection]) {
  try {
    let isHeroSectionChange: boolean = false,
      isAboutUsSectionChange: boolean = false,
      isWhyUsSectionChange: boolean = false,
      isContactUsSectionChange: boolean = false;
    const allSectionFromDb = await SectionModel.findMany({orderBy: {order: 'asc'}});
    const HeroSection = allSection[0];
    const HeroSectionFromDb = allSectionFromDb[0];
    const AboutUsSection = allSection[1];
    const AboutUsSectionFromDb = allSectionFromDb[1];
    const WhyUsSection = allSection[2];
    const WhyUsSectionFromDb = allSectionFromDb[2];
    const ContactUsSection = allSection[3];
    const ContactUsSectionFromDb = allSectionFromDb[3];
    if (HeroSection.title !== HeroSectionFromDb.title || JSON.stringify(HeroSection.content) !== JSON.stringify(HeroSectionFromDb.content)) isHeroSectionChange = true;
    if (AboutUsSection.title !== AboutUsSectionFromDb.title || JSON.stringify(AboutUsSection.content) !== JSON.stringify(AboutUsSectionFromDb.content)) isAboutUsSectionChange = true;
    if (WhyUsSection.title !== WhyUsSectionFromDb.title || JSON.stringify(WhyUsSection.content) !== JSON.stringify(WhyUsSectionFromDb.content)) isWhyUsSectionChange = true;
    if (ContactUsSection.title !== ContactUsSectionFromDb.title || JSON.stringify(ContactUsSection.content) !== JSON.stringify(ContactUsSectionFromDb.content)) isContactUsSectionChange = true;

    // Check if Image Not Upload
    if (!HeroSection.content.imageUrl) HeroSection.content.imageUrl = JSON.parse(JSON.stringify(HeroSectionFromDb.content)).imageUrl;
    if (!AboutUsSection.content.imageUrl) AboutUsSection.content.imageUrl = JSON.parse(JSON.stringify(AboutUsSectionFromDb.content)).imageUrl;
    if (!WhyUsSection.content.imageUrl) WhyUsSection.content.imageUrl = JSON.parse(JSON.stringify(WhyUsSectionFromDb.content)).imageUrl;

    const editedSection = await Promise.all([isHeroSectionChange ? EditHeroSection(HeroSection) : 'Hero Section Not Change', isAboutUsSectionChange ? EditAboutUsSection(AboutUsSection) : 'About Us Section Not Change', isWhyUsSectionChange ? EditWhyUsSection(WhyUsSection) : 'Why Us Section Not Change', isContactUsSectionChange ? EditContactUsSection(ContactUsSection) : 'Contact Us Section Not Change']);
    return editedSection;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

const SectionsServices = {
  getAllSection,
  getHeroSection,
  getAboutUsSection,
  getWhyUsSection,
  getContactUsSection,
  editSection
};

export default SectionsServices;
