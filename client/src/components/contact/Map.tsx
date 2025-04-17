import { useEffect, useRef } from 'react';
import { COMPANY_ADDRESS } from '@/lib/constants';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // For a real implementation, this would integrate Google Maps API
    // Add a message to indicate this is where the map would be shown
    if (mapRef.current) {
      const placeholderContent = document.createElement('div');
      placeholderContent.className = 'w-full h-full flex flex-col items-center justify-center text-white/80';
      placeholderContent.innerHTML = `
        <i class="fas fa-map-marked-alt text-4xl mb-2"></i>
        <p class="text-center">Google Maps Integration</p>
        <p class="text-sm mt-2">${COMPANY_ADDRESS}</p>
      `;
      
      // Clear any previous content
      if (mapRef.current.firstChild) {
        mapRef.current.innerHTML = '';
      }
      
      mapRef.current.appendChild(placeholderContent);
    }
  }, []);

  return (
    <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm h-80 relative">
      <h3 className="text-2xl font-bold font-['Montserrat'] mb-6">Find Us</h3>
      
      <div ref={mapRef} className="absolute inset-0 mt-16 mb-8 mx-8 bg-white/20 rounded-lg overflow-hidden">
        {/* Google Maps will be inserted here by the useEffect hook */}
      </div>
    </div>
  );
};

export default Map;
