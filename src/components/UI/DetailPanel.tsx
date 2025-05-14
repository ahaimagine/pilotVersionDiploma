import React, { useEffect, useRef, useState } from 'react';
import { Building, Department, Institute } from '../../types';
import { departments } from '../../data/departments';
import { institutes } from '../../data/institutes';
import { useTranslation } from 'react-i18next';
import { X, Phone, Mail, Globe, Clock, MapPin, Navigation } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import DropdownList from './DropdownList';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface DetailPanelProps {
  building: Building;
  onClose: () => void;
  onBuildRoute: () => void;
  setDetails: (value: boolean) => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ building, onClose, onBuildRoute, setDetails }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'uk' | 'en';
  const [activeTabs, setActiveTabs] = useState<string[]>([]);


  const [isClosing, setIsClosing] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(detailsRef, () => {
    setIsClosing(true);
  });

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        setDetails(false); // unmount після завершення анімації
      }, 300); // тривалість анімації в мс
      return () => clearTimeout(timeout);
    }
  }, [isClosing]);

  const buildingDepartments = departments.filter(dept =>
    building.departments.includes(dept.id)
  );

  const buildingInstitutes = institutes.filter(inst =>
    building.institutes.includes(inst.id)
  );

  const handleToggleTab = (tabId: string) => {
    setActiveTabs(prev =>
      prev.includes(tabId)
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className="fixed inset-0 z-[1000] pointer-events-none"
          initial={{ opacity: 0 }}
          ref={detailsRef}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute left-0 right-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-2xl shadow-lg max-h-[100vh] overflow-y-auto pointer-events-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4 bg-[#F6F6F6] dark:bg-[#26272C]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {building.name[lang]}
                </h2>
                <button
                  onClick={() => setIsClosing(true)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X size={24} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              <div className="flex items-start gap-3 mb-[12px] text-gray-700 dark:text-gray-300">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <p>{building.address[lang]}</p>
              </div>

              <div className="flex items-start gap-3 mb-[12px] text-gray-700 dark:text-gray-300">
                <Clock size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p>{building.workingHours[lang]}</p>
                </div>
              </div>

              <div className="mb-[12px]">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('contacts')}</h3>
                <div className="space-y-2">
                  {building.contacts.phone && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Phone size={18} />
                      <a href={`tel:${building.contacts.phone}`} className="hover:text-primary-600">
                        {building.contacts.phone}
                      </a>
                    </div>
                  )}
                  {building.contacts.email && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Mail size={18} />
                      <a href={`mailto:${building.contacts.email}`} className="hover:text-primary-600">
                        {building.contacts.email}
                      </a>
                    </div>
                  )}
                  {building.contacts.website && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Globe size={18} />
                      <a href={building.contacts.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
                        {building.contacts.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {buildingDepartments.length > 0 && (
                <DropdownList
                  title={t('departments')}
                  items={buildingDepartments}
                  isActive={activeTabs.includes('departments')}
                  onToggle={() => handleToggleTab('departments')}
                  lang={lang}
                />
              )}

              {buildingInstitutes.length > 0 && (
                <DropdownList
                  title={t('institutes')}
                  items={buildingInstitutes}
                  isActive={activeTabs.includes('institutes')}
                  onToggle={() => handleToggleTab('institutes')}
                  lang={lang}
                />
              )}

              <button
                onClick={onBuildRoute}
                className="w-full mt-4 py-3 px-4 bg-[#2D318D] hover:bg-[#4A4EB1] dark:bg-[#8287FF] dark:hover:bg-[#4A4EB1] text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation size={20} />
                <span>{t('buildRoute')}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailPanel;