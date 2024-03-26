import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url) /* This is how to get and destructure search params from a URL */
    const mysearchparam = searchParams.get('mysearchparam')
    console.log(`GET REQUEST with the seachparam of ${mysearchparam}`)

    return new Response(JSON.stringify({name: 'nick'}), /* this second option is for errors(ie. unauthorized) */ {
        status: 401,
    })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    console.log('POST REQUEST', body)

    return new Response("OK")
}