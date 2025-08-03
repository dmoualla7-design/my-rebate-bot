import puppeteer from 'puppeteer';
import fs from 'fs';

async function runBot() {
  console.log("🚀 بدء تشغيل البوت...");

  const browser = await puppeteer.launch({ headless: false }); // headless: false = بيفتح المتصفح قدامك
  const page = await browser.newPage();

  // الدخول للموقع
  await page.goto("https://www.myrebatenow.com", { waitUntil: 'networkidle2' });

  // ننتظر شوي لتكون الصفحة جاهزة
  await page.waitForTimeout(2000);

  try {
    // إدخال تاريخ الميلاد
    await page.type('#dob-month', '10');  // الشهر
    await page.type('#dob-day', '09');    // اليوم
    await page.type('#dob-year', '1990'); // السنة

    await page.click('button[type=submit]');
    console.log("✅ تم إدخال تاريخ الميلاد");

    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // تجربة رقم عرض واحد كمثال (رح نطوره بعدين ليجرب أرقام كتيرة)
    const offerNumber = 0;
    await page.type('#offer-number', offerNumber.toString());
    await page.click('button[type=submit]');
    console.log(🔍 جربنا الرقم ${offerNumber});

    await page.waitForTimeout(2000);

    // حفظ لقطة شاشة للنتيجة
    await page.screenshot({ path: offer_${offerNumber}.png });
    console.log("📸 تم حفظ لقطة شاشة");

  } catch (error) {
    console.log("❌ صار خطأ أثناء التشغيل:", error.message);
  }

  await browser.close();
  console.log("✅ خلص البوت وسكّر المتصفح");
}

runBot();