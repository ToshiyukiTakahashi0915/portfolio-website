import React, { useState } from 'react';
import { Github, Twitter, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const imagePath = process.env.NODE_ENV === 'production' ? '' : '/';

const projects = [
  {
    title: 'チェックシートアプリ',
    description: '紙のチェックシートをタブレットで入力し、CSVファイルで出力。Excelマクロで取り込み機能も開発。',
    tech: {
      frameworks: ['ReactNative', 'Expo'],
      libraries: ['Recoil', 'ExpoRouter'],
      languages: ['TypeScript']
    },
    challenges: '直感的な入力インターフェースの設計',
    field: '工業DX',
    price: '30万円',
    images: [
      `${imagePath}images/S__60465159.jpg`,
      `${imagePath}images/S__60465157.jpg`,
      `${imagePath}images/S__60465160.jpg`
    ]
  },
  {
    title: '足場作業者管理アプリ',
    description: 'Webの管理画面から配置された作業員がスマホアプリで現場確認可能にする。プッシュ通知機能実装。',
    tech: {
      frameworks: ['Flutter'],
      libraries: ['AWS SDK','FCM', 'Riverpod', 'flutterlocalnotifications'],
      languages: ['Dart']
    },
    challenges: 'チーム開発でのタスク管理と顧客対応',
    field: '建設業務改善',
    price: '33万円',
    images: [
      `images/S__60465161.jpg`,
      `images/S__60465163.jpg`,
      `images/S__60465164.jpg`
    ]
  }
];

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div className="relative w-full h-full transition-all duration-500 ease-in-out">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-64 h-[500px] bg-gray-200 rounded-[2.5rem] overflow-hidden border-[14px] border-gray-800 shadow-xl">
              <img
                src={src}
                alt={`Screenshot ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                onClick={() => setIsEnlarged(true)}
              />
              <div className="absolute top-0 w-full h-6 bg-gray-800 rounded-b-lg"></div>
              <div className="absolute bottom-0 w-full h-6 bg-gray-800 rounded-t-lg"></div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 z-10">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 z-10">
        <ChevronRight className="w-6 h-6" />
      </button>
      <AnimatePresence>
        {isEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setIsEnlarged(false)}
          >
            <img
              src={images[currentIndex]}
              alt={`Enlarged Screenshot ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          としゆきのポートフォリオ
        </motion.h1>

        <div className="grid gap-12 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ImageGallery images={project.images} />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">使用技術:</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(project.tech).map(([category, items]) => (
                      <div key={category} className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500">{category}:</span>
                        <div className="flex flex-wrap gap-1">
                          {items.map((item, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2"><strong>課題:</strong> {project.challenges}</p>
                <p className="text-sm text-gray-500 mb-2"><strong>分野:</strong> {project.field}</p>
                {project.price && <p className="text-sm text-gray-500"><strong>受注金額:</strong> {project.price}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          className="mt-12 flex justify-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a href="https://github.com/ToshiyukiTakahashi0915" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
            <span className="sr-only">GitHub</span>
            <Github className="h-8 w-8" />
          </a>
          <a href="https://twitter.com/kogyo_it" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-8 w-8" />
          </a>
          <a href="mailto:t.toshiyuki0915@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
            <span className="sr-only">Email</span>
            <Mail className="h-8 w-8" />
          </a>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Portfolio;