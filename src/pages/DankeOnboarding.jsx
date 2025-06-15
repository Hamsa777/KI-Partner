import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const serviceText = {
  feedback: {
    title: 'Onboarding erfolgreich!',
    intro: 'Ihre Angaben wurden erfolgreich übermittelt.',
    info: 'Sie erhalten in kürze eine Mail mit allen erforderlichen Links und ihrem Embed-Code für die Eibettung Ihres Widgets.'
  },
 // chatbot: {
   // title: 'Vielen Dank!',
    //intro: 'Dein Chatbot wird jetzt erstellt.',
    //info: 'In Kürze bekommst du eine E-Mail mit deinem Bot-Link, den du direkt auf deiner Website einbinden kannst.'
  //},
  // weitere Services hier ergänzen …
};

export default function DankeOnboarding() {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service') || 'feedback';
  const { title, intro, info } = serviceText[service] || serviceText['feedback'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white text-[#000002] text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl"
      >
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-4">{intro}</p>
        <p className="text-md mb-6 text-gray-700">{info}</p>

        <Link
          to="/"
          className="mt-4 inline-block bg-[#283593] text-white px-6 py-3 rounded-full hover:bg-[#1a237e] transition-transform transform hover:scale-105"
        >
          Zur Startseite
        </Link>
      </motion.div>
    </div>
  );
}
