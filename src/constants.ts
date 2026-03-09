import { VideoPost, Professional, Product, QuoteRequest, MaterialQuote, Store, Banner, Review, Album } from './types';

export const MOCK_BANNERS: Banner[] = [
  { id: 'b1', image: 'https://picsum.photos/seed/banner1/800/400', link: 'marketplace', title: 'Ofertas de Verão' },
  { id: 'b2', image: 'https://picsum.photos/seed/banner2/800/400', link: 'marketplace', title: 'Tudo para sua Pintura' },
  { id: 'b3', image: 'https://picsum.photos/seed/banner3/800/400', link: 'marketplace', title: 'Novas Ferramentas' }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    reviewerName: 'Alice Oliveira',
    reviewerAvatar: 'https://i.pravatar.cc/150?u=alice',
    rating: 5,
    comment: 'Trabalho impecável! Muito pontual e caprichoso.',
    date: '2024-02-15'
  },
  {
    id: 'r2',
    reviewerName: 'Bruno Santos',
    reviewerAvatar: 'https://i.pravatar.cc/150?u=bruno',
    rating: 4,
    comment: 'Ótimo atendimento, recomendo.',
    date: '2024-02-10'
  }
];

export const MOCK_STORES: Store[] = [
  {
    id: 's1',
    name: 'Loja Construir',
    avatar: 'https://i.pravatar.cc/150?u=s1',
    role: 'store',
    rating: 4.7,
    reviewCount: 245,
    location: 'Vila Mariana, SP',
    isVerified: true,
    categories: ['Materiais', 'Ferramentas'],
    description: 'A maior variedade de materiais para construção e reforma da região.',
    reviews: MOCK_REVIEWS
  },
  {
    id: 's2',
    name: 'Tintas & Cia',
    avatar: 'https://i.pravatar.cc/150?u=s2',
    role: 'store',
    rating: 4.9,
    reviewCount: 180,
    location: 'Pinheiros, SP',
    isVerified: true,
    categories: ['Pintura', 'Decoração'],
    description: 'Especialistas em cores e acabamentos para sua casa.',
    reviews: MOCK_REVIEWS
  },
  {
    id: 's3',
    name: 'Madeireira Silva',
    avatar: 'https://i.pravatar.cc/150?u=s3',
    role: 'store',
    rating: 4.5,
    reviewCount: 120,
    location: 'Ipiranga, SP',
    isVerified: false,
    categories: ['Madeira', 'Estrutura'],
    description: 'Madeiras de qualidade para todos os tipos de projetos.',
    reviews: MOCK_REVIEWS
  }
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'pr1', 
    name: 'Furadeira Bosch Professional', 
    price: 450.90, 
    image: 'https://picsum.photos/seed/drill/400/400', 
    images: [
      'https://picsum.photos/seed/drill1/400/400',
      'https://picsum.photos/seed/drill2/400/400',
      'https://picsum.photos/seed/drill3/400/400'
    ],
    storeId: 's1', 
    storeName: 'Loja Construir',
    description: 'Furadeira de impacto potente para uso profissional em concreto, madeira e metal.',
    rating: 4.8,
    reviewCount: 85,
    reviews: MOCK_REVIEWS
  },
  { 
    id: 'pr2', 
    name: 'Tinta Suvinil Fosca 18L', 
    price: 320.00, 
    image: 'https://picsum.photos/seed/paint/400/400', 
    images: [
      'https://picsum.photos/seed/paint1/400/400',
      'https://picsum.photos/seed/paint2/400/400'
    ],
    storeId: 's2', 
    storeName: 'Tintas & Cia',
    description: 'Tinta acrílica de alta cobertura e acabamento fosco aveludado.',
    rating: 4.9,
    reviewCount: 120,
    reviews: MOCK_REVIEWS
  },
  { 
    id: 'pr3', 
    name: 'Martelo de Unha 27mm', 
    price: 45.50, 
    image: 'https://picsum.photos/seed/hammer/400/400', 
    storeId: 's1', 
    storeName: 'Loja Construir',
    description: 'Martelo de aço forjado com cabo emborrachado ergonômico.',
    rating: 4.5,
    reviewCount: 45,
    reviews: MOCK_REVIEWS
  },
  { 
    id: 'pr4', 
    name: 'Kit Pincéis Atlas', 
    price: 89.90, 
    image: 'https://picsum.photos/seed/brushes/400/400', 
    storeId: 's2', 
    storeName: 'Tintas & Cia',
    description: 'Conjunto completo de pincéis para diferentes tipos de tintas e superfícies.',
    rating: 4.7,
    reviewCount: 32,
    reviews: MOCK_REVIEWS
  },
  { 
    id: 'pr5', 
    name: 'Serra Circular Makita', 
    price: 780.00, 
    image: 'https://picsum.photos/seed/saw/400/400', 
    storeId: 's1', 
    storeName: 'Loja Construir',
    description: 'Serra circular de alta performance para cortes precisos em madeira.',
    rating: 4.9,
    reviewCount: 67,
    reviews: MOCK_REVIEWS
  },
  { 
    id: 'pr6', 
    name: 'Verniz Marítimo 3.6L', 
    price: 115.00, 
    image: 'https://picsum.photos/seed/varnish/400/400', 
    storeId: 's2', 
    storeName: 'Tintas & Cia',
    description: 'Verniz de alta resistência para proteção de madeiras em ambientes externos.',
    rating: 4.6,
    reviewCount: 28,
    reviews: MOCK_REVIEWS
  }
];

