import { useState } from 'react';
import { GALLERY_ITEMS } from '@/lib/constants';

interface GalleryGridProps {
  limit?: number;
}

const GalleryGrid = ({ limit }: GalleryGridProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  
  const displayItems = limit ? GALLERY_ITEMS.slice(0, limit) : GALLERY_ITEMS;
  
  const openModal = (id: number) => {
    setSelectedItem(id);
  };
  
  const closeModal = () => {
    setSelectedItem(null);
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => (
          <div 
            key={item.id}
            className="group relative overflow-hidden rounded-lg shadow-lg h-72 cursor-pointer"
            onClick={() => openModal(item.id)}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-white/90">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-white bg-primary/80 hover:bg-primary w-10 h-10 rounded-full flex items-center justify-center"
              onClick={closeModal}
            >
              <i className="fas fa-times"></i>
            </button>
            
            {GALLERY_ITEMS.find(item => item.id === selectedItem) && (
              <>
                <img 
                  src={GALLERY_ITEMS.find(item => item.id === selectedItem)?.image} 
                  alt={GALLERY_ITEMS.find(item => item.id === selectedItem)?.title} 
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {GALLERY_ITEMS.find(item => item.id === selectedItem)?.title}
                  </h3>
                  <p className="text-gray-700">
                    {GALLERY_ITEMS.find(item => item.id === selectedItem)?.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
