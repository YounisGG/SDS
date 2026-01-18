import os
import subprocess
import time
import requests # يحتاج تثبيت عن طريق pip install requests

# إعدادات الربط مع موقعك
API_URL = "https://younisgg.github.io/SDS/" # رابط موقعك
SERVER_JAR = "server.jar" # اسم ملف ماين كرافت

def start_minecraft():
    print(" [SDS] جاري تشغيل سيرفر ماين كرافت...")
    # أمر تشغيل السيرفر مع تخصيص 2 جيجا رام
    cmd = f"java -Xmx2048M -Xms2048M -jar {SERVER_JAR} nogui"
    return subprocess.Popen(cmd, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

def main():
    print("========================================")
    print("   SDS CORE ENGINE - نظام الربط الذكي")
    print("========================================")
    
    if not os.path.exists(SERVER_JAR):
        print(" [!] خطأ: ملف server.jar غير موجود في المجلد!")
        return

    process = start_minecraft()
    
    while True:
        # هنا العقل يفكر: يتصل بموقعك ويشوف إذا في أوامر جديدة (مثل op أو stop)
        # ملاحظة: الربط الحقيقي يتطلب Backend (مثل Node.js) لكننا نستخدم المحاكاة حالياً
        line = process.stdout.readline()
        if line:
            print(f" [Console] {line.strip()}")
            
        time.sleep(0.1)

if __name__ == "__main__":
    main()



