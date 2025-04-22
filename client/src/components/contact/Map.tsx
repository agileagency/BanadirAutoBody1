import { COMPANY_ADDRESS } from '@/lib/constants';

const Map = () => {
  // Format the address for the Google Maps embed URL
  const formattedAddress = encodeURIComponent(COMPANY_ADDRESS);
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${formattedAddress}`;

  return (
    <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm h-96 relative">
      <h3 className="text-2xl font-bold font-['Montserrat'] mb-6">Find Us</h3>
      
      <div className="absolute inset-0 mt-16 mb-8 mx-8 rounded-lg overflow-hidden shadow-lg">
        <iframe
          title="Banadir Auto Body Shop Location"
          width="100%"
          height="100%"
          frameBorder="0"
          src={mapEmbedUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        ></iframe>
      </div>

      <div className="absolute bottom-4 left-8 z-10 bg-black/70 px-4 py-2 rounded-md">
        <p className="text-white text-sm">{COMPANY_ADDRESS}</p>
      </div>
    </div>
  );
};

export default Map;
