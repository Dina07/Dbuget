import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Expense } from '../types';

/**
 * Export expenses to CSV format
 */
export const exportToCSV = (
  expenses: Expense[],
  userName: string,
  monthlySalary: number
) => {
  const headers = ['Date', 'Category', 'Amount (₹)', 'Description'];
  const rows = expenses.map((exp) => [
    exp.date.toLocaleDateString(),
    exp.category,
    exp.amount.toFixed(2),
    exp.description || '-',
  ]);

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = monthlySalary - totalExpenses;

  // Add summary rows
  rows.push([]);
  rows.push(['Summary']);
  rows.push(['Monthly Salary', '', monthlySalary.toFixed(2), '']);
  rows.push(['Total Expenses', '', totalExpenses.toFixed(2), '']);
  rows.push(['Balance', '', balance.toFixed(2), '']);

  // Create CSV content
  const csvContent = [
    `DBudget Expense Report - ${userName}`,
    `Generated: ${new Date().toLocaleDateString()}`,
    '',
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((cell) => {
          // Escape quotes and wrap in quotes if contains comma
          const escaped = String(cell).replace(/"/g, '""');
          return escaped.includes(',') ? `"${escaped}"` : escaped;
        })
        .join(',')
    ),
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `DBudget_Report_${new Date().getTime()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export chart to PNG image
 */
export const exportToImage = async (elementId: string, fileName: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      alert('Chart not found');
      return;
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${fileName}_${new Date().getTime()}.png`;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting to image:', error);
    alert('Error exporting image');
  }
};

/**
 * Export expenses to PDF
 */
export const exportToPDF = (
  expenses: Expense[],
  userName: string,
  monthlySalary: number
) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;
  const lineHeight = 7;
  const margin = 15;

  // Title and header
  pdf.setFontSize(20);
  pdf.text('DBudget Expense Report', margin, yPosition);

  yPosition += 15;
  pdf.setFontSize(10);
  pdf.text(`User: ${userName}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(`Monthly Salary: ₹${monthlySalary.toFixed(2)}`, margin, yPosition);

  yPosition += 15;
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = monthlySalary - totalExpenses;

  // Summary section
  pdf.setFontSize(11);
  pdf.text('Summary', margin, yPosition);
  yPosition += lineHeight;
  pdf.setFontSize(9);
  pdf.text(`Total Expenses: ₹${totalExpenses.toFixed(2)}`, margin, yPosition);
  yPosition += lineHeight;
  pdf.text(
    `Balance: ₹${balance.toFixed(2)}`,
    margin,
    yPosition
  );

  yPosition += 15;

  // Expenses table
  if (expenses.length > 0) {
    pdf.setFontSize(11);
    pdf.text('Expenses', margin, yPosition);
    yPosition += lineHeight;

    // Table headers
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Date', margin, yPosition);
    pdf.text('Category', margin + 40, yPosition);
    pdf.text('Amount (₹)', margin + 90, yPosition);
    pdf.text('Description', margin + 130, yPosition);
    yPosition += lineHeight;

    // Draw line under headers
    pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
    yPosition += 3;

    pdf.setFont('helvetica', 'normal');

    // Table rows
    expenses.forEach((expense) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }

      const dateStr = expense.date.toLocaleDateString();
      const amountStr = `₹${expense.amount.toFixed(2)}`;
      const descStr = expense.description || '-';

      pdf.text(dateStr, margin, yPosition);
      pdf.text(expense.category, margin + 40, yPosition);
      pdf.text(amountStr, margin + 90, yPosition);

      // Wrap description text
      const descWidth = pageWidth - margin - 130 - margin;
      const descLines = pdf.splitTextToSize(descStr, descWidth);
      pdf.text(descLines, margin + 130, yPosition);

      yPosition += lineHeight * Math.max(1, descLines.length);
    });
  }

  // Save PDF
  pdf.save(`DBudget_Report_${new Date().getTime()}.pdf`);
};
