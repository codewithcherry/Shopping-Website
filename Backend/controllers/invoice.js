const PDFDocument = require('pdfkit');

exports.GenerateInvoice = (order, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Set headers for download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="invoice.pdf"');

  // Pipe to response
  doc.pipe(res);

  // Define colors
  const themeColor = '#2E86C1';
  const headerColor = '#1B4F72';
  const textColor = '#333333';
  const lightGrey = '#F2F2F2';
  const customerSectionColor = '#FF5733'; // New color for customer section

  // Company information (header section with increased height for background color)
  doc.rect(0, 0, doc.page.width, 105).fill(headerColor);
  doc.fillColor('white').fontSize(20).text('MyShop App', 50, 40);
  doc.fontSize(10).text('White Hills, Bangalore, India', 50, 60);
  doc.text('Zip code: 501244', 50, 75);
  doc.text('Email: care@myshop.com', 50, 90);
  doc.text('', 50, 100);

  // Invoice title and date with theme color
  doc.fillColor(themeColor).fontSize(30).text('INVOICE', 400, 50);

  // Customer section with color theme
  doc.fillColor(textColor).fontSize(10).text(`Customer ID: ${order.user.toString()}`, 50, 110);
  doc.fillColor(themeColor).text(`Customer Name: ${order.shippingAddress.fullName}`, 50, 130);
  doc.fillColor(textColor).text(`Phone: ${order.shippingAddress.phoneNumber}`, 50, 150);

  const formattedDate = new Date(order.orderDate).toLocaleDateString();
  doc.fillColor(textColor).fontSize(10).text(`INVOICE #${order._id.toString()}`, 350, 130);
  doc.text(`DATE ${formattedDate}`, 350, 150);
 

  // Shipping and Billing Address Sections with light grey background
  doc.fillColor(themeColor).fontSize(12).text('Shipping Address', 50, 170);
  doc.fillColor(textColor).fontSize(10);
  doc.text(order.shippingAddress.fullName, 50, 190);
  doc.text(order.shippingAddress.doorNumber, 50, 205);
  doc.text(order.shippingAddress.streetArea, 50, 220);
  doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state}`, 50, 235);
  doc.text(`Postal Code: ${order.shippingAddress.postalCode}`, 50, 250);
  doc.text(`Phone: ${order.shippingAddress.phoneNumber}`, 50, 265);

  doc.fillColor(themeColor).fontSize(12).text('Billing Address',200, 170);
  doc.fillColor(textColor).fontSize(10);
  doc.text(order.shippingAddress.fullName,200, 190); // Assuming billing address is same as shipping address
  doc.text(order.shippingAddress.doorNumber,200, 205);
  doc.text(order.shippingAddress.streetArea,200, 220);
  doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state}`,200, 235);
  doc.text(`Postal Code: ${order.shippingAddress.postalCode}`,200, 250);
  doc.text(`Phone: ${order.shippingAddress.phoneNumber}`,200, 265);

  // Billing Details Section with colored headings
  doc.fillColor(themeColor).fontSize(12).text('Billing Details', 50, 285);
  doc.fillColor(textColor).fontSize(10);
  doc.text(`Payment Type: ${order.paymentType}`, 50, 305);
  doc.text(`Payment Mode: ${order.paymentMode}`, 50, 320);
  doc.text(`Status: Payment ${order.orderStatus}`, 50, 335);
  doc.text(`TXID: ${order.transactionDetails.transactionId}`, 50, 350);
  doc.text(`UTR: ${order.transactionDetails.utr}`, 50, 365);
  doc.text(`Date: ${new Date(order.transactionDetails.transactionDate).toLocaleDateString()}`, 50, 380);

  // Separator line
  doc.moveTo(50, 400).lineTo(550, 400).strokeColor(themeColor).stroke();

  // Table Header with background color
  doc.rect(50, 415, 500, 20).fillAndStroke(themeColor, themeColor);
  doc.fillColor('white').fontSize(10).text('DESCRIPTION', 50, 420);
  doc.text('QTY', 300, 420);
  doc.text('UNIT PRICE', 350, 420);
  doc.text('AMOUNT', 450, 420);
  doc.moveTo(50, 435).lineTo(550, 435).stroke();

  // Table Content with alternating row colors
  let totalAmount = 0;
  let y = 450;
  order.products.forEach((item, index) => {
    const unitPrice = item.productId.finalPrice;
    const itemTotal = unitPrice * item.quantity;
    totalAmount = order.transactionDetails.amount;

    // Alternate row color
    if (index % 2 === 0) {
      doc.rect(50, y - 5, 500, 15).fill(lightGrey);
    }
    
    doc.fillColor(textColor).text(item.title, 50, y);
    doc.text(item.quantity, 300, y);
    doc.text(`$${unitPrice.toFixed(2)}`, 350, y);
    doc.text(`$${itemTotal.toFixed(2)}`, 450, y);
    y += 15;
  });

  // Footer Totals
  doc.moveTo(50, y + 10).lineTo(550, y + 10).strokeColor(themeColor).stroke();
  y += 25;
  doc.fontSize(10).text('SUBTOTAL', 370, y);
  doc.text(`$${totalAmount.toFixed(2)}`, 450, y);

  y += 15;
  const tax = order.tax || 0;
  doc.text('TAX', 370, y);
  doc.text(`$${tax.toFixed(2)}`, 450, y);

  y += 15;
  const delivery = totalAmount < 199 ? 25 : 0;
  doc.text('DELIVERY', 370, y);
  doc.text(`$${delivery.toFixed(2)}`, 450, y);

  y += 15;
  const total = totalAmount + tax + delivery;
  doc.fontSize(12).text('TOTAL', 370, y);
  doc.text(`$${total.toFixed(2)}`, 450, y);

  // Thank you note
  doc.moveDown(2);
  doc.fontSize(10).text('Thank you for your business!', 50, y + 40);

  // Footer
  doc.text('If you have any questions about this invoice, please contact', 50, y + 60);
  doc.text('www.myshop.com/help or care@myshop.com', 50, y + 75);

  // Finalize the PDF and end the stream
  doc.end();
};
