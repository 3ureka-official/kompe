import React from 'react';
import { ArrowRight } from 'lucide-react';

export function FloatingButton() {
  return (
    <a
      href="https://docs.google.com/forms/d/1nCDdhWbqIKCp3ZYAao7EjpdneQsL5I0gOCebaqLYdHQ/edit"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-[#25F4EE] text-black font-bold py-2 md:py-4 px-6 md:px-8 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#20D8D8] transition-all duration-300 transform hover:scale-105 hover:shadow-xl z-50"
    >
      応募する
      <ArrowRight className="w-5 h-5" />
    </a>
  );
}