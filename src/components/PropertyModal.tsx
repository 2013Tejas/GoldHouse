import React, { useState, useEffect } from 'react';
import { X, MapPin, BedDouble, Bath, Maximize2, Check, Calendar } from 'lucide-react';
import { PropertyItem } from '../data/properties';

interface PropertyModalProps {
  property: PropertyItem | null;
  onClose: () => void;
  onScheduleTour: (propertyTitle: string, city: string) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onScheduleTour,
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [property?.id]);

  useEffect(() => {
    if (!property) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property, onClose]);

  if (!property) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1A17]/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF5EF] rounded-3xl shadow-2xl border border-[#E5DBD0]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close property details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FAF5EF]/90 hover:bg-white text-[#23211E] flex items-center justify-center shadow-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E6853]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-[480px] bg-[#E8DFD5]">
            {!imageError ? (
              <img
                src={property.image}
                alt={`${property.title} in ${property.city}, ${property.state}`}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#EAE0D7] to-[#D8CBBF]">
                <span className="font-display-serif text-2xl font-bold text-[#23211E]">
                  {property.title}
                </span>
                <span className="text-sm text-[#6E655D] mt-1">
                  {property.city}, {property.state}
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#7A7168] mb-2">
                <span>{property.type}</span>
                <span aria-hidden="true">·</span>
                <span>Completed {property.yearBuilt}</span>
                <span aria-hidden="true">·</span>
                <span>{property.lotSize}</span>
              </div>

              <h3
                id="property-modal-title"
                className="font-display-serif text-3xl font-bold text-[#23211E] tracking-tight"
              >
                {property.title}
              </h3>

              <div className="mt-2 flex items-center justify-between gap-4 border-b border-[#E5DBD0] pb-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-[#5F574F]">
                  <MapPin className="w-4 h-4 text-[#9E6853]" />
                  {property.city}, {property.state}
                </span>
                <span className="text-2xl font-bold text-[#9E6853] tabular-nums">
                  {property.priceFormatted}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-b border-[#E5DBD0] text-sm">
                <div className="flex items-center gap-2 text-[#23211E]">
                  <BedDouble className="w-4 h-4 text-[#857A70] shrink-0" />
                  <span className="tabular-nums font-semibold">{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2 text-[#23211E]">
                  <Bath className="w-4 h-4 text-[#857A70] shrink-0" />
                  <span className="tabular-nums font-semibold">{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-2 text-[#23211E]">
                  <Maximize2 className="w-4 h-4 text-[#857A70] shrink-0" />
                  <span className="tabular-nums font-semibold">
                    {property.sqft.toLocaleString()} sq ft
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#524B44]">{property.summary}</p>

              <div className="mt-5">
                <h4 className="text-xs font-semibold text-[#23211E] mb-2.5">
                  Architectural Highlights
                </h4>
                <ul className="space-y-2">
                  {property.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#4A433C]">
                      <Check className="w-4 h-4 text-[#9E6853] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E5DBD0]">
                <span className="text-xs font-semibold text-[#23211E]">Material Palette: </span>
                <span className="text-xs text-[#6B6259]">
                  {property.materials.join(' · ')}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onScheduleTour(property.title, property.city);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#26241F] hover:bg-[#3A3730] text-[#FAF5EF] text-sm font-medium px-6 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                Schedule Private Viewing
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 text-sm font-medium text-[#524B44] hover:text-[#23211E] transition-colors cursor-pointer whitespace-nowrap"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
