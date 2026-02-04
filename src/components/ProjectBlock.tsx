import React, { useState } from 'react';
import { Project, GalleryItem } from '../types';
import { Pencil, Wand2, Trash2, Layers, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface ProjectBlockProps {
  project: Project;
  index: number;
  isEditable: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onAiAssist: (project: Project) => void;
}

// Fonction utilitaire pour détecter si l'URL est une vidéo
// Amélioration: supporte les URLs avec paramètres (ex: ?v=1)
const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);

export const ProjectBlock: React.FC<ProjectBlockProps> = ({ 
  project, 
  index, 
  isEditable, 
  onEdit, 
  onDelete,
  onAiAssist 
}) => {
  const isEven = index % 2 === 0;
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (images: string[], startIndex: number = 0) => {
    setCurrentImages(images);
    setCurrentImageIndex(startIndex);
    setLightboxOpen(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <>
      <div className="py-20 md:py-32 border-b border-neutral-900 last:border-0">
        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-20 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
          
          {/* Visual Block (Main Image) */}
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-neutral-800/50 rounded-2xl rotate-3 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-neutral-900 border border-neutral-800 group-hover:border-neutral-600 transition-colors cursor-pointer" onClick={() => openLightbox([project.imageUrl])}>
               <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-auto block opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/800x600/1a1a1a/666666?text=Image+Introuvable';
                }}
              />
            </div>
          </div>

          {/* Text Block */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6">
            <div className="flex flex-col space-y-2">
              {/* MODIFICATION ICI : text-neutral-300 pour être plus visible */}
              <span className="text-neutral-300 font-medium tracking-[0.2em] text-xs uppercase border-l-2 border-white pl-3">
                {project.client} • {project.year}
              </span>
              <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mt-2">
                {project.title}
              </h3>
            </div>

            {/* MODIFICATION ICI : text-neutral-200 (quasi blanc) au lieu de text-neutral-400 (gris) */}
            <p className="text-lg text-neutral-200 leading-relaxed font-light">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs uppercase tracking-wide font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Edit Controls */}
            {isEditable && (
              <div className="flex gap-3 mt-6 pt-6 border-t border-neutral-800 w-full">
                <button 
                  onClick={() => onEdit(project)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <Pencil size={16} />
                  Modifier
                </button>
                <button 
                  onClick={() => onAiAssist(project)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-white border border-white rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  <Wand2 size={16} />
                  Améliorer (IA)
                </button>
                <button 
                  onClick={() => onDelete(project.id)}
                  className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Media Gallery Section (Video + Masonry Grid) */}
        {(project.video || (project.gallery && project.gallery.length > 0)) && (
          <div className="mt-16 md:mt-24 w-full animate-fade-in-up">
             {/* MODIFICATION ICI : text-neutral-300 au lieu de text-neutral-500 */}
             <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-widest mb-6">Visuels & Médias</h4>
             
             {/* Video Section */}
             {project.video && (
               <div className={`mb-8 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 relative group ${project.videoFormat === 'portrait' ? 'max-w-sm mx-auto shadow-2xl shadow-purple-900/10' : ''}`}>
                  <video 
                    src={project.video} 
                    controls 
                    playsInline
                    loop
                    className={`w-full object-cover mx-auto bg-black ${project.videoFormat === 'portrait' ? 'aspect-[9/16]' : 'aspect-video max-h-[600px] object-contain'}`}
                  >
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
               </div>
             )}

             {/* Image Gallery Masonry (Pinterest Style) */}
             {project.gallery && project.gallery.length > 0 && (
               <div className="columns-2 md:columns-4 gap-4 space-y-4">
                 {project.gallery.map((item: GalleryItem, i: number) => {
                   
                   // Determine if item is a CarouselGroup or simple string
                   const isCarousel = typeof item !== 'string' && item.type === 'carousel';
                   const mediaUrl = isCarousel ? (item as any).cover : (item as string);
                   const isItemVideo = isVideo(mediaUrl);
                   
                   return (
                     <div 
                        key={i} 
                        onClick={() => openLightbox(isCarousel ? (item as any).images : [item as string])}
                        className="break-inside-avoid relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 group/item cursor-pointer shadow-lg hover:shadow-xl hover:border-neutral-600 transition-all duration-300"
                      >
                       {isItemVideo ? (
                          <video 
                            src={mediaUrl} 
                            className="w-full h-auto block" 
                            muted 
                            loop 
                            autoPlay 
                            playsInline 
                          />
                       ) : (
                          <img 
                            src={mediaUrl} 
                            alt={`${project.title} - visuel ${i+1}`} 
                            className="w-full h-auto block transition-transform duration-500 group-hover/item:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback si l'image est cassée
                              e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/666666?text=Image+Introuvable';
                            }}
                          />
                       )}
                       
                       {/* Carousel Indicator Overlay */}
                       {isCarousel && (
                         <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                           <Layers className="text-white w-8 h-8 mb-2" />
                           <span className="text-white font-bold text-sm tracking-widest uppercase">
                             {(item as any).images.length} Visuels
                           </span>
                           <span className="text-white/70 text-xs mt-1">Voir la galerie</span>
                         </div>
                       )}

                       {/* Simple Overlay */}
                       {!isCarousel && (
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            {isItemVideo && <Play className="text-white w-10 h-10 drop-shadow-lg" fill="currentColor" />}
                          </div>
                       )}
                     </div>
                   );
                 })}
               </div>
             )}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setLightboxOpen(false)}>
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
             {currentImages.length > 1 && (
               <button 
                onClick={prevImage}
                className="absolute left-2 md:-left-12 p-2 bg-neutral-900/50 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm z-10"
               >
                 <ChevronLeft size={32} />
               </button>
             )}

             {isVideo(currentImages[currentImageIndex]) ? (
               <video 
                 src={currentImages[currentImageIndex]} 
                 className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                 controls
                 autoPlay
               />
             ) : (
               <img 
                 src={currentImages[currentImageIndex]} 
                 alt="Lightbox view" 
                 className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                 onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/800x600/1a1a1a/666666?text=Image+Introuvable';
                 }}
               />
             )}

            {currentImages.length > 1 && (
               <button 
                onClick={nextImage}
                className="absolute right-2 md:-right-12 p-2 bg-neutral-900/50 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm z-10"
               >
                 <ChevronRight size={32} />
               </button>
             )}
             
             {currentImages.length > 1 && (
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/60 rounded-full text-white text-sm font-medium backdrop-blur-md">
                 {currentImageIndex + 1} / {currentImages.length}
               </div>
             )}
          </div>
        </div>
      )}
    </>
  );
};
