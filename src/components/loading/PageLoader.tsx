export default function PageLoader() {
  return (
    <div
      className="min-h-[50vh] flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 border-2 border-stone-200 dark:border-stone-700 border-t-stone-600 dark:border-t-stone-400 rounded-full animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm text-stone-500 dark:text-stone-400">Loading...</span>
      </div>
    </div>
  )
}
