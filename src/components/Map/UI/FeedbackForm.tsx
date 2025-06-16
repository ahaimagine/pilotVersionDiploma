import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FeedbackFormData } from '../../../types';

interface FeedbackFormProps {
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       'https://knowwhereinnulpbackend-production.up.railway.app/sendmail',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to send feedback');
  //     }

  //     setIsSubmitted(true);
  //     setTimeout(() => {
  //       onClose();
  //     }, 2000);
  //   } catch (error) {
  //     console.error('Error submitting feedback:', error);
  //     alert(t('feedbackError') || 'Something went wrong. Please try again later.');
  //   }
  // };

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
        {isSubmitted ? (
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-success-600 dark:text-success-400 mb-2">
              {t('feedbackSuccess')}
            </h2>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('feedbackForm')}
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-[#4A4EB1] transition-colors"
              >
                <X size={24} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t('feedbackName')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 bg-[#E9E9E9] dark:bg-[#34353C] border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t('feedbackEmail')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 bg-[#E9E9E9] dark:bg-[#34353C] border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t('feedbackMessage')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-2.5 bg-[#E9E9E9] dark:bg-[#34353C] border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2D318D] hover:bg-[#4A4EB1] dark:bg-[#8287FF] text-white rounded-lg transition-colors"
                >
                  {t('submit')}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default FeedbackForm;