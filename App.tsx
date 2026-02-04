import React, { useState } from 'react';
import { Plus, Edit3, Eye, LayoutGrid, Mail, Linkedin, Globe, Cpu, PenTool, BarChart3, Rocket, Phone, Layers, MessageSquare, Monitor, Database } from 'lucide-react';
import { INITIAL_PROJECTS } from './constants';
import { Project } from './types';
import { ProjectBlock } from './components/ProjectBlock';
import { EditModal } from './components/EditModal';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isEditable, setIsEditable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEditingProject, setCurrentEditingProject] = useState<Project | null>(null);
  const [aiInitialMode, setAiInitialMode] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSave = (project: Project) => {
    setProjects(prev => {
      const exists = prev.find(p => p.id === project.id);
      if (exists) {
        return prev.map(p => p.id === project.id ? project : p);
      }
      return [...prev, project];
    });
    setModalOpen(false);
    setCurrentEditingProject(null);
  };

  const openNewProjectModal = () => {
    setCurrentEditingProject(null);
    setAiInitialMode(false);
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setCurrentEditingProject(project);
    setAiInitialMode(false);
    setModalOpen(true);
  };

  const openAiRefineModal = (project: Project) => {
    setCurrentEditingProject(project);
    setAiInitialMode(true);
    setModalOpen(true);
  };

  // Fonction de défilement fluide qui empêche la navigation par défaut
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Spécifique pour Contact : on va tout en bas de la page (bottom of document)
    if (id === 'contact') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-40 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-bold font-serif">M</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Matthéas NICOLAS</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors cursor-pointer">À propos</a>
              <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-white transition-colors cursor-pointer">Compétences</a>
              <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:text-white transition-colors cursor-pointer">Projets</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-colors cursor-pointer">Contact</a>
            </div>
            
            <button
              onClick={() => setIsEditable(!isEditable)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                isEditable 
                  ? 'bg-neutral-800 border-neutral-700 text-white' 
                  : 'bg-black border-neutral-800 text-neutral-500 hover:text-white hover:border-neutral-600'
              }`}
            >
              {isEditable ? <Eye size={14} /> : <Edit3 size={14} />}
              {isEditable ? 'Vue' : 'Édition'}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden bg-black pt-10 md:pt-0">
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left: Text */}
            <div className="text-center md:text-left order-2 md:order-1">
              <div className="inline-block mb-6 px-4 py-1.5 border border-neutral-800 bg-neutral-900/50 rounded-full text-xs font-medium tracking-widest uppercase text-neutral-400">
                Recherche Alternance en Marketing & Communication
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
                Matthéas <br/> Nicolas
              </h1>
              <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500 font-serif italic mb-8">
                Marketing Stratégique <br/> & Technologies Digitales
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-xl leading-relaxed font-light mx-auto md:mx-0">
                Étudiant en Master à Paris-Panthéon-Assas. <br/>
                Je fusionne créativité, data et IA pour concevoir des expériences de marque impactantes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6">
                <a 
                  href="#work" 
                  onClick={(e) => scrollToSection(e, 'work')}
                  className="px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-all lux-shadow text-center cursor-pointer"
                >
                  Voir mes projets
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="px-10 py-4 bg-transparent text-white font-semibold rounded-full border border-neutral-800 hover:border-white hover:bg-white/5 transition-all text-center cursor-pointer"
                >
                  Me contacter
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative order-1 md:order-2 flex justify-center md:justify-end h-[50vh] md:h-auto">
              <div className="relative w-full max-w-lg">
                {/* Image Container */}
                <div className="relative z-10">
                   <img 
                    src="https://i.imgur.com/YztLabR.png" 
                    alt="Matthéas Nicolas" 
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
                {/* Glow behind head (kept subtle for depth, removed colored blobs) */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-[60px] -z-10"></div>
              </div>
            </div>

          </div>
        </section>

        {/* Combined About & Skills Section */}
        <section id="about" className="py-24 px-6 bg-neutral-950 border-y border-neutral-900 scroll-mt-28">
          <div className="max-w-7xl mx-auto">
            
            {/* About / Bio Part */}
            <div className="max-w-4xl mx-auto mb-24">
              <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">À Propos</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">Profil Hybride</h3>
              <div className="prose prose-lg prose-invert text-neutral-400 leading-relaxed max-w-none">
                <p>
                  Actuellement étudiant en Master Marketing et Technologies Digitales à l’Université Paris Panthéon-Assas, je suis passionné par la communication, les nouvelles technologies et l’analyse de données.
                </p>
                <p className="mt-6">
                  Fort d’expériences en gestion de projets digitaux, en marketing digital et en IA LLM et générative, je recherche une alternance où je pourrai mettre mes compétences stratégiques et créatives au service d’une marque innovante.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                   <span className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium text-neutral-300">Anglais C1</span>
                   <span className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium text-neutral-300">Espagnol B2</span>
                   <span className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium text-neutral-300">Parcours International</span>
                </div>
              </div>
            </div>

            {/* Skills Part */}
            <div id="skills" className="border-t border-neutral-900 pt-24 scroll-mt-28">
              <div className="text-center mb-16">
                <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">Expertise</h2>
                <h3 className="text-4xl font-bold text-white">Mes Compétences</h3>
              </div>
              
              {/* Strategic Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                <div className="p-8 rounded-2xl bg-black border border-neutral-800 hover:border-neutral-600 transition-colors group">
                  <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors">
                    <BarChart3 size={24} />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-3">Stratégie Marketing</h4>
                  <p className="text-sm text-neutral-400">Digital & Multicanal, Analyse de données, Suivi de KPI, Veille sectorielle.</p>
                </div>

                <div className="p-8 rounded-2xl bg-black border border-neutral-800 hover:border-neutral-600 transition-colors group">
                  <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors">
                    <PenTool size={24} />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-3">Contenu & Branding</h4>
                  <p className="text-sm text-neutral-400">Création (Vidéo, Visuels), Storytelling, Gestion Réseaux Sociaux (Linkedin, Meta, TikTok).</p>
                </div>

                <div className="p-8 rounded-2xl bg-black border border-neutral-800 hover:border-neutral-600 transition-colors group">
                  <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors">
                    <Cpu size={24} />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-3">Innovation & IA</h4>
                  <p className="text-sm text-neutral-400">IA LLM et Générative (Gemini, ChatGPT, MidJourney, Perplexity, Nano Banana ), Prompt Engineering.</p>
                </div>
              </div>

              {/* IT / Tech Stack Details */}
              <div className="border border-neutral-800 rounded-3xl p-8 md:p-12 bg-black/40">
                <h4 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                  <Monitor size={24} className="text-neutral-400" />
                  Compétences Informatiques
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                  
                  {/* Design */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-semibold border-b border-neutral-800 pb-2">
                      <Layers size={18} /> Design & Visuel
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Suite Adobe</li>
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Canva</li>
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Meta Spark AR Studio</li>
                    </ul>
                  </div>

                  {/* CRM */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-semibold border-b border-neutral-800 pb-2">
                      <Database size={18} /> CRM & Analytics
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>HubSpot</li>
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Google Analytics</li>
                    </ul>
                  </div>

                  {/* Collab */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-semibold border-b border-neutral-800 pb-2">
                      <MessageSquare size={18} /> Gestion & Collab
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Jira / Slack / Discord</li>
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>LuQI</li>
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Cision</li>
                    </ul>
                  </div>

                   {/* Bureautique */}
                   <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-semibold border-b border-neutral-800 pb-2">
                      <Monitor size={18} /> Bureautique
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Office 365 (Word, Excel)</li>
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>PowerPoint</li>
                      <li className="flex items-center gap-2 text-neutral-400 text-sm"><span className="w-1.5 h-1.5 bg-white rounded-full"></span>Google Workspace</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Portfolio Grid */}
        <section id="work" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-900 scroll-mt-28">
          <div className="flex justify-between items-end mb-20">
            <div>
              <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">Portfolio</h2>
              <h3 className="text-4xl font-bold text-white">Expériences & Projets</h3>
            </div>
            {isEditable && (
              <button 
                onClick={openNewProjectModal}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors shadow-lg font-medium"
              >
                <Plus size={18} />
                Ajouter une expérience
              </button>
            )}
          </div>

          <div className="flex flex-col">
            {projects.map((project, index) => (
              <ProjectBlock 
                key={project.id}
                project={project}
                index={index}
                isEditable={isEditable}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onAiAssist={openAiRefineModal}
              />
            ))}
            
            {projects.length === 0 && (
              <div className="text-center py-32 bg-neutral-900/50 rounded-3xl border border-dashed border-neutral-800">
                <LayoutGrid className="mx-auto h-12 w-12 text-neutral-700 mb-4" />
                <p className="text-neutral-500 font-medium">Aucun projet pour le moment.</p>
                {isEditable && (
                   <button onClick={openNewProjectModal} className="mt-4 text-white font-semibold hover:underline">
                     Commencez par en ajouter un
                   </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Contact/Footer */}
        <section id="contact" className="bg-neutral-950 text-white py-24 px-6 relative overflow-hidden border-t border-neutral-900 scroll-mt-28">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">On travaille ensemble ?</h2>
            <p className="text-neutral-400 mb-12 text-lg max-w-2xl mx-auto">
              Je suis disponible pour une alternance. Discutons de vos projets marketing et tech.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a href="mailto:nicolasmattheaspro@gmail.com" className="group flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-full transition-all">
                <Mail className="text-black group-hover:scale-110 transition-transform" />
                <span className="font-semibold">nicolasmattheaspro@gmail.com</span>
              </a>
              <a href="tel:0761069444" className="group flex items-center gap-3 px-8 py-4 bg-transparent border border-neutral-800 text-white hover:border-white rounded-full transition-all">
                <Phone className="text-neutral-400 group-hover:text-white transition-colors" />
                <span className="font-medium">07.61.06.94.44</span>
              </a>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/mattheas-nicolas" target="_blank" rel="noopener noreferrer" className="p-4 bg-neutral-900 hover:bg-white hover:text-black rounded-full transition-all border border-neutral-800 group">
                  <Linkedin className="text-neutral-400 group-hover:text-black transition-colors" />
                </a>
              </div>
            </div>

            <div className="mt-24 pt-8 border-t border-neutral-900 text-neutral-600 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <span>© {new Date().getFullYear()} Matthéas NICOLAS.</span>
              <span className="flex items-center gap-2 text-neutral-600">
                Code généré avec <Cpu size={14} /> & IA
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Edit Modal */}
      <EditModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={currentEditingProject}
        onSave={handleSave}
        isAiModeInitial={aiInitialMode}
      />
    </div>
  );
}