import { useResizeDetector } from 'react-resize-detector'

type FullscreenProps = {
  children: React.ReactNode
  bgColor?: string
}

function Fullscreen({ children, bgColor }: FullscreenProps) {
  const { height, ref } = useResizeDetector()

  return (
    <div id="__container" className={bgColor ? bgColor : 'bg-white'} ref={ref}>
      <main
        className="scrollbar overflow-auto"
        style={height ? { height: height } : {}}
      >
        {children}
      </main>
    </div>
  )
}

export default Fullscreen
