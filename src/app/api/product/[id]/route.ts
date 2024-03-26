import { NextResponse } from "next/server";
import { dbConnect, dbDisconnect } from '@/lib/mongoose'
import { product } from '@/models/product'

interface prodNumber { //I don't want to use any for context
    params: {
        id: string
    }
}

export async function GET(request: Request, context: prodNumber) {
    const { params } = context;

    try {
        await dbConnect(); //connect
        //console.log('DB CONNECTED!')
        const data = await product.find({prodNumber: params.id}).lean(); // Use `.lean()` for performance if you just need the data
        //await dbDisconnect(); //disconnect

        return new NextResponse(JSON.stringify({data}, null, 2), {
            status: 200,
        })
    } catch (error) {
        console.error('ERROR!', error)
    }
}