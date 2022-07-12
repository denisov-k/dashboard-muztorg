import ExcelJS from 'exceljs';
import {saveAs} from "file-saver";

export default {
  async exportXLSX(data, headers, filename = 'export') {

    let rows = data.map(row => row.map(item => (item.qText || '')).splice(0, headers.length));

    const workbook = new ExcelJS.Workbook(),
      worksheet = workbook.addWorksheet('Exported data');

    let columns = headers.map(item => {
      return { name: item, style: { alignment: { wrapText: true } } }
    });

    worksheet.addTable({
      name: 'MyTable',
      ref: 'A1',
      headerRow: true,
      style: { },
      columns,
      rows,
    });

    worksheet.columns.forEach(column => {
      column.width = 33
    })

    const buffer = await workbook.xlsx.writeBuffer();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtension = '.xlsx';

    const blob = new Blob([buffer], {type: fileType});

    saveAs(blob, filename + fileExtension);
  }
}