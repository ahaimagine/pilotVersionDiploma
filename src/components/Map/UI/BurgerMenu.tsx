import React, { useState, useRef } from 'react';
import { Menu, X, Moon, Sun, Languages, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import FeedbackForm from './FeedbackForm';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicked outside
  useOnClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="relative shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[48px] w-[48px] flex content-center flex-wrap justify-center p-2 rounded-md hover:bg-[#E9E9E9] dark:hover:bg-[#34353C] bg-[#F6F6F6] dark:bg-[#26272C]"
        aria-label="Menu"
      >
        <Menu className="text-gray-800 dark:text-white" size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          >
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#F6F6F6] dark:bg-[#26272C] shadow-xl z-50"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('appName')}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X size={24} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Theme Toggle */}
                  <button
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-[#E9E9E9] dark:hover:bg-[#34353C] transition-colors text-gray-700 dark:text-gray-300"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun size={20} />
                        <span>{t('lightMode')}</span>
                      </>
                    ) : (
                      <>
                        <Moon size={20} />
                        <span>{t('darkMode')}</span>
                      </>
                    )}
                  </button>

                  {/* Language Switch */}
                  <div className="flex items-center gap-3 w-full p-2.5 rounded-lg text-gray-700 dark:text-gray-300">
                    <Languages size={20} />
                    <span>{t('language')}</span>
                  </div>

                  <div className="ml-9 flex gap-3">
                    <button
                      onClick={() => {
                        changeLanguage('uk');
                      }}
                      className={`px-3 py-1.5 rounded-md ${
                        language === 'uk'
                          ? 'bg-[#2D318D] text-white dark:bg-[#8287FF] dark:text-white'
                          : 'hover:bg-[#E9E9E9] dark:hover:bg-[#34353C] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t('ukrainian')}
                    </button>

                    <button
                      onClick={() => {
                        changeLanguage('en');
                      }}
                      className={`px-3 py-1.5 rounded-md ${
                        language === 'en'
                          ? 'bg-[#2D318D] text-white dark:bg-[#8287FF] dark:text-white'
                          : 'hover:bg-[#E9E9E9] dark:hover:bg-[#34353C] text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t('english')}
                    </button>
                  </div>

                  {/* Feedback */}
                  <button
                    onClick={() => {
                      setShowFeedback(true);
                    }}
                    className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-[#E9E9E9] dark:hover:bg-[#34353C] transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <MessageCircle size={20} />
                    <span>{t('feedback')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFeedback && (
          <FeedbackForm onClose={() => setShowFeedback(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BurgerMenu;