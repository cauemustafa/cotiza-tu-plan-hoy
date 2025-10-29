import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const HeroSkeleton = () => (
  <div className="py-20 px-4">
    <div className="container mx-auto max-w-4xl text-center space-y-6">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
      <div className="flex gap-4 justify-center">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-40" />
      </div>
    </div>
  </div>
);

export const ServiceCardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-12 w-12 rounded-full mb-4" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full mt-2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

export const ServicesSectionSkeleton = () => (
  <section className="py-20 px-4">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

export const TestimonialSkeleton = () => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
    </CardContent>
  </Card>
);

export const FAQSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <Skeleton key={i} className="h-16 w-full" />
    ))}
  </div>
);

export const PageSkeleton = () => (
  <div className="min-h-screen">
    <Skeleton className="h-16 w-full" /> {/* Header */}
    <HeroSkeleton />
    <ServicesSectionSkeleton />
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <FAQSkeleton />
      </div>
    </div>
  </div>
);
