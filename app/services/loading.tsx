import { Skeleton } from "@/components/ui/skeleton"

export default function ServicesLoading() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Skeleton className="h-10 w-3/4 max-w-md mx-auto mb-6" />

      <div className="max-w-3xl mx-auto mb-10">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <Skeleton className="h-12 w-12 rounded-full mb-4" />
            <Skeleton className="h-7 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-6" />

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-12 text-center">
        <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-12 w-40 mx-auto" />
      </div>
    </div>
  )
}
