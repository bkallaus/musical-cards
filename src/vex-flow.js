import React, { useRef, useEffect, useState } from 'react'
import * as VexFlow from 'vexflow'

const VF = VexFlow.Flow || VexFlow
const { Formatter, Renderer, Stave, StaveNote } = VF
const clefAndTimeWidth = 60;

export function Score({
  keys,
  clef,
  width = 262,
  height = 150,
  ...rest
}) {
  const container = useRef()
  const rendererRef = useRef()
  const [chartWidth, setChartWidth] = useState(width)

  useEffect(() => {
    const handleResize = () => {
      if (container.current) {
        setChartWidth(container.current.clientWidth)
      }
    }

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (rendererRef.current == null) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      )
    }
    const renderer = rendererRef.current
    renderer.resize(chartWidth, height)
    const context = renderer.getContext()
    context.clear();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

    const staveWidth = Math.max(chartWidth - clefAndTimeWidth - 1, 100);

    const stave = new Stave(0, 0, staveWidth);
    stave.setWidth(staveWidth + clefAndTimeWidth);
    stave.addClef(clef);
    stave.setContext(context).draw();

    const stavedNotes = new StaveNote({
      clef,
      keys: keys,
      duration: 'q',
    });

    Formatter.FormatAndDraw(context, stave, [stavedNotes], {
      auto_beam: true,
    });

  }, [keys, chartWidth, height, clef])

  return <div ref={container} {...rest} />
}
