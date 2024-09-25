import DynamicScrollingImage from '@/components/DynamicScrollingImage'
// import FlowField from '@/components/FlowField '
import Footer from '@/components/Footer'
import Header from '@/components/Header'
// import InstancedParticles from '@/components/InstancedParticles'
// import Particles from '@/components/Particles'
import PlayArea from '@/components/PlayArea'
import ScrollingSvgBackground from '@/components/ScrollingSVGBackground'

// import SardineShoal from '@/components/SardineShoal'
// import ThreeDRotatingLogo from '@/components/ThreeDRotatingLogo'

export default function Home() {
  const initialImages = [
    '/images/01.jpg',
    '/images/02.jpg',
    '/images/03.jpg',
    '/images/04.jpg',
    '/images/05.jpg',
    '/images/06.jpg',
    '/images/07.jpg',
    '/images/08.jpg',
    '/images/09.jpg',
    '/images/010.jpg',
    '/images/011.jpg',
    '/images/012.jpg',
    '/images/013.jpg',
    '/images/014.jpg',
    '/images/015.jpg',
    '/images/016.jpg',
    '/images/017.jpg',
    '/images/018.jpg',
    '/images/019.jpg',
    '/images/020.jpg',
    '/images/021.jpg',
    '/images/022.jpg',
    '/images/023.jpg',
    '/images/024.jpg',
    '/images/025.jpg',
  ]

  return (
    <>
      <div className="">
        <div className="mt-2">
          <Header />
        </div>
        <div className="mt-2">
          <DynamicScrollingImage initialImages={initialImages} />
        </div>
        {/* <ThreeDRotatingLogo /> */}
        {/* <FlowField /> */}

        <ScrollingSvgBackground
          svgPath="/assets/cat-head-gray.svg"
          svgSize={{ width: 32, height: 32 }}
          scrollDirection="stop"
          backgroundColor="#000"
          scrollSpeed={0}
        />

        {/* <SardineShoal /> */}
        {/* <Particles /> */}
        <PlayArea />
        {/* <InstancedParticles /> */}
        <Footer />
      </div>
    </>
  )
}
