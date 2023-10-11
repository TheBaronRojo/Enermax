import Filter from '@/components/Filter'
import { getTramosCliente } from '../data/query'
import DashboardTramoCliente from '@/components/DashboardTramoCliente'

type TramosProps = {
    searchParams: {
        initialDate: string,
        finalDate: string
    }
}

export default async function Tramos({ searchParams }: TramosProps) {

    if (!searchParams.initialDate && !searchParams.finalDate) {
        return <Filter title={"Reporte de Tramos-Cliente"}/>
    }

    const {datos, unProcess} = await getTramosCliente(searchParams.initialDate, searchParams.finalDate)
    

    return (
        <>
            <Filter title={"Reporte de Tramos-Cliente"}/>
            <DashboardTramoCliente data={datos} unProcess={unProcess}/>
        </>
    )

}