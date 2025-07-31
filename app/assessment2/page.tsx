'use client';

import Link from "next/link";
import { useState } from "react";

const staffNames = [
  "น.ส.ประนอม สกุลพิพัฒน์",
  "นางสาวศิรินทรา มิลินทสูต",
  "นางหทัยชนก บุญประเสริฐ",
  "นางสาวโยธกา สำราญวงษ์",
  "นางสาวปาณิสรา ไชยวงษ์",
  "นางสาวขวัญเรือน คงโต",
  "นางสาวสุวรรณา ยะวิเชียร",
  "นางสาวนฤมล เพ็งเภา",
  "นางสาวอมลกานต์ แย้มสบาย",
  "นางสาวนนทิยา ศรีลาดเลา",
  "นางสาวกรกนก ชมฤดี",
  "นางสาวสุรีรัตน์ สมบัติดี",
  "นางสาวสุธิตรา นิลสยาม",
  "นางสาววิภาวี เอมโคกสูง",
  "นางสาวพณิดา เกษสังข์",
];

const positions = [
  "พยาบาลวิชาชีพ",
  "พยาบาลวิชาชีพปฏิบัติการ",
  "พยาบาลวิชาชีพนำนาญการ",
  "พยาบาลวิชาชีพชำนาญการพิเศษ",
];

const section1 = [
  '1.1 Bird’s respirator', '1.2 Bennett 840', '1.3 Defibrillator', '1.4 EKG monitor/Central Monitor', '1.5 EKG Analysis', '1.6 Wrigh’s Respirometer', '1.7 Hot Centrifuge', '1.8 Glucometer', '1.9 Reflexotmeter', '1.10 Pipe line system ได้แก O2/Air compressor/Vacuum', '1.11 Doppler', '1.12 Infusion pump', '1.13 Syring pump', '1.14 Hypo/hyperthermia', '1.15 CRRT', '1.16 U/S',
];
const section2 = [
  '2.1 AF', '2.2 PAC', '2.3 PVC', '2.4 VT/Shot run VT', '2.5 VF', '2.6 PEA', '2.7 Atrial flutter', '2.8 Sinus bradycardia', '2.9 Sinus tachycardia', '2.10 Supra Ventricular Tachycardia(SVT)', '2.11 Asystole', '2.12 AV block ระดับต่าง ๆ', '2.13 Right/Left Bundle branch block', '2.14 STEMI/MI', '2.15 Pacemaker rhythm',
];
const section3 = [
  '3.1 Dopamine', '3.2 Debutamine', '3.3 Levophed', '3.4 NTG', '3.5 Amiodaron', '3.6 KCL', '3.7 Morphine', '3.8 Pethidine', '3.9 Domicum', '3.10 Fentanyl', '3.11 Nicardepine', '3.12 Adenosine', '3.13 Wafarin',
];
const section4 = [
  '4.1 การใช้อุปกรณ์ช่วยในภาวะ Emergency', '4.2 ใช้ Defibrillator',
];
const section5 = [
  '5.1 ABG และสามารถแปลผลได้',
];
const section6 = [
  '6.1 ICD', '6.2 A-line', '6.3 C-line', '6.4 Temporary pacing', '6.5 Double lumen for HD', '6.6 ET tube', '6.7 Intubation ET tube', '6.8 Vacuum dressing', '6.9 เตรียม Set เจาะหลัง', '6.10 เตรียม Set เย็บแผล', '6.11 วัด ABD pressure', '6.12 วัด CVP',
];
const section7 = [
  '7.1 Pneumonia', '7.2 TB', '7.3 Pleural effusion', '7.4 MASS',
];
const section8 = [
  '8.1 Respiratory failure', '8.2 Hemorrhagic stroke/Ischemic stroke', '8.3 Cerebral aneurysm', '8.4 Brain tumor', '8.5 Shock', '8.6 Sepsis', '8.7 STEMI', '8.8 PE', '8.9 DVT', '8.10 Palliative care', '8.11 Resuscitate Organ(Organ donate)', '8.12 อื่นๆ', '8.13 PPH', '8.14 Vascolar Deasease', '8.15 AAA', '8.16 Acute ABD', '8.17 CA Colorectal', '8.18 CA/mass (lung)', '8.19 Cardiac Temponade', '8.20 Severe Trauma',
];

const allSections = {
  section1, section2, section3, section4, section5, section6, section7, section8
};


