import React from 'react';

const Pulse = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

/** Skeleton cho Product Card */
const ProductCardSkeleton = () => (
  <div className="flex-1 rounded-xl border border-gray-100 p-2">
    <Pulse className="h-[250px] w-full rounded-lg" />
    <div className="mt-3 space-y-2 px-1">
      <Pulse className="h-3 w-16" />
      <Pulse className="h-5 w-3/4" />
      <Pulse className="h-4 w-20" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Pulse key={i} className="h-3 w-3 rounded-full" />
        ))}
        <Pulse className="ml-2 h-3 w-16" />
      </div>
    </div>
  </div>
);

/** Skeleton cho Category pill */
const CategorySkeleton = () => (
  <Pulse className="h-[50px] w-[140px] rounded-full" />
);

/** Skeleton cho phần Hero Banner */
const HeroBannerSkeleton = () => (
  <div className="relative pb-[273px]">
    <Pulse className="h-[135px] w-full md:h-[424px]" />
    <Pulse className="absolute top-[91px] left-[24px] h-[120px] w-[183px] md:top-[337px] md:left-[135px] md:h-[200px] md:w-[500px]" />
  </div>
);

/** Skeleton cho style gallery grid */
const GallerySkeleton = () => (
  <div className="container mx-auto mt-[150px] grid h-[500px] grid-cols-1 grid-rows-3 gap-x-[30px] gap-y-[17px] px-8 md:grid-cols-2 md:grid-rows-2">
    <Pulse className="md:col-span-1 md:row-span-2" />
    <Pulse className="" />
    <Pulse className="" />
  </div>
);

/** Skeleton cho feature boxes */
const FeaturesSkeleton = () => (
  <div className="container mx-auto mt-[150px] flex gap-[30px] px-8">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="flex flex-1 flex-col items-center gap-4 bg-[#FAFAFA] pt-[64px] pb-[34px]"
      >
        <Pulse className="h-[110px] w-[110px] rounded-full" />
        <Pulse className="h-5 w-[180px]" />
        <Pulse className="h-5 w-[140px]" />
      </div>
    ))}
  </div>
);

/** Full page skeleton: ghép tất cả lại */
export const HomePageSkeleton = () => (
  <div className="min-h-screen">
    <HeroBannerSkeleton />
    <GallerySkeleton />
    <FeaturesSkeleton />

    {/* Category + Products skeleton */}
    <div className="container mx-auto mt-[150px] px-8">
      <div className="mb-[70px] flex justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-[30px]">
        {[...Array(4)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>

    {/* Featured skeleton */}
    <div className="container mx-auto mt-[150px] px-8">
      <Pulse className="mb-[70px] h-10 w-[300px]" />
      <div className="flex items-center justify-center gap-[30px]">
        {[...Array(4)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);
