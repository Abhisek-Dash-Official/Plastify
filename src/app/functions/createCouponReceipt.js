import { jsPDF } from "jspdf";

export default async function createReceipt(form, couponCode, discount, validity) {
    const doc = new jsPDF();

    // Background
    doc.setFillColor(240, 253, 244);
    doc.rect(0, 0, 210, 297, "F");

    // Decorative circles
    doc.setFillColor(220, 252, 231);
    doc.circle(15, 15, 8, "F");
    doc.circle(195, 15, 8, "F");
    doc.circle(15, 282, 8, "F");
    doc.circle(195, 282, 8, "F");

    // Header bar
    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, 210, 35, "F");
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, 210, 30, "F");

    // Add Brand Logo
    try {
        const img = await loadImage("/img/brandLogo.png");
        // x, y, width, height
        doc.addImage(img, "PNG", 5, 7, 45, 20);
    } catch (err) {
        console.error("Logo image not found:", err);
    }

    // Title text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("CONTRIBUTION CERTIFICATE", 115, 15, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Plastify Eco-Friendly Initiative", 105, 23, { align: "center" });

    // Divider line
    doc.setDrawColor(22, 163, 74);
    doc.line(15, 40, 195, 40);

    // Certificate of Recognition Box
    let y = 55;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(15, y, 180, 25, 3, 3, "F");
    doc.setDrawColor(22, 163, 74);
    doc.roundedRect(15, y, 180, 25, 3, 3, "S");

    doc.setTextColor(22, 163, 74);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Certificate of Recognition", 105, y + 10, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text("This certifies that the following contribution has been made", 105, y + 18, { align: "center" });

    // Contributor Details
    y = 90;
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(15, y, 180, 55, 3, 3, "F");

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    y += 10;
    doc.text("Contributor Details", 20, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    y += 10;
    doc.setTextColor(60, 60, 60);
    doc.text(`Name:`, 25, y);
    doc.setFont("helvetica", "bold");
    doc.text(`${form.name}`, 55, y);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Email:`, 25, y);
    doc.setFont("helvetica", "bold");
    doc.text(`${form.email}`, 55, y);

    y += 8;
    if (form.wasteType) {
        doc.setFont("helvetica", "normal");
        doc.text(`Waste Donated:`, 25, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(22, 163, 74);
        doc.text(`${form.wasteType} (${form.quantity} kg)`, 55, y);
    }

    y += 8;
    if (form.amount) {
        doc.setTextColor(60, 60, 60);
        doc.setFont("helvetica", "normal");
        doc.text(`Contribution:`, 25, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(22, 163, 74);
        doc.text(`Rs ${form.amount}`, 55, y);
    }

    // Reward Section
    y = 160;
    doc.setFillColor(22, 163, 74);
    doc.roundedRect(15, y, 180, 50, 3, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    y += 12;
    doc.text("Your Reward", 105, y, { align: "center" });

    // Coupon code box
    y += 10;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(40, y, 130, 12, 2, 2, "F");
    doc.setTextColor(22, 163, 74);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`${couponCode}`, 105, y + 8, { align: "center" });

    y += 18;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(`${discount}% OFF on your next purchase`, 105, y, { align: "center" });

    // Environmental Impact
    y = 225;
    doc.setFillColor(254, 249, 195);
    doc.roundedRect(15, y, 180, 25, 3, 3, "F");

    doc.setTextColor(146, 64, 14);
    doc.setFontSize(11);
    y += 10;
    doc.text("Environmental Impact", 105, y, { align: "center" });
    doc.setFontSize(10);
    y += 7;
    doc.text("Thank you for helping us make the planet greener!", 105, y, { align: "center" });

    // Dates
    y = 260;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    const date = new Date().toDateString();
    doc.text(`Issue Date: ${date}`, 105, y, { align: "center" });
    doc.text(`Expiry Date: ${validity}`, 105, y + 5, { align: "center" });

    // Footer
    y = 280;
    doc.setDrawColor(22, 163, 74);
    doc.line(15, y, 195, y);

    y += 6;
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("© Plastify 2025 - Making a Difference, One Contribution at a Time", 105, y, { align: "center" });

    // Save the PDF
    doc.save(`Plastify_Certificate_${form.name.replace(/\s+/g, "_")}.pdf`);
}

/** Helper function to load image as base64 */
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}