export default function Assessment2() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRadio = (rowKey: string, value: string) => {
    setAnswers(a => ({ ...a, [rowKey]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      staffName: formData.get("staffName"),
      position: formData.get("position"),
      assessmentDate: formData.get("assessmentDate"),
      evaluator: formData.get("evaluator"),
      answers,
    };

    try {
      const response = await fetch('/api/save-assessment-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save assessment');
      }

      const result = await response.json();
      alert(`บันทึกข้อมูลสำเร็จ! (ID: ${result.documentId})`);
      event.target.reset();
      setAnswers({});
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: 40 }}>
      <div className="card fade-in" style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className="modern-header" style={{ marginBottom: 30 }}>
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
            fontWeight: 800, 
            fontSize: 28, 
            margin: 0,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            แบบประเมินทักษะการปฏิบัติงานในห้องผู้ป่วยหนักศัลยกรรม<br />
            โรงพยาบาลสมุทรปราการ
          </h1>
        </div>
        
        <div className="modern-section" style={{ marginBottom: 30 }}>
          <div style={{ marginBottom: 16, fontWeight: 600, color: '#333', fontSize: 18 }}>
            ระดับความคิดเห็นต่อการปฏิบัติกิจกรรมการพยาบาล แบ่งออกเป็น 3 ระดับดังนี้
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '12px 20px', textAlign: 'left' }}>
            <span style={{ fontWeight: 600, color: '#667eea', fontSize: 16 }}>น้อย</span>
            <span style={{ fontSize: 16 }}>ทำได้</span>
            <span style={{ fontWeight: 600, color: '#667eea', fontSize: 16 }}>ปานกลาง</span>
            <span style={{ fontSize: 16 }}>ทำได้ดี มีข้อผิดพลาดน้อย</span>
            <span style={{ fontWeight: 600, color: '#667eea', fontSize: 16 }}>มาก</span>
            <span style={{ fontSize: 16 }}>สามารถทำได้ดีและสามารถนำไปถ่ายทอดได้</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modern-section" style={{ marginBottom: 30 }}>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: "center" }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
                <label style={{ fontWeight: 600, color: '#333' }}>ชื่อ</label>
                <select name="staffName" className="modern-select" style={{ minWidth: 200 }}>
                  <option value="">เลือกชื่อ</option>
                  {staffNames.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
                <label style={{ fontWeight: 600, color: '#333' }}>ตำแหน่ง</label>
                <select name="position" className="modern-select" style={{ minWidth: 200 }}>
                  <option value="">เลือกตำแหน่ง</option>
                  {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
                <label style={{ fontWeight: 600, color: '#333' }}>วันที่ประเมิน</label>
                <input name="assessmentDate" type="date" className="modern-input" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
                <label style={{ fontWeight: 600, color: '#333' }}>ผู้ประเมิน</label>
                <input name="evaluator" type="text" placeholder="ชื่อผู้ประเมิน" className="modern-input" style={{ minWidth: 180 }} />
              </div>
              
              <Link href="/" className="modern-link" style={{ marginTop: 25 }}>
                &larr; กลับหน้าแรก
              </Link>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table className="modern-table" style={{ width: '100%', fontSize: 15 }}>
              <thead>
                <tr>
                  <th style={{ minWidth: 320, textAlign: 'left' }}>รายการที่ประเมิน</th>
                  <th style={{ minWidth: 60 }}>ไม่เคย</th>
                  <th style={{ minWidth: 60 }}>น้อย</th>
                  <th style={{ minWidth: 60 }}>ปานกลาง</th>
                  <th style={{ minWidth: 60 }}>มาก</th>
                </tr>
              </thead>
              <tbody>
                {/* All sections */}
                <tr>
                  <td colSpan={5} style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                    fontWeight: 600,
                    padding: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#333'
                  }}>
                    1. สามารถใช้เครื่องมืออุปกรณ์
                  </td>
                </tr>
                {allSections.section1.map((item, idx) => {
                  const rowKey = `s1_${idx}`;
                  return (
                    <tr key={rowKey}>
                      <td style={{ padding: 12, fontSize: 14 }}>{item}</td>
                      {["never", "low", "medium", "high"].map(val => (
                        <td key={val} style={{ textAlign: 'center' }}>
                          <input 
                            type="radio" 
                            name={rowKey} 
                            value={val} 
                            checked={answers[rowKey] === val} 
                            onChange={() => handleRadio(rowKey, val)}
                            style={{ transform: 'scale(1.3)' }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                    fontWeight: 600,
                    padding: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#333'
                  }}>
                    2. การอ่าน EKG
                  </td>
                </tr>
                {allSections.section2.map((item, idx) => {
                  const rowKey = `s2_${idx}`;
                  return (
                    <tr key={rowKey}>
                      <td style={{ padding: 12, fontSize: 14 }}>{item}</td>
                      {["never", "low", "medium", "high"].map(val => (
                        <td key={val} style={{ textAlign: 'center' }}>
                          <input 
                            type="radio" 
                            name={rowKey} 
                            value={val} 
                            checked={answers[rowKey] === val} 
                            onChange={() => handleRadio(rowKey, val)}
                            style={{ transform: 'scale(1.3)' }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                    fontWeight: 600,
                    padding: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#333'
                  }}>
                    3. การใช้ยา
                  </td>
                </tr>
                {allSections.section3.map((item, idx) => {
                  const rowKey = `s3_${idx}`;
                  return (
                    <tr key={rowKey}>
                      <td style={{ padding: 12, fontSize: 14 }}>{item}</td>
                      {["never", "low", "medium", "high"].map(val => (
                        <td key={val} style={{ textAlign: 'center' }}>
                          <input 
                            type="radio" 
                            name={rowKey} 
                            value={val} 
                            checked={answers[rowKey] === val} 
                            onChange={() => handleRadio(rowKey, val)}
                            style={{ transform: 'scale(1.3)' }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                    fontWeight: 600,
                    padding: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#333'
                  }}>
                    4. การใช้เครื่องมือในภาวะ Emergency
                  </td>
                </tr>
                {allSections.section4.map((item, idx) => {
                  const rowKey = `s4_${idx}`;
                  return (
                    <tr key={rowKey}>
                      <td style={{ padding: 12, fontSize: 14 }}>{item}</td>
                      {["never", "low", "medium", "high"].map(val => (
                        <td key={val} style={{ textAlign: 'center' }}>
                          <input 
                            type="radio" 
                            name={rowKey} 
                            value={val} 
                            checked={answers[rowKey] === val} 
                            onChange={() => handleRadio(rowKey, val)}
                            style={{ transform: 'scale(1.3)' }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                    fontWeight: 600,
                    padding: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#333'
                  }}>
                    5. การแปลผล ABG
                  </td>
                </tr>
                {allSections.section5.map((item, idx) => {
                  const rowKey = `s5_${idx}`;
                  return (
                    <tr key={rowKey}>
                      <td style={{ padding: 12, fontSize: 14 }}>{item}</td>
                      {["never", "low", "medium", "high"].map(val => (
                        <td key={val} style={{ textAlign: 'center' }}>
                          <input 
                            type="radio" 
                            name={rowKey} 
                            value={val} 
                            checked={answers[rowKey] === val} 
                            onChange={() => handleRadio(rowKey, val)}
                            style={{ transform: 'scale(1.3)' }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                    fontWeight: 600,
                    padding: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#333'
                  }}>
                    6. การใช้เครื่องมือเฉพาะทาง
                  </td>
                </tr>
                {allSections.section6.map((item, idx) => {
                  const rowKey = `s6_${idx}`;
                  return (
                    <tr key={rowKey}>
                      <td style={{ padding: 12, fontSize: 14 }}>{item}</td>
                      {["never", "low", "medium", "high"].map(val => (
                        <td key={val} style={{ textAlign: 'center' }}>
                          <input 
                            type="radio" 
                            name={rowKey} 
                            value={val} 
                            checked={answers[rowKey] === val} 
                            onChange={() => handleRadio(rowKey, val)}
                            style={{ transform: 'scale(1.3)' }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                    fontWeight: 600,
                    padding: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#333'
                  }}>
                    7. การดูแลผู้ป่วยโรคระบบหายใจ
                  </td>
                </tr>
                {allSections.section7.map((item, idx) => {
                  const rowKey = `s7_${idx}`;
                  return (
                    <tr key={rowKey}>
                      <td style={{ padding: 12, fontSize: 14 }}>{item}</td>
                      {["never", "low", "medium", "high"].map(val => (
                        <td key={val} style={{ textAlign: 'center' }}>
                          <input 
                            type="radio" 
                            name={rowKey} 
                            value={val} 
                            checked={answers[rowKey] === val} 
                            onChange={() => handleRadio(rowKey, val)}
                            style={{ transform: 'scale(1.3)' }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={5} style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                    fontWeight: 600,
                    padding: 16,
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#333'
                  }}>
                    8. การดูแลผู้ป่วยโรคต่างๆ
                  </td>
                </tr>
                {allSections.section8.map((item, idx) => {
                  const rowKey = `s8_${idx}`;
                  return (
                    <tr key={rowKey}>
                      <td style={{ padding: 12, fontSize: 14 }}>{item}</td>
                      {["never", "low", "medium", "high"].map(val => (
                        <td key={val} style={{ textAlign: 'center' }}>
                          <input 
                            type="radio" 
                            name={rowKey} 
                            value={val} 
                            checked={answers[rowKey] === val} 
                            onChange={() => handleRadio(rowKey, val)}
                            style={{ transform: 'scale(1.3)' }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button 
              type="submit" 
              className="btn-success"
              disabled={isSubmitting}
              style={{
                fontSize: 18,
                padding: '16px 32px',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 