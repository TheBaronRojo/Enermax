'use client'
import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import dayjs from 'dayjs';
import { locale, addLocale } from 'primereact/api';

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});

locale('es');

export default function Filter({ title }: { title: string }) {

    const router = useRouter();
    const pathname = usePathname()
    const [initialDate, setInitialDate] = useState(dayjs("2010-01-01").toDate());
    const [finalDate, setFinalDate] = useState(dayjs("2010-01-31").toDate());

    const sendData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`${pathname}?initialDate=${dayjs(initialDate).format('YYYY-MM-DD')}&finalDate=${dayjs(finalDate).format('YYYY-MM-DD')}`);
    }

    return (
        <form className='flex flex-col gap-2 mx-auto my-0 p-5' onSubmit={sendData}>
            <h1 className='text-4xl font-bold text-center mb-4'>{title}</h1>
            <div className='flex items-end gap-6'>
                <div>
                    <label className='font-semibold block'>Fecha incial</label>
                    <Calendar dateFormat="yy/mm/dd" value={initialDate} onChange={(e) => setInitialDate(e.value as Date)} />
                </div>

                <div>
                    <label className='font-semibold block'>Fecha final</label>
                    <Calendar dateFormat="yy/mm/dd" value={finalDate} onChange={(e) => setFinalDate(e.value as Date)} />
                </div>

                <Button className='mt-4 !bg-blue !border-none' label="Buscar información" type='submit' />
            </div>
        </form>
    )
}