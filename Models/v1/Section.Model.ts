import {PrismaClient} from '@/DB/prisma/client';
import z from 'zod';
const prisma = new PrismaClient();
const HeroSection = z.object({
  title: z.string().min(1),
  subTitle: z.string().min(1),
  imageUrl: z.string().optional()
});
const AboutUsSection = z.object({
  text: z.string().min(1),
  imageUrl: z.string().optional()
});
const CardWhyUsSection = z.object({
  title: z.string().min(1),
  text: z.string().min(1)
});
const WhyUsSection = z.object({
  cards: z.array(CardWhyUsSection).max(3),
  imageUrl: z.string().optional()
});

const ContactUsSection = z.object({
  text: z.string().min(1),
  phoneNumber: z.coerce.number().min(1),
  email: z.email().min(1),
  instagramAccount: z.coerce.string().min(1),
  faceBookAccount: z.coerce.string().min(1),
  twitterAccount: z.coerce.string().min(1),
  mapUrl: z.string().min(1)
});

export const HeroSectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  content: HeroSection
});
export const AboutUsSectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  content: AboutUsSection
});
export const WhyUsSectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  content: WhyUsSection
});
export const ContactUsSectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  content: ContactUsSection
});
export const sectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  content: HeroSection.or(AboutUsSection).or(WhyUsSection).or(ContactUsSection)
});

export const SectionModel = prisma.websiteSection;

export type ISection = z.infer<typeof sectionSchema>;
export type IHeroSection = z.infer<typeof HeroSectionSchema>;
export type IAboutUsSection = z.infer<typeof AboutUsSectionSchema>;
export type IWhyUsSection = z.infer<typeof WhyUsSectionSchema>;
export type IContactUsSection = z.infer<typeof ContactUsSectionSchema>;
