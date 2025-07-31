'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
