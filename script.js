// اسحب العناصر من الـ HTML
const generateBtn = document.getElementById('generateBtn');
const outputDiv = document.getElementById('output');
const userPrompt = document.getElementById('userPrompt');

// ضع مفتاحك الجديد هنا (تأكد أنك ألغيت القديم!)
const API_KEY = "ضع_مفتاحك_الجديد_هنا";

generateBtn.addEventListener('click', async () => {
    const prompt = userPrompt.value;

    if (!prompt) {
        alert("يا بطل، اكتب وش تبي الـ AI يسوي أولاً!");
        return;
    }

    // تجهيز الواجهة للتحميل
    outputDiv.style.display = 'block';
    outputDiv.innerText = "⏳ جاري استدعاء خوارزميات CCSV والذكاء الاصطناعي... انتظر العظمة.";

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4", // أو gpt-3.5-turbo إذا أردت توفير الرصيد
                messages: [{
                    role: "system",
                    content: "أنت مهندس خبير في تطوير محركات الألعاب (Game Engines) وتقنيات DLSS. مهمتك كتابة أكواد أندرويد عملاقة واحترافية لزيادة الأداء."
                }, {
                    role: "user",
                    content: `صمم كود برمجياً لخاصية CCSV للأندرويد: ${prompt}`
                }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            outputDiv.innerText = data.choices[0].message.content;
        } else {
            outputDiv.innerText = "⚠️ خطأ في الاستجابة، تأكد من رصيد المفتاح (API Key).";
        }

    } catch (error) {
        outputDiv.innerText = "❌ حدث خطأ في الاتصال بالسيرفر: " + error.message;
    }
});
