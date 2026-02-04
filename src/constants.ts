import { Project } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Lancement de Marque & Stratégie',
    client: 'IRIS Finance International Group',
    description: "Pilotage du lancement de marque, définition de la stratégie globale et refonte du site internet. Gestion des relations presse, animation digitale et organisation de séminaires et salons en Europe. J'ai également assuré la production de vidéos et la création de l'ensemble des supports visuels (Suite Adobe)",
    imageUrl: 'https://i.imgur.com/h7A5UTn.png',
    tags: ['Gestion de Projet & Branding', 'Marketing Digital', 'Relations Presse', 'Événementiel', 'Communication & Vidéo'],
    year: '2025-2026',
    video: 'https://i.imgur.com/5SRvF4I.mp4',
    videoFormat: 'portrait',
    gallery: [
      {
        type: 'carousel',
        title: 'Roadshow & Événements',
        cover: 'https://i.imgur.com/G0HGRP8.png', 
        images: [
          'https://i.imgur.com/G0HGRP8.png', 
          'https://i.imgur.com/gQijo0Z.png', 
          'https://i.imgur.com/omN2XGy.png', 
          'https://i.imgur.com/xQW9DPR.png', 
          'https://i.imgur.com/ysBX64V.png', 
        ]
      },
      {
        type: 'carousel',
        title: 'Campagne Mobile - Teasing', 
        cover: 'https://imgur.com/WCCqvnK.png', 
        images: [
          'https://imgur.com/WCCqvnK.png',
          'https://imgur.com/I87rIwe.png'
        ]
      },
      {
        type: 'carousel',
        title: 'Campagne Mobile - Reveal', 
        cover: 'https://imgur.com/GZ2sypP.png', 
        images: [
          'https://imgur.com/GZ2sypP.png',
          'https://imgur.com/NAJqLOA.png'
        ]
      },
      // --- NOUVEAU BLOC : 20 VISUELS (Reportage Photo) ---
      {
        type: 'carousel',
        title: 'Reportage Photo & Backstage (20 visuels)',
        cover: 'https://i.imgur.com/C6NkY8u.png', 
        images: [
          'https://i.imgur.com/C6NkY8u.png', // Couverture
          'https://i.imgur.com/rGJZEMR.png',
          'https://i.imgur.com/3TNG46N.png',
          'https://i.imgur.com/OjjA7Ky.png',
          'https://i.imgur.com/gsU3hHn.png',
          'https://i.imgur.com/3cgzI5w.png',
          'https://i.imgur.com/Z0kU53h.png',
          'https://i.imgur.com/WAjcwBv.png',
          'https://i.imgur.com/I32Pc5s.png',
          'https://i.imgur.com/2isDPSJ.png',
          'https://i.imgur.com/KZbHYvn.png',
          'https://i.imgur.com/ROb0sgy.png',
          'https://i.imgur.com/DjvvZTG.png',
          'https://i.imgur.com/SO0RmPv.png',
          'https://i.imgur.com/78HKUPT.png',
          'https://i.imgur.com/PgM99gw.png',
          'https://i.imgur.com/teXJtGu.png',
          'https://i.imgur.com/dySEngE.png',
          'https://i.imgur.com/GglPsOv.png',
          'https://i.imgur.com/8OEyinu.png'
        ]
      },
      // --- NOUVEAU BLOC : 6 VISUELS (Supports Print) ---
      {
        type: 'carousel',
        title: 'Supports Print & Flyers (6 visuels)',
        cover: 'https://i.imgur.com/chRfgvb.png', // Photo print/flyer
        images: [
          'https://i.imgur.com/YzegUvB.png',
          'https://i.imgur.com/fmqbhBL.png',
          'https://i.imgur.com/WZqEdeX.png',
          'https://i.imgur.com/cevjLh1.png',
          'https://i.imgur.com/LlfwKHL.png',
          'https://i.imgur.com/OnzlHq3.png'
        ]
      },
      'https://i.imgur.com/K6XdHk0.png', // Chart Performance 
      'https://i.imgur.com/ZZ9tA2k.png', // Label ESG LuxFLAG
      'https://i.imgur.com/TwfjuaZ.png', // Label ESG LuxFLAG
      {
        type: 'carousel',
        title: 'Relations Presse & Interviews',
        cover: 'https://i.imgur.com/RunlrrR.png', // Couverture Interview
        images: [
           'https://i.imgur.com/RunlrrR.png', 
           'https://i.imgur.com/95ol2kO.png', 
           'https://i.imgur.com/1kLaV09.png', 
        ]
      },
    ]
  },
  {
    id: '2',
    title: 'Stratégie Social Media & Contenu',
    client: 'MyKidStory',
    description: "Responsable de la stratégie éditoriale, j'ai conçu et planifié un calendrier multicanal qui a boosté l'engagement de +80%. J'ai assuré la production de contenus visuels et vidéos adaptés à chaque plateforme, en intégrant l'IA pour optimiser les workflows et la création de filtres AR. Mes missions incluaient également la veille sectorielle et l'augmentation de la présence en ligne via le référencement naturel et payant.",
    imageUrl: 'https://i.imgur.com/x68j0nW.png',
    tags: ['Social Media', 'Spark AR', 'SEO/SEA', 'Création de Contenu'],
    year: '2024',
    video: 'https://i.imgur.com/2uV8CJ2.mp4',
    videoFormat: 'portrait',
    gallery: [
      'https://i.imgur.com/auIYPiB.png', // 1. Inclusivité
      {
        type: 'carousel',
        title: 'Carrousel : Les 5 Piliers',
        cover: 'https://i.imgur.com/YaFbtLt.png', // Image de couverture
        images: [
          'https://i.imgur.com/YaFbtLt.png', 
          'https://i.imgur.com/HNO4TuO.png', 
          'https://i.imgur.com/wKvtQq4.png', 
          'https://i.imgur.com/Bu2l3qO.png', 
          'https://i.imgur.com/gAxXI5l.png', 
          'https://i.imgur.com/HRR30WL.png', 
        ]
      },
      'https://i.imgur.com/SX6LUH7.png', // Les mots de la communauté
      'https://i.imgur.com/FjlUceD.png', // Les mots de la communautée
      'https://i.imgur.com/1eZrrJ6.png', // Lancement officiel
    ]
  },
  {
    id: '3',
    title: 'Innovation & IA Générative',
    client: 'Projets Personnels',
    description: "Veille active et utilisation quotidienne des IA (MidJourney, Gemini, Perplexity) pour le design et le copywriting. Création d'une rubrique hebdomadaire sur LinkedIn",
    imageUrl: 'https://i.imgur.com/62r89uJ.png',
    tags: ['IA Générative', 'Prompt Engineering', 'Creative Tech'],
    year: '2023-2025',
    gallery: [
      'https://i.imgur.com/l3cRZQ9.mp4', // VIDEO PAYSAGE 1
      'https://i.imgur.com/Zj6LJnJ.mp4', // VIDEO PAYSAGE 2
      'https://i.imgur.com/rDzVqFW.mp4', // VIDEO PAYSAGE 3
      'https://i.imgur.com/D5RI5S5.mp4', // VIDEO PAYSAGE 4
      'https://i.imgur.com/18aurp3.mp4', // VIDEO PAYSAGE 5
      'https://i.imgur.com/aIux0L4l.png', // 1. Portrait futuriste
      'https://i.imgur.com/Uxtpm2y.png', // 2.
      'https://i.imgur.com/IFUk7n7.png', // 3.
      'https://i.imgur.com/NE33pxc.png', // 4.
      'https://i.imgur.com/guGHSCC.png', // 5.
      'https://i.imgur.com/hMDeSaM.png', // 6.
      'https://i.imgur.com/cZqBjqn.png', // 7.
      'https://i.imgur.com/9Zg0M9l.png', // 8.
      'https://i.imgur.com/vQfUoZy.png', // 8.
      'https://i.imgur.com/sC89cM3.png', // 8.
      'https://i.imgur.com/ZPzPqPX.png', // 8.
      'https://i.imgur.com/b5XYRcC.png', // 8.
      'https://i.imgur.com/W43g2GF.png', // 8.
    ]
  }
];
