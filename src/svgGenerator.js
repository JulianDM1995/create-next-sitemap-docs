export function generateSVGContent(
  paths,
  boxWidth,
  boxHeight,
  boxRadius,
  tabWidth,
  verticalGap,
  barGap,
  fontSize,
) {
  const listOfPaths = paths.map((p) => p.path)
  const indentedLabels = indentPaths(listOfPaths)
  const indentedLabelsObject = convertIndentedLabels(indentedLabels)
  console.log({ listOfPaths, indentedLabels, indentedLabelsObject })

  return createSVGFigures(
    indentedLabelsObject,
    boxWidth,
    boxHeight,
    boxRadius,
    tabWidth,
    verticalGap,
    barGap,
    fontSize,
  )
}

class TreeNode {
  constructor(name) {
    this.name = name
    this.children = {}
  }

  isLeaf() {
    return Object.keys(this.children).length === 0
  }
}

const indentPaths = (paths) => {
  const root = new TreeNode('/')

  paths.sort().forEach((path) => {
    const parts = path.split('/').filter(Boolean)
    let currentNode = root

    parts.forEach((part) => {
      if (!currentNode.children[part]) {
        currentNode.children[part] = new TreeNode(part)
      }
      currentNode = currentNode.children[part]
    })
  })

  const treeToArray = (node, indent = '', path = '') => {
    let result = []
    const fullPath = path ? `${path}/${node.name}` : node.name
    const idPath = fullPath === '//' ? '/' : fullPath.replace('//', '/')
    result.push({ label: node.name, indentation: indent.length, id: idPath })
    Object.keys(node.children).forEach((key) => {
      result = result.concat(treeToArray(node.children[key], indent + '+', fullPath))
    })
    return result
  }

  return treeToArray(root)
}

function convertIndentedLabels(indentedLabels) {
  return indentedLabels.map((item) => {
    return {
      label: item.label,
      indentation: item.indentation,
      id: item.id.replace(/\/|\\/g, '_'),
    }
  })
}

function createSVGFigures(
  indentedLabelsObject,
  boxWidth,
  boxHeight,
  boxRadius,
  tabWidth,
  verticalGap,
  barGap,
  fontSize,
) {
  const margin = 10
  const maxDepth = Math.max(...indentedLabelsObject.map((item) => item.indentation))
  const svgHeight = indentedLabelsObject.length * (boxHeight + verticalGap) + margin * 2
  const svgWidth = boxWidth + maxDepth * tabWidth + margin * 2

  let svgFigures = `<svg class="sitemap" xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" style="font-family: Arial, sans-serif; font-size: ${fontSize}px; display: block; margin: 10px auto;">`
  let yPosition = margin

  const indentationLevels = {}
  indentedLabelsObject.forEach((item, index) => {
    const xPosition = item.indentation * tabWidth + margin
    const textXPosition = xPosition + 10
    const textYPosition = yPosition + boxHeight / 2

    const rectStyle = 'fill:white;stroke:black;stroke-width:2'
    const lineStyle = 'stroke:black;stroke-width:2'
    const textAnchor = item.label === '/' ? 'middle' : 'left'

    // Update the yPosition for the current indentation level
    if (!indentationLevels[item.indentation]) {
      indentationLevels[item.indentation] = []
    }
    indentationLevels[item.indentation].push(yPosition + boxHeight / 2)

    svgFigures += `
      <g onclick="event.preventDefault(); document.getElementById('${
        item.id
      }').scrollIntoView({ behavior: 'smooth' }); window.history.pushState(null, null, '#${
      item.id
    }');" style="cursor:pointer;">
        <rect x="${xPosition}" y="${yPosition}" width="${boxWidth}" height="${boxHeight}" rx="${boxRadius}" ry="${boxRadius}" style="${rectStyle}" />
        <text x="${textXPosition}" y="${textYPosition}" text-anchor="${textAnchor}" alignment-baseline="middle">${
      item.label
    }</text>
        ${
          index > 0
            ? `<line x1="${xPosition - barGap}" y1="${
                yPosition + boxHeight / 2
              }" x2="${xPosition}" y2="${yPosition + boxHeight / 2}" style="${lineStyle}" />`
            : ''
        }
      </g>
    `

    // Draw vertical lines for indentation
    if (item.indentation > 0 && indentationLevels[item.indentation - 1]) {
      const parentYPositions = indentationLevels[item.indentation - 1]
      const parentY = parentYPositions[parentYPositions.length - 1] + boxHeight / 2
      svgFigures += `
        <line x1="${xPosition - tabWidth + barGap}" y1="${parentY}" x2="${
        xPosition - tabWidth + barGap
      }" y2="${textYPosition}" style="${lineStyle}" />
      `
    }

    yPosition += boxHeight + verticalGap
  })

  svgFigures += '</svg>'
  return svgFigures
}
