import os
import urllib.request

def setup_server():
    print("--- [ PC-to-Server Pro Core ] ---")
    folder = "Minecraft_Server"
    
    if not os.path.exists(folder):
        os.makedirs(folder)
        print(f"[+] تم إنشاء مجلد السيرفر بنجاح.")

    # رابط تحميل السيرفر الرسمي
    url = "https://piston-data.mojang.com/v1/objects/8410fd098631e3b4daac81903ed746813296ac96/server.jar"
    path = os.path.join(folder, "server.jar")

    if not os.path.exists(path):
        print("[!] جاري تحميل ملفات السيرفر من موجانج... قد يستغرق وقت")
        urllib.request.urlretrieve(url, path)
        
    # الموافقة على الاتفاقية
    with open(os.path.join(folder, "eula.txt"), "w") as f:
        f.write("eula=true")
        
    print("[✔] السيرفر جاهز! يمكنك الآن تشغيله عبر لوحة التحكم.")

if __name__ == "__main__":
    setup_server()
