'use client';

import styles from "../page.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore";

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

const allTopics = [
  { type: 'item', label: "กลุ่มโรคสำคัญของหน่วยงาน" },
  { type: 'item', label: "Criterier การรับผู้ป่วย" },
  { type: 'item', label: "สิทธิการรักษาและค่ารักษาพยาบาล" },
  { type: 'item', label: "ประเภทผู้ป่วย" },
  { type: 'item', label: "ข้อร้องเรียน" },
  { type: 'item', label: "การลงนามในหนังสือแสดงเจตนา ยินยอมขอรับการตรวจรักษา" },
  { type: 'item', label: "การแต่งกาย" },
  { type: 'item', label: "สิ่งแวดล้อมในการปฏิบัติงาน" },
  { type: 'item', label: "พฤติกรรมบริการ" },
  { type: 'item', label: "การประสานงานระหว่างหน่วยงาน" },
  { type: 'item', label: "Risk management (RM)" },
  { type: 'header', label: "กลุ่มโรคที่พบบ่อย" },
  { type: 'header', label: "ระบบหัวใจ (Cardiac system)" },
  { type: 'item', label: "โรคกล้ามเนื้อหัวใจขาดเลือดที่มีภาวะแทรกซ้อน" },
  { type: 'item', label: "ภาวะ Cardiogenic shock" },
  { type: 'item', label: "ภาวะหัวใจเต้นผิดจังหวะ" },
  { type: 'item', label: "ภาวะหัวใจล้มเหลวเฉียบพลัน และมีภาวะหายใจล้มเหลว" },
  { type: 'item', label: "Hypertensive emergencies" },
  { type: 'item', label: "Unstable angina" },
  { type: 'item', label: "S/P cardiac arrest" },
  { type: 'item', label: "Cardiac tamponade or constriction" },
  { type: 'item', label: "Complete heart block" },
  { type: 'header', label: "ระบบหายใจ (Pulmonary system)" },
  { type: 'item', label: "Acute respiratory failure" },
  { type: 'item', label: "Pulmonary emboli" },
  { type: 'item', label: "Massive hemoptysis" },
  { type: 'header', label: "การได้รับยาเกินขนาด (Drug ingestion and Drug overdose) กลุ่มอาการระบบทางเดินอาหาร (Gastrointestinal disorders)" },
  { type: 'header', label: "ระบบต่อมไร้ท่อ (Endocrine)" },
  { type: 'item', label: "Diabetic ketoacidosis" },
  { type: 'item', label: "Thyroid storm" },
  { type: 'item', label: "adrenal crisis" },
  { type: 'header', label: "การบาดเจ็บจากแผลไฟไหม้ (Burn) การกลืนกรดหรือด่าง (Corrosive ingestion) ระบบประสาท (Neurologic disorders)" },
  { type: 'item', label: "Acute stroke" },
  { type: 'item', label: "Coma: metabolic, toxic, or anoxic" },
  { type: 'item', label: "Intracranial hemorrhage" },
  { type: 'item', label: "Acute subarachnoid hemorrhage" },
  { type: 'item', label: "Meningitis" },
  { type: 'item', label: "Central nervous system หรือ neuromuscular disorders" },
  { type: 'item', label: "Status epilepticus" },
  { type: 'item', label: "ผู้ป่วย Brain dead หรือมีโอกาสเกิด brain dead ที่บริจาคอวัยวะ" },
  { type: 'item', label: "ผู้ป่วยที่มีภาวะ Cerebral vasospasm" },
  { type: 'item', label: "ผู้ป่วย Severe head injury (GCS3-8)" },
  { type: 'header', label: "การดูแลสิ่งแวดล้อมในหอผู้ป่วย" },
  { type: 'header', label: "การทิ้งขยะ" },
  { type: 'item', label: "ขยะติดเชื้อ" },
  { type: 'item', label: "ขยะทั่วไป" },
  { type: 'item', label: "ขยะรีไซเคิล" },
  { type: 'item', label: "ขยะอันตราย" },
  { type: 'item', label: "การแยกผ้า" },
  { type: 'item', label: "ของ Sterile หมดอายุ/น้ำยาหมดอายุ" },
  { type: 'header', label: "เครื่องมือแพทย์" },
  { type: 'item', label: "Defibrillation" },
  { type: 'item', label: "infusion pump" },
  { type: 'item', label: "SnEmerency" },
  { type: 'item', label: "Doppler" },
  { type: 'item', label: "EKG" },
  { type: 'item', label: "Hypothermia" },
  { type: 'item', label: "เครื่อง Warm blood" },
  { type: 'item', label: "Monitor EKG" },
  { type: 'item', label: "รถ NV" },
  { type: 'item', label: "รถทำแผล" },
  { type: 'item', label: "Ventilator" },
  { type: 'item', label: "Ultrasound" },
  { type: 'item', label: "เครื่องปั่น Hematocrite" },
  { type: 'header', label: "การเตรียมของรับผู้ป่วย" },
  { type: 'item', label: "ผู้ป่วยรับย้าย" },
  { type: 'item', label: "รับหลังผ่าตัด" },
  { type: 'item', label: "รับใหม่ ER" },
  { type: 'item', label: "เตรียมรับผู้ป่วยติดเชื้อดื้อยา" },
  { type: 'item', label: "เตรียมรับผู้ป่วยติดเชื้อ Hepatitis" },
  { type: 'item', label: "เตรียมรับผู้ป่วยติดเชื้อ HIV" },
  { type: 'item', label: "เตรียมรับผู้ป่วยติดเชื้อ Burn" },
  { type: 'item', label: "เตรียมรับผู้ป่วยติดเชื้ออื่นๆ" },
  { type: 'item', label: "การจำหน่ายผู้ป่วย" },
  { type: 'header', label: "มาตรฐานการดูแลผู้ป่วย เหตุผลและความจําเป็น วิธีการผลข้างเคียง ความเสี่ยง" },
  { type: 'item', label: "Pressure sore" },
  { type: 'item', label: "Infection Control" },
  { type: 'item', label: "การให้ IVFluid" },
  { type: 'header', label: "การให้เลือด" },
  { type: 'item', label: "PRC" },
  { type: 'item', label: "LPRC" },
  { type: 'item', label: "Cryoprecipitate" },
  { type: 'item', label: "Single donor Platelet" },
  { type: 'item', label: "LPPC" },
  { type: 'item', label: "FFP" },
  { type: 'item', label: "ดูแล Central line" },
  { type: 'item', label: "Patient identify" },
  { type: 'item', label: "Falling" },
  { type: 'item', label: "MS ประเมินแพ้ยา" },
  { type: 'item', label: "Suction" },
  { type: 'header', label: "การพ่นยา" },
  { type: 'item', label: "พ่นยาต่อเครื่องช่วยหายใจ" },
  { type: 'item', label: "พ่นยาต่อ Mask" },
  { type: 'item', label: "Heat Neubulizer" },
  { type: 'item', label: "ดูแลให้สารอาหารแก่ผู้ป่วย" },
  { type: 'item', label: "Set drip อาหาร" },
  { type: 'item', label: "เตรียม Set Central line" },
  { type: 'item', label: "เตรียม Set Renal catherter" },
  { type: 'item', label: "เตรียม Set ICD" },
  { type: 'item', label: "เตรียมขวดและสาย ICD" },
  { type: 'item', label: "ต่อสาย suction" },
  { type: 'item', label: "เตรียม Set ทําแผล" },
  { type: 'item', label: "เตรียม Set Flush" },
  { type: 'item', label: "เตรียมอุปกรณ์ A-line" },
  { type: 'item', label: "Pipe line" },
  { type: 'item', label: "io50N Set Lumbar puncher" },
  { type: 'item', label: "เตรียมใส่ Foley's catheter" },
  { type: 'item', label: "Intermittent catheterization" },
  { type: 'item', label: "Indwelling catheterization" },
  { type: 'item', label: "เตรียม NG" },
  { type: 'item', label: "เดรียมอุปกรณ์ใส่ท่อช่วยหายใจ" },
  { type: 'header', label: "การให้ออกซิเจนแบบต่างๆ" },
  { type: 'item', label: "High flow" },
  { type: 'item', label: "O2 cannular" },
  { type: 'item', label: "02 mask c bag" },
  { type: 'item', label: "CPAP" },
  { type: 'item', label: "T-piece/L-piece" },
  { type: 'item', label: "02 Collar mask" },
  { type: 'item', label: "เปลี่ยนท่อเจาะคอ" },
  { type: 'header', label: "เก็บ Specimen" },
  { type: 'item', label: "การเจาะเลือด" },
  { type: 'item', label: "เก็บเพื่อส่งเพาะเชื้อ" },
  { type: 'item', label: "การเก็บCSF และ Body Fluid ต่างๆ" },
  { type: 'item', label: "Rectal swab culture" },
  { type: 'item', label: "Pus swab culture" },
  { type: 'item', label: "Urine culture" },
  { type: 'item', label: "HEMOCULTURE" },
  { type: 'item', label: "Pathology/Cytology" },
  { type: 'item', label: "แอลกอฮอล์ในเลือด" },
  { type: 'item', label: "Fern Test" },
  { type: 'item', label: "การเก็บปัสสาวะ" },
  { type: 'item', label: "การเก็บอุจจาระ" },
  { type: 'item', label: "การเก็บเสมหะ" },
];

