import Head from 'next/head'
import React from 'react'

export default function SEO({ title }) {
  return (
    <Head>
      <title>{title || "LetRev! - let's review together!"}</title>
    </Head>
  )
}
