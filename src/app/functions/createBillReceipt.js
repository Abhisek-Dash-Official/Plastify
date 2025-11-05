import jsPDF from 'jspdf';

export default function generatePDF({ orderData, subtotal, discount, total, cartItems, products, appliedCoupon }) {
    const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
    });

    // ====== HEADER ======
    doc.setFillColor(240, 253, 244); // soft green background
    doc.rect(0, 0, 210, 40, "F");

    // Add brand logo
    doc.addImage("/img/brandLogo.png", "PNG", 5, 8, 45, 20);

    // Brand Name
    doc.setTextColor(22, 101, 52); // green tone
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("PLASTIFY", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(51, 65, 85);
    doc.text("Eco-Friendly Sustainable Products", 105, 30, { align: "center" });

    // ====== ORDER INFO ======
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("INVOICE", 15, 55);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 55);
    doc.text(`Order Status: ${orderData.status}`, 150, 60);

    doc.setFontSize(11);
    doc.setTextColor(55, 65, 81);
    doc.text("Customer Details:", 15, 70);
    doc.setFontSize(10);
    doc.text(`Name: ${orderData.userName}`, 15, 76);
    doc.text(`Email: ${orderData.userEmail}`, 15, 82);
    doc.text(`Phone: ${orderData.contactNumber}`, 15, 88);
    doc.text(`Address: ${orderData.shippingAddress}`, 15, 94);

    // ====== TABLE HEADER ======
    let y = 110;
    doc.setFillColor(22, 163, 74);
    doc.rect(15, y, 180, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Product", 20, y + 6);
    doc.text("Color", 90, y + 6);
    doc.text("Qty", 125, y + 6);
    doc.text("Price", 145, y + 6);
    doc.text("Total", 170, y + 6);

    // ====== TABLE CONTENT ======
    y += 12;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(33, 33, 33);

    cartItems.forEach((item, index) => {
        const product = products[index];
        if (product) {
            doc.text(product.title.substring(0, 30), 20, y);
            doc.text(item.color || "-", 90, y);
            doc.text(`${item.quantity}`, 125, y);
            doc.text(`INR${product.price}`, 145, y);
            doc.text(`INR${(product.price * item.quantity).toFixed(2)}`, 170, y);
            y += 8;
        }
    });

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(15, y, 195, y);
    y += 10;

    // ====== TOTAL SECTION ======
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 101, 52);

    doc.text("Subtotal:", 140, y);
    doc.text(`INR${subtotal}`, 180, y, { align: "right" });
    y += 8;

    if (appliedCoupon) {
        doc.setTextColor(16, 185, 129);
        doc.text(`Discount (${appliedCoupon.discount}%):`, 140, y);
        doc.text(`-INR${discount}`, 180, y, { align: "right" });
        y += 8;
    }

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 101, 52);
    doc.text("Total:", 140, y);
    doc.text(`INR${total}`, 180, y, { align: "right" });

    // ====== FOOTER ======
    // Signature Image (keeps same look, slight upward shift)
    doc.addImage("/img/signature.png", "PNG", 110, 220, 95, 48);

    // Adjusted Text Position
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(33, 37, 41);
    doc.text("Authorized Signature", 157, 258, { align: "center" });

    // Subtext aligned slightly below and lighter
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("Plastify Verification Team", 157, 265, { align: "center" });

    doc.text(
        "Thank you for supporting sustainable living!",
        105,
        280,
        { align: "center" }
    );
    doc.text("www.plastify.com | support@plastify.com", 105, 285, {
        align: "center",
    });

    return doc;
};