export default function Assessment1() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [evaluationData, setEvaluationData] = useState({}); // Stores all fetched data for the user
  const [isResetting, setIsResetting] = useState(false);
  const [formKey, setFormKey] = useState(Date.now()); // Add this line

  async function fetchEvaluations(staffName: string) {
    const q = query(collection(db, "assessments-competency"), where("staffName", "==", staffName));
    const querySnapshot = await getDocs(q);
    const allData: Record<string, any> = {};
    querySnapshot.forEach(doc => {
      const topics = doc.data().topics || {};
      Object.entries(topics).forEach(([label, topicData]) => {
        if (topicData && typeof topicData === 'object' && Object.values(topicData as Record<string, any>).some(val => val)) {
          allData[label] = { ...(allData[label] || {}), ...(topicData as Record<string, any>) };
        }
      });
    });
    setEvaluationData(allData);
    setFormKey(Date.now()); // Add this line to force re-render
  }

  // Fetch all evaluations for the selected staff member
  useEffect(() => {
    if (!selectedStaff) {
      setEvaluationData({});
      setFormKey(Date.now()); // Add this line
      return;
    }
    fetchEvaluations(selectedStaff);
  }, [selectedStaff]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const newData = {
      staffName: selectedStaff,
      position: formData.get("position"),
      evaluator: formData.get("evaluator"),
      topics: {},
    };

    let itemCount = 0;
    let itemsEvaluatedCount = 0;
    allTopics.forEach((topic) => {
      if (topic.type === 'item') {
        itemCount++;
        const topicData = {
          date: formData.get(`date_${itemCount}`),
          experience: formData.get(`exp_${itemCount}`),
          evaluation1: formData.get(`eval1_${itemCount}`),
          evaluation2: formData.get(`eval2_${itemCount}`),
          evaluation3: formData.get(`eval3_${itemCount}`),
        };
        // Only include topics that have been evaluated in this session
        if (Object.values(topicData).some(val => val)) {
          newData.topics[topic.label] = topicData;
          itemsEvaluatedCount++;
        }
      }
    });

    if (itemsEvaluatedCount === 0) {
      alert("กรุณากรอกข้อมูลประเมินอย่างน้อย 1 ข้อ");
      setIsSubmitting(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "assessments-competency"), {
        ...newData,
        createdAt: serverTimestamp(),
      });
      alert(`บันทึกข้อมูลสำเร็จ! (ID: ${docRef.id})`);
      fetchEvaluations(selectedStaff); // Refresh data after saving
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    if (!selectedStaff) return;
    if (!window.confirm(`ต้องการรีเซ็ตข้อมูลการประเมินทั้งหมดของ ${selectedStaff} หรือไม่?`)) return;
    setIsResetting(true);
    try {
      const q = query(collection(db, "assessments-competency"), where("staffName", "==", selectedStaff));
      const querySnapshot = await getDocs(q);
      for (const doc of querySnapshot.docs) {
        await deleteDoc(doc.ref);
      }
      setEvaluationData({});
      setFormKey(Date.now()); // Add this line
      alert("รีเซ็ตข้อมูลสำเร็จ!");
    } catch (error) {
      console.error("Error resetting data:", error);
      alert("เกิดข้อผิดพลาดในการรีเซ็ตข้อมูล");
    } finally {
      setIsResetting(false);
    }
  };
  
  return (
    <div className={styles.page}>
      <div className="card fade-in" style={{ maxWidth: 1200, margin: "0 auto" }}>
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
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
            ประเมินสมรรถนะพยาบาลวิชาชีพ<br />
            ห้องผู้ป่วยหนักศัลยกรรม 1 โรงพยาบาลสมุทรปราการ
          </h2>
        </div>
        
        <form key={formKey} onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div className="modern-section" style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
                <label style={{ fontWeight: 600, color: '#333' }}>ชื่อ-นามสกุลเจ้าหน้าที่</label>
                <select 
                  name="staffName" 
                  className="modern-select"
                  style={{ width: 220 }}
                  value={selectedStaff} 
                  onChange={e => setSelectedStaff(e.target.value)}
                >
                  <option value="">เลือกชื่อ-นามสกุล</option>
                  {staffNames.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
                <label style={{ fontWeight: 600, color: '#333' }}>ตำแหน่ง</label>
                <select name="position" className="modern-select" style={{ width: 180 }}>
                  <option value="">เลือกตำแหน่ง</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
                <label style={{ fontWeight: 600, color: '#333' }}>ชื่อผู้ประเมิน</label>
                <input 
                  type="text" 
                  name="evaluator" 
                  placeholder="ชื่อผู้ประเมิน" 
                  className="modern-input"
                  style={{ width: 180 }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: 12, marginTop: 25 }}>
                <button 
                  type="button" 
                  onClick={handleReset} 
                  disabled={!selectedStaff || isResetting} 
                  className="btn-danger"
                  style={{ 
                    opacity: (!selectedStaff || isResetting) ? 0.6 : 1,
                    cursor: (!selectedStaff || isResetting) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isResetting ? "กำลังรีเซ็ต..." : "Reset"}
                </button>
                
                <Link href="/" className="modern-link">
                  &larr; กลับหน้าแรก
                </Link>
              </div>
            </div>
          </div>
          
          <div style={{ overflowX: "auto" }}>
            <table className="modern-table" style={{ width: "100%", minWidth: 1000 }}>
              <thead>
                <tr>
                  <th style={{ minWidth: 80 }}>วันที่</th>
                  <th style={{ minWidth: 50 }}>ข้อที่</th>
                  <th style={{ minWidth: 320 }}>กิจกรรม/เนื้อหา</th>
                  <th style={{ minWidth: 120 }}>ประสบการณ์</th>
                  <th colSpan={2}>ประเมินครั้งที่ 1</th>
                  <th colSpan={2}>ประเมินครั้งที่ 2</th>
                  <th colSpan={2}>ประเมินครั้งที่ 3</th>
                </tr>
                <tr>
                  <th colSpan={4}></th>
                  <th>ผ่าน</th>
                  <th>ไม่ผ่าน</th>
                  <th>ผ่าน</th>
                  <th>ไม่ผ่าน</th>
                  <th>ผ่าน</th>
                  <th>ไม่ผ่าน</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  let itemCount = 0;
                  return allTopics.map((topic, i) => {
                    if (topic.type === 'header') {
                      return (
                        <tr key={i}>
                          <td colSpan={10} style={{ 
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                            color: '#333', 
                            fontWeight: 'bold', 
                            padding: 12,
                            textAlign: 'center',
                            fontSize: 16
                          }}>
                            {topic.label}
                          </td>
                        </tr>
                      );
                    }
                    itemCount++;
                    const currentTopicData = evaluationData[topic.label] || {};
                    const isDisabled = currentTopicData.evaluation1 === "ผ่าน" || currentTopicData.evaluation2 === "ผ่าน" || currentTopicData.evaluation3 === "ผ่าน";
                    return (
                      <tr key={topic.label}>
                        <td style={{ textAlign: "center" }}>
                          <input 
                            type="date" 
                            name={`date_${itemCount}`} 
                            className="modern-input"
                            style={{ width: 140, fontSize: 14 }} 
                            defaultValue={currentTopicData.date || ""} 
                            disabled={isDisabled} 
                          />
                        </td>
                        <td style={{ textAlign: "center", fontWeight: 600, fontSize: 16 }}>{itemCount}</td>
                        <td style={{ padding: "12px 16px", fontSize: 14 }}>{topic.label}</td>
                        <td style={{ textAlign: "center" }}>
                          <select 
                            name={`exp_${itemCount}`} 
                            className="modern-select"
                            style={{ width: 120, fontSize: 14 }}
                            defaultValue={currentTopicData.experience || ""} 
                            disabled={isDisabled}
                          >
                            <option value="">-</option>
                            <option value="เคยทำ">เคยทำ</option>
                            <option value="ไม่เคยทำ">ไม่เคยทำ</option>
                          </select>
                        </td>
                        {[1, 2, 3].map((n) => [
                          <td key={`pass${n}`} style={{ textAlign: "center" }}>
                            <input 
                              type="radio" 
                              name={`eval${n}_${itemCount}`} 
                              value="ผ่าน" 
                              disabled={isDisabled} 
                              defaultChecked={currentTopicData[`evaluation${n}`] === "ผ่าน"}
                              style={{ transform: 'scale(1.2)' }}
                            />
                          </td>,
                          <td key={`fail${n}`} style={{ textAlign: "center" }}>
                            <input 
                              type="radio" 
                              name={`eval${n}_${itemCount}`} 
                              value="ไม่ผ่าน" 
                              disabled={isDisabled} 
                              defaultChecked={currentTopicData[`evaluation${n}`] === "ไม่ผ่าน"}
                              style={{ transform: 'scale(1.2)' }}
                            />
                          </td>
                        ])}
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: 32, textAlign: "center" }}>
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