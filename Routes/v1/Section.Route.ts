import SectionController from '@/Controllers/v1/Section.Controller';
import {VerifyAdmin} from '@/Middleware/VerifyAdmin';
import {VerifyToken} from '@/Middleware/VerifyToken';
import {Router} from 'express';
import multer from 'multer';
const SectionRoute_v1 = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/sections');
  },
  filename: (req, file, cb) => {
    const fieldName = file.fieldname;
    const type = file.mimetype.split('/')[0];
    const ext = file.mimetype.split('/')[1];
    if (type !== 'image') cb(Error('Type is Not Image'), '');
    const fileName = `${fieldName}.${ext}`;
    cb(null, fileName);
  }
});

const upload = multer({storage});

SectionRoute_v1.get('/', SectionController.getAllSection);
SectionRoute_v1.get('/hero-section', SectionController.getHeroSection);
SectionRoute_v1.get('/about-us-section', SectionController.getAboutUsSection);
SectionRoute_v1.get('/why-us-section', SectionController.getWhyUsSection);
SectionRoute_v1.get('/contact-us-section', SectionController.getContactUsSection);
SectionRoute_v1.put(
  '/',
  VerifyToken,
  VerifyAdmin,
  upload.fields([
    {name: 'heroImage', maxCount: 1},
    {name: 'aboutUsImage', maxCount: 1},
    {name: 'whyUsImage', maxCount: 1}
  ]),
  SectionController.editSection
);

export default SectionRoute_v1;

// const heroSection: ISection = {
//   title: 'hero',
//   content: {title: 'من أول لقمة \nبتعرف إنك وصلت المكان الصح.', subTitle: 'أطلق جوعك، ودع الباقي علينا.', imageUrl: 'https://naham-restaurant-project.vercel.app/_next/image?url=%2FAssets%2FImages%2FHeroImage.png&w=828&q=75'}
// };
// const aboutSection: ISection = {
//   title: 'aboutUs',
//   content: {text: 'تأسس مطعم نَهم بدافع الشغف الحقيقي بالأكل الراقي والنكهات الأصيلة. مزجنا بين روح المطبخ العربي وأسلوب التقديم العصري، علشان نقدّم لك وجبة تفتح النفس وتعيش معها لحظة "نهم" ما تنساها.\nكل طبق عندنا يتجهز بعناية، من مكونات مختارة بعناية، وبتفاصيل طهي دقيقة، وكل هذا في جو أنيق ومريح يناسب كل الأذواق.\nسواء جاي تجرب المنيو لأول مرة، أو من زبائننا المخلصين... نعدك إن "نَهم" دايمًا بيشبع ذوقك قبل جوعك.\n"أطلق جوعك، ودع الباقي علينا."', imageUrl: 'https://naham-restaurant-project.vercel.app/_next/image?url=%2FAssets%2FImages%2FAboutUsImage_D.png&w=828&q=75'}
// };
// const whyUsSection: ISection = {
//   title: 'whyUs',
//   content: {
//     cards: [
//       {title: 'نكهة لا تُنسى', text: 'نختار مكوناتنا بعناية، ونطبخها بشغف… علشان كل لقمة تكون قصة تحكي عن الطعم الأصيل.'},
//       {title: 'نكهة لا تُنسى', text: 'نختار مكوناتنا بعناية، ونطبخها بشغف… علشان كل لقمة تكون قصة تحكي عن الطعم الأصيل.'},
//       {title: 'نكهة لا تُنسى', text: 'نختار مكوناتنا بعناية، ونطبخها بشغف… علشان كل لقمة تكون قصة تحكي عن الطعم الأصيل.'}
//     ],
//     imageUrl: 'https://naham-restaurant-project.vercel.app/_next/image?url=%2FAssets%2FImages%2FAboutUsImage_D.png&w=828&q=75'
//   }
// };
// const contactUsSection: ISection = {
//   title: 'contactUs',
//   content: {
//     text: 'نحن في نَهم | NAHAM نرحب بأسئلتك، اقتراحاتك، وحتى ملاحظاتك… لأننا نؤمن أن رأيك يهمنا.',
//     phoneNumber: 776935953,
//     email: 'info@naham.sa',
//     instagramAccount: 'www.instagram.com',
//     faceBookAccount: 'www.faceBook.com',
//     twitterAccount: 'www.twitterAccount.com',
//     mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482.76332015767895!2d49.12768063032487!3d14.535896831795167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3de8e5001000557b%3A0x1a1c7facc2cdb40e!2z2LTYsdmD2Ycg2LnYsdioINmI2YrYsdiv2YjYsiDZhNmE2K3ZhNmI2YQg2KfZhNiq2YLZhtmK2Yc!5e0!3m2!1sar!2s!4v1754986721083!5m2!1sar!2s'
//   }
// };
