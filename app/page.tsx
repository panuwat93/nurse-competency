'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    if (window.confirm('ต้องการออกจากระบบหรือไม่?')) {
      // ลบ cookies
      document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'loginTime=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.push('/login');
    }
  };

  const handleChangePin = () => {
    const newPin = prompt('กรุณาใส่รหัส PIN ใหม่ (6 หลัก):');
    if (newPin && newPin.length === 6 && /^\d+$/.test(newPin)) {
      // บันทึกรหัส PIN ใหม่ใน localStorage (สำหรับการใช้งานจริงควรใช้ backend)
      localStorage.setItem('customPin', newPin);
      alert('เปลี่ยนรหัส PIN สำเร็จ!');
    } else if (newPin !== null) {
      alert('รหัส PIN ต้องเป็นตัวเลข 6 หลัก');
    }
  };
  return (
    <div style={{ minHeight: '100vh', padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* ปุ่ม Logout และ Change PIN */}
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        display: 'flex',
        gap: 10
      }}>
        <button
          onClick={handleChangePin}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(76, 175, 80, 0.3)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(76, 175, 80, 0.3)';
          }}
        >
          เปลี่ยนรหัส
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(255, 107, 107, 0.3)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(255, 107, 107, 0.3)';
          }}
        >
          ออกจากระบบ
        </button>
      </div>
      <div className="card fade-in" style={{
        maxWidth: 700,
        padding: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
      }}>
        <div className="modern-header" style={{ width: '100%', marginBottom: 0 }}>
          <div style={{ marginBottom: 20 }}>
            <img 
              src="/logo.png" 
              alt="Logo" 
              style={{ 
                width: '5cm', 
                height: '5cm', 
                objectFit: 'contain',
                borderRadius: '10px'
              }} 
            />
          </div>
          <h1 style={{
            fontSize: 36,
            fontWeight: 800,
            margin: 0,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            แบบประเมิน ห้องผู้ป่วยหนักศัลยกรรม 1
          </h1>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
          <Link href="/assessment1" className="modern-section" style={{
            display: 'block',
            width: '100%',
            padding: '30px 25px',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ marginBottom: 15, fontSize: 32 }}>🏥</div>
            <div style={{ marginBottom: 8, color: '#667eea', fontWeight: 700 }}>
              ประเมินสมรรถนะพยาบาลวิชาชีพ
            </div>
            <div style={{ fontSize: 16, fontWeight: 400, color: '#666' }}>
              ห้องผู้ป่วยหนักศัลยกรรม 1 โรงพยาบาลสมุทรปราการ
            </div>
          </Link>
          
          <Link href="/assessment2" className="modern-section" style={{
            display: 'block',
            width: '100%',
            padding: '30px 25px',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ marginBottom: 15, fontSize: 32 }}>⚡</div>
            <div style={{ marginBottom: 8, color: '#667eea', fontWeight: 700 }}>
              แบบประเมินทักษะการปฏิบัติงาน
            </div>
            <div style={{ fontSize: 16, fontWeight: 400, color: '#666' }}>
              ห้องผู้ป่วยหนักศัลยกรรม 1 โรงพยาบาลสมุทรปราการ
            </div>
          </Link>
          
          <Link href="/summary" className="modern-section" style={{
            display: 'block',
            width: '100%',
            padding: '30px 25px',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ marginBottom: 15, fontSize: 32 }}>📊</div>
            <div style={{ marginBottom: 8, color: '#667eea', fontWeight: 700 }}>
              สรุปการประเมินรายบุคคล
            </div>
            <div style={{ fontSize: 16, fontWeight: 400, color: '#666' }}>
              ดูผลการประเมินและสถิติ
            </div>
          </Link>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: 20,
          color: '#666',
          fontSize: 14,
          fontStyle: 'italic'
        }}>
          ระบบประเมินสมรรถนะพยาบาลวิชาชีพ
        </div>
      </div>
    </div>
  );
}
