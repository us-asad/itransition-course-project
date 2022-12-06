import { SEO } from "components";
import { Reviews } from "containers";
import { reviews } from "data";

export default function Home() {
  return (
    <div className="custom-container pb-10">
      <SEO />
      <div>
        <h2 className="text-[30px] font-bold">Top LetRevs</h2>
        <Reviews
          reviews={reviews}
        />
      </div>
      <div className="h-[200vh]" />
    </div>
  )
}