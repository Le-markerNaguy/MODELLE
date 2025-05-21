import { Skeleton } from "@/components/ui/skeleton"

export default function PrecariteMenstruelleLoading() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Skeleton className="h-10 w-3/4 max-w-md mx-auto mb-6" />

      <div className="max-w-3xl mx-auto mb-10">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4" />
      </div>

      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-full mb-6" />

        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <Skeleton className="h-7 w-1/3 mb-4" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-6" />

            <Skeleton className="h-6 w-1/4 mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <Skeleton className="h-7 w-1/3 mb-4" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12 text-center">
        <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  )
}
