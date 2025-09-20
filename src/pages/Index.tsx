import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PhotoCollection {
  id: number;
  title: string;
  description: string;
  images: string[];
  coverImage: string;
}

const photoCollections: PhotoCollection[] = [
  {
    id: 1,
    title: "Морские Истории",
    description: "Теплые моменты из жизни - семейные фото с морской душой",
    coverImage: "https://cdn.poehali.dev/files/68d30dc6-0746-4989-b899-28663ca38d2e.jpg",
    images: [
      "https://cdn.poehali.dev/files/68d30dc6-0746-4989-b899-28663ca38d2e.jpg",
      "/img/8f9aff19-5734-4b79-816b-cb19fb2fee16.jpg",
      "/img/9e521f06-85e8-4191-844e-5af2137c86a4.jpg",
      "/img/2d2a5579-8623-4364-b052-b42f1090bfaa.jpg"
    ]
  },
  {
    id: 2,
    title: "Классические Портреты",
    description: "Изысканная коллекция портретной фотографии в традиционном стиле",
    coverImage: "/img/8f9aff19-5734-4b79-816b-cb19fb2fee16.jpg",
    images: [
      "/img/8f9aff19-5734-4b79-816b-cb19fb2fee16.jpg",
      "/img/9e521f06-85e8-4191-844e-5af2137c86a4.jpg",
      "/img/2d2a5579-8623-4364-b052-b42f1090bfaa.jpg"
    ]
  },
  {
    id: 3,
    title: "Архитектурная Классика",
    description: "Величественные здания и архитектурные элементы в классическом исполнении",
    coverImage: "/img/9e521f06-85e8-4191-844e-5af2137c86a4.jpg",
    images: [
      "/img/9e521f06-85e8-4191-844e-5af2137c86a4.jpg",
      "/img/8f9aff19-5734-4b79-816b-cb19fb2fee16.jpg",
      "/img/2d2a5579-8623-4364-b052-b42f1090bfaa.jpg"
    ]
  },
  {
    id: 4,
    title: "Винтажные Пейзажи",
    description: "Ностальгические виды природы в традиционной фотографической манере",
    coverImage: "/img/2d2a5579-8623-4364-b052-b42f1090bfaa.jpg",
    images: [
      "/img/2d2a5579-8623-4364-b052-b42f1090bfaa.jpg",
      "/img/8f9aff19-5734-4b79-816b-cb19fb2fee16.jpg",
      "/img/9e521f06-85e8-4191-844e-5af2137c86a4.jpg"
    ]
  }
];

