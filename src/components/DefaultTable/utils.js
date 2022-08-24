let qTextFormatter = ({_cell}) => _cell.value ? _cell.value.qText : '-',
  accessorDownload = (value) => value.qText,
  qNumSorter = (a, b) => a.qNum - b.qNum,
  qTextSorter = (a, b) => b.qText.localeCompare(a.qText),
  qElemNumSorter = (a, b) => a.qElemNumber - b.qElemNumber;

function parseColNodes(nodes, counter = 0) {
  return nodes.reduce((accum, node, index) => {

    let column = { index: node.qValue };

    if (node.qElemNo === -1)
      column.title = 'Итог'
    else if (node.qElemNo >= 0)
      column.title = node.qText
    else
      column.title = "";

    if (node.qSubNodes.length) {
      let { cols, count } = parseColNodes(node.qSubNodes, counter);
      column.columns = cols;
      counter = count;
    }
    else {
      column.formatter = qTextFormatter;
      column.sorter = qNumSorter;
      column.accessorDownload = accessorDownload;
      column.field = counter.toString()

      counter = counter + 1;
    }

    accum.cols.push(column)
    accum.count = counter;

    return accum
  }, { cols: [], count: 0 })
}

function parseColumns(nodes, sorting) {
  let columns = parseColNodes(nodes).cols;

  if (sorting)
    columns = columns.sort((a, b) => a.index - b.index);

  return columns;
}

function parseRowNodes(qLeft, qData, counter = 0, deep = 0) {
  return qLeft.reduce((accum, node, index) => {

    let row = { _: { qText: node.qText } };

    if (node.qSubNodes.length) {
      let { rows, totals, count } = parseRowNodes(node.qSubNodes, qData, counter, deep + 1)

      row._children = rows;
      row = { ...totals, ...row }

      counter = count;
    }
    else {
      row = { ...row, ...qData[counter.toString()] }
      counter = counter + 1;
    }

    if ((node.qElemNo >= 0) || (deep === 0))
      accum.rows.push(row)
    else
      accum.totals = row;
    accum.count = counter;

    return accum
  }, { rows: [], count: 0, totals: {} });
}

function parseRows(qLeft, qData) {
  return parseRowNodes(qLeft, qData).rows
}

let utils = {
  col: {
    qTextFormatter, accessorDownload, qNumSorter, qTextSorter, qElemNumSorter,
  },
  parser: {
    parseRows, parseColumns
  }
}

export default utils;