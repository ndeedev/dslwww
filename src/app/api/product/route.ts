// import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect, dbDisconnect } from '@/lib/mongoose'
import { product } from '@/models/product'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const qProdNumber = searchParams.get('qProdNumber')
    //console.log(JSON.stringify({partNumber: qProdNumber})); // Convert to JSON string for pretty printing

    try {
        await dbConnect(); //connect
        //console.log('DB CONNECTED!')
        const prodSearch = await product.find({partNumber: qProdNumber}).lean(); // Use `.lean()` for performance if you just need the data
        await dbDisconnect(); //disconnect

        return new NextResponse(JSON.stringify({prodSearch}, null, 2), {
            status: 401,
        })
    } catch (error) {
        console.error('ERROR!', error)
    }
  }

export async function POST(request: Request){
    const data = await request.json()
    
    return NextResponse.json({
        data
    });
}