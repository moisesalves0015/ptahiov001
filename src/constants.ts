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
  },
  {
    id: 's4',
    name: 'Hidráulica Central',
    avatar: 'https://i.pravatar.cc/150?u=s4',
    role: 'store',
    rating: 4.6,
    reviewCount: 95,
    location: 'Moema, SP',
    isVerified: true,
    categories: ['Hidráulica', 'Metais'],
    description: 'Tudo para sua rede hidráulica e acabamentos com as melhores marcas.',
    reviews: MOCK_REVIEWS
  },
  {
    id: 's5',
    name: 'Gesso & Estilo',
    avatar: 'https://i.pravatar.cc/150?u=s5',
    role: 'store',
    rating: 4.8,
    reviewCount: 64,
    location: 'Santana, SP',
    isVerified: true,
    categories: ['Gesso', 'Drywall'],
    description: 'Excelência em acabamentos em gesso e soluções em drywall.',
    reviews: MOCK_REVIEWS
  },
  {
    id: 's6',
    name: 'Ferragens Total',
    avatar: 'https://i.pravatar.cc/150?u=s6',
    role: 'store',
    rating: 4.4,
    reviewCount: 42,
    location: 'Lapa, SP',
    isVerified: false,
    categories: ['Ferragens', 'Segurança'],
    description: 'A solução completa em ferragens e acessórios para sua obra.',
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
  },
  {
    id: 'pr7',
    name: 'Cimento CPII 50kg',
    price: 38.90,
    image: 'https://picsum.photos/seed/cement/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Cimento Portland de alta resistência para obras civis.',
    rating: 4.7,
    reviewCount: 200,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr8',
    name: 'Parafuso Sextavado M10 (100un)',
    price: 22.50,
    image: 'https://picsum.photos/seed/bolt/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Kit de parafusos galvanizados para múltiplas aplicações.',
    rating: 4.4,
    reviewCount: 56
  },
  {
    id: 'pr9',
    name: 'Argamassa AC-II 20kg',
    price: 29.90,
    image: 'https://picsum.photos/seed/mortar/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Argamassa colante para assentamento de cerâmicas e porcelanatos.',
    rating: 4.8,
    reviewCount: 130,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr10',
    name: 'Porcelanato Acetinado 60x60',
    price: 89.90,
    image: 'https://picsum.photos/seed/porcelain/400/400',
    storeId: 's3',
    storeName: 'Madeireira Silva',
    description: 'Porcelanato de alta resistência para piso e parede.',
    rating: 4.9,
    reviewCount: 88,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr11',
    name: 'Rolo de Lã 23cm',
    price: 19.90,
    image: 'https://picsum.photos/seed/roller/400/400',
    storeId: 's2',
    storeName: 'Tintas & Cia',
    description: 'Rolo de lã para aplicação de tintas látex e acrílicas.',
    rating: 4.3,
    reviewCount: 40
  },
  {
    id: 'pr12',
    name: 'Rejunte Flexível Branco 1kg',
    price: 14.50,
    image: 'https://picsum.photos/seed/grout/400/400',
    storeId: 's2',
    storeName: 'Tintas & Cia',
    description: 'Rejunte flexível para juntas de 2 a 10mm em pisos e paredes.',
    rating: 4.6,
    reviewCount: 75,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr13',
    name: 'Tábua de Pinus 3m',
    price: 45.00,
    image: 'https://picsum.photos/seed/pine/400/400',
    storeId: 's3',
    storeName: 'Madeireira Silva',
    description: 'Tábua de pinus seco para decks, pergolados e móveis.',
    rating: 4.5,
    reviewCount: 62,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr14',
    name: 'Nível Digital 60cm',
    price: 135.00,
    image: 'https://picsum.photos/seed/level/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Nível digital com display LCD e precisão de ±0.1°.',
    rating: 4.7,
    reviewCount: 33
  },
  {
    id: 'pr15',
    name: 'Impermeabilizante Vedacit 18L',
    price: 198.00,
    image: 'https://picsum.photos/seed/waterproof/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Impermeabilizante para lajes, calhas, cisternas e fundações.',
    rating: 4.8,
    reviewCount: 95,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr16',
    name: 'Viga de Eucalipto 4m',
    price: 62.00,
    image: 'https://picsum.photos/seed/beam/400/400',
    storeId: 's3',
    storeName: 'Madeireira Silva',
    description: 'Viga de eucalipto tratado para estruturas e telhados.',
    rating: 4.6,
    reviewCount: 48,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr17',
    name: 'Lixadeira Angular 4.5" DeWalt',
    price: 320.00,
    image: 'https://picsum.photos/seed/grinder/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Esmerilhadeira angular 4.5" potente para corte e desbaste.',
    rating: 4.8,
    reviewCount: 72,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr18',
    name: 'Tinta Acrílica Premium 3.6L',
    price: 89.90,
    image: 'https://picsum.photos/seed/acrylicpaint/400/400',
    storeId: 's2',
    storeName: 'Tintas & Cia',
    description: 'Tinta acrílica premium lavável para ambientes internos.',
    rating: 4.7,
    reviewCount: 110
  },
  {
    id: 'pr19',
    name: 'Chave de Impacto Bosch',
    price: 580.00,
    image: 'https://picsum.photos/seed/impact/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Chave de impacto elétrica 1/2" para parafusos de alta torque.',
    rating: 4.9,
    reviewCount: 55,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr20',
    name: 'Manta Asfáltica 10m',
    price: 148.00,
    image: 'https://picsum.photos/seed/asphalt/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Manta asfáltica aluminizada para impermeabilização de lajes e telhados.',
    rating: 4.7,
    reviewCount: 63,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr21',
    name: 'Piso Laminado 8mm m²',
    price: 54.90,
    image: 'https://picsum.photos/seed/laminate/400/400',
    storeId: 's3',
    storeName: 'Madeireira Silva',
    description: 'Piso laminado AC4 resistente a riscos e umidade.',
    rating: 4.6,
    reviewCount: 90,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr22',
    name: 'Massa Corrida PVA 25kg',
    price: 72.00,
    image: 'https://picsum.photos/seed/putty/400/400',
    storeId: 's2',
    storeName: 'Tintas & Cia',
    description: 'Massa corrida para preparação de paredes antes de pintura.',
    rating: 4.5,
    reviewCount: 88
  },
  {
    id: 'pr23',
    name: 'Conduíte Corrugado 25mm 50m',
    price: 58.00,
    image: 'https://picsum.photos/seed/conduit/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Conduíte corrugado para proteção de fiações elétricas.',
    rating: 4.4,
    reviewCount: 42
  },
  {
    id: 'pr24',
    name: 'Dobradiça Inox 3.5" (par)',
    price: 18.90,
    image: 'https://picsum.photos/seed/hinge/400/400',
    storeId: 's3',
    storeName: 'Madeireira Silva',
    description: 'Par de dobradiças em inox escovado para portas e janelas.',
    rating: 4.3,
    reviewCount: 35
  },
  {
    id: 'pr25',
    name: 'Tela de Arame Soldada 50m',
    price: 210.00,
    image: 'https://picsum.photos/seed/mesh/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Tela de arame galvanizado para cercas e reforço de argamassa.',
    rating: 4.5,
    reviewCount: 27,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr26',
    name: 'Primer Selador Acrílico 18L',
    price: 115.00,
    image: 'https://picsum.photos/seed/primer/400/400',
    storeId: 's2',
    storeName: 'Tintas & Cia',
    description: 'Selador acrílico para uniformizar a absorção das paredes.',
    rating: 4.6,
    reviewCount: 51
  },
  {
    id: 'pr27',
    name: 'Painel MDF Branco 15mm',
    price: 95.00,
    image: 'https://picsum.photos/seed/mdf/400/400',
    storeId: 's3',
    storeName: 'Madeireira Silva',
    description: 'Painel de MDF branco para móveis e painéis decorativos.',
    rating: 4.7,
    reviewCount: 68,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr28',
    name: 'Caixa de Passagem 4x4',
    price: 6.90,
    image: 'https://picsum.photos/seed/junction/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Caixa de passagem elétrica para instalações embutidas.',
    rating: 4.2,
    reviewCount: 120
  },
  {
    id: 'pr29',
    name: 'Pincel Cerdas Naturais 3"',
    price: 24.90,
    image: 'https://picsum.photos/seed/brush3/400/400',
    storeId: 's2',
    storeName: 'Tintas & Cia',
    description: 'Pincel de cerdas naturais para acabamentos finos.',
    rating: 4.4,
    reviewCount: 45
  },
  {
    id: 'pr30',
    name: 'Terça de Madeira 6m',
    price: 78.00,
    image: 'https://picsum.photos/seed/lumber/400/400',
    storeId: 's3',
    storeName: 'Madeireira Silva',
    description: 'Terça de madeira tratada para estrutura de telhados.',
    rating: 4.5,
    reviewCount: 38,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr31',
    name: 'Telha Ondulada Fibrocimento 2.44m',
    price: 42.50,
    image: 'https://picsum.photos/seed/tile/400/400',
    storeId: 's1',
    storeName: 'Loja Construir',
    description: 'Telha fibrocimento 6mm ideal para galpões e coberturas.',
    rating: 4.6,
    reviewCount: 142,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'pr32',
    name: 'Solvente Aguarrás 5L',
    price: 32.00,
    image: 'https://picsum.photos/seed/solvent/400/400',
    storeId: 's2',
    storeName: 'Tintas & Cia',
    description: 'Aguarrás mineral para diluição de tintas a óleo e esmaltes.',
    rating: 4.3,
    reviewCount: 60
  },
  {
    id: 'pr33',
    name: 'Misturador Monocomando',
    price: 890.00,
    image: 'https://picsum.photos/seed/tap/400/400',
    storeId: 's4',
    storeName: 'Hidráulica Central',
    description: 'Misturador monocomando de alta qualidade para cozinha ou banheiro.',
    rating: 4.8,
    reviewCount: 30
  },
  {
    id: 'pr34',
    name: 'Placa Drywall ST 1.2 x 1.8m',
    price: 45.00,
    image: 'https://picsum.photos/seed/drywall/400/400',
    storeId: 's5',
    storeName: 'Gesso & Estilo',
    description: 'Placa de gesso acartonado standard para paredes e forros.',
    rating: 4.7,
    reviewCount: 150
  },
  {
    id: 'pr35',
    name: 'Cadeado Stam 45mm',
    price: 32.90,
    image: 'https://picsum.photos/seed/lock/400/400',
    storeId: 's6',
    storeName: 'Ferragens Total',
    description: 'Cadeado de latão maciço com alta resistência a intempéries.',
    rating: 4.5,
    reviewCount: 200
  }
];

