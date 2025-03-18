import config from '@/lib/config'
import ImageKit from 'imagekit'
import { NextResponse } from 'next/server'

const imageKit = new ImageKit({
  publicKey: config.env.imageKit.publicKay,
  privateKey: config.env.imageKit.privateKey!,
  urlEndpoint: config.env.imageKit.urlEndpoint!,
})

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters())
}
