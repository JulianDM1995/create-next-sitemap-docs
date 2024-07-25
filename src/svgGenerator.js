export function generateSVGContent(
  appPath,
  paths,
  boxWidth,
  boxHeight,
  boxRadius,
  tabWidth,
  verticalGap,
  barGap,
  fontSize,
) {
  console.log({ paths })
  const listOfPaths = paths.map((p) => p.path)
  const indentedLabels = indentPaths(paths)
  const collapsedIndentedLabels = collapseIndentedLabels(indentedLabels, listOfPaths)
  // console.log({ listOfPaths, indentedLabels, collapsedIndentedLabels })

  return createSVGFigures(
    collapsedIndentedLabels,
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
  constructor(name, type, routeType) {
    this.name = name
    this.children = {}
    this.type = type
    this.routeType = routeType
  }

  isLeaf() {
    return Object.keys(this.children).length === 0
  }
}

const indentPaths = (paths) => {
  const root = new TreeNode('/', 'Page', 'static')

  paths
    .sort((a, b) => a.path.localeCompare(b.path))
    .forEach(({ path, type, routeType }) => {
      const parts = path.split('/').filter(Boolean)
      let currentNode = root

      parts.forEach((part, index) => {
        if (!currentNode.children[part]) {
          currentNode.children[part] = new TreeNode(
            part,
            index === parts.length - 1 ? type : 'Page',
            index === parts.length - 1 ? routeType : 'static',
          )
        }
        currentNode = currentNode.children[part]
      })
    })

  const treeToArray = (node, indent = '', path = '') => {
    let result = []
    const fullPath = path ? `${path}/${node.name}` : node.name
    const idPath = fullPath === '//' ? '/' : fullPath.replace('//', '/')
    result.push({
      label: node.name,
      indentation: indent.length,
      id: idPath.replace(/\/|\\/g, '_'),
      parent: path.replace('//', '/'),
      type: node.type,
      routeType: node.routeType,
    })
    Object.keys(node.children).forEach((key) => {
      result = result.concat(treeToArray(node.children[key], indent + '+', fullPath))
    })
    return result
  }

  return treeToArray(root)
}

const collapseIndentedLabels = (indentedLabels, listOfPaths) => {
  let newIndentedLabels = JSON.parse(JSON.stringify(indentedLabels))

  for (let i = 1; i < newIndentedLabels.length; i++) {
    const currentIndentation = newIndentedLabels[i].indentation
    const previousIndentation = newIndentedLabels[i - 1].indentation

    if (currentIndentation < previousIndentation) {
      const parentExists = listOfPaths.includes(newIndentedLabels[i - 1].parent)
      if (!parentExists) {
        newIndentedLabels[i - 2].label += `/${newIndentedLabels[i - 1].label}`
        newIndentedLabels[i - 2].id = newIndentedLabels[i - 1].id
        newIndentedLabels[i - 2].type = newIndentedLabels[i - 1].type
        newIndentedLabels[i - 2].routeType = newIndentedLabels[i - 1].routeType

        newIndentedLabels.splice(i - 1, 1)

        i = Math.max(i - 2, 1)
      }
    }
  }

  newIndentedLabels = newIndentedLabels.map((label, index) => {
    if (index > 0) {
      label.label = `/${label.label}`
    }
    return label
  })

  return newIndentedLabels
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
