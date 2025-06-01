import React from 'react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-16 bg-[#1D1D1D] flex items-center">
      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="text-center">
          <h1 className="text-2xl md:text-6xl font-bold mb-8 text-white">
            TikTokクリエイター募集
          </h1>
          <p className="text-lg md:text-2xl mb-6 md:mb-12 text-gray-300 font-medium">
            あなたの創造力で新しい広告の形を作ろう
          </p>
          <div className="flex justify-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/forms/d/1nCDdhWbqIKCp3ZYAao7EjpdneQsL5I0gOCebaqLYdHQ/edit"
              className="bg-[#25F4EE] text-black px-6 md:px-10 md:py-4 py-2 rounded-xl font-bold hover:bg-[#25F4EE]/90 transform hover:scale-105 transition-all duration-300"
            >
              応募する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};