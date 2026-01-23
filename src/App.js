import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
const GradeCalculator = () => {
  const [specialty, setSpecialty] = useState('');
  const [semester, setSemester] = useState('');
  const [grades, setGrades] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const specialties = [
    'Réseaux et Securité informatique (RSI)',
    'Systèmes Informatiques (SI)',
    'Systèmes et Multimédia (SYM)'
  ];

  const modules = {
    'RSI-S1': [
      { name: 'Sécurité Informatique', ects: 4, coef: 2, unit: 'UEF1', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Architectures des réseaux informatiques', ects: 6, coef: 3, unit: 'UEF1', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Sécurité et Algorithmes distribués', ects: 4, coef: 2, unit: 'UEF2', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Bases de données avancées', ects: 4, coef: 2, unit: 'UEF2', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Anglais scientifique 1', ects: 1, coef: 1, unit: 'UEM1', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Modélisation & conception orienté objet', ects: 4, coef: 2, unit: 'UEM1', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Programmation avancée web', ects: 4, coef: 2, unit: 'UEM1', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Éthique et déontologie', ects: 1, coef: 1, unit: 'UET1', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Aide à la Décision', ects: 2, coef: 2, unit: 'UED1', hasExam: true, hasTD: false, hasTP: true }
    ],
    'SI-S1': [
      { name: 'Génie Logiciel Avancé', ects: 4, coef: 2, unit: 'UEF1', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Modélisation et Simulation des Systèmes', ects: 4, coef: 2, unit: 'UEF1', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Base de données avancées', ects: 4, coef: 3, unit: 'UEF2', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Méthodes de Conception des SI', ects: 4, coef: 2, unit: 'UEF2', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Systèmes Experts', ects: 4, coef: 2, unit: 'UEM1', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Aspects Qualité et Conduite de Projet SI', ects: 4, coef: 2, unit: 'UEM1', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Anglais scientifique 1', ects: 2, coef: 1, unit: 'UEM1', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Éthique et déontologie', ects: 2, coef: 1, unit: 'UET1', hasExam: true, hasTD: false, hasTP: false }
    ],
    'SYM-S1': [
      { name: 'Programmation multimédia', ects: 4, coef: 2, unit: 'UEF1', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Systèmes d\'information pervasifs', ects: 5, coef: 3, unit: 'UEF1', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Systèmes Interactifs d\'Aide à la Décision', ects: 4, coef: 2, unit: 'UEF2', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Systèmes distribués et architectures parallèles', ects: 4, coef: 2, unit: 'UEF2', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Méthodes pour l\'intelligence artificielle', ects: 4, coef: 2, unit: 'UEM1', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Traitement de signal', ects: 4, coef: 2, unit: 'UEM1', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Anglais scientifique 1', ects: 2, coef: 1, unit: 'UEM1', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Éthique et déontologie', ects: 1, coef: 1, unit: 'UET1', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Gestion des projets', ects: 2, coef: 1, unit: 'UED1', hasExam: true, hasTD: true, hasTP: false }
    ]
  };

  const calculateModuleAverage = (module, moduleGrades) => {
    const exam = parseFloat(moduleGrades?.exam) || 0;
    const td = parseFloat(moduleGrades?.td) || 0;
    const tp = parseFloat(moduleGrades?.tp) || 0;
    const specialtyCode = specialty.match(/\(([^)]+)\)/)?.[1] || '';
    
    if (!module.hasTD && !module.hasTP) return exam;

    if (specialtyCode === 'RSI') {
      const cc = (module.hasTD && module.hasTP) ? (td + tp) / 2 : (td || tp);
      return (exam * 0.6) + (cc * 0.4);
    }

    if (module.hasTD && module.hasTP) {
      return (exam * 0.5) + (((td + tp) / 2) * 0.5);
    } else {
      const activeControl = module.hasTD ? td : tp;
      return (exam * 0.5) + (activeControl * 0.5);
    }
  };

  const calculateUnitAverage = (unitName) => {
    const currentModules = getCurrentModules();
    const unitModules = currentModules.filter(m => m.unit === unitName);
    if (unitModules.length === 0) return 0;
    let totalWeighted = 0;
    let totalCoef = 0;
    unitModules.forEach((module) => {
      const moduleIndex = currentModules.indexOf(module);
      const moduleGrades = grades[moduleIndex];
      const avg = calculateModuleAverage(module, moduleGrades);
      totalWeighted += avg * module.coef;
      totalCoef += module.coef;
    });
    return totalCoef > 0 ? totalWeighted / totalCoef : 0;
  };

  const calculateGeneralAverage = () => {
    const currentModules = getCurrentModules();
    if (currentModules.length === 0) return 0;
    const units = [...new Set(currentModules.map(m => m.unit))];
    let totalWeighted = 0;
    let totalCoef = 0;
    units.forEach(unitName => {
      const unitModules = currentModules.filter(m => m.unit === unitName);
      const unitAvg = calculateUnitAverage(unitName);
      const unitCoef = unitModules.reduce((sum, m) => sum + m.coef, 0);
      totalWeighted += unitAvg * unitCoef;
      totalCoef += unitCoef;
    });
    return totalCoef > 0 ? (totalWeighted / totalCoef).toFixed(2) : 0;
  };

  const getCurrentModules = () => {
    if (!specialty || !semester) return [];
    const specialtyCode = specialty.match(/\(([^)]+)\)/)?.[1] || '';
    const semesterNum = semester.replace('Semestre ', '');
    const key = `${specialtyCode}-S${semesterNum}`;
    return modules[key] || [];
  };

  const handleGradeChange = (moduleIndex, field, value) => {
    setGrades(prev => ({
      ...prev,
      [moduleIndex]: { ...prev[moduleIndex], [field]: value }
    }));
  };

  useEffect(() => { setGrades({}); }, [specialty, semester]);

  const currentModules = getCurrentModules();
  const generalAverage = calculateGeneralAverage();
  const units = currentModules.length > 0 ? [...new Set(currentModules.map(m => m.unit))] : [];

  const getAverageColor = (avg) => parseFloat(avg) >= 10 ? '#10b981' : '#ef4444';
  const getModuleColor = (index) => ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'][index % 6];

  const theme = darkMode ? {
    bg: '#0f172a', card: '#1e293b', text: '#f1f5f9', textSecondary: '#cbd5e1', border: '#334155', input: '#334155', inputText: '#f1f5f9'
  } : {
    bg: '#f8fafc', card: '#ffffff', text: '#1e293b', textSecondary: '#64748b', border: '#e2e8f0', input: '#ffffff', inputText: '#1e293b'
  };

  return (
    <div style={{background: theme.bg, minHeight: '100vh', fontFamily: "'Raleway', sans-serif"}}>
    
      
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: '#ffffff', padding: '16px 15px', boxShadow: '0 4px 24px rgba(30, 58, 138, 0.3)' }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255, 255, 255, 0.3)', flexShrink: 0 }}>
              <img src="image.png" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, fontFamily: "'Abril Fatface', cursive", lineHeight: '1.1' }}>
                Calculateur de moyenne Master
              </h1>
              <p style={{fontSize: '10px', opacity: 0.9}}>Département d'Informatique - Tébessa</p>
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {darkMode ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#ffffff" />}
          </button>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '15px'}}>
        {/* Selection Card */}
        <div style={{...styles.card, background: theme.card, color: theme.text, borderColor: theme.border}}>
          <div className="selection-grid" style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Spécialité</label>
              <select value={specialty} onChange={(e) => {setSpecialty(e.target.value); setSemester('');}} style={{...styles.select, background: theme.input, color: theme.inputText, borderColor: theme.border}}>
                <option value="">-- Choisir --</option>
                {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Semestre</label>
              <select value={semester} onChange={(e) => setSemester(e.target.value)} disabled={!specialty} style={{...styles.select, background: theme.input, color: theme.inputText, borderColor: theme.border}}>
                <option value="">-- Choisir --</option>
                <option value="Semestre 1">Semestre 1</option>
              </select>
            </div>
          </div>
        </div>

        {/* Units and Modules */}
        {units.map(unitName => {
          const unitModules = currentModules.filter(m => m.unit === unitName);
          const unitAvg = calculateUnitAverage(unitName);
          const unitCoef = unitModules.reduce((sum, m) => sum + m.coef, 0);

          return (
            <div key={unitName} style={{marginBottom: '25px'}}>
              <div className="unit-header" style={{...styles.card, background: theme.card, borderColor: theme.border, marginBottom: '12px', padding: '12px 15px'}}>
                <h3 style={{margin: '0 0 5px 0', color: '#3b82f6', fontSize: '16px'}}>{unitName}</h3>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{...styles.badge, background: '#3b82f620', color: '#3b82f6'}}>Coef {unitCoef}</span>
                  <span style={{fontWeight: '700', color: getAverageColor(unitAvg), fontSize: '14px'}}>Moyenne: {unitAvg.toFixed(2)}</span>
                </div>
              </div>

              <div style={styles.modulesContainer}>
                {unitModules.map((module) => {
                  const moduleIndex = currentModules.indexOf(module);
                  const moduleGrades = grades[moduleIndex] || {};
                  const moduleAvg = calculateModuleAverage(module, moduleGrades);

                  return (
                    <div key={moduleIndex} style={{...styles.moduleCard, background: theme.card, borderColor: theme.border}}>
                      <div style={styles.moduleHeader}>
                        <div style={styles.moduleHeaderLeft}>
                          <div style={{width: '4px', height: '20px', background: getModuleColor(moduleIndex), borderRadius: '2px'}}></div>
                          <h4 style={{margin: 0, color: theme.text, fontSize: '14px', lineHeight: '1.2'}}>{module.name}</h4>
                        </div>
                        <span style={{...styles.badge, background: `${getModuleColor(moduleIndex)}15`, color: getModuleColor(moduleIndex), whiteSpace: 'nowrap'}}>Coef {module.coef}</span>
                      </div>

                      <div className="grades-grid" style={styles.gradesGrid}>
                        <div>
                          <label style={styles.inputLabel}>Examen</label>
                          <input type="number" inputMode="decimal" placeholder="00" value={moduleGrades.exam || ''} onChange={(e) => handleGradeChange(moduleIndex, 'exam', e.target.value)} style={{...styles.input, background: theme.input, color: theme.inputText, borderColor: theme.border}} />
                        </div>
                        {module.hasTD && (
                          <div>
                            <label style={styles.inputLabel}>TD</label>
                            <input type="number" inputMode="decimal" placeholder="00" value={moduleGrades.td || ''} onChange={(e) => handleGradeChange(moduleIndex, 'td', e.target.value)} style={{...styles.input, background: theme.input, color: theme.inputText, borderColor: theme.border}} />
                          </div>
                        )}
                        {module.hasTP && (
                          <div>
                            <label style={styles.inputLabel}>TP</label>
                            <input type="number" inputMode="decimal" placeholder="00" value={moduleGrades.tp || ''} onChange={(e) => handleGradeChange(moduleIndex, 'tp', e.target.value)} style={{...styles.input, background: theme.input, color: theme.inputText, borderColor: theme.border}} />
                          </div>
                        )}
                      </div>
                      <div style={{textAlign: 'right', marginTop: '12px', fontWeight: '700', color: getAverageColor(moduleAvg), fontSize: '13px'}}>
                        Module: {moduleAvg.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Total Result */}
        {currentModules.length > 0 && (
          <div style={{marginTop: '30px', textAlign: 'center', padding: '20px', background: theme.card, borderRadius: '20px', border: `2px solid ${getAverageColor(generalAverage)}`, marginBottom: '40px'}}>
            <h2 style={{color: theme.text, marginBottom: '5px', fontSize: '18px'}}>Moyenne Générale</h2>
            <div style={{fontSize: '48px', fontWeight: '800', color: getAverageColor(generalAverage)}}>{generalAverage}</div>
            <div style={{marginTop: '10px', fontWeight: '700', fontSize: '20px'}}>{parseFloat(generalAverage) >= 10 ? '✅ Admis' : '❌ Ajourné'}</div>
          </div>
        )}
      </div>

      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; font-size: 16px; } /* Evite le zoom auto sur iOS */
        
        @media (max-width: 600px) {
          .selection-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .grades-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
          .unit-header { flex-direction: column; align-items: flex-start !important; }
        }

        /* Pour les très petits écrans, on passe les notes en 2 colonnes si besoin */
        @media (max-width: 350px) {
          .grades-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  card: { borderRadius: '12px', padding: '15px', marginBottom: '15px', border: '1px solid', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '13px', fontWeight: '600' },
  select: { padding: '10px', borderRadius: '8px', border: '1px solid', outline: 'none', fontSize: '14px', width: '100%' },
  moduleCard: { padding: '15px', borderRadius: '12px', border: '1px solid', marginBottom: '10px' },
  moduleHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '10px' },
  moduleHeaderLeft: { display: 'flex', alignItems: 'flex-start', gap: '8px' },
  gradesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '10px' },
  inputLabel: { fontSize: '11px', display: 'block', marginBottom: '4px', opacity: 0.8, textAlign: 'center' },
  input: { width: '100%', padding: '8px 4px', borderRadius: '6px', border: '1px solid', textAlign: 'center', fontWeight: '600' },
  badge: { padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' },
  modulesContainer: { display: 'flex', flexDirection: 'column', gap: '8px' }
};

export default GradeCalculator;
