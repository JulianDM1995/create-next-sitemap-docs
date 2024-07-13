export function generateSVGContent(
  formattedPaths,
  boxWidth,
  boxHeight,
  boxRadius,
  tabWidth,
  verticalGap,
  barGap,
  fontSize,
) {
  const margin = 10
  const maxDepth = Math.max(...formattedPaths.map((item) => (item.path.match(/\//g) || []).length))
  const svgHeight = formattedPaths.length * (boxHeight + verticalGap) + margin * 2
  const svgWidth = (maxDepth + 1) * tabWidth + boxWidth + margin * 2
  let svgContent = `<svg class="sitemap" xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" style="font-family: Arial, sans-serif; font-size: ${fontSize}px; display: block; margin: 10px auto;">`
  let yPosition = margin
  const lines = []
  const positions = {}

  formattedPaths.forEach((item) => {
    const { formattedPath } = item
    let depth = (formattedPath.match(/\//g) || []).length
    depth = formattedPath === '/' ? 0 : depth
    const xPosition = depth * tabWidth + margin
    const displayText = formattedPath.split('/').pop()
    const textXPosition = xPosition + 10
    const textYPosition = yPosition + boxHeight / 2

    positions[formattedPath] = { x: xPosition, y: yPosition + boxHeight / 2 }

    let rectStyle = 'fill:white;stroke:black;stroke-width:2'
    let lineStyle = 'stroke:black;stroke-width:2'

    svgContent += `<g onclick="event.preventDefault(); document.getElementById('${formattedPath.replace(
      /\/|\\/g,
      '_',
    )}').scrollIntoView({ behavior: 'smooth' }); window.history.pushState(null, null, '#${formattedPath.replace(
      /\/|\\/g,
      '_',
    )}');" style="cursor:pointer;">`
    svgContent += `<rect x="${xPosition}" y="${yPosition}" width="${boxWidth}" height="${boxHeight}" rx="${boxRadius}" ry="${boxRadius}" style="${rectStyle}" />`
    svgContent += `<text x="${textXPosition}" y="${textYPosition}" text-anchor="left" alignment-baseline="middle">/${displayText}</text>`
    svgContent += `</g>`

    if (depth > 0) {
      const parentPath = formattedPath.substring(0, formattedPath.lastIndexOf('/')) || '/'
      const parentPosition = positions[parentPath]
      if (parentPosition) {
        const middleX = xPosition - barGap
        const parentBottomY = parentPosition.y + boxHeight / 2
        lines.push(
          `<line x1="${middleX}" y1="${yPosition + boxHeight / 2}" x2="${xPosition}" y2="${
            yPosition + boxHeight / 2
          }" style="${lineStyle}" />`,
        )
        lines.push(
          `<line x1="${middleX}" y1="${parentBottomY}" x2="${middleX}" y2="${
            yPosition + boxHeight / 2
          }" style="${lineStyle}" />`,
        )
      }
    }

    yPosition += boxHeight + verticalGap
  })

  svgContent += lines.join('')
  svgContent += '</svg>'
  return svgContent
}
