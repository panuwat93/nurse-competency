'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

export default function Login() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // ตรวจสอบรหัส PIN (รองรับรหัสที่เปลี่ยนได้)
    const customPin = localStorage.getItem('customPin');
    const validPin = customPin || '123456';
    
    if (pin === validPin) {
      // บันทึกสถานะการ login ใน cookies
      document.cookie = `isAuthenticated=true; path=/; max-age=${24 * 60 * 60}`; // 24 ชั่วโมง
      document.cookie = `loginTime=${new Date().toISOString()}; path=/; max-age=${24 * 60 * 60}`;
      
      // ไปยังหน้าหลัก
      router.push('/');
    } else {
      setError('รหัส PIN ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      setPin('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className="card fade-in" style={{ 
        maxWidth: 400, 
        margin: "100px auto",
        padding: "40px 30px"
      }}>
        <div className="modern-header" style={{ marginBottom: 30, textAlign: 'center' }}>
          <div style={{ marginBottom: 20 }}>
            <img 
              src="/logo.png" 
              alt="Logo" 
              style={{ 
                width: '4cm', 
                height: '4cm', 
                objectFit: 'contain',
                borderRadius: '10px'
              }} 
            />
          </div>
                     <h1 style={{ 
             fontWeight: 800, 
             fontSize: 24, 
             margin: 0,
             textShadow: '0 2px 4px rgba(0,0,0,0.1)',
             color: '#333'
           }}>
             แบบประเมิน ห้องผู้ป่วยหนักศัลยกรรม 1
           </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontWeight: 600, 
              color: '#333',
              fontSize: 16
            }}>
              รหัส PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="กรุณาใส่รหัส PIN"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
              }}
              maxLength={6}
              required
            />
          </div>

          {error && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: 20,
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: isLoading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {isLoading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        
      </div>
    </div>
  );
} 