'use client'
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Chart } from 'primereact/chart';
import { Suspense } from 'react';
import Skeleton from './Skeleton';

type DataProp = {
    Linea: string,
    consumo: number,
    perdidas: number,
    costo: number
}

export default function DashboardTramos({ data }: { data: DataProp[] }) {

    const [basicData] = useState({
        labels: data.map((marker) => marker.Linea),
        datasets: [
            {
                label: 'Perdidas',
                data: data.map((marker) => marker.perdidas),
                borderDash: [5, 5],
                fill: true,
                borderColor: '#42A5F5',
                tension: .4
            }
        ]
    });

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

    const [consumoCosto] = useState({
        labels: data.map((marker) => marker.Linea),
        datasets: [
            {
                label: 'Consumo',
                yAxisID: 'y',
                data: data.map((marker) => marker.consumo),
                fill: false,
                borderColor: '#00bb7e',
                tension: .4,
            },
            {
                label: 'Costo',
                yAxisID: 'y1',
                fill: false,
                data: data.map((marker) => marker.costo),
                borderColor: '#42A5F5',
                tension: .4,
            },
        ]
    });



    return (
        <div className='p-3 flex flex-col'>
            <div>
                <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                    <DataTable className='' resizableColumns columnResizeMode="fit" sortField="Linea" sortOrder={1} showGridlines
                        value={data} filters={filters} filterDisplay="menu" globalFilterFields={['Linea', 'consumo', 'perdidas', 'costo']}
                        header={header} emptyMessage="Sin información" paginator
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                        selectionMode="single"
                        selection={selectedRow}
                        onSelectionChange={e => setSelectedRow(e.value)}>
                        <Column sortable field="Linea" header="Linea"></Column>
                        <Column sortable field="consumo" header="Consumo"></Column>
                        <Column sortable field="perdidas" header="Perdidas"></Column>
                        <Column sortable field="costo" header="Costo"></Column>
                    </DataTable>
                </Suspense>
            </div>

            <div className='flex flex-col md:m-10 p-2 md:flex-row min-w-0 flex-wrap justify-center gap-10'>

                <div className='flex-1 flex flex-col md:max-w-[50%]'>
                    <h3 className='font-semibold text-center text-3xl my-4'>Consumo y Costo</h3>
                    <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                        <Chart type="line" data={consumoCosto} options={multiAxisOptions} />
                    </Suspense>
                </div>

                <div className='flex-1 flex flex-col md:first-letter:max-w-[50%]'>
                    <h3 className='font-semibold text-center text-3xl my-4'>Perdidas</h3>
                    <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                        <Chart type="line" data={basicData} options={basicOptions} />
                    </Suspense>
                </div>

            </div>
        </div>
    )

}