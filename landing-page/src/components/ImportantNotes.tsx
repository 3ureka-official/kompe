import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ImportantNotes() {
  const notes = [
    "参加は無料です。",
    "賞金総額は10万円。入賞順位は再生数とクリエイターの創意工夫で決定します。",
    "動画の使用権は入賞者からブランドに譲渡され、広告素材として活用されます。"
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-2">
          <AlertCircle className="w-8 h-8 text-[#25F4EE]" />
          <span>重要事項</span>
        </h2>
        <div className="bg-[#222222] p-8 rounded-xl transform hover:scale-[1.02] transition-transform duration-300">
          <ul className="space-y-6">
            {notes.map((note, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="min-w-4 mt-2">
                  <div className="w-3 h-3 bg-[#25F4EE] rounded-full"></div>
                </div>
                <p className="text-lg leading-relaxed">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}