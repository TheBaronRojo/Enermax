import { twMerge } from 'tailwind-merge'

type SkeletonProps = {
  className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={twMerge('h-5 w-full rounded-md bg-gray-200 dark:bg-gray-500 animate-pulse', className)}
    />
  )
}

export default Skeleton