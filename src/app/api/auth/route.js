import { NextResponse } from 'next/server';

export async function POST(request){
    const {username, password} = await request.json();

    if(username === "test" && password === "test"){
        return NextResponse.json({valid: true})
    }

    return NextResponse.json({valid: false})

}