import React, { useRef, useEffect } from 'react'
import VexFlow from 'vexflow'

const VF = VexFlow.Flow
const { Formatter, Renderer, Stave, StaveNote } = VF
const clefAndTimeWidth = 60;

export function Score({
  staves = [],
  keys,
  clef,
  width = 262,
  height = 150,
}) {
  const container = useRef()
  const rendererRef = useRef()

  useEffect(() => {
    if (rendererRef.current == null) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      )
    }
    const renderer = rendererRef.current
    renderer.resize(width, height)
    const context = renderer.getContext()
    context.clear();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')
    const staveWidth = 180;

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

  }, [keys])

  return <div ref={container} />
}