export const MOCK_VIDEOS: VideoPost[] = [
  {
    id: '1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-worker-drilling-a-hole-in-a-wall-4552-large.mp4',
    user: {
      id: 'p1',
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?u=p1',
      role: 'professional',
      handle: 'joao_obras'
    },
    description: 'Instalação de suporte para TV em parede de drywall. Dica rápida de bucha! 🛠️ #reforma #drywall',
    thumbnail: 'https://picsum.photos/seed/drill-thumb/400/600',
    likes: 1240,
    comments: 45,
    products: [
      { id: 'pr1', name: 'Furadeira Bosch', price: 450, image: 'https://picsum.photos/seed/drill/200/200', storeId: 's1', storeName: 'Loja Construir' }
    ]
  },
  {
    id: '2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-painter-painting-a-wall-with-a-roller-4554-large.mp4',
    user: {
      id: 'p2',
      name: 'Maria Pinturas',
      avatar: 'https://i.pravatar.cc/150?u=p2',
      role: 'professional',
      handle: 'maria_decor'
    },
    description: 'Transformação incrível com apenas uma lata de tinta! Cor: Cinza Elefante. 🎨 #pintura #decor',
    thumbnail: 'https://picsum.photos/seed/paint-thumb/400/600',
    likes: 3500,
    comments: 120,
    products: [
      { id: 'pr2', name: 'Tinta Suvinil 18L', price: 320, image: 'https://picsum.photos/seed/paint/200/200', storeId: 's2', storeName: 'Tintas & Cia' }
    ]
  },
  {
    id: '3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-with-a-circular-saw-4553-large.mp4',
    user: {
      id: 'p3',
      name: 'Carlos Marceneiro',
      avatar: 'https://i.pravatar.cc/150?u=p3',
      role: 'professional',
      handle: 'carlos_wood'
    },
    description: 'Corte preciso para móveis planejados. A segurança vem em primeiro lugar! 🪚 #marcenaria #diy',
    thumbnail: 'https://picsum.photos/seed/wood-thumb/400/600',
    likes: 890,
    comments: 22
  }
];

export const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: 'p1',
    name: 'João Silva',
    avatar: 'https://i.pravatar.cc/150?u=p1',
    role: 'professional',
    specialty: 'Pedreiro & Azulejista',
    rating: 4.9,
    reviewCount: 152,
    projectsCount: 45,
    isVerified: true,
    isPremium: true,
    location: 'Centro, São Paulo',
    bio: 'Especialista em reformas residenciais com foco em acabamento fino e rapidez.',
    portfolio: [
      'https://picsum.photos/seed/p1-1/400/300',
      'https://picsum.photos/seed/p1-2/400/300',
      'https://picsum.photos/seed/p1-3/400/300'
    ],
    albums: [
      {
        id: 'a1',
        title: 'Reforma Cozinha Vila Madalena',
        description: 'Troca total de revestimentos e bancadas.',
        images: [
          'https://picsum.photos/seed/a1-1/600/400',
          'https://picsum.photos/seed/a1-2/600/400',
          'https://picsum.photos/seed/a1-3/600/400'
        ]
      },
      {
        id: 'a2',
        title: 'Banheiro Suíte Master',
        description: 'Instalação de porcelanato 120x60 e nichos embutidos.',
        images: [
          'https://picsum.photos/seed/a2-1/600/400',
          'https://picsum.photos/seed/a2-2/600/400'
        ]
      }
    ],
    reviews: MOCK_REVIEWS
  },
  {
    id: 'p2',
    name: 'Maria Pinturas',
    avatar: 'https://i.pravatar.cc/150?u=p2',
    role: 'professional',
    specialty: 'Pintora Decorativa',
    rating: 4.8,
    reviewCount: 98,
    projectsCount: 32,
    isVerified: true,
    isPremium: false,
    location: 'Pinheiros, São Paulo',
    bio: 'Transformando ambientes com cores e texturas exclusivas.',
    portfolio: [
      'https://picsum.photos/seed/p2-1/400/300',
      'https://picsum.photos/seed/p2-2/400/300'
    ],
    albums: [
      {
        id: 'a3',
        title: 'Pintura Apartamento Loft',
        description: 'Aplicação de cimento queimado e cores pastéis.',
        images: [
          'https://picsum.photos/seed/a3-1/600/400',
          'https://picsum.photos/seed/a3-2/600/400'
        ]
      }
    ],
    reviews: MOCK_REVIEWS
  }
];

export const MOCK_QUOTES: QuoteRequest[] = [
  {
    id: 'q1',
    clientId: 'u1',
    clientName: 'Carlos Cliente',
    description: 'Preciso trocar o piso da minha sala, aproximadamente 25m2.',
    photos: ['https://picsum.photos/seed/floor1/400/300', 'https://picsum.photos/seed/floor2/400/300'],
    status: 'pending',
    date: '2024-03-02',
    category: 'Pedreiro'
  },
  {
    id: 'q2',
    clientId: 'u1',
    clientName: 'Carlos Cliente',
    description: 'Pintura de 3 quartos e corredor.',
    photos: ['https://picsum.photos/seed/wall1/400/300'],
    status: 'pending',
    date: '2024-03-01',
    category: 'Pintor'
  }
];

export const MOCK_MATERIAL_QUOTES: MaterialQuote[] = [
  {
    id: 'mq1',
    storeId: 's1',
    productName: 'Cimento CP-II 50kg',
    quantity: 10,
    status: 'pending',
    date: '2024-03-02'
  },
  {
    id: 'mq2',
    storeId: 's1',
    productName: 'Piso Porcelanato 60x60',
    quantity: 30,
    status: 'pending',
    date: '2024-03-02'
  }
];
