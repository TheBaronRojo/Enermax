import Skeleton from '@/components/Skeleton'

export default function Loading() {
    return (
        <>
            <div className='flex flex-col gap-2 w-1/4 mx-auto my-0 p-5'>
                <Skeleton className='mb-2 h-10' />
                <Skeleton className='mb-2 h-5' />
                <Skeleton className='mb-2 h-10' />
                <Skeleton className='mb-2 h-5' />
                <Skeleton className='mb-2 h-10' />
                <Skeleton className='mb-2 h-10' />
            </div>

            <div className='p-3 flex flex-col'>
                <Skeleton className='mb-2 h-10 w-1/2 mx-auto' />

                <div>
                    <Skeleton className='mb-2 h-60 w-1/2 mx-auto' />
                </div>

                <div className='flex flex-row m-10 p-2'>

                    <div className='w-1/2 px-10'>
                        <Skeleton className='mb-2 h-10 w-1/2 mx-auto' />
                        <Skeleton className='mb-2 h-40' />
                    </div>

                    <div className='w-1/2 px-10'>
                        <Skeleton className='mb-2 h-10 w-1/2 mx-auto' />
                        <Skeleton className='mb-2 h-40' />
                    </div>

                </div>
            </div>
        </>


    )
}