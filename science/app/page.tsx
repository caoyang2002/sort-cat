import Score from "@/components/Score";
import PlayArea from "@/components/PlayArea";
export default function Home() {
  return (
    <div className="page">
      <Score />
      <div className="flex">
        {/* <Nucleotide /> */}
        <PlayArea />
      </div>
    </div>
  );
}
