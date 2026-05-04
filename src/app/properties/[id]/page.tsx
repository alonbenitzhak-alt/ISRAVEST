"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProperties } from "@/lib/PropertiesContext";
import LeadForm from "@/components/LeadForm";
import ShareButtons from "@/components/ShareButtons";
import { useLanguage } from "@/lib/LanguageContext";
import { getAmenityTranslation } from "@/lib/amenitiesTranslations";
import { trackPropertyClick } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { properties } = useProperties();
  const property = properties.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen || !property) return;
      if (e.key === "ArrowLeft") {
        setSelectedImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setSelectedImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, property]);

  const adminWhatsapp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "972586836555";

  const buildWhatsappMessage = (prop: NonNullable<typeof property>) => {
    const currencySymbol = prop.currency === "USD" ? "$" : prop.currency === "GBP" ? "£" : prop.currency === "ILS" ? "₪" : "€";
    const lines = [
      `${t("property.whatsappMessage")} ${displayTitle}`,
      `📍 ${prop.city}, ${prop.country}`,
      `💰 ${currencySymbol}${prop.price.toLocaleString()}`,
      `🛏 ${prop.bedrooms} | 📈 ROI ${prop.expected_roi}%`,
    ];
    return lines.join("\n");
  };

  useEffect(() => {
    if (!property) return;
    supabase
      .from("properties")
      .update({ views_count: (property.views_count || 0) + 1 })
      .eq("id", property.id)
      .then(() => null);
  }, [property?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!property) {
    notFound();
  }

  const displayTitle = property.translations?.[lang]?.title ?? (lang === "he" ? property.title_he : undefined) ?? property.title;
  const displayDescription = property.translations?.[lang]?.description ?? (lang === "he" ? property.description_he : undefined) ?? property.description;

  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary-600">{t("detail.home")}</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-primary-600">{t("detail.properties")}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{displayTitle}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <button onClick={() => setLightboxOpen(true)} className="rounded-2xl overflow-hidden h-[280px] sm:h-[400px] md:h-[550px] mb-3 relative bg-gray-300 w-full group cursor-zoom-in hover:shadow-2xl transition-shadow">
                {!imageErrors[selectedImage] ? (
                  <Image
                    src={property.images[selectedImage]}
                    alt={displayTitle}
                    fill
                    priority={selectedImage === 0}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    quality={90}
                    onError={() => setImageErrors({...imageErrors, [selectedImage]: true})}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏠</div>
                      <p className="text-gray-600 font-semibold">Image unavailable</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13H7" />
                  </svg>
                </div>
                {property.is_demo && (
                  <div className="absolute top-2 sm:top-4 start-2 sm:start-4 z-10">
                    <span className="bg-red-600 text-white text-sm sm:text-lg font-bold px-3 sm:px-6 py-1 sm:py-2 rounded-full shadow-lg">
                      {t("property.demo")}
                    </span>
                  </div>
                )}
              </button>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative rounded-xl overflow-hidden h-28 md:h-32 border-2 transition-all ${i === selectedImage ? "border-primary-500 ring-2 ring-primary-200" : "border-transparent hover:border-gray-300"}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="33vw" quality={85} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{displayTitle}</h1>
                    {property.property_number && (
                      <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                        #{property.property_number}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.city}, {property.country}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">€{property.price.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                {[
                  { label: t("detail.bedrooms"), value: property.bedrooms.toString() },
                  { label: property.area_sqm ? t("detail.area") : null, value: property.area_sqm ? `${property.area_sqm} ${t("card.sqm")}` : null },
                  { label: t("detail.propertyType"), value: t(`propertyType.${property.property_type.toLowerCase()}`) || property.property_type },
                  { label: t("detail.country"), value: t(`footer.${property.country.toLowerCase()}`) || property.country },
                ].filter(item => item.label !== null).map((item) => (
                  <div key={item.label} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 text-center border border-blue-100">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">{item.label}</div>
                    <div className="text-lg font-bold text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mb-8">{t("detail.roiDisclaimer")}</p>

{/* Property Features & Amenities */}
              {(property.area_sqm || property.bathrooms || property.year_built || property.furnished !== undefined || property.amenities?.length) && (
                <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">{t("detail.features") || "Property Features"}</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {property.area_sqm && (
                      <div className="bg-white rounded-lg p-4 text-center">
                        <svg className="w-6 h-6 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        <div className="text-lg font-bold text-gray-900">{property.area_sqm} m²</div>
                        <div className="text-xs text-gray-500">{t("detail.area") || "Area"}</div>
                      </div>
                    )}

                    {property.bedrooms && (
                      <div className="bg-white rounded-lg p-4 text-center">
                        <svg className="w-6 h-6 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <div className="text-lg font-bold text-gray-900">{property.bedrooms}</div>
                        <div className="text-xs text-gray-500">{t("detail.bedrooms") || "Bedrooms"}</div>
                      </div>
                    )}

                    {property.bathrooms && (
                      <div className="bg-white rounded-lg p-4 text-center">
                        <svg className="w-6 h-6 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6V4m12 2v2m7 0a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4z" />
                        </svg>
                        <div className="text-lg font-bold text-gray-900">{property.bathrooms}</div>
                        <div className="text-xs text-gray-500">{t("detail.bathrooms") || "Bathrooms"}</div>
                      </div>
                    )}

                    {property.year_built && (
                      <div className="bg-white rounded-lg p-4 text-center">
                        <svg className="w-6 h-6 text-orange-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                        </svg>
                        <div className="text-lg font-bold text-gray-900">{property.year_built}</div>
                        <div className="text-xs text-gray-500">{t("detail.yearBuilt") || "Year Built"}</div>
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  {property.amenities && property.amenities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">{t("detail.amenities") || "Amenities"}</h3>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity) => (
                          <span key={amenity} className="bg-white border border-blue-200 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full">
                            ✓ {getAmenityTranslation(amenity, lang)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Furnished status */}
                  {property.furnished !== undefined && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-gray-900">
                        {property.furnished ? `✓ ${t("card.furnished")}` : `○ ${t("card.unfurnished")}`}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">{t("detail.about")}</h2>
                <p className="text-gray-600 leading-relaxed">{displayDescription}</p>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm text-gray-500 shrink-0">{t("share.label")}</span>
                <ShareButtons title={displayTitle} />
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-3">{t("detail.contact")}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-lg">M</div>
                  <div>
                    <div className="font-semibold text-gray-900">MANAIO</div>
                    <p className="text-sm text-gray-500">{t("detail.expertSubtitle")}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">{t("detail.connectorDisclaimer")}</p>
                <div className="flex flex-wrap gap-2">
                  {adminWhatsapp && (
                    <a
                      href={`https://wa.me/${adminWhatsapp.replace(/\s+/g, "").replace(/^\+/, "")}?text=${encodeURIComponent(buildWhatsappMessage(property))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackPropertyClick(property.id, "whatsapp");
                        supabase
                          .from("properties")
                          .update({ clicks_count: (property.clicks_count || 0) + 1 })
                          .eq("id", property.id)
                          .then(() => null);
                      }}
                      className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors inline-flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {t("detail.contactWhatsapp")}
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm propertyId={property.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-10 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
            {selectedImage + 1} / {property.images.length}
          </div>

          {/* Main image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={property.images[selectedImage]}
              alt={displayTitle}
              fill
              className="object-contain"
              sizes="100vw"
              quality={95}
            />
          </div>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Thumbnail strip at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 p-3 rounded-xl backdrop-blur-sm max-w-[90vw] overflow-x-auto z-10">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(i);
                }}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  i === selectedImage ? "border-white ring-2 ring-white/50" : "border-white/30 hover:border-white/60"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-4 right-4 text-white/60 text-sm hidden sm:block">
            {lang === "he" ? "חצים לנווט • Esc לסגור" : "Use arrows to navigate • ESC to close"}
          </div>
        </div>
      )}
    </>
  );
}