export const MOCK_VIDEOS: VideoPost[] = [
  {
    id: '1',
    videoUrl: 'https://www.youtube.com/embed/pybCkcQR8Oc',
    user: {
      id: 'p1',
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?u=p1',
      role: 'professional',
      handle: 'joao_obras'
    },
    description: 'FUNDAÇÃO E ALICERCE FINALIZADO. Mais uma etapa concluída com sucesso! 🏗️ #obra #fundação',
    thumbnail: 'https://img.youtube.com/vi/pybCkcQR8Oc/maxresdefault.jpg',
    likes: 1240,
    comments: 45,
    products: [
      { id: 'pr1', name: 'Furadeira Bosch', price: 450, image: 'https://picsum.photos/seed/drill/200/200', storeId: 's1', storeName: 'Loja Construir' },
      { id: 'pr8', name: 'Parafuso M10 (100un)', price: 22.50, image: 'https://picsum.photos/seed/bolt/200/200', storeId: 's1', storeName: 'Loja Construir' }
    ]
  },
  {
    id: '2',
    videoUrl: 'https://www.youtube.com/embed/vid8Ra5YQlw',
    user: {
      id: 'p2',
      name: 'Maria Pinturas',
      avatar: 'https://i.pravatar.cc/150?u=p2',
      role: 'professional',
      handle: 'maria_decor'
    },
    description: 'Concretando sapata do jeito fácil! Dicas essenciais para sua fundação. 🏗️ #pedreiro #construção #obra',
    thumbnail: 'https://img.youtube.com/vi/vid8Ra5YQlw/maxresdefault.jpg',
    likes: 3500,
    comments: 120,
    products: [
      { id: 'pr2', name: 'Tinta Suvinil 18L', price: 320, image: 'https://picsum.photos/seed/paint/200/200', storeId: 's2', storeName: 'Tintas & Cia' },
      { id: 'pr11', name: 'Rolo de Lã 23cm', price: 19.90, image: 'https://picsum.photos/seed/roller/200/200', storeId: 's2', storeName: 'Tintas & Cia' }
    ]
  },
  {
    id: '3',
    videoUrl: 'https://www.youtube.com/embed/-gRCvMRi1aw',
    user: {
      id: 'p3',
      name: 'Carlos Marceneiro',
      avatar: 'https://i.pravatar.cc/150?u=p3',
      role: 'professional',
      handle: 'carlos_wood'
    },
    description: 'Como fazer chapisco de forma rápida e fácil! Dica profissional para agilizar sua obra. 🏗️ #construção #diy #chapisco',
    thumbnail: 'https://img.youtube.com/vi/-gRCvMRi1aw/maxresdefault.jpg',
    likes: 890,
    comments: 22,
    products: [
      { id: 'pr13', name: 'Tábua de Pinus 3m', price: 45, image: 'https://picsum.photos/seed/pine/200/200', storeId: 's3', storeName: 'Madeireira Silva' }
    ]
  },
  {
    id: '4',
    videoUrl: 'https://www.youtube.com/embed/K0XWZ0Qa3QE',
    user: {
      id: 'p4',
      name: 'Obra Fácil',
      avatar: 'https://i.pravatar.cc/150?u=p4',
      role: 'professional',
      handle: 'obra_facil'
    },
    description: 'Como assentar porcelanato grande sem errar! Passo a passo completo. 🏗️ #porcelanato #reforma',
    thumbnail: 'https://img.youtube.com/vi/K0XWZ0Qa3QE/maxresdefault.jpg',
    likes: 12400,
    comments: 340,
    products: [
      { id: 'pr10', name: 'Porcelanato 60x60', price: 89.90, image: 'https://picsum.photos/seed/porcelain/200/200', storeId: 's3', storeName: 'Madeireira Silva' },
      { id: 'pr9', name: 'Argamassa AC-II 20kg', price: 29.90, image: 'https://picsum.photos/seed/mortar/200/200', storeId: 's1', storeName: 'Loja Construir' }
    ]
  },
  {
    id: '5',
    videoUrl: 'https://www.youtube.com/embed/8f-T7lgdLGI',
    user: {
      id: 'p5',
      name: 'Mestre Paulo',
      avatar: 'https://i.pravatar.cc/150?u=p5',
      role: 'professional',
      handle: 'mestre_paulo'
    },
    description: 'Impermeabilização de laje em 3 passos simples. Nunca mais vai ter infiltração! 💧 #impermeabilização',
    thumbnail: 'https://img.youtube.com/vi/8f-T7lgdLGI/maxresdefault.jpg',
    likes: 8700,
    comments: 215,
    products: [
      { id: 'pr15', name: 'Impermeabilizante Vedacit', price: 198, image: 'https://picsum.photos/seed/waterproof/200/200', storeId: 's1', storeName: 'Loja Construir' }
    ]
  },
  {
    id: '6',
    videoUrl: 'https://www.youtube.com/embed/1b4BSvNj0rc',
    user: {
      id: 'p2',
      name: 'Maria Pinturas',
      avatar: 'https://i.pravatar.cc/150?u=p2',
      role: 'professional',
      handle: 'maria_decor'
    },
    description: 'Textura grafiato: aprenda a fazer em casa! O acabamento que todo mundo ama. 🎨 #pintura #textura',
    thumbnail: 'https://img.youtube.com/vi/1b4BSvNj0rc/maxresdefault.jpg',
    likes: 21000,
    comments: 580,
    products: [
      { id: 'pr6', name: 'Verniz Marítimo 3.6L', price: 115, image: 'https://picsum.photos/seed/varnish/200/200', storeId: 's2', storeName: 'Tintas & Cia' },
      { id: 'pr4', name: 'Kit Pincéis Atlas', price: 89.90, image: 'https://picsum.photos/seed/brushes/200/200', storeId: 's2', storeName: 'Tintas & Cia' }
    ]
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
  },
  {
    id: 'p3',
    name: 'Carlos Marceneiro',
    avatar: 'https://i.pravatar.cc/150?u=p3',
    role: 'professional',
    specialty: 'Marcenaria Fina',
    rating: 4.7,
    reviewCount: 54,
    projectsCount: 18,
    isVerified: true,
    isPremium: true,
    location: 'Santo Amaro, São Paulo',
    bio: 'Móveis sob medida com design contemporâneo e durabilidade.',
    portfolio: [
      'https://picsum.photos/seed/p3-1/400/300',
      'https://picsum.photos/seed/p3-2/400/300',
      'https://picsum.photos/seed/p3-3/400/300'
    ],
    reviews: MOCK_REVIEWS
  },
  {
    id: 'p4',
    name: 'Ana Arquiteta',
    avatar: 'https://i.pravatar.cc/150?u=p4',
    role: 'professional',
    specialty: 'Arquitetura de Interiores',
    rating: 5.0,
    reviewCount: 42,
    projectsCount: 25,
    isVerified: true,
    isPremium: true,
    location: 'Jardins, São Paulo',
    bio: 'Projetos que unem funcionalidade e estética para sua casa ou escritório.',
    portfolio: [
      'https://picsum.photos/seed/p4-1/400/300',
      'https://picsum.photos/seed/p4-2/400/300',
      'https://picsum.photos/seed/p4-3/400/300'
    ],
    reviews: MOCK_REVIEWS
  },
  {
    id: 'p5',
    name: 'Ricardo Elétrica',
    avatar: 'https://i.pravatar.cc/150?u=p5',
    role: 'professional',
    specialty: 'Eletricista Predial',
    rating: 4.6,
    reviewCount: 110,
    projectsCount: 85,
    isVerified: true,
    isPremium: false,
    location: 'Tatuapé, São Paulo',
    bio: 'Manutenção e instalação elétrica residencial e comercial com segurança total.',
    portfolio: [
      'https://picsum.photos/seed/p5-1/400/300',
      'https://picsum.photos/seed/p5-2/400/300'
    ],
    reviews: MOCK_REVIEWS
  },
  {
    id: 'p6',
    name: 'Marcos Encanador',
    avatar: 'https://i.pravatar.cc/150?u=p6',
    role: 'professional',
    specialty: 'Hidráulica & Incêndio',
    rating: 4.5,
    reviewCount: 78,
    projectsCount: 62,
    isVerified: false,
    isPremium: false,
    location: 'Butantã, São Paulo',
    bio: 'Detecção de vazamentos e instalações hidráulicas complexas.',
    portfolio: [
      'https://picsum.photos/seed/p6-1/400/300',
      'https://picsum.photos/seed/p6-2/400/300',
      'https://picsum.photos/seed/p6-3/400/300'
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
