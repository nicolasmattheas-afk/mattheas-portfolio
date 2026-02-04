export interface CarouselGroup {
  type: 'carousel';
  title?: string;
  cover: string;
  images: string[];
}

export type GalleryItem = string | CarouselGroup;

export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  tags: string[];
  year: string;
  gallery?: GalleryItem[];
  video?: string;
  videoFormat?: 'landscape' | 'portrait';
}

export enum Tone {
  PROFESSIONAL = 'Professionnel',
  CREATIVE = 'Créatif',
  PERSUASIVE = 'Persuasif',
  MINIMALIST = 'Minimaliste'
}
