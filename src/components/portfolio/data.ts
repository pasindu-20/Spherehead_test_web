// Define interfaces for content consistency
export interface ProjectContent {
  laptopImage: string;
  tabletImage: string;
  services: string[];
}

export interface Project {
  id: string;
  title: string;
  servicesLine: string; // The service line next to the title in the header
  bgColor: string; // Specific background color for expanded state
  expandedContent: ProjectContent;
}

// Data Array for projects
export const projects: Project[] = [
  {
    id: 'leaps',
    title: 'LEAPS',
    servicesLine: 'Web Designing | Branding | Marketing',
    bgColor: '#173460', 
    expandedContent: {
      laptopImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684957/Leaps_Img1_ngdobq.webp",
      tabletImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684957/Leaps_Img2_iop3nm.webp",
      services: ['Web Designing', 'Branding', 'Marketing']
    }
  },
  {
    id: 'alamer',
    title: 'A LA MER',
    servicesLine: 'Web Designing | Branding | Marketing',
    bgColor: '#252525', 
    expandedContent: {
      laptopImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684956/A_LA_MER_img1_s8duem.webp",
      tabletImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684955/A_LA_MER_img2_tb8fsw.webp",
      services: ['Web Designing', 'Branding', 'Marketing']
    }
  },
  {
    id: 'hourmarkers',
    title: 'HOUR MARKERS',
    servicesLine: 'Web Designing | Development | Branding | Marketing',
    bgColor: '#533C15', 
    expandedContent: {
      laptopImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776765694/HourMarkers_img1_ttfxsf.webp",
      tabletImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684954/HourMarkers_img2_waw0in.webp",
      services: ['Web Designing', 'Development', 'Branding', 'Marketing']
    }
  },
  {
    id: 'winlo',
    title: 'WINLO',
    servicesLine: 'Web Designing | Development | Logistics',
    bgColor: '#000000', 
    expandedContent: {
      laptopImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776765694/HourMarkers_img1_ttfxsf.webp",
      tabletImage: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684954/HourMarkers_img2_waw0in.webp",
      services: ['Logistics Platform', 'Web App', 'Analytics'] 
    }
  }
];