import React, { useEffect, useRef, useState } from 'react';
import { Building } from '../../../types';
import { useTranslation } from 'react-i18next';
import { X, Navigation } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

interface DetailsRoutePanel {
    building: Building;
    onBuildRoute: () => void;
    onCloseRoute: () => void;
}

const DetailsRoute: React.FC<DetailsRoutePanel> = ({ building, onBuildRoute, onCloseRoute }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language as 'uk' | 'en';
    const [onClose, setOnClose] = useState(false);


    return (
        <AnimatePresence>
            {!onClose && (
                <motion.div
                    className="fixed inset-0 z-[1000] pointer-events-none"
                    initial={{ opacity: 0 }}
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
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">{t('Маршрут')}</h2>
                                <button onClick={() => { setOnClose(true); onCloseRoute() }}>
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="relative border rounded-xl px-4 py-3 flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <Navigation className="w-5 h-5 text-indigo-600" />
                                    {/* Add back */}
                                    <span className="text-sm">{t('Ваше місцезнаходження')}</span>
                                </div>

                                <button
                                    onClick={onBuildRoute}
                                    className="w-full text-left border rounded-xl px-4 py-3 flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 transition"
                                >
                                    <span className="text-indigo-600">→</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {building.name[lang]}, {building.address[lang]}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default DetailsRoute;