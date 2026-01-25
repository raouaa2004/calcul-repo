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
    'RSI-S2': [
      { name: 'Ingénierie des réseaux', ects: 6, coef: 3, unit: 'UEF3', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Sécurité des réseaux Informatiques', ects: 4, coef: 2, unit: 'UEF3', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Administration des réseaux', ects: 4, coef: 2, unit: 'UEF4', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Systèmes biométriques', ects: 4, coef: 2, unit: 'UEF4', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Anglais scientifique 1', ects: 1, coef: 1, unit: 'UEM2', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Gestion de Projets', ects: 4, coef: 2, unit: 'UEM2', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Programmation orientée objet', ects: 4, coef: 2, unit: 'UEM2', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Culture de l\'entreprise', ects: 1, coef: 1, unit: 'UET2', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Réseaux mobiles', ects: 2, coef: 2, unit: 'UED2', hasExam: true, hasTD: false, hasTP: true }
    ],
    'RSI-S3': [
      { name: 'Cryptologie', ects: 4, coef: 2, unit: 'UEF5', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Sécurité système avancée', ects: 4, coef: 2, unit: 'UEF5', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Audit de sécurité', ects: 4, coef: 2, unit: 'UEF6', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Sûreté des systèmes et applications répartis', ects: 6, coef: 3, unit: 'UEF6', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Techniques d\'investigation 2', ects: 4, coef: 2, unit: 'UEM3', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Méthodologies de la Recherche Scientifique', ects: 4, coef: 2, unit: 'UEM3', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Anglais scientifique 3', ects: 1, coef: 1, unit: 'UEM3', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Législation des nouvelles technologies', ects: 1, coef: 1, unit: 'UET3', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Technologie e-commerce', ects: 2, coef: 2, unit: 'UED3', hasExam: true, hasTD: true, hasTP: true }
    ],
    'SI-S1': [
      { name: 'Génie Logiciel Avancé', ects: 4, coef: 3, unit: 'UEF1', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Modélisation et Simulation des Systèmes', ects: 4, coef: 3, unit: 'UEF1', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Base de données avancées', ects: 4, coef: 3, unit: 'UEF2', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Méthodes de Conception des SI', ects: 4, coef: 2, unit: 'UEF2', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Systèmes Experts', ects: 4, coef: 2, unit: 'UEM1', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Aspects Qualité et Conduite de Projet SI', ects: 4, coef: 2, unit: 'UEM1', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Anglais scientifique 1', ects: 2, coef: 1, unit: 'UEM1', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Éthique et déontologie', ects: 2, coef: 1, unit: 'UET1', hasExam: true, hasTD: false, hasTP: false }
    ],
    'SI-S2': [
      { name: 'Ingénierie des Besoins', ects: 4, coef: 2, unit: 'UEF2', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Ingénierie des Modèles', ects: 4, coef: 2, unit: 'UEF2', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Systèmes Distribués', ects: 6, coef: 3, unit: 'UEF3', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Algorithmique Distribuée', ects: 4, coef: 2, unit: 'UEF3', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Workflow et Systèmes Coopératifs', ects: 4, coef: 2, unit: 'UEM2', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Systèmes Multi-Agents', ects: 4, coef: 2, unit: 'UEM2', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Anglais Technique et Scientifique 2', ects: 1, coef: 1, unit: 'UEM2', hasExam: true, hasTD: false, hasTP: false },
      { name: 'La Cybercriminalité', ects: 2, coef: 2, unit: 'UET2', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Gestion des Organisations', ects: 1, coef: 1, unit: 'UET2', hasExam: true, hasTD: false, hasTP: false }
    ],
    'SI-S3': [
      { name: 'Réseaux Informatique d\'Organisation', ects: 6, coef: 3, unit: 'UEF4', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Systèmes d\'Information et Aide à la Décision', ects: 4, coef: 2, unit: 'UEF4', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Concepts et Techniques de Data Mining', ects: 4, coef: 2, unit: 'UEF5', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Recherche d\'Information', ects: 4, coef: 2, unit: 'UEF5', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Commerce électronique', ects: 2, coef: 2, unit: 'UET3', hasExam: true, hasTD: true, hasTP: true },
      { name: 'L\'Intégrité dans la Recherche Scientifique', ects: 1, coef: 1, unit: 'UET3', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Ontologies et Web Sémantique', ects: 4, coef: 2, unit: 'UEM3', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Projet d\'Initiation à la Recherche', ects: 4, coef: 2, unit: 'UEM3', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Anglais Technique et Scientifique 3', ects: 1, coef: 1, unit: 'UEM3', hasExam: true, hasTD: false, hasTP: false }
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
    ],
    'SYM-S2': [
      { name: 'Reconnaissance des formes', ects: 4, coef: 2, unit: 'UEF3', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Base de données multimédia', ects: 4, coef: 2, unit: 'UEF3', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Big Data et fouille de données', ects: 6, coef: 3, unit: 'UEF4', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Système d\'information géographique et applications', ects: 4, coef: 2, unit: 'UEF4', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Anglais scientifique 2', ects: 2, coef: 1, unit: 'UEM2', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Complexité et optimisation', ects: 3, coef: 2, unit: 'UEM2', hasExam: true, hasTD: true, hasTP: false },
      { name: 'Modélisation et simulation des systèmes complexes', ects: 4, coef: 2, unit: 'UEM2', hasExam: true, hasTD: false, hasTP: true },
      { name: 'Culture de l\'entreprise', ects: 1, coef: 1, unit: 'UET2', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Traitement d\'images', ects: 2, coef: 2, unit: 'UED2', hasExam: true, hasTD: false, hasTP: true }
    ],
    'SYM-S3': [
      { name: 'Réalité virtuelle et humains virtuels', ects: 4, coef: 2, unit: 'UEF5', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Outils de Développement Multimédia', ects: 4, coef: 2, unit: 'UEF5', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Qualité et Sécurité Multimédia', ects: 4, coef: 2, unit: 'UEF6', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Multimédia et Réseaux', ects: 6, coef: 3, unit: 'UEF6', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Méthodes Scientifiques d\'Initiation à la Recherche', ects: 3, coef: 2, unit: 'UEM3', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Marketing et cyber marketing', ects: 4, coef: 2, unit: 'UEM3', hasExam: true, hasTD: true, hasTP: true },
      { name: 'Anglais scientifique 3', ects: 2, coef: 1, unit: 'UEM3', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Lutte contre la corruption', ects: 1, coef: 1, unit: 'UET3', hasExam: true, hasTD: false, hasTP: false },
      { name: 'Réseaux sans fil', ects: 2, coef: 2, unit: 'UED3', hasExam: true, hasTD: true, hasTP: true }
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
    bg: '#0f172a', card: '#1e293b', text: '#f1f5f9', textSecondary: '#94a3b8', border: '#334155', input: '#334155', inputText: '#f1f5f9'
  } : {
    bg: '#f8fafc', card: '#ffffff', text: '#1e293b', textSecondary: '#64748b', border: '#e2e8f0', input: '#f9fafb', inputText: '#1e293b'
  };

  return (
    <div style={{background: theme.bg, minHeight: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"}}>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#ffffff', padding: '24px 20px', boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)' }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', overflow: 'hidden', border: '3px solid rgba(255, 255, 255, 0.2)', flexShrink: 0, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
              <img src="image.png" alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                Calculateur de Moyenne
              </h1>
              <p style={{fontSize: '13px', opacity: 0.95, marginTop: '4px', fontWeight: '500'}}>Master Informatique • Université de Tébessa</p>
            </div>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} style={{ width: '48px', height: '48px', borderRadius: '14px', border: 'none', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s ease' }}>
            {darkMode ? <Sun size={22} color="#fbbf24" /> : <Moon size={22} color="#ffffff" />}
          </button>
        </div>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '30px 20px'}}>
        <div style={{...styles.card, background: theme.card, color: theme.text, borderColor: theme.border, padding: '24px', boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'}}>
          <div className="selection-grid" style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={{...styles.label, fontSize: '14px', fontWeight: '600', marginBottom: '8px'}}>Spécialité</label>
              <select value={specialty} onChange={(e) => {setSpecialty(e.target.value); setSemester('');}} style={{...styles.select, background: theme.input, color: theme.inputText, borderColor: theme.border, padding: '12px 16px', fontSize: '15px', fontWeight: '500'}}>
                <option value="">Sélectionner une spécialité</option>
                {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={{...styles.label, fontSize: '14px', fontWeight: '600', marginBottom: '8px'}}>Semestre</label>
              <select value={semester} onChange={(e) => setSemester(e.target.value)} disabled={!specialty} style={{...styles.select, background: theme.input, color: theme.inputText, borderColor: theme.border, padding: '12px 16px', fontSize: '15px', fontWeight: '500', opacity: !specialty ? 0.5 : 1}}>
                <option value="">Sélectionner un semestre</option>
                <option value="Semestre 1">Semestre 1</option>
                <option value="Semestre 2">Semestre 2</option>
                <option value="Semestre 3">Semestre 3</option>
              </select>
            </div>
          </div>
        </div>

        {units.map(unitName => {
          const unitModules = currentModules.filter(m => m.unit === unitName);
          const unitAvg = calculateUnitAverage(unitName);
          const unitCoef = unitModules.reduce((sum, m) => sum + m.coef, 0);

          return (
            <div key={unitName} style={{marginBottom: '40px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: `3px solid ${darkMode ? '#334155' : '#e2e8f0'}`}}>
                <div>
                  <h3 style={{margin: 0, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '20px', fontWeight: '800'}}>{unitName}</h3>
                  <span style={{fontSize: '13px', color: theme.textSecondary, fontWeight: '500', marginTop: '4px', display: 'inline-block'}}>Coefficient: {unitCoef}</span>
                </div>
                <div style={{background: `linear-gradient(135deg, ${getAverageColor(unitAvg)}15, ${getAverageColor(unitAvg)}25)`, padding: '10px 20px', borderRadius: '12px', border: `2px solid ${getAverageColor(unitAvg)}30`}}>
                  <span style={{fontWeight: '800', color: getAverageColor(unitAvg), fontSize: '18px'}}>{unitAvg.toFixed(2)}</span>
                </div>
              </div>

              <div style={styles.modulesContainer}>
                {unitModules.map((module) => {
                  const moduleIndex = currentModules.indexOf(module);
                  const moduleGrades = grades[moduleIndex] || {};
                  const moduleAvg = calculateModuleAverage(module, moduleGrades);

                  return (
                    <div key={moduleIndex} style={{...styles.moduleCard, background: theme.card, borderColor: theme.border, boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s ease', padding: '20px'}}>
                      <div style={styles.moduleHeader}>
                        <div style={styles.moduleHeaderLeft}>
                          <div style={{width: '5px', height: '32px', background: getModuleColor(moduleIndex), borderRadius: '3px', boxShadow: `0 2px 8px ${getModuleColor(moduleIndex)}40`}}></div>
                          <div>
                            <h4 style={{margin: 0, color: theme.text, fontSize: '15px', lineHeight: '1.3', fontWeight: '700'}}>{module.name}</h4>
                            <span style={{fontSize: '12px', color: theme.textSecondary, marginTop: '2px', display: 'inline-block'}}>ECTS: {module.ects}</span>
                          </div>
                        </div>
                        <span style={{...styles.badge, background: `${getModuleColor(moduleIndex)}20`, color: getModuleColor(moduleIndex), whiteSpace: 'nowrap', padding: '6px 14px', fontSize: '12px', fontWeight: '700'}}>Coef {module.coef}</span>
                      </div>

                      <div className="grades-grid" style={{...styles.gradesGrid, marginTop: '18px'}}>
                        <div>
                          <label style={{...styles.inputLabel, fontSize: '12px', fontWeight: '600', marginBottom: '6px'}}>Examen</label>
                          <input type="number" inputMode="decimal" placeholder="0.00" value={moduleGrades.exam || ''} onChange={(e) => handleGradeChange(moduleIndex, 'exam', e.target.value)} style={{...styles.input, background: theme.input, color: theme.inputText, borderColor: theme.border, padding: '10px 8px', fontSize: '15px', fontWeight: '600'}} />
                        </div>
                        {module.hasTD && (
                          <div>
                            <label style={{...styles.inputLabel, fontSize: '12px', fontWeight: '600', marginBottom: '6px'}}>TD</label>
                            <input type="number" inputMode="decimal" placeholder="0.00" value={moduleGrades.td || ''} onChange={(e) => handleGradeChange(moduleIndex, 'td', e.target.value)} style={{...styles.input, background: theme.input, color: theme.inputText, borderColor: theme.border, padding: '10px 8px', fontSize: '15px', fontWeight: '600'}} />
                          </div>
                        )}
                        {module.hasTP && (
                          <div>
                            <label style={{...styles.inputLabel, fontSize: '12px', fontWeight: '600', marginBottom: '6px'}}>TP</label>
                            <input type="number" inputMode="decimal" placeholder="0.00" value={moduleGrades.tp || ''} onChange={(e) => handleGradeChange(moduleIndex, 'tp', e.target.value)} style={{...styles.input, background: theme.input, color: theme.inputText, borderColor: theme.border, padding: '10px 8px', fontSize: '15px', fontWeight: '600'}} />
                          </div>
                        )}
                      </div>
                      <div style={{textAlign: 'right', marginTop: '16px', fontWeight: '800', color: getAverageColor(moduleAvg), fontSize: '16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px'}}>
                        <span style={{fontSize: '13px', color: theme.textSecondary, fontWeight: '600'}}>Moyenne:</span>
                        <span>{moduleAvg.toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {currentModules.length > 0 && (
          <div style={{marginTop: '40px', textAlign: 'center', padding: '32px', background: `linear-gradient(135deg, ${getAverageColor(generalAverage)}10, ${getAverageColor(generalAverage)}20)`, borderRadius: '20px', border: `3px solid ${getAverageColor(generalAverage)}`, marginBottom: '50px', boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)'}}>
            <h2 style={{color: theme.textSecondary, marginBottom: '12px', fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px'}}>Moyenne Générale</h2>
            <div style={{fontSize: '64px', fontWeight: '900', color: getAverageColor(generalAverage), letterSpacing: '-2px', lineHeight: 1}}>{generalAverage}</div>
            <div style={{marginTop: '16px', fontWeight: '700', fontSize: '24px', color: theme.text}}>{parseFloat(generalAverage) >= 10 ? '✅ Admis' : '❌ Ajourné'}</div>
          </div>
        )}
      </div>

      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; font-size: 16px; }
        
        @media (max-width: 600px) {
          .selection-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .grades-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
        }

        @media (max-width: 350px) {
          .grades-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  card: { borderRadius: '16px', padding: '20px', marginBottom: '20px', border: '1px solid', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600' },
  select: { padding: '12px', borderRadius: '10px', border: '2px solid', outline: 'none', fontSize: '15px', width: '100%', cursor: 'pointer', transition: 'all 0.3s ease' },
  moduleCard: { padding: '20px', borderRadius: '16px', border: '2px solid', marginBottom: '12px', transition: 'all 0.3s ease' },
  moduleHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '12px' },
  moduleHeaderLeft: { display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 },
  gradesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' },
  inputLabel: { fontSize: '12px', display: 'block', marginBottom: '6px', fontWeight: '600', textAlign: 'center' },
  input: { width: '100%', padding: '10px 8px', borderRadius: '10px', border: '2px solid', textAlign: 'center', fontWeight: '700', outline: 'none', transition: 'all 0.3s ease' },
  badge: { padding: '6px 12px', borderRadius: '14px', fontSize: '12px', fontWeight: '700' },
  modulesContainer: { display: 'flex', flexDirection: 'column', gap: '12px' }
};

export default GradeCalculator;
