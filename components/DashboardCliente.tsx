'use client'
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Chart } from 'primereact/chart';
import { Suspense } from 'react';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import Skeleton from './Skeleton';

type DataProp = {
    Linea: string,
    consumo_residencial: number,
    consumo_comercial: number,
    consumo_industrial: number,
    perdidas_residencial: number,
    perdidas_comercial: number,
    perdidas_industrial: number,
    costo_residencial: number,
    costo_comercial: number,
    costo_industrial: number
}

export default function DashboardTramos({ data }: { data: DataProp[] }) {

    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const [globalFilterValue, setGlobalFilterValue1] = useState('');
    const [selectedRow, setSelectedRow] = useState();

    const headerclearFilter = () => {
        setFilters({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilterValue1('');
    }

    const header = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Limpiar" className="p-button-outlined" onClick={headerclearFilter} />
                <span className="p-input-icon-left mx-10">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar..." />
                </span>
            </div>
        )
    }

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters1 = { ...filters };
        _filters1['global'].value = value;

        setFilters(_filters1);
        setGlobalFilterValue1(value);
    }

    let multiAxisOptions = {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: '#495057'
                },
                grid: {
                    drawOnChartArea: false,
                    color: '#ebedef'
                }
            }
        }
    };

    const [consumo] = useState({
        labels: data.map((marker) => marker.Linea),
        datasets: [{
            label: 'Residencial',
            yAxisID: 'y',
            data: data.map((marker) => marker.consumo_residencial),
            fill: false,
            borderColor: '#007C04',
            tension: .4,
        },
        {
            label: 'Comercial',
            yAxisID: 'y',
            data: data.map((marker) => marker.consumo_comercial),
            fill: false,
            borderColor: '#00187C',
            tension: .4,
        },
        {
            label: 'Industrial',
            yAxisID: 'y',
            data: data.map((marker) => marker.consumo_industrial),
            fill: false,
            borderColor: '#09DACD',
            tension: .4,
        }]
    });

    const [costo] = useState({
        labels: data.map((marker) => marker.Linea),
        datasets: [{
            label: 'Residencial',
            yAxisID: 'y',
            data: data.map((marker) => marker.costo_residencial),
            fill: false,
            borderColor: '#007C04',
            tension: .4,
        },
        {
            label: 'Comercial',
            yAxisID: 'y',
            data: data.map((marker) => marker.costo_comercial),
            fill: false,
            borderColor: '#00187C',
            tension: .4,
        },
        {
            label: 'Industrial',
            yAxisID: 'y',
            data: data.map((marker) => marker.costo_industrial),
            fill: false,
            borderColor: '#09DACD',
            tension: .4,
        }]
    });

    const [perdida] = useState({
        labels: data.map((marker) => marker.Linea),
        datasets: [{
            label: 'Residencial',
            yAxisID: 'y',
            data: data.map((marker) => marker.perdidas_residencial),
            fill: false,
            borderColor: '#007C04',
            tension: .4,
            borderDash: [5, 5],
        },
        {
            label: 'Comercial',
            yAxisID: 'y',
            data: data.map((marker) => marker.perdidas_comercial),
            fill: false,
            borderColor: '#00187C',
            tension: .4,
            borderDash: [5, 5],
        },
        {
            label: 'Industrial',
            yAxisID: 'y',
            data: data.map((marker) => marker.perdidas_industrial),
            fill: false,
            borderColor: '#09DACD',
            tension: .4,
            borderDash: [5, 5],
        }]
    });

    const headerGroup = <ColumnGroup>
        <Row>
            <Column sortable header="Linea" rowSpan={3} />
            <Column header="Consumo" colSpan={3} />
            <Column header="Costo" colSpan={3} />
            <Column header="Perdida" colSpan={3} />
        </Row>
        <Row>
            <Column sortable header="Residencial" colSpan={1} />
            <Column sortable header="Comercial" colSpan={1} />
            <Column sortable header="Industrial" colSpan={1} />
            <Column sortable header="Residencial" colSpan={1} />
            <Column sortable header="Comercial" colSpan={1} />
            <Column sortable header="Industrial" colSpan={1} />
            <Column sortable header="Residencial" colSpan={1} />
            <Column sortable header="Comercial" colSpan={1} />
            <Column sortable header="Industrial" colSpan={1} />
        </Row>
    </ColumnGroup>;

    return (
        <div className='p-3 flex flex-col'>
            <div>
                <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                    <DataTable headerColumnGroup={headerGroup} resizableColumns columnResizeMode="fit" sortField="Linea" sortOrder={1} showGridlines
                        value={data} filters={filters} filterDisplay="menu" globalFilterFields={['Linea', 'consumo', 'perdidas', 'costo']}
                        header={header} emptyMessage="Sin información" paginator
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                        selectionMode="single"
                        selection={selectedRow}
                        onSelectionChange={e => setSelectedRow(e.value)}>
                        <Column sortable field="Linea" header="Linea"></Column>

                        <Column sortable field="consumo_residencial" header="Residencial"></Column>
                        <Column sortable field="consumo_comercial" header="Comercial"></Column>
                        <Column sortable field="consumo_industrial" header="Industrial"></Column>

                        <Column sortable field="costo_residencial" header="Residencial"></Column>
                        <Column sortable field="costo_comercial" header="Comercial"></Column>
                        <Column sortable field="costo_industrial" header="Industrial"></Column>

                        <Column sortable field="perdidas_residencial" header="Residencial"></Column>
                        <Column sortable field="perdidas_comercial" header="Comercial"></Column>
                        <Column sortable field="perdidas_industrial" header="Industrial"></Column>

                    </DataTable>
                </Suspense>
            </div>

            <div className='flex flex-col md:m-10 p-2 md:flex-row min-w-0 flex-wrap justify-center gap-10'>

                <div className='flex-1 flex flex-col md:max-w-[50%]'>
                    <h3 className='font-semibold text-center text-3xl my-4'>Consumo</h3>
                    <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                        <Chart type="line" data={consumo} options={multiAxisOptions} />
                    </Suspense>
                </div>

                <div className='flex-1 flex flex-col md:max-w-[50%]'>
                    <h3 className='font-semibold text-center text-3xl my-4'>Costos</h3>
                    <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                        <Chart type="line" data={costo} options={basicOptions} />
                    </Suspense>
                </div>

            </div>

            <div className='flex flex-col md:m-10 p-2 md:flex-row min-w-0 flex-wrap justify-center gap-10'>
                <div className='flex-1 flex flex-col md:max-w-[50%]'>
                    <h3 className='font-semibold text-center text-3xl my-4'>Perdidas</h3>
                    <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                        <Chart type="line" data={perdida} options={basicOptions} />
                    </Suspense>
                </div>
            </div>


        </div>
    )

}