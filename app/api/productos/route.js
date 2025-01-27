import { NextResponse } from 'next/server';
import mockData from '../../../data/mockData';

export async function GET() {
    try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) {
            throw new Error('Error al obtener los productos');
        }
        const data = await res.json();
        return NextResponse.json(data.products); // Asegúrate de devolver solo los productos
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}