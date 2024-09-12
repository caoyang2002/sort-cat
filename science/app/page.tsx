import Image from 'next/image'
import Score from '@/components/Score'
import PlayArea from '@/components/PlayArea'
import Nucleotide from '@/components/Nucleotide'
export default function Home() {
  return (
    <div className="">
      <Score />
      {/* //flex flex-col items-center */}
      <div className="flex">
        <Nucleotide />
        <PlayArea />
      </div>
    </div>
  )
}