const Index: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<PhotoCollection | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && selectedCollection) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === selectedCollection.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedCollection]);

  const openGallery = (collection: PhotoCollection) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCollection(collection);
      setCurrentImageIndex(0);
      setShowFullscreen(true);
      setIsLoading(false);
    }, 300);
  };

  const closeGallery = () => {
    setSelectedCollection(null);
    setShowFullscreen(false);
    setIsAutoPlaying(false);
  };

  const nextImage = () => {
    if (selectedCollection) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedCollection.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedCollection) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedCollection.images.length - 1 : prevIndex - 1
      );
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="font-serif text-5xl font-bold text-foreground mb-3 animate-fade-in transform hover:scale-105 transition-transform duration-300">
              ЖИВАЯ ФОТОГАЛЕРЕЯ
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 animate-slide-in"></div>
            <p className="font-georgia text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Классические коллекции с живыми эффектами
            </p>
          </div>
        </div>
      </header>

      {/* Main Gallery Grid */}
      <main className="relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {photoCollections.map((collection, index) => (
            <Card 
              key={collection.id} 
              className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 animate-fade-in transform hover:-translate-y-2 hover:rotate-1 bg-card/90 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.3}s` }}
              onClick={() => openGallery(collection)}
            >
              <CardContent className="p-0 relative overflow-hidden">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={collection.coverImage}
                    alt={collection.title}
                    className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                  />
                  
                  {/* Animated Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                    <div className="bg-white/95 rounded-full p-4 shadow-lg animate-pulse">
                      <Icon name="Camera" size={32} className="text-primary" />
                    </div>
                  </div>

                  {/* Sparkle Effects */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform rotate-12">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 transform -rotate-12">
                    <div className="w-1 h-1 bg-primary rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="p-6 relative">
                  {/* Animated Border */}
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  <h3 className="font-serif text-xl font-semibold mb-3 text-foreground transform group-hover:translate-x-2 transition-transform duration-300">
                    {collection.title}
                  </h3>
                  <p className="font-georgia text-sm text-muted-foreground leading-relaxed mb-4 transform group-hover:translate-x-1 transition-transform duration-300 delay-100">
                    {collection.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-georgia text-sm font-medium transform group-hover:translate-x-3 transition-all duration-300 delay-200">
                    <span className="mr-2">Открыть коллекцию</span>
                    <Icon name="ArrowRight" size={16} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  {/* Photo Count Badge */}
                  <div className="absolute top-4 right-4 bg-primary/10 backdrop-blur-sm rounded-full px-3 py-1 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-300">
                    <span className="text-xs font-medium text-primary">{collection.images.length} фото</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 text-center animate-zoom-in">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="font-georgia text-foreground">Загружаем коллекцию...</p>
          </div>
        </div>
      )}

      {/* Fullscreen Gallery Modal */}
      {showFullscreen && selectedCollection && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fade-in">
          <div className="relative w-full h-full max-w-6xl mx-auto p-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 text-white border-white/30 transform hover:scale-110 hover:rotate-90 transition-all duration-300"
              onClick={closeGallery}
            >
              <Icon name="X" size={24} />
            </Button>

            {/* Controls */}
            <div className="absolute top-6 left-6 z-10 flex gap-3">
              <Button
                variant={isAutoPlaying ? "default" : "ghost"}
                size="sm"
                className={`bg-white/10 hover:bg-white/20 text-white border-white/30 transform hover:scale-105 transition-all duration-300 ${
                  isAutoPlaying ? 'bg-primary/80 scale-105' : ''
                }`}
                onClick={toggleAutoPlay}
              >
                <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} className="mr-2" />
                {isAutoPlaying ? 'Пауза' : 'Авто'}
              </Button>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                <Icon name="Timer" size={16} className="inline mr-2" />
                4 сек
              </div>
            </div>

            {/* Image Display */}
            <div className="flex items-center justify-center h-full">
              <div className="relative max-w-4xl max-h-[80vh] w-full">
                <img
                  key={currentImageIndex}
                  src={selectedCollection.images[currentImageIndex]}
                  alt={`${selectedCollection.title} - фото ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain animate-zoom-in shadow-2xl rounded-lg"
                />

                {/* Image Border Effect */}
                <div className="absolute inset-0 rounded-lg border-2 border-white/20 pointer-events-none animate-pulse"></div>

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/30 transform hover:scale-125 hover:-translate-x-1 transition-all duration-300"
                  onClick={prevImage}
                >
                  <Icon name="ChevronLeft" size={28} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/30 transform hover:scale-125 hover:translate-x-1 transition-all duration-300"
                  onClick={nextImage}
                >
                  <Icon name="ChevronRight" size={28} />
                </Button>
              </div>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white animate-slide-in">
              <h3 className="font-serif text-2xl mb-2 transform hover:scale-105 transition-transform duration-300">
                {selectedCollection.title}
              </h3>
              <p className="font-georgia text-sm opacity-80 mb-4">
                {currentImageIndex + 1} из {selectedCollection.images.length}
              </p>
              
              {/* Progress Bar */}
              <div className="w-64 h-1 bg-white/20 rounded-full mx-auto mb-4 overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${((currentImageIndex + 1) / selectedCollection.images.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3">
              {selectedCollection.images.map((_, index) => (
                <button
                  key={index}
                  className={`relative w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    index === currentImageIndex 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  {index === currentImageIndex && (
                    <div className="absolute inset-0 rounded-full border-2 border-white animate-ping"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;