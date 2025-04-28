import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

interface LanguageSelectorProps {
  onClose: () => void;
}

const LanguageSelector = ({ onClose }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();
  
  const languages = [
    { code: 'uk', label: 'Українська' },
    { code: 'en', label: 'English' }
  ];
  
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    onClose();
  };
  
  return (
    <div className="absolute right-4 top-14 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-30">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium">{t('language')}</h3>
      </div>
      <ul>
        {languages.map(lang => (
          <li key={lang.code}>
            <button
              onClick={() => changeLanguage(lang.code)}
              className="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span>{lang.label}</span>
              {i18n.language === lang.code && (
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;