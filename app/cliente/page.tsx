import Filter from '@/components/Filter'
import { getCliente } from '../data/query'
import DashboardCliente from '@/components/DashboardCliente'

type TramosProps = {
    searchParams: {
        initialDate: string,
        finalDate: string
    }
}

export default async function Tramos({ searchParams }: TramosProps) {

    if (!searchParams.initialDate && !searchParams.finalDate) {
        return <Filter title={"Reporte de Cliente"}/>
    }

    const data = await getCliente(searchParams.initialDate, searchParams.finalDate)

    return (
        <>
            <Filter title={"Reporte de Cliente"}/>
            <DashboardCliente data={data}/>
        </>
    )

}