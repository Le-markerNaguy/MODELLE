import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-10 w-1/3 mb-6" />
      <Skeleton className="h-6 w-2/3 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4 mb-6" />

          <div className="mb-4">
            <Skeleton className="h-10 w-full mb-4" />
          </div>

          <div className="space-y-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>

          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="border rounded-lg p-6">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4 mb-6" />

          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-16 w-full mb-3" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
