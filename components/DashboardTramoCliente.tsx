'use client'
import { useState } from 'react';
import { Chart } from 'primereact/chart';
import { Suspense } from 'react';
import Skeleton from './Skeleton';

type DataProp = {
    TipoConsumo: string;
    Linea: string;
    Datos: any[];
}

type UnProcessType = {
    TipoConsumo: string;
    Linea: string;
    Perdidas: number;
}

export default function DashboardTramoCliente({ data, unProcess }: { data: DataProp[][], unProcess: UnProcessType[] }) {

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

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        return color;
    }

    const [comercial] = useState({
        labels: data.map((marker) => marker.filter((marker2) => marker2.TipoConsumo === "Comercial")).filter((markerF) => markerF.length > 0)[0].map((markerD) => markerD.Datos.map((dex, index) => index))[0],
        datasets:

            data.map((marker) => marker.filter((marker2) => marker2.TipoConsumo === "Comercial")).filter((markerF) => markerF.length > 0)[0].map((markerD) => {
                return {
                    label: markerD.Linea,
                    yAxisID: 'y',
                    data: markerD.Datos,
                    fill: false,
                    borderColor: getRandomColor(),
                    tension: .4
                }
            }
            ),
    });

    const [industrial] = useState({
        labels: data.map((marker) => marker.filter((marker2) => marker2.TipoConsumo === "Industrial")).filter((markerF) => markerF.length > 0)[0].map((markerD) => markerD.Datos.map((dex, index) => index))[0],
        datasets:

            data.map((marker) => marker.filter((marker2) => marker2.TipoConsumo === "Comercial")).filter((markerF) => markerF.length > 0)[0].map((markerD) => {
                return {
                    label: markerD.Linea,
                    yAxisID: 'y',
                    data: markerD.Datos,
                    fill: false,
                    borderColor: getRandomColor(),
                    tension: .4
                }
            }
            ),
    });

    const [residencial] = useState({
        labels: data.map((marker) => marker.filter((marker2) => marker2.TipoConsumo === "Residencial")).filter((markerF) => markerF.length > 0)[0].map((markerD) => markerD.Datos.map((dex, index) => index))[0],
        datasets:

            data.map((marker) => marker.filter((marker2) => marker2.TipoConsumo === "Comercial")).filter((markerF) => markerF.length > 0)[0].map((markerD) => {
                return {
                    label: markerD.Linea,
                    yAxisID: 'y',
                    data: markerD.Datos,
                    fill: false,
                    borderColor: getRandomColor(),
                    tension: .4
                }
            }
            ),
    });

    return (
        <div className='p-3 flex flex-col'>

            <div className='flex flex-col md:m-10 p-2 md:flex-row min-w-0 flex-wrap justify-center gap-10'>

                <div className='flex-1 flex flex-col md:max-w-[50%]'>
                    <h3 className='font-semibold text-center text-3xl my-4'>Comercial</h3>
                    <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                        <Chart type="line" data={comercial} options={basicOptions} />
                    </Suspense>
                </div>

                <div className='flex-1 flex flex-col md:max-w-[50%]'>
                    <h3 className='font-semibold text-center text-3xl my-4'>Industrial</h3>
                    <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                        <Chart type="line" data={industrial} options={basicOptions} />
                    </Suspense>
                </div>

            </div>

            <div className='flex flex-col md:m-10 p-2 md:flex-row min-w-0 flex-wrap justify-center gap-10'>

                <div className='flex-1 flex flex-col md:max-w-[50%]'>
                    <h3 className='font-semibold text-center text-3xl my-4'>Residencial</h3>
                    <Suspense fallback={<Skeleton className='mb-2 h-10 w-1/2 mx-auto' />}>
                        <Chart type="line" data={residencial} options={basicOptions} />
                    </Suspense>
                </div>

            </div>

        </div>
    )

}