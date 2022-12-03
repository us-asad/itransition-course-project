import { SEO } from "components";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <SEO />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}