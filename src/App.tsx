import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateScript, ScriptRequest } from './services/geminiService';
import { Loader2, Copy, Check, FileText, Video, User, Sparkles } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState<ScriptRequest>({
    name: '',
    age: '',
    background: '',
    expertise: '',
    niche: '',
    topic: '',
    style: 'Formal & Otoritatif',
    platform: 'YouTube (16:9 Landscape)',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const script = await generateScript(formData);
      setResult(script);
    } catch (error) {
      console.error('Failed to generate script:', error);
      alert('Failed to generate script. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      // Try to extract Part II if it exists
      const part2Index = result.indexOf('BAGIAN II');
      const textToCopy = part2Index !== -1 ? result.substring(part2Index) : result;
      
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">ProMonolog Script Engine</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                Speaker Profile
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Budi"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Age</label>
                    <input
                      required
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 35"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Background / Culture</label>
                  <input
                    required
                    type="text"
                    name="background"
                    value={formData.background}
                    onChange={handleChange}
                    placeholder="e.g. Praktisi Keuangan Syariah"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Expertise / Qualifications</label>
                  <input
                    required
                    type="text"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    placeholder="e.g. S2 Ekonomi"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Niche / Channel Topic</label>
                  <input
                    required
                    type="text"
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    placeholder="e.g. Edukasi Finansial"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-indigo-600" />
                    Content Details
                  </h2>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Content Topic / Title</label>
                  <textarea
                    required
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="e.g. Tips Mengatur Gaji biar nggak habis di tengah bulan"
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Style & Tone</label>
                  <select
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
                  >
                    <option value="Formal & Otoritatif">Formal & Otoritatif</option>
                    <option value="Santai & Kasual">Santai & Kasual</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Target Platform</label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
                  >
                    <option value="YouTube (16:9 Landscape)">YouTube (16:9 Landscape)</option>
                    <option value="TikTok/Reels/Shorts (9:16 Vertical)">TikTok/Reels/Shorts (9:16 Vertical)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Script...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Script
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[600px] flex flex-col overflow-hidden">
              
              <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Generated Script
                </h2>
                {result && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied Part II' : 'Copy for Word'}
                  </button>
                )}
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                {!result && !loading && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-slate-300" />
                    </div>
                    <p>Fill out the form and click generate to see your script here.</p>
                  </div>
                )}

                {loading && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                    <p className="animate-pulse">Crafting your professional monologue...</p>
                  </div>
                )}

                {result && (
                  <div className="prose prose-slate prose-indigo max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {result}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
