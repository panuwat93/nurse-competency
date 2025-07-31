'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

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

export default function Summary() {
  const [selectedStaff, setSelectedStaff] = useState("");
  const [summaryData, setSummaryData] = useState<{
    competency: Array<any> | null;
    skills: Array<any> | null;
  }>({ competency: null, skills: null });
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ competency: false, skills: false });

  useEffect(() => {
    if (!selectedStaff) {
      setSummaryData({ competency: null, skills: null });
      return;
    }

    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        // Fetch competency assessment
        const competencyQuery = query(collection(db, "assessments-competency"), where("staffName", "==", selectedStaff));
        const competencySnapshot = await getDocs(competencyQuery);
        const competencyResults = competencySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch skills assessment
        const skillsQuery = query(collection(db, "assessments-skills"), where("staffName", "==", selectedStaff));
        const skillsSnapshot = await getDocs(skillsQuery);
        const skillsResults = skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setSummaryData({
          competency: competencyResults.length > 0 ? competencyResults : null,
          skills: skillsResults.length > 0 ? skillsResults : null,
        });

      } catch (error) {
        console.error("Error fetching summary:", error);
        alert("เกิดข้อผิดพลาดในการดึงข้อมูลสรุป");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [selectedStaff]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "ไม่ระบุ";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderCompetencyDetails = (assessment: any) => {
    const topics = assessment.topics || {};
    const topicKeys = Object.keys(topics);
    
    // กรองเฉพาะรายการที่มีข้อมูลการประเมิน
    const evaluatedTopics = topicKeys.filter(topic => {
      const topicData = topics[topic];
      return topicData && (
        topicData.date || 
        topicData.experience || 
        topicData.evaluation1 || 
        topicData.evaluation2 || 
        topicData.evaluation3
      );
    });
    
    if (evaluatedTopics.length === 0) {
      return (
        <div style={{ marginTop: 16, textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          ไม่มีรายการที่ประเมินแล้ว
        </div>
      );
    }
    
    return (
      <div style={{ marginTop: 16 }}>
        <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 8, marginBottom: 16 }}>
          <p><strong>ตำแหน่ง:</strong> {assessment.position || 'ไม่ระบุ'}</p>
          <p><strong>วันที่ประเมิน:</strong> {assessment.assessmentDate || 'ไม่ระบุ'}</p>
          <p><strong>ผู้ประเมิน:</strong> {assessment.evaluator || 'ไม่ระบุ'}</p>
          <p><strong>วันที่บันทึก:</strong> {formatDate(assessment.createdAt)}</p>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#e3f2fd' }}>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>หัวข้อ</th>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>วันที่</th>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>ประสบการณ์</th>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>ครั้งที่ 1</th>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>ครั้งที่ 2</th>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>ครั้งที่ 3</th>
              </tr>
            </thead>
            <tbody>
              {evaluatedTopics.map((topic, index) => {
                const topicData = topics[topic];
                
                return (
                  <tr key={index} style={{ background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    <td style={{ border: '1px solid #ddd', padding: 8 }}>{topic}</td>
                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>{topicData.date || '-'}</td>
                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>{topicData.experience || '-'}</td>
                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>
                      <span style={{ 
                        color: topicData.evaluation1 === 'ผ่าน' ? '#4caf50' : topicData.evaluation1 === 'ไม่ผ่าน' ? '#f44336' : '#999',
                        fontWeight: 'bold'
                      }}>
                        {topicData.evaluation1 || '-'}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>
                      <span style={{ 
                        color: topicData.evaluation2 === 'ผ่าน' ? '#4caf50' : topicData.evaluation2 === 'ไม่ผ่าน' ? '#f44336' : '#999',
                        fontWeight: 'bold'
                      }}>
                        {topicData.evaluation2 || '-'}
                      </span>
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>
                      <span style={{ 
                        color: topicData.evaluation3 === 'ผ่าน' ? '#4caf50' : topicData.evaluation3 === 'ไม่ผ่าน' ? '#f44336' : '#999',
                        fontWeight: 'bold'
                      }}>
                        {topicData.evaluation3 || '-'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSkillsDetails = (assessment: any) => {
    const answers = assessment.answers || {};
    
    // Define section mappings
    const sectionMappings = {
      's1_': '1. สามารถใช้เครื่องมืออุปกรณ์',
      's2_': '2. การอ่าน EKG',
      's3_': '3. การใช้ยา',
      's4_': '4. การใช้เครื่องมือในภาวะ Emergency',
      's5_': '5. การแปลผล ABG',
      's6_': '6. การใช้เครื่องมือเฉพาะทาง',
      's7_': '7. การดูแลผู้ป่วยโรคระบบหายใจ',
      's8_': '8. การดูแลผู้ป่วยโรคต่างๆ'
    };
    
    // Group answers by section and filter only evaluated items
    const sectionGroups: Record<string, Array<{key: string, value: any}>> = {};
    Object.entries(answers).forEach(([key, value]) => {
      if (key.startsWith('s') && key.includes('_') && value) {
        const sectionPrefix = key.split('_')[0] + '_';
        if (!sectionGroups[sectionPrefix]) {
          sectionGroups[sectionPrefix] = [];
        }
        sectionGroups[sectionPrefix].push({ key, value });
      }
    });
    
    // Check if there are any evaluated skills
    const hasEvaluatedSkills = Object.values(sectionGroups).some((group: Array<{key: string, value: any}>) => group.length > 0);
    
    if (!hasEvaluatedSkills) {
      return (
        <div style={{ marginTop: 16, textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          ไม่มีรายการที่ประเมินแล้ว
        </div>
      );
    }
    
    return (
      <div style={{ marginTop: 16 }}>
        <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 8, marginBottom: 16 }}>
          <p><strong>ตำแหน่ง:</strong> {assessment.position || 'ไม่ระบุ'}</p>
          <p><strong>วันที่ประเมิน:</strong> {assessment.assessmentDate || 'ไม่ระบุ'}</p>
          <p><strong>ผู้ประเมิน:</strong> {assessment.evaluator || 'ไม่ระบุ'}</p>
          <p><strong>วันที่บันทึก:</strong> {formatDate(assessment.createdAt)}</p>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#e3f2fd' }}>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>กลุ่มทักษะ</th>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>ทักษะ</th>
                <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>ผลการประเมิน</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sectionGroups).map(([sectionPrefix, items], sectionIndex) => {
                const sectionTitle = sectionMappings[sectionPrefix as keyof typeof sectionMappings] || sectionPrefix;
                return (items as Array<{key: string, value: any}>).map((item, itemIndex) => {
                  const skillName = getSkillNameByKey(item.key);
                  const resultText = getResultText(item.value);
                  const resultColor = getResultColor(item.value);
                  
                  return (
                    <tr key={`${sectionPrefix}-${itemIndex}`} style={{ background: (sectionIndex + itemIndex) % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                      <td style={{ border: '1px solid #ddd', padding: 8, fontWeight: itemIndex === 0 ? 'bold' : 'normal' }}>
                        {itemIndex === 0 ? sectionTitle : ''}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>{skillName}</td>
                      <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'center' }}>
                        <span style={{ color: resultColor, fontWeight: 'bold' }}>
                          {resultText}
                        </span>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const getSkillNameByKey = (key: string) => {
    // Map skill keys to readable names
    const skillMappings = {
      // Section 1 - เครื่องมืออุปกรณ์
      's1_0': '1.1 Bird\'s respirator',
      's1_1': '1.2 Bennett 840',
      's1_2': '1.3 Defibrillator',
      's1_3': '1.4 EKG monitor/Central Monitor',
      's1_4': '1.5 EKG Analysis',
      's1_5': '1.6 Wrigh\'s Respirometer',
      's1_6': '1.7 Hot Centrifuge',
      's1_7': '1.8 Glucometer',
      's1_8': '1.9 Reflexotmeter',
      's1_9': '1.10 Pipe line system ได้แก O2/Air compressor/Vacuum',
      's1_10': '1.11 Doppler',
      's1_11': '1.12 Infusion pump',
      's1_12': '1.13 Syring pump',
      's1_13': '1.14 Hypo/hyperthermia',
      's1_14': '1.15 CRRT',
      's1_15': '1.16 U/S',
      
      // Section 2 - การอ่าน EKG
      's2_0': '2.1 AF',
      's2_1': '2.2 PAC',
      's2_2': '2.3 PVC',
      's2_3': '2.4 VT/Shot run VT',
      's2_4': '2.5 VF',
      's2_5': '2.6 PEA',
      's2_6': '2.7 Atrial flutter',
      's2_7': '2.8 Sinus bradycardia',
      's2_8': '2.9 Sinus tachycardia',
      's2_9': '2.10 Supra Ventricular Tachycardia(SVT)',
      's2_10': '2.11 Asystole',
      's2_11': '2.12 AV block ระดับต่าง ๆ',
      's2_12': '2.13 Right/Left Bundle branch block',
      's2_13': '2.14 STEMI/MI',
      's2_14': '2.15 Pacemaker rhythm',
      
      // Section 3 - การใช้ยา
      's3_0': '3.1 Dopamine',
      's3_1': '3.2 Debutamine',
      's3_2': '3.3 Levophed',
      's3_3': '3.4 NTG',
      's3_4': '3.5 Amiodaron',
      's3_5': '3.6 KCL',
      's3_6': '3.7 Morphine',
      's3_7': '3.8 Pethidine',
      's3_8': '3.9 Domicum',
      's3_9': '3.10 Fentanyl',
      's3_10': '3.11 Nicardepine',
      's3_11': '3.12 Adenosine',
      's3_12': '3.13 Wafarin',
      
      // Section 4 - เครื่องมือในภาวะ Emergency
      's4_0': '4.1 การใช้อุปกรณ์ช่วยในภาวะ Emergency',
      's4_1': '4.2 ใช้ Defibrillator',
      
      // Section 5 - การแปลผล ABG
      's5_0': '5.1 ABG และสามารถแปลผลได้',
      
      // Section 6 - เครื่องมือเฉพาะทาง
      's6_0': '6.1 ICD',
      's6_1': '6.2 A-line',
      's6_2': '6.3 C-line',
      's6_3': '6.4 Temporary pacing',
      's6_4': '6.5 Double lumen for HD',
      's6_5': '6.6 ET tube',
      's6_6': '6.7 Intubation ET tube',
      's6_7': '6.8 Vacuum dressing',
      's6_8': '6.9 เตรียม Set เจาะหลัง',
      's6_9': '6.10 เตรียม Set เย็บแผล',
      's6_10': '6.11 วัด ABD pressure',
      's6_11': '6.12 วัด CVP',
      
      // Section 7 - โรคระบบหายใจ
      's7_0': '7.1 Pneumonia',
      's7_1': '7.2 TB',
      's7_2': '7.3 Pleural effusion',
      's7_3': '7.4 MASS',
      
      // Section 8 - โรคต่างๆ
      's8_0': '8.1 Respiratory failure',
      's8_1': '8.2 Hemorrhagic stroke/Ischemic stroke',
      's8_2': '8.3 Cerebral aneurysm',
      's8_3': '8.4 Brain tumor',
      's8_4': '8.5 Shock',
      's8_5': '8.6 Sepsis',
      's8_6': '8.7 STEMI',
      's8_7': '8.8 PE',
      's8_8': '8.9 DVT',
      's8_9': '8.10 Palliative care',
      's8_10': '8.11 Resuscitate Organ(Organ donate)',
      's8_11': '8.12 อื่นๆ',
      's8_12': '8.13 PPH',
      's8_13': '8.14 Vascolar Deasease',
      's8_14': '8.15 AAA',
      's8_15': '8.16 Acute ABD',
      's8_16': '8.17 CA Colorectal',
      's8_17': '8.18 CA/mass (lung)',
      's8_18': '8.19 Cardiac Temponade',
      's8_19': '8.20 Severe Trauma'
    };
    
    return skillMappings[key as keyof typeof skillMappings] || key;
  };

  const getResultText = (value: any) => {
    const resultMappings = {
      'never': 'ไม่เคย',
      'low': 'น้อย',
      'medium': 'ปานกลาง',
      'high': 'มาก'
    };
    return resultMappings[value as keyof typeof resultMappings] || value || '-';
  };

  const getResultColor = (value: any) => {
    const colorMappings = {
      'never': '#f44336',
      'low': '#ff9800',
      'medium': '#2196f3',
      'high': '#4caf50'
    };
    return colorMappings[value as keyof typeof colorMappings] || '#999';
  };

  return (
    <div style={{ minHeight: '100vh', padding: 40 }}>
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
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>
            สรุปการประเมินรายบุคคล
          </h1>
        </div>
        
        <div className="modern-section" style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <label style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>เลือกเจ้าหน้าที่:</label>
              <select 
                value={selectedStaff} 
                onChange={e => setSelectedStaff(e.target.value)}
                className="modern-select"
                style={{ padding: '12px 20px', fontSize: 16, minWidth: 300 }}
              >
                <option value="">-- เลือกชื่อ --</option>
                {staffNames.map(name => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            
            <Link href="/" className="modern-link">
              &larr; กลับหน้าแรก
            </Link>
          </div>
        </div>

        {isLoading && (
          <div className="modern-section" style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 24, marginBottom: 16 }}>⏳</div>
            <p style={{ fontSize: 18, color: '#666' }}>กำลังโหลด...</p>
          </div>
        )}

        {!isLoading && selectedStaff && !summaryData.competency && !summaryData.skills && (
          <div className="modern-section" style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <p style={{ fontSize: 18, color: '#666' }}>ไม่พบข้อมูลการประเมินสำหรับเจ้าหน้าที่ท่านนี้</p>
          </div>
        )}

        {!isLoading && summaryData.competency && (
          <div className="modern-section" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#153a8a', margin: 0, fontSize: 24, fontWeight: 700 }}>
                ประเมินสมรรถนะพยาบาลวิชาชีพ
              </h2>
              <button 
                onClick={() => setExpandedSections(prev => ({ ...prev, competency: !prev.competency }))}
                className="btn-secondary"
                style={{ fontSize: 14, padding: '10px 20px' }}
              >
                {expandedSections.competency ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
              </button>
            </div>
            <p style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
              พบข้อมูลการประเมิน {summaryData.competency.length} ครั้ง
            </p>
            
            {expandedSections.competency && (
              <div>
                {summaryData.competency?.map((assessment: any, index: number) => (
                  <div key={assessment.id} className="modern-section" style={{ 
                    marginBottom: 24, 
                    padding: 24,
                    background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)'
                  }}>
                    <h3 style={{ 
                      color: '#1976d2', 
                      marginTop: 0, 
                      marginBottom: 20,
                      fontSize: 20,
                      fontWeight: 600
                    }}>
                      การประเมินครั้งที่ {index + 1}
                    </h3>
                    {renderCompetencyDetails(assessment)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!isLoading && summaryData.skills && (
          <div className="modern-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#153a8a', margin: 0, fontSize: 24, fontWeight: 700 }}>
                แบบประเมินทักษะการปฏิบัติงาน
              </h2>
              <button 
                onClick={() => setExpandedSections(prev => ({ ...prev, skills: !prev.skills }))}
                className="btn-secondary"
                style={{ fontSize: 14, padding: '10px 20px' }}
              >
                {expandedSections.skills ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
              </button>
            </div>
            <p style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
              พบข้อมูลการประเมิน {summaryData.skills.length} ครั้ง
            </p>
            
            {expandedSections.skills && (
              <div>
                {summaryData.skills?.map((assessment: any, index: number) => (
                  <div key={assessment.id} className="modern-section" style={{ 
                    marginBottom: 24, 
                    padding: 24,
                    background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)'
                  }}>
                    <h3 style={{ 
                      color: '#1976d2', 
                      marginTop: 0, 
                      marginBottom: 20,
                      fontSize: 20,
                      fontWeight: 600
                    }}>
                      การประเมินครั้งที่ {index + 1}
                    </h3>
                    {renderSkillsDetails(assessment)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 