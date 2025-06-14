import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface GeolocationPromptProps {
  onClose: () => void;
}

const GeolocationPrompt: React.FC<GeolocationPromptProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestAccess = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(t('geolocation.notSupported'));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation access granted:', position.coords);
        setLoading(false);
        onClose();
      },
      (err) => {
        console.warn('Geolocation access denied:', err.message);
        setError(err.message);
        setLoading(false);
      }
    );
  };

  const renderError = () => {
    if (!error) return null;

    if (error.includes('User denied') || error.includes('denied')) {
      return t('geolocation.denied');
    }

    return t('geolocation.genericError', { error });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#F6F6F6] dark:bg-[#26272C] rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('geolocation.title')}
          </h2>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            {t('geolocation.message')}
          </p>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {renderError()}
            </p>
          )}

          {loading && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('geolocation.waiting')}
            </p>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleRequestAccess}
              disabled={loading}
              className="px-4 py-2 bg-[#2D318D] hover:bg-[#4A4EB1] dark:bg-[#8287FF] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {t('geolocation.allow')}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GeolocationPrompt;
