import Filter from '@/components/Filter'
import { getTramos } from '../data/query'
import DashboardTramos from '@/components/DashboardTramos'

type TramosProps = {
    searchParams: {
        initialDate: string,
        finalDate: string
    }
}

export default async function Tramos({ searchParams }: TramosProps) {

    if (!searchParams.initialDate && !searchParams.finalDate) {
        return <Filter title={"Reporte de Tramos"} />
    }

    const data = await getTramos(searchParams.initialDate, searchParams.finalDate)

    return (
        <>
            <Filter title={"Reporte de Tramos"}/>
            <DashboardTramos data={data} />
        </>
    )

}