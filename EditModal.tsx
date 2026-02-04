import React, { useState, useEffect } from 'react';
import { Project, Tone } from '../types';
import { X, Wand2, Loader2, Check } from 'lucide-react';
import { refineText } from '../services/geminiService';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null; // null means creating new
  onSave: (project: Project) => void;
  isAiModeInitial?: boolean;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, project, onSave, isAiModeInitial = false }) => {
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    client: '',
    description: '',
    imageUrl: 'https://picsum.photos/seed/new/800/600',
    tags: [],
    year: new Date().getFullYear().toString(),
    video: '',
    videoFormat: 'landscape'
  });

  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [selectedTone, setSelectedTone] = useState<Tone>(Tone.PROFESSIONAL);

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        video: project.video || '',
        videoFormat: project.videoFormat || 'landscape'
      });
    } else {
      setFormData({
        id: crypto.randomUUID(),
        title: '',
        client: '',
        description: '',
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/600`,
        tags: [],
        year: new Date().getFullYear().toString(),
        video: '',
        videoFormat: 'landscape'
      });
    }
  }, [project, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleAiRefine = async () => {
    if (!formData.description) return;
    
    setIsLoadingAi(true);
    try {
      const refined = await refineText(formData.description, selectedTone);
      setFormData(prev => ({ ...prev, description: refined }));
    } catch (error) {
      alert("Erreur lors de la génération IA. Vérifiez votre clé API.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {project ? 'Modifier le projet' : 'Nouveau projet'}
          </h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white outline-none"
                placeholder="Ex: Campagne Été"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Client</label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white outline-none"
                placeholder="Ex: Marque X"
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-neutral-400 mb-1">Image Principale (URL)</label>
             <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-black border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white outline-none"
                placeholder="https://..."
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-neutral-800/30 p-4 rounded-xl">
             <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Vidéo (URL)</label>
                <input
                  type="text"
                  name="video"
                  value={formData.video || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white outline-none"
                  placeholder="https://...mp4"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Format Vidéo</label>
                <select
                  name="videoFormat"
                  value={formData.videoFormat}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white outline-none appearance-none"
                >
                  <option value="landscape">Paysage (16:9)</option>
                  <option value="portrait">Portrait (TikTok 9:16)</option>
                </select>
             </div>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-neutral-800">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-neutral-400">Description</label>
              <div className="flex items-center gap-2">
                <select 
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value as Tone)}
                  className="text-xs border-neutral-700 rounded text-white bg-neutral-800 border px-2 py-1 outline-none"
                >
                  {Object.values(Tone).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <button 
                  onClick={handleAiRefine}
                  disabled={isLoadingAi || !formData.description}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-neutral-300 disabled:opacity-50"
                >
                  {isLoadingAi ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                  Réécrire avec IA
                </button>
              </div>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-3 bg-black border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white outline-none"
              placeholder="Décrivez votre projet ici..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Tags (séparés par des virgules)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              className="w-full px-4 py-2 bg-black border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white outline-none"
              placeholder="Social Media, Print, Branding..."
            />
          </div>
        </div>

        <div className="p-6 border-t border-neutral-800 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-neutral-400 font-medium hover:bg-neutral-800 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};