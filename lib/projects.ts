export type Project = {
  id: number
  slug: string
  title: string
  description: string
  tech: string[]
  category: string
  gradient: string
  featured: boolean
  image: string
  stats?: string
  githubUrl?: string
  demoUrl?: string
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'nairobi-emergency-dashboard',
    title: 'Nairobi Emergency Dashboard (NED)',
    description: 'A real-time, AI-powered emergency command center built for NADEMA that aggregates crowdsourced field updates and automates crisis summaries, accelerating disaster deployment and reducing response times across Nairobi County.',
    tech: ['Streamlit', 'Python', 'Google Sheets API', 'Google Apps Script', 'Plotly Mapbox'],
    category: 'Data Visualization',
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
    featured: true,
    image: '/images/nairobi-dashboard.png',
    stats: 'Live dashboard',
    demoUrl: 'https://nairobi-emergency-dashboard-ned.onrender.com',
  },
  {
    id: 2,
    slug: 'maya-tech',
    title: 'MAYA Tech',
    description: 'An innovative technology agency specializing in custom business automation, data-driven dashboards, and predictive intelligence solutions for scaling enterprises.',
    tech: ['Python', 'Google Apps Script', 'n8n', 'Make', 'Looker Studio', 'Gemini/GPT APIs'],
    category: 'Business Automation',
    gradient: 'from-primary/20 via-cyan-500/10 to-transparent',
    featured: true,
    image: '/images/maya-tech.png',
    stats: 'Automation systems',
    demoUrl: 'https://mayatechautomation.netlify.app/',
  },
  {
    id: 3,
    slug: 'cleanwater-ai',
    title: 'CleanWater AI',
    description: 'Developed an end-to-end machine learning system integrating WPDx, GEMS, and Google Earth Engine satellite data to monitor water quality and predict contamination risks across 22,000+ water points in Kenya.',
    tech: ['Python', 'XGBoost', 'NLP', 'Streamlit', 'Google Earth Engine API', 'Docker'],
    category: 'ML & Remote Sensing',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    featured: true,
    image: '/images/cleanwater-ai.png',
    stats: 'Remote sensing',
    githubUrl: 'https://github.com/DianaMayalo/CleanWatAI',
    demoUrl: 'https://cleanwatai.streamlit.app/',
  },
  {
    id: 4,
    slug: 'crop-disease-classification',
    title: 'Crop Disease Classification with CNN',
    description: 'Built and deployed a custom convolutional neural network using TensorFlow/Keras to classify 15 types of healthy and diseased crop leaves from the PlantVillage dataset with data augmentation and Streamlit web deployment.',
    tech: ['Python', 'TensorFlow/Keras', 'CNN', 'Computer Vision', 'Streamlit', 'Scikit-learn'],
    category: 'Deep Learning',
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    featured: true,
    image: '/images/crop-disease.png',
    stats: '94% Accuracy',
    githubUrl: 'https://github.com/DianaMayalo/Crop-Disease-Detection',